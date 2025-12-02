"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

interface SmartStartButtonProps {
  text?: string;
  className?: string;
  variant?: "primary" | "outline";
}

export default function SmartStartButton({ 
  text = "Start Writing Now", 
  className = "",
  variant = "primary" 
}: SmartStartButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/session");
      const session = await res.json();

      if (session && Object.keys(session).length > 0) {
        router.push("/wizard");
      } else {
        router.push("/auth");
      }
    } catch (error) {
      router.push("/auth");
    } finally {
      // Keep loading until redirect
    }
  };

  const baseStyles = "px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-primary text-primary-foreground hover:shadow-xl hover:scale-105",
    outline: "border-2 border-primary text-primary hover:bg-primary/5"
  };

  const variantStyle = variant === 'outline' ? variants.outline : variants.primary;

  return (
    <button 
      onClick={handleClick} 
      disabled={loading}
      className={`${baseStyles} ${variantStyle} ${className} disabled:opacity-70 disabled:cursor-not-allowed`}
    >
      {loading ? <Loader2 className="h-5 w-5 animate-spin"/> : text}
      {!loading && <ArrowRight className="h-5 w-5"/>}
    </button>
  );
}