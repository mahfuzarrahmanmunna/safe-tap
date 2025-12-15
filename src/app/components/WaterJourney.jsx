
"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

const cities = [
  { name: "Bengaluru", homes: "12k+ Homes" },
  { name: "Delhi NCR", homes: "18k+ Homes" },
  { name: "Mumbai", homes: "15k+ Homes" },
  { name: "Hyderabad", homes: "10k+ Homes" },
  { name: "Chennai", homes: "9k+ Homes" },
  { name: "Kolkata", homes: "7k+ Homes" },
];

export default function WaterJourney() {
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
    <section className="relative py-24 overflow-hidden text-white mt-14">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/R4t5vh38/houses-5763699-1280.jpg')",
        }}
      />

      {/* Dark gradient overlay (image stays clear) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />

      {/* Content */}
      <div className="relative z-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Flowing Across Cities
          </h2>
          <p className="mt-4 text-xl text-white/90">
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
                whileHover={{ y: -10, scale: 1.05 }}
                className="min-w-[260px] bg-cyan-100 text-slate-800 rounded-2xl p-6 shadow-xl border border-white/30 relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-200 rounded-full blur-2xl opacity-60" />

                <h3 className="text-xl font-semibold">
                  {city.name}
                </h3>
                <p className="mt-2 text-sky-600 font-medium">
                  {city.homes}
                </p>

                <div className="mt-6 text-slate-500 text-sm">
                  💧 Clean Water Delivered
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/40 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
