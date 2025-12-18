'use client';

import { motion } from 'framer-motion';
import {
  FaMoneyBillWave,
  FaWater,
  FaWarehouse,
  FaTools,
  FaCreditCard,
  FaInfinity
} from 'react-icons/fa';

const features = [
  {
    title: 'Affordable Than Water Cans',
    desc: '50% more affordable than traditional water cans',
    icon: <FaMoneyBillWave />,
  },
  {
    title: 'Superior Water Quality',
    desc: 'Guaranteed quality with centralized IoT monitoring',
    icon: <FaWater />,
  },
  {
    title: 'Reduce Labor & Storage Cost',
    desc: 'Save manpower and storage space',
    icon: <FaWarehouse />,
  },
  {
    title: 'Reliable After-Installation Service',
    desc: 'Fast support from in-house trained technicians',
    icon: <FaTools />,
  },
  {
    title: 'Efficient Payment Solutions',
    desc: 'Simple and business-friendly payment options',
    icon: <FaCreditCard />,
  },
  {
    title: 'Free Lifetime Maintenance',
    desc: 'Lifetime maintenance with regular servicing',
    icon: <FaInfinity />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#f9fff4] to-[#f1fbf8] ">
      
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-3xl md:text-4xl font-bold text-gray-900"
      >
        Why you should choose{' '}
        <span className="text-cyan-600">DrinkPrime</span> Commercial?
      </motion.h2>

      {/* Cards */}
      <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -8 }}
            className="
              bg-white rounded-2xl p-8
              shadow-md hover:shadow-xl
              transition relative overflow-hidden
            "
          >
            {/* Lemon Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl" />

            {/* Icon */}
            <div className="
              w-14 h-14 rounded-xl
              bg-gradient-to-br from-lime-400 to-cyan-400
              flex items-center justify-center
              text-white text-xl mb-6
            ">
              {item.icon}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
