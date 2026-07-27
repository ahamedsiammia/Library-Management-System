"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  HiPhone,
  HiEnvelope,
  HiMapPin,
  HiClock,
  HiQuestionMarkCircle,
  HiChatBubbleLeftRight,
  HiBookOpen,
  HiSparkles,
  HiPaperAirplane,
  HiShieldCheck,
  HiUser,
  HiAcademicCap,
  HiCheckCircle,
  HiChevronDown,
} from "react-icons/hi2";
import ChatBot from "@/components/chat/chat-bot";

const FAQ_ITEMS = [
  {
    question: "বই কীভাবে ধার নিতে হয়?",
    answer:
      "ডিজিটাল লাইব্রেরি পোর্টালে লগইন করার পর 'Explore All Books' পেজে যান। আপনার পছন্দের বই সিলেক্ট করে 'অনুরোধ' বোতামে ক্লিক করুন। লাইব্রেরিয়ান অনুমোদন করার পর লাইব্রেরি কাউন্টার থেকে বইটি সংগ্রহ করতে পারবেন।",
  },
  {
    question: "একটি বই কতদিনের জন্য ধার নেওয়া যায়?",
    answer:
      "সাধারণত একজন শিক্ষার্থী একসাথে সর্বোচ্চ ৩টি বই ১৪ দিনের জন্য ধার নিতে পারেন। নির্ধারিত সময়ের মধ্যে বই ফেরত না দিলে বা রিনিউ না করলে নিয়ম অনুযায়ী বিলম্ব ফি প্রযোজ্য হবে।",
  },
  {
    question: "অনলাইনে বইয়ের মেয়াদ কীভাবে বাড়ানো (Renew) যায়?",
    answer:
      "মেয়াদ শেষ হওয়ার ২ দিন পূর্বে আপনার ইউজার ড্যাশবোর্ডে গিয়ে 'Issued Books' সেকশন থেকে 'Renew Request' অপশন ব্যবহার করতে পারবেন। যদি অন্য কেউ সেই বইয়ের জন্য রিকোয়েস্ট না করে থাকে, তবে মেয়াদ আরও ৭ দিন বাড়ানো হবে।",
  },
  {
    question: "পাসওয়ার্ড ভুলে গেলে করণীয় কী?",
    answer:
      "লগইন পেজের 'Forgot Password' লিঙ্কে ক্লিক করে অথবা আমাদের সাপোর্ট টিমের সাথে আপনার রোল নম্বর ও ইনস্টিটিউট ইমেইল শেয়ার করে পাসওয়ার্ড রিসেট করতে পারবেন।",
  },
  {
    question: "লাইব্রেরির খোলা থাকার সময়সূচী কী?",
    answer:
      "রবিবার থেকে বৃহস্পতিবার সকাল ৯:০০ টা থেকে বিকাল ৫:০০ টা পর্যন্ত লাইব্রেরি খোলা থাকে। শুক্রবার ও শনিবার এবং সরকারি ছুটির দিনে লাইব্রেরি বন্ধ থাকে।",
  },
];

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roll: "",
    category: "General Inquiry",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("অনুগ্রহ করে আপনার নাম, ইমেইল এবং বার্তা সঠিকভাবে লিখুন।");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("আপনার বার্তা সফলভাবে পাঠানো হয়েছে! দ্রুততম সময়ে আমাদের টিম আপনার সাথে যোগাযোগ করবে।");
      setFormData({
        name: "",
        email: "",
        roll: "",
        category: "General Inquiry",
        subject: "",
        message: "",
      });
    }, 1200);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 text-[#00BBA6] font-semibold text-xs sm:text-sm">
            <HiSparkles className="w-4 h-4" /> ২৪/৭ হেল্প ডেস্ক ও সহায়তা কেন্দ্র
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-slate-100 leading-tight">
            আমরা আপনাকে <span className="text-[#00BBA6]">সহায়তা</span> করতে প্রস্তুত
          </h1>
          <p className="text-gray-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            লাইব্রেরি সার্ভিস, বই ইস্যু, ডিজিটাল ক্যাটালগ বা অন্য যেকোনো জিজ্ঞাসায় আমাদের টিম আপনার পাশে রয়েছে। FAQ দেখুন অথবা সরাসরি বার্তা পাঠান।
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: HiEnvelope,
              title: "ইমেইল সাপোর্ট",
              detail: "support@library.edu.bd",
              sub: "২৪ ঘণ্টার মধ্যে উত্তর দেয়া হয়",
              color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/40",
            },
            {
              icon: HiPhone,
              title: "হেল্পলাইন নম্বর",
              detail: "+৮৮০ ১৭০০-০০০০০০",
              sub: "রবি-বৃহস্পতি (সকাল ৯টা - বিকাল ৫টা)",
              color: "text-teal-600 dark:text-[#00BBA6] bg-teal-50 dark:bg-teal-950/30 border-teal-100 dark:border-teal-900/40",
            },
            {
              icon: HiMapPin,
              title: "লাইব্রেরি লোকেশন",
              detail: "কেন্দ্রীয় ভবন (২য় তলা)",
              sub: "ময়মনসিংহ পলিটেকনিক ইন্সটিটিউট",
              color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900/40",
            },
            {
              icon: HiClock,
              title: "অফিসিয়াল সময়সূচী",
              detail: "সকাল ৯:০০ - বিকাল ৫:০০",
              sub: "শুক্রবার ও শনিবার বন্ধ",
              color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/40",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${item.color}`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800 dark:text-slate-100">{item.title}</h3>
                  <p className="text-sm font-semibold text-[#00BBA6] mt-1">{item.detail}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-4 pt-3 border-t border-slate-50 dark:border-slate-800">
                {item.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main Section: FAQ + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* FAQ Accordion */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <HiQuestionMarkCircle className="w-6 h-6 text-[#00BBA6]" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100">
                সাধারণত জিজ্ঞাসিত <span className="text-[#00BBA6]">প্রশ্নাবলী (FAQ)</span>
              </h2>
            </div>

            <div className="space-y-4">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.question}
                    className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-gray-800 dark:text-slate-200 hover:text-[#00BBA6] dark:hover:text-[#00BBA6] transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-teal-50 dark:bg-teal-950/50 text-[#00BBA6] text-xs font-extrabold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        {faq.question}
                      </span>
                      <HiChevronDown
                        className={`w-5 h-5 text-gray-400 dark:text-slate-500 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[#00BBA6]" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-800/60 mt-1">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direct Support Ticket Form */}
          <div className="lg:col-span-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <HiChatBubbleLeftRight className="w-6 h-6 text-[#00BBA6]" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">মেসেজ পাঠান</h2>
                  <p className="text-xs text-gray-500 dark:text-slate-400">সরাসরি সাপোর্ট টিমের সাথে যোগাযোগের ফর্ম</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">আপনার নাম *</label>
                    <div className="relative">
                      <HiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 w-4 h-4" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="আপনার নাম লিখুন"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#00BBA6] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">ইমেইল ঠিকানা *</label>
                    <div className="relative">
                      <HiEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 w-4 h-4" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@gmail.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#00BBA6] transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">রোল / আই ডি নম্বর</label>
                    <div className="relative">
                      <HiAcademicCap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 w-4 h-4" />
                      <input
                        type="text"
                        name="roll"
                        value={formData.roll}
                        onChange={handleInputChange}
                        placeholder="উদাহরণ: 615201"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#00BBA6] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">বিষয়শ্রেণী (Category)</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-gray-800 dark:text-slate-100 focus:outline-none focus:border-[#00BBA6] transition"
                    >
                      <option value="General Inquiry">সাধারণ জিজ্ঞাসা</option>
                      <option value="Book Request Issue">বই ইস্যু সংক্রান্ত সমস্যা</option>
                      <option value="Account Access">একাউন্ট সমস্যা</option>
                      <option value="Fine & Penalty">ফাইন ও পেনাল্টি</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">বিষয় (Subject)</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="আপনার মেসেজের সংক্ষিপ্ত বিষয়"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#00BBA6] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">বিস্তারিত বার্তা *</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="আপনার সমস্যা বা বার্তাটি স্পষ্টভাবে লিখুন..."
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#00BBA6] transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#00BBA6] hover:bg-teal-600 text-white font-bold rounded-xl text-sm transition shadow-md shadow-teal-500/20 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <HiPaperAirplane className="w-4 h-4 rotate-45" />
                      <span>মেসেজ পাঠান</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ChatBot></ChatBot>
    </div>
  );
}
