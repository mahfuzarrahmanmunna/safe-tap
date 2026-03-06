'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useState, useEffect } from 'react';

const filters = [
  { name: 'Particle Remover', img: 'https://i.ibb.co/chQkWRgs/download.jpg' },
  { name: 'Chlorine & Odour', img: 'https://i.ibb.co/JF8bFKLv/chlorine-taste-and-odour-removal-in-line-water-filter-cartridge.jpg' },
  { name: 'High Reject RO', img: 'https://i.ibb.co/MDsZK2g9/8bd21048333e1a0f9c4ccc1e997905b8301fb506-original.jpg' },
  { name: 'UV', img: 'https://i.ibb.co/tyL81vh/4-1-11zon.jpg' },
  { name: 'Copper Boost', img: 'https://i.ibb.co/1G76fGS9/8ee2f5b51b022ee2ff6768f3fd221fe4-jpg-720x720q80.jpg' },
  { name: 'Alkaline Boost', img: 'https://i.ibb.co/5WFXkwBp/Mineral-Boost.webp' },
];

export default function CustomIot() {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    checkScreen();
    window.addEventListener('resize', checkScreen);
    
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Responsive filter dimensions
  const getFilterDimensions = () => {
    if (isMobile) return { width: 70, height: 200 };
    if (isTablet) return { width: 90, height: 230 };
    return { width: 120, height: 260 };
  };

  const { width: filterWidth, height: filterHeight } = getFilterDimensions();

  // Responsive phone dimensions
  const getPhoneDimensions = () => {
    if (isMobile) return { width: 200, height: 400 };
    if (isTablet) return { width: 250, height: 480 };
    return { width: 300, height: 580 };
  };

  const { width: phoneWidth, height: phoneHeight } = getPhoneDimensions();

  return (
    <section className={`w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-[#f7f9fc]'
    }`}>
      
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`text-center text-2xl sm:text-3xl md:text-4xl font-bold px-2 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}
      >
        <span className={theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'}>
          Custom-built
        </span>{' '}
        <span className="block sm:inline">with IoT Technology</span>
      </motion.h2>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto mt-12 sm:mt-16 md:mt-20 flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-center">
        
        {/* Filters Section */}
        <div className="lg:col-span-9 w-full">
          {/* Mobile: Horizontal Scroll */}
          {isMobile ? (
            <div className="overflow-x-auto pb-6 -mx-4 px-4">
              <div className="flex flex-row gap-4 min-w-max">
                {filters.map((filter, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                      className={`
                        w-[${filterWidth}px] h-[${filterHeight}px]
                        rounded-full
                        flex items-center justify-center
                        shadow-lg
                        ring-2 sm:ring-4 transition-all
                        ${theme === 'dark'
                          ? 'bg-gray-800 ring-cyan-500/50 hover:ring-cyan-400'
                          : 'bg-white ring-cyan-400/40 hover:ring-cyan-400'
                        }
                      `}
                    >
                      <Image
                        src={filter.img}
                        alt={filter.name}
                        width={filterWidth}
                        height={filterHeight}
                        className="object-contain h-full w-auto"
                        loading="lazy"
                      />
                    </motion.div>

                    <p className={`text-xs sm:text-sm mt-3 font-medium text-center max-w-[${filterWidth}px] ${
                      theme === 'dark' ? 'text-cyan-300' : 'text-cyan-700'
                    }`}>
                      {filter.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            /* Tablet & Desktop: Grid Layout */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
              {filters.map((filter, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                    className={`
                      w-[${filterWidth}px] h-[${filterHeight}px]
                      rounded-full
                      flex items-center justify-center
                      shadow-xl
                      ring-4 transition-all
                      ${theme === 'dark'
                        ? 'bg-gray-800 ring-cyan-500/50 hover:ring-cyan-400'
                        : 'bg-white ring-cyan-400/40 hover:ring-cyan-400'
                      }
                    `}
                  >
                    <Image
                      src={filter.img}
                      alt={filter.name}
                      width={filterWidth}
                      height={filterHeight}
                      className="object-contain h-full w-auto"
                      loading="lazy"
                    />
                  </motion.div>

                  <p className={`text-xs sm:text-sm mt-3 md:mt-4 font-medium text-center ${
                    theme === 'dark' ? 'text-cyan-300' : 'text-cyan-700'
                  }`}>
                    {filter.name}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Phone Section */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="lg:col-span-3 flex justify-center w-full mt-8 lg:mt-0"
        >
          <div className={`relative ${isMobile ? '-mt-4' : isTablet ? '-mt-8' : '-mt-14'}`}>
            <Image
              src="https://i.ibb.co/DJd1SDQ/Mobile.png"
              alt="IoT App"
              width={phoneWidth}
              height={phoneHeight}
              className="z-10 drop-shadow-2xl w-auto h-auto"
              priority
            />

            {/* Cyan glow - responsive blur */}
            <div className={`absolute inset-0 -z-10 rounded-full ${
              isMobile ? 'blur-xl' : isTablet ? 'blur-2xl' : 'blur-3xl'
            } ${
              theme === 'dark' ? 'bg-cyan-500/40' : 'bg-cyan-400/20'
            }`} />
          </div>
        </motion.div>
      </div>

      {/* Bottom Text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className={`text-center mt-12 sm:mt-14 md:mt-16 max-w-2xl mx-auto px-4 text-sm sm:text-base md:text-lg ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}
      >
        We customise your water purifier with filters based on your area’s water quality.
      </motion.p>

      {/* Scroll indicator for mobile */}
      {isMobile && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-4 text-xs text-cyan-500"
        >
          <span className="animate-pulse">← Swipe to see more filters →</span>
        </motion.div>
      )}
    </section>
  );
}