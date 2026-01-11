"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; 
import { motion, AnimatePresence } from 'framer-motion';

import { FaTimes, FaPhoneAlt, FaUser, FaMapMarkerAlt, FaTicketAlt, FaStickyNote } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import Swal from 'sweetalert2';

const cities = [
  "Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", 
  "Barishal", "Rangpur", "Mymensingh", "Gazipur", "Narayanganj", "Cumilla"
];

function BookingModal({ isOpen, onClose, selectedPlan }) {
  const { theme } = useTheme(); 
  const isDark = theme === 'dark';
  const [mounted, setMounted] = useState(false); 

  const [formData, setFormData] = useState({
    name: '', 
    phone: '', 
    referral: '', 
    city: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMounted(true); 
  }, []);

  if (!mounted) return null;

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^\d{10,11}$/.test(formData.phone)) newErrors.phone = "Please enter a valid number";
    if (!formData.city) newErrors.city = "Choose city *";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Data Submitted:", formData); // আপনি চাইলে কনসোলে চেক করতে পারেন
      Swal.fire({
        title: "Booking Successful",
        text: "We have received your request with notes!",
        icon: "success",
        confirmButtonColor: "#0891b2",
      });
      onClose();
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 pointer-events-none">
   <motion.div 
  initial={{ scale: 0.9, opacity: 0, y: 20 }}
  animate={{ scale: 1, opacity: 1, y: 0 }}
  exit={{ scale: 0.9, opacity: 0, y: 20 }}

  className={`relative w-full max-w-lg rounded-[2.5rem] shadow-2xl transition-colors duration-300 h-[90vh] overflow-y-auto pointer-events-auto
    scrollbar-hide md:scrollbar-default
    ${isDark ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-white border border-cyan-50 text-slate-900'}`}
  style={{
    msOverflowStyle: 'none',  
    scrollbarWidth: 'none',   
  }}
>
 
  <style jsx>{`
    div::-webkit-scrollbar {
      display: none;
    }
  `}</style>
            {/* Header */}
            <div className={`sticky top-0 z-20 p-6 flex justify-between items-center border-b border-slate-100 dark:border-slate-800 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
              <div>
                <h2 className="text-xl font-black text-cyan-600 tracking-tight">Start 7-Day Trial</h2>
                <p className={`text-[9px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Plan: <span className="text-cyan-500">{selectedPlan}</span>
                </p>
              </div>
              <button onClick={onClose} className={`p-2 rounded-full ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                <FaTimes size={14} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Map Section */}
              <div className="w-full h-48 rounded-3xl overflow-hidden shadow-inner border-2 border-cyan-500/20 relative bg-slate-100">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: isDark ? 'invert(90%) hue-rotate(180deg) brightness(95%)' : 'none' }}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(formData.city || "Bangladesh")}&output=embed`}
                ></iframe>
                <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-full text-[10px] font-bold text-cyan-600 flex items-center gap-1 shadow-sm">
                  <FaMapMarkerAlt size={10} /> {formData.city || "Service Area"}
                </div>
              </div>

              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Name */}
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
                  <input 
                    type="text" placeholder="Full Name" 
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-medium ${isDark ? 'bg-slate-800/50 text-white border-transparent' : 'bg-slate-50 text-slate-900 border-slate-100'} focus:border-cyan-500`}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  {errors.name && <p className="text-[10px] font-bold text-red-500 mt-1 ml-3">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div className="relative">
                  <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
                  <input 
                    type="tel" placeholder="Phone Number" 
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-medium ${isDark ? 'bg-slate-800/50 text-white border-transparent' : 'bg-slate-50 text-slate-900 border-slate-100'} focus:border-cyan-500`}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  {errors.phone && <p className="text-[10px] font-bold text-red-500 mt-1 ml-3">{errors.phone}</p>}
                </div>

                {/* City Selection */}
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 z-10" />
                  <select 
                    className={`w-full pl-12 pr-10 py-4 rounded-2xl border-2 outline-none appearance-none transition-all text-sm font-medium ${isDark ? 'bg-slate-800/50 text-white border-transparent' : 'bg-slate-50 text-slate-900 border-slate-100'} focus:border-cyan-500 cursor-pointer`}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    value={formData.city}
                  >
                    <option value="">Choose city *</option>
                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>

                {/* Referral (Optional) */}
                <div className="relative">
                  <FaTicketAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
                  <input 
                    type="text" placeholder="Referral Code (Optional)" 
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-transparent outline-none transition-all text-sm font-medium focus:border-cyan-500 ${isDark ? 'bg-slate-800/50 text-white' : 'bg-slate-50 text-slate-900'}`}
                    onChange={(e) => setFormData({...formData, referral: e.target.value})}
                  />
                </div>

                {/* Notes Field  */}
                <div className="relative">
                  <FaStickyNote className="absolute left-4 top-5 text-cyan-500" />
                  <textarea 
                    placeholder="Any special instructions or notes?" 
                    rows="3"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-transparent outline-none transition-all text-sm font-medium focus:border-cyan-500 resize-none ${isDark ? 'bg-slate-800/50 text-white' : 'bg-slate-50 text-slate-900'}`}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>

                <button type="submit" className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-black text-lg rounded-2xl shadow-lg transition-all active:scale-95 shadow-cyan-600/20">
                  Confirm Free Trial
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

export default BookingModal;