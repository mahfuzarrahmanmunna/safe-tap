// components/SafeTapProducts.jsx
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

// SafeTap product data
const safeTapProducts = [
    {
        id: 'copper',
        name: 'SafeTap Copper',
        features: ['RO + UV Purification', 'Essential minerals added', 'Goodness of copper', '5 Litre storage'],
        benefits: [
            'SafeTap copper water purifier with goodness of copper',
            'SafeTap copper water purifier which retains minerals',
            'Best class storage capacity for SafeTap water purifier in [city]',
            '15 LPH Purification capacity for SafeTap water purifier in [city]',
            'SafeTap water purifier with best in class uv purification',
            'SafeTap water purifier with realtime monitoring through IOT in [city]',
            'Best Wall/Counter Mount SafeTap Water Purification on rent in [city]',
        ],
        usagePlans: [
            {
                id: 'couple',
                name: 'Couple',
                description: '200 ltrs/m',
            },
            {
                id: 'family',
                name: 'Family',
                description: '500 ltrs/m',
            },
            {
                id: 'unlimited',
                name: 'Unlimited',
                description: 'Unlimited ltrs/m',
            }
        ],
        tenureOptions: [
            {
                id: '28-days',
                name: '28 days',
                price: 417,
                discount: 22,
                savings: 249,
            },
            {
                id: '90-days',
                name: '90 days',
                price: 417,
                discount: 22,
                savings: 249,
            },
            {
                id: '360-days',
                name: '360 days',
                price: 417,
                discount: 22,
                savings: 249,
            }
        ],
        lockInPeriod: '3 Months Lock-In',
        securityDeposit: 1500,
    },
    {
        id: 'ro-plus',
        name: 'SafeTap RO+',
        features: ['RO purification', 'Essential minerals added', 'Compact cabinet', '6.5 Litre storage'],
        benefits: [
            'SafeTap RO+ water purifier with dual cartridge',
            'SafeTap RO+ water purifier with odour remover technology',
            'SafeTap RO+ water purifier with particle remover',
            'SafeTap RO+ water purifier with ro membrane',
            'Best class storage capacity for SafeTap water purifier in [city]',
            'Best Wall/Counter Mount SafeTap Water Purification on rent in [city]',
            'SafeTap water purifier with realtime monitoring through IOT in [city]',
        ],
        usagePlans: [
            {
                id: 'unlimited',
                name: 'Unlimited',
                description: 'Unlimited ltrs/m',
            }
        ],
        tenureOptions: [
            {
                id: '28-days',
                name: '28 days',
                price: 349,
                discount: 0,
                savings: 0,
            },
            {
                id: '180-days',
                name: '180 days',
                price: 349,
                discount: 23,
                savings: 1348,
            },
            {
                id: '360-days',
                name: '360 days',
                price: 349,
                discount: 23,
                savings: 1348,
            }
        ],
        lockInPeriod: '11 Months Lock-In',
        securityDeposit: 1500,
    },
    {
        id: 'alkaline',
        name: 'SafeTap Alkaline',
        features: ['RO + UV Purification', 'Essential minerals added', 'Alkaline boost', '5 Litre storage'],
        benefits: [
            'SafeTap Alkaline water purifier with alkaline boost technology',
            '24*7 Safe and Pure 5 Multistage SafeTap Water Purification System for home in [city]',
            'Get Alkaline cartridge in Water Purifier that boosts pH levels in [city]',
            'Best Wall/Counter Mount SafeTap Water Purification on rent in [city]',
            '15 LPH Purification capacity for SafeTap water purifier in [city]',
            'Best class storage capacity for SafeTap water purifier in [city]',
            'SafeTap water purifier with realtime monitoring through IOT in [city]',
        ],
        usagePlans: [
            {
                id: 'standard',
                name: 'Standard',
                description: '250 ltrs/m',
            },
            {
                id: 'unlimited',
                name: 'Unlimited',
                description: 'Unlimited ltrs/m',
            }
        ],
        tenureOptions: [
            {
                id: '28-days',
                name: '28 days',
                price: 429,
                discount: 0,
                savings: 0,
            },
            {
                id: '360-days',
                name: '360 days',
                price: 429,
                discount: 22,
                savings: 1438,
            }
        ],
        lockInPeriod: '3 Months Lock-In',
        securityDeposit: 1500,
    },
    {
        id: 'under-sink',
        name: 'SafeTap Under the Sink',
        features: ['RO purification', 'Essential minerals added', '15 LPH Filtration capacity', '6.5 Litre storage'],
        benefits: [
            'SafeTap filter for SafeTap Water Purifier On Rent in [city]',
            'SafeTap Copper UTC Water Purifier',
            '15 LPH Purification capacity for SafeTap water purifier in [city]',
            'SafeTap Copper under the sink water purifier',
        ],
        usagePlans: [
            {
                id: 'unlimited',
                name: 'Unlimited',
                description: 'Unlimited ltrs/m',
            }
        ],
        tenureOptions: [
            {
                id: '28-days',
                name: '28 days',
                price: 629,
                discount: 0,
                savings: 0,
            },
            {
                id: '90-days',
                name: '90 days',
                price: 629,
                discount: 0,
                savings: 0,
            },
            {
                id: '180-days',
                name: '180 days',
                price: 629,
                discount: 0,
                savings: 0,
            },
            {
                id: '360-days',
                name: '360 days',
                price: 629,
                discount: 18,
                savings: 1695,
            }
        ],
        lockInPeriod: '3 Months Lock-In',
        securityDeposit: 1999,
    },
    {
        id: 'uv',
        name: 'SafeTap UV',
        features: ['RO purification', 'Essential minerals added', 'Goodness of copper', '6.5 Litre storage'],
        benefits: [
            'SafeTap UV water purifier with advanced UV technology',
            'SafeTap UV water purifier with real-time monitoring',
            'Best class storage capacity for SafeTap water purifier in [city]',
            'SafeTap water purifier with realtime monitoring through IOT in [city]',
            'Best Wall/Counter Mount SafeTap Water Purification on rent in [city]',
        ],
        usagePlans: [
            {
                id: 'basic',
                name: 'Basic',
                description: '250 ltrs/m',
            },
            {
                id: 'unlimited',
                name: 'Unlimited',
                description: 'Unlimited ltrs/m',
            }
        ],
        tenureOptions: [
            {
                id: '28-days',
                name: '28 days',
                price: 299,
                discount: 0,
                savings: 0,
            },
            {
                id: '360-days',
                name: '360 days',
                price: 299,
                discount: 25,
                savings: 1695,
            }
        ],
        lockInPeriod: '3 Months Lock-In',
        securityDeposit: 1500,
    },
];

// Cities for dropdown
const cities = [
    'Dhaka',
    'Chattogram',
    'Khulna',
    'Rajshahi',
    'Sylhet',
    'Barishal',
    'Rangpur',
    'Mymensingh',
    'Comilla',
    'Narayanganj',
    'Other City'
];

export default function SafeTapProducts() {
    const { theme } = useTheme();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const [selectedProduct, setSelectedProduct] = useState(safeTapProducts[0]);
    const [selectedCity, setSelectedCity] = useState(cities[0]);
    const [selectedPlan, setSelectedPlan] = useState(selectedProduct.usagePlans[0]);
    const [selectedTenure, setSelectedTenure] = useState(selectedProduct.tenureOptions[0]);
    const [showCityDropdown, setShowCityDropdown] = useState(false);

    // Update selected plan and tenure when product changes
    useEffect(() => {
        setSelectedPlan(selectedProduct.usagePlans[0]);
        setSelectedTenure(selectedProduct.tenureOptions[0]);
    }, [selectedProduct]);

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

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent ${theme === 'dark'
                        ? 'bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-200'
                        : 'bg-gradient-to-r from-cyan-900 via-cyan-800 to-teal-700'
                        } mb-4`}>
                        Products That Fit Every Lifestyle And Budget
                    </h2>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
                        Each of our smart water purifiers comes with advanced multi-stage purification and IoT technology.
                    </p>
                </motion.div>

                {/* Product Selection Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {safeTapProducts.map((product) => (
                        <motion.button
                            key={product.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedProduct(product)}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${selectedProduct.id === product.id
                                    ? `bg-gradient-to-r ${theme === 'dark'
                                        ? 'from-cyan-600 to-teal-600'
                                        : 'from-cyan-600 to-teal-600'
                                    } text-white shadow-lg`
                                    : `backdrop-blur-md border ${theme === 'dark'
                                        ? 'bg-gray-800/40 border-gray-700/50 text-gray-200 hover:bg-gray-800/60'
                                        : 'bg-white/40 border-cyan-200/50 text-gray-800 hover:bg-white/60'
                                    }`
                                }`}
                        >
                            {product.name}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Product Details */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedProduct.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className={`p-8 rounded-2xl shadow-xl backdrop-blur-md border ${theme === 'dark'
                            ? 'bg-gray-800/40 border-cyan-700/30'
                            : 'bg-white/40 border-cyan-200/50'
                            }`}
                    >
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Left Column - Product Features and Benefits */}
                            <div className="space-y-6">
                                {/* Product Features */}
                                <div>
                                    <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        {selectedProduct.name}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {selectedProduct.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center space-x-2">
                                                <CheckCircle className={`w-5 h-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} />
                                                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Product Benefits */}
                                <div>
                                    <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        {selectedProduct.name} Water Purifier On Rent for Home in {selectedCity}
                                    </h4>
                                    <div className="space-y-2">
                                        {selectedProduct.benefits.map((benefit, idx) => (
                                            <div key={idx} className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {benefit}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Rental Plans */}
                            <div className="space-y-6">
                                {/* Security Deposit */}
                                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-cyan-50/50'}`}>
                                    <p className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Security deposit of ৳{selectedProduct.securityDeposit} will be 100% refundable
                                    </p>
                                </div>

                                {/* Step 1: Choose Monthly Usage */}
                                <div>
                                    <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        Step 1: Choose Monthly Usage
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {selectedProduct.usagePlans.map((plan) => (
                                            <button
                                                key={plan.id}
                                                onClick={() => setSelectedPlan(plan)}
                                                className={`p-4 rounded-lg border-2 transition-all ${selectedPlan.id === plan.id
                                                    ? `border-cyan-500 ${theme === 'dark' ? 'bg-cyan-900/30' : 'bg-cyan-50'}`
                                                    : `border-transparent ${theme === 'dark' ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-white/50 hover:bg-white/70'}`
                                                    }`}
                                            >
                                                <div className="flex flex-col items-center space-y-2">
                                                    <Droplet className={`w-8 h-8 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} />
                                                    <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                        {plan.name}
                                                    </span>
                                                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {plan.description}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Step 2: Choose Tenure */}
                                <div>
                                    <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        Step 2: Choose Tenure
                                    </h4>
                                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-cyan-50/50'}`}>
                                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {selectedProduct.lockInPeriod}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                                        {selectedProduct.tenureOptions.map((tenure) => (
                                            <button
                                                key={tenure.id}
                                                onClick={() => setSelectedTenure(tenure)}
                                                className={`p-4 rounded-lg border-2 transition-all ${selectedTenure.id === tenure.id
                                                    ? `border-cyan-500 ${theme === 'dark' ? 'bg-cyan-900/30' : 'bg-cyan-50'}`
                                                    : `border-transparent ${theme === 'dark' ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-white/50 hover:bg-white/70'}`
                                                    }`}
                                            >
                                                <div className="text-center">
                                                    <Calendar className={`w-5 h-5 mx-auto mb-2 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} />
                                                    <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                        {tenure.name}
                                                    </div>
                                                    <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                        ৳{tenure.price}/month
                                                    </div>
                                                    {tenure.discount > 0 && (
                                                        <div className="flex flex-col items-center mt-2">
                                                            <span className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                                                                {tenure.discount}% discount
                                                            </span>
                                                            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                                Savings of ৳{tenure.savings}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* City Selection */}
                                <div>
                                    <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        Select Your City
                                    </h4>
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowCityDropdown(!showCityDropdown)}
                                            className={`w-full p-3 rounded-lg flex items-center justify-between ${theme === 'dark'
                                                ? 'bg-gray-700/50 text-gray-200 hover:bg-gray-700/70'
                                                : 'bg-white/70 text-gray-800 hover:bg-white/90'
                                                } transition-colors border ${theme === 'dark' ? 'border-gray-600' : 'border-cyan-200'}`}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <MapPin className="w-5 h-5 text-cyan-500" />
                                                <span>{selectedCity}</span>
                                            </div>
                                            <ChevronDown className={`w-5 h-5 transition-transform ${showCityDropdown ? 'rotate-180' : ''}`} />
                                        </button>

                                        <AnimatePresence>
                                            {showCityDropdown && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className={`absolute z-10 w-full mt-2 rounded-lg shadow-xl overflow-hidden ${theme === 'dark'
                                                        ? 'bg-gray-800/90 backdrop-blur-lg border border-gray-700'
                                                        : 'bg-white/90 backdrop-blur-lg border border-cyan-200'
                                                        } max-h-60 overflow-y-auto`}
                                                >
                                                    {cities.map((city) => (
                                                        <button
                                                            key={city}
                                                            onClick={() => {
                                                                setSelectedCity(city);
                                                                setShowCityDropdown(false);
                                                            }}
                                                            className={`w-full p-3 text-left hover:bg-cyan-500/10 transition-colors ${theme === 'dark'
                                                                ? 'text-gray-200 hover:text-white'
                                                                : 'text-gray-800 hover:text-cyan-700'
                                                                } ${selectedCity === city ? (theme === 'dark' ? 'bg-gray-700' : 'bg-cyan-50') : ''}`}
                                                        >
                                                            {city}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors ${theme === 'dark'
                                    ? 'bg-gray-700/50 hover:bg-gray-700/70 text-gray-200'
                                    : 'bg-white/50 hover:bg-white/70 text-gray-800'
                                    } border ${theme === 'dark' ? 'border-gray-600' : 'border-cyan-200'}`}
                            >
                                Know more
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`px-6 py-3 rounded-lg font-medium text-white transition-colors bg-gradient-to-r ${theme === 'dark'
                                        ? 'from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500'
                                        : 'from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500'
                                    } shadow-lg flex items-center justify-center space-x-2`}
                            >
                                <span>Subscribe Now</span>
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}