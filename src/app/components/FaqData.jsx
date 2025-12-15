import React, { useState, useMemo } from 'react';

// --- 1. Inline FAQ Data ---
const faqCategories = ['General', 'Plans', 'Device', 'Products', 'Service', 'Security Deposit'];

const faqData = [
  {
    category: 'General',
    question: 'Do I need to download an App to use the water purifier?',
    answer: 'No, while the app enhances your experience with remote monitoring and usage statistics, the purifier can operate perfectly fine without it. The app is highly recommended for smart features and alerts.',
  },
  {
    category: 'Device',
    question: 'How do you use IoT to make me feel safe about the water I drink?',
    answer: 'Our IoT system continuously monitors water quality, filter life, and device performance. If any parameter falls below optimal levels, it automatically sends an alert to your device and our service team for proactive maintenance.',
  },
  {
    category: 'General',
    question: 'I am not at home. Can my family still continue to use the water purifier?',
    answer: 'Yes, absolutely. The water purifier functions independently of your presence. The app connection is only for monitoring and control, not for basic usage.',
  },
  {
    category: 'Security Deposit',
    question: 'When will my security deposit be refunded?',
    answer: 'The security deposit is typically refunded within 7-10 business days after the successful uninstallation and inspection of the device at the end of your subscription period.',
  },
  {
    category: 'Plans',
    question: 'What if my Water purifier subscription balance/validity gets over?',
    answer: 'The device will enter a safe mode and pause purification until your subscription is renewed. You will receive multiple automated reminders via SMS and the app before the expiry date.',
  },
  {
    category: 'Plans',
    question: 'I have raised a request for uninstallation. How will my refund amount be calculated?',
    answer: 'Your refund calculation is based on the remaining subscription period, minus a small handling fee. A detailed breakdown will be provided via email upon confirmation of your uninstallation request.',
  },
  {
    category: 'Products',
    question: 'What is the warranty period for the replaceable filters?',
    answer: 'The filters themselves do not have a traditional warranty, as their life depends on usage. However, the service plan guarantees timely, free replacement as scheduled or based on the IoT sensor readings.',
  },
];

// --- 2. Reusable Accordion Item Component ---
const AccordionItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-200">
    <button
      className="flex justify-between items-center w-full py-4 text-left font-medium text-gray-800 hover:text-cyan-600 transition-colors"
      onClick={onClick}
      aria-expanded={isOpen}
    >
      <span>{question}</span>
      <svg
        className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-indigo-600' : 'text-gray-400'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
    {/* Animated opening effect can be achieved using libraries or complex CSS transitions */}
    {isOpen && (
      <div className="pb-4 text-gray-600 transition-all duration-300 ease-in-out">
        <p>{answer}</p>
      </div>
    )}
  </div>
);

// --- 3. Main FAQ Section Component ---
function FaqData() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(null); // Tracks which accordion is open

  // Memoize the filtering logic for performance
  const filteredFaqs = useMemo(() => {
    // Reset open accordion when filter changes
    setActiveIndex(null); 
    
    return faqData
      // 1. Filter by Category
      .filter(faq => activeCategory === 'All' || faq.category === activeCategory)
      // 2. Filter by Search Term
      .filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [activeCategory, searchTerm]);

  // Handle accordion toggling
  const handleAccordionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-black text-center mb-10 mt-12">
        Frequently Asked Questions
      </h2>

      {/* Search Input Section */}
      <div className="mb-8 relative">
        <input
          type="text"
          placeholder="Type a question or keyword to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 text-lg pl-12"
        />
        {/* Search Icon */}
        <svg 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {['All', ...faqCategories].map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setSearchTerm(''); // Optional: Clear search when switching categories
            }}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              activeCategory === category
                ? 'bg-cyan-700 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ List/Results */}
      <div className="bg-white rounded-xl shadow-lg divide-y divide-gray-100">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              // The index of the item in the *filtered* array determines if it's open
              isOpen={activeIndex === index} 
              onClick={() => handleAccordionClick(index)}
            />
          ))
        ) : (
          <p className="p-8 text-center text-lg text-gray-500">
            No matching questions found for {searchTerm} in the **{activeCategory}** category.
          </p>
        )}
      </div>
    </div>
  );
}

export default FaqData;