"use client";

import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Importing icons from @heroicons/react/24/solid
import { PlayCircleIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

// --- Data ---
const testimonialsData = [
  { name: "Shyamanta Baruah", designation: "IT Professional - Bangalore", quote: "It's just something that you fit and forget. You fit the device, you subscribe to a plan and that's it.", videoTitle: "SafeTap IS TOO GOOD TO BE TRUE" },
  { name: "Varsha", designation: "IT Professional - Bangalore", quote: "We faced throat issues with corporation water, but after switching there are no health issues.", videoTitle: "DRINKING CAUVERY WATER? WATCH THIS!" },
  { name: "Bhanu Prasanna", designation: "Bangalore", quote: "In Bangalore I never felt my drinking water was safe. I started noticing like water flowing in different steps.", videoTitle: "BEST FOR B'LORE WATER!" },
  { name: "Sujit", designation: "Hyderabad", quote: "Quality is super consistent and their service is almost instant.", videoTitle: "WHY I REFER EVERYONE!" },
];

// --- Testimonial Card Component ---
const TestimonialCard = ({ data }) => (
  <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden h-full flex flex-col border-b-4 border-cyan-500 ">
    
    {/* Video Placeholder Section */}
    <div className="relative h-48 bg-gradient-to-br from-cyan-900 to-black overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white group-hover:bg-opacity-60 transition">
        <PlayCircleIcon className="w-16 h-16 opacity-90 group-hover:scale-110 transition-transform" />
        <p className="mt-3 text-sm font-bold tracking-wider text-center px-4">{data.videoTitle}</p>
      </div>
    </div>

    {/* Quote and Details Section */}
    <div className="p-6 flex-1 flex flex-col">
      <blockquote className="text-gray-600 text-sm italic leading-relaxed border-l-4 border-cyan-500 pl-4 mb-5">
        {data.quote}
      </blockquote>

      <div className="mt-auto">
        <p className="font-bold text-lg text-cyan-700">{data.name}</p>
        <p className="text-xs text-gray-500 mt-1">{data.designation}</p>
      </div>
    </div>
  </div>
);

// --- Main Community Section Component ---
export default function CommunitySection() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

  // Autoplay manually since loop is false
  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        if (swiperRef.current.isEnd) {
          swiperRef.current.slideTo(0);
        } else {
          swiperRef.current.slideNext();
        }
      }
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-12 px-4 bg-linear-to-b from-gray-50 to-white">
    
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-10">

        {/* LEFT TEXT SECTION (1/4 columns on large screens) */}
        <div className="lg:col-span-1 flex flex-col justify-center">
          <h2 className="text-4xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
            A Thriving Community Of Over{" "}
            <span className="text-cyan-600">1 Million</span>
          </h2>
          <p className="text-gray-700 mb-6 text-sm">
            1 in 3 new SafeTap users join us via referral. Happy customers understand the impact of pure drinking water.
          </p>

        </div>

        {/* SWIPER SECTION (3/4 columns on large screens) */}
        <div className="lg:col-span-3 relative">
          <Swiper
            spaceBetween={30}
            centeredSlides={false} // Keeping centeredSlides false for standard flow on desktop
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
            // Custom Navigation and Pagination setup
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              bulletClass: "custom-bullet",
              bulletActiveClass: "custom-bullet-active",
            }}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            modules={[Pagination, Navigation]}
            className="pb-16"
            // Responsive settings
            breakpoints={{
              0: { slidesPerView: 1, centeredSlides: true, spaceBetween: 10 },
              640: { slidesPerView: 1.3, centeredSlides: false, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
          >
            {testimonialsData.map((item, idx) => (
              <SwiperSlide key={idx} className="px-0"> {/* Removed px-2 on slide */}
                <TestimonialCard data={item} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* PREV BUTTON (Adjusted left positioning for gap removal) */}
          <button
            className={`custom-prev absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white shadow-2xl border border-gray-200 flex items-center justify-center transition-all duration-300 hover:bg-cyan-600 hover:border-cyan-600 hover:scale-110 ${
              isBeginning ? "opacity-30 cursor-not-allowed" : "opacity-90"
            }`}
            disabled={isBeginning}
          >
            <ChevronLeftIcon className="w-8 h-8 text-cyan-700 hover:text-white transition-colors" />
          </button>

          {/* NEXT BUTTON (Adjusted right positioning) */}
          <button
            className={`custom-next absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white shadow-2xl border border-gray-200 flex items-center justify-center transition-all duration-300 hover:bg-cyan-600 hover:border-cyan-600 hover:scale-110 ${
              isEnd ? "opacity-30 cursor-not-allowed" : "opacity-90"
            }`}
            disabled={isEnd}
          >
            <ChevronRightIcon className="w-8 h-8 text-cyan-700 hover:text-white transition-colors" />
          </button>

          {/* PAGINATION */}
          <div className="custom-pagination absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-10" />
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-7xl px-4 flex justify-center space-x-4 shadow-2xl bg-white  ">
        <button className="text-cyan-600 border font-bold py-2 px-5 rounded-full hover:bg-cyan-50">
          View Products
        </button>
        <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-5 rounded-full">
          Book Now
        </button>
      </div>
    </div>
  );
}