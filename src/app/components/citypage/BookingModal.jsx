"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaTimes, FaPhoneAlt, FaUser, FaMapMarkerAlt, FaTicketAlt, FaStickyNote, FaChevronDown } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import Swal from 'sweetalert2';

function BookingModal({ isOpen, onClose, selectedPlan }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mounted, setMounted] = useState(false);

  // Location data states
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [thanas, setThanas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState('');

  // State for the map source URL to ensure it updates correctly
  const [mapSrc, setMapSrc] = useState('https://www.google.com/maps?q=Bangladesh&output=embed');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    referral: '',
    division: '',
    district: '',
    thana: '',
    addressDetails: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMounted(true);
    // Fetch divisions when component mounts
    fetchDivisions();
  }, []);

  // Fetch all divisions
  const fetchDivisions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/api/divisions/');
      setDivisions(response.data);
    } catch (err) {
      setLocationError('Failed to fetch divisions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Effect to update the map source whenever location data changes
  useEffect(() => {
    // Find the names of the selected locations from their respective arrays
    const thanaName = thanas.find(t => t.id == formData.thana)?.name;
    const districtName = districts.find(d => d.id == formData.district)?.name;
    const divisionName = divisions.find(d => d.id == formData.division)?.name;

    // Prioritize the most specific location for the map query
    const locationQuery = thanaName || districtName || divisionName || "Bangladesh";
    const newMapSrc = `https://www.google.com/maps?q=${encodeURIComponent(locationQuery)}&output=embed`;
    setMapSrc(newMapSrc);

  }, [formData.thana, formData.district, formData.division, thanas, districts, divisions]); // Dependencies ensure it updates when data or selection changes

  // Generic handler for text inputs and textareas
  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler for when a division is selected
  const handleDivisionSelect = async (e) => {
    const divisionId = e.target.value;

    // Reset dependent states and form data
    setDistricts([]);
    setThanas([]);
    setFormData(prev => ({
      ...prev,
      division: divisionId,
      district: '',
      thana: ''
    }));

    // Fetch districts if a division is selected
    if (divisionId) {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/api/districts/?division_id=${divisionId}`);
        setDistricts(response.data);
      } catch (err) {
        setLocationError('Failed to fetch districts. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Handler for when a district is selected
  const handleDistrictSelect = async (e) => {
    const districtId = e.target.value;

    // Reset dependent state and form data
    setThanas([]);
    setFormData(prev => ({
      ...prev,
      district: districtId,
      thana: ''
    }));

    // Fetch thanas if a district is selected
    if (districtId) {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/api/thanas/?district_id=${districtId}`);
        setThanas(response.data);
      } catch (err) {
        setLocationError('Failed to fetch thanas. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Handler for when a thana is selected
  const handleThanaSelect = (e) => {
    const thanaId = e.target.value;
    setFormData(prev => ({
      ...prev,
      thana: thanaId
    }));
  };


  if (!mounted) return null;

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^\d{10,11}$/.test(formData.phone)) newErrors.phone = "Please enter a valid number";
    if (!formData.division) newErrors.division = "Select a division";
    if (!formData.district) newErrors.district = "Select a district";
    if (!formData.thana) newErrors.thana = "Select a thana";
    if (!formData.addressDetails.trim()) newErrors.addressDetails = "Address details are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Data Submitted:", formData);
      Swal.fire({
        title: "Booking Successful",
        text: "We have received your request!",
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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm pointer-events-auto"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`relative w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden transition-colors duration-300 h-[90vh] overflow-y-auto no-scrollbar pointer-events-auto
              ${isDark ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-white border border-cyan-50 text-slate-900'}`}
          >
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
                {/* The 'key' prop forces the iframe to remount and reload when the source URL changes */}
                <iframe
                  key={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: isDark ? 'invert(90%) hue-rotate(180deg) brightness(95%)' : 'none' }}
                  src={mapSrc}
                  loading="lazy"
                ></iframe>
                <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-full text-[10px] font-bold text-cyan-600 flex items-center gap-1 shadow-sm">
                  <FaMapMarkerAlt size={10} /> {thanas.find(t => t.id == formData.thana)?.name || districts.find(d => d.id == formData.district)?.name || divisions.find(d => d.id == formData.division)?.name || "Service Area"}
                </div>
              </div>

              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Name */}
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-medium ${isDark ? 'bg-slate-800/50 text-white border-transparent' : 'bg-slate-50 text-slate-900 border-slate-100'} focus:border-cyan-500`}
                    value={formData.name}
                    onChange={handleFormInputChange}
                  />
                  {errors.name && <p className="text-[10px] font-bold text-red-500 mt-1 ml-3">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div className="relative">
                  <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-medium ${isDark ? 'bg-slate-800/50 text-white border-transparent' : 'bg-slate-50 text-slate-900 border-slate-100'} focus:border-cyan-500`}
                    value={formData.phone}
                    onChange={handleFormInputChange}
                  />
                  {errors.phone && <p className="text-[10px] font-bold text-red-500 mt-1 ml-3">{errors.phone}</p>}
                </div>

                {/* Division Selection */}
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 z-10" />
                  <select
                    name="division"
                    className={`w-full pl-12 pr-10 py-4 rounded-2xl border-2 outline-none appearance-none transition-all text-sm font-medium ${isDark ? 'bg-slate-800/50 text-white border-transparent' : 'bg-slate-50 text-slate-900 border-slate-100'} focus:border-cyan-500 cursor-pointer`}
                    value={formData.division}
                    onChange={handleDivisionSelect}
                  >
                    <option value="">Select Division *</option>
                    {divisions.map(division => (
                      <option key={division.id} value={division.id}>{division.name}</option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 pointer-events-none" />
                  {errors.division && <p className="text-[10px] font-bold text-red-500 mt-1 ml-3">{errors.division}</p>}
                </div>

                {/* District Selection */}
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 z-10" />
                  <select
                    name="district"
                    className={`w-full pl-12 pr-10 py-4 rounded-2xl border-2 outline-none appearance-none transition-all text-sm font-medium ${isDark ? 'bg-slate-800/50 text-white border-transparent' : 'bg-slate-50 text-slate-900 border-slate-100'} focus:border-cyan-500 cursor-pointer ${!formData.division ? 'opacity-50' : ''}`}
                    value={formData.district}
                    onChange={handleDistrictSelect}
                    disabled={!formData.division}
                  >
                    <option value="">Select District *</option>
                    {districts.map(district => (
                      <option key={district.id} value={district.id}>{district.name}</option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 pointer-events-none" />
                  {errors.district && <p className="text-[10px] font-bold text-red-500 mt-1 ml-3">{errors.district}</p>}
                </div>

                {/* Thana Selection */}
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 z-10" />
                  <select
                    name="thana"
                    className={`w-full pl-12 pr-10 py-4 rounded-2xl border-2 outline-none appearance-none transition-all text-sm font-medium ${isDark ? 'bg-slate-800/50 text-white border-transparent' : 'bg-slate-50 text-slate-900 border-slate-100'} focus:border-cyan-500 cursor-pointer ${!formData.district ? 'opacity-50' : ''}`}
                    value={formData.thana}
                    onChange={handleThanaSelect}
                    disabled={!formData.district}
                  >
                    <option value="">Select Thana *</option>
                    {thanas.map(thana => (
                      <option key={thana.id} value={thana.id}>{thana.name}</option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 pointer-events-none" />
                  {errors.thana && <p className="text-[10px] font-bold text-red-500 mt-1 ml-3">{errors.thana}</p>}
                </div>

                {/* Address Details */}
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-5 text-cyan-500" />
                  <textarea
                    name="addressDetails"
                    placeholder="Enter your detailed address (house number, street, etc.)"
                    rows="3"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-transparent outline-none transition-all text-sm font-medium focus:border-cyan-500 resize-none ${isDark ? 'bg-slate-800/50 text-white' : 'bg-slate-50 text-slate-900'}`}
                    value={formData.addressDetails}
                    onChange={handleFormInputChange}
                  />
                  {errors.addressDetails && <p className="text-[10px] font-bold text-red-500 mt-1 ml-3">{errors.addressDetails}</p>}
                </div>

                {/* Referral (Optional) */}
                <div className="relative">
                  <FaTicketAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
                  <input
                    type="text"
                    name="referral"
                    placeholder="Referral Code (Optional)"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-transparent outline-none transition-all text-sm font-medium focus:border-cyan-500 ${isDark ? 'bg-slate-800/50 text-white' : 'bg-slate-50 text-slate-900'}`}
                    value={formData.referral}
                    onChange={handleFormInputChange}
                  />
                </div>

                {/* Notes Field */}
                <div className="relative">
                  <FaStickyNote className="absolute left-4 top-5 text-cyan-500" />
                  <textarea
                    name="notes"
                    placeholder="Any special instructions or notes?"
                    rows="3"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-transparent outline-none transition-all text-sm font-medium focus:border-cyan-500 resize-none ${isDark ? 'bg-slate-800/50 text-white' : 'bg-slate-50 text-slate-900'}`}
                    value={formData.notes}
                    onChange={handleFormInputChange}
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