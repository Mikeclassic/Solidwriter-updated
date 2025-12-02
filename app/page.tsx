"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Check, Bot, PenTool, ChevronDown, ChevronUp, Copy, RefreshCw, Star, PlayCircle, ArrowRight } from "lucide-react";
import SmartStartButton from "@/components/smart-start-button";

// TESTIMONIALS (Duplicated for seamless infinite loop)
const RAW_TESTIMONIALS = [
  { name: "Sarah Johnson", role: "Content Manager", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", text: "Solidwriter cut my workflow in half. Ideally suited for agencies." },
  { name: "Mark Williams", role: "SEO Specialist", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", text: "The ranking capability of these articles is unmatched. A game changer." },
  { name: "Emily Chen", role: "Founder", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", text: "Finally, an AI that doesn't sound robotic. My brand voice is safe here." },
  { name: "David Rodriguez", role: "Copywriter", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", text: "The frameworks (AIDA, PAS) are spot on. Saves me hours of brainstorming." },
  { name: "Jessica Kim", role: "Marketing Director", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", text: "We scaled our blog from 2 to 20 posts a week with Solidwriter." },
  { name: "Michael Brown", role: "Freelancer", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop", text: "My clients can't tell the difference. It's that good." },
  { name: "Lisa Wong", role: "Social Media Lead", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", text: "Repurposing blogs into LinkedIn posts takes seconds now." },
  { name: "James Carter", role: "Tech Blogger", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", text: "The technical accuracy of the reasoning engine is impressive." },
];

const TESTIMONIALS = [...RAW_TESTIMONIALS, ...RAW_TESTIMONIALS, ...RAW_TESTIMONIALS, ...RAW_TESTIMONIALS];

// FAQ
const FAQS = [
  { q: "How does the AI writing assistant work?", a: "Solidwriter uses a chain-of-thought reasoning engine. Unlike standard chatbots, it plans the structure of your content first, then writes section by section to ensure logical flow and factual accuracy." },
  { q: "Can Solidwriter create content that sounds like me?", a: "Yes! You can define your 'Tone of Voice' settings. Whether you need professional, witty, urgent, or casual output, the AI adapts to match your brand identity." },
  { q: "Is there a limit to how many words I can generate?", a: "It depends on your plan. The Starter plan includes 25,000 words/month, while the Business plan offers Unlimited generation. The free trial gives you full access to test it out." },
  { q: "Is there a free trial available?", a: "Absolutely. We offer a 7-day free trial on all plans with no credit card required to start. You can cancel anytime if it's not the right fit." }
];

// DEMO STEPS
const DEMO_STEPS = [
  { id: 1, label: "Basic Info", desc: "Input topic & keywords..." },
  { id: 2, label: "Title Selection", desc: "Choose the best hook..." },
  { id: 3, label: "Content Outline", desc: "Edit structure..." },
  { id: 4, label: "Content Writing", desc: "AI generates draft..." },
  { id: 5, label: "Final Content", desc: "Ready to publish." }
];

// Text to stream in Step 4
const STREAMING_TEXT = "Traveling the world is a dream for many, but the misconception that it requires a massive bank account often holds people back. In this guide, we'll uncover the secrets of budget travel. First, let's talk about flights. Being flexible with your dates can save you hundreds...";

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Streaming text state
  const [displayedText, setDisplayedText] = useState("");

  const demoRef = useRef<HTMLDivElement>(null);
  const stepperRef = useRef<HTMLDivElement>(null); 
  const testimonialRef = useRef<HTMLDivElement>(null);
  const [isTestimonialsPaused, setIsTestimonialsPaused] = useState(false);

  // Intersection observer to start demo
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setIsAutoPlaying(true);
          setHasStarted(true);
        }
      },
      { threshold: 0.4 }
    );
    if (demoRef.current) observer.observe(demoRef.current);
    return () => { if (demoRef.current) observer.unobserve(demoRef.current); };
  }, [hasStarted]);

  // Demo auto-play interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      // Longer duration for step 4 to allow reading text
      const duration = activeStep === 4 ? 6000 : 3500;
      interval = setInterval(() => {
        setActiveStep((prev) => (prev === 5 ? 1 : prev + 1));
      }, duration);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, activeStep]);

  // --- FIXED: Horizontal Scroll Sync (No Page Jump) ---
  useEffect(() => {
    if (stepperRef.current) {
      const activeBtn = document.getElementById(`step-btn-${activeStep}`);
      if (activeBtn) {
        const container = stepperRef.current;
        // Calculate the center position relative to the container
        const scrollLeft = activeBtn.offsetLeft - (container.clientWidth / 2) + (activeBtn.clientWidth / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeStep]);

  // --- NEW: Streaming Text Animation for Step 4 ---
  useEffect(() => {
    if (activeStep === 4) {
      setDisplayedText("");
      const words = STREAMING_TEXT.split(" ");
      let i = 0;
      
      const typingInterval = setInterval(() => {
        if (i < words.length) {
          setDisplayedText(prev => prev + (prev ? " " : "") + words[i]);
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 70); // Adjust speed here (lower = faster)
      
      return () => clearInterval(typingInterval);
    }
  }, [activeStep]);

  // --- Testimonial Infinite Scroll ---
  useEffect(() => {
    let animationFrameId: number;
    const scrollContainer = testimonialRef.current;
    const scroll = () => {
      if (scrollContainer && !isTestimonialsPaused) {
        scrollContainer.scrollLeft += 1;
        if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth / 2)) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isTestimonialsPaused]);

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    setIsAutoPlaying(false);
  };

  const handleNextStep = () => {
    setIsAutoPlaying(false);
    setActiveStep((prev) => (prev === 5 ? 1 : prev + 1));
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
          <div 
            ref={stepperRef}
            className="px-4 md:px-8 py-6 bg-slate-50 border-b border-slate-100 overflow-x-auto scrollbar-hide"
          >
            <div className="flex justify-between min-w-[600px] md:min-w-0 relative">
              <div className="hidden md:block absolute top-4 left-0 w-full h-0.5 bg-slate-200 -z-0"></div>
              {DEMO_STEPS.map((step) => (
                <button 
                  key={step.id} 
                  id={`step-btn-${step.id}`}
                  onClick={() => handleStepClick(step.id)}
                  className={`relative z-10 flex flex-col items-center gap-3 group focus:outline-none flex-1 transition-all duration-300`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${activeStep >= step.id ? 'bg-slate-900 text-white shadow-lg scale-110' : 'bg-white text-slate-400 border-2 border-slate-200'}`}>
                    {step.id}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${activeStep === step.id ? 'text-slate-900' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="p-6 md:p-12 min-h-[400px] md:min-h-[500px] bg-white flex flex-col justify-between">
            
            {/* Steps Content Area */}
            <div className="flex-1 flex flex-col justify-center">
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

              {activeStep === 2 && (
                <div className="max-w-3xl mx-auto w-full space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-lg font-bold text-center mb-4">Choose a Title</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm opacity-50">The Ultimate Guide to Cheap Travel</div>
                    <div className="p-4 bg-blue-50 border-2 border-blue-600 rounded-lg shadow-md flex justify-between items-center transform scale-105 transition-transform">
                      <span className="font-medium text-blue-900">How to Travel the World on a Shoestring Budget</span>
                      <Check className="h-5 w-5 text-blue-600"/>
                    </div>
                    <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm opacity-50">5 Ways to Save Money on Vacation</div>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="max-w-3xl mx-auto w-full space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold">Content Structure</h3>
                    <button className="text-blue-600 text-sm font-bold">+ Add Section</button>
                  </div>
                  <div className="space-y-2">
                    {["Intro: Why Budget Travel Matters","1. Booking Flights Like a Pro","2. Accommodation Hacks","3. Eating Cheap but Good","Conclusion"].map((item,i)=>(
                      <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                        <div className="text-slate-300">:::</div>
                        <div className="flex-1 font-medium text-slate-700">{item}</div>
                        <div className="text-slate-400"><PenTool className="h-4 w-4"/></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeStep === 4 && (
                <div className="max-w-3xl mx-auto w-full space-y-6 animate-in fade-in duration-500">
                  <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-8 min-h-[300px] relative overflow-hidden flex flex-col">
                     <div className="flex items-center gap-2 mb-6">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Writing...</span>
                     </div>
                     <h1 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">How to Travel the World on a Shoestring Budget</h1>
                     {/* STREAMING TEXT ANIMATION */}
                     <div className="text-slate-600 leading-relaxed text-sm md:text-base font-medium">
                        {displayedText}
                        <span className="inline-block w-1.5 h-4 bg-blue-600 ml-1 animate-pulse align-middle"></span>
                     </div>
                  </div>
                </div>
              )}

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
                          <p>Traveling the world is a dream for many...</p>
                          <h2 className="text-lg font-bold text-slate-800 mt-4">1. Smart Flight Booking Strategies</h2>
                          <p>First, let&apos;s talk about flights. Being flexible with your dates can save you hundreds of dollars.</p>
                       </div>
                    </div>
                    <div className="text-center pt-2">
                       <button onClick={()=>{setActiveStep(1);setIsAutoPlaying(true);}} className="text-blue-600 font-bold hover:underline flex items-center justify-center gap-2 text-sm">
                          <RefreshCw className="h-3 w-3"/> Replay Demo
                       </button>
                    </div>
                 </div>
              )}
            </div>

            {/* --- NEW: Next Step Button --- */}
            <div className="mt-8 flex justify-center border-t border-slate-100 pt-6">
              <button 
                onClick={handleNextStep}
                className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
              >
                {activeStep === 5 ? "Start Over" : "Next Step"} 
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform"/>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (Interactive Infinite) --- */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="text-center mb-12 px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Trusted By <span className="text-blue-600">Thousands</span></h2>
          <p className="text-slate-500">See what creators are saying about Solidwriter.</p>
        </div>
        
        <div 
          ref={testimonialRef}
          className="relative w-full overflow-x-auto scrollbar-hide flex gap-8 pb-8 cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsTestimonialsPaused(true)}
          onMouseLeave={() => setIsTestimonialsPaused(false)}
          onTouchStart={() => setIsTestimonialsPaused(true)}
          onTouchEnd={() => setIsTestimonialsPaused(false)}
        >
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="w-[300px] md:w-[400px] flex-shrink-0 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 select-none">
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 text-yellow-400 fill-current"/>)}
              </div>
              <p className="text-slate-600 text-sm italic mb-4 line-clamp-3">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover pointer-events-none" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-slate-900 mb-12">Frequently Asked <span className="text-blue-600">Questions</span></h2>
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
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4