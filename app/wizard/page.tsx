"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, Check, Wand2, PenTool, Share2, Megaphone, FileText, ArrowLeft, LayoutTemplate } from "lucide-react";

type WizardMode = "blog" | "social" | "ads" | "copywriting" | null;

export default function WizardPage() {
  const router = useRouter();
  const [mode, setMode] = useState<WizardMode>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Common State
  const [input, setInput] = useState({ 
    topic: "", 
    keywords: "", 
    tone: "Professional",
    platform: "LinkedIn", // For Social/Ads
    framework: "AIDA" // For Copywriting
  });

  // Blog Specific State
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [outline, setOutline] = useState<string[]>([]);

  // --- HANDLERS ---

  // 1. BLOG FLOW
  const handleBlogTitles = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await fetch('/api/generate', { method: 'POST', body: JSON.stringify({ type: 'titles', ...input }) });
        const data = await res.json();
        setGeneratedTitles(JSON.parse(data.result));
        setStep(2);
    } catch(e) { alert("Error generating titles"); }
    setLoading(false);
  };

  const handleBlogOutline = async () => {
    if(!selectedTitle) return;
    setLoading(true);
    try {
        const res = await fetch('/api/generate', { method: 'POST', body: JSON.stringify({ type: 'outline', title: selectedTitle, ...input }) });
        const data = await res.json();
        setOutline(JSON.parse(data.result));
        setStep(3);
    } catch(e) { alert("Error generating outline"); }
    setLoading(false);
  };

  const handleBlogFinal = async () => {
    setLoading(true);
    try {
        const docRes = await fetch('/api/documents', { method: 'POST', body: JSON.stringify({ title: selectedTitle }) });
        const doc = await docRes.json();
        const genRes = await fetch('/api/generate', {
            method: 'POST',
            body: JSON.stringify({ type: 'article', title: selectedTitle, outline, documentId: doc.id, ...input })
        });
        if (genRes.ok) router.push(`/editor/${doc.id}`);
        else if(genRes.status === 403) alert("Limit reached!");
    } catch(e) { alert("Error writing article"); }
    setLoading(false);
  };

  // 2. SOCIAL / ADS / COPY FLOW (Single Step)
  const handleQuickGen = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        // FIX: Explicitly type titleMap so TypeScript accepts 'mode' as a key
        const titleMap: Record<string, string> = { 
            social: "Social Post", 
            ads: "Ad Copy", 
            copywriting: "Marketing Copy" 
        };
        
        // Fallback to "Content" if mode is somehow mismatching, though logic prevents it
        const safeTitle = titleMap[mode!] || "Content"; 
        const displayTitle = `${safeTitle}: ${input.topic.substring(0, 20)}...`;

        const docRes = await fetch('/api/documents', { method: 'POST', body: JSON.stringify({ title: displayTitle }) });
        const doc = await docRes.json();

        const genRes = await fetch('/api/generate', {
            method: 'POST',
            body: JSON.stringify({ type: mode, documentId: doc.id, ...input })
        });
        
        if (genRes.ok) router.push(`/editor/${doc.id}`);
        else if(genRes.status === 403) alert("Limit reached!");
    } catch(e) { alert("Error generating content"); }
    setLoading(false);
  };

  // --- RENDERERS ---

  if (!mode) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4">
            <h1 className="text-3xl font-bold mb-2">What do you want to create?</h1>
            <p className="text-muted-foreground mb-10">Select a workflow to get started.</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full">
                <Card 
                    icon={<PenTool className="h-8 w-8 text-blue-500"/>} 
                    title="Blog Post" 
                    desc="Multi-step wizard for SEO articles" 
                    onClick={() => setMode("blog")}
                />
                <Card 
                    icon={<Share2 className="h-8 w-8 text-pink-500"/>} 
                    title="Social Media" 
                    desc="Posts for LinkedIn, X, & Instagram" 
                    onClick={() => setMode("social")}
                />
                <Card 
                    icon={<Megaphone className="h-8 w-8 text-orange-500"/>} 
                    title="Advertisement" 
                    desc="Google & FB Ad copy variations" 
                    onClick={() => setMode("ads")}
                />
                <Card 
                    icon={<LayoutTemplate className="h-8 w-8 text-purple-500"/>} 
                    title="Copywriting" 
                    desc="Frameworks like AIDA, PAS, BAB" 
                    onClick={() => setMode("copywriting")}
                />
            </div>
            <button onClick={() => router.push('/dashboard')} className="mt-12 text-muted-foreground hover:text-foreground flex items-center gap-2">
                <ArrowLeft className="h-4 w-4"/> Back to Dashboard
            </button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
        <div className="max-w-3xl w-full bg-white rounded-xl shadow-sm border p-8 relative">
            <button onClick={() => { setMode(null); setStep(1); }} className="absolute top-6 left-6 text-gray-400 hover:text-gray-600">
                <ArrowLeft className="h-5 w-5"/>
            </button>
            
            <h1 className="text-2xl font-bold text-center mb-6 capitalize">{mode === 'blog' ? 'Blog Writer' : `${mode} Generator`}</h1>

            {/* --- BLOG WIZARD UI --- */}
            {mode === 'blog' && (
                <>
                    {/* Progress */}
                    <div className="flex justify-between mb-8 relative">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-0"></div>
                        {[{n:1,l:"Topic"},{n:2,l:"Title"},{n:3,l:"Outline"},{n:4,l:"Draft"}].map((s) => (
                            <div key={s.n} className={`relative z-10 flex flex-col items-center gap-2 ${step >= s.n ? 'text-primary' : 'text-gray-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= s.n ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200'}`}>
                                    {step > s.n ? <Check className="h-4 w-4"/> : s.n}
                                </div>
                                <span className="text-xs font-medium uppercase">{s.l}</span>
                            </div>
                        ))}
                    </div>

                    {step === 1 && (
                        <form onSubmit={handleBlogTitles} className="space-y-6">
                            <InputFields input={input} setInput={setInput} />
                            <Button loading={loading} text="Generate Titles" />
                        </form>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-center">Select a Title</h2>
                            <div className="space-y-3">
                                {generatedTitles.map((t, i) => (
                                    <div key={i} onClick={() => setSelectedTitle(t)} className={`p-4 border rounded-lg cursor-pointer ${selectedTitle === t ? 'border-primary bg-blue-50 ring-1 ring-primary' : 'hover:border-gray-400'}`}>{t}</div>
                                ))}
                            </div>
                            <div className="flex gap-3">
                                <button onClick={()=>setStep(1)} className="px-4 py-2 border rounded">Back</button>
                                <Button loading={loading} text="Generate Outline" onClick={handleBlogOutline} disabled={!selectedTitle} />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-center">Edit Outline</h2>
                            <div className="space-y-2">
                                {outline.map((item, i) => (
                                    <div key={i} className="flex gap-2 items-center">
                                        <span className="text-xs font-mono text-muted-foreground">H2</span>
                                        <input value={item} onChange={(e) => { const n = [...outline]; n[i] = e.target.value; setOutline(n); }} className="flex-1 border rounded p-2 text-sm"/>
                                        <button onClick={()=>setOutline(outline.filter((_,x)=>x!==i))} className="text-red-500 hover:bg-red-50 p-2">×</button>
                                    </div>
                                ))}
                                <button onClick={()=>setOutline([...outline,"New Section"])} className="text-sm text-primary">+ Add Section</button>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={()=>setStep(2)} className="px-4 py-2 border rounded">Back</button>
                                <Button loading={loading} text="Write Article" onClick={handleBlogFinal} icon={<Wand2 className="h-4 w-4"/>} />
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* --- OTHER WIZARDS UI (Single Step) --- */}
            {mode !== 'blog' && (
                <form onSubmit={handleQuickGen} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Topic / Product</label>
                        <textarea required rows={3} value={input.topic} onChange={e=>setInput({...input, topic: e.target.value})} className="w-full border rounded-md p-3" placeholder="Describe what you want to write about..."/>
                    </div>
                    
                    {/* Platform Selector (Social/Ads) */}
                    {(mode === 'social' || mode === 'ads') && (
                        <div>
                            <label className="block text-sm font-medium mb-2">Platform</label>
                            <select value={input.platform} onChange={e=>setInput({...input, platform: e.target.value})} className="w-full border rounded-md p-3">
                                {mode === 'social' ? (
                                    <>
                                        <option>LinkedIn</option>
                                        <option>Twitter / X</option>
                                        <option>Instagram</option>
                                        <option>Facebook Post</option>
                                    </>
                                ) : (
                                    <>
                                        <option>Google Search Ads</option>
                                        <option>Facebook Ads</option>
                                        <option>Instagram Ads</option>
                                    </>
                                )}
                            </select>
                        </div>
                    )}

                    {/* Framework Selector (Copywriting) */}
                    {mode === 'copywriting' && (
                        <div>
                            <label className="block text-sm font-medium mb-2">Framework</label>
                            <select value={input.framework} onChange={e=>setInput({...input, framework: e.target.value})} className="w-full border rounded-md p-3">
                                <option value="AIDA">AIDA (Attention, Interest, Desire, Action)</option>
                                <option value="PAS">PAS (Problem, Agitation, Solution)</option>
                                <option value="BAB">BAB (Before, After, Bridge)</option>
                                <option value="4Ps">4Ps (Picture, Promise, Prove, Push)</option>
                            </select>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Keywords (Optional)</label>
                            <input value={input.keywords} onChange={e=>setInput({...input, keywords: e.target.value})} className="w-full border rounded-md p-3"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Tone</label>
                            <select value={input.tone} onChange={e=>setInput({...input, tone: e.target.value})} className="w-full border rounded-md p-3">
                                <option>Professional</option>
                                <option>Casual</option>
                                <option>Excited</option>
                                <option>Witty</option>
                                <option>Urgent</option>
                            </select>
                        </div>
                    </div>
                    
                    <Button loading={loading} text="Generate Content" icon={<Wand2 className="h-4 w-4"/>} />
                </form>
            )}
        </div>
    </div>
  );
}

// Sub-components for cleaner code
function Card({icon, title, desc, onClick}: any) {
    return (
        <div onClick={onClick} className="bg-white p-6 rounded-xl border hover:border-primary cursor-pointer hover:shadow-md transition-all group text-center flex flex-col items-center">
            <div className="mb-4 p-3 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors">{icon}</div>
            <h3 className="font-bold text-lg mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
    )
}

function InputFields({input, setInput}: any) {
    return (
        <>
            <div>
                <label className="block text-sm font-medium mb-2">Topic</label>
                <input required value={input.topic} onChange={e=>setInput({...input, topic: e.target.value})} className="w-full border rounded-md p-3" placeholder="e.g. Benefits of Yoga"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Keywords</label>
                    <input value={input.keywords} onChange={e=>setInput({...input, keywords: e.target.value})} className="w-full border rounded-md p-3"/>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Tone</label>
                    <select value={input.tone} onChange={e=>setInput({...input, tone: e.target.value})} className="w-full border rounded-md p-3">
                        <option>Professional</option>
                        <option>Casual</option>
                        <option>Witty</option>
                        <option>Academic</option>
                    </select>
                </div>
            </div>
        </>
    )
}

function Button({loading, text, onClick, disabled, icon}: any) {
    return (
        <button disabled={loading || disabled} onClick={onClick} className="w-full bg-primary text-white py-3 rounded-md font-bold hover:bg-blue-700 flex justify-center items-center gap-2 disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin"/> : <>{text} {icon || <ArrowRight className="h-4 w-4"/>}</>}
        </button>
    )
}