"use client";

import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import { PlayCircleIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../contexts/ThemeContext";

// --- Data ---
const testimonialsData = [
  { name: "Shyamanta Baruah", designation: "IT Professional - Bangalore", quote: "It's just something that you fit and forget. You fit the device, you subscribe to a plan and that's it.", videoTitle: "SafeTap IS TOO GOOD TO BE TRUE" },
  { name: "Varsha", designation: "IT Professional - Bangalore", quote: "We faced throat issues with corporation water, but after switching there are no health issues.", videoTitle: "DRINKING CAUVERY WATER? WATCH THIS!" },
  { name: "Bhanu Prasanna", designation: "Bangalore", quote: "In Bangalore I never felt my drinking water was safe. I started noticing like water flowing in different steps.", videoTitle: "BEST FOR B'LORE WATER!" },
  { name: "Sujit", designation: "Hyderabad", quote: "Quality is super consistent and their service is almost instant.", videoTitle: "WHY I REFER EVERYONE!" },
];

// --- Testimonial Card Component ---
const TestimonialCard = ({ data, theme }) => (
  
  <div className={`group relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden h-full flex flex-col border-b-4 border-cyan-500 ${
    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
  }`}>
    
    {/* Video Placeholder Section */}
    <div className="relative h-48 bg-gradient-to-br from-cyan-900 to-black overflow-hidden">
      <div className={`absolute inset-0 flex flex-col items-center justify-center text-white transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-black bg-opacity-70 group-hover:bg-opacity-80' 
          : 'bg-black bg-opacity-50 group-hover:bg-opacity-60'
      }`}>
        <PlayCircleIcon className="w-16 h-16 opacity-90 group-hover:scale-110 transition-transform" />
        <p className="mt-3 text-sm font-bold tracking-wider text-center px-4">{data.videoTitle}</p>
      </div>
    </div>

    {/* Quote and Details Section */}
    <div className="p-6 flex-1 flex flex-col">
      <blockquote className={`text-sm italic leading-relaxed border-l-4 border-cyan-500 pl-4 mb-5 ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {data.quote}
      </blockquote>

      <div className="mt-auto">
        <p className={`font-bold text-lg ${
          theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'
        }`}>{data.name}</p>
        <p className={`text-xs mt-1 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>{data.designation}</p>
      </div>
    </div>
  </div>
);

// --- Main Community Section Component ---
export default function CommunitySection() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);
  const { theme } = useTheme(); // 'light' or 'dark'
const [showActions, setShowActions] = useState(true);
  // Auto slide with reset
  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        if (swiperRef.current.isEnd) {
          swiperRef.current.slideTo(0);
        } else {
          swiperRef.current.slideNext();
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`py-12 px-4 ${
      theme === 'dark'
        ? 'bg-gray-900'
        : 'bg-gradient-to-b from-gray-50 to-white'
    }`}>
    
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* LEFT TEXT SECTION */}
        <div className="lg:col-span-1 flex flex-col justify-center">
          <h2 className={`text-4xl lg:text-4xl font-extrabold leading-tight ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            A Thriving Community Of Over{" "}
            <span className={theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}>
              1 Million
            </span>
          </h2>
          <p className={`mt-6 text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            1 in 3 new SafeTap users join us via referral. Happy customers
            understand the impact of pure drinking water.
          </p>
        </div>

        {/* SWIPER SECTION */}
        <div className="lg:col-span-3 relative">
          <Swiper
            spaceBetween={30}
            centeredSlides={false}
            slidesPerView={3}
            loop={false}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsBeginning(true);
              setIsEnd(testimonialsData.length <= 3);
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            pagination={{ clickable: true, el: ".custom-pagination" }}
            navigation={{ prevEl: ".custom-prev", nextEl: ".custom-next" }}
            modules={[Pagination, Navigation]}
            className="pb-16"
            breakpoints={{
              0: { slidesPerView: 1, centeredSlides: true, spaceBetween: 10 },
              640: { slidesPerView: 1.3, centeredSlides: false, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
          >
            {testimonialsData.map((item, idx) => (
              <SwiperSlide key={idx}>
                <TestimonialCard data={item} theme={theme} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* PREV BUTTON */}
          <button
            className={`custom-prev absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full shadow-2xl border flex items-center justify-center transition-all duration-300 hover:bg-cyan-600 hover:border-cyan-600 hover:scale-110 ${
              isBeginning ? "opacity-30 cursor-not-allowed" : "opacity-90"
            } ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
            disabled={isBeginning}
          >
            <ChevronLeftIcon className={`w-8 h-8 transition-colors ${
              theme === 'dark' ? 'text-cyan-400 hover:text-white' : 'text-cyan-700 hover:text-white'
            }`} />
          </button>

          {/* NEXT BUTTON */}
          <button
            className={`custom-next absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full shadow-2xl border flex items-center justify-center transition-all duration-300 hover:bg-cyan-600 hover:border-cyan-600 hover:scale-110 ${
              isEnd ? "opacity-30 cursor-not-allowed" : "opacity-90"
            } ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
            disabled={isEnd}
          >
            <ChevronRightIcon className={`w-8 h-8 transition-colors ${
              theme === 'dark' ? 'text-cyan-400 hover:text-white' : 'text-cyan-700 hover:text-white'
            }`} />
          </button>

          {/* PAGINATION */}
          <div className="custom-pagination absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-10" />
        </div>
      </div>

      
     {/* FIXED BOTTOM BUTTONS */}
{showActions && (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3 px-6">

    <div className="flex gap-4">
      <button
        className={`font-bold py-3 px-8 rounded-full shadow-lg transition border-2 ${
          theme === 'dark'
            ? 'bg-gray-800 text-cyan-400 border-cyan-600 hover:bg-cyan-900/40'
            : 'bg-white text-cyan-600 border-cyan-600 hover:bg-cyan-50'
        }`}
      >
        View Products
      </button>

      <button className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-700 shadow-lg transition">
        Book Now
      </button>
    </div>

    {/* CLOSE BUTTON */}
 <button
  onClick={() => setShowActions(false)}
  className={`
    mt-1 px-6 py-2 rounded-xl
    backdrop-blur-md bg-white/20
    border border-white/30
    shadow-lg
    text-lg font-semibold
    transition-all duration-300
    cursor-pointer
    hover:scale-105 hover:shadow-xl
    active:scale-95
    ${
      theme === 'dark'
        ? 'text-gray-200 hover:bg-red-500/20 hover:border-red-400/40'
        : 'text-gray-700 hover:bg-red-100/60 hover:border-red-300'
    }
  `}
>
  Close
</button>

  </div>
)}
    </div>
  );
}