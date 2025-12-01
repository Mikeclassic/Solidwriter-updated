import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });

    const user = await db.user.findUnique({ where: { email: session.user.email } });
    if (!user) return new NextResponse("User not found", { status: 404 });
    
    // Check Limits (Word Count)
    if (user.apiUsage >= user.usageLimit) {
        return new NextResponse("Word Limit Reached. Please upgrade your plan.", { status: 403 });
    }

    const body = await req.json();
    const { type, topic, keywords, tone, title, outline, documentId, platform, framework } = body;

    let systemPrompt = "";
    let userPrompt = "";

    // ... (Keep existing prompt logic for Blog, Social, Ads, Copywriting) ...
    // Note: I am abbreviating the prompt logic here to save space, 
    // KEEP THE PROMPT LOGIC FROM THE PREVIOUS STEP EXACTLY AS IS.
    
    // --- 1. BLOG ---
    if (type === "titles") {
        systemPrompt = "You are an SEO expert. Return ONLY a raw JSON array of 5 catchy, SEO-optimized blog titles.";
        userPrompt = `Topic: ${topic}. Keywords: ${keywords}. Tone: ${tone}.`;
    } else if (type === "outline") {
        systemPrompt = "You are a content strategist. Return ONLY a raw JSON array of 6-8 distinct section headers (H2s).";
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
        return new NextResponse(`AI Error: ${error}`, { status: 500 });
    }

    const data = await response.json();
    let generatedContent = data.choices[0]?.message?.content || "";

    if (type === "titles" || type === "outline") {
        generatedContent = generatedContent.replace(/```json/g, "").replace(/```/g, "").trim();
    }

    // --- WORD COUNT CALCULATION ---
    // Estimate words by splitting spaces.
    const wordCount = generatedContent.trim().split(/\s+/).length;

    // Check if this specific generation puts them over the limit
    if (user.apiUsage + wordCount > user.usageLimit) {
        // You might decide to allow it to finish or block. 
        // Blocking strict:
        // return new NextResponse("Insufficient word balance.", { status: 403 });
        // Allowing it but capping next time is friendlier.
    }

    if (["article", "social", "ads", "copywriting"].includes(type)) {
        if (documentId) {
             await db.document.update({
                where: { id: documentId },
                data: { content: generatedContent }
            });
        }
        // Increment by WORD COUNT
        await db.user.update({
            where: { id: user.id },
            data: { apiUsage: { increment: wordCount } }
        });
    }

    return NextResponse.json({ result: generatedContent, wordsUsed: wordCount });

  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}