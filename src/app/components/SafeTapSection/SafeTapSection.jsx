// components/SafeTapSection.js
'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
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
    Wifi,
    AlertCircle,
    TrendingDown,
    XCircle,
    DollarSign,
    Check,
    Calendar,
    Home,
    ZapOff,
} from 'lucide-react';
import Image from 'next/image';

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

const stats = [
    { icon: Users, value: '1M+', label: 'Strong Community' },
    { icon: Users, value: '2L+', label: 'Customer Referrals' },
    { icon: Wifi, value: 'Built with IoT technology', label: '' },
];

const hiddenCosts = [
    { icon: XCircle, text: 'Recurring AMCs' },
    { icon: XCircle, text: 'Pre-filters expenses' },
    { icon: XCircle, text: 'Taste enhancers' },
    { icon: XCircle, text: 'Maintenance costs' },
];

export default function SafeTapSection() {
    const { theme } = useTheme();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section ref={ref} className="relative overflow-hidden py-16 lg:py-24">
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

            <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Stats Section */}
                {/* <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`flex items-center justify-center p-6 rounded-2xl shadow-lg backdrop-blur-md border ${theme === 'dark'
                                ? 'bg-gray-800/40 border-cyan-700/30'
                                : 'bg-white/40 border-cyan-200/50'
                                }`}
                        >
                            <stat.icon className={`w-8 h-8 mr-3 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
                                }`} />
                            <div>
                                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-cyan-200' : 'text-cyan-900'
                                    }`}>{stat.value}</p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div> */}

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        className="space-y-8"
                    >
                        {/* Main Title */}
                        <motion.h1
                            variants={itemVariants}
                            className={`text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent leading-tight ${theme === 'dark'
                                ? 'bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-200'
                                : 'bg-gradient-to-r from-cyan-900 via-cyan-800 to-teal-700'
                                }`}
                        >
                            Owning a Water Purifier
                            <br />
                            <span className="relative text-blue-400">
                                may look attractive,
                                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                                    <motion.path
                                        d="M0,4 Q50,8 100,4 T200,4"
                                        stroke="#06b6d4"
                                        strokeWidth="3"
                                        fill="none"
                                        initial={{ pathLength: 0 }}
                                        animate={isInView ? { pathLength: 1 } : {}}
                                        transition={{ duration: 1.5, delay: 0.8 }}
                                    />
                                </svg>
                            </span>
                            <br />
                            but the truth is not
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className={`text-lg lg:text-xl max-w-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                }`}
                        >
                            Buying a water purifier comes with high hidden costs. Recurring AMCs, additional expenses for pre-filters, taste enhancers, and what not! Why commit when you can stay flexible with SafeTap?
                        </motion.p>

                        {/* Hidden Costs */}
                        {/* <motion.div
                            variants={itemVariants}
                            className={`p-6 rounded-2xl shadow-lg backdrop-blur-md border ${theme === 'dark'
                                ? 'bg-red-900/20 border-red-700/30'
                                : 'bg-red-50/70 border-red-200/50'
                                }`}
                        >
                            <h3 className={`text-xl font-semibold mb-4 flex items-center ${theme === 'dark' ? 'text-red-300' : 'text-red-700'
                                }`}>
                                <AlertCircle className="w-6 h-6 mr-2" />
                                Hidden Costs of Owning
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {hiddenCosts.map((cost, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <cost.icon className={`w-4 h-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'
                                            }`} />
                                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                            }`}>{cost.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div> */}

                        {/* Key Message */}
                        <motion.div
                            variants={itemVariants}
                            className={`text-3xl font-bold text-center py-4 px-6 rounded-2xl backdrop-blur-md border ${theme === 'dark'
                                ? 'bg-cyan-900/30 text-cyan-200 border-cyan-700/30'
                                : 'bg-cyan-100/70 text-cyan-800 border-cyan-200/50'
                                }`}
                        >
                            Buying is not saving!
                        </motion.div>

                        {/* CTA Button */}
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
                                <span className="relative z-10">Find out Why</span>
                                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'dark'
                                    ? 'bg-gradient-to-r from-cyan-500 to-teal-600'
                                    : 'bg-gradient-to-r from-cyan-500 to-teal-600'
                                    }`} />
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Enhanced Visual Side */}
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
                            <Image
                                src={'https://i.ibb.co/x85grR08/smartwater-subscription.png'}
                                alt="SafeTap Water Purifier"
                                width={500}
                                height={500}
                                className={`w-full h-auto rounded-2xl shadow-2xl border relative z-10 ${theme === 'dark' ? 'border-cyan-700/30' : 'border-cyan-200/50'
                                    }`}
                            />
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
                                <span className="text-sm font-semibold">Starting at ৳399/month</span>
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
                                <Home className={`w-8 h-8 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
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
                                <ZapOff className={`w-7 h-7 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'
                                    }`} />
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