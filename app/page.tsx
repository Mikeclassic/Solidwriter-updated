import Link from "next/link";
import { Check, Bot, Zap, Shield, Sparkles, PenTool, LayoutTemplate, Megaphone, Share2, Globe, Cpu, Hexagon, Triangle, Circle, Box, Layers } from "lucide-react";
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
          <a href="#how-it-works" className="hover:text-primary transition-colors">Workflow</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
        </nav>
        <div className="flex gap-4">
          <Link href="/auth">
             <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Log in</button>
          </Link>
          <SmartStartButton text="Get Started" className="!px-5 !py-2 !text-sm !shadow-none" />
        </div>
      </header>

      {/* --- HERO SECTION (Clean Version) --- */}
      <section className="relative pt-24 pb-32 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wide border border-border">
            <Sparkles className="h-3 w-3 text-primary" /> V2.0: Cognitive Architecture
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Content That Resonates. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Intelligence That Adapts.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience the next generation of writing assistants. Solidwriter uses advanced chain-of-thought reasoning to research, structure, and generate high-conversion copy in your unique brand voice.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <SmartStartButton text="Start Free Trial" />
            <a href="#how-it-works">
                <button className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-bold border border-border bg-card text-foreground hover:bg-secondary transition-all flex items-center justify-center gap-2">
                    View Workflow
                </button>
            </a>
          </div>

          {/* AVATARS (Real Images) */}
          <div className="pt-8 flex flex-col items-center gap-3 text-sm text-muted-foreground">
            <div className="flex -space-x-3">
               {[
                 "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
                 "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces",
                 "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces",
                 "https://images.unsplash.com/photo-1521119989659-a83eee488058?w=64&h=64&fit=crop&crop=faces"
               ].map((src, i) => (
                   <img 
                     key={i} 
                     src={src} 
                     alt="User" 
                     className="w-10 h-10 rounded-full border-2 border-background object-cover"
                   />
               ))}
            </div>
            <p>Join 10,000+ writers. <span className="font-semibold text-foreground">No credit card required.</span></p>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF (Real Logos) --- */}
      <section className="py-12 border-y bg-card/50">
        <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8">Trusted by modern marketing teams</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2 text-xl font-bold"><Hexagon className="h-6 w-6"/> ACME INC</div>
                <div className="flex items-center gap-2 text-xl font-bold"><Triangle className="h-6 w-6"/> QUANTUM</div>
                <div className="flex items-center gap-2 text-xl font-bold"><Circle className="h-6 w-6"/> SPHERE</div>
                <div className="flex items-center gap-2 text-xl font-bold"><Box className="h-6 w-6"/> BLOCKS</div>
                <div className="flex items-center gap-2 text-xl font-bold"><Layers className="h-6 w-6"/> STACK</div>
            </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold">Engineered for Performance.</h2>
                <p className="text-xl text-muted-foreground">A complete suite of tools designed for professional content operations.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="bg-card p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                    <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                        <PenTool className="h-7 w-7"/>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Long-Form Architect</h3>
                    <p className="text-muted-foreground">Don't just generate text. Generate strategy. Our intelligent wizard builds titles, deep outlines, and SEO-optimized articles step-by-step.</p>
                </div>

                {/* Feature 2 */}
                <div className="bg-card p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                    <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform">
                        <Share2 className="h-7 w-7"/>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Omni-Channel Adaption</h3>
                    <p className="text-muted-foreground">Transform a single core concept into a LinkedIn think-piece, a Twitter thread, and an Instagram caption instantly.</p>
                </div>

                {/* Feature 3 */}
                <div className="bg-card p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                    <div className="w-14 h-14 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform">
                        <LayoutTemplate className="h-7 w-7"/>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Conversion Frameworks</h3>
                    <p className="text-muted-foreground">Utilize behavioral psychology frameworks like AIDA, PAS, and BAB to engineer copy that drives action.</p>
                </div>
                
                {/* Feature 4 - UPDATED COPY (No provider name, sophisticated tone) */}
                <div className="bg-card p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group md:col-span-2 relative overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                        <div className="flex-1 space-y-4">
                            <div className="w-14 h-14 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mb-2 text-green-600 group-hover:scale-110 transition-transform">
                                <Cpu className="h-7 w-7"/>
                            </div>
                            <h3 className="text-2xl font-bold">Proprietary Reasoning Engine</h3>
                            <p className="text-muted-foreground">
                                We utilize a specialized cognitive architecture that "thinks" before it writes. By using advanced <strong>Chain-of-Thought</strong> processing, Solidwriter ensures factual accuracy, logical flow, and a semantic nuance that generic models cannot replicate.
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

                {/* Feature 5 */}
                <div className="bg-card p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                    <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mb-6 text-red-600 group-hover:scale-110 transition-transform">
                        <Globe className="h-7 w-7"/>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">8+ Languages</h3>
                    <p className="text-muted-foreground">Expand your reach without losing nuance. Generate content natively in Spanish, French, German, and 25+ other languages.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="py-24 px-6 bg-secondary/10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-20">From Idea to Article in Minutes</h2>
            
            <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10 transform -translate-y-1/2"></div>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="relative flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-background border-4 border-primary text-primary flex items-center justify-center text-2xl font-bold z-10 shadow-sm">1</div>
                        <h3 className="text-xl font-bold">Choose Topic & Tone</h3>
                        <p className="text-muted-foreground">Tell the AI what you want to write about and who your audience is.</p>
                    </div>
                    <div className="relative flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-background border-4 border-primary text-primary flex items-center justify-center text-2xl font-bold z-10 shadow-sm">2</div>
                        <h3 className="text-xl font-bold">Review Outline</h3>
                        <p className="text-muted-foreground">The AI generates a structured outline. Edit, add, or remove sections.</p>
                    </div>
                    <div className="relative flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-background border-4 border-primary text-primary flex items-center justify-center text-2xl font-bold z-10 shadow-sm">3</div>
                        <h3 className="text-xl font-bold">Generate & Export</h3>
                        <p className="text-muted-foreground">Get a full draft in seconds. Export to PDF, Markdown, or HTML.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- PRICING SECTION (Visible Buttons) --- */}
      <section id="pricing" className="py-24 px-6 bg-background">
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
                            <li className="flex gap-3 text-sm items-center text-foreground"><div className="p-1 rounded-full bg-green-100 text-green-600"><Check className="h-3 w-3"/></div> {plan.words} Words / month</li>
                            <li className="flex gap-3 text-sm items-center text-foreground"><div className="p-1 rounded-full bg-green-100 text-green-600"><Check className="h-3 w-3"/></div> Access to All Wizards</li>
                            <li className="flex gap-3 text-sm items-center text-foreground"><div className="p-1 rounded-full bg-green-100 text-green-600"><Check className="h-3 w-3"/></div> 30+ Languages</li>
                            <li className="flex gap-3 text-sm items-center text-foreground"><div className="p-1 rounded-full bg-green-100 text-green-600"><Check className="h-3 w-3"/></div> Priority Support</li>
                        </ul>
                        
                        <Link href="/pricing" className="block w-full">
                            {/* FIXED BUTTON STYLING */}
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
            <div className="flex flex-col sm:flex-row just