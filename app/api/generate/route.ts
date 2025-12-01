import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// Allow Vercel functions to run longer
export const maxDuration = 60; 

function cleanJson(text: string) {
    // Remove Markdown code blocks and trim
    let cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    // Find the first '[' and the last ']' to extract just the array
    const firstBracket = cleaned.indexOf('[');
    const lastBracket = cleaned.lastIndexOf(']');
    
    if (firstBracket !== -1 && lastBracket !== -1) {
        cleaned = cleaned.substring(firstBracket, lastBracket + 1);
    }
    
    return cleaned;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });

    let user = await db.user.findUnique({ where: { email: session.user.email } });
    if (!user) return new NextResponse("User not found", { status: 404 });
    
    // --- FIX: AUTO-UPDATE LEGACY USERS ---
    // If user has the old limit (e.g., 10), bump them to the new 25k word limit instantly
    if (user.usageLimit < 1000) {
        user = await db.user.update({
            where: { id: user.id },
            data: { usageLimit: 25000, plan: "TRIAL" }
        });
    }

    // Check Limits
    if (user.apiUsage >= user.usageLimit) {
        return new NextResponse("Word Limit Reached. Please upgrade.", { status: 403 });
    }

    const body = await req.json();
    const { type, topic, keywords, tone, title, outline, documentId, platform, framework } = body;

    let systemPrompt = "";
    let userPrompt = "";

    // --- PROMPTS ---
    if (type === "titles") {
        systemPrompt = "You are an SEO expert. Return ONLY a raw JSON array of 5 catchy, SEO-optimized blog titles. Example: [\"Title 1\", \"Title 2\"]. Do not output any other text.";
        userPrompt = `Topic: ${topic}. Keywords: ${keywords}. Tone: ${tone}.`;
    } else if (type === "outline") {
        systemPrompt = "You are a content strategist. Return ONLY a raw JSON array of 6-8 distinct section headers (H2s). Example: [\"Intro\", \"Point 1\"]. Do not output any other text.";
        userPrompt = `Title: ${title}. Tone: ${tone}. Keywords: ${keywords}`;
    } else if (type === "article") {
        systemPrompt = `You are an expert writer. Write a comprehensive, long-form blog post (HTML format). Tone: ${tone}.`;
        userPrompt = `Title: ${title}\n\nOutline:\n${JSON.stringify(outline)}\n\nWrite full content.`;
    } else if (type === "social") {
        systemPrompt = `You are a social media expert for ${platform}. Write 3 distinct post options. Tone: ${tone}.`;
        userPrompt = `Topic: ${topic}\nKeywords: ${keywords}`;
    } else if (type === "ads") {
        systemPrompt = `You are a PPC expert for ${platform} Ads. Write 3 variations. Tone: ${tone}.`;
        userPrompt = `Product: ${topic}\nTarget: ${keywords}`;
    } else if (type === "copywriting") {
        systemPrompt = `Master copywriter using ${framework}. Tone: ${tone}.`;
        userPrompt = `Topic: ${topic}\nContext: ${keywords}`;
    } else {
        systemPrompt = `Writing assistant. Tone: ${tone || "Professional"}.`;
        userPrompt = body.prompt;
    }

    // Call OpenRouter
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "moonshotai/kimi-k2-thinking",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        reasoning: { enabled: true }
      })
    });

    if (!response.ok) {
        const error = await response.text();
        console.error("OpenRouter Error:", error);
        return new NextResponse(`AI Error: ${response.statusText}`, { status: 500 });
    }

    const data = await response.json();
    let generatedContent = data.choices[0]?.message?.content || "";

    // Robust JSON Cleanup for steps that require it
    if (type === "titles" || type === "outline") {
        generatedContent = cleanJson(generatedContent);
    }

    // Word Count
    const wordCount = generatedContent.trim().split(/\s+/).length;

    if (["article", "social", "ads", "copywriting"].includes(type)) {
        if (documentId) {
             await db.document.update({
                where: { id: documentId },
                data: { content: generatedContent }
            });
        }
        await db.user.update({
            where: { id: user.id },
            data: { apiUsage: { increment: wordCount } }
        });
    }

    return NextResponse.json({ result: generatedContent, wordsUsed: wordCount });

  } catch (error: any) {
    console.error("[GENERATE_ERROR]", error);
    return new NextResponse(error.message || "Internal Error", { status: 500 });
  }
}