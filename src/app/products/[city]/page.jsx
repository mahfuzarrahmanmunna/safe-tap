// app/products/[city]/page.jsx
'use client';

import { useParams } from 'next/navigation';
import { useTheme } from '@/app/contexts/ThemeContext';

// Import components
import CitySlider from '@/app/components/citypage/CitySlider';
import CityProducts from '@/app/components/citypage/CityProducts';
import CityStats from '@/app/components/citypage/CityStats';
import CityContact from '@/app/components/citypage/CityContact';

// Import data
import { citySliders, demoProducts,features , techSpecs } from '@/app/components/citypage/data';
import ProductDescription from '@/app/components/citypage/ProductDescription';


export default function CityPage() {
  const params = useParams();
  const { theme } = useTheme();
  
  const citySlug = params.city?.toLowerCase() || 'dhaka';
  
  // Get city data
  const cityData = citySliders[citySlug] || citySliders.dhaka;
  const products = demoProducts[citySlug] || demoProducts.dhaka;
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Slider Section */}
      <section className="relative">
        <CitySlider 
          slides={cityData.slides}
          cityName={cityData.name}
          stats={cityData.stats}
          theme={theme}
        />
        {/* Product Description  */}

        <ProductDescription 
        theme={theme}
        techSpecs = {techSpecs }
        ></ProductDescription>

        {/* Mobile Stats */}
        <CityStats 
          stats={cityData.stats}
          cityName={cityData.name}
          theme={theme}
        />
      </section>

      {/* Products Section */}
      <CityProducts 
        products={products}
        cityName={cityData.name}
        theme={theme}
      />

      {/* Contact Section */}
      <CityContact 
        cityName={cityData.name}
        theme={theme}
        contactNumber="+8801919222222"
      />
    </div>
  );
}