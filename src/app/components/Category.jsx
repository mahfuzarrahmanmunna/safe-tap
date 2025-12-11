"use client"; 

import { useState } from 'react';
import Image from 'next/image';
import { TrophyIcon, BriefcaseIcon, BookOpenIcon } from '@heroicons/react/24/solid';

const CATEGORY_DATA = {
  awards: [

    { id: 1, title: 'Best Use Of Voice CX', imageUrl: 'https://i.ibb.co/TqYydHWn/industry-7971957-1280.jpg' },
    { id: 2, title: 'FAST 42 D&C Edition', imageUrl: 'https://i.ibb.co/ccfkw4QG/istockphoto-452121603-1024x1024.webp' },
    { id: 3, title: 'Emerging Startups', imageUrl: 'https://i.ibb.co/TqYydHWn/industry-7971957-1280.jpg' },
    { id: 4, title: 'Top 10 Innovators', imageUrl: 'https://i.ibb.co/ccfkw4QG/istockphoto-452121603-1024x1024.webp' },
    { id: 5, title: 'CX Excellence 2024', imageUrl: 'https://i.ibb.co/TqYydHWn/industry-7971957-1280.jpg' },
    { id: 6, title: 'Digital Transformation', imageUrl: 'https://i.ibb.co/ccfkw4QG/istockphoto-452121603-1024x1024.webp' },
    { id: 7, title: 'Best Software 2025', imageUrl: 'https://i.ibb.co/TqYydHWn/industry-7971957-1280.jpg' },
    { id: 8, title: 'Industry Leadership', imageUrl: 'https://i.ibb.co/TqYydHWn/industry-7971957-1280.jpg' },
  ],
  investors: [
    { id: 11, title: 'Investor A Logo', imageUrl: 'https://i.ibb.co/kvHjsj7/stock-exchange-broker-5119778-1280.webp' },
    { id: 12, title: 'Investor B Logo', imageUrl: 'https://i.ibb.co/qF9rpnp0/ai-generated-8221045-1280.jpg' },
    { id: 13, title: 'Investor C Logo', imageUrl: '/images/investor_c.jpg' },
    { id: 14, title: 'Investor D Logo', imageUrl: '/images/investor_d.jpg' },
    { id: 15, title: 'Investor E Logo', imageUrl: '/images/investor_e.jpg' },
    { id: 16, title: 'Investor F Logo', imageUrl: '/images/investor_f.jpg' },
  ],
  blogs: [
    { id: 21, title: 'Top Online Rental Tech Startups', imageUrl: '/images/blog_rental.jpg' },
    { id: 22, title: '500 Challenger Brands', imageUrl: '/images/blog_challenger.jpg' },
    { id: 23, title: 'Dun & Bradstreet Awards', imageUrl: '/images/blog_dnb.jpg' },
    { id: 24, title: 'Future of AI in Industry', imageUrl: '/images/blog_ai.jpg' },
    { id: 25, title: 'Next Gen Frontend', imageUrl: '/images/blog_frontend.jpg' },
    { id: 26, title: 'DevOps Trends 2025', imageUrl: '/images/blog_devops.jpg' },
  ],
};

// --- 2. Button Configuration ---
const CATEGORY_TABS = [
  { id: 'awards', label: 'Awards', icon: <TrophyIcon className="w-5 h-5" /> },
  { id: 'investors', label: 'Our Investors', icon: <BriefcaseIcon className="w-5 h-5" /> },
  { id: 'blogs', label: 'Top Blogs', icon: <BookOpenIcon className="w-5 h-5" />},
];

// Helper Component for Card 
const ContentCard = ({ item }) => (
    <div 
        // flex-shrink-0 w-52 
        className="shrink-0 w-52 h-40 border border-gray-200 rounded-lg shadow-md p-1 bg-white"
    >
        <div className="relative w-full h-full">
            <Image
                src={item.imageUrl}
                alt={item.title}
                layout="fill"
                objectFit="contain" 
                className="rounded-lg"
            />
        </div>
    </div>
);

/**
 * Renders the full toggleable content section with infinite horizontal motion.
 */
export default function Category() {
  const [activeCategory, setActiveCategory] = useState('awards');
  const currentContent = CATEGORY_DATA[activeCategory];

  // --- 3. Component Rendering ---
  return (
    <section className="container mx-auto py-10">

      {/*  Category Buttons Bar  */}
      <div className="flex justify-center space-x-3 md:space-x-4 mb-8">
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.id;
          
          const baseClasses = "flex items-center px-4 md:px-6 py-2 md:py-3 rounded-xl transition-all duration-300 border-2 font-semibold text-sm md:text-base";
          const activeClasses = "bg-cyan-600 text-white border-cyan-600 shadow-lg";
          const inactiveClasses = "bg-white text-gray-700 border-gray-200 hover:border-cyan-600";
        
          return (
            <button
              key={tab.id}
              className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
              onClick={() => setActiveCategory(tab.id)}
            >
            
              <span className="mr-2">{tab.icon}</span> 
              {tab.label}
            </button>
          );
        })}
      </div>

      {/*  Content Slider - Infinite Motion */}
      {currentContent && currentContent.length > 0 ? (
        // Outer container: overflow-hidden 
        <div className="overflow-hidden w-full relative"> 
            
            <div className="slider-track flex space-x-6 pb-4 w-fit"> 
                
               
                {currentContent.map((item) => (
                    <ContentCard key={item.id} item={item} />
                ))}

               
                {currentContent.map((item, index) => (
                   
                    <ContentCard key={`copy-${item.id}-${index}`} item={item} />
                ))}
            </div>
        </div>
      ) : ( 
        <p className="text-center text-gray-500 mt-8">No content available for this section.</p>
      )}
    </section>
  );
}