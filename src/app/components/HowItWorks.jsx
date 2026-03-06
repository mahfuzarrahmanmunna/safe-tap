'use client';

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { 
  FaHandPointer, 
  FaCalendarCheck, 
  FaUserCheck, 
  FaRupeeSign, 
  FaTools, 
  FaMobileAlt, 
  FaChevronLeft, 
  FaChevronRight 
} from "react-icons/fa";
import { useTheme } from '../contexts/ThemeContext';

export default function HowItWorks() {
  const { theme } = useTheme();

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const steps = [
    { icon: <FaHandPointer className="text-xl md:text-2xl" />, title: "Choose the product that suits you the best" },
    { icon: <FaCalendarCheck className="text-xl md:text-2xl" />, title: "Book the Perfect Plan for You" },
    { icon: <FaUserCheck className="text-xl md:text-2xl" />, title: "Submit your details" },
    { icon: <FaRupeeSign className="text-xl md:text-2xl" />, title: "Make the Payment" },
    { icon: <FaTools className="text-xl md:text-2xl" />, title: "Get SafeTap Installed in 48 hours!" },
    { icon: <FaMobileAlt className="text-xl md:text-2xl" />, title: "Connect your device to SafeTap app" },
  ];

  const phoneSlides = [
    {
      title: "Helpdesk",
      subtitle: "Request a Free Service",
    },
    {
      title: "Monitor",
      subtitle: "Track Your Consumption",
    }
  ];

  return (
    <div className={`w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-white'
    }`}>
      
      {/* Header */}
      <div className="text-center mb-10 md:mb-12 lg:mb-16 max-w-4xl mx-auto">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black px-2 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}>
          <span className="text-cyan-500">The SafeTap App:</span>{" "}
          <span className="block sm:inline">Behold The Future</span>
        </h2>
      </div>

      {/* Main Grid */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto">
        
        {/* LEFT SIDE - Steps */}
        <div className={`order-2 lg:order-1 rounded-2xl md:rounded-3xl p-6 sm:p-8 lg:p-10 xl:p-12 shadow-xl border ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
        }`}>
          
          <h3 className={`text-2xl md:text-3xl font-bold mb-6 md:mb-8 lg:mb-10 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
          }`}>
            How it works
          </h3>

          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 sm:gap-5 md:gap-6 relative">
                {/* Step Icon */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                  theme === 'dark' ? 'bg-cyan-900/50' : 'bg-cyan-100'
                }`}>
                  <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-md ${
                    theme === 'dark' ? 'bg-gray-800 text-cyan-400' : 'bg-white text-cyan-700'
                  }`}>
                    {step.icon}
                  </div>
                </div>

                {/* Step Text */}
                <div className="pt-0.5 sm:pt-1 flex-1">
                  <p className={`text-sm sm:text-base md:text-lg ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <span className={`font-bold ${
                      theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'
                    }`}>
                      Step {index + 1}:
                    </span>{" "}
                    <span className="text-sm sm:text-base md:text-lg">{step.title}</span>
                  </p>
                </div>

                {/* Connecting Line - Hide on mobile/tablet if too many steps */}
                {index < steps.length - 1 && !isMobile && (
                  <div className={`absolute left-6 sm:left-7 top-12 sm:top-14 w-0.5 h-16 sm:h-20 md:h-24 ${
                    theme === 'dark' ? 'bg-cyan-900/50' : 'bg-cyan-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className={`w-full mt-8 md:mt-10 lg:mt-12 font-bold text-base sm:text-lg md:text-xl py-3 sm:py-4 md:py-5 rounded-full transition shadow-lg ${
            theme === 'dark'
              ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
              : 'bg-cyan-700 hover:bg-cyan-800 text-white'
          }`}>
            Subscribe Now
          </button>
        </div>

        {/* RIGHT SIDE - Slider */}
        <div className="order-1 lg:order-2 relative group px-4 sm:px-8 md:px-10 lg:px-12">
          
          {/* Phone Slider */}
          {mounted && (
            <Swiper
              modules={[Navigation, Autoplay]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              className="overflow-visible"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;

                setTimeout(() => {
                  if (prevRef.current && nextRef.current) {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;

                    swiper.navigation.destroy();
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }
                });
              }}
            >
              {phoneSlides.map((slide, i) => (
                <SwiperSlide key={i}>
                  <div className="relative mx-auto max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[420px] aspect-[4/5] bg-cyan-600 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-4 sm:p-6 md:p-8 flex flex-col text-white shadow-2xl overflow-hidden">
                    
                    {/* Phone Header */}
                    <div className="mb-4 sm:mb-6 md:mb-8">
                      <h4 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{slide.title}</h4>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90">{slide.subtitle}</p>
                    </div>

                    {/* Phone Screen Content */}
                    <div className="mt-auto w-full h-[70%] sm:h-[72%] md:h-[75%] bg-white rounded-t-[1.5rem] sm:rounded-t-[2rem] md:rounded-t-[2.5rem] p-4 sm:p-5 md:p-6 shadow-inner border-x-4 sm:border-x-6 md:border-x-8 border-t-4 sm:border-t-6 md:border-t-8 border-slate-900">
                      
                      {/* Dynamic Island */}
                      <div className="w-8 sm:w-10 md:w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4 sm:mb-5 md:mb-6" />

                      {/* Menu Items */}
                      <div className="space-y-3 sm:space-y-4 md:space-y-6 text-slate-800">
                        <div className="flex justify-between border-b pb-2 sm:pb-3 md:pb-4">
                          <span className="font-bold text-xs sm:text-sm md:text-base">Report an Issue</span>
                          <span className="text-sm md:text-base">›</span>
                        </div>
                        <div className="flex justify-between border-b pb-2 sm:pb-3 md:pb-4">
                          <span className="font-bold text-xs sm:text-sm md:text-base">Track My Tickets</span>
                          <span className="text-sm md:text-base">›</span>
                        </div>
                        <div className="flex justify-between border-b pb-2 sm:pb-3 md:pb-4">
                          <span className="font-bold text-xs sm:text-sm md:text-base">FAQ</span>
                          <span className="text-sm md:text-base">›</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Navigation Buttons - Hide on mobile, show on tablet and up */}
          <button
            ref={prevRef}
            className="hidden sm:flex absolute -left-2 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-cyan-700 text-white items-center justify-center shadow-xl hover:bg-cyan-800 transition-all z-20"
          >
            <FaChevronLeft size={isMobile ? 16 : 20} />
          </button>

          <button
            ref={nextRef}
            className="hidden sm:flex absolute -right-2 md:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-cyan-700 text-white items-center justify-center shadow-xl hover:bg-cyan-800 transition-all z-20"
          >
            <FaChevronRight size={isMobile ? 16 : 20} />
          </button>

          {/* Pagination Dots (Mobile) */}
          {/* <div className="flex sm:hidden justify-center gap-2 mt-6">
            {phoneSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => swiperRef.current?.slideTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  swiperRef.current?.realIndex === index 
                    ? 'w-6 bg-cyan-600' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div> */}

          {/* Store Badges - Optional, commented as in original */}
          {/* <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6 md:mt-8 lg:mt-10">
            <Image 
              src="https://i.ibb.co/5WbNnDzc/images-removebg-preview.png" 
              alt="Play Store" 
              width={140} 
              height={45}
              className="w-[120px] sm:w-[140px] md:w-[160px] h-auto"
            />
            <Image 
              src="https://i.ibb.co/tMGdzwqt/available-on-the-app-store-badge-logo-png-seeklogo-288615-removebg-preview.png" 
              alt="App Store" 
              width={140} 
              height={45}
              className="w-[120px] sm:w-[140px] md:w-[160px] h-auto"
            />
          </div> */}

        </div>
      </div>
    </div>
  );
}