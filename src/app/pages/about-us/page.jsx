'use client';

import { motion } from 'framer-motion';
import { 
  Users, Target, Lightbulb, Heart, 
  CheckCircle2, ArrowRight, Droplets, 
  Sparkles, Smartphone, ShieldCheck 
} from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';

export default function AboutUs() {
  const { theme } = useTheme(); // 'light' or 'dark'

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <main className={theme === 'dark' ? 'bg-gray-900' : 'bg-white'}>
      
      {/* --- HERO SECTION --- */}
      <section className={`relative py-10 px-6 text-center ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-gray-800 via-gray-900 to-gray-900'
          : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-100 via-white to-white'
      }`}>
        <motion.div {...fadeIn}>
          <span className={`inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider uppercase rounded-full ${
            theme === 'dark'
              ? 'text-cyan-300 bg-cyan-900/30'
              : 'text-cyan-700 bg-cyan-100/50'
          }`}>
            Our Journey
          </span>
          <h1 className={`text-5xl md:text-5xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-400">SafeTap</span>
          </h1>
          <p className={`mt-6 text-lg max-w-2xl mx-auto leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
          }`}>
            We are on a mission to make clean, safe drinking water effortless, affordable, and sustainable for every Indian household.
          </p>
        </motion.div>
      </section>

      {/* --- OUR STORY (With Stats) --- */}
      <section className="py-8 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn}>
            <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
              theme === 'dark' ? 'text-gray-100' : 'text-slate-900'
            }`}>
              Our Story
            </h2>
            <div className={`space-y-6 text-lg leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
            }`}>
              <p>
                SafeTap journey began with a simple yet common struggle faced by two flatmates, 
                <span className="font-bold text-cyan-500"> A </span> and <span className="font-bold text-cyan-500">B</span>. 
                Finding safe water was a daily challenge.
              </p>
              <p className={`italic rounded-r-2xl p-6 border-l-4 border-cyan-500 ${
                theme === 'dark'
                  ? 'bg-gray-800/50 text-gray-200 border-cyan-600'
                  : 'bg-slate-50 text-slate-700'
              }`}>
                With less than 10% of Indian households owning a purifier, most relied on unhygienic plastic cans. We decided to change that.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className={`p-8 rounded-[2rem] shadow-xl ${
              theme === 'dark'
                ? 'bg-cyan-800 text-white shadow-cyan-900/30'
                : 'bg-cyan-600 text-white shadow-cyan-200'
            }`}>
              <h3 className="text-4xl font-bold">9+</h3>
              <p className={theme === 'dark' ? 'text-cyan-200' : 'text-cyan-100'} mt-2>Cities across Bangladesh</p>
            </div>
            <div className={`p-8 rounded-[2rem] shadow-xl ${
              theme === 'dark'
                ? 'bg-gray-800 text-white shadow-gray-700'
                : 'bg-slate-900 text-white shadow-slate-200'
            }`}>
              <h3 className="text-4xl font-bold">2.5L</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-slate-400'} mt-2>Happy Households</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- MISSION / VISION / VALUES --- */}
      <section className={`py-24 px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { title: 'Mission', icon: <Target className={theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'} />, text: 'Providing every Bangladeshi household with safe, high-quality water through innovative solutions.' },
            { title: 'Vision', icon: <Lightbulb className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />, text: 'To become Bangladeshi most preferred smart water purifier brand with zero environmental impact.' },
            { title: 'Values', icon: <Heart className={theme === 'dark' ? 'text-rose-400' : 'text-rose-500'} />, text: 'Customer-centric innovation, affordability, trust, and sustainability guide us.' },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className={`
                rounded-3xl p-10 shadow-sm border transition-all
                ${theme === 'dark'
                  ? 'bg-gray-900/70 border-gray-700 hover:shadow-cyan-900/30'
                  : 'bg-white border-slate-100 hover:shadow-xl'
                }
              `}
            >
              <div className={`mb-6 w-14 h-14 rounded-2xl flex items-center justify-center ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-slate-50'
              }`}>
                {item.icon}
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${
                theme === 'dark' ? 'text-gray-100' : 'text-slate-900'
              }`}>{item.title}</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- PRODUCT MODELS --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className={`text-4xl font-extrabold text-center mb-16 ${
          theme === 'dark' ? 'text-gray-100' : 'text-cyan-800'
        }`}>The Purifier Range</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          {[
            { title: 'Copper Purifier', icon: <ShieldCheck className={theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'} />, desc: 'Infused with copper goodness for antimicrobial protection.', suited: 'Best for traditional immunity.' },
            { title: 'Alkaline Purifier', icon: <Sparkles className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />, desc: 'pH-balanced water enriched with Calcium & Magnesium.', suited: 'Best for health enthusiasts.' },
            { title: 'Smart RO', icon: <Smartphone className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} />, desc: 'Real-time monitoring with IoT & multi-stage filtration.', suited: 'Best for advanced safety.' },
          ].map((item, i) => (
            <div key={i} className="group relative p-1 bg-gradient-to-b from-cyan-400/30 to-transparent rounded-[2.5rem]">
              <div className={`
                bg-${theme === 'dark' ? 'gray-900' : 'white'} p-10 rounded-[2.4rem] h-full transition
                group-hover:${theme === 'dark' ? 'bg-gray-800' : 'bg-cyan-50/50'}
              `}>
                <div className="mb-6">{item.icon}</div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-gray-100' : 'text-slate-900'
                }`}>{item.title}</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-slate-600'} mb-6>{item.desc}</p>
                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1  rounded-full ${
                  theme === 'dark'
                    ? 'text-cyan-300 bg-cyan-900/40'
                    : 'text-cyan-700 bg-cyan-50'
                }`}>
                  {item.suited}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- HOW IT WORKS (Timeline) --- */}
      <section className={`py-20 px-6 rounded-[3rem] mx-4 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-slate-900'
      } text-white`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Simple 3-Step Process</h2>
          <div className="grid md:grid-cols-3 gap-12 relative">
            {[
              { step: '01', title: 'Pick Your Plan', desc: 'Choose a product and plan that fits your family.' },
              { step: '02', title: 'Quick Checkout', desc: 'Submit details and pay a small security deposit.' },
              { step: '03', title: 'Enjoy Pure Water', desc: 'Installation within 48 hours with free maintenance.' },
            ].map((s, idx) => (
              <div key={idx} className="relative text-center">
                <div className="text-7xl font-black text-white/10 absolute -top-10 left-1/2 -translate-x-1/2 select-none">
                  {s.step}
                </div>
                <h4 className="text-xl font-bold mb-3">{s.title}</h4>
                <p className="text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- LEADERS --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <h2 className={`text-3xl font-bold mb-12 ${
          theme === 'dark' ? 'text-gray-100' : 'text-slate-900'
        }`}>Driven by Visionaries</h2>
        <div className="flex flex-wrap justify-center gap-12">
          {[
            { name: 'X', role: 'CEO & Founder' },
            { name: 'Y', role: 'CMO & Co-Founder' }
          ].map((leader, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-24 h-24 rounded-full mb-6 flex items-center justify-center ${
                theme === 'dark' ? 'bg-gray-800 text-gray-500' : 'bg-slate-100 text-slate-400'
              }`}>
                <Users size={40} />
              </div>
              <h3 className={`text-xl font-bold ${
                theme === 'dark' ? 'text-gray-100' : 'text-slate-900'
              }`}>{leader.name}</h3>
              <p className="text-cyan-500 font-medium">{leader.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-6 px-6">
        <div className={`max-w-6xl mx-auto rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-cyan-800 to-blue-900'
            : 'bg-gradient-to-r from-cyan-600 to-blue-300'
        }`}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Experience the Future of <br /> Drinking Water
            </h2>
            <p className={`mb-10 text-lg max-w-xl mx-auto ${
              theme === 'dark' ? 'text-cyan-200' : 'text-cyan-100'
            }`}>
              Join 2.5 Lakh households already enjoying SafeTap hassle-free subscription.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 mx-auto shadow-lg ${
                theme === 'dark'
                  ? 'bg-white text-cyan-700'
                  : 'bg-white text-cyan-700'
              }`}
            >
              Start Your Subscription <ArrowRight size={20} />
            </motion.button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </div>
      </section>

    </main>
  );
}