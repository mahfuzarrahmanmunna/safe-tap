
'use client';

import { useParams } from 'next/navigation';
import { useTheme } from '@/app/contexts/ThemeContext';

// Import components
import CitySlider from '@/app/components/citypage/CitySlider';
import CityProducts from '@/app/components/citypage/CityProducts';
import CityStats from '@/app/components/citypage/CityStats';
import CityContact from '@/app/components/citypage/CityContact';
// import SafeTapAdvantage from '../../components/SafeTapAdvantage/SafeTapAdvantage'
// Import data
import { citySliders, demoProducts,features , techSpecs } from '@/app/components/citypage/data';
import ProductDescription from '@/app/components/citypage/ProductDescription';
import ProductFeature from '@/app/components/citypage/ProductFeature';
import SmartFeature from '@/app/components/citypage/SmartFeature';
import TechSpecifications from '@/app/components/citypage/TechSpecifications';
import AdvancedTech from '@/app/components/citypage/AdvancedTech';
import PracticalRemover from '@/app/components/citypage/PracticalRemover';
import WhyChooseCopper from '@/app/components/citypage/WhyChooseCopper';
import Reviews from '@/app/components/citypage/Reviews';
import FaqData from '@/app/components/FaqData';
import HowItWorks from '@/app/components/HowItWorks';
import TrialBooking from '@/app/components/TrialBooking';
import GlobalTabs from '@/app/components/GlobalTabs';
import PricingCard from '@/app/components/citypage/PricingCard';
import SafeTapAdvantage from '@/app/components/DrinkPrimeAdvantage/DrinkPrimeAdvantage';


export default function CityPage() {
  const params = useParams();
  const { theme } = useTheme();
  const citySlug = params.city?.toLowerCase() || 'dhaka';
  
  const cityData = citySliders[citySlug] || citySliders.dhaka;
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
 
      <GlobalTabs />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8 relative">
          
          {/* LEFT SIDE: Scrollable Content */}
          <div className="col-span-12 lg:col-span-8 space-y-16">
            <section id="hero">
              <CitySlider 
                slides={cityData.slides}
                cityName={cityData.name}
                stats={cityData.stats}
                theme={theme}
              />
            </section>
            
            <ProductDescription theme={theme} techSpecs={techSpecs} />
            <ProductFeature />
            <SmartFeature />
            <TechSpecifications />
            <AdvancedTech />
            <PracticalRemover />
            <WhyChooseCopper />
            <Reviews />
            <FaqData />
          </div>

          {/* RIGHT SIDE: Fixed Pricing Card */}
          <div className="hidden lg:block lg:col-span-4 relative h-full">
            <div className="sticky top-28">
              <PricingCard />
            </div>
          </div>
        </div>

   
        <div className="col-span-12 mt-20 space-y-20">
          <SafeTapAdvantage />
          <HowItWorks />
          <TrialBooking />
          
          <CityStats 
            stats={cityData.stats}
            cityName={cityData.name}
            theme={theme}
          />
        </div>
      </main>
    </div>
  );
}
