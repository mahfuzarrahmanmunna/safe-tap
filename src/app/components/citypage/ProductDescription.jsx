
'use client';


import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function ProductDescription({ 
  product, 
  theme, 
  productFeatures, 
  techSpecs 
}) {

  const features = productFeatures || [];
  const specs = techSpecs || [];

  return (
<div className={`py-20 transition-all duration-300 ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-white'}`}>
  <div className="max-w-7xl mx-auto px-6">
    
    {/* Heading & Description Section */}
    <div className="mb-12 text-left md:text-center max-w-4xl mx-auto">
      <h2 className={`text-4xl md:text-4xl font-extrabold tracking-tight mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
       <span className='text-cyan-700'> RO+UV Copper Water Purifier</span> Product Description
      </h2>
      <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        DrinkPrime Copper is an RO+UV Water Purifier on rent in Bengaluru with the added 
        <span >Goodness of Copper</span>. 
        This IoT enabled smart purifier is the best Copper water purifier for your home.
      </p>
    </div>

    {/* Featured Stats Bar */}
    <div className={`mt-10 p-6 md:p-10 rounded-[2rem] grid grid-cols-2 md:grid-cols-3 justify-between items-center gap-8
      ${theme === 'dark' 
        ? 'bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700' 
        : 'bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 shadow-sm'}`}>
      
      {specs.map((spec, index) => {
        const IconComponent = spec.icon;
        return (
          <div key={index} className="flex items-center gap-4 group">
            <div className={`p-4 rounded-full shadow-lg transition-transform group-hover:scale-110
              ${theme === 'dark' ? 'bg-indigo-900/40 text-indigo-400' : 'bg-white text-indigo-600'}`}>
              <IconComponent className="w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-bold leading-tight ${theme === 'dark' ? 'text-gray-100' : 'text-indigo-900'}`}>
                {spec.title}
              </span>
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-indigo-700/70'}`}>
                {spec.details}
              </span>
            </div>
          </div>
        );
      })}
    </div>

  

  </div>
</div>

  );
}