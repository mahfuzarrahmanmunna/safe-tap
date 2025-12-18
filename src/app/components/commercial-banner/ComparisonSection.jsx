'use client';

import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const drinkPrimePoints = [
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
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-cyan-50 to-white">
      
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-3xl md:text-4xl font-bold text-gray-900"
      >
        How Is{' '}
        <span className="text-cyan-700">DrinkPrime Commercial</span>{' '}
        Better Than Water Cans?
      </motion.h2>

      {/* Comparison Cards */}
      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* DrinkPrime */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="
            bg-white rounded-3xl p-8
            border border-cyan-200
            shadow-lg relative overflow-hidden
          "
        >
          {/* Cyan Glow */}
          <div className="absolute -top-16 -left-16 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl" />

          <h3 className="text-2xl font-semibold text-cyan-600 mb-6">
            DrinkPrime Commercial
          </h3>

          <ul className="space-y-4">
            {drinkPrimePoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <FaCheckCircle className="text-cyan-500 mt-1" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Water Can */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="
            bg-gray-50 rounded-3xl p-8
            border border-gray-200
            shadow-md
          "
        >
          <h3 className="text-2xl font-semibold text-gray-600 mb-6">
            Water Can
          </h3>

          <ul className="space-y-4">
            {waterCanPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-600">
                <FaTimesCircle className="text-red-400 mt-1" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
