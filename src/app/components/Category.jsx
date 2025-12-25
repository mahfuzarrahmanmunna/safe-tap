"use client";

import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import {
  TrophyIcon,
  BriefcaseIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import { useTheme } from "@/app/contexts/ThemeContext";

/* ---------------- DATA ---------------- */
const CATEGORY_DATA = {
  awards: [
    { id: 1, title: "Best Use Of Voice CX", imageUrl: "https://i.ibb.co/TqYydHWn/industry-7971957-1280.jpg" },
    { id: 2, title: "FAST 42 D&C Edition", imageUrl: "https://i.ibb.co/ccfkw4QG/istockphoto-452121603-1024x1024.webp" },
    { id: 3, title: "Emerging Startups", imageUrl: "https://i.ibb.co/TqYydHWn/industry-7971957-1280.jpg" },
  ],
  investors: [
    { id: 11, title: "Investor A", imageUrl: "https://i.ibb.co/kvHjsj7/stock-exchange-broker-5119778-1280.webp" },
    { id: 12, title: "Investor B", imageUrl: "https://i.ibb.co/qF9rpnp0/ai-generated-8221045-1280.jpg" },
  ],
  blogs: [
    { id: 21, title: "Top Rental Tech", imageUrl: "/images/blog_rental.jpg" },
    { id: 22, title: "Challenger Brands", imageUrl: "/images/blog_challenger.jpg" },
  ],
};

const CATEGORY_TABS = [
  { id: "awards", label: "Awards", icon: <TrophyIcon className="w-5 h-5" /> },
  { id: "investors", label: "Our Investors", icon: <BriefcaseIcon className="w-5 h-5" /> },
  { id: "blogs", label: "Top Blogs", icon: <BookOpenIcon className="w-5 h-5" /> },
];

/* ---------------- CARD ---------------- */
const ContentCard = ({ item, theme }) => (
  <div
    className={`shrink-0 w-52 h-40 rounded-xl p-1 transition-all duration-300
      ${
        theme === "dark"
          ? "bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.15)]"
          : "bg-white border border-gray-200 shadow-md"
      }`}
  >
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

/* ---------------- MAIN ---------------- */
export default function Category() {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("awards");
  const currentContent = CATEGORY_DATA[activeCategory];

  const controls = useAnimationControls();
  const [isHovering, setIsHovering] = useState(false);

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
    <section
      className={`py-20 transition-colors
        ${
          theme === "dark"
            ? "bg-gradient-to-b from-[#05060a] via-[#0b0f1a] to-black"
            : "bg-gray-50"
        }`}
    >
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10">
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border transition-all
                ${
                  isActive
                    ? theme === "dark"
                      ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                      : "bg-cyan-600 text-white border-cyan-600 shadow-lg"
                    : theme === "dark"
                    ? "bg-white/5 text-slate-300 border-white/10 hover:border-cyan-400"
                    : "bg-white text-gray-700 border-gray-200 hover:border-cyan-600"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Slider */}
      <div className="overflow-hidden relative max-w-6xl mx-auto">
        <motion.div
          className="flex gap-6 w-fit cursor-grab active:cursor-grabbing"
          animate={controls}
          drag="x"
          dragConstraints={{ left: -600, right: 0 }}
          onMouseEnter={() => {
            setIsHovering(true);
            controls.stop();
          }}
          onMouseLeave={() => setIsHovering(false)}
        >
          {[...currentContent, ...currentContent].map((item, i) => (
            <ContentCard key={`${item.id}-${i}`} item={item} theme={theme} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
