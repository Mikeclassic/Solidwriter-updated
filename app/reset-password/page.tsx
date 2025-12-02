"use client";
import { useState, Suspense } from "react";
import { Loader2, Lock, Bot } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!token) {
        setError("Missing token");
        setLoading(false);
        return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });

      if (!res.ok) throw new Error(await res.text());
      
      router.push("/auth");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-card rounded-2xl shadow-lg p-8 border">
        <div className="flex justify-center mb-6 text-primary">
          <Bot className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">New Password</h2>
        <p className="text-center text-muted-foreground mb-6">Enter your new password below.</p>

        {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-lg mb-4 text-sm text-center">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">New Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input type="password" required className="w-full pl-10 pr-3 py-2 border rounded-lg bg-background" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>
          <button disabled={loading} className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 flex justify-center gap-2">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />} Reset Password
          </button>
        </form>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans">
        <Suspense fallback={<Loader2 className="animate-spin" />}>
            <ResetForm />
        </Suspense>
    </div>
  );
}