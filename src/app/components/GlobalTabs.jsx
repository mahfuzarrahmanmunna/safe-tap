"use client";
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/contexts/ThemeContext";
import { FaFillDrip, FaSyncAlt, FaShieldVirus } from "react-icons/fa";

export const products = [
  {
    id: "copper",
    label: "SafeTap Copper",
    icon: <FaFillDrip />,
    color: "#B45309",
    tagline: "Immunity Boosted with Active Copper",
  },
  {
    id: "ro_plus",
    label: "SafeTap RO+",
    icon: <FaShieldVirus />,
    color: "#06B6D4",
    tagline: "Next-Gen Multi-Stage RO+UV Tech",
  },
  {
    id: "alkaline",
    label: "SafeTap Alkaline",
    icon: <FaSyncAlt />,
    color: "#8B5CF6",
    tagline: "Healthy pH Balance & Vital Minerals",
  }
];

function GlobalTabs({ active, setActive }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const currentProduct = products.find(p => p.id === active) || products[0];

  return (
    <div className="w-full flex flex-col items-center py-10">
      <div className="relative">
        <motion.div 
          animate={{ backgroundColor: currentProduct.color }}
          className="absolute inset-0 blur-[100px] opacity-10 transition-all duration-1000"
        />

        <nav className="relative flex flex-wrap justify-center items-center gap-4">
          {products.map((item) => {
            const isActive = active === item.id;
            return (
              <div key={item.id} className="relative flex flex-col items-center">
                <button
                  onClick={() => setActive(item.id)}
                  className={`relative flex items-center justify-center px-8 py-4 rounded-xl border transition-all duration-500 min-w-[180px] md:min-w-[200px]
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

      <div className="mt-12 h-24 text-center">
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
    </div>
  );
}

export default GlobalTabs;