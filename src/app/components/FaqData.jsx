"use client";

import React, { useState, useMemo } from "react";
import { useTheme } from "@/app/contexts/ThemeContext";

/* ---------------- DATA ---------------- */
const faqCategories = [
  "General",
  "Plans",
  "Device",
  "Products",
  "Service",
  "Security Deposit",
];

const faqData = [
  {
    category: "General",
    question: "Do I need to download an App to use the water purifier?",
    answer:
      "No, while the app enhances your experience with remote monitoring and usage statistics, the purifier can operate perfectly fine without it.",
  },
  {
    category: "Device",
    question: "How do you use IoT to make me feel safe about the water I drink?",
    answer:
      "Our IoT system continuously monitors water quality, filter life, and device performance.",
  },
  {
    category: "Security Deposit",
    question: "When will my security deposit be refunded?",
    answer:
      "The security deposit is typically refunded within 7–10 business days after uninstallation.",
  },
  {
    category: "Plans",
    question: "What if my subscription validity gets over?",
    answer:
      "The device pauses purification until your subscription is renewed.",
  },
];

/* ---------------- ACCORDION ---------------- */
const AccordionItem = ({ question, answer, isOpen, onClick, theme }) => (
  <div
    className={`border-b transition-colors
      ${
        theme === "dark"
          ? "border-white/10"
          : "border-gray-200"
      }`}
  >
    <button
      onClick={onClick}
      aria-expanded={isOpen}
      className={`flex justify-between items-center w-full py-4 text-left font-medium transition
        ${
          theme === "dark"
            ? "text-slate-200 hover:text-cyan-400"
            : "text-gray-800 hover:text-cyan-600"
        }`}
    >
      <span>{question}</span>
      <svg
        className={`w-5 h-5 transition-transform duration-300
          ${
            isOpen
              ? "rotate-180 text-cyan-500"
              : theme === "dark"
              ? "text-slate-500"
              : "text-gray-400"
          }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {isOpen && (
      <div
        className={`pb-4 text-sm leading-relaxed
          ${
            theme === "dark"
              ? "text-slate-300"
              : "text-gray-600"
          }`}
      >
        {answer}
      </div>
    )}
  </div>
);

/* ---------------- MAIN ---------------- */
export default function FaqData() {
  const { theme } = useTheme();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  const filteredFaqs = useMemo(() => {
    setActiveIndex(null);
    return faqData
      .filter(
        (faq) => activeCategory === "All" || faq.category === activeCategory
      )
      .filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [activeCategory, searchTerm]);

  return (
    <section
      className={`py-20 transition-colors
        ${
          theme === "dark"
            ? "bg-gray-900"
            : "bg-gray-50"
        }`}
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Title */}
        <h2
          className={`text-4xl font-extrabold text-center mb-12
            ${
              theme === "dark"
                ? "text-white"
                : "text-black"
            }`}
        >
          Frequently Asked Questions
        </h2>

        {/* Search */}
        <div className="mb-10 relative">
          <input
            type="text"
            placeholder="Search your question..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-4 pl-12 rounded-xl text-lg transition
              ${
                theme === "dark"
                  ? "bg-white/5 text-slate-200 border border-white/10 placeholder-slate-400 focus:ring-cyan-400"
                  : "bg-white border border-gray-300 text-gray-800 focus:ring-cyan-500"
              }`}
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-10">
          {["All", ...faqCategories].map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setSearchTerm("");
                }}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition
                  ${
                    active
                      ? theme === "dark"
                        ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                        : "bg-cyan-700 text-white shadow-md"
                      : theme === "dark"
                      ? "bg-white/5 text-slate-300 border border-white/10 hover:border-cyan-400"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* FAQ Box */}
        <div
          className={`rounded-2xl p-4 transition
            ${
              theme === "dark"
                ? "bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
                : "bg-white shadow-lg"
            }`}
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={activeIndex === index}
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                theme={theme}
              />
            ))
          ) : (
            <p
              className={`p-8 text-center text-lg
                ${
                  theme === "dark"
                    ? "text-slate-400"
                    : "text-gray-500"
                }`}
            >
              No matching questions found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
