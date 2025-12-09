"use client";

import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { PlayCircleIcon } from "@heroicons/react/24/solid";

const testimonialsData = [
  { name: "Shyamanta Baruah", designation: "IT Professional - Bangalore", quote: "It's just something that you fit and forget. You fit the device, you subscribe to a plan and that's it.", videoTitle: "DRINKPRIME IS TOO GOOD TO BE TRUE" },
  { name: "Varsha", designation: "IT Professional - Bangalore", quote: "We faced throat issues with corporation water, but after switching there are no health issues.", videoTitle: "DRINKING CAUVERY WATER? WATCH THIS!" },
  { name: "Bhanu Prasanna", designation: "Bangalore", quote: "In Bangalore I never felt my drinking water was safe. I started noticing like water flowing in different steps.", videoTitle: "BEST FOR B'LORE WATER!" },
  { name: "Sujit", designation: "Hyderabad", quote: "Quality is super consistent and their service is almost instant.", videoTitle: "WHY I REFER EVERYONE!" },
];

const TestimonialCard = ({ data }) => (
  <div className="flex flex-col bg-white p-4 border-b-4 border-t-4 border-cyan-500 shadow-lg rounded-lg hover:shadow-xl transition h-full">
    <div className="relative mb-4 rounded-md overflow-hidden w-full h-40 bg-gray-900">
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
        <PlayCircleIcon className="w-10 h-10 opacity-90 cursor-pointer" />
        <p className="text-xs font-semibold mt-1 text-center">{data.videoTitle}</p>
      </div>
    </div>
    <blockquote className="text-gray-600 text-sm italic border-l-4 border-gray-300 pl-3 mb-3">"{data.quote}"</blockquote>
    <div className="mt-auto pt-3 border-t">
      <p className="font-bold text-base text-cyan-700">{data.name}</p>
      <p className="text-xs text-gray-500">{data.designation}</p>
    </div>
  </div>
);

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
    <div className="min-h-screen p-8 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* LEFT AREA */}
        <div className="lg:col-span-1 p-6">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
            A Thriving Community Of Over <span className="text-cyan-600">1 Million</span>
          </h2>
          <p className="text-gray-700 mb-6 text-sm">
            1 in 3 new DrinkPrime users join us via referral. Happy customers understand the impact of pure drinking water.
          </p>
         
        </div>

        {/* RIGHT AREA — SWIPER */}
        <div className="lg:col-span-3 relative">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            slidesPerView={3}
            loop={false}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
              disabledClass: "opacity-30 cursor-not-allowed",
            }}
            modules={[Pagination, Navigation]}
            className="pb-12"
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 1.3 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonialsData.map((item, idx) => (
              <SwiperSlide key={idx}>
                <TestimonialCard data={item} />
              </SwiperSlide>
            ))}

            {/* Custom arrows */}
            <div className={`swiper-button-prev absolute top-1/2 -left-4 transform -translate-y-1/2 text-cyan-600 ${isBeginning ? "opacity-30 cursor-not-allowed" : ""}`}></div>
            <div className={`swiper-button-next absolute top-1/2 -right-4 transform -translate-y-1/2 text-cyan-600 ${isEnd ? "opacity-30 cursor-not-allowed" : ""}`}></div>
          </Swiper>
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
