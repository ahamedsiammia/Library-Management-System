import React from 'react';
import { 
  HiOutlineBookOpen, 
  HiOutlineClock, 
  HiOutlineBellAlert, 
  HiOutlineShieldCheck 
} from 'react'; // React Icons ব্যবহার করা হয়েছে
import { HiOutlineBookOpen as BookIcon, HiOutlineClock as ClockIcon, HiOutlineBell as BellIcon, HiOutlineShieldCheck as ShieldIcon } from 'react-icons/hi2';

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "বিশাল ডিজিটাল কালেকশন",
      description: "প্রোগ্রামিং, ইঞ্জিনিয়ারিং ও সাহিত্যসহ হাজারো বই ও ই-বুক এক জায়গায় ডিজিটালি খোঁজার সুবিধা।",
      icon: <BookIcon className="w-7 h-7 text-[#00BBA6]" />,
      bg: "bg-blue-50/70",
      border: "border-blue-100"
    },
    {
      id: 2,
      title: "২৪/৭ এক্সেস ও রিডিং",
      description: "যেকোনো সময়, যেকোনো স্থান থেকে বই সার্চ, বুকমার্ক এবং ডিজিটাল কপি সহজে পড়ার সুযোগ।",
      icon: <ClockIcon className="w-7 h-7 text-[#00BBA6]" />,
      bg: "bg-pink-50/70",
      border: "border-pink-100"
    },
    {
      id: 3,
      title: "স্মার্ট রিমাইন্ডার সিস্টেম",
      description: "বই জমাদান বা রিনিউ করার তাগিদ পেতে অটোমেটেড ইমেইল ও ড্যাশবোর্ড নোটিফিকেশন সিস্টেম।",
      icon: <BellIcon className="w-7 h-7 text-[#00BBA6]" />,
      bg: "bg-amber-50/70",
      border: "border-amber-100"
    },
    {
      id: 4,
      title: "দ্রুত ও সহজ বুক ইস্যু",
      description: "লাইব্রেরিতে দীর্ঘ লাইনে না দাঁড়িয়ে এক ক্লিকেই অনলাইনে বই রিজার্ভ বা রিকোয়েস্ট করার সুবিধা।",
      icon: <ShieldIcon className="w-7 h-7 text-[#00BBA6]" />,
      bg: "bg-emerald-50/70",
      border: "border-emerald-100"
    }
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Why <span className="text-[#00BBA6]">Choose Us</span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          আমাদের ডিজিটাল লাইব্রেরি প্ল্যাটফর্ম কেন আপনার পড়ালেখা ও বই ব্যবস্থাপনাকে করবে আরও সহজ ও আধুনিক।
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-2xl ${item.bg} border ${item.border} shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-start`}
          >
            {/* Icon Wrapper */}
            <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm mb-5">
              {item.icon}
            </div>

            {/* Title & Description */}
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;