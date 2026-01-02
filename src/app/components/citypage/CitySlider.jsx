// app/components/city-page/CitySlider.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, ChevronRight, ArrowLeft, ArrowRight, 
  Check, Users, Star, Droplet 
} from 'lucide-react';

export default function CitySlider({ slides, cityName, stats, theme }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => { 
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div 
      className="relative  md:h-[600px] overflow-hidden min-h-screen"
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
          {/* Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].color} opacity-90`} />
          
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
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
                  
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {slides[currentSlide].title}
                  </h1>
                  
                  <div className="text-2xl font-semibold text-white/90 mb-4">
                    {slides[currentSlide].subtitle}
                  </div>
                  
                  <p className="text-lg text-white/80 mb-8 max-w-xl">
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
                      {stats && Object.entries(stats).map(([key, value]) => (
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
      
      {/* Navigation */}
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
      
      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
      
      <div className="absolute bottom-6 right-6 text-white/70 text-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
}