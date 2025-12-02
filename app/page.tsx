"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Check, Bot, Zap, Shield, Sparkles, PenTool, LayoutTemplate, Megaphone, Share2, Globe, Cpu, ChevronDown, ChevronUp, Copy, RefreshCw, Star, PlayCircle } from "lucide-react";
import SmartStartButton from "@/components/smart-start-button";

// --- DATA: TESTIMONIALS (10+ Users) ---
const TESTIMONIALS = [
  { name: "Sarah Johnson", role: "Content Manager", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", text: "Solidwriter cut my workflow in half. Ideally suited for agencies." },
  { name: "Mark Williams", role: "SEO Specialist", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", text: "The ranking capability of these articles is unmatched. A game changer." },
  { name: "Emily Chen", role: "Founder", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", text: "Finally, an AI that doesn't sound robotic. My brand voice is safe here." },
  { name: "David Rodriguez", role: "Copywriter", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", text: "The frameworks (AIDA, PAS) are spot on. Saves me hours of brainstorming." },
  { name: "Jessica Kim", role: "Marketing Director", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", text: "We scaled our blog from 2 to 20 posts a week with Solidwriter." },
  { name: "Michael Brown", role: "Freelancer", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop", text: "My clients can't tell the difference. It's that good." },
  { name: "Lisa Wong", role: "Social Media Lead", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", text: "Repurposing blogs into LinkedIn posts takes seconds now." },
  { name: "James Carter", role: "Tech Blogger", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", text: "The technical accuracy of the reasoning engine is impressive." },
  { name: "Sophie Turner", role: "E-com Owner", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop", text: "Product descriptions that actually sell. ROI is positive in day one." },
  { name: "Ryan Patel", role: "Growth Hacker", img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop", text: "The multilingual support helped us enter the Spanish market easily." }
];

// --- DATA: FAQ ---
const FAQS = [
  { q: "How does the AI writing assistant work?", a: "Solidwriter uses a chain-of-thought reasoning engine. Unlike standard chatbots, it plans the structure of your content first, then writes section by section to ensure logical flow and factual accuracy." },
  { q: "Can Solidwriter create content that sounds like me?", a: "Yes! You can define your 'Tone of Voice' settings. Whether you need professional, witty, urgent, or casual output, the AI adapts to match your brand identity." },
  { q: "Is there a limit to how many words I can generate?", a: "It depends on your plan. The Starter plan includes 25,000 words/month, while the Business plan offers Unlimited generation. The free trial gives you full access to test it out." },
  { q: "Is there a free trial available?", a: "Absolutely. We offer a 7-day free trial on all plans with no credit card required to start. You can cancel anytime if it's not the right fit." }
];

// --- DATA: DEMO STEPS ---
const DEMO_STEPS = [
  { id: 1, label: "Basic Info", desc: "Input topic & keywords..." },
  { id: 2, label: "Title Selection", desc: "Choose the best hook..." },
  { id: 3, label: "Content Outline", desc: "Edit structure..." },
  { id: 4, label: "Content Writing", desc: "AI generates draft..." },
  { id: 5, label: "Final Content", desc: "Ready to publish." }
];

export default function LandingPage() {
  // --- STATE ---
  const [activeStep, setActiveStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // Track if animation ever started
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const demoRef = useRef<HTMLDivElement>(null);

  // --- INTERSECTION OBSERVER FOR DEMO ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setIsAutoPlaying(true);
          setHasStarted(true);
        }
      },
      { threshold: 0.4 } // Start when 40% of the element is visible
    );

    if (demoRef.current) {
      observer.observe(demoRef.current);
    }

    return () => {
      if (demoRef.current) observer.unobserve(demoRef.current);
    };
  }, [hasStarted]);

  // --- AUTO PLAY LOGIC ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev === 5 ? 1 : prev + 1));
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    setIsAutoPlaying(false);
  };

  return (
    <div className="flex min-h-screen flex-col font-sans bg-white text-slate-900 overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <header className="px-4 md:px-6 h-16 md:h-20 flex items-center justify-between sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center gap-2 font-bold text-xl md:text-2xl text-slate-900 tracking-tight">
          <div className="text-blue-600">
            <Bot className="h-6 w-6 md:h-8 md:w-8" />
          </div>
          Solidwriter
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
        </nav>
        <div className="flex gap-2 md:gap-4 items-center">
          <Link href="/auth" className="hidden sm:block">
             <button className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Log in</button>
          </Link>
          <SmartStartButton text="Try Free" className="!px-4 !py-2 !text-xs md:!text-sm !shadow-none !bg-blue-600 !text-white hover:!bg-blue-700 !rounded-lg" />
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="pt-20 md:pt-32 pb-16 px-4 text-center bg-white">
        <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Write Better Content<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">With AI That Understands Your Style</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
            Solidwriter combines powerful AI with intuitive tools to help you create engaging content faster than ever before - without losing your unique voice.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 px-4">
            <SmartStartButton text="Start Free Trial" className="!bg-blue-600 !text-white hover:!bg-blue-700 !px-8 !py-4 !text-base md:!text-lg !rounded-lg !shadow-xl shadow-blue-200 w-full sm:w-auto" />
            <a href="#how-it-works" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 rounded-lg text-base md:text-lg font-bold bg-white text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm border border-slate-200">
                    See How It Works
                </button>
            </a>
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE DEMO --- */}
      <section id="how-it-works" className="py-16 px-4 bg-slate-50/50" ref={demoRef}>
        <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-4 animate-bounce">
                <PlayCircle className="h-4 w-4"/> Watch Demo Below
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900">See Solidwriter in Action</h2>
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden ring-1 ring-slate-100">
            
            {/* Stepper Navigation */}
            <div className="px-4 md:px-8 py-6 bg-slate-50 border-b border-slate-100 overflow-x-auto scrollbar-hide">
                <div className="flex justify-between min-w-[600px] md:min-w-0 relative">
                    <div className="hidden md:block absolute top-4 left-0 w-full h-0.5 bg-slate-200 -z-0"></div>
                    
                    {DEMO_STEPS.map((step) => (
                        <button 
                            key={step.id} 
                            onClick={() => handleStepClick(step.id)}
                            className={`relative z-10 flex flex-col items-center gap-3 group focus:outline-none flex-1`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                                activeStep >= step.id 
                                ? 'bg-slate-900 text-white shadow-lg scale-110' 
                                : 'bg-white text-slate-400 border-2 border-slate-200'
                            }`}>
                                {step.id}
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                                activeStep === step.id ? 'text-slate-900' : 'text-slate-400'
                            }`}>
                                {step.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Dynamic Screen Content */}
            <div className="p-6 md:p-12 min-h-[350px] md:min-h-[450px] bg-white flex flex-col justify-center">
                
                {/* STEP 1: BASIC INFO */}
                {activeStep === 1 && (
                    <div className="max-w-3xl mx-auto w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-900">Topic</label>
                            <div className="w-full h-14 bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-700 shadow-sm flex items-center">
                                Budget travel guide for beginners
                                <span className="w-0.5 h-5 bg-blue-600 animate-pulse ml-0.5"></span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-900">Language</label>
                                <div className="w-full h-12 bg-slate-50 border border-slate-200 rounded-lg px-4 flex items-center justify-between text-slate-600 shadow-sm">
                                    English (US) <ChevronDown className="h-4 w-4 opacity-50"/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-900">Keywords</label>
                                <div className="w-full h-12 bg-slate-50 border border-slate-200 rounded-lg px-4 flex items-center text-slate-600 shadow-sm">
                                    money saving, hostels, flights
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <div className="px-6 py-3 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-md cursor-default">Generate Titles</div>
                        </div>
                    </div>
                )}

                {/* STEP 2: TITLES */}
                {activeStep === 2 && (
                    <div className="max-w-3xl mx-auto w-full space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <h3 className="text-lg font-bold text-center mb-4">Choose a Title</h3>
                        <div className="space-y-3">
                            <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm opacity-50">
                                The Ultimate Guide to Cheap Travel
                            </div>
                            <div className="p-4 bg-blue-50 border-2 border-blue-600 rounded-lg shadow-md flex justify-between items-center transform scale-105 transition-transform">
                                <span className="font-medium text-blue-900">How to Travel the World on a Shoestring Budget</span>
                                <Check className="h-5 w-5 text-blue-600"/>
                            </div>
                            <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm opacity-50">
                                5 Ways to Save Money on Vacation
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 3: OUTLINE */}
                {activeStep === 3 && (
                    <div className="max-w-3xl mx-auto w-full space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-bold">Content Structure</h3>
                            <button className="text-blue-600 text-sm font-bold">+ Add Section</button>
                        </div>
                        <div className="space-y-2">
                            {[
                                "Intro: Why Budget Travel Matters",
                                "1. Booking Flights Like a Pro",
                                "2. Accommodation Hacks (Hostels & More)",
                                "3. Eating Cheap but Good",
                                "Conclusion"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                                    <div className="text-slate-300">:::</div>
                                    <div className="flex-1 font-medium text-slate-700">{item}</div>
                                    <div className="text-slate-400"><PenTool className="h-4 w-4"/></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* STEP 4: WRITING */}
                {activeStep === 4 && (
                    <div className="max-w-3xl mx-auto w-full space-y-6 animate-in fade-in duration-500">
                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-8 min-h-[300px] relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue-100">
                                <div className="h-full bg-blue-600 animate-[progress_2s_ease-in-out_infinite] w-1/3"></div>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900">How to Travel the World on a Shoestring Budget</h1>
                            <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                                <p>Traveling the world is a dream for many, but the misconception that it requires a massive bank account often holds people back...</p>
                                <p>In this guide, we&apos;ll uncover the secrets of budget travel that experienced nomads use every day.</p>
                                <p className="opacity-70">
                                    First, let&apos;s talk about flights. Being flexible with your dates can save you hundreds...
                                    <span className="inline-block w-1.5 h-4 bg-blue-600 ml-1 animate-pulse"></span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 5: FINAL */}
                {activeStep === 5 && (
                    <div className="max-w-3xl mx-auto w-full space-y-6 animate-in zoom-in-95 duration-500">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Saved</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1"><Copy className="h-3 w-3"/> Copy</button>
                                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-md">Export PDF</button>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-6 md:p-8 h-[300px] overflow-hidden relative">
                            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
                            <h1 className="text-2xl font-bold mb-4 text-slate-900">How to Travel the World...</h1>
                            <div className="space-y-3 text-slate-600 leading-relaxed text-sm">
                                <p>Traveling the world is a dream for many, but the misconception that it requires a massive bank account often holds people back. The truth is, with the right strategies and a bit of flexibility, you can explore amazing destinations without breaking the bank.</p>
                                <h2 className="text-lg font-bold text-slate-800 mt-4">1. Smart Flight Booking Strategies</h2>
                                <p>First, let&apos;s talk about flights. Being flexible with your dates can save you hundreds of dollars. Use tools like Skyscanner or Google Flights to find the cheapest months to fly.</p>
                            </div>
                        </div>
                        <div className="text-center pt-2">
                            <button onClick={() => {setActiveStep(1); setIsAutoPlaying(true);}} className="text-blue-600 font-bold hover:underline flex items-center justify-center gap-2 text-sm">
                                <RefreshCw className="h-3 w-3"/> Replay Demo
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </section>

      {/* --- POWERFUL FEATURES --- */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
                Powerful Features To <br className="hidden md:block"/>
                <span className="text-blue-600">Supercharge Your Writing</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16">
                {[
                    { icon: <LayoutTemplate className="h-8 w-8 text-blue-600"/>, title: "Step-by-Step Builder", desc: "Create perfectly structured content guided by AI logic." },
                    { icon: <Zap className="h-8 w-8 text-blue-600"/>, title: "One-Click Wizards", desc: "Generate complete blogs, ads, and posts instantly." },
                    { icon: <Bot className="h-8 w-8 text-blue-600"/>, title: "Smart Assistant", desc: "Get real-time suggestions and re-writes as you type." },
                    { icon: <Globe className="h-8 w-8 text-blue-600"/>, title: "30+ Languages", desc: "Write natively in Spanish, French, German, and more." },
                    { icon: <Share2 className="h-8 w-8 text-blue-600"/>, title: "Multi-Format", desc: "Export to PDF, Markdown, or HTML in one click." },
                    { icon: <Shield className="h-8 w-8 text-blue-600"/>, title: "Secure & Original", desc: "Plagiarism-free content generated uniquely for you." }
                ].map((feature, i) => (
                    <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 border border-slate-100">
                            {feature.icon}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (MARQUEE) --- */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="text-center mb-12 px-6">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Trusted By <span className="text-blue-600">Thousands</span></h2>
            <p className="text-slate-500">See what creators are saying about Solidwriter.</p>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
            <div className="flex animate-scroll w-[200%] hover:[animation-play-state:paused]">
                {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                    <div key={i} className="w-[300px] md:w-[400px] flex-shrink-0 mx-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex gap-1 mb-3">
                            {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 text-yellow-400 fill-current"/>)}
                        </div>
                        <p className="text-slate-600 text-sm italic mb-4 line-clamp-3">"{t.text}"</p>
                        <div className="flex items-center gap-3">
                            <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                                <p className="text-xs text-slate-500">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- FAQ (ACCORDION) --- */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-center text-slate-900 mb-12">
                Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            
            <div className="space-y-4">
                {FAQS.map((item, i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-200">
                        <button 
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="w-full flex justify-between items-center p-6 text-left font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                        >
                            <span className="text-base md:text-lg">{item.q}</span>
                            {openFaq === i ? <ChevronUp className="h-5 w-5 text-blue-600"/> : <ChevronDown className="h-5 w-5 text-slate-400"/>}
                        </button>
                        <div className={`px-6 text-slate-600 text-sm md:text-base leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                            {item.a}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 font-bold text-2xl text-white mb-4">
                  <Bot className="h-8 w-8 text-blue-500" /> Solidwriter
                </div>
                <p className="text-sm leading-relaxed">
                    Powerful AI writing assistant that helps you create better content faster.
                </p>
            </div>
            <div>
                <h4 className="text-white font-bold mb-6">Product</h4>
                <ul className="space-y-4 text-sm">
                    <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                    <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                    <li><Link href="/wizard" className="hover:text-white transition-colors">AI Writer</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold mb-6">Company</h4>
                <ul className="space-y-4 text-sm">
                    <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                    <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                    <li><Link href="/support" className="hover:text-white transition-colors">Contact Us</Link></li>
                </ul>
            </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 border-t border-slate-800 text-xs text-center md:text-left">
            © 2024 Solidwriter Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}