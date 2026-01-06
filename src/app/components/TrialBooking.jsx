"use client";
import React, { useState } from 'react';
import { useTheme } from "@/app/contexts/ThemeContext";
import { FaCity, FaShieldAlt, FaArrowRight } from "react-icons/fa";

const cities = [
  "Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", 
  "Barishal", "Rangpur", "Mymensingh", "Gazipur", "Narayanganj", "Cumilla"
];

function TrialBooking() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <section className={`py-24 relative overflow-hidden transition-all duration-700 ${isDark ? 'bg-[#020617]' : 'bg-slate-50'}`}>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Header Section */}
        <div className="space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-sm font-bold uppercase tracking-widest">
            <FaShieldAlt className="animate-pulse" /> Limited Time Offer
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Start Your <span className="text-cyan-500">7-Day Risk-Free</span> Trial
          </h2>
          
          <p className={`text-lg md:text-xl font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Trusted by a community of 1M+ across 9 cities
          </p>
        </div>

        {/* Booking Form Card */}
        <div className={`p-8 md:p-12 rounded-[3rem] border transition-all duration-500 
          ${isDark ? 'bg-slate-900/60 border-slate-800 shadow-2xl shadow-black' : 'bg-white border-white shadow-2xl shadow-cyan-100/50'}`}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* City Selection Dropdown */}
            <div className="relative group">
              <label className={`block text-left text-xs font-bold uppercase tracking-widest mb-3 ml-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                Choose Your City
              </label>
              <div className="relative">
                <FaCity className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500 z-10" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className={`w-full h-16 pl-14 pr-6 rounded-2xl outline-none appearance-none transition-all border-2 font-bold
                    ${isDark 
                      ? 'bg-slate-800 border-slate-700 text-white focus:border-cyan-500 focus:bg-slate-900' 
                      : 'bg-slate-50 border-slate-100 text-slate-800 focus:border-cyan-500 focus:bg-white'}`}
                >
                  <option value="" disabled>Choose City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Book Now Button */}
            <div className="md:pt-7">
              <button className="w-full h-16 bg-cyan-500 hover:bg-cyan-600 text-white font-black rounded-2xl shadow-xl shadow-cyan-500/40 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group">
                BOOK NOW <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

          </div>

          {/* Policy Text */}
          <p className={`mt-8 text-xs leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            By creating an account on DrinkPrime, you agree to our <br className="hidden md:block" />
            <a href="#" className="text-cyan-500 hover:underline font-bold">Terms of Use</a> & <a href="#" className="text-cyan-500 hover:underline font-bold">Privacy Policy</a>
          </p>
        </div>

       
      </div>
    </section>
  );
}

export default TrialBooking;