"use client";
import React from 'react';
import { useTheme } from "@/app/contexts/ThemeContext";
import { FaStar, FaGooglePlay, FaQuoteLeft, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const tags = ["Quality (1008)", "Recharge", "Installation", "Value for Money", "Customer Support", "App", "Service", "Taste"];

const reviews = [
  { name: "Richa Sharma", comment: "Good service! They have the option for relocation as well. Have been using the drink prime service for close to 3 years now.", rating: 5 },
  { name: "Saurav keshri", comment: "I've been using the Drink Prime water purifier for the past 20 days, and I must say I'm thoroughly impressed. The water quality is exceptional.", rating: 5 },
  { name: "sai chaitanya", comment: "Worst purifier..didn't even worked for 3 months correctly..got stop after 2 months.which only purified 200 litres...", rating: 1 },
  { name: "Abhishek Chaganla", comment: "Working well with purified water, filters available is too quality and purified automatically", rating: 5 },
  { name: "Richa's Creations", comment: "I recently started using the Drink Prime Water Purifier and it has been a game-changer for me and my family. Living in NCR and renting...", rating: 5 },
  { name: "Mourya G S", comment: "The Drink Prime Smart Water Purifier app is a game-changer for ensuring access to clean drinking water. With its intuitive interface.", rating: 5 },
];

function Reviews() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`py-20 transition-all duration-700 overflow-hidden ${isDark ? 'bg-[#020617]' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Sentiment & Stats Dashboard */}
        <div className={`p-8 rounded-[2.5rem] mb-16 border flex flex-col md:flex-row items-center gap-10
          ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-cyan-100/20'}`}>
          
          <div className="text-center md:border-r md:pr-10 border-cyan-500/10">
            <h3 className={`text-5xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>4.8</h3>
            <div className="flex text-amber-400 justify-center my-2"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Play Store Rating</p>
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <span className="flex items-center gap-2 text-emerald-500 font-bold text-sm"><FaCheckCircle/> 932 Positive</span>
              <span className="flex items-center gap-2 text-red-500 font-bold text-sm"><FaTimesCircle/> 76 Negative</span>
            </div>
            {/* Tags Scroll */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span key={i} className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-colors
                  ${isDark ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <a href="https://play.google.com/store" target="_blank" 
            className="flex items-center gap-3 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-2xl shadow-lg shadow-cyan-500/30 transition-all hover:scale-105">
            <FaGooglePlay className="text-xl" />
            <div className="text-left leading-tight">
              <p className="text-[10px] uppercase font-bold opacity-80">Download App</p>
              <p className="text-sm font-black">Google Play</p>
            </div>
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`break-inside-avoid relative p-8 rounded-[2.5rem] border transition-all duration-500 group hover:-translate-y-2
                ${isDark 
                  ? 'bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 shadow-2xl shadow-black/20' 
                  : 'bg-white border-slate-100 hover:border-cyan-200 shadow-xl shadow-cyan-100/20'}`}
            >
              <FaQuoteLeft className={`absolute top-6 right-8 text-3xl opacity-5 ${isDark ? 'text-white' : 'text-cyan-500'}`} />

              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`text-xs ${i < review.rating ? 'text-amber-400' : 'text-slate-300'}`} />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-tighter">Verified Review</span>
              </div>

              <p className={`text-[15px] leading-relaxed mb-8 italic ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                "{review.comment}"
              </p>

              <div className="flex items-center gap-4 border-t pt-6 border-cyan-500/10">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-cyan-500/20">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>{review.name}</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Reviews;