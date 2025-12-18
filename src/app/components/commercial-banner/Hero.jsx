'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShieldCheck, ArrowRight, PieChart, Sparkles, Activity } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-16">
      
      {/* --- TRENDING CYAN MESH BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-cyan-100/50 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[55%] rounded-full bg-emerald-50/40 blur-[100px]" />
      </div>

      {/* --- SUBTLE GRID PATTERN --- */}
      <div className="absolute inset-0 z-0 opacity-[0.04] [background-image:linear-gradient(#0891b2_1.5px,transparent_1.5px),linear-gradient(90deg,#0891b2_1.5px,transparent_1.5px)] [background-size:45px_45px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* LEFT: CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 mb-8 shadow-sm"
            >
              <Sparkles size={16} className="text-cyan-600" />
              <span className="text-sm font-bold text-cyan-700 tracking-wide uppercase">Next-Gen IoT Purification</span>
            </motion.div>

            <h1 className="text-5xl lg:text-5xl xl:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              Smart Water <br />
              <span className="relative inline-block text-cyan-600 italic">
                for Business.
                <motion.span 
                   initial={{ width: 0 }}
                   animate={{ width: '100%' }}
                   transition={{ delay: 0.8, duration: 1 }}
                   className="absolute bottom-2 left-0 h-[15%] bg-cyan-100 -z-10" 
                />
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-500 max-w-lg mb-10 font-medium leading-relaxed mx-auto lg:mx-0">
              India&apos;s most advanced IoT-enabled commercial water solution. High-performance purification with <span className="text-cyan-600 font-bold underline decoration-cyan-200 underline-offset-4">zero maintenance.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
              <button className="group relative px-10 py-5 bg-cyan-600 text-white font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-cyan-200">
                <span className="relative z-10 flex items-center gap-3 text-lg">
                  Get a Free Demo <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <button className="px-10 py-5 bg-white text-slate-700 font-bold rounded-2xl border-2 border-slate-100 hover:border-cyan-200 hover:bg-cyan-50 transition-all shadow-sm">
                Pricing Plans
              </button>
            </div>

            {/* TRUST INDICATORS */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 border-t border-slate-100 pt-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600 shadow-inner"><Activity size={20} /></div>
                <p className="text-sm font-bold text-slate-700 text-left leading-tight">IoT Enabled<br/><span className="text-slate-400 font-medium">Real-time tracking</span></p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner"><ShieldCheck size={20} /></div>
                <p className="text-sm font-bold text-slate-700 text-left leading-tight">Zero Cost<br/><span className="text-slate-400 font-medium">Annual Maintenance</span></p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: IMAGE ADJUSTED TO FULL CARD */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 relative w-full"
          >
            {/* Main Glass Card Container */}
            <div className="relative z-10 w-full max-w-[500px] mx-auto aspect-[4/5] bg-white rounded-[3.5rem] border border-white shadow-[0_50px_100px_-20px_rgba(8,145,178,0.15)] overflow-hidden">
              
              {/* Image filling the entire card space */}
              <div className="absolute inset-0">
                <Image
                  src="https://i.ibb.co/2Y5M6Q7W/b2b-hero-mob.webp" 
                  alt="DrinkPrime Commercial Purifier" 
                  fill
                  priority 
                  className="object-cover object-center" 
                />
                {/* Subtle gradient overlay to make white text/panels pop on the image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Floating Status Panels (Z-index updated to stay above image) */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-8 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white w-40 z-20"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 bg-cyan-500 rounded text-white"><PieChart size={12} /></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Live Flow</span>
                </div>
                <div className="text-xl font-black text-slate-800">1,240 <span className="text-xs font-normal">L/h</span></div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1, ease: "easeInOut" }}
                className="absolute bottom-10 left-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white w-44 z-20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-emerald-500 rounded text-white"><ShieldCheck size={12} /></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Purity Guard</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-cyan-500 w-[98%]" />
                </div>
                <div className="mt-1 flex justify-between text-[10px] font-bold text-cyan-600">
                  <span>98% Purity</span>
                </div>
              </motion.div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-200/30 rounded-full blur-[80px] -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100/40 rounded-full blur-[80px] -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}