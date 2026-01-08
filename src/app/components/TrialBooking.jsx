"use client";
import React, { useState } from 'react';
import { useTheme } from "@/app/contexts/ThemeContext";
import { FaCity, FaShieldAlt, FaArrowRight } from "react-icons/fa";
import BookingModal from './citypage/BookingModal';

const cities = [
  "Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", 
  "Barishal", "Rangpur", "Mymensingh", "Gazipur", "Narayanganj", "Cumilla"
];

function TrialBooking() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedCity, setSelectedCity] = useState("");
  
 
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const googleMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(selectedCity || "Bangladesh")}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

 
  const handleBooking = () => {
    if (!selectedCity) {
      alert("Please select a city first!");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <section className={`py-24 relative overflow-hidden transition-all duration-700 ${isDark ? 'bg-[#020617]' : 'bg-slate-50'}`}>
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        <div className="space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-sm font-bold uppercase tracking-widest">
            <FaShieldAlt className="animate-pulse" /> Limited Time Offer
          </div>
          <h2 className={`text-3xl md:text-4xl font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Start Your <span className="text-cyan-500">7-Day Risk-Free</span> Trial
          </h2>
        </div>

        {/* Card containing Map and Form */}
        <div className={`rounded-[3rem] border transition-all duration-500 overflow-hidden
          ${isDark ? 'bg-slate-900/60 border-slate-800 shadow-2xl shadow-black' : 'bg-white border-white shadow-2xl shadow-cyan-100/50'}`}>
          
          <div className="flex flex-col md:flex-row">
            
            {/* Map Section */}
            <div className="w-full md:w-1/2 h-[300px] md:h-auto min-h-[350px] relative">
              <iframe
                width="100%"
                height="100%"
                src={googleMapUrl}
                style={{ 
                  filter: isDark ? 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' : 'none',
                  border: 0 
                }}
              ></iframe>
            </div>

            {/* Form Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 text-left flex flex-col justify-center">
              <div className="space-y-6">
                <div className="relative">
                  <label className={`block text-xs font-bold uppercase tracking-widest mb-3 ml-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    Choose Your City
                  </label>
                  <div className="relative">
                    <FaCity className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500 z-10" />
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className={`w-full h-16 pl-14 pr-12 rounded-2xl outline-none appearance-none transition-all border-2 font-bold
                        ${isDark 
                          ? 'bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500' 
                          : 'bg-slate-50 border-slate-100 text-slate-800 focus:border-cyan-500'}`}
                    >
                      <option value="" disabled>Choose City</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

             
                <button 
                  onClick={handleBooking}
                  className="w-full h-16 bg-cyan-500 hover:bg-cyan-600 text-white font-black rounded-2xl shadow-xl shadow-cyan-500/40 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group"
                >
                  BOOK NOW <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal Component */}
      <BookingModal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPlan={`Trial in ${selectedCity}`} 
      />
    </section>
  );
}

export default TrialBooking;