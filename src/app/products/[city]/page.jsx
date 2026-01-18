<<<<<<< HEAD
"use client";

import { useParams } from "next/navigation";
import { useTheme } from "@/app/contexts/ThemeContext";

// Import components
import CitySlider from "@/app/components/citypage/CitySlider";
import CityProducts from "@/app/components/citypage/CityProducts";
import CityStats from "@/app/components/citypage/CityStats";
import CityContact from "@/app/components/citypage/CityContact";
// import SafeTapAdvantage from '../../components/SafeTapAdvantage/SafeTapAdvantage'
// Import data
import {
  citySliders,
  demoProducts,
  features,
  techSpecs,
} from "@/app/components/citypage/data";
import ProductDescription from "@/app/components/citypage/ProductDescription";
import ProductFeature from "@/app/components/citypage/ProductFeature";
import SmartFeature from "@/app/components/citypage/SmartFeature";
import TechSpecifications from "@/app/components/citypage/TechSpecifications";
import AdvancedTech from "@/app/components/citypage/AdvancedTech";
import PracticalRemover from "@/app/components/citypage/PracticalRemover";
import WhyChooseCopper from "@/app/components/citypage/WhyChooseCopper";
import Reviews from "@/app/components/citypage/Reviews";
import FaqData from "@/app/components/FaqData";
import HowItWorks from "@/app/components/HowItWorks";
import TrialBooking from "@/app/components/TrialBooking";
import GlobalTabs from "@/app/components/GlobalTabs";
import PricingCard from "@/app/components/citypage/PricingCard";
import SafeTapAdvantage from "@/app/components/DrinkPrimeAdvantage/DrinkPrimeAdvantage";
import { useAuth } from "@/app/contexts/AuthContext";
=======
'use client';

import { useState } from 'react'; 
import { useParams } from 'next/navigation';
import { useTheme } from '@/app/contexts/ThemeContext';
import CityStats from '@/app/components/citypage/CityStats';
import TrialBooking from '@/app/components/TrialBooking';
import HowItWorks from '@/app/components/HowItWorks';
import PricingCard from '@/app/components/citypage/PricingCard';
import FaqData from '@/app/components/FaqData';
import Reviews from '@/app/components/citypage/Reviews';
import WhyChooseCopper from '@/app/components/citypage/WhyChooseCopper';
import PracticalRemover from '@/app/components/citypage/PracticalRemover';
import TechSpecifications from '@/app/components/citypage/TechSpecifications';
import SmartFeature from '@/app/components/citypage/SmartFeature';
import ProductDescription from '@/app/components/citypage/ProductDescription';
import AdvancedTech from '@/app/components/citypage/AdvancedTech';
import ProductFeature from '@/app/components/citypage/ProductFeature';
import CitySlider from '@/app/components/citypage/CitySlider';
import GlobalTabs from '@/app/components/GlobalTabs';
import DrinkPrimeAdvantage from '../../components/DrinkPrimeAdvantage/DrinkPrimeAdvantage'
import { citySliders, techSpecs } from '@/app/components/citypage/data';
import { AnimatePresence , motion } from 'framer-motion';



>>>>>>> b58ac136b5ecbd17066a8752c3e27a8df27485bd

export default function CityPage() {
  const params = useParams();
  const { theme } = useTheme();
<<<<<<< HEAD
  const citySlug = params.city?.toLowerCase() || "dhaka";
  const { user } = useAuth();
  console.log("User in CityPage:", user);

  const cityData = citySliders[citySlug] || citySliders.dhaka;

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
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

=======
  

  const [activeTab, setActiveTab] = useState('copper'); 

  const citySlug = params.city?.toLowerCase() || 'dhaka';
  const cityData = citySliders[citySlug] || citySliders.dhaka;

 

  const tabConfigs = {
    copper: {
      title: "SafeTap Copper Immunity",
      advantage: "Copper-Infused Purification",
      pricingTitle: "Copper Plan"
    },
    ro_plus: {
      title: "SafeTap RO+ Protection",
      advantage: "Advanced UV+RO Filtration",
      pricingTitle: "RO+ UV Plan"
    },
    alkaline: {
      title: "SafeTap Alkaline Balance",
      advantage: "pH Balanced Healthy Water",
      pricingTitle: "Alkaline Plan"
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      <GlobalTabs active={activeTab} setActive={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8 relative">
          
          <div className="col-span-12 lg:col-span-8 space-y-16">
            <AnimatePresence mode="wait">
              <motion.section 
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                id="hero"
              >
                <CitySlider 
                  
                  slides={cityData[activeTab]?.slides || cityData.slides}
                  cityName={`${cityData.name} (${tabConfigs[activeTab].title})`}
                  stats={cityData.stats}
                  theme={theme}
                />
              </motion.section>
            </AnimatePresence>
            
>>>>>>> b58ac136b5ecbd17066a8752c3e27a8df27485bd
            <ProductDescription theme={theme} techSpecs={techSpecs} />

            <ProductFeature></ProductFeature>
        <SmartFeature></SmartFeature>
  <TechSpecifications></TechSpecifications>
  <AdvancedTech></AdvancedTech>
  <PracticalRemover></PracticalRemover>
           <WhyChooseCopper />
            
            <Reviews />
            <FaqData />
          </div>

          {/* RIGHT SIDE: Dynamic Pricing Card */}
          <div className="hidden lg:block lg:col-span-4 relative h-full">
            <div className="sticky top-28">
              <PricingCard 
                activeProduct={activeTab} 
                title={tabConfigs[activeTab].pricingTitle}
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 mt-20 space-y-20">
          <DrinkPrimeAdvantage title={tabConfigs[activeTab].advantage} />
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