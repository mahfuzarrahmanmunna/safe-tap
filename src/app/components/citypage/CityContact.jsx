// app/components/city-page/CityContact.jsx
'use client';

import { Phone } from 'lucide-react';

export default function CityContact({ cityName, theme, contactNumber }) {
  return (
    <div className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-cyan-50'}`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Need Help Choosing in {cityName}?
        </h2>
        <p className={`text-xl mb-8 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Our water experts in {cityName} are ready to assist you
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href={`tel:${contactNumber}`}
            className={`px-8 py-4 ${theme === 'dark' ? 'bg-cyan-600 hover:bg-cyan-500' : 'bg-cyan-600 hover:bg-cyan-700'} text-white font-bold rounded-lg transition-colors flex items-center justify-center space-x-2`}
          >
            <Phone className="w-5 h-5" />
            <span>Call Our {cityName} Team</span>
          </a>
          <button className={`px-8 py-4 border-2 ${theme === 'dark' ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-cyan-600 text-cyan-600 hover:bg-cyan-50'} font-bold rounded-lg transition-colors`}>
            Book Free Water Test
          </button>
        </div>
      </div>
    </div>
  );
}