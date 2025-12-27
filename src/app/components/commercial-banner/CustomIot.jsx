'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/app/contexts/ThemeContext';

const filters = [
  { name: 'Particle Remover', img: 'https://i.ibb.co/chQkWRgs/download.jpg' },
  { name: 'Chlorine & Odour', img: 'https://i.ibb.co/JF8bFKLv/chlorine-taste-and-odour-removal-in-line-water-filter-cartridge.jpg' },
  { name: 'High Reject RO', img: 'https://i.ibb.co/MDsZK2g9/8bd21048333e1a0f9c4ccc1e997905b8301fb506-original.jpg' },
  { name: 'UV', img: 'https://i.ibb.co/tyL81vh/4-1-11zon.jpg' },
  { name: 'Copper Boost', img: 'https://i.ibb.co/1G76fGS9/8ee2f5b51b022ee2ff6768f3fd221fe4-jpg-720x720q80.jpg' },
  { name: 'Alkaline Boost', img: 'https://i.ibb.co/5WFXkwBp/Mineral-Boost.webp' },
];

export default function CustomIot() {
  const { theme } = useTheme(); // 'light' or 'dark'

  return (
    <section className={`py-20 px-4 overflow-hidden ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-[#f7f9fc]'
    }`}>
      
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`text-center text-3xl md:text-4xl font-bold ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}
      >
        <span className={theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'}>
          Custom-built
        </span>{' '}
        with IoT Technology
      </motion.h2>

      <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Filters */}
        <div className="lg:col-span-9">
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-8">
            {filters.map((filter, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className={`
                    w-[90px] md:w-[110px] h-[260px]
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
                    width={120}
                    height={260}
                    className="object-contain h-full"
                  />
                </motion.div>

                <p className={`text-sm mt-4 font-medium text-center ${
                  theme === 'dark' ? 'text-cyan-300' : 'text-cyan-700'
                }`}>
                  {filter.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="lg:col-span-3 flex justify-center"
        >
          <div className="relative -mt-14">
            <Image
              src="https://i.ibb.co/DJd1SDQ/Mobile.png"
              alt="IoT App"
              width={300}
              height={580}
              className="z-10 drop-shadow-2xl"
            />

            {/* Cyan glow */}
            <div className={`absolute inset-0 -z-10 rounded-full blur-3xl ${
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
        className={`text-center mt-16 max-w-2xl mx-auto text-lg ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}
      >
        We customise your water purifier with filters based on your area’s water quality.
      </motion.p>
    </section>
  );
}