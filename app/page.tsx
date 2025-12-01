import Link from "next/link";
import { ArrowRight, Check, Bot, Zap, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-6 h-16 flex items-center justify-between border-b">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <Bot className="h-6 w-6" />
          Solidwriter
        </div>
        <nav className="flex gap-4">
          <Link href="/api/auth/signin">
             <button className="px-4 py-2 text-sm font-medium text-primary hover:underline">Log in</button>
          </Link>
          <Link href="/dashboard">
             <button className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Get Started Free</button>
          </Link>
        </nav>
      </header>

      <section className="flex-1 py-20 px-6 text-center max-w-5xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Write Better Content With <span className="text-primary">AI</span> That Understands You.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Solidwriter combines powerful Moonshot AI reasoning with intuitive tools to help you create engaging content faster than ever before.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
             <button className="bg-primary text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                Start Writing Now <ArrowRight className="h-5 w-5"/>
             </button>
          </Link>
        </div>
      </section>

      <section className="bg-secondary/50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border space-y-4">
                <Zap className="h-10 w-10 text-primary"/>
                <h3 className="text-xl font-bold">Moonshot K2 Reasoning</h3>
                <p className="text-muted-foreground">Powered by advanced reasoning models that think before they write.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border space-y-4">
                <Bot className="h-10 w-10 text-primary"/>
                <h3 className="text-xl font-bold">Usage Controls</h3>
                <p className="text-muted-foreground">Smart credit system to manage your generation limits efficiently.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border space-y-4">
                <Shield className="h-10 w-10 text-primary"/>
                <h3 className="text-xl font-bold">Enterprise Secure</h3>
                <p className="text-muted-foreground">Your data is encrypted and safe. Built for production workloads.</p>
            </div>
        </div>
      </section>

      <footer className="border-t py-12 text-center text-muted-foreground">
        © 2024 Solidwriter. All rights reserved.
      </footer>
    </div>
  );
}
