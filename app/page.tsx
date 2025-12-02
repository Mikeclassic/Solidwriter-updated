import Link from "next/link";
import { Check, Bot, Zap, Shield, Sparkles, PenTool, LayoutTemplate, Megaphone, Share2, Globe, Cpu } from "lucide-react";
import SmartStartButton from "@/components/smart-start-button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-white text-gray-900 overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <header className="px-6 h-20 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl text-blue-600 tracking-tight">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Bot className="h-6 w-6" />
          </div>
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
          <SmartStartButton text="Get Started" className="!px-5 !py-2 !text-sm !shadow-none !bg-blue-600 !text-white hover:!bg-blue-700" />
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-32 px-6 text-center overflow-hidden bg-white">
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
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
            <SmartStartButton text="Start Free Trial" className="!bg-blue-600 !text-white hover:!bg-blue-700" />
            <a href="#how-it-works">
                <button className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-bold border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                    See How It Works
                </button>
            </a>
          </div>

          {/* FIXED AVATARS */}
          <div className="pt-8 flex flex-col items-center gap-3 text-sm text-gray-500">
            <div className="flex -space-x-3">
               {[
                 "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
                 "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces",
                 "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces",
                 "https://i.pravatar.cc/150?u=a042581f4e29026704d" // Fixed broken link
               ].map((src, i) => (
                   <img 
                     key={i} 
                     src={src} 
                     alt="User" 
                     className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                   />
               ))}
            </div>
            <p>Join 10,000+ writers. <span className="font-semibold text-gray-900">No credit card required.</span></p>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF (REAL LOGOS) --- */}
      <section className="py-12 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Trusted by modern marketing teams at</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Stripe */}
                <svg className="h-8" viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M59.64 14.28h-4.53v-4.54h-3.03v4.54h-1.98v2.7h1.98v6.03c0 2.22 1.56 2.37 3 2.13v-2.6a1.27 1.27 0 0 0-.82-.2c-.39 0-.47-.18-.47-.56v-4.8h5.85v-2.7zm-14.49 0h-3.03v11.33h3.03V14.28zm-1.52-5.74a1.73 1.73 0 1 1-1.74 1.74 1.74 1.74 0 0 1 1.74-1.74zm-5.74 5.74h-2.92v11.33h3.03v-5.91c0-2.45 1.4-3.41 2.87-3.17v-3.07a3.55 3.55 0 0 0-3 1.15v-.33zm-8.21 2.92c-1.39 0-2.43 1.1-2.43 3.02s1.04 2.89 2.43 2.89c1.17 0 2.05-.72 2.34-1.89h2.92a5.1 5.1 0 0 1-5.26 4.3 5.3 5.3 0 0 1 0-10.6 5.12 5.12 0 0 1 5.23 4.1h-2.9a2.33 2.33 0 0 0-2.33-1.82zm-3.6-7.31v4.39h-3.03v-4.39h-4.31v2.7h1.28v8.66h3.03v-8.66h3.03v8.66h3.03V9.89h-3.03zm-14.77 4.2a6.06 6.06 0 0 0-2 .33l.63 2.6a4.2 4.2 0 0 1 1.43-.27c.94 0 1.25.43 1.25 1.34v.24a4.32 4.32 0 0 0-1.88-.41c-2.34 0-3.66 1.17-3.66 3.19 0 1.89 1.43 2.86 3.17 2.86a3.29 3.29 0 0 0 2.89-1.54v1.31h2.89V17.5c0-2.73-1.61-4.14-4.72-4.14zm.44 7.64c-.65 0-1.12-.31-1.12-.91 0-.7.65-1.15 1.77-1.15.65 0 1.25.13 1.72.34v.31a2.39 2.39 0 0 1-2.37 1.41zm-11.75-8.4a4.7 4.7 0 0 0-3.51 1.35v-1.12H0v11.33h3.03v-6.21c0-2.19 1.1-3.36 2.84-3.36 1.01 0 1.74.49 1.74 1.82v7.75h3.03v-8.31c-.01-2.13-1.29-3.25-3.4-3.25z"/></svg>
                {/* Airbnb */}
                <svg className="h-8" viewBox="0 0 84 25" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M19.38 3.52C18.66.72 16.32 0 16.32 0S13.98.72 13.26 3.52C12.56 6.13 10.6 14.2 6.2 14.2c-3.1 0-3.32-2.1-3.32-3.1 0-4.66 3.37-7.82 3.49-7.93l-1.3-1.37C4.95 1.93.38 6.13.38 11.23c0 2.92 1.37 6.46 5.82 6.46 5.74 0 8.3-7.23 9.4-11.37.2-.74.37-1.4.52-1.95.27 1 .55 2.1.88 3.21.36 1.22.75 2.5 1.2 3.73.91 2.56 2.65 6.38 8.02 6.38 4.45 0 5.82-3.54 5.82-6.46 0-5.1-4.57-9.3-4.69-9.4L26.24 3.2c.12.11 3.49 3.27 3.49 7.93 0 .9-.22 3.1-3.32 3.1-4.4 0-6.36-8.07-7.06-10.68zM42.27 1.14h-3.4v16.14h3.4V1.14zm9.33 0h-3.4v9.64c0 2.56-1.12 3.63-2.9 3.63-1.6 0-2.5-1-2.5-3.34V1.14h-3.4v10.1c0 4.14 2.14 5.94 5.4 5.94 2.17 0 4.02-1.32 4.75-2.72v2.32h2.05V1.14zm4.4 6.7c0-2.53 2-4.5 4.56-4.5 2.7 0 4.5 2.1 4.5 4.9v.5h-5.72c.16 1.16 1.1 1.76 2.2 1.76.84 0 1.52-.3 1.94-.7l2.27 1.9c-.9 1.12-2.33 1.83-4.24 1.83-3.13 0-5.5-2.3-5.5-5.68zm5.7-1.92c-.13-1.06-.9-1.57-1.85-1.57-.9 0-1.7.5-1.92 1.57h3.77zm10.7-3.9v2.1c.7-.9 1.9-1.28 3.12-1.28 1.92 0 3.2.7 3.9 2.25.75-1.55 2.1-2.25 3.97-2.25 1.83 0 4.2 1.1 4.2 5.37v9h-3.4v-8.4c0-1.86-.72-2.6-1.9-2.6-1.16 0-2.3.84-2.3 3.16v7.83h-3.38v-8.4c0-1.86-.73-2.6-1.92-2.6-1.16 0-2.3.84-2.3 3.16v7.83h-3.4V2.02z"/></svg>
                {/* Vercel */}
                <svg className="h-6" viewBox="0 0 116 26" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M19.05 22.95l-9.3-16.2L.4 22.95h18.65zM32.9 22.95v-7.3h5.9c.9 0 1.6-.2 2.1-.6.5-.4.8-1 .8-1.7 0-.5-.1-1-.4-1.3-.3-.3-.7-.6-1.2-.7.4-.2.8-.4 1-.7.2-.3.4-.7.4-1.1 0-.6-.2-1.1-.7-1.5-.5-.4-1.2-.6-2-.6h-5.9v15.5zm2.5-9.2h3.2c.3 0 .5.1.7.2.2.1.2.3.2.5s-.1.4-.2.5c-.2.1-.4.2-.7.2h-3.2v-1.4zm0-4.1h2.9c.3 0 .5.1.7.2.2.1.3.3.3.5 0 .3-.1.4-.3.5-.2.1-.4.2-.7.2h-2.9V9.65zm16.5 13.5c-1.3 0-2.5-.2-3.6-.7-1.1-.5-2-1.1-2.8-1.9-.8-.8-1.4-1.7-1.9-2.8-.5-1.1-.7-2.2-.7-3.5 0-1.3.2-2.5.7-3.6.5-1.1 1.1-2 1.9-2.8.8-.8 1.8-1.4 2.8-1.9 1.1-.5 2.3-.7 3.6-.7s2.5.2 3.6.7c1.1.5 2 1.1 2.8 1.9.8.8 1.4 1.7 1.9 2.8.5 1.1.7 2.2.7 3.6 0 1.3-.2 2.5-.7 3.5-.5 1.1-1.1 2-1.9 2.8-.8.8-1.7 1.4-2.8 1.9-1.1.5-2.4.7-3.6.7zm0-2.2c1.7 0 3.1-.6 4.3-1.7 1.2-1.2 1.8-2.6 1.8-4.3 0-1.7-.6-3.1-1.8-4.3-1.2-1.2-2.6-1.8-4.3-1.8-1.7 0-3.1.6-4.3 1.8-1.2 1.2-1.8 2.6-1.8 4.3 0 1.7.6 3.1 1.8 4.3 1.2 1.1 2.6 1.7 4.3 1.7zm13.1-11.1h2.4v13.3h-2.4V9.85zm12.3 13.3c-1.1 0-2.2-.2-3.1-.7-1-.5-1.7-1.1-2.3-1.9v2.4h-2.4V9.85h2.4v2.4c.6-.8 1.4-1.4 2.3-1.9 1-.5 2-.7 3.1-.7 1.2 0 2.2.2 3.2.7.9.5 1.7 1.1 2.3 1.9s1.1 1.7 1.4 2.7c.3 1 .5 2.1.5 3.3 0 1.2-.2 2.2-.5 3.3-.3 1-.8 1.9-1.4 2.7-.6.8-1.3 1.5-2.3 1.9-.9.5-2 .8-3.2.8zm-.2-2.2c1.5 0 2.8-.5 3.8-1.6 1-1.1 1.5-2.4 1.5-4.1 0-1.6-.5-3-1.5-4.1-1-1.1-2.2-1.6-3.8-1.6-1.5 0-2.8.5-3.8 1.6-1 1.1-1.5 2.4-1.5 4.1 0 1.6.5 3 1.5 4.1 1 1.1 2.3 1.6 3.8 1.6zm14.4 2.2c-1.2 0-2.3-.2-3.3-.7-1-.5-1.8-1.2-2.5-2l1.6-1.6c.5.6 1 .9 1.7 1.3.6.3 1.4.5 2.2.5 1 0 1.7-.2 2.2-.6.5-.4.8-1 .8-1.7 0-.3-.1-.5-.2-.7-.1-.2-.3-.4-.5-.5-.2-.2-.5-.3-.7-.4-.3-.1-.6-.2-.9-.3l-1.3-.4c-.6-.2-1.1-.4-1.5-.6-.5-.2-.8-.5-1.1-.8-.3-.3-.5-.7-.6-1.1-.1-.4-.2-.8-.2-1.3 0-1 .4-1.9 1.1-2.6.7-.7 1.7-1.1 3-1.1 1.1 0 2 .2 2.9.6.9.4 1.6 1 2.2 1.7l-1.5 1.6c-.4-.5-.9-.9-1.4-1.1-.5-.2-1.1-.4-1.8-.4-.8 0-1.4.2-1.8.5-.4.4-.6.8-.6 1.4 0 .3.1.5.2.7.1.2.3.3.5.5.2.1.4.3.7.4.2.1.5.2.8.3l1.3.4c.6.2 1.2.4 1.6.7.5.3.8.6 1.1.9.3.4.5.8.6 1.2.1.5.2.9.2 1.4 0 1.1-.4 2-1.1 2.7-.8.7-1.9 1.1-3.2 1.1z"/></svg>
                {/* Coinbase */}
                <svg className="h-6" viewBox="0 0 102 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M11.9 8.2c-2.3 0-4.2 1.8-4.2 4.1s1.9 4.1 4.2 4.1c2.3 0 4.2-1.8 4.2-4.1S14.2 8.2 11.9 8.2m0-2.3c3.5 0 6.4 2.8 6.4 6.4s-2.8 6.4-6.4 6.4-6.4-2.8-6.4-6.4 2.9-6.4 6.4-6.4m11.2 2.3c-2.3 0-4.2 1.8-4.2 4.1s1.9 4.1 4.2 4.1 4.2-1.8 4.2-4.1-1.9-4.1-4.2-4.1m0-2.3c3.5 0 6.4 2.8 6.4 6.4s-2.8 6.4-6.4 6.4-6.4-2.8-6.4-6.4 2.9-6.4 6.4-6.4m11 0v1.9h-1.8v8.9h1.8v2h-6v-2h1.8V7.8h-1.8v-1.9h6m7.9 0v1.9h-1.8v6c0 .7.6 1.3 1.3 1.3h.6v1.9h-2.1c-1.8 0-3.3-1.4-3.3-3.2V7.8h-1.1v-1.9h1.1V3.2h2.2v2.7h3.1m7.1 2.7v5.5c0 .4-.3.7-.7.7-.4 0-.7-.3-.7-.7V8.5h-2.2v5.7c0 1.6 1.3 2.8 2.8 2.8.6 0 1.2-.2 1.7-.5 0 0 .1.3.4.5h1.7c-.2-.6-.2-1.4-.2-2.1V8.5h-2.2m-4.2-2.6c.8 0 1.4-.6 1.4-1.4 0-.8-.6-1.4-1.4-1.4-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4m14.9 8.7c-.5.8-1.4 1.3-2.4 1.3-1.6 0-2.8-1.3-2.8-2.8s1.3-2.8 2.8-2.8c1.1 0 2 .6 2.5 1.4h2.2c-.7-2-2.6-3.4-4.8-3.4-2.8 0-5 2.2-5 5s2.2 5 5 5c2.1 0 4-1.4 4.7-3.3h-2.2m7.4-4.1v4.3h-2.2V7.8h-1.8v-1.9h6v1.9h-2m7.2-2c-.5.8-1.4 1.3-2.4 1.3-1.6 0-2.8-1.3-2.8-2.8s1.3-2.8 2.8-2.8c1.1 0 2 .6 2.5 1.4h2.2c-.7-2-2.6-3.4-4.8-3.4-2.8 0-5 2.2-5 5s2.2 5 5 5c2.1 0 4-1.4 4.7-3.3h-2.2"/></svg>
                {/* Netflix */}
                <svg className="h-6" viewBox="0 0 82 23" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12.6 17.1V2.8L8.2 1.3v19.4l4.4-1.6v-2zm4.1-12.7l.1 12.3 8.8-14.2 4.4 1.5v19l-4.4-1.6-.1-12.3-8.8 14.1-4.4-1.5V1.3l4.4 3.1zm19.2 11.2l6-2.1v-2.1l-6 2.1v-4.3l7.9-2.8V4.2l-12.3 4.3v14l12.8-4.5v-2.1l-8.4 3v-4.5zm11.3-4l4.3-1.5v-7L56 1.3v19.4l4.4-1.6v-7.5zm4.4 5.9l7.7-2.7v-2.2l-7.7 2.7v-4.7l7.7-2.7V5.7L67.1 9v14l12.1-4.2v-2.2l-12.1 4.2V5.7l4.5 1.6v10.2zM2.5 2.8L6.9 1.3 6.9 20.7 2.5 19.1z"/></svg>
            </div>
        </div>
      </section>

      {/* --- FEATURES GRID (Clean Version) --- */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Engineered for Performance.</h2>
                <p className="text-xl text-gray-500">A complete suite of tools designed for professional content operations.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                        <PenTool className="h-6 w-6"/>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Long-Form Architect</h3>
                    <p className="text-gray-600">Don&apos;t just generate text. Generate strategy. Our intelligent wizard builds titles, deep outlines, and SEO-optimized articles step-by-step.</p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                        <Share2 className="h-6 w-6"/>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Omni-Channel Adaption</h3>
                    <p className="text-gray-600">Transform a single core concept into a LinkedIn think-piece, a Twitter thread, and an Instagram caption instantly.</p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 text-orange-600">
                        <LayoutTemplate className="h-6 w-6"/>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Conversion Frameworks</h3>
                    <p className="text-gray-600">Utilize behavioral psychology frameworks like AIDA, PAS, and BAB to engineer copy that drives action.</p>
                </div>
                
                {/* Feature 4 - Advanced AI (Fixed Content) */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group md:col-span-2">
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
                        <div className="flex-1 bg-gray-50 rounded-xl p-6 w-full border border-gray-200">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-xs font-mono text-blue-600 mb-2">
                                    <Sparkles className="h-3 w-3"/> Analyzing Semantic Context...
                                </div>
                                <div className="h-2 w-1/3 bg-gray-200 rounded"></div>
                                <div className="h-2 w-full bg-gray-200 rounded"></div>
                                <div className="h-2 w-full bg-gray-200 rounded"></div>
                                <div className="h-2 w-2/3 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature 5 */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
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
      <section id="how-it-works" className="py-24 px-6 bg-gray-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 text-gray-900">From Idea to Article in Minutes</h2>
            
            <div className="relative">
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="relative flex flex-col items-center text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-600 text-blue-600 flex items-center justify-center text-xl font-bold shadow-sm z-10">1</div>
                        <h3 className="text-xl font-bold text-gray-900">Choose Topic & Tone</h3>
                        <p className="text-gray-600">Tell the AI what you want to write about and who your audience is.</p>
                    </div>
                    <div className="relative flex flex-col items-center text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-600 text-blue-600 flex items-center justify-center text-xl font-bold shadow-sm z-10">2</div>
                        <h3 className="text-xl font-bold text-gray-900">Review Outline</h3>
                        <p className="text-gray-600">The AI generates a structured outline. Edit, add, or remove sections.</p>
                    </div>
                    <div className="relative flex flex-col items-center text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-600 text-blue-600 flex items-center justify-center text-xl font-bold shadow-sm z-10">3</div>
                        <h3 className="text-xl font-bold text-gray-900">Generate & Export</h3>
                        <p className="text-gray-600">Get a full draft in seconds. Export to PDF, Markdown, or HTML.</p>
                    </div>
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
                     {name: 'S