"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, Save, Sparkles, Loader2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Editor({ params }: { params: { id: string } }) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [showAi, setShowAi] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Load Doc and Credits
  useEffect(() => {
    fetch(`/api/documents/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setContent(data.content || "");
        setTitle(data.title || "");
      });

    fetch('/api/user/usage')
      .then(res => res.json())
      .then(data => {
        if(data) setCredits(data.usageLimit - data.apiUsage);
      });
  }, [params.id]);

  const saveDoc = async () => {
    setSaving(true);
    await fetch(`/api/documents/${params.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ content, title })
    });
    setSaving(false);
  };

  const generateAI = async () => {
    if (!prompt) return;
    setGenerating(true);
    setErrorMsg("");
    
    try {
        const res = await fetch('/api/generate', {
            method: 'POST',
            body: JSON.stringify({ 
                prompt, 
                tone: 'Professional', 
                documentId: params.id 
            })
        });

        if (res.status === 403) {
            setErrorMsg("Limit Reached! Upgrade to continue.");
            setGenerating(false);
            return;
        }

        if (!res.ok) throw new Error("Generation failed");

        const data = await res.json();
        const newContent = content + "\n\n" + data.content;
        setContent(newContent);
        setShowAi(false);
        setPrompt("");
        // Update local credit count
        if (credits !== null) setCredits(credits - 1);

    } catch (e) {
        setErrorMsg("Failed to generate content.");
    } finally {
        setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      {/* Editor Header */}
      <header className="h-16 border-b flex items-center justify-between px-6 bg-white shrink-0">
        <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-5 w-5"/></Link>
            <input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="font-semibold text-lg bg-transparent focus:outline-none"
                placeholder="Untitled Document"
            />
        </div>
        <div className="flex items-center gap-2">
            <button 
                onClick={() => setShowAi(!showAi)}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-50 text-purple-700 font-medium hover:bg-purple-100 transition-colors"
            >
                <Sparkles className="h-4 w-4"/> AI Writer
                {credits !== null && <span className="text-xs bg-purple-200 px-2 py-0.5 rounded-full">{credits} left</span>}
            </button>
            <button 
                onClick={saveDoc}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white font-medium hover:bg-blue-700 transition-colors"
                disabled={saving}
            >
                {saving ? <Loader2 className="h-4 w-4 animate-spin"/> : <Save className="h-4 w-4"/>} 
                Save
            </button>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Text Area */}
        <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing or use AI..."
                className="w-full h-full resize-none focus:outline-none text-lg leading-relaxed text-gray-700"
            />
        </div>

        {/* AI Sidebar */}
        {showAi && (
            <div className="w-80 border-l bg-gray-50 p-6 flex flex-col shadow-xl animate-in slide-in-from-right duration-300">
                <h3 className="font-bold mb-4 flex items-center gap-2"><BotIcon className="h-5 w-5 text-purple-600"/> AI Assistant</h3>
                
                {errorMsg && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-md text-red-700 text-sm flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4"/> {errorMsg}
                    </div>
                )}

                <div className="space-y-4 flex-1">
                    <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">Prompt</label>
                        <textarea 
                            className="w-full border rounded-md p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" 
                            rows={6}
                            placeholder="e.g. Write an intro about the benefits of strawberries..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={generateAI}
                        disabled={generating || !prompt}
                        className="w-full bg-purple-600 text-white py-2 rounded-md font-medium hover:bg-purple-700 disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                        {generating ? <Loader2 className="h-4 w-4 animate-spin"/> : <Sparkles className="h-4 w-4"/>}
                        Generate Content
                    </button>
                </div>
                <div className="mt-4 text-xs text-muted-foreground text-center">
                    Powered by Moonshot K2 Thinking
                </div>
            </div>
        )}
      </div>
    </div>
  );
}

function BotIcon({className}: {className?: string}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
    )
}
