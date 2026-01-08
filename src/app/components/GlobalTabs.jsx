"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/contexts/ThemeContext";
import { FaFillDrip, FaSyncAlt, FaShieldVirus } from "react-icons/fa";

const products = [
  {
    id: "copper",
    label: "DrinkPrime Copper",
    icon: <FaFillDrip />,
    color: "#B45309", // Copper color
    tagline: "Immunity Boosted with Active Copper",
    gradient: "from-[#B45309] to-[#78350F]"
  },
  {
    id: "ro_plus",
    label: "DrinkPrime RO+",
    icon: <FaShieldVirus />,
    color: "#06B6D4", 
    tagline: "Next-Gen Multi-Stage RO+UV Tech",
    gradient: "from-slate-50 to-slate-100" // Light mode non-active feel
  },
  {
    id: "alkaline",
    label: "DrinkPrime Alkaline",
    icon: <FaSyncAlt />,
    color: "#8B5CF6", 
    tagline: "Healthy pH Balance & Vital Minerals",
    gradient: "from-slate-50 to-slate-100"
  }
];

function GlobalTabs() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [active, setActive] = useState(products[0].id);

  const currentProduct = products.find(p => p.id === active);

  return (
    <div className="w-full flex flex-col items-center py-10">
      <div className="relative">
  
        <motion.div 
          animate={{ backgroundColor: currentProduct.color }}
          className="absolute inset-0 blur-[100px] opacity-10 transition-all duration-1000"
        />

        {/* Tab Container */}
        <nav className="relative flex items-center gap-2">
          {products.map((item) => {
            const isActive = active === item.id;
            return (
              <div key={item.id} className="relative flex flex-col items-center">
                <button
                  onClick={() => setActive(item.id)}
                  className={`relative flex items-center justify-center px-8 py-4 rounded-xl border transition-all duration-500 min-w-[200px]
                    ${isActive 
                      ? 'text-white border-transparent shadow-xl' 
                      : isDark 
                        ? 'bg-slate-900/50 border-slate-800 text-slate-400' 
                        : 'bg-white border-slate-200 text-slate-600 shadow-sm'}`}
                  style={{
                    background: isActive ? `linear-gradient(to bottom right, ${item.color}, #78350F)` : undefined
                  }}
                >
                  <span className="relative z-10 font-bold text-sm tracking-tight">
                    {item.label}
                  </span>
                </button>

           
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="arrow"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute -bottom-2 w-4 h-4 rotate-45 z-20"
                      style={{ backgroundColor: item.color }}
                    />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Content Display */}
      <div className="mt-12 overflow-hidden h-20 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className={`text-2xl md:text-4xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {currentProduct.label.split(' ')[0]} <span style={{ color: currentProduct.color }}>{currentProduct.label.split(' ')[1]}</span>
            </h3>
            <p className="text-[11px] uppercase font-bold tracking-[0.5em] text-slate-500 mt-2">
              {currentProduct.tagline}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="mt-6 flex gap-2">
        {products.map(p => (
          <motion.div 
            key={p.id}
            animate={{ 
              width: active === p.id ? 32 : 8,
              backgroundColor: active === p.id ? currentProduct.color : (isDark ? "#334155" : "#E2E8F0")
            }}
            className="h-2 rounded-full transition-colors duration-500"
          />
        ))}
      </div>
    </div>
  );
}

export default GlobalTabs;