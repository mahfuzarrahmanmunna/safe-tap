'use client';

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShieldCheck, ArrowRight, Sparkles, Activity, Droplets, Settings, Users } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';

const slides = [
  { id: 1, src: "https://i.ibb.co/2Y5M6Q7W/b2b-hero-mob.webp" },
  { id: 2, src: "https://i.ibb.co/2Yv1NK7G/lp125-section2-banner-img-production.webp" },
  { id: 3, src: "https://i.ibb.co/609fwHj8/free-maintainance.webp" },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useTheme(); // 'light' or 'dark'

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Mouse follow tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
<div>
      <section className={`relative flex items-center justify-center overflow-hidden pt-16 min-h-screen ${
      theme === 'dark' ? 'bg-slate-950' : 'bg-white'
    }`}>
      
      {/* TRENDING CYAN MESH BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full blur-[120px] animate-pulse ${
          theme === 'dark' ? 'bg-cyan-600/30' : 'bg-cyan-100/50'
        }`} />
        <div className={`absolute bottom-[10%] right-[-5%] w-[35%] h-[55%] rounded-full blur-[100px] ${
          theme === 'dark' ? 'bg-emerald-600/20' : 'bg-emerald-50/40'
        }`} />
      </div>

      {/* SUBTLE GRID PATTERN */}
      <div className={`absolute inset-0 z-0 opacity-[0.04] [background-image:linear-gradient(${
        theme === 'dark' ? '#0891b2' : '#0891b2'
      }_1.5px,transparent_1.5px),linear-gradient(90deg,${
        theme === 'dark' ? '#0891b2' : '#0891b2'
      }_1.5px,transparent_1.5px)] [background-size:45px_45px]`} />

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
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 shadow-sm border ${
                theme === 'dark'
                  ? 'bg-cyan-900/30 text-cyan-300 border-cyan-800'
                  : 'bg-cyan-50 text-cyan-700 border-cyan-100'
              }`}
            >
              <Sparkles size={16} className={theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'} />
              <span className="text-sm font-bold tracking-wide uppercase">Next-Gen IoT Purification</span>
            </motion.div>

            <h1 className={`text-5xl lg:text-5xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Smart Water <br />
              <span className="relative inline-block text-cyan-500 italic">
                for Business.
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className={`absolute bottom-2 left-0 h-[15%] -z-10 ${
                    theme === 'dark' ? 'bg-cyan-900/50' : 'bg-cyan-100'
                  }`} 
                />
              </span>
            </h1>

            <p className={`text-lg lg:text-xl max-w-lg mb-10 font-medium leading-relaxed mx-auto lg:mx-0 ${
              theme === 'dark' ? 'text-gray-300' : 'text-slate-500'
            }`}>
              India&apos;s most advanced IoT-enabled commercial water solution. High-performance purification with{' '}
              <span className="text-cyan-500 font-bold underline decoration-cyan-300 underline-offset-4">
                zero maintenance.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
              <button className={`group relative px-10 py-5 font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl ${
                theme === 'dark'
                  ? 'bg-cyan-600 text-white shadow-cyan-900/50'
                  : 'bg-cyan-600 text-white shadow-cyan-200'
              }`}>
                <span className="relative z-10 flex items-center gap-3 text-lg">
                  Get a Free Demo <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <button className={`px-10 py-5 font-bold rounded-2xl border-2 transition-all shadow-sm ${
                theme === 'dark'
                  ? 'bg-gray-800/50 text-gray-200 border-gray-700 hover:border-cyan-500 hover:bg-gray-700/50'
                  : 'bg-white text-slate-700 border-slate-100 hover:border-cyan-200 hover:bg-cyan-50'
              }`}>
                Pricing Plans
              </button>
            </div>

            <div className={`mt-10 mb-4 flex flex-wrap justify-center lg:justify-start gap-8 pt-10 border-t ${
              theme === 'dark' ? 'border-gray-800' : 'border-slate-100'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${
                  theme === 'dark' ? 'bg-cyan-900/50 text-cyan-400' : 'bg-cyan-50 text-cyan-600'
                }`}>
                  <Activity size={20} />
                </div>
                <p className={`text-sm font-bold leading-tight ${
                  theme === 'dark' ? 'text-gray-200' : 'text-slate-700'
                }`}>
                  IoT Enabled<br/>
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-slate-400'}>Real-time tracking</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${
                  theme === 'dark' ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  <ShieldCheck size={20} />
                </div>
                <p className={`text-sm font-bold leading-tight ${
                  theme === 'dark' ? 'text-gray-200' : 'text-slate-700'
                }`}>
                  Zero Cost<br/>
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-slate-400'}>Annual Maintenance</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: ENHANCED PHONE MOCKUP WITH TILT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 relative w-full flex justify-center items-center py-6"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="relative z-10 w-full max-w-[300px] aspect-[9/16]"
            >
              {/* Phone Chassis */}
              <div className={`relative w-full h-full rounded-[3rem] p-2 shadow-2xl border ${
                theme === 'dark'
                  ? 'bg-gradient-to-b from-gray-900 via-slate-800 to-black border-white/10'
                  : 'bg-gradient-to-b from-blue-900/80 via-slate-800 to-zinc-900 border-white/10'
              }`}>
                {/* Side Buttons */}
                <div className="absolute -left-0.5 top-24 w-1 h-12 bg-zinc-800 rounded-l-md" />
                <div className="absolute -left-0.5 top-40 w-1 h-20 bg-zinc-800 rounded-l-md" />
                <div className="absolute -right-0.5 top-32 w-1 h-24 bg-zinc-800 rounded-r-md" />

                {/* Screen */}
                <div className="relative h-full bg-black rounded-[2.6rem] overflow-hidden border border-white/5">
                  {/* Dynamic Island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-full z-50 border border-white/10 flex items-center justify-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-500 shadow-lg" />
                    <div className="w-12 h-2 bg-zinc-900 rounded-full" />
                  </div>

                  {/* Slideshow */}
                  <div className="absolute inset-0 z-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={slides[currentSlide].src}
                          alt="DrinkPrime App Showcase"
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
                  </div>

                  {/* Status Bar */}
                  <div className="absolute top-8 left-6 right-6 flex justify-between items-center z-40 text-white/70 text-xs font-medium">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-3 border border-white/60 rounded-sm" />
                    </div>
                  </div>

                  {/* Glassmorphic Card */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute top-20 left-4 right-4 bg-white/8 backdrop-blur-xl p-5 rounded-3xl border border-white/20 shadow-2xl z-30"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-cyan-400 text-xs font-black uppercase tracking-wider">Realtime Water Quality</p>
                        <p className="text-white font-bold text-base mt-1">Pure & Safe</p>
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 rounded-full border-3 border-dashed border-cyan-400 flex items-center justify-center"
                      >
                        <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-emerald-500 rounded-full shadow-lg" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Home Bar */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full z-50" />

                  {/* Interactive Cursor Glow */}
                  <motion.div
                    className="absolute z-50 pointer-events-none"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      top: '35%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="#0f172a"
                      stroke="#00f5ff"
                      strokeWidth="2"
                      className="drop-shadow-[0_0_12px_#00f5d4]"
                    >
                      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                    </svg>
                  </motion.div>
                </div>
              </div>

              {/* Breathing Glow Around Phone */}
              <motion.div
                className={`absolute -inset-12 rounded-full blur-3xl -z-10 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-cyan-600/40 via-emerald-600/30 to-transparent'
                    : 'bg-gradient-to-r from-cyan-500/30 via-emerald-500/20 to-transparent'
                }`}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>


    </section>
          {/* FEATURE STRIP UNDER HERO */}
<div className={`w-full relative z-20  transition-all duration-500 ${
        theme === 'dark' 
          ? 'bg-slate-900 border-y border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)]' 
          : 'bg-slate-50 border-y border-slate-200 shadow-sm'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-around gap-10 py-4">

            {/* Item 1 */}
            <div className="group flex items-center gap-5 cursor-pointer">
              <div className="relative">
                <div className={`absolute -inset-1 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500 ${
                  theme === 'dark' ? 'bg-cyan-500' : 'bg-cyan-400'
                }`}></div>
                <div className={`relative w-14 h-14 flex items-center justify-center rounded-full border transition-all duration-300 ${
                  theme === 'dark' 
                  ? 'bg-slate-950 border-cyan-500/40 text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white' 
                  : 'bg-white border-slate-200 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600'
                }`}>
                  <Users size={26} />
                </div>
              </div>
              <div className="flex flex-col">
                <span className={`text-2xl font-black leading-none tracking-tight ${
                  theme === 'dark' ? 'bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-white' : 'text-slate-900'
                }`}>1000+</span>
                <p className={`text-[11px] font-bold uppercase tracking-[0.15em] mt-1 ${
                  theme === 'dark' ? 'text-cyan-500/80' : 'text-slate-500'
                }`}>Businesses Onboarded</p>
              </div>
            </div>

            <div className={`hidden md:block h-10 w-px ${theme === 'dark' ? 'bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent' : 'bg-slate-200'}`} />

            {/* Item 2 */}
            <div className="group flex items-center gap-5 cursor-pointer">
              <div className="relative">
                <div className={`absolute -inset-1 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500 ${
                  theme === 'dark' ? 'bg-cyan-500' : 'bg-cyan-400'
                }`}></div>
                <div className={`relative w-14 h-14 flex items-center justify-center rounded-full border transition-all duration-300 ${
                  theme === 'dark' 
                  ? 'bg-slate-950 border-cyan-500/40 text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white' 
                  : 'bg-white border-slate-200 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600'
                }`}>
                  <Settings size={26} />
                </div>
              </div>
              <div className="flex flex-col">
                <span className={`text-2xl font-black leading-none tracking-tight ${
                  theme === 'dark' ? 'bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-white' : 'text-slate-900'
                }`}>Expert</span>
                <p className={`text-[11px] font-bold uppercase tracking-[0.15em] mt-1 ${
                  theme === 'dark' ? 'text-cyan-500/80' : 'text-slate-500'
                }`}>Technician Fleet</p>
              </div>
            </div>

            <div className={`hidden md:block h-10 w-px ${theme === 'dark' ? 'bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent' : 'bg-slate-200'}`} />

            {/* Item 3 */}
            <div className="group flex items-center gap-5 cursor-pointer">
              <div className="relative">
                <div className={`absolute -inset-1 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500 ${
                  theme === 'dark' ? 'bg-cyan-500' : 'bg-cyan-400'
                }`}></div>
                <div className={`relative w-14 h-14 flex items-center justify-center rounded-full border transition-all duration-300 ${
                  theme === 'dark' 
                  ? 'bg-slate-950 border-cyan-500/40 text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white' 
                  : 'bg-white border-slate-200 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600'
                }`}>
                  <Droplets size={26} />
                </div>
              </div>
              <div className="flex flex-col">
                <span className={`text-2xl font-black leading-none tracking-tight ${
                  theme === 'dark' ? 'bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-white' : 'text-slate-900'
                }`}>Dual</span>
                <p className={`text-[11px] font-bold uppercase tracking-[0.15em] mt-1 ${
                  theme === 'dark' ? 'text-cyan-500/80' : 'text-slate-500'
                }`}>Purification Tech</p>
              </div>
            </div>

          </div>
        </div>
      </div>
</div>

  );
}