import Image from 'next/image'
import React from 'react'
import { useTheme } from "@/app/contexts/ThemeContext";

function PracticalRemover() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`py-3 transition-all duration-500 ${isDark ? 'bg-transparent' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Side: Content */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
           
           
          </div>
          
          <h2 className={`text-3xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Particle <span className="text-cyan-500">Remover</span>
          </h2>
          
          <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Removes unwanted particles like sand, dust, dirt, and clay. 
            It even removes turbidity, which makes your water look cloudy and dirty, ensuring crystal clear output.
          </p>
        </div>

        {/* Right Side: Rounded Image */}
        <div className="flex-1 flex justify-center">
          <div className={`relative w-64 h-64 md:w-80 md:h-80 rounded-[3rem] p-4 border-2 transition-all duration-500 transform hover:rotate-3
            ${isDark 
              ? 'bg-slate-900/50 border-slate-800 hover:border-cyan-500 shadow-2xl shadow-cyan-900/20' 
              : 'bg-cyan-50/30 border-cyan-100 hover:border-cyan-300 shadow-xl shadow-cyan-100/50'}`}>
            
            <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] bg-white flex items-center justify-center">
              <Image 
                src="https://i.ibb.co.com/nNgVQGd7/1-Product-Sediment-Filter-production.webp" 
                alt="Particle Remover"
                width={300}
                height={300}
                className="object-contain p-6 transform hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Cyan Accent Decoration */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default PracticalRemover