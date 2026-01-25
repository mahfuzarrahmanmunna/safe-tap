'use client';
import { motion } from 'framer-motion';
import { Zap, Shield, Wallet, Globe, ArrowUpRight, MapPin, CreditCard } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';

const cities = [
 "Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", 
  "Barishal", "Rangpur", "Mymensingh", "Gazipur", "Narayanganj", "Cumilla"
];

// Marquee er jonno double list dorkar hoy jate gap na thake
const scrollingCities = [...cities, ...cities];

export default function BusinessSolutions() {
  const { theme } = useTheme();

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#020617] text-white' : 'bg-white text-slate-900'
    }`}>
      
      <div className="container mx-auto px-6">
        

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-6 ">
  
  {/* Card 1, 2 & 3 (Left & Middle) */}
  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* Card 1 - Updated to Cyan */}
    <div className={`p-8 rounded-[2.5rem] border ${
        theme === 'dark' ? 'bg-slate-900/40 border-cyan-900/20' : 'bg-cyan-50/30 border-cyan-100'
      }`}>
      <CreditCard className="text-cyan-600 mb-6" size={32} />
      <h3 className="text-2xl font-black mb-3">Efficient Payment</h3>
      <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Subscription-based model. Pay only for what you consume.</p>
    </div>

    {/* Card 2 - Already Cyan */}
    <div className={`p-8 rounded-[2.5rem] border ${
        theme === 'dark' ? 'bg-slate-900/40 border-cyan-900/20' : 'bg-cyan-50/30 border-cyan-100'
      }`}>
      <Zap className="text-cyan-500 mb-6" size={32} />
      <h3 className="text-2xl font-black mb-3">Zero Upfront Cost</h3>
      <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Subscription-based model. Pay only for what you consume.</p>
    </div>

    {/* Card 3 - Updated from Emerald to Cyan */}
    <div className={`p-8 rounded-[2.5rem] border ${
        theme === 'dark' ? 'bg-slate-900/40 border-cyan-900/20' : 'bg-cyan-50/30 border-cyan-100'
      }`}>
      <Shield className="text-cyan-500 mb-6" size={32} />
      <h3 className="text-2xl font-black mb-3">Lifetime Maintenance</h3>
      <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Periodic filter changes & sanitization on us.</p>
    </div>

    {/* Card 4 - Cost Effective */}
    <div className={`p-8 rounded-[2.5rem] border flex flex-col justify-between ${
        theme === 'dark' ? 'bg-slate-900/40 border-cyan-900/20 text-white' : 'bg-cyan-50/30 border-cyan-100 text-black'
      }`}>
      <div>
        <Wallet size={32} className='text-cyan-600 mb-6'/>
        <h3 className="text-2xl font-bold mb-2">Cost Effective</h3>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>40% cheaper than traditional water cans.</p>
      </div>
    </div>
  </div>

  {/* FULL WIDTH CITY MARQUEE SECTION */}
  <div className={`md:col-span-3 mt-4 rounded-[2.5rem] overflow-hidden border py-12 relative ${
      theme === 'dark' ? 'bg-slate-900/20 border-cyan-900/20' : 'bg-cyan-50/20 border-cyan-100'
    }`}>
    <div className="flex items-center justify-center gap-3 mb-8">
        <MapPin className="text-cyan-500 animate-bounce" size={20} />
              <span className="uppercase tracking-[0.3em] font-black text-sm opacity-60">Currently Serving In</span>
    </div>

    {/* MARQUEE MOTION */}
    <div className="relative flex overflow-hidden group">
      <motion.div
        className="flex whitespace-nowrap gap-6 py-2"
        animate={{ x: [0, -1000] }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" },
        }}
      >
        {scrollingCities.map((city, index) => (
          <div 
            key={index}
            className={`px-8 py-4 rounded-2xl text-xl font-bold border transition-all ${
              theme === 'dark' 
                ? 'bg-slate-800/50 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                : 'bg-white border-cyan-100 text-cyan-800 shadow-sm'
            }`}
          >
            {city}
          </div>
        ))}
      </motion.div>

      {/* Fading Gradients */}
      <div className={`absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r ${
        theme === 'dark' ? 'from-slate-950 to-transparent' : 'from-white to-transparent'
      }`} />
      <div className={`absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l ${
        theme === 'dark' ? 'from-slate-950 to-transparent' : 'from-white to-transparent'
      }`} />
    </div>
  </div>
</div>
      </div>
    </section>
  );
}