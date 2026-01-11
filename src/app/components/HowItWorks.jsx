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

  useEffect(() => {
    setMounted(true);
  }, []);

  const steps = [
    { icon: <FaHandPointer className="text-2xl" />, title: "Choose the product that suits you the best" },
    { icon: <FaCalendarCheck className="text-2xl" />, title: "Book the Perfect Plan for You" },
    { icon: <FaUserCheck className="text-2xl" />, title: "Submit your details" },
    { icon: <FaRupeeSign className="text-2xl" />, title: "Make the Payment" },
    { icon: <FaTools className="text-2xl" />, title: "Get SafeTap Installed in 48 hours!" },
    { icon: <FaMobileAlt className="text-2xl" />, title: "Connect your device to SafeTap app" },
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
    <div className={`max-w-8xl mx-auto px-6 py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      
      <div className="text-center mb-16">
        <h2 className={`text-3xl md:text-5xl font-black ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
          <span className="text-cyan-500">The SafeTap App:</span> Behold The Future
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div className={`rounded-3xl mt-6 p-8 lg:p-12 shadow-xl border ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
        }`}>

          <h3 className={`text-3xl font-bold mb-10 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
            How it works
          </h3>

          <div className="space-y-10">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-6 relative">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                  theme === 'dark' ? 'bg-cyan-900/50' : 'bg-cyan-100'
                }`}>
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md ${
                    theme === 'dark' ? 'bg-gray-800 text-cyan-400' : 'bg-white text-cyan-700'
                  }`}>
                    {step.icon}
                  </div>
                </div>

                <div className="pt-1">
                  <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className={`font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'}`}>
                      Step {index + 1}:
                    </span> {step.title}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className={`absolute left-7 top-16 w-0.5 h-24 ${
                    theme === 'dark' ? 'bg-cyan-900/50' : 'bg-cyan-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <button className={`mt-12 w-full font-bold text-xl py-5 rounded-full transition shadow-lg ${
            theme === 'dark'
              ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
              : 'bg-cyan-700 hover:bg-cyan-800 text-white'
          }`}>
            Subscribe Now
          </button>
        </div>

        {/* RIGHT SLIDER */}
        <div className="relative group px-12">

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
                  <div className="relative mx-auto `max-w-105`aspect-[4/5] bg-cyan-600 rounded-[3rem] p-8 flex flex-col text-white shadow-2xl overflow-hidden">
                    <div className="mb-8">
                      <h4 className="text-3xl font-bold mb-2">{slide.title}</h4>
                      <p className="text-xl opacity-90">{slide.subtitle}</p>
                    </div>

                    <div className="mt-auto w-full h-[75%] bg-white rounded-t-[2.5rem] p-6 shadow-inner border-x-8 border-t-8 border-slate-900">
                      <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />

                      <div className="space-y-6 text-slate-800">
                        <div className="flex justify-between border-b pb-4"><span className="font-bold">Report an Issue</span><span>›</span></div>
                        <div className="flex justify-between border-b pb-4"><span className="font-bold">Track My Tickets</span><span>›</span></div>
                        <div className="flex justify-between border-b pb-4"><span className="font-bold">FAQ</span><span>›</span></div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* NAV BUTTONS */}
          <button
            ref={prevRef}
            className="absolute left-0 top-2/5 -translate-y-1/2 w-14 h-14 rounded-full bg-cyan-700 text-white flex items-center justify-center shadow-xl hover:bg-cyan-800 transition-all z-20"
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            ref={nextRef}
            className="absolute right-0 top-2/5 -translate-y-1/2 w-14 h-14 rounded-full bg-cyan-700 text-white flex items-center justify-center shadow-xl hover:bg-cyan-800  transition-all z-20"
          >
            <FaChevronRight size={20} />
          </button>

          {/* STORE BUTTONS */}
          {/* <div className="flex justify-center gap-4 mt-10">
            <Image 
              src="https://i.ibb.co/5WbNnDzc/images-removebg-preview.png" 
              alt="Play Store" width={160} height={50}
            />
            <Image 
              src="https://i.ibb.co/tMGdzwqt/available-on-the-app-store-badge-logo-png-seeklogo-288615-removebg-preview.png" 
              alt="App Store" width={160} height={50}
            />
          </div> */}

        </div>
      </div>
    </div>
  );
}
