"use client";
import { useTheme } from '@/app/contexts/ThemeContext';
import { motion } from 'framer-motion';

function Trusted() {
  const { theme } = useTheme();

  const partners = [
    "Company One", "Skyline Interactive", "Nexus Tech", "Elite Services", "Global Connect",
    "Company One", "Skyline Interactive", "Nexus Tech", "Elite Services", "Global Connect" 
  ];

  return (
    <div className={`transition-colors duration-500  overflow-hidden ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-transparent'
    }`}>
      
     
      <div className="flex flex-col items-center mb-6 text-center pt-10">
        <span className={`uppercase tracking-[0.4em] text-lg md:text-xl mt-6 mb-2 font-black transition-colors duration-500 ${
          theme === 'dark' ? 'text-cyan-500/60' : 'text-cyan-700'
        }`}>
          Trusted By
        </span>
             <div className={`h-1 w-16 rounded-full transition-colors duration-500 ${

          theme === 'dark' ? 'bg-cyan-500/50' : 'bg-cyan-100'

        }`}></div>
      </div>

      <div className={`py-12 border-y transition-all duration-500 relative flex items-center ${
        theme === 'dark' 
          ? 'bg-slate-800 border-white/5' 
          : 'bg-white border-slate-100 shadow-sm'
      }`}>
        
    
        <div className="flex overflow-hidden group">
          <motion.div
            className="flex whitespace-nowrap gap-12 md:gap-24 items-center"
            animate={{
              x: [0, -1000], 
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20, 
                ease: "linear",
              },
            }}
          >
            {partners.map((partner, index) => (
              <div
                key={index}
                className={`text-2xl md:text-3xl font-black tracking-tighter flex items-center transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'text-white/30 hover:text-cyan-400 hover:scale-110' 
                    : 'text-slate-300 hover:text-cyan-600 hover:scale-110'
                }`}
              >
                <span className={`mr-3 ${theme === 'dark' ? 'text-cyan-500' : 'text-cyan-600'}`}>/</span>
                {partner}
              </div>
            ))}
          </motion.div>
        </div>

       
        <div className={`absolute inset-y-0 left-0 w-24 md:w-64 z-10 pointer-events-none bg-gradient-to-r ${
          theme === 'dark' ? 'from-black to-transparent' : 'from-white to-transparent'
        }`} />
        <div className={`absolute inset-y-0 right-0 w-24 md:w-64 z-10 pointer-events-none bg-gradient-to-l ${
          theme === 'dark' ? 'from-black to-transparent' : 'from-white to-transparent'
        }`} />
      </div>
    </div>
  );
}

export default Trusted;