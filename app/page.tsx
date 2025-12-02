import Link from "next/link";
import { Check, Bot, Zap, Shield, Sparkles, PenTool, LayoutTemplate, Megaphone, Share2, Globe, Cpu } from "lucide-react";
import SmartStartButton from "@/components/smart-start-button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background text-foreground overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <header className="px-6 h-20 flex items-center justify-between border-b bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bot className="h-6 w-6" />
          </div>
          Solidwriter
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
        </nav>
        <div className="flex gap-4">
          <Link href="/auth">
             <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Log in</button>
          </Link>
          <SmartStartButton text="Get Started" className="!px-5 !py-2 !text-sm !shadow-none" />
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-400/5 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide border border-primary/20">
            <Sparkles className="h-3 w-3" /> New: AI Copywriting Frameworks
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Write Content That <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Actually Converts.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stop staring at a blank cursor. Solidwriter helps you research, structure, and write articles, ads, and social posts in your unique brand voice—10x faster.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <SmartStartButton />
            <a href="#how-it-works">
                <button className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-bold border border-border bg-card text-foreground hover:bg-secondary transition-all flex items-center justify-center gap-2">
                    See How It Works
                </button>
            </a>
          </div>

          <div className="pt-6 flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
               {[1,2,3,4].map(i => (
                   <div key={i} className={`w-8 h-8 rounded-full border-2 border-background bg-gray-200 bg-[url('https://i.pravatar.cc/100?img=${i+10}')] bg-cover`}></div>
               ))}
            </div>
            <p>Join 10,000+ writers. <span className="font-semibold text-primary">No credit card required.</span></p>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF --- */}
      <section className="py-10 border-y bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">Trusted by modern marketing teams</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {['Acme Corp', 'GlobalTech', 'Nebula', 'SaaS Flow', 'BrightPath'].map((logo) => (
                    <div key={logo} className="font-bold text-xl">{logo}</div>
                ))}
            </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold">More than just a chatbot.</h2>
                <p className="text-xl text-muted-foreground">A complete suite of tools designed for professional content creation.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-background p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                    <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                        <PenTool className="h-7 w-7"/>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Long-Form Wizard</h3>
                    <p className="text-muted-foreground">Don't just generate text. Generate strategy. Our 4-step wizard builds titles, outlines, and full SEO-optimized articles.</p>
                </div>

                <div className="bg-background p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                    <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform">
                        <Share2 className="h-7 w-7"/>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Multi-Channel Social</h3>
                    <p className="text-muted-foreground">Turn one idea into a LinkedIn think-piece, a Twitter thread, and an Instagram caption instantly.</p>
                </div>

                <div className="bg-background p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                    <div className="w-14 h-14 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform">
                        <LayoutTemplate className="h-7 w-7"/>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Copywriting Frameworks</h3>
                    <p className="text-muted-foreground">Stuck on a landing page? Use proven formulas like AIDA, PAS, and BAB to write copy that sells.</p>
                </div>
                
                <div className="bg-background p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group md:col-span-2 relative overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                        <div className="flex-1 space-y-4">
                            <div className="w-14 h-14 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mb-2 text-green-600 group-hover:scale-110 transition-transform">
                                <Cpu className="h-7 w-7"/>
                            </div>
                            <h3 className="text-2xl font-bold">Deep Reasoning Engine</h3>
                            <p className="text-muted-foreground">
                                Powered by an advanced <strong>Chain-of-Thought architecture</strong>. Unlike standard models that predict the next word, our engine maps out logic, structure, and intent before writing. This results in content with superior factual accuracy and human-like nuance.
                            </p>
                        </div>
                        <div className="flex-1 bg-secondary/50 rounded-xl p-6 w-full border border-border/50">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-xs font-mono text-primary mb-2">
                                    <Sparkles className="h-3 w-3"/> Analyzing Semantic Context...
                                </div>
                                <div className="h-2 w-1/3 bg-primary/20 rounded"></div>
                                <div className="h-2 w-full bg-muted-foreground/10 rounded"></div>
                                <div className="h-2 w-full bg-muted-foreground/10 rounded"></div>
                                <div className="h-2 w-2/3 bg-muted-foreground/10 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-background p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                    <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mb-6 text-red-600 group-hover:scale-110 transition-transform">
                        <Globe className="h-7 w-7"/>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">8+ Languages</h3>
                    <p className="text-muted-foreground">Expand your reach globally. Write natively in Spanish, French, German, and more.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="py-24 px-6 bg-background relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-20">From Idea to Article in Minutes</h2>
            <div className="grid md:grid-cols-3 gap-12">
                <div className="relative flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-background border-4 border-primary text-primary flex items-center justify-center text-2xl font-bold z-10">1</div>
                    <h3 className="text-xl font-bold">Choose Topic & Tone</h3>
                    <p className="text-muted-foreground">Tell the AI what you want to write about and who your audience is.</p>
                </div>
                <div className="relative flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-background border-4 border-primary text-primary flex items-center justify-center text-2xl font-bold z-10">2</div>
                    <h3 className="text-xl font-bold">Review Outline</h3>
                    <p className="text-muted-foreground">The AI generates a structured outline. Edit, add, or remove sections.</p>
                </div>
                <div className="relative flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-background border-4 border-primary text-primary flex items-center justify-center text-2xl font-bold z-10">3</div>
                    <h3 className="text-xl font-bold">Generate & Export</h3>
                    <p className="text-muted-foreground">Get a full draft in seconds. Export to PDF, Markdown, or HTML.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-24 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Transparent Pricing</h2>
                <p className="text-xl text-muted-foreground">Start your 7-day free trial on any plan.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                 {[
                     {name: 'Starter', price: '$12', words: '25,000', popular: false},
                     {name: 'Standard', price: '$24', words: '100,000', popular: true},
                     {name: 'Unlimited', price: '$72', words: 'Unlimited', popular: false}
                 ].map((plan) => (
                     <div key={plan.name} className={`relative bg-card p-8 rounded-3xl border shadow-sm transition-all hover:border-primary flex flex-col ${plan.popular ? 'border-primary ring-1 ring-primary shadow-xl scale-105 z-10' : 'border-border'}`}>
                        {plan.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>}
                        
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <div className="my-4">
                            <span className="text-5xl font-extrabold tracking-tight text-foreground">{plan.price}</span>
                            <span className="text-muted-foreground font-medium">/mo</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-8 pb-8 border-b">
                            {plan.name === 'Unlimited' ? 'For agencies requiring maximum scale.' : 'Perfect for creators and small teams.'}
                        </p>
                        
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex gap-3 text-sm items-center text-foreground"><Check className="h-4 w-4 text-green-500"/> {plan.words} Words / month</li>
                            <li className="flex gap-3 text-sm items-center text-foreground"><Check className="h-4 w-4 text-green-500"/> Access to All Wizards</li>
                            <li className="flex gap-3 text-sm items-center text-foreground"><Check className="h-4 w-4 text-green-500"/> 30+ Languages</li>
                            <li className="flex gap-3 text-sm items-center text-foreground"><Check className="h-4 w-4 text-green-500"/> Priority Support</li>
                        </ul>
                        
                        <Link href="/pricing" className="block w-full">
                            <button className={`w-full py-4 rounded-xl font-bold transition-all shadow-sm ${
                                plan.popular 
                                    ? 'bg-primary text-primary-foreground hover:shadow-lg hover:-translate-y-0.5' 
                                    : 'bg-background text-foreground border-2 border-muted hover:border-primary hover:text-primary'
                            }`}>
                                Start 7-Day Free Trial
                            </button>
                        </Link>
                        <p className="text-center text-[10px] uppercase tracking-wider text-muted-foreground mt-4 font-semibold">No credit card required</p>
                     </div>
                 ))}
            </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-card to-background rounded-3xl p-12 border border-border shadow-lg">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to scale your content?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of modern writers who use Solidwriter to create high-quality content 10x faster.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <SmartStartButton text="Start Your Free Trial" />
            </div>
            <p className="mt-6 text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Shield className="h-4 w-4"/> 7-day free trial. Cancel anytime.
            </p>
        </div>
      </section>

      <footer className="border-t py-12 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 font-bold text-xl text-primary">
              <Bot className="h-6 w-6" /> Solidwriter
            </div>
            <div className="text-sm text-muted-foreground">
                © 2024 Solidwriter Inc. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground">Privacy Policy</a>
                <a href="#" className="hover:text-foreground">Terms of Service</a>
                <a href="#" className="hover:text-foreground">Support</a>
            </div>
        </div>
      </footer>
    </div>
  );
}