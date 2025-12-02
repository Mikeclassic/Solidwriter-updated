import Link from "next/link";
import { Check, Bot, Zap, Shield, Sparkles, PenTool, LayoutTemplate, Megaphone, Share2, Globe, Cpu, Hexagon, Triangle, Circle, Box, Layers } from "lucide-react";
import SmartStartButton from "@/components/smart-start-button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-gray-50 text-gray-900">
      
      {/* --- HEADER --- */}
      <header className="px-6 h-20 flex items-center justify-between border-b bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl text-blue-600 tracking-tight">
          <Bot className="h-6 w-6" />
          Solidwriter
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
        </nav>
        <div className="flex gap-4">
          <Link href="/auth">
             <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Log in</button>
          </Link>
          <SmartStartButton text="Get Started" className="!px-5 !py-2 !text-sm !shadow-sm" />
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="pt-24 pb-20 px-6 text-center bg-white">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide border border-blue-100">
            <Sparkles className="h-3 w-3" /> Intelligent Content Engine
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Write Content That <span className="text-blue-600">Actually Converts.</span>
          </h1>
          
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Stop staring at a blank cursor. Solidwriter uses advanced reasoning AI to research, structure, and write articles, ads, and social posts in your unique brand voice.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <SmartStartButton text="Start Free Trial" />
            <a href="#how-it-works">
                <button className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-bold border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                    See How It Works
                </button>
            </a>
          </div>

          <div className="pt-8 flex flex-col items-center gap-3 text-sm text-gray-500">
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
                     className="w-10 h-10 rounded-full border-2 border-white object-cover"
                   />
               ))}
            </div>
            <p>Join 10,000+ writers. <span className="font-semibold text-gray-900">No credit card required.</span></p>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF --- */}
      <section className="py-12 border-y bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Trusted by modern marketing teams</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500 text-gray-900">
                <div className="flex items-center gap-2 text-xl font-bold"><Hexagon className="h-6 w-6"/> ACME INC</div>
                <div className="flex items-center gap-2 text-xl font-bold"><Triangle className="h-6 w-6"/> QUANTUM</div>
                <div className="flex items-center gap-2 text-xl font-bold"><Circle className="h-6 w-6"/> SPHERE</div>
                <div className="flex items-center gap-2 text-xl font-bold"><Box className="h-6 w-6"/> BLOCKS</div>
                <div className="flex items-center gap-2 text-xl font-bold"><Layers className="h-6 w-6"/> STACK</div>
            </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Engineered for Performance.</h2>
                <p className="text-xl text-gray-500">A complete suite of tools designed for professional content operations.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all hover:-translate-y-1 group">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                        <PenTool className="h-6 w-6"/>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Long-Form Architect</h3>
                    <p className="text-gray-600">Don&apos;t just generate text. Generate strategy. Our intelligent wizard builds titles, deep outlines, and SEO-optimized articles step-by-step.</p>
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-purple-200 transition-all hover:-translate-y-1 group">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                        <Share2 className="h-6 w-6"/>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Omni-Channel Adaption</h3>
                    <p className="text-gray-600">Transform a single core concept into a LinkedIn think-piece, a Twitter thread, and an Instagram caption instantly.</p>
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-orange-200 transition-all hover:-translate-y-1 group">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 text-orange-600">
                        <LayoutTemplate className="h-6 w-6"/>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Conversion Frameworks</h3>
                    <p className="text-gray-600">Utilize behavioral psychology frameworks like AIDA, PAS, and BAB to engineer copy that drives action.</p>
                </div>
                
                {/* Advanced AI Section */}
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-green-200 transition-all hover:-translate-y-1 group md:col-span-2">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 space-y-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-2 text-green-600">
                                <Cpu className="h-6 w-6"/>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Proprietary Reasoning Engine</h3>
                            <p className="text-gray-600">
                                We utilize a specialized cognitive architecture that &quot;thinks&quot; before it writes. By using advanced <strong>Chain-of-Thought</strong> processing, Solidwriter ensures factual accuracy, logical flow, and a semantic nuance that generic models cannot replicate.
                            </p>
                        </div>
                        <div className="flex-1 bg-white rounded-xl p-6 w-full border border-gray-200 shadow-sm">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-xs font-mono text-blue-600 mb-2">
                                    <Sparkles className="h-3 w-3"/> Analyzing Semantic Context...
                                </div>
                                <div className="h-2 w-1/3 bg-gray-200 rounded"></div>
                                <div className="h-2 w-full bg-gray-100 rounded"></div>
                                <div className="h-2 w-full bg-gray-100 rounded"></div>
                                <div className="h-2 w-2/3 bg-gray-100 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-red-200 transition-all hover:-translate-y-1 group">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6 text-red-600">
                        <Globe className="h-6 w-6"/>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">8+ Languages</h3>
                    <p className="text-gray-600">Expand your reach without losing nuance. Generate content natively in Spanish, French, German, and 25+ other languages.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 text-gray-900">From Idea to Article in Minutes</h2>
            
            <div className="grid md:grid-cols-3 gap-12 relative">
                <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">1</div>
                    <h3 className="text-xl font-bold text-gray-900">Choose Topic & Tone</h3>
                    <p className="text-gray-600">Tell the AI what you want to write about and who your audience is.</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">2</div>
                    <h3 className="text-xl font-bold text-gray-900">Review Outline</h3>
                    <p className="text-gray-600">The AI generates a structured outline. Edit, add, or remove sections.</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">3</div>
                    <h3 className="text-xl font-bold text-gray-900">Generate & Export</h3>
                    <p className="text-gray-600">Get a full draft in seconds. Export to PDF, Markdown, or HTML.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Transparent Pricing</h2>
                <p className="text-xl text-gray-500">Start your 7-day free trial on any plan.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                 {[
                     {name: 'Starter', price: '$12', words: '25,000', popular: false},
                     {name: 'Standard', price: '$24', words: '100,000', popular: true},
                     {name: 'Unlimited', price: '$72', words: 'Unlimited', popular: false}
                 ].map((plan) => (
                     <div key={plan.name} className={`relative bg-white p-8 rounded-3xl border transition-all flex flex-col ${plan.popular ? 'border-blue-600 shadow-xl scale-105 z-10' : 'border-gray-200 shadow-sm'}`}>
                        {plan.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>}
                        
                        <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                        <div className="my-4">
                            <span className="text-5xl font-extrabold tracking-tight text-gray-900">{plan.price}</span>
                            <span className="text-gray-500 font-medium">/mo</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
                            {plan.name === 'Unlimited' ? 'For agencies requiring maximum scale.' : 'Perfect for creators and small teams.'}
                        </p>
                        
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex gap-3 text-sm items-center text-gray-700"><Check className="h-4 w-4 text-green-500"/> {plan.words} Words / month</li>
                            <li className="flex gap-3 text-sm items-center text-gray-700"><Check className="h-4 w-4 text-green-500"/> Access to All Wizards</li>
                            <li className="flex gap-3 text-sm items-center text-gray-700"><Check className="h-4 w-4 text-green-500"/> 30+ Languages</li>
                            <li className="flex gap-3 text-sm items-center text-gray-700"><Check className="h-4 w-4 text-green-500"/> Priority Support</li>
                        </ul>
                        
                        <Link href="/pricing" className="block w-full">
                            <button className={`w-full py-3 rounded-xl font-bold transition-all shadow-sm ${
                                plan.popular 
                                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600'
                            }`}>
                                Start 7-Day Free Trial
                            </button>
                        </Link>
                        <p className="text-center text-[10px] uppercase tracking-wider text-gray-400 mt-4 font-semibold">No credit card required</p>
                     </div>
                 ))}
            </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 px-6 text-center bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-12 border border-gray-200 shadow-xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Ready to scale your content?</h2>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                Join thousands of modern writers who use Solidwriter to create high-quality content 10x faster.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <SmartStartButton text="Start Your Free Trial" />
            </div>
            <p className="mt-6 text-sm text-gray-400 flex items-center justify-center gap-2">
                <Shield className="h-4 w-4"/> 7-day free trial. Cancel anytime. No credit card required.
            </p>
        </div>
      </section>

      <footer className="border-t border-gray-200 py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
              <Bot className="h-6 w-6" /> Solidwriter
            </div>
            <div className="text-sm text-gray-500">
                © 2024 Solidwriter Inc. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
                <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-blue-600">Terms of Service</Link>
                <Link href="/support" className="hover:text-blue-600">Support</Link>
            </div>
        </div>
      </footer>
    </div>
  );
}