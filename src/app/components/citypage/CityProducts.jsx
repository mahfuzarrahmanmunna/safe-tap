// app/components/city-page/CityProducts.jsx
'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function CityProducts({ products, cityName, theme }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Available in <span className="text-cyan-600">{cityName}</span>
        </h2>
        <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
          Choose the perfect water purifier for your {cityName} home
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-cyan-50'}`}>
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {product.description}
              </p>
            </div>
            
            <div className="p-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}">
              <div className="text-4xl font-bold text-cyan-600 mb-1">
                {product.price}
              </div>
              <div className="text-sm text-gray-500">Starting price</div>
            </div>
            
            <div className="p-6">
              <h4 className="font-bold mb-4">Key Features</h4>
              <div className="space-y-3">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className={theme === 'dark' ? 'text-gray-300' : ''}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 pt-0">
              <button className={`w-full py-3 ${theme === 'dark' ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-cyan-600 hover:bg-cyan-700'} text-white font-bold rounded-lg transition-colors`}>
                Get Quote for {cityName}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}