// components/SafeTapBanner.jsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '@/app/contexts/ThemeContext';
import {
    Droplet,
    Shield,
    CheckCircle,
    Zap,
    Star,
    TrendingUp,
    ArrowRight,
    Sparkles,
    Home,
    MapPin,
    Calendar,
    DollarSign,
    Users,
    Info,
    Award,
    Wifi,
    Filter,
    Clock,
    BarChart3,
    ChevronDown,
    Check,
    X,
    Activity,
    Play,
    ArrowUpRight,
    HeadphonesIcon,
} from 'lucide-react';
import Image from 'next/image';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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

export default function SafeTapBanner() {
    const { theme } = useTheme();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [activeFeature, setActiveFeature] = useState(0);

    // Features for the banner
    const features = [
        {
            icon: Shield,
            title: 'Advanced Filtration',
            description: 'Multi-stage purification removes all contaminants',
        },
        {
            icon: Wifi,
            title: 'IoT Technology',
            description: 'Real-time monitoring of water quality',
        },
        {
            icon: DollarSign,
            title: 'Affordable Plans',
            description: 'Flexible rental options for every budget',
        },
    ];

    // Auto-rotate features
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [features.length]);

    // Get the current feature icon
    const CurrentIcon = features[activeFeature].icon;

    return (
        <section ref={ref} className="relative overflow-hidden">
            {/* Background with Gradient */}
            <div className={`absolute inset-0 ${theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-cyan-900/20 to-teal-900'
                : 'bg-gradient-to-br from-cyan-50 via-white to-teal-50'
                }`}></div>

            {/* Animated Background Pattern */}
            <div className={`absolute inset-0 ${theme === 'dark' ? 'opacity-5' : 'opacity-10'
                }`}>
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="water-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M0,50 Q25,30 50,50 T100,50" stroke="#06b6d4" strokeWidth="2" fill="none" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#water-pattern)" />
                </svg>
            </div>

            {/* Animated Background Shapes */}
            <motion.div
                className={`absolute top-10 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl ${theme === 'dark'
                    ? 'bg-cyan-800 opacity-20'
                    : 'bg-cyan-200 opacity-30'
                    }`}
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
            />
            <motion.div
                className={`absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl ${theme === 'dark'
                    ? 'bg-teal-800 opacity-20'
                    : 'bg-teal-300 opacity-30'
                    }`}
                animate={{ y: [0, 30, 0] }}
                transition={{ duration: 7, repeat: Infinity, repeatType: 'reverse' }}
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
                            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${theme === 'dark'
                                ? 'bg-cyan-900/30 text-cyan-200 border border-cyan-700/30'
                                : 'bg-cyan-100 text-cyan-800 border border-cyan-200'
                                } backdrop-blur-sm`}
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Smart Water Purification Solution
                        </motion.div>

                        {/* Main Title */}
                        <motion.h1
                            variants={itemVariants}
                            className={`text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent leading-tight ${theme === 'dark'
                                ? 'bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-200'
                                : 'bg-gradient-to-r from-cyan-900 via-cyan-800 to-teal-700'
                                }`}
                        >
                            Pure Water,
                            <br />
                            Smart Solution
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className={`text-lg lg:text-xl max-w-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                }`}
                        >
                            Experience the future of water purification with SafeTap. Our advanced IoT-enabled water purifiers provide pure, healthy water at your fingertips.
                        </motion.p>

                        {/* Features */}
                        <motion.div
                            variants={itemVariants}
                            className="space-y-4"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeFeature}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className={`p-4 rounded-xl backdrop-blur-md border ${theme === 'dark'
                                        ? 'bg-gray-800/40 border-cyan-700/30'
                                        : 'bg-white/40 border-cyan-200/50'
                                        }`}
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className={`p-2 rounded-lg ${theme === 'dark'
                                            ? 'bg-cyan-900/50'
                                            : 'bg-cyan-100'
                                            }`}>
                                            <CurrentIcon className={`w-6 h-6 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} />
                                        </div>
                                        <div>
                                            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                {features[activeFeature].title}
                                            </h3>
                                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {features[activeFeature].description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Feature Indicators */}
                            <div className="flex space-x-2">
                                {features.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveFeature(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${activeFeature === index
                                            ? 'w-8 bg-cyan-500'
                                            : 'w-2 bg-gray-400'
                                            }`}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`group relative px-8 py-4 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 overflow-hidden ${theme === 'dark'
                                    ? 'bg-gradient-to-r from-cyan-600 to-teal-700 text-white'
                                    : 'bg-gradient-to-r from-cyan-600 to-teal-700 text-white'
                                    }`}
                            >
                                <span className="relative z-10">Get Started</span>
                                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'dark'
                                    ? 'bg-gradient-to-r from-cyan-500 to-teal-600'
                                    : 'bg-gradient-to-r from-cyan-500 to-teal-600'
                                    }`} />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`group relative px-8 py-4 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 overflow-hidden ${theme === 'dark'
                                    ? 'bg-gray-800/60 text-cyan-200 border border-cyan-700/30 hover:bg-gray-800/80'
                                    : 'bg-white/60 text-cyan-800 border border-cyan-200/50 hover:bg-white/80'
                                    } backdrop-blur-sm`}
                            >
                                <Play className="w-5 h-5 relative z-10" />
                                <span className="relative z-10">Watch Demo</span>
                            </motion.button>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-6"
                        >
                            <div className="flex items-center space-x-2">
                                <Users className={`w-5 h-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} />
                                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>50,000+ Happy Customers</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Star className={`w-5 h-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} />
                                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>4.8/5 Rating</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Award className={`w-5 h-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} />
                                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>ISO Certified</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Visual Side */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : {}}
                        transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.5 }}
                        className="relative lg:ml-auto"
                    >
                        {/* Main Product Image */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-teal-600/20 rounded-2xl blur-xl"></div>
                            <div className={`relative rounded-2xl overflow-hidden shadow-2xl border ${theme === 'dark' ? 'border-cyan-700/30' : 'border-cyan-200/50'
                                }`}>
                                <Image
                                    src="https://i.ibb.co/x85grR08/smartwater-subscription.png"
                                    alt="SafeTap Water Purifier"
                                    width={500}
                                    height={500}
                                    className="w-full h-auto"
                                />
                            </div>
                        </motion.div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-4 -left-4"
                        >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md border ${theme === 'dark'
                                ? 'bg-gray-800/40 border-cyan-700/30'
                                : 'bg-white/40 border-cyan-200/50'
                                }`}>
                                <Shield className={`w-8 h-8 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
                                    }`} />
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute -bottom-4 right-4"
                        >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md border ${theme === 'dark'
                                ? 'bg-gray-800/40 border-cyan-700/30'
                                : 'bg-white/40 border-cyan-200/50'
                                }`}>
                                <Wifi className={`w-7 h-7 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
                                    }`} />
                            </div>
                        </motion.div>

                        {/* Price Badge */}
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-4 z-20"
                        >
                            <div className={`px-4 py-2 rounded-full backdrop-blur-md border shadow-lg ${theme === 'dark'
                                ? 'bg-cyan-900/70 border-cyan-700/50 text-cyan-100'
                                : 'bg-white/70 border-cyan-200/50 text-cyan-800'
                                }`}>
                                <span className="text-sm font-semibold">Starting at ₹299/month</span>
                            </div>
                        </motion.div>

                        {/* Decorative Elements */}
                        <div className={`absolute inset-0 rounded-2xl blur-3xl transform -translate-y-10 translate-x-10 ${theme === 'dark'
                            ? 'bg-gradient-to-tr from-cyan-900/20 to-transparent'
                            : 'bg-gradient-to-tr from-cyan-200/20 to-transparent'
                            }`} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}