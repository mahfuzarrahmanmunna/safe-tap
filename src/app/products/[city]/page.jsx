// // app/products/[city]/page.jsx
// 'use client';

// import { useState } from 'react';
// import { useParams } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { 
//   MapPin, Droplet, Shield, Users, Star, Check, 
//   Clock, Wifi, Zap, Award, Package, Calendar,
//   ChevronRight, Phone, Mail, MessageSquare, Play,
//   ThumbsUp, Battery, Filter, Thermometer, Wrench,
//   Smartphone, Truck, Heart, Trophy, Coffee,
//   ArrowRight, ChevronDown
// } from 'lucide-react';
// import { useTheme } from '@/app/contexts/ThemeContext';

// // City-specific data
// const cityData = {
//   dhaka: {
//     name: 'Dhaka',
//     description: 'Experience smart water purification with advanced RO+UV Copper technology',
//     tagline: 'Pure Copper-Infused Water for Your Family',
//     contact: '+880 1919 222 222',
//     email: 'dhaka@safetapbd.com',
//     stats: {
//       users: '8,000+',
//       rating: '4.8',
//       ratingsCount: '4,880',
//       installationTime: '48 hours',
//       trialDays: '7 days'
//     }
//   },
//   chattogram: {
//     name: 'Chattogram',
//     description: 'Port city with specialized water treatment solutions',
//     tagline: 'Industrial & Residential Water Solutions',
//     contact: '+880 1919 333 333',
//     email: 'chattogram@safetapbd.com',
//     stats: {
//       users: '5,000+',
//       rating: '4.7',
//       ratingsCount: '2,500',
//       installationTime: '72 hours',
//       trialDays: '7 days'
//     }
//   },
// };

// // Products for Dhaka
// const dhakaProducts = [
//   {
//     id: 'copper',
//     name: 'SafeTap Copper',
//     tag: 'Best Seller',
//     description: 'RO+UV Water Purifier with Copper Benefits',
//     features: [
//       'Copper-infused healthy water',
//       'RO + UV + Copper Filtration',
//       'IoT Enabled Smart Features',
//       '15 LPH Purification Capacity',
//       '5-Stage Purification System'
//     ],
//     plans: [
//       { name: 'COUPLE', liters: '200 ltrs/m', price: '৳417/month', discount: '22%', savings: '৳249', duration: '90 days' },
//       { name: 'FAMILY', liters: '500 ltrs/m', price: '৳699/month', discount: '25%', savings: '৳349', duration: '180 days' },
//       { name: 'UNLIMITED', liters: 'Unltd ltrs/m', price: '৳999/month', discount: '30%', savings: '৳499', duration: '360 days' }
//     ],
//     highlights: [
//       'Lifetime Free Maintenance',
//       '7 Days Risk-Free Trial',
//       '48-hour Installation',
//       'Free Relocation'
//     ],
//     specifications: [
//       { icon: Filter, title: 'Particle Remover', desc: 'Removes sand, dust, dirt, and turbidity' },
//       { icon: Droplet, title: 'Chlorine & Odour Remover', desc: 'Removes unpleasant odours and bad tastes' },
//       { icon: Shield, title: 'High Rejection RO', desc: 'Blocks heavy metals and excess TDS' },
//       { icon: Award, title: 'Mineral Enhancer', desc: 'Retains essential calcium and magnesium' },
//       { icon: Coffee, title: 'Copper Infusion', desc: 'Imparts health benefits of copper' },
//       { icon: Zap, title: 'Ultra Violet', desc: 'Eliminates bacteria, viruses, and cysts' }
//     ],
//     images: [
//       '/copper-purifier-1.jpg',
//       '/copper-purifier-2.jpg',
//       '/copper-purifier-3.jpg'
//     ]
//   },
//   {
//     id: 'ro-plus',
//     name: 'SafeTap RO+',
//     description: 'RO with Essential Minerals Added',
//     features: [
//       'Essential minerals retention',
//       'pH Balanced water',
//       'Smart monitoring',
//       '12 LPH capacity'
//     ],
//     plans: [
//       { name: 'BASIC', liters: '150 ltrs/m', price: '৳299/month', discount: '20%', savings: '৳179', duration: '90 days' }
//     ]
//   },
//   {
//     id: 'alkaline',
//     name: 'SafeTap Alkaline',
//     description: 'Balanced pH Alkaline Water',
//     features: [
//       'pH balanced water',
//       'Antioxidant rich',
//       'Better hydration',
//       '10 LPH capacity'
//     ],
//     plans: [
//       { name: 'BASIC', liters: '150 ltrs/m', price: '৳349/month', discount: '18%', savings: '৳209', duration: '90 days' }
//     ]
//   }
// ];

