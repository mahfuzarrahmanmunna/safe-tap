// components/SafeTapAdvantage.jsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useTheme } from '@/app/contexts/ThemeContext';
import {
    Droplet,
    Shield,
    CheckCircle,
    XCircle,
    Zap,
    Star,
    TrendingUp,
    ArrowRight,
    Sparkles,
    Award,
    Wifi,
    Filter,
    Clock,
    BarChart3,
    Check,
    X,
    Activity,
    Smartphone,
    AlertCircle,
    ThumbsUp,
    ThumbsDown,
    DollarSign,
} from 'lucide-react';
import Link from 'next/link';

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

// Comparison data
const comparisonData = [
    {
        category: 'SAFE Drinking Water',
        options: [
            { name: 'water can', status: 'negative', description: 'Unfit for drinking' },
            { name: 'other purifier', status: 'neutral', description: 'Under or Over Purified Water' },
            { name: 'SafeTap', status: 'positive', description: 'Pure & healthy drinking water' },
        ],
    },
    {
        category: 'MULTISTAGE Purification',
        options: [
            { name: 'water can', status: 'negative', description: 'Unknown process' },
            { name: 'other purifier', status: 'neutral', description: 'Options Available At High Costs' },
            { name: 'SafeTap', status: 'positive', description: 'RO + UV with Copper or Alkaline filter' },
        ],
    },
    {
        category: 'AFFORDABLE Prices',
        options: [
            { name: 'water can', status: 'negative', description: '₹2 - ₹4/litre' },
            { name: 'other purifier', status: 'negative', description: '₹20,000 to purchase ₹5,000/year to maintain' },
            { name: 'SafeTap', status: 'positive', description: 'Starts at ₹1/litre<br/>FREE maintenance<br/>ZERO upfront cost<br/>Lifetime FREE maintenance' },
        ],
    },
    {
        category: 'RELIABLE Service',
        options: [
            { name: 'water can', status: 'negative', description: 'Hassle to order, replace, transport' },
            { name: 'other purifier', status: 'neutral', description: 'Manual coordination' },
            { name: 'SafeTap', status: 'positive', description: 'App for easy recharge & service requests<br/>Tech-enabled service' },
        ],
    },
    {
        category: 'TECH Enabled Features',
        options: [
            { name: 'water can', status: 'negative', description: 'NA' },
            { name: 'other purifier', status: 'negative', description: 'NA' },
            { name: 'SafeTap', status: 'positive', description: 'One-click tracking of consumption, water quality & filter health<br/>IoT enabled SMART purifiers' },
        ],
    },
];

export default function SafeTapAdvantage({ title }) { 
    const { theme } = useTheme();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    

    const displayTitle = title || "The SafeTap Advantage";

    return (
        <section ref={ref} className="relative overflow-hidden py-16 lg:py-24">
            

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
              
                    <AnimatePresence mode="wait">
                        <motion.h2 
                            key={displayTitle} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent ${theme === 'dark'
                                ? 'bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-200'
                                : 'bg-gradient-to-r from-cyan-900 via-cyan-800 to-teal-700'
                                } mb-4`}
                        >
                            {displayTitle}
                        </motion.h2>
                    </AnimatePresence>

                    <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
                        Next-gen Water Purification at Best Costs
                    </p>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} max-w-2xl mx-auto mt-2`}>
                        Experience smartest water purification solutions with SafeTap.
                    </p>
                </motion.div>

                {/* Comparison Table */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className={`rounded-2xl shadow-xl backdrop-blur-md border ${theme === 'dark'
                        ? 'bg-gray-800/40 border-cyan-700/30'
                        : 'bg-white/40 border-cyan-200/50'
                        } overflow-hidden`}
                >
                    {/* Table Header */}
                    <div className={`grid grid-cols-4 ${theme === 'dark' ? 'bg-gray-800/60' : 'bg-cyan-50/60'} backdrop-blur-sm`}>
                        <div className={`p-4 ${theme === 'dark' ? 'border-gray-700' : 'border-cyan-200/50'} border-r`}>
                            <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Choose</h3>
                        </div>
                        <div className={`p-4 text-center ${theme === 'dark' ? 'border-gray-700' : 'border-cyan-200/50'} border-r`}>
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-md mb-2`}>
                                <Droplet className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-400' : 'text-cyan-600'}`} />
                            </div>
                            <h4 className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Water Can</h4>
                        </div>
                        <div className={`p-4 text-center ${theme === 'dark' ? 'border-gray-700' : 'border-cyan-200/50'} border-r`}>
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-md mb-2`}>
                                <Filter className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-400' : 'text-cyan-600'}`} />
                            </div>
                            <h4 className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Other Purifiers</h4>
                        </div>
                        <div className={`p-4 text-center`}>
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-cyan-900/50' : 'bg-cyan-100'} shadow-md mb-2`}>
                                <Zap className={`w-6 h-6 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} />
                            </div>
                            <h4 className={`font-semibold ${theme === 'dark' ? 'text-cyan-300' : 'text-cyan-700'}`}>SafeTap</h4>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {comparisonData.map((row, rowIndex) => (
                            <motion.div
                                key={rowIndex}
                                variants={itemVariants}
                                className="grid grid-cols-4 group hover:bg-cyan-500/5 transition-colors"
                            >
                                {/* Category */}
                                <div className={`p-4 ${theme === 'dark' ? 'border-gray-700' : 'border-cyan-200/50'} border-r flex items-center`}>
                                    <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{row.category}</h3>
                                </div>

                                {/* Options */}
                                {row.options.map((option, optionIndex) => (
                                    <div
                                        key={optionIndex}
                                        className={`p-4 ${optionIndex < row.options.length - 1 ? (theme === 'dark' ? 'border-gray-700' : 'border-cyan-200/50') + ' border-r' : ''} text-center`}
                                    >
                                        {option.status === 'positive' ? (
                                            <div className="flex flex-col items-center">
                                                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'} mb-2`}>
                                                    <CheckCircle className={`w-6 h-6 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                                                </div>
                                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} dangerouslySetInnerHTML={{ __html: option.description }}></p>
                                            </div>
                                        ) : option.status === 'negative' ? (
                                            <div className="flex flex-col items-center">
                                                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-100'} mb-2`}>
                                                    <XCircle className={`w-6 h-6 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                                                </div>
                                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} dangerouslySetInnerHTML={{ __html: option.description }}></p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-yellow-900/30' : 'bg-yellow-100'} mb-2`}>
                                                    <AlertCircle className={`w-6 h-6 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />
                                                </div>
                                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} dangerouslySetInnerHTML={{ __html: option.description }}></p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </motion.div>
                        ))}
                    </div>

                    {/* Table Footer */}
                    <div className={`p-6 ${theme === 'dark' ? 'bg-gray-800/60' : 'bg-cyan-50/60'} backdrop-blur-sm`}>
                        <div className="flex flex-col sm:flex-row items-center justify-between">
                            <div className="mb-4 sm:mb-0">
                                <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-1`}>
                                    Choose Smart with SafeTap
                                </h3>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Advanced purification at best prices
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-3 rounded-lg font-medium text-white transition-colors bg-gradient-to-r ${theme === 'dark'
                                    ? 'from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500'
                                    : 'from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500'
                                    } shadow-lg flex items-center space-x-2`}
                            >
                                <span>Get Started</span>
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Additional Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                >
                    <motion.div
                        whileHover={{ y: -5 }}
                        className={`p-6 rounded-xl backdrop-blur-md border ${theme === 'dark'
                            ? 'bg-gray-800/40 border-cyan-700/30'
                            : 'bg-white/40 border-cyan-200/50'
                            }`}
                    >
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-cyan-900/50' : 'bg-cyan-100'} mb-4`}>
                            <Smartphone className={`w-6 h-6 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} />
                        </div>
                        <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
                            IoT Technology
                        </h3>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Monitor water quality and filter life in real-time through our mobile app
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className={`p-6 rounded-xl backdrop-blur-md border ${theme === 'dark'
                            ? 'bg-gray-800/40 border-cyan-700/30'
                            : 'bg-white/40 border-cyan-200/50'
                            }`}
                    >
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-cyan-900/50' : 'bg-cyan-100'} mb-4`}>
                            <Shield className={`w-6 h-6 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} />
                        </div>
                        <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
                            Advanced Purification
                        </h3>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Multi-stage RO + UV purification with copper and alkaline options
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className={`p-6 rounded-xl backdrop-blur-md border ${theme === 'dark'
                            ? 'bg-gray-800/40 border-cyan-700/30'
                            : 'bg-white/40 border-cyan-200/50'
                            }`}
                    >
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-cyan-900/50' : 'bg-cyan-100'} mb-4`}>
                            <DollarSign className={`w-6 h-6 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} />
                        </div>
                        <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
                            Cost Effective
                        </h3>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Zero upfront cost with affordable monthly plans starting at ₹1/litre
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}