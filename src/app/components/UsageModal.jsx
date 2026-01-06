"use client";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaUsers, FaCloud, FaInfinity, FaCheckCircle } from "react-icons/fa";
import { useTheme } from '../contexts/ThemeContext';

const comparisonData = [
  {
    type: "Couple",
    liters: "200 Litres",
    price: "499",
    cans: "10 Cans",
    people: "2-3 People",
    icon: <FaUsers className="text-blue-500" />,
    color: "bg-blue-500"
  },
  {
    type: "Family",
    liters: "500 Litres",
    price: "599",
    cans: "25 Cans",
    people: "5+ People",
    icon: <FaCloud className="text-orange-500" />,
    color: "bg-orange-500"
  },
  {
    type: "Unlimited",
    liters: "Unlimited Litres",
    price: "625",
    cans: "40+ Cans",
    people: "7+ People",
    icon: <FaInfinity className="text-purple-500" />,
    color: "bg-purple-500"
  }
];

function UsageModal({ isOpen, onClose, onSelect }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // মোডাল ওপেন হলে বডি স্ক্রল অফ হবে না, কারণ আপনি চাচ্ছেন পেজ যেন স্ক্রল হয়
  // তবে মোডালের ভেতরে আলাদা স্ক্রল থাকবে। 

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Content - Max Height set and scrollable */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl border transition-all duration-500 custom-scrollbar
              ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}
          >
            {/* Close Button - Sticky position for easy access while scrolling */}
            <div className="sticky top-0 right-0 p-4 flex justify-end z-20 pointer-events-none">
                <button 
                onClick={onClose}
                className={`p-3 rounded-full pointer-events-auto shadow-lg transition-all
                    ${isDark ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-white text-slate-500 hover:text-slate-900'}`}
                >
                <FaTimes size={18} />
                </button>
            </div>

            <div className="px-6 pb-12 -mt-10 md:px-10">
              <div className="text-center mb-8">
                <h2 className={`text-2xl md:text-3xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Compare & Choose
                </h2>
                <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Find the perfect plan for your home
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {comparisonData.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`p-6 rounded-[1.5rem] border-2 transition-all flex flex-col items-center text-center
                      ${isDark 
                        ? 'border-slate-800 bg-slate-800/20 hover:border-indigo-500' 
                        : 'border-slate-50 bg-slate-50/50 hover:border-indigo-500 hover:bg-white'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${item.color} bg-opacity-10 flex items-center justify-center text-xl mb-3`}>
                      {item.icon}
                    </div>
                    
                    <h3 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {item.type}
                    </h3>
                    <p className="text-indigo-500 font-bold mb-4 text-sm">
                      {item.liters}
                    </p>

                    <div className="w-full space-y-3 mb-6 text-xs font-semibold">
                      <div className={`flex justify-between border-b pb-2 ${isDark ? 'border-slate-700/50' : 'border-slate-200/50'}`}>
                        <span className="text-slate-500">Price /mo</span>
                        <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>₹{item.price}</span>
                      </div>
                      <div className={`flex justify-between border-b pb-2 ${isDark ? 'border-slate-700/50' : 'border-slate-200/50'}`}>
                        <span className="text-slate-500">Water Cans</span>
                        <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{item.cans}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">People</span>
                        <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{item.people}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        onSelect(item.type);
                        onClose();
                      }}
                      className={`w-full py-3 rounded-xl font-bold text-xs transition-all active:scale-95
                        ${isDark 
                          ? 'bg-indigo-600 text-white hover:bg-indigo-500' 
                          : 'bg-slate-900 text-white hover:bg-indigo-600'}`}
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6366f1;
          border-radius: 10px;
        }
      `}</style>
    </AnimatePresence>
  );
}

export default UsageModal;