// // Reviews Data
// const reviews = [
//   { name: 'Richa Sharma', rating: 5, comment: 'Good service! They have the option for relocation as well. Have been using for close to 3 years now.' },
//   { name: 'Shubham Singh', rating: 5, comment: 'Overall experience was good in terms of delivery to installation, delivered next day and installed same day.' },
//   { name: 'Sampath Meda', rating: 5, comment: 'Excellent purifier, improves family health and wellness, easy WiFi connectivity.' },
//   { name: 'Sridhar Kulkarni', rating: 5, comment: 'Good Product and Installation was really fast and smooth. Quality Test done in front of us.' },
//   { name: 'Pratik Dasgupta', rating: 5, comment: 'Never thought it would be so easy to get a good purifier on rent. Service is prompt within 12 hours.' }
// ];

// // FAQ Data
// const faqs = [
//   { question: 'Why is subscribing better than buying?', answer: 'Subscription includes lifetime maintenance, free filter changes, and no upfront cost.' },
//   { question: 'Can I modify my subscription plan later?', answer: 'Yes, you can upgrade or downgrade your plan anytime through the app.' },
//   { question: 'How does SafeTap ensure prompt service in Dhaka?', answer: 'We have dedicated service teams across Dhaka with 48-hour service guarantee.' },
//   { question: 'Are there additional charges for installation?', answer: 'No, installation, delivery, and filter changes are completely free.' }
// ];

// export default function CityPage() {
//   const params = useParams();
//   const { theme } = useTheme();
//   const [selectedProduct, setSelectedProduct] = useState('copper');
//   const [selectedPlan, setSelectedPlan] = useState(0);
//   const [activeTab, setActiveTab] = useState('overview');
  
//   // Get city from params
//   const citySlug = params.city?.toLowerCase() || 'dhaka';
//   const cityInfo = cityData[citySlug] || cityData.dhaka;
//   const product = dhakaProducts.find(p => p.id === selectedProduct) || dhakaProducts[0];

//   return (
//     <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
//       {/* Hero Section */}
//       <div className={`bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-900 via-gray-800 to-gray-900' : 'from-cyan-600 via-cyan-500 to-cyan-700'} text-white`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               className="md:w-1/2"
//             >
//               <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mb-6">
//                 <MapPin className="w-5 h-5 mr-2" />
//                 <span className="text-sm font-medium">Serving {cityInfo.name}</span>
//               </div>
              
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
//                 Pure Copper Water<br />
//                 <span className="text-cyan-200">For Your Home</span>
//               </h1>
              
//               <p className="text-xl opacity-90 mb-8 max-w-2xl">
//                 {cityInfo.description}
//               </p>
              
//               <div className="flex flex-wrap gap-4 mb-8">
//                 <div className="flex items-center space-x-2">
//                   <Users className="w-5 h-5 text-cyan-300" />
//                   <span className="font-semibold">{cityInfo.stats.users} users</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
//                   <span className="font-semibold">{cityInfo.stats.rating} ({cityInfo.stats.ratingsCount} ratings)</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Clock className="w-5 h-5 text-cyan-300" />
//                   <span className="font-semibold">{cityInfo.stats.installationTime} installation</span>
//                 </div>
//               </div>
              
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button className={`px-8 py-4 bg-white text-cyan-700 font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 ${theme === 'dark' ? 'shadow-lg' : 'shadow-xl'}`}>
//                   <span>Start {cityInfo.stats.trialDays}-Day Free Trial</span>
//                   <ArrowRight className="w-5 h-5" />
//                 </button>
//                 <button className={`px-8 py-4 border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm`}>
//                   View All Plans
//                 </button>
//               </div>
//             </motion.div>
            
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="md:w-1/2 relative"
//             >
//               <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/10'} backdrop-blur-lg p-8 border ${theme === 'dark' ? 'border-gray-700' : 'border-white/20'}`}>
//                 <div className="flex items-center justify-between mb-6">
//                   <div>
//                     <h3 className="text-2xl font-bold">SafeTap Copper</h3>
//                     <p className="text-cyan-200">Best RO+UV Copper Water Purifier</p>
//                   </div>
//                   <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
//                     <span className="text-yellow-300 font-bold">Best Seller</span>
//                   </div>
//                 </div>
                
//                 {/* Plan Selection */}
//                 <div className="mb-6">
//                   <h4 className="font-semibold mb-3">Step 1: Choose Monthly Usage</h4>
//                   <div className="grid grid-cols-3 gap-2">
//                     {product.plans.map((plan, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setSelectedPlan(index)}
//                         className={`p-3 rounded-lg border transition-all ${selectedPlan === index 
//                           ? 'border-cyan-400 bg-cyan-400/10' 
//                           : 'border-white/20 hover:border-white/40'}`}
//                       >
//                         <div className="font-bold">{plan.name}</div>
//                         <div className="text-sm opacity-80">{plan.liters}</div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
                
//                 {/* Selected Plan Details */}
//                 <div className={`rounded-xl ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-white/10'} p-6 mb-6`}>
//                   <div className="flex justify-between items-center mb-4">
//                     <div>
//                       <div className="text-2xl font-bold">{product.plans[selectedPlan].price}</div>
//                       <div className="text-sm opacity-80">{product.plans[selectedPlan].duration} tenure</div>
//                     </div>
//                     <div className="text-right">
//                       <div className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-sm">
//                         Save {product.plans[selectedPlan].savings}
//                       </div>
//                       <div className="text-sm line-through opacity-60 mt-1">
//                         ৳{parseInt(product.plans[selectedPlan].price.replace('৳', '').replace('/month', '')) + parseInt(product.plans[selectedPlan].savings.replace('৳', ''))}/month
//                       </div>
//                     </div>
//                   </div>
                  
//                   <button className={`w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all ${theme === 'dark' ? 'shadow-lg' : 'shadow-xl'}`}>
//                     Try It Free for {cityInfo.stats.trialDays} Days
//                   </button>
//                 </div>
                
//                 {/* Highlights */}
//                 <div className="grid grid-cols-2 gap-3">
//                   {product.highlights?.map((highlight, index) => (
//                     <div key={index} className="flex items-center space-x-2 text-sm">
//                       <Check className="w-4 h-4 text-green-400" />
//                       <span>{highlight}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* Product Tabs */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
//         <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
//           <div className="flex overflow-x-auto border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}">
//             {['copper', 'ro-plus', 'alkaline'].map((productId) => {
//               const prod = dhakaProducts.find(p => p.id === productId);
//               return (
//                 <button
//                   key={productId}
//                   onClick={() => setSelectedProduct(productId)}
//                   className={`flex-1 min-w-[200px] px-6 py-4 font-semibold transition-colors ${selectedProduct === productId 
//                     ? `text-white ${theme === 'dark' ? 'bg-cyan-700' : 'bg-cyan-600'}`
//                     : `${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}`}
//                 >
//                   {prod?.name}
//                 </button>
//               );
//             })}
//           </div>
          
//           {/* Product Content */}
//           <div className="p-8">
//             {/* Tabs Navigation */}
//             <div className="flex space-x-1 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} mb-8">
//               {['overview', 'features', 'specifications', 'reviews', 'faq'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-4 py-2 font-medium capitalize ${activeTab === tab 
//                     ? `border-b-2 ${theme === 'dark' ? 'border-cyan-400 text-cyan-400' : 'border-cyan-600 text-cyan-600'}`
//                     : `${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
            
//             {/* Tab Content */}
//             {activeTab === 'overview' && (
//               <div className="grid md:grid-cols-2 gap-8">
//                 <div>
//                   <h3 className="text-2xl font-bold mb-4">Why Choose SafeTap Copper in {cityInfo.name}?</h3>
//                   <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
//                     SafeTap Copper is an RO+UV Water Purifier with the added Goodness of Copper. 
//                     This IoT enabled smart purifier is the best Copper water purifier for your home in {cityInfo.name}.
//                   </p>
                  
//                   <div className="space-y-4">
//                     {[
//                       '15 LPH Purification capacity for copper water purifier',
//                       '24*7 Safe and Pure 5 Multistage Copper Water Purification System',
//                       'Powerful In-line UV Copper Filtration',
//                       'Best Wall/Counter Mount Copper Water Purification'
//                     ].map((feature, index) => (
//                       <div key={index} className="flex items-start space-x-3">
//                         <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                         <span className={theme === 'dark' ? 'text-gray-300' : ''}>{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div>
//                   <div className={`rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-cyan-50'} p-6`}>
//                     <h4 className="font-bold text-lg mb-4">IoT Enabled Smart Features</h4>
//                     <div className="grid grid-cols-2 gap-4">
//                       {[
//                         { icon: Smartphone, title: 'App Control', desc: 'Monitor from smartphone' },
//                         { icon: Wifi, title: 'WiFi Connected', desc: 'Real-time updates' },
//                         { icon: Battery, title: 'Filter Health', desc: 'Track filter status' },
//                         { icon: Thermometer, title: 'Water Quality', desc: 'Quality monitoring' },
//                       ].map((feature, index) => (
//                         <div key={index} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-white'}`}>
//                           <feature.icon className="w-8 h-8 text-cyan-500 mb-2" />
//                           <div className="font-semibold">{feature.title}</div>
//                           <div className="text-sm opacity-75">{feature.desc}</div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {activeTab === 'features' && (
//               <div className="space-y-6">
//                 <h3 className="text-2xl font-bold mb-6">Advanced Features</h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {product.specifications?.map((spec, index) => (
//                     <div key={index} className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
//                       <spec.icon className="w-10 h-10 text-cyan-500 mb-4" />
//                       <h4 className="font-bold text-lg mb-2">{spec.title}</h4>
//                       <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{spec.desc}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             {activeTab === 'reviews' && (
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-2xl font-bold">Customer Reviews</h3>
//                   <div className="flex items-center space-x-2">
//                     <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
//                     <span className="font-bold text-xl">{cityInfo.stats.rating}</span>
//                     <span className="opacity-75">({cityInfo.stats.ratingsCount} ratings)</span>
//                   </div>
//                 </div>
                
//                 <div className="grid md:grid-cols-2 gap-6">
//                   {reviews.map((review, index) => (
//                     <div key={index} className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
//                       <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center space-x-2">
//                           <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
//                             <Users className="w-5 h-5 text-cyan-500" />
//                           </div>
//                           <div>
//                             <div className="font-semibold">{review.name}</div>
//                             <div className="flex">
//                               {[...Array(5)].map((_, i) => (
//                                 <Star key={i} className="w-4 h-4 text-yellow-500" fill={i < review.rating ? "currentColor" : "none"} />
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                         <MessageSquare className="w-5 h-5 opacity-50" />
//                       </div>
//                       <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{review.comment}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             {activeTab === 'faq' && (
//               <div className="space-y-4">
//                 <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
//                 {faqs.map((faq, index) => (
//                   <div key={index} className={`border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}>
//                     <button className={`w-full text-left p-4 font-semibold ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} transition-colors flex justify-between items-center`}>
//                       <span>{faq.question}</span>
//                       <ChevronDown className="w-5 h-5 opacity-50" />
//                     </button>
//                     <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
//                       {faq.answer}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Benefits Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <h2 className="text-3xl font-bold text-center mb-12">The SafeTap Advantage</h2>
//         <div className="grid md:grid-cols-4 gap-6">
//           {[
//             { icon: Wrench, title: 'FREE Maintenance', desc: 'Lifetime free maintenance and filter changes' },
//             { icon: Calendar, title: '7-Day Trial', desc: 'Try risk-free for 7 days' },
//             { icon: Clock, title: '48-Hour Setup', desc: 'Quick installation within 48 hours' },
//             { icon: Truck, title: 'FREE Relocation', desc: 'Free relocation when you move' },
//           ].map((benefit, index) => (
//             <div key={index} className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} text-center`}>
//               <benefit.icon className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
//               <h4 className="font-bold text-lg mb-2">{benefit.title}</h4>
//               <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{benefit.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-cyan-50'} py-16`}>
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold mb-6">Ready for Pure Copper Water?</h2>
//           <p className={`text-xl mb-8 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
//             Join {cityInfo.stats.users}+ happy families in {cityInfo.name} enjoying pure, healthy water
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className={`px-8 py-4 ${theme === 'dark' ? 'bg-cyan-600 hover:bg-cyan-500' : 'bg-cyan-600 hover:bg-cyan-700'} text-white font-bold rounded-lg transition-colors flex items-center justify-center space-x-2`}>
//               <Phone className="w-5 h-5" />
//               <span>Call {cityInfo.contact}</span>
//             </button>
//             <button className={`px-8 py-4 border-2 ${theme === 'dark' ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-cyan-600 text-cyan-600 hover:bg-cyan-50'} font-bold rounded-lg transition-colors`}>
//               Book Free Water Test
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// app/products/[city]/page.jsx
// app/products/[city]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Droplet, Shield, Users, Star, Check, 
  Clock, Wifi, Zap, ArrowLeft, ArrowRight,
  ChevronRight, Phone, Mail, MessageSquare,
  Battery, Filter, Thermometer
} from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';


const citySliders = {
  dhaka: {
    name: 'Dhaka',
    slides: [
      {
        id: 1,
        title: 'Powerful In-line UV',
        subtitle: 'High powered 7W LED UV Lamp',
        description: 'Better efficiency in eliminating bacteria through advanced UV filtration',
        image: '/images/dhaka-slide-1.jpg', 
        color: 'from-cyan-600 to-blue-700'
      },
      {
        id: 2,
        title: 'Copper Infused Water',
        subtitle: 'Natural Copper Benefits',
        description: 'Enhances digestion and improves immunity with copper-infused water',
        image: '/images/dhaka-slide-2.jpg',
        color: 'from-amber-600 to-orange-700'
      },
      {
        id: 3,
        title: 'Smart IoT Features',
        subtitle: 'WiFi Connected Monitoring',
        description: 'Real-time water quality tracking through mobile app',
        image: '/images/dhaka-slide-3.jpg',
        color: 'from-emerald-600 to-green-700'
      },
      {
        id: 4,
        title: '5-Stage Filtration',
        subtitle: 'Advanced Purification System',
        description: 'Complete removal of impurities with 5-stage filtration process',
        image: '/images/dhaka-slide-4.jpg',
        color: 'from-purple-600 to-indigo-700'
      }
    ],
    stats: {
      users: '8,000+',
      rating: '4.8',
      installations: '25,000+'
    }
  },
  chattogram: {
    name: 'Chattogram',
    slides: [
      {
        id: 1,
        title: 'Industrial Grade Filtration',
        subtitle: 'For Port City Water',
        description: 'Specialized filtration for Chattogram\'s unique water conditions',
        image: '/images/chattogram-slide-1.jpg',
        color: 'from-blue-600 to-cyan-700'
      },
      {
        id: 2,
        title: 'High Capacity Purification',
        subtitle: '20 LPH Output',
        description: 'Large capacity purification for industrial and residential use',
        image: '/images/chattogram-slide-2.jpg',
        color: 'from-teal-600 to-emerald-700'
      },
      {
        id: 3,
        title: 'Salt Water Protection',
        subtitle: 'Coastal Area Special',
        description: 'Extra protection against salt and mineral content in water',
        image: '/images/chattogram-slide-3.jpg',
        color: 'from-sky-600 to-blue-700'
      }
    ],
    stats: {
      users: '5,000+',
      rating: '4.7',
      installations: '15,000+'
    }
  },

  khulna: {
    name: 'Khulna',
    slides: [
      {
        id: 1,
        title: 'Agricultural Area Special',
        subtitle: 'Pesticide Removal',
        description: 'Advanced filtration for agricultural area water conditions',
        image: '/images/khulna-slide-1.jpg',
        color: 'from-green-600 to-emerald-700'
      }
    ],
    stats: {
      users: '3,000+',
      rating: '4.6',
      installations: '10,000+'
    }
  }
};

//  products data
const demoProducts = {
  dhaka: [
    {
      name: 'SafeTap Copper',
      price: '৳417/month',
      features: ['Copper Infused', 'RO+UV', 'IoT Smart', '15 LPH', 'Free Installation'],
      description: 'Best RO+UV Copper Water Purifier with IoT features'
    },
    {
      name: 'SafeTap RO+',
      price: '৳349/month',
      features: ['Mineral Added', 'RO Technology', 'Smart Monitoring'],
      description: 'RO with Essential Minerals'
    },
    {
      name: 'SafeTap Alkaline',
      price: '৳399/month',
      features: ['pH Balanced', 'Alkaline Water', 'Better Hydration'],
      description: 'Balanced pH Alkaline Water'
    }
  ],
  chattogram: [
    {
      name: 'SafeTap Copper',
      price: '৳427/month',
      features: ['Copper Infused', 'RO+UV', 'Port City Special'],
      description: 'Port city special RO+UV Copper Purifier'
    },
    {
      name: 'SafeTap Industrial',
      price: '৳799/month',
      features: ['High Capacity', 'Industrial Grade', 'Salt Protection'],
      description: 'Industrial grade purification for Chattogram'
    }
  ]
};

// Image Slider Component
const CitySlider = ({ slides, cityName }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto slide change
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div 
      className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].color} opacity-90`} />
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Text Content */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white"
                >
                  <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm mb-6">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{cityName}</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    {slides[currentSlide].title}
                  </h1>
                  
                  <div className="text-2xl md:text-3xl font-semibold text-white/90 mb-4">
                    {slides[currentSlide].subtitle}
                  </div>
                  
                  <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
                    {slides[currentSlide].description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2">
                      <span>Book Free Demo</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button className="px-6 py-3 border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                      View Plans
                    </button>
                  </div>
                </motion.div>
                
                {/* Stats Card */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="hidden md:block"
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-6">SafeTap in {cityName}</h3>
                    
                    <div className="space-y-6">
                      {citySliders[cityName.toLowerCase()]?.stats && Object.entries(citySliders[cityName.toLowerCase()].stats).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {key === 'users' && <Users className="w-5 h-5 text-cyan-300" />}
                            {key === 'rating' && <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />}
                            {key === 'installations' && <Droplet className="w-5 h-5 text-green-300" />}
                            <span className="text-white/80 capitalize">{key}</span>
                          </div>
                          <span className="text-2xl font-bold text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-white/20">
                      <div className="flex items-center space-x-2 text-white/80">
                        <Check className="w-5 h-5 text-green-400" />
                        <span>48-hour installation in {cityName}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
      >
        <ArrowRight className="w-6 h-6 text-white" />
      </button>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Slide Counter */}
      <div className="absolute bottom-6 right-6 text-white/70 text-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default function CityPage() {
  const params = useParams();
  const { theme } = useTheme();
  
  const citySlug = params.city?.toLowerCase() || 'dhaka';
  const cityName = citySliders[citySlug]?.name || 'Dhaka';
  const slides = citySliders[citySlug]?.slides || citySliders.dhaka.slides;
  const products = demoProducts[citySlug] || demoProducts.dhaka;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Slider Section */}
      <section className="relative">
        <CitySlider slides={slides} cityName={cityName} />
        
        {/* Floating Stats - Mobile */}
        <div className={`md:hidden ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-lg -mt-12 mx-4 rounded-2xl shadow-xl p-6 relative z-10`}>
          <h3 className="text-xl font-bold mb-4">SafeTap in {cityName}</h3>
          <div className="grid grid-cols-3 gap-4">
            {citySliders[citySlug]?.stats && Object.entries(citySliders[citySlug].stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-2xl font-bold text-cyan-600">{value}</div>
                <div className="text-sm text-gray-600 capitalize">{key}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Available in <span className="text-cyan-600">{cityName}</span>
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Choose the perfect water purifier for your {cityName} home
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
            >
              {/* Product Header */}
              <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-cyan-50'}`}>
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {product.description}
                </p>
              </div>
              
              {/* Price */}
              <div className="p-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}">
                <div className="text-4xl font-bold text-cyan-600 mb-1">
                  {product.price}
                </div>
                <div className="text-sm text-gray-500">Starting price</div>
              </div>
              
              {/* Features */}
              <div className="p-6">
                <h4 className="font-bold mb-4">Key Features</h4>
                <div className="space-y-3">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className={theme === 'dark' ? 'text-gray-300' : ''}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="p-6 pt-0">
                <button className={`w-full py-3 ${theme === 'dark' ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-cyan-600 hover:bg-cyan-700'} text-white font-bold rounded-lg transition-colors`}>
                  Get Quote for {cityName}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-cyan-50'}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Need Help Choosing in {cityName}?
          </h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Our water experts in {cityName} are ready to assist you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`tel:${citySliders[citySlug]?.stats ? '+8801919222222' : ''}`}
              className={`px-8 py-4 ${theme === 'dark' ? 'bg-cyan-600 hover:bg-cyan-500' : 'bg-cyan-600 hover:bg-cyan-700'} text-white font-bold rounded-lg transition-colors flex items-center justify-center space-x-2`}
            >
              <Phone className="w-5 h-5" />
              <span>Call Our {cityName} Team</span>
            </a>
            <button className={`px-8 py-4 border-2 ${theme === 'dark' ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-cyan-600 text-cyan-600 hover:bg-cyan-50'} font-bold rounded-lg transition-colors`}>
              Book Free Water Test
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}