"use client";
import React, { useState, useEffect } from 'react';
import { useTheme } from "@/app/contexts/ThemeContext";
import { FaStar, FaInfoCircle, FaThLarge } from "react-icons/fa";
import UsageModal from '../UsageModal';
import Image from 'next/image';
import BookingModal from './BookingModal';

const pricingData = {
  "Couple- 200 ltrs/m": { "28 days": 529, "90 days": 499, "360 days": 417, savings: 150 },
  "Family- 500 ltrs/m": { "28 days": 749, "90 days": 699, "360 days": 583, savings: 249 },
  "Unlimited- Unltd ltrs/m": { "28 days": 999, "90 days": 899, "360 days": 749, savings: 450 },
};

function PricingCard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usage, setUsage] = useState("Family- 500 ltrs/m");
  const [tenure, setTenure] = useState("360 days");
  const [currentPrice, setCurrentPrice] = useState(583);
  const [currentSavings, setCurrentSavings] = useState(249);
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  
  useEffect(() => {
    const price = pricingData[usage][tenure];
    setCurrentPrice(price);
    setCurrentSavings(pricingData[usage].savings + (tenure === "360 days" ? 100 : 0));
  }, [usage, tenure]);

  return (
    <div className="hidden lg:block sticky top-24 right-0 w-[360px] h-fit z-40">
      <div className={`overflow-hidden rounded-[2rem] border transition-all duration-500
        ${isDark ? 'bg-slate-900 border-slate-800 shadow-2xl' : 'bg-white border-cyan-100 shadow-xl shadow-cyan-100/50'}`}>
        
        {/* Header - Compact height */}
        <div className={`p-5 bg-gradient-to-br ${isDark ? 'from-cyan-950/20 to-transparent' : 'from-cyan-50/50 to-transparent'}`}>
          <h2 className="text-xl font-black text-cyan-600 mb-0.5 tracking-tight">SafeTap Copper</h2>
          <p className={`text-xs font-bold leading-tight mb-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Best RO+UV Copper Water Purifier On Rent
          </p>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="flex -space-x-1.5">
              {[1,2,3].map(i => (
                <div key={i} className="w-5 h-5 rounded-full border border-white bg-slate-300 overflow-hidden shadow-sm">
                  <Image width={20} height={20} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                </div>
              ))}
            </div>
            <p className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <span className="text-cyan-600">8000+</span> users joined
            </p>
            <div className="flex items-center gap-0.5 text-orange-500 font-bold text-[10px] ml-auto">
              <FaStar /> 4.8
            </div>
          </div>
        </div>

        <hr className={isDark ? 'border-slate-800' : 'border-cyan-50'} />

        {/* Step 1:  */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className={`text-[11px] font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>1. Usage</h3>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1 text-[9px] font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full hover:bg-cyan-100 transition-colors">
              <FaThLarge size={8} /> Guide
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {Object.keys(pricingData).map((item, i) => (
              <button
                key={i}
                onClick={() => setUsage(item)}
                className={`py-2 px-3 rounded-lg text-[10px] font-bold border-2 text-left transition-all
                  ${usage === item 
                    ? 'border-cyan-500 bg-cyan-500 text-white shadow-md' 
                    : isDark ? 'border-slate-800 bg-slate-800/40 text-slate-400' : 'border-slate-50 bg-slate-50 text-slate-600 hover:border-cyan-200'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2:  */}
        <div className="px-4 pb-4">
          <h3 className={`text-[11px] font-black uppercase tracking-wider mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>2. Tenure</h3>
          <div className="flex gap-1.5">
            {["28 days", "90 days", "360 days"].map((item) => (
              <button
                key={item}
                onClick={() => setTenure(item)}
                className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all
                  ${tenure === item 
                    ? 'border-cyan-600 bg-cyan-50 text-cyan-600' 
                    : isDark ? 'border-slate-800 bg-slate-700/30 text-slate-400' : 'border-slate-100 bg-white text-slate-500'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Area */}
        <div className="px-4 pb-4 flex justify-between items-center">
          <div>
            <p className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter mb-1">7-days FREE TRIAL</p>
            <div className="flex items-baseline gap-1">
               <span className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>৳{currentPrice}</span>
               <span className="text-slate-400 font-bold text-[10px]">/mo</span>
            </div>
          </div>
          
          <div className="bg-lime-50 px-3 py-2 rounded-xl border border-lime-100 text-right">
             <p className="text-[8px] font-bold text-lime-600 uppercase">Save</p>
             <p className="text-xs font-black text-lime-700">৳{currentSavings}</p>
          </div>
        </div>

        {/* CTA Button */}
        <button onClick={() => setIsBookingOpen(true)} className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-black text-lg transition-all active:scale-95 shadow-inner">
            Try It Free
        </button>

      </div>

      <UsageModal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSelect={(planType) => {
          if(planType === "Couple") setUsage("Couple- 200 ltrs/m");
          if(planType === "Family") setUsage("Family- 500 ltrs/m");
          if(planType === "Unlimited") setUsage("Unlimited- Unltd ltrs/m");
        }}
      />

      {/* Booking Form Modal */}
      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedPlan={`${usage} for ${tenure}`}
      />
    </div>
  );
}

export default PricingCard;