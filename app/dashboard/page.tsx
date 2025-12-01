"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, FileText, Loader2, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [docs, setDocs] = useState<any[]>([]);
  const [usage, setUsage] = useState({ apiUsage: 0, usageLimit: 10 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch Docs
    fetch('/api/documents')
      .then(res => {
          if (res.status === 401) router.push('/api/auth/signin');
          return res.json();
      })
      .then(data => {
          setDocs(Array.isArray(data) ? data : []);
      });

    // Fetch Usage
    fetch('/api/user/usage')
      .then(res => res.json())
      .then(data => {
        if(data) setUsage(data);
        setLoading(false);
      });
  }, [router]);

  const createDoc = async () => {
    const res = await fetch('/api/documents', {
        method: 'POST',
        body: JSON.stringify({ title: 'New Article' })
    });
    const doc = await res.json();
    router.push(`/editor/${doc.id}`);
  };

  const usagePercent = Math.min((usage.apiUsage / usage.usageLimit) * 100, 100);

  return (
    <div className="min-h-screen bg-secondary/30">
        <div className="max-w-6xl mx-auto p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="flex gap-4 items-center">
                    <div className="bg-white px-4 py-2 rounded-lg border flex flex-col min-w-[150px]">
                        <div className="text-xs text-muted-foreground flex items-center gap-1 font-semibold uppercase">
                             <Zap className="h-3 w-3 text-yellow-500" fill="currentColor"/> Credits
                        </div>
                        <div className="flex items-end gap-2">
                             <span className="font-bold text-lg">{usage.apiUsage}</span>
                             <span className="text-sm text-muted-foreground">/ {usage.usageLimit}</span>
                        </div>
                        <div className="h-1 w-full bg-secondary mt-1 rounded-full overflow-hidden">
                             <div className="h-full bg-primary" style={{ width: `${usagePercent}%` }}></div>
                        </div>
                    </div>
                    <button onClick={createDoc} className="bg-primary text-white px-4 py-3 rounded-md flex items-center gap-2 hover:bg-blue-700 h-full">
                        <Plus className="h-4 w-4" /> New Document
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin h-8 w-8 text-primary"/></div>
            ) : docs.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border">
                    <h2 className="text-xl font-semibold mb-2">No documents yet</h2>
                    <p className="text-muted-foreground mb-4">Start writing your next masterpiece.</p>
                    <button onClick={createDoc} className="text-primary font-medium hover:underline">Create one now</button>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {docs.map((doc) => (
                        <Link href={`/editor/${doc.id}`} key={doc.id} className="block group">
                            <div className="bg-white p-6 rounded-xl border h-48 flex flex-col justify-between group-hover:border-primary transition-all shadow-sm group-hover:shadow-md">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-blue-50 rounded-lg text-primary"><FileText className="h-6 w-6"/></div>
                                    <div>
                                        <h3 className="font-semibold line-clamp-1">{doc.title}</h3>
                                        <p className="text-xs text-muted-foreground">{new Date(doc.updatedAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
}
