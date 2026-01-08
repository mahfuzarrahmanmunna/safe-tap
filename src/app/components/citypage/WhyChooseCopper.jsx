"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useTheme } from "@/app/contexts/ThemeContext";

const data = [
  {
    id: "maintenance",
    label: "Free Maintenance",
    title: "Lifetime Free Maintenance",
    desc: "We take full responsibility for your purifier. Enjoy zero service charges and free filter changes for life without any hidden costs.",
    img: "https://i.ibb.co.com/1tYzyT2n/Multistage-Purification-production.webp",
  },
  {
    id: "trial",
    label: "Free 7-Day Trial",
    title: "7-Day Risk-Free Trial",
    desc: "Experience the purity first-hand. Try our RO + UV Copper water purifier for 7 days at your home before you decide to subscribe.",
    img: "https://i.ibb.co.com/93s7ZP4d/2-storm-product-features-production.webp",
  },
  {
    id: "delivery",
    label: "Free Delivery & Installation",
    title: "Zero Setup Hassle",
    desc: "Our expert technicians will deliver and install the device at your preferred location for absolutely free of cost.",
    img: "https://i.ibb.co.com/FkrRGJwC/4-copper-alive-product-features-production.webp",
  },
  {
    id: "relocation",
    label: "Free Relocation",
    title: "Move With Peace of Mind",
    desc: "Shifting your house? Don't worry about your purifier. We offer free relocation services across Bengaluru whenever you move.",
    img: "https://i.ibb.co.com/7Lyx233/3-copper-alive-product-features-production.webp",
  },
];

function WhyChooseCopper() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState(data[0]);

  return (
    <section className={`py-20 transition-all duration-700 ${isDark ? 'bg-[#020617]' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Why Choose <span className="text-cyan-500">SafeTap</span>
          </h2>
          <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Everything you need for a hassle-free water purification experience.
          </p>
        </div>

        {/* Tab Buttons Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {data.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 border-2
                ${activeTab.id === tab.id 
                  ? 'bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/40 scale-105' 
                  : isDark 
                    ? 'bg-slate-900 border-slate-800 text-slate-400 hover:border-cyan-500/50' 
                    : 'bg-white border-slate-100 text-slate-600 hover:border-cyan-200 shadow-sm'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Content Display */}
        <div className={`relative overflow-hidden rounded-[2.5rem] p-8 md:p-16 border transition-all duration-500
          ${isDark ? 'bg-slate-900/50 border-slate-800 shadow-2xl shadow-black/50' : 'bg-white border-white shadow-2xl shadow-cyan-100/40'}`}>
          
          <div className="flex flex-col md:flex-row items-center gap-12 min-h-[350px]">
            
            {/* Content Side */}
            <div className="flex-1 space-y-6 text-center md:text-left animate-fadeIn">
              <div className="inline-block px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-500 text-xs font-bold uppercase tracking-widest">
                Premium Benefit
              </div>
              <h3 className={`text-3xl md:text-5xl font-black leading-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {activeTab.title}
              </h3>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {activeTab.desc}
              </p>
              <button className="mt-4 px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition-all hover:shadow-xl hover:shadow-cyan-500/30">
                Book My Free Trial
              </button>
            </div>

            {/* Image Side */}
            <div className="flex-1 flex justify-center relative">
              <div className="relative w-72 h-72 md:w-96 md:h-96 transition-all duration-700 transform hover:scale-105">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-cyan-500/10 blur-[80px] rounded-full"></div>
                
                <Image
                  key={activeTab.id} 
                  src={activeTab.img}
                  alt={activeTab.title}
                  width={500}
                  height={500}
                  className="relative z-10 object-contain w-full h-full drop-shadow-[0_20px_50px_rgba(6,182,212,0.3)] animate-slideIn"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Basic Inline Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slideIn { animation: slideIn 0.6s ease-out forwards; }
      `}</style>
    </section>
  );
}

export default WhyChooseCopper;