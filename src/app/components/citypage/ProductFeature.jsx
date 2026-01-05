"use client";
import { useTheme } from "@/app/contexts/ThemeContext";

const features = [
  {
    title: "Multistage Purification",
    desc: "Get safe & pure drinking water 24x7 with advanced multi-layer filtration.",
    img: "https://i.ibb.co.com/1tYzyT2n/Multistage-Purification-production.webp",
  },
  {
    title: "Copper Filter",
    desc: "Copper infused water 24x7 for better immunity & health benefits.",
    img: "https://i.ibb.co.com/93s7ZP4d/2-storm-product-features-production.webp",
  },
  {
    title: "High Storage Capacity",
    desc: "8 litre storage tank. Never run out of drinking water during power cuts.",
    img: "https://i.ibb.co.com/7Lyx233/3-copper-alive-product-features-production.webp",
  },
  {
    title: "High Filtration Capacity",
    desc: "15L/H purification capacity. No more waiting for clean and safe water.",
    img: "https://i.ibb.co.com/FkrRGJwC/4-copper-alive-product-features-production.webp",
  },
];

function ProductFeature() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`py-16 transition-all duration-700 relative overflow-hidden ${isDark ? 'bg-[#050b14]' : 'bg-[#f0f9ff]'}`}>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6  relative z-10">
        
        {/* Modern Header */}
        <div className="text-center mb-20">
          <span className="text-cyan-500 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Premium Technology</span>
          <h2 className={`text-3xl md:text-4xl font-black mb-6 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Copper Water Purifier Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">Features</span>
          </h2>
          <div className="flex justify-center gap-1">
            <div className="w-12 h-1.5 bg-cyan-500 rounded-full"></div>
            <div className="w-3 h-1.5 bg-cyan-500/30 rounded-full"></div>
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className={`group relative p-[1px] rounded-[2.5rem] transition-all duration-500 hover:scale-[1.02]
                ${isDark ? 'bg-gradient-to-br from-cyan-500/30 to-transparent shadow-2xl shadow-cyan-900/20' 
                         : 'bg-gradient-to-br from-white to-cyan-100 shadow-xl shadow-cyan-200/50'}`}
            >
              {/* Card Inner Body */}
              <div className={`relative h-[480px] rounded-[2.5rem] overflow-hidden flex flex-col
                ${isDark ? 'bg-[#0a121e]' : 'bg-white'}`}>
                
                {/* Image Section (Top) */}
                <div className={`relative flex-1 flex items-center justify-center p-12 transition-all duration-700 
                  ${isDark ? 'bg-slate-900/50' : 'bg-cyan-50/30'} group-hover:bg-transparent`}>
                  
                  {/* Subtle water splash effect behind image */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
                  </div>

                  <img
                    src={item.img}
                    alt={item.title}
                    className={`max-h-full max-w-full object-contain z-10 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-2
                      ${isDark ? 'drop-shadow-[0_10px_30px_rgba(6,182,212,0.3)]' : 'mix-blend-multiply'}`}
                  />
                </div>

                {/* Content Section (Bottom) */}
                <div className="p-2 relative bg-transparent ml-4">
                  {/* Floating Number Index */}
                 

                  <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 
                    ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-base leading-relaxed max-w-[90%] 
                    ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {item.desc}
                  </p>

                  {/* Cyan Decorative Element */}
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full group-hover:w-20 transition-all duration-500"></div>
                    <div className="w-2 h-2 rounded-full bg-cyan-500 group-hover:animate-ping"></div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.1),transparent_70%)]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductFeature;