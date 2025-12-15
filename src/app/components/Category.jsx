"use client";

import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { TrophyIcon, BriefcaseIcon, BookOpenIcon } from "@heroicons/react/24/solid";



const CATEGORY_DATA = {
  awards: [
    { id: 1, title: "Best Use Of Voice CX", imageUrl: "https://i.ibb.co/TqYydHWn/industry-7971957-1280.jpg" },
    { id: 2, title: "FAST 42 D&C Edition", imageUrl: "https://i.ibb.co/ccfkw4QG/istockphoto-452121603-1024x1024.webp" },
    { id: 3, title: "Emerging Startups", imageUrl: "https://i.ibb.co/TqYydHWn/industry-7971957-1280.jpg" },
    { id: 4, title: "Top 10 Innovators", imageUrl: "https://i.ibb.co/ccfkw4QG/istockphoto-452121603-1024x1024.webp" },
    { id: 5, title: "CX Excellence 2024", imageUrl: "https://i.ibb.co/TqYydHWn/industry-7971957-1280.jpg" },
    { id: 6, title: "Digital Transformation", imageUrl: "https://i.ibb.co/ccfkw4QG/istockphoto-452121603-1024x1024.webp" },
  ],
  investors: [
    { id: 11, title: "Investor A Logo", imageUrl: "https://i.ibb.co/kvHjsj7/stock-exchange-broker-5119778-1280.webp" },
    { id: 12, title: "Investor B Logo", imageUrl: "https://i.ibb.co/qF9rpnp0/ai-generated-8221045-1280.jpg" },
        { id: 13, title: "Investor A Logo", imageUrl: "https://i.ibb.co/kvHjsj7/stock-exchange-broker-5119778-1280.webp" },
        { id: 14, title: "Investor A Logo", imageUrl: "https://i.ibb.co/kvHjsj7/stock-exchange-broker-5119778-1280.webp" },

  ],
  blogs: [
    { id: 21, title: "Top Online Rental Tech Startups", imageUrl: "/images/blog_rental.jpg" },
       { id: 22, title: "Top Online Rental Tech Startups", imageUrl: "/images/blog_rental.jpg" },

       { id: 23, title: "500 Challenger Brands", imageUrl: "/images/blog_challenger.jpg" },

       { id: 24, title: "500 Challenger Brands", imageUrl: "/images/blog_challenger.jpg" },
  ],
};

const CATEGORY_TABS = [
  { id: "awards", label: "Awards", icon: <TrophyIcon className="w-5 h-5" /> },
  { id: "investors", label: "Our Investors", icon: <BriefcaseIcon className="w-5 h-5" /> },
  { id: "blogs", label: "Top Blogs", icon: <BookOpenIcon className="w-5 h-5" /> },
];



const ContentCard = ({ item }) => (
  <div className="shrink-0 w-52 h-40 border border-gray-200 rounded-lg shadow-md p-1 bg-white">
    <div className="relative w-full h-full">
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        className="rounded-lg object-contain"
      />
    </div>
  </div>
);



export default function Category() {
  const [activeCategory, setActiveCategory] = useState("awards");
  const currentContent = CATEGORY_DATA[activeCategory];

  const controls = useAnimationControls();
  const [isHovering, setIsHovering] = useState(false);

  /* Auto motion */
  useEffect(() => {
    if (!isHovering) {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          repeat: Infinity,
          duration: 22,
          ease: "linear",
        },
      });
    }
  }, [isHovering, activeCategory, controls]);

  return (
    <section className="container mx-auto py-10">

      {/* Tabs */}
      <div className="flex justify-center space-x-3 mb-8">
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`flex items-center px-5 py-3 rounded-xl border-2 font-semibold transition
                ${isActive
                  ? "bg-cyan-600 text-white border-cyan-600 shadow-lg"
                  : "bg-white text-gray-700 border-gray-200 hover:border-cyan-600"}`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Slider */}
      {currentContent?.length > 0 && (
        <div className="overflow-hidden w-full relative">
          <motion.div
            className="flex gap-6 w-fit cursor-grab active:cursor-grabbing"
            animate={controls}
            drag="x"
            dragConstraints={{ left: -600, right: 0 }}
            dragElastic={0.08}
            onMouseEnter={() => {
              setIsHovering(true);
              controls.stop();
            }}
            onMouseLeave={() => setIsHovering(false)}
          >
            {[...currentContent, ...currentContent].map((item, index) => (
              <ContentCard key={`${item.id}-${index}`} item={item} />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}
