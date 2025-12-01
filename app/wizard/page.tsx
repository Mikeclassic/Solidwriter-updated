"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, Check, ArrowLeft, Wand2, FileText, List } from "lucide-react";

export default function WizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // State for all steps
  const [input, setInput] = useState({ topic: "", keywords: "", tone: "Professional" });
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [outline, setOutline] = useState<string[]>([]);

  // Step 1: Generate Titles
  const handleGenerateTitles = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await fetch('/api/generate', {
            method: 'POST',
            body: JSON.stringify({ type: 'titles', ...input })
        });
        const data = await res.json();
        setGeneratedTitles(JSON.parse(data.result));
        setStep(2);
    } catch(e) { alert("Failed to generate titles"); }
    setLoading(false);
  };

  // Step 2: Generate Outline
  const handleGenerateOutline = async () => {
    if(!selectedTitle) return;
    setLoading(true);
    try {
        const res = await fetch('/api/generate', {
            method: 'POST',
            body: JSON.stringify({ type: 'outline', title: selectedTitle, ...input })
        });
        const data = await res.json();
        setOutline(JSON.parse(data.result));
        setStep(3);
    } catch(e) { alert("Failed to generate outline"); }
    setLoading(false);
  };

  // Step 3: Write Article (Final)
  const handleWriteArticle = async () => {
    setLoading(true);
    try {
        // 1. Create Document Entry First
        const docRes = await fetch('/api/documents', {
            method: 'POST',
            body: JSON.stringify({ title: selectedTitle })
        });
        const doc = await docRes.json();

        // 2. Generate Content & Save (Handled by API)
        const genRes = await fetch('/api/generate', {
            method: 'POST',
            body: JSON.stringify({ 
                type: 'article', 
                title: selectedTitle, 
                outline, 
                tone: input.tone,
                documentId: doc.id
            })
        });

        if (genRes.ok) {
            router.push(`/editor/${doc.id}`);
        } else {
             // Handle Limit Reached
             if(genRes.status === 403) alert("Limit reached! Upgrade plan.");
        }
    } catch(e) { alert("Failed to write article"); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
        <div className="max-w-3xl w-full bg-white rounded-xl shadow-sm border p-8">
            {/* Progress Bar */}
            <div className="flex justify-between mb-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-0"></div>
                {[
                    {n:1, l:"Topic"}, {n:2, l:"Title"}, {n:3, l:"Outline"}, {n:4, l:"Draft"}
                ].map((s) => (
                    <div key={s.n} className={`relative z-10 flex flex-col items-center gap-2 ${step >= s.n ? 'text-primary' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= s.n ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200'}`}>
                            {step > s.n ? <Check className="h-4 w-4"/> : s.n}
                        </div>
                        <span className="text-xs font-medium uppercase">{s.l}</span>
                    </div>
                ))}
            </div>

            {/* STEP 1: TOPIC */}
            {step === 1 && (
                <form onSubmit={handleGenerateTitles} className="space-y-6 animate-in slide-in-from-right duration-300">
                    <div className="text-center space-y-2 mb-8">
                        <h1 className="text-2xl font-bold">What do you want to write about?</h1>
                        <p className="text-muted-foreground">We'll help you structure the perfect article.</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Main Topic</label>
                        <input required value={input.topic} onChange={e=>setInput({...input, topic: e.target.value})} className="w-full border rounded-md p-3" placeholder="e.g. The benefits of Meditation"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Keywords (Optional)</label>
                        <input value={input.keywords} onChange={e=>setInput({...input, keywords: e.target.value})} className="w-full border rounded-md p-3" placeholder="e.g. health, mindfulness, stress"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Tone of Voice</label>
                        <select value={input.tone} onChange={e=>setInput({...input, tone: e.target.value})} className="w-full border rounded-md p-3">
                            <option>Professional</option>
                            <option>Casual</option>
                            <option>Funny</option>
                            <option>Academic</option>
                            <option>Persuasive</option>
                        </select>
                    </div>
                    <button disabled={loading} className="w-full bg-primary text-white py-3 rounded-md font-bold hover:bg-blue-700 flex justify-center items-center gap-2">
                        {loading ? <Loader2 className="animate-spin"/> : <>Generate Titles <ArrowRight className="h-4 w-4"/></>}
                    </button>
                </form>
            )}

            {/* STEP 2: TITLES */}
            {step === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right duration-300">
                    <h2 className="text-xl font-bold text-center">Choose a Title</h2>
                    <div className="space-y-3">
                        {generatedTitles.map((t, i) => (
                            <div key={i} 
                                onClick={() => setSelectedTitle(t)}
                                className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedTitle === t ? 'border-primary bg-blue-50 ring-1 ring-primary' : 'hover:border-gray-400'}`}
                            >
                                <div className="font-medium">{t}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button onClick={()=>setStep(1)} className="px-4 py-2 border rounded-md hover:bg-gray-50">Back</button>
                        <button disabled={!selectedTitle || loading} onClick={handleGenerateOutline} className="flex-1 bg-primary text-white py-2 rounded-md font-bold hover:bg-blue-700 flex justify-center gap-2">
                            {loading ? <Loader2 className="animate-spin"/> : "Generate Outline"}
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 3: OUTLINE */}
            {step === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right duration-300">
                    <h2 className="text-xl font-bold text-center">Review Outline</h2>
                    <p className="text-center text-sm text-muted-foreground">You can edit or remove sections before writing.</p>
                    
                    <div className="space-y-2">
                        {outline.map((item, i) => (
                            <div key={i} className="flex gap-2 items-center">
                                <span className="text-muted-foreground font-mono text-sm w-6">H2</span>
                                <input 
                                    value={item} 
                                    onChange={(e) => {
                                        const newOutline = [...outline];
                                        newOutline[i] = e.target.value;
                                        setOutline(newOutline);
                                    }}
                                    className="flex-1 border rounded-md p-2 text-sm"
                                />
                                <button onClick={()=>{
                                    const newOutline = outline.filter((_, idx) => idx !== i);
                                    setOutline(newOutline);
                                }} className="text-red-500 hover:bg-red-50 p-2 rounded">×</button>
                            </div>
                        ))}
                        <button onClick={()=>setOutline([...outline, "New Section"])} className="text-sm text-primary font-medium hover:underline">+ Add Section</button>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button onClick={()=>setStep(2)} className="px-4 py-2 border rounded-md hover:bg-gray-50">Back</button>
                        <button disabled={loading} onClick={handleWriteArticle} className="flex-1 bg-primary text-white py-2 rounded-md font-bold hover:bg-blue-700 flex justify-center gap-2">
                            {loading ? <><Loader2 className="animate-spin"/> Writing Article...</> : <><Wand2 className="h-4 w-4"/> Write Full Article</>}
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}