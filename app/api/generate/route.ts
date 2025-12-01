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
    
    if (user.apiUsage >= user.usageLimit) {
        return new NextResponse("Usage Limit Reached. Please upgrade.", { status: 403 });
    }

    const body = await req.json();
    const { type, topic, keywords, tone, title, outline, documentId, platform, framework } = body;

    let systemPrompt = "";
    let userPrompt = "";

    // --- 1. BLOG WORKFLOW ---
    if (type === "titles") {
        systemPrompt = "You are an SEO expert. Return ONLY a raw JSON array of 5 catchy, SEO-optimized blog titles. No markdown.";
        userPrompt = `Topic: ${topic}. Keywords: ${keywords}. Tone: ${tone}.`;
    } 
    else if (type === "outline") {
        systemPrompt = "You are a content strategist. Return ONLY a raw JSON array of 6-8 distinct section headers (H2s). No markdown.";
        userPrompt = `Title: ${title}. Tone: ${tone}. Keywords: ${keywords}`;
    } 
    else if (type === "article") {
        systemPrompt = `You are an expert writer. Write a comprehensive, long-form blog post (HTML format). Use <h2> tags. Tone: ${tone}.`;
        userPrompt = `Title: ${title}\n\nOutline:\n${JSON.stringify(outline)}\n\nWrite full content.`;
    }
    
    // --- 2. SOCIAL MEDIA ---
    else if (type === "social") {
        systemPrompt = `You are a social media expert specializing in ${platform}. Write 3 distinct post options. Use emojis if appropriate for the platform. Tone: ${tone}.`;
        userPrompt = `Topic: ${topic}\nKeywords: ${keywords}\n\nGenerate 3 variations.`;
    }

    // --- 3. ADVERTISEMENTS ---
    else if (type === "ads") {
        systemPrompt = `You are a PPC expert specializing in ${platform} Ads. Write 3 variations including Headline and Primary Text. Tone: ${tone}.`;
        userPrompt = `Product/Service: ${topic}\nTarget Audience/Keywords: ${keywords}\n\nGenerate 3 ad variations.`;
    }

    // --- 4. COPYWRITING FRAMEWORKS ---
    else if (type === "copywriting") {
        systemPrompt = `You are a master copywriter using the ${framework} framework. Tone: ${tone}.`;
        userPrompt = `Product/Topic: ${topic}\nContext: ${keywords}\n\nWrite a compelling copy using ${framework} structure.`;
    }

    // --- 5. EDITOR ASSISTANT ---
    else {
        systemPrompt = `You are a writing assistant. Tone: ${tone || "Professional"}.`;
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

    // Cleanup JSON for blog steps
    if (type === "titles" || type === "outline") {
        generatedContent = generatedContent.replace(/```json/g, "").replace(/```/g, "").trim();
    }

    // Save to DB (Auto-save) if it's a final generation step
    if (["article", "social", "ads", "copywriting"].includes(type)) {
        if (documentId) {
             await db.document.update({
                where: { id: documentId },
                data: { content: generatedContent }
            });
        }
        await db.user.update({
            where: { id: user.id },
            data: { apiUsage: { increment: 1 } }
        });
    }

    return NextResponse.json({ result: generatedContent });

  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}