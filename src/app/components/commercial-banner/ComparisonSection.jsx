'use client';

import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';

const SafeTapPoints = [
  'FREE Delivery & Installation',
  'Ensures contaminant-free drinking water',
  'No extra cost',
  'Provides 24×7 access to drinking water',
  'Streamlined and efficient service operations',
];

const waterCanPoints = [
  'Manpower cost involved',
  'Risk of contaminated drinking water',
  'Additional transportation & delivery fees',
  'Inconsistent and irregular water supply',
  'Less optimised service structure',
];

export default function ComparisonSection() {
  const { theme } = useTheme(); // 'light' or 'dark'

  return (
    <section className={`py-24 px-4 ${
      theme === 'dark'
        ? 'bg-gradient-to-b from-gray-900 to-gray-800'
        : 'bg-gradient-to-b from-cyan-50 to-white'
    }`}>
      
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`text-center text-3xl md:text-4xl font-bold ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}
      >
        How Is{' '}
        <span className={theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'}>
      SafeTap Commercial
        </span>{' '}
        Better Than Water Cans?
      </motion.h2>

      {/* Comparison Cards */}
      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* SafeTap Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`
            rounded-3xl p-8
            shadow-lg relative overflow-hidden
            border
            ${theme === 'dark'
              ? 'bg-gray-800/90 border-cyan-900/50'
              : 'bg-white border-cyan-200'
            }
          `}
        >
          {/* Cyan Glow Blob */}
          <div className={`absolute -top-16 -left-16 w-40 h-40 rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-cyan-500/40' : 'bg-cyan-400/20'
          }`} />

          <h3 className={`text-2xl font-semibold mb-6 ${
            theme === 'dark' ? 'text-cyan-300' : 'text-cyan-600'
          }`}>
           SafeTap Commercial
          </h3>

          <ul className="space-y-4">
            {SafeTapPoints.map((point, i) => (
              <li key={i} className={`flex items-start gap-3 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                <FaCheckCircle className={`mt-1 flex-shrink-0 ${
                  theme === 'dark' ? 'text-cyan-400' : 'text-cyan-500'
                }`} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Water Can Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`
            rounded-3xl p-8
            shadow-md
            border
            ${theme === 'dark'
              ? 'bg-gray-800/70 border-gray-700'
              : 'bg-gray-50 border-gray-200'
            }
          `}
        >
          <h3 className={`text-2xl font-semibold mb-6 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Water Can
          </h3>

          <ul className="space-y-4">
            {waterCanPoints.map((point, i) => (
              <li key={i} className={`flex items-start gap-3 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <FaTimesCircle className="mt-1 flex-shrink-0 text-red-400" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}