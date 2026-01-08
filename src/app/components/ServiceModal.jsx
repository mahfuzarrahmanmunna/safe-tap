"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, User, Image, Video, FileCheck } from 'lucide-react';
import Swal from 'sweetalert2';

export default function ServiceModal({ isOpen, onClose, theme }) {
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({ name: '', photo: null, video: null });
  const [previews, setPreviews] = useState({ photo: null, video: null });
  
  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);

  if (!isOpen) return null;

  // Handle File Change
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [type]: file });
      // Preview logic
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews({ ...previews, [type]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      Swal.fire("Error", "Please enter your name", "error");
      return;
    }
    console.log("Submit Data:", formData);
    Swal.fire({
      title: "Success!",
      text: "Data and files have been captured.",
      icon: "success",
      confirmButtonColor: "#0891b2",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className={`relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden ${
            isDark ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-white text-slate-900'
          }`}
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-cyan-600">Submit Service Info</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <User size={16} className="text-cyan-500" /> Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                  isDark ? 'bg-slate-800 border-transparent focus:border-cyan-500' : 'bg-slate-50 border-slate-100 focus:border-cyan-500'
                }`}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Image size={16} className="text-cyan-500" /> Upload Photo
              </label>
              <div 
                onClick={() => photoInputRef.current.click()}
                className={`border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500 transition-colors ${
                  isDark ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-slate-50'
                }`}
              >
                {previews.photo ? (
                  <img src={previews.photo} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
                ) : (
                  <>
                    <Upload className="text-slate-400 mb-2" size={24} />
                    <span className="text-xs text-slate-500">Click to upload image</span>
                  </>
                )}
                <input type="file" ref={photoInputRef} hidden accept="image/*" onChange={(e) => handleFileChange(e, 'photo')} />
              </div>
            </div>

            {/* Video Upload */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Video size={16} className="text-cyan-500" /> Upload Video
              </label>
              <div 
                onClick={() => videoInputRef.current.click()}
                className={`border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500 transition-colors ${
                  isDark ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-slate-50'
                }`}
              >
                {formData.video ? (
                  <div className="flex items-center gap-2 text-cyan-500">
                    <FileCheck size={20} />
                    <span className="text-xs font-medium">{formData.video.name.substring(0, 20)}...</span>
                  </div>
                ) : (
                  <>
                    <Upload className="text-slate-400 mb-2" size={24} />
                    <span className="text-xs text-slate-500">Click to upload video</span>
                  </>
                )}
                <input type="file" ref={videoInputRef} hidden accept="video/*" onChange={(e) => handleFileChange(e, 'video')} />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-2xl shadow-lg shadow-cyan-600/20 transition-all active:scale-95"
            >
              Submit Information
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}