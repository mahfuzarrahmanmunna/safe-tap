'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { FaHandPointer, FaCalendarCheck, FaUserCheck, FaRupeeSign, FaTools, FaMobileAlt } from "react-icons/fa";
import { useTheme } from '../contexts/ThemeContext';

export default function HowItWorks() {
  const { theme } = useTheme(); // 'light' or 'dark'

  const steps = [
    { icon: <FaHandPointer className="text-2xl" />, title: "Choose the product that suits you the best" },
    { icon: <FaCalendarCheck className="text-2xl" />, title: "Book the Perfect Plan for You" },
    { icon: <FaUserCheck className="text-2xl" />, title: "Submit your details" },
    { icon: <FaRupeeSign className="text-2xl" />, title: "Make the Payment" },
    { icon: <FaTools className="text-2xl" />, title: "Get SafeTap Installed in 48 hours!" },
    { icon: <FaMobileAlt className="text-2xl" />, title: "Connect your device to SafeTap app" },
  ];

  const phoneSlides = [
    "https://cdn.drinkprime.in/production/images/smartwater-subscription/smartwater-subscription.webp",
    "https://cdn.drinkprime.in/production/images/smartwater-subscription/smartwater-subscription.webp",
    "https://cdn.drinkprime.in/production/images/smartwater-subscription/smartwater-subscription.webp",
  ];

  return (
    <div className={`max-w-8xl mx-auto px-6 py-16 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className={`text-3xl md:text-5xl font-bold ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}>
          <span className={theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'}>
            The SafeTap App:
          </span>{' '}
          Behold The Future of Water <span className='leading-22'>Purification</span>
        </h2>
        <p className={`text-lg mt-4 max-w-3xl mx-auto ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Track your water consumption, generate your personalised water quality report, and monitor your filter health using our innovative app. Recharging your device and raising service requests has never been easier.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT: How It Works Steps */}
        <div className={`rounded-3xl mt-6 p-8 lg:p-12 shadow-xl border ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-300'
        }`}>
          <h3 className={`text-3xl font-bold mb-10 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
          }`}>How it works</h3>

          <div className="space-y-10">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-6 relative">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                  theme === 'dark' ? 'bg-cyan-900/50' : 'bg-cyan-100'
                }`}>
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-cyan-400'
                      : 'bg-white text-cyan-700'
                  }`}>
                    {step.icon}
                  </div>
                </div>

                <div className="pt-1">
                  <p className={`text-lg ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <span className={`font-bold ${
                      theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'
                    }`}>Step {index + 1}:</span> {step.title}
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

        {/* RIGHT: Phone Slider */}
        <div className="relative -mt-8">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{ prevEl: '.phone-prev', nextEl: '.phone-next' }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="mySwiper"
          >
            {phoneSlides.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="flex justify-center">
                  <div className="relative">
                    {/* Cyan glowing frame */}
                    <div className={`rounded-2xl p-3 lg:p-4 ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-cyan-600 to-cyan-800'
                        : 'bg-gradient-to-br from-cyan-500 to-cyan-700'
                    }`}>
                      <div className={`rounded-3xl overflow-hidden shadow-xl ${
                        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                      }`}>
                        <Image
                          src={src}
                          alt={`DrinkPrime App Screenshot ${i + 1}`}
                          width={400}
                          height={600}
                          className="w-full h-auto"
                          priority={i === 0}
                        />
                      </div>
                    </div>

                    {/* Floating App Label */}
                    <div className={`absolute -top-4 -right-2 px-6 py-3 rounded-full shadow-xl font-bold text-lg ${
                      theme === 'dark'
                        ? 'bg-cyan-600 text-white'
                        : 'bg-cyan-700 text-white'
                    }`}>
                     SafeTap App
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <div className={`phone-prev absolute left-4 top-2/5 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition ${
            theme === 'dark'
              ? 'bg-gray-800/90 hover:bg-gray-700 text-cyan-400'
              : 'bg-white/90 hover:bg-white text-cyan-700'
          }`}>
            <span className="text-2xl">←</span>
          </div>
          <div className={`phone-next absolute right-4 top-2/5 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition ${
            theme === 'dark'
              ? 'bg-gray-800/90 hover:bg-gray-700 text-cyan-400'
              : 'bg-white/90 hover:bg-white text-cyan-700'
          }`}>
            <span className="text-2xl">→</span>
          </div>

          {/* App Store Badges */}
          <div className="flex justify-center gap-12 items-center ml-12 -mt-6 flex-wrap">
            <Image
              src="https://i.ibb.co/5WbNnDzc/images-removebg-preview.png"
              alt="Get it on Google Play"
              width={190}
              height={178}
              className="object-contain hover:scale-105 transition-transform duration-300"
            />
            <Image
              src="https://i.ibb.co/tMGdzwqt/available-on-the-app-store-badge-logo-png-seeklogo-288615-removebg-preview.png"
              alt="Download on the App Store"
              width={190}
              height={178}
              className="-ml-12 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}