'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { FaHandPointer, FaCalendarCheck, FaUserCheck, FaRupeeSign, FaTools, FaMobileAlt } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    { icon: <FaHandPointer className="text-2xl" />, title: "Choose the product that suits you the best" },
    { icon: <FaCalendarCheck className="text-2xl" />, title: "Book the Perfect Plan for You" },
    { icon: <FaUserCheck className="text-2xl" />, title: "Submit your details" },
    { icon: <FaRupeeSign className="text-2xl" />, title: "Make the Payment" },
    { icon: <FaTools className="text-2xl" />, title: "Get DrinkPrime Installed in 48 hours!" },
    { icon: <FaMobileAlt className="text-2xl" />, title: "Connect your device to DrinkPrime app" },
  ];

  // Slider images (add more if you want auto-slide)
  const phoneSlides = [
    "https://cdn.drinkprime.in/production/images/smartwater-subscription/smartwater-subscription.webp",
    "https://cdn.drinkprime.in/production/images/smartwater-subscription/smartwater-subscription.webp",
    "https://cdn.drinkprime.in/production/images/smartwater-subscription/smartwater-subscription.webp",
    // Add more screenshots here
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold">
          <span className="text-cyan-700">The DrinkPrime App:</span> Behold The Future of Water <span className='leading-22'>Purification</span>
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          Track your water consumption, generate your personalised water quality report, and monitor your filter health using our innovative app. Recharging your device and raising service requests has never been easier.
        </p>
      </div>

      {/* Main Grid: Left = Steps, Right = Phone Slider */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT: How It Works Steps */}
        <div className="bg-white border border-gray-300 rounded-3xl mt-6 p-8 lg:p-12 shadow-xl ">
          <h3 className="text-3xl font-bold text-gray-800 mb-10">How it works</h3>

          <div className="space-y-10">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-6 relative">
                <div className="w-14 h-14 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                  <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md text-cyan-700">
                    {step.icon}
                  </div>
                </div>

                <div className="pt-1">
                  <p className="text-lg text-gray-700">
                    <span className="font-bold text-cyan-700">Step {index + 1}:</span> {step.title}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="absolute left-7 top-16 w-0.5 h-24 bg-cyan-200"></div>
                )}
              </div>
            ))}
          </div>

          <button className="mt-12 w-full bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xl py-5 rounded-full transition shadow-lg">
            Subscribe Now
          </button>
        </div>

        {/* RIGHT: Beautiful Phone Slider (HelpDesk Style) */}
        <div className="relative -mt-78" >
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: '.phone-prev',
              nextEl: '.phone-next',
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="mySwiper"
          >
            {phoneSlides.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="flex justify-center ">
                  <div className="relative ">
                    {/* Cyan glowing frame */}
                    <div className="bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-2xl p-3 lg:p-4 ">
                      <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
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
                    <div className="absolute -top-4 -right-2 bg-cyan-700 text-white px-6 py-3 rounded-full shadow-xl font-bold text-lg">
                      DrinkPrime App
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <div className="phone-prev absolute left-4 top-2/5 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer transition">
            <span className="text-2xl text-cyan-700">←</span>
          </div>
          <div className="phone-next absolute right-4 top-2/5 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer transition">
            <span className="text-2xl text-cyan-700">→</span>
          </div>

          {/* App Store Badges Below Phone */}
          <div className="flex justify-center items-center ml-12 -mt-6 flex-wrap">
  <Image
    src="https://i.ibb.co/hb2m9cN/images.png"
    alt="Get it on Google Play"
    width={160}
    height={48}
    className="h-[178px] w-[190px] object-contain hover:scale-105 transition-transform duration-300"
  />

  <Image
    src="https://i.ibb.co/YFc8rXh9/available-on-the-app-store-badge-logo-png-seeklogo-288615.png"
    alt="Download on the App Store"
    width={160}
    height={48}
    className="h-[148px] w-[260px] -ml-12 object-contain hover:scale-105 transition-transform duration-300"
  />
</div>
        </div>
      </div>
    </div>
  );
}