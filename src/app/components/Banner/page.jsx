// components/HeroBanner.js
'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
// import { useTheme } from '../contexts/ThemeContext'; // Add this import
import {
  Droplet,
  ArrowRight,
  Shield,
  CheckCircle,
  Zap,
  Users,
  Waves,
  Sparkles,
  Star,
  Filter,
  Award,
  BarChart3,
  TrendingUp,
  Clock,
  MapPin,
  Phone,
  Play,
} from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

const features = [
  { icon: Shield, text: 'ISO 9001 Certified' },
  { icon: CheckCircle, text: '100% Purity Guaranteed' },
  { icon: Users, text: '10,000+ Happy Customers' },
];

const stats = [
  { icon: TrendingUp, value: '99.9%', label: 'Purity Rate' },
  { icon: Users, value: '10,000+', label: 'Happy Customers' },
  { icon: Clock, value: '24/7', label: 'Support' },
];

export default function HeroBanner() {
  const { theme } = useTheme(); // Get the current theme
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Multi-layered Background with Gradient and Pattern */}
      <div className={`absolute inset-0 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900' 
          : 'bg-gradient-to-br from-sky-50 via-white to-blue-50'
      }`}></div>
      
      {/* Animated Background Pattern */}
      <div className={`absolute inset-0 ${
        theme === 'dark' ? 'opacity-5' : 'opacity-10'
      }`}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="water-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0,50 Q25,30 50,50 T100,50" stroke="#0EA5E9" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#water-pattern)" />
        </svg>
      </div>
      
      {/* Animated Background Shapes */}
      <motion.div
        className={`absolute top-10 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl ${
          theme === 'dark' 
            ? 'bg-blue-800 opacity-20' 
            : 'bg-sky-200 opacity-30'
        }`}
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
      />
      <motion.div
        className={`absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl ${
          theme === 'dark' 
            ? 'bg-indigo-800 opacity-20' 
            : 'bg-blue-300 opacity-30'
        }`}
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: 'reverse' }}
      />
      <motion.div
        className={`absolute -bottom-8 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl ${
          theme === 'dark' 
            ? 'bg-purple-800 opacity-20' 
            : 'bg-indigo-200 opacity-30'
        }`}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${
                theme === 'dark' 
                  ? 'bg-blue-900/30 text-blue-200 border-blue-800' 
                  : 'bg-blue-100 text-blue-800 border-blue-200'
              }`}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Serving All Major Cities in Bangladesh
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent leading-tight ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200' 
                  : 'bg-gradient-to-r from-blue-900 via-blue-800 to-sky-600'
              }`}
            >
              Pure Water,
              <br />
              <span className="relative">
                Pure Life.
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <motion.path
                    d="M0,4 Q50,8 100,4 T200,4"
                    stroke="#0EA5E9"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  />
                </svg>
              </span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className={`text-lg lg:text-xl max-w-xl ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Experience the future of water purification with SAFETAP. Advanced technology, subscription-based service, and unmatched quality for your home and office in Bangladesh.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              {features.map((feature, index) => (
                <div key={index} className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-md border ${
                  theme === 'dark' 
                    ? 'bg-gray-800/80 border-gray-700' 
                    : 'bg-white/80 border-sky-100'
                }`}>
                  <feature.icon className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-700'
                  }`} />
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-8 py-4 font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 overflow-hidden ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                    : 'bg-gradient-to-r from-blue-900 to-blue-800 text-white'
                }`}
              >
                <span className="relative z-10">Explore Our Products</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                    : 'bg-gradient-to-r from-sky-600 to-blue-700'
                }`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group px-8 py-4 font-bold rounded-lg shadow-xl border-2 flex items-center justify-center space-x-2 transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 text-blue-200 border-gray-600 hover:border-blue-500' 
                    : 'bg-white text-blue-900 border-blue-200 hover:border-sky-400'
                }`}
              >
                <Phone className="w-5 h-5" />
                <span>Get a Free Quote</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-4"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className={`w-5 h-5 mr-2 ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-700'
                    }`} />
                    <span className={`text-2xl font-bold ${
                      theme === 'dark' ? 'text-blue-200' : 'text-blue-900'
                    }`}>{stat.value}</span>
                  </div>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Visual Side */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.5 }}
            className="relative lg:ml-auto"
          >
            {/* Product Showcase */}
            <div className="relative">
              {/* Main Product Visual */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className={`w-64 h-64 rounded-full flex items-center justify-center shadow-2xl ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-800' 
                    : 'bg-gradient-to-br from-blue-400 to-blue-600'
                }`}>
                  <Droplet className="w-32 h-32 text-white" fill="currentColor" />
                </div>
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}>
                  <Filter className={`w-8 h-8 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
              </motion.div>
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-4 -left-4"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}>
                  <Award className={`w-7 h-7 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
              </motion.div>
              
              {/* Testimonial Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1, duration: 0.5 }}
                className={`absolute top-1/2 -left-8 transform -translate-y-1/2 rounded-lg shadow-xl p-4 w-48 border ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className={`text-sm italic ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>"Best water purifier service in Bangladesh!"</p>
                <p className={`text-xs mt-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>- Ahmed, Dhaka</p>
              </motion.div>
              
              {/* Water Quality Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.5 }}
                className={`absolute bottom-0 right-0 rounded-lg shadow-xl p-4 w-48 border ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>Water Quality</span>
                  <span className={`text-sm font-bold ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`}>Excellent</span>
                </div>
                <div className={`w-full rounded-full h-2 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <motion.div
                    className={`h-2 rounded-full ${
                      theme === 'dark' 
                        ? 'bg-gradient-to-r from-green-500 to-green-600' 
                        : 'bg-gradient-to-r from-green-400 to-green-600'
                    }`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '95%' } : {}}
                    transition={{ delay: 1.5, duration: 1 }}
                  />
                </div>
                <p className={`text-xs mt-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>95% Purity Rate</p>
              </motion.div>
            </div>
            
            {/* Decorative Elements */}
            <div className={`absolute inset-0 rounded-full blur-3xl transform -translate-y-10 translate-x-10 ${
              theme === 'dark' 
                ? 'bg-gradient-to-tr from-blue-900/20 to-transparent' 
                : 'bg-gradient-to-tr from-sky-200/20 to-transparent'
            }`} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}