import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react'; // lucide-react আইকন ব্যবহার করা হয়েছে

const FAQSection = () => {
  // কোন প্রশ্নটি ওপেন আছে তার স্টেট (ডিফল্টভাবে প্রথমটি ওপেন থাকবে, চাইলে null দিতে পারেন)
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "লাইব্রেরি থেকে বই কীভাবে ধার নেওয়া যায়?",
      answer: "আপনার একাউন্টে লগইন করে পছন্দের বইটির বিস্তারিত পেজে যান এবং 'Request Book' বাটনে ক্লিক করুন। লাইব্রেরিয়ান রিকোয়েস্ট অ্যাপ্রুভ করলে আপনি লাইব্রেরি কাউন্টার থেকে বই সংগ্রহ করতে পারবেন।"
    },
    {
      question: "একটি বই কতদিনের জন্য কাছে রাখা যাবে?",
      answer: "সাধারণত একজন শিক্ষার্থী একসাথে সর্বোচ্চ ১৪ দিনের জন্য বই নিজের কাছে রাখতে পারবে। প্রয়োজনে মেয়াদ শেষ হওয়ার আগেই অনলাইন থেকে রিনিউ করার সুযোগ রয়েছে।"
    },
    {
      question: "ই-বুক কি ডাউনলোড করে অফলাইনে পড়া যাবে?",
      answer: "হ্যাঁ, আমাদের ডিজিটাল প্ল্যাটফর্মে যে বইগুলোর 'PDF/Digital Copy' দেওয়া আছে, সেগুলো আপনি সরাসরি অ্যাপ বা ওয়েবসাইট থেকে ডাউনলোড করে যেকোনো সময় পড়তে পারবেন।"
    },
    {
      question: "বই জমা দিতে দেরি হলে কি কোনো ফাইন বা জরিমানা আছে?",
      answer: "মেয়াদ পার হয়ে গেলে প্রতিদিনের জন্য নির্দিষ্ট হারে লেট ফি যুক্ত হবে। তাই মেয়াদ শেষ হওয়ার আগেই অনলাইন থেকে বইটি রিনিউ করুন অথবা সরাসরি লাইব্রেরিতে জমা দিন।"
    }
  ];

  const toggleFAQ = (index) => {
    // একই প্রশ্নে আবার ক্লিক করলে বন্ধ হবে, অন্যটায় ক্লিক করলে সেটা খুলবে
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Frequently Asked <span className="text-[#00BBA6]">Questions</span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          লাইব্রেরি সার্ভিস এবং ব্যবহার বিধি সম্পর্কিত কিছু সাধারণ প্রশ্নের উত্তর নিচে পেয়ে যাবেন।
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`border border-teal-100 rounded-2xl transition-all duration-300 overflow-hidden ${
                isOpen 
                  ? 'bg-teal-50/40 shadow-md border-teal-300' 
                  : 'bg-white shadow-sm hover:border-teal-200'
              }`}
            >
              {/* Question / Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 transition-colors focus:outline-none"
              >
                <span className="text-base md:text-lg text-gray-700">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#00BBA6] transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              {/* Answer / Body */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100 p-5 pt-0' : 'grid-rows-[0fr] opacity-0 p-0'
                }`}
              >
                <div className="overflow-hidden text-gray-600 text-sm md:text-base leading-relaxed border-t border-teal-100/60 pt-3">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;