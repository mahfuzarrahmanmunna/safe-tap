'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Quote, Star } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
  {
    text: 'The service provided by the team is excellent – responsive, helpful, and swift. The device is a practical and efficient alternative to buying cans daily.',
    brand: 'FreshMenu',
    meta: 'Gourmet Food Delivery',
    rating: 5,
  },
  {
    text: 'The devices are dependable and have reduced our reliance on unhygienic water cans. Water quality has been consistently excellent.',
    brand: 'Orchids International',
    meta: 'CBSE & ICSE Schools',
    rating: 5,
  },
  {
    text: 'Team helpfulness is outstanding – 10/10! Devices are perfect for co-living businesses. The team is extremely responsive.',
    brand: 'Helloworld',
    meta: 'Student Hostels',
    rating: 5,
  },
  {
    text: 'The team resolves issues promptly. We expanded with five new machines, and installations happened within hours. Invaluable support.',
    brand: 'Obeya Smart Work',
    meta: 'Premier Co-workspaces',
    rating: 5,
  },
];

export default function Testimonial() {
  const { theme } = useTheme(); // 'light' or 'dark'

  return (
    <section className={`py-24 px-6 overflow-hidden ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-[#f8fafc]'
    }`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            What our <span className={theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'}>Partners</span> have to say
          </h2>
          <p className={`mt-4 text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Our happy partners understand the impact of pure drinking water on
            the health and wellness of the entire community.
          </p>
        </motion.div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16 !overflow-visible"
        >
          {testimonials.map((item, i) => (
            <SwiperSlide key={i} className="h-full">
              <motion.div
                whileHover={{ y: -10 }}
                className={`
                  rounded-[2rem] p-8 flex flex-col h-full relative
                  shadow-xl transition-all duration-300
                  border
                  ${theme === 'dark'
                    ? 'bg-gray-800/90 border-gray-700 shadow-cyan-900/30'
                    : 'bg-white border-slate-100 shadow-slate-200/50'
                  }
                `}
              >
                {/* Quote Icon Background */}
                <Quote className={`absolute top-6 right-8 w-16 h-16 -z-0 ${
                  theme === 'dark' ? 'text-cyan-900/40' : 'text-cyan-50'
                }`} />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-yellow-400 text-yellow-400 drop-shadow-md"
                      />
                    ))}
                  </div>

                  {/* Feedback Text */}
                  <p className={`text-lg leading-relaxed italic mb-8 flex-grow ${
                    theme === 'dark' ? 'text-gray-200' : 'text-slate-700'
                  }`}>
                    {item.text}
                  </p>

                  {/* Divider */}
                  <div className={`h-[1px] w-full mb-6 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-slate-100'
                  }`} />

                  {/* Author / Brand Info */}
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg
                      ${theme === 'dark'
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-700'
                        : 'bg-gradient-to-br from-cyan-500 to-blue-600'
                      }
                    `}>
                      {item.brand.charAt(0)}
                    </div>
                    <div>
                      <h4 className={`font-bold leading-none mb-1 ${
                        theme === 'dark' ? 'text-gray-100' : 'text-slate-900'
                      }`}>
                        {item.brand}
                      </h4>
                      <p className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
                      }`}>
                        {item.meta}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Styles for Swiper Bullets */}
        <style jsx global>{`
          .swiper-pagination-bullet {
            background: ${theme === 'dark' ? '#374151' : '#cbd5e1'} !important;
            opacity: 1 !important;
          }
          .swiper-pagination-bullet-active {
            background: #0891b2 !important;
            width: 24px !important;
            border-radius: 5px !important;
          }
        `}</style>
      </div>
    </section>
  );
}