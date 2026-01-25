"use client";
import React, { useState } from 'react';
import { useTheme } from "@/app/contexts/ThemeContext";
import { FaChevronDown } from "react-icons/fa";

function TechSpecifications() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isOpen, setIsOpen] = useState(false);


  const specs = [
    { label: "Purifier Model", value: "DRINK PRIME ALIVE RO+UV+Cu" },
    { label: "Dimensions (D x W x H)", value: "330mm X 230mm X 490 mm (Approx.)" },
    { label: "Material Details", value: "Outer Body - ABS (Back Cover & Front Fascia)" },
    { label: "Weight", value: "Net weight 8 Kgs (Approx.)" },
    { label: "Purification Tech", value: "RO + UV + Cu" },
    { label: "Purification Stages", value: "Stage 1: Sediment, Stage 2: Pre carbon, Dual Filter, Stage 3: RO Membrane, Stage 4: UV Lamp 4 watts, Stage 5: Post carbon+ copper cartridge" },
    { label: "Overflow Control", value: "MECHANICAL FLOAT" },
    { label: "Operating Voltage", value: "150 to 250 VAC, 50 Hz" },
    { label: "Power Supply", value: "Input 230V AC, 50Hz. Output 24V (On Board SMPS)" },
    { label: "Power Rating", value: "40 Watt Maxx" },
    { label: "UV Lamp", value: "4 Watts" },
    { label: "Max TDS Supported", value: "Up to 2000 mg/L" },
    { label: "Hardness Limit", value: "Max. 600 mg/L (Antiscalant recommended >300mg/L)" },
    { label: "Input Water Pressure", value: "Up to 3 Bar (Max)" },
  ];

  return (
    <div className="max-w-4xl mx-auto my-4 px-4">
      {/* Dropdown Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-6 rounded-2xl transition-all duration-500 border-2 
          ${isOpen 
            ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
            : isDark ? 'border-slate-800 bg-slate-900/50' : 'border-gray-100 bg-white shadow-sm'}
          ${isDark ? 'text-white' : 'text-slate-800'}`}
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg ${isOpen ? 'bg-cyan-500 text-white' : 'bg-cyan-500/10 text-cyan-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">Tech Specifications</span>
        </div>
        
        <FaChevronDown className={`transition-transform duration-500 text-cyan-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      {/* Dropdown Content */}
      <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[1200px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-gray-100 shadow-xl'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {specs.map((spec, index) => (
              <div 
                key={index} 
                className={`flex flex-col pb-4 border-b ${isDark ? 'border-slate-800' : 'border-gray-50'} last:border-0`}
              >
                <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-1">
                  {spec.label}
                </span>
                <span className={`text-[15px] font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
          
          {/* Subtle Watermark or Detail */}
          <div className="mt-8 pt-6 border-t border-dashed border-cyan-500/20 text-center">
            <p className="text-sm italic text-slate-500">
              * Specs are subject to change based on water quality and environmental conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechSpecifications;