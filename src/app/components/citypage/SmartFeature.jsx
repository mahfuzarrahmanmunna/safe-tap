"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { useTheme } from "@/app/contexts/ThemeContext";

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const smartFeatures = [
  {
    title: "Real-time TDS Monitoring",
    desc: "Track your water purity levels instantly from your smartphone.",
    img: "https://i.ibb.co.com/TDdxzZBS/image.png",
  },
  {
    title: "Filter Life Alert",
    desc: "Get automated notifications when it's time to replace your filters.",
    img: "https://i.ibb.co.com/7dcY1gxR/image.png",
  },
  {
    title: "Smart Leakage Detection",
    desc: "AI-powered sensors detect internal leaks and shut off supply.",
    img: "https://i.ibb.co.com/rf5jkMbD/image.png",
  },
  {
    title: "Usage Analytics",
    desc: "Monitor daily and weekly water consumption patterns.",
    img: "https://i.ibb.co.com/FkrRGJwC/4-copper-alive-product-features-production.webp",
  },
  {
    title: "UV Sterilization Control",
    desc: "Control UV disinfection cycles directly from your app.",
    img: "https://i.ibb.co.com/1tYzyT2n/Multistage-Purification-production.webp",
  }
];

function SmartFeature() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`py-16 transition-all duration-700 overflow-hidden ${isDark ? 'bg-[#020617]' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Area */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-black mb-4 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            IOT Enabled <span className="text-cyan-500">Smart Features</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Experience the future of water purification with our connected ecosystem.
          </p>
        </div>

        {/* The Trending Slider */}
        <div className="relative py-10">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'} 
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full !pb-20"
          >
            {smartFeatures.map((feature, index) => (
              <SwiperSlide 
                key={index} 
                style={{ width: '350px' }} 
                className="group select-none"
              >
                {/* Main Card Design */}
                <div className={`relative h-[450px] rounded-[3rem] p-8 transition-all duration-500 border
                  ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}
                  group-[.swiper-slide-active]:scale-110 group-[.swiper-slide-active]:shadow-[0_20px_50px_rgba(6,182,212,0.2)]
                  group-[.swiper-slide-active]:border-cyan-500/50`}>
                  
                  {/* Cyan Floating Circle in background */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl opacity-0 group-[.swiper-slide-active]:opacity-100 transition-opacity duration-1000"></div>

                  <div className="h-full flex flex-col justify-between items-center relative z-10 text-center">
                    {/* Feature Image */}
                    <div className="w-full h-48 flex justify-center items-center p-4">
                      <img
                        src={feature.img}
                        alt={feature.title}
                        className="max-h-full object-contain transform group-hover:scale-110 transition-transform duration-500 drop-shadow-xl"
                      />
                    </div>

                    {/* Feature Info */}
                    <div className="space-y-4">
                      <h3 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {feature.desc}
                      </p>
                    </div>

                    {/* Learn More Action */}
                    <button className="mt-4 w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center text-cyan-500 hover:bg-cyan-500 hover:text-white transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom CSS for Active Swiper Pagination */}
          <style jsx global>{`
            .swiper-pagination-bullet {
              background: ${isDark ? '#334155' : '#cbd5e1'} !important;
              width: 10px;
              height: 10px;
              opacity: 1;
              transition: all 0.3s ease;
            }
            .swiper-pagination-bullet-active {
              background: #06b6d4 !important;
              width: 30px !important;
              border-radius: 5px;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

export default SmartFeature;