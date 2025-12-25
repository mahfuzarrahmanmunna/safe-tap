"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/app/contexts/ThemeContext";

const cities = [
  { name: "Bengaluru", homes: "12k+ Homes" },
  { name: "Delhi NCR", homes: "18k+ Homes" },
  { name: "Mumbai", homes: "15k+ Homes" },
  { name: "Hyderabad", homes: "10k+ Homes" },
  { name: "Chennai", homes: "9k+ Homes" },
  { name: "Kolkata", homes: "7k+ Homes" },
];

export default function WaterJourney() {
  const { theme } = useTheme();
  const controls = useAnimationControls();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) {
      controls.start({
        x: ["0%", "-100%"],
        transition: {
          repeat: Infinity,
          duration: 25,
          ease: "linear",
        },
      });
    }
  }, [isHovering, controls]);

  return (
    <section
      className={`relative py-24 overflow-hidden  transition-colors
        ${theme === "dark" ? "text-white" : "text-slate-900"}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/WNc3sqFr/surface-455124-1280.jpg')",
        }}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 transition-colors
          ${
            theme === "dark"
              ? "bg-gradient-to-b from-black/60 via-black/40 to-black/70"
              : "bg-gradient-to-b from-white/80 via-white/60 to-white/80"
          }`}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Flowing Across{" "}
            <span className="text-cyan-600 dark:text-cyan-400">Cities</span>
          </h2>
          <p
            className={`mt-4 text-xl
              ${
                theme === "dark"
                  ? "text-white/90"
                  : "text-slate-600"
              }`}
          >
            Our journey to deliver clean, safe drinking water one city at a time.
          </p>
        </div>

        {/* Moving Cards */}
        <div className="relative">
          <motion.div
            className="flex gap-6 px-6 cursor-grab active:cursor-grabbing"
            animate={controls}
            drag="x"
            dragConstraints={{ left: -800, right: 0 }}
            dragElastic={0.08}
            onMouseEnter={() => {
              setIsHovering(true);
              controls.stop();
            }}
            onMouseLeave={() => setIsHovering(false)}
          >
            {[...cities, ...cities].map((city, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -12, scale: 1.06 }}
                className={`min-w-[260px] rounded-2xl p-6 border relative overflow-hidden transition-all
                  ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.2)]"
                      : "bg-white border-gray-200 shadow-xl"
                  }`}
              >
                {/* Glow */}
                <div
                  className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-3xl
                    ${
                      theme === "dark"
                        ? "bg-cyan-500/30"
                        : "bg-sky-200/70"
                    }`}
                />

                <h3 className="text-xl font-semibold">
                  {city.name}
                </h3>
                <p
                  className={`mt-2 font-medium
                    ${
                      theme === "dark"
                        ? "text-cyan-400"
                        : "text-sky-600"
                    }`}
                >
                  {city.homes}
                </p>

                <div
                  className={`mt-6 text-sm
                    ${
                      theme === "dark"
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                >
                  💧 Clean Water Delivered
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient edges */}
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 w-24
              ${
                theme === "dark"
                  ? "bg-gradient-to-r from-black/70 to-transparent"
                  : "bg-gradient-to-r from-white/90 to-transparent"
              }`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 w-24
              ${
                theme === "dark"
                  ? "bg-gradient-to-l from-black/70 to-transparent"
                  : "bg-gradient-to-l from-white/90 to-transparent"
              }`}
          />
        </div>
      </div>
    </section>
  );
}
