"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, FileText, Loader2, Zap, LogOut, Wand2, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const [docs, setDocs] = useState<any[]>([]);
  // Default to 25k words
  const [usage, setUsage] = useState({ apiUsage: 0, usageLimit: 25000, plan: 'TRIAL' }); 
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/documents')
      .then(res => {
          if (res.status === 401) router.push('/auth');
          return res.json();
      })
      .then(data => {
          setDocs(Array.isArray(data) ? data : []);
      });

    fetch('/api/user/usage')
      .then(res => res.json())
      .then(data => {
        if(data) setUsage(data);
        setLoading(false);
      });
  }, [router]);

  // Calculate percentage
  const usagePercent = Math.min((usage.apiUsage / usage.usageLimit) * 100, 100);

  // Formatting helper
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="min-h-screen bg-secondary/30">
        <div className="max-w-6xl mx-auto p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                     <h1 className="text-3xl font-bold">Dashboard</h1>
                     <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded uppercase">
                        {usage.plan} PLAN
                     </div>
                     <button 
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="text-sm text-muted-foreground hover:text-red-500 flex items-center gap-1 bg-white px-3 py-1 rounded border shadow-sm"
                     >
                        <LogOut className="h-4 w-4"/> Sign Out
                     </button>
                </div>

                <div className="flex gap-4 items-center">
                    {/* USAGE CARD */}
                    <div className="bg-white px-4 py-2 rounded-lg border flex flex-col min-w-[200px]">
                        <div className="text-xs text-muted-foreground flex items-center justify-between font-semibold uppercase mb-1">
                             <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-yellow-500" fill="currentColor"/> Words Used</span>
                             <Link href="/pricing" className="text-primary hover:underline text-[10px]">Upgrade</Link>
                        </div>
                        <div className="flex items-end gap-2">
                             <span className="font-bold text-lg">{formatNumber(usage.apiUsage)}</span>
                             <span className="text-sm text-muted-foreground">/ {formatNumber(usage.usageLimit)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-secondary mt-1 rounded-full overflow-hidden">
                             <div className="h-full bg-primary transition-all duration-500" style={{ width: `${usagePercent}%` }}></div>
                        </div>
                    </div>
                    
                    <Link href="/wizard">
                        <button className="bg-primary text-white px-4 py-3 rounded-md flex items-center gap-2 hover:bg-blue-700 h-full shadow-md">
                            <Wand2 className="h-4 w-4" /> New Content
                        </button>
                    </Link>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin h-8 w-8 text-primary"/></div>
            ) : docs.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border">
                    <h2 className="text-xl font-semibold mb-2">No documents yet</h2>
                    <p className="text-muted-foreground mb-4">Start creating content with AI power.</p>
                    <Link href="/wizard">
                        <button className="text-primary font-medium hover:underline">Launch Wizard</button>
                    </Link>
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