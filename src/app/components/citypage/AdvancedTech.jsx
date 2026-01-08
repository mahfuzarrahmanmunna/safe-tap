"use client";
import React from 'react';
import { useTheme } from "@/app/contexts/ThemeContext";
import Image from 'next/image';

const techStages = [
  {
    title: "Particle Remover",
    img: "https://i.ibb.co.com/8pfM8Sg/download.webp", 
  },
  {
    title: "Chlorine & Odour Remover",
    img: "https://i.ibb.co.com/ccc24Pdg/download.webp",
  },
  {
    title: "High Rejection RO",
    img: "https://i.ibb.co.com/1ftMbpr5/download.webp",
  },
  {
    title: "Mineral Enhancer",
    img: "https://i.ibb.co.com/C32kxGk8/download.webp",
  },
  {
    title: "Copper Infusion",
    img: "https://i.ibb.co.com/cK9VL59r/download.webp",
  },
  {
    title: "Ultra Violet (UV)",
    img: "https://i.ibb.co.com/N6pNVyWT/download.webp",
  },
];

function AdvancedTech() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`py-16 transition-all duration-700 ${isDark ? 'bg-[#020617]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-black mb-4 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Advanced <span className="text-cyan-500">Filtration Technology</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full"></div>
        </div>

        {/* Circular Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {techStages.map((stage, index) => (
            <div key={index} className="flex flex-col items-center group">
              
              {/* Rounded Image Shape */}
              <div className={`relative w-20 h-20 md:w-30 md:h-30 rounded-full flex items-center justify-center p-6 mb-6 transition-all duration-500 border-2
                ${isDark 
                  ? 'bg-slate-900/50 border-slate-800 group-hover:border-cyan-500 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]' 
                  : 'bg-cyan-50/30 border-cyan-100 group-hover:border-cyan-400 group-hover:shadow-[0_15px_30px_rgba(6,182,212,0.2)]'
                }`}
              >
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <Image
                  width={300}
                height={300}
                  src={stage.img}
                  alt={stage.title}
                  className=" object-contain z-10 transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Title Text Under Image */}
              <h3 className={`text-sm md:text-base font-bold text-center leading-tight transition-colors duration-300 group-hover:text-cyan-500
                ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {stage.title}
              </h3>
              
              {/* Active Dot indicator */}
              <div className="mt-3 w-1.5 h-1.5 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdvancedTech;