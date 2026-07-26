"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

// If hi2 icons path varies, we import directly from react-icons/hi2
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
    <div className="min-h-screen bg-slate-50/70 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Hero Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl overflow-hidden"
        >
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -left-10 -top-10 w-64 h-64 bg-teal-400/20 rounded-full blur-2xl" />

          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider">
              <HiSparkles className="w-4 h-4 text-amber-300" /> ২৪/৭ ডিজিটাল হেল্পডেস্ক
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              আমরা কীভাবে আপনাকে <span className="text-amber-300">সাহায্য করতে পারি?</span>
            </h1>
            <p className="text-teal-50 text-sm sm:text-base max-w-2xl mx-auto font-medium">
              লাইব্রেরি কার্ড, বই ইস্যু, অনলাইন রিসোর্স বা অ্যাকাউন্টের যেকোনো সমস্যায় আমরা আপনার পাশে আছি। নিচের মাধ্যমগুলোতে সহজেই আমাদের টিমকে পান।
            </p>
          </div>
        </motion.div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white p-6 rounded-3xl border border-teal-100/80 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#00BBA6] flex items-center justify-center text-2xl shrink-0 shadow-inner">
              <HiPhone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">জরুরি হেল্পলাইন</h3>
              <p className="text-xs text-gray-500 mt-1">অফিস চলাকালীন সরাসরি কল করুন</p>
              <p className="text-sm font-extrabold text-[#00BBA6] mt-2">+880 1700-000000</p>
              <span className="text-[11px] text-gray-400 font-medium">রবি - বৃহ (সকাল ৯টা - বিকাল ৫টা)</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white p-6 rounded-3xl border border-teal-100/80 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#00BBA6] flex items-center justify-center text-2xl shrink-0 shadow-inner">
              <HiEnvelope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">ইমেইল সাপোর্ট</h3>
              <p className="text-xs text-gray-500 mt-1">যেকোনো প্রশ্ন বা ফিডব্যাকের জন্য</p>
              <p className="text-sm font-extrabold text-[#00BBA6] mt-2">support@lms-library.edu</p>
              <span className="text-[11px] text-gray-400 font-medium">রেসপন্স টাইম: ১২ ঘন্টার মধ্যে</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white p-6 rounded-3xl border border-teal-100/80 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#00BBA6] flex items-center justify-center text-2xl shrink-0 shadow-inner">
              <HiMapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">লাইব্রেরি ডেস্ক</h3>
              <p className="text-xs text-gray-500 mt-1">সরাসরি লাইব্রেরিয়ানের কাছে আসুন</p>
              <p className="text-xs font-bold text-gray-700 mt-2">ময়মনসিংহ পলিটেকনিক ইন্সটিটিউট</p>
              <span className="text-[11px] text-gray-400 font-medium">মেন ভবন, ২য় তলা, লাইব্রেরি রুম-২০৪</span>
            </div>
          </motion.div>
        </div>

        {/* Contact Form & Office Hours Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 cols: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-teal-100/80 shadow-md space-y-6"
          >
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-[#00BBA6] uppercase tracking-wider">মেসেজ পাঠান</span>
              <h2 className="text-2xl font-extrabold text-gray-800 mt-1">সাপোর্ট টিকেট ও ইনকোয়ারি</h2>
              <p className="text-xs text-gray-500 mt-1">আপনার যেকোনো সমস্যা বা জিজ্ঞাসা জানিয়ে নিচের ফর্মটি পূরণ করুন।</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">আপনার নাম *</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="উদা: সিয়াম আহমেদ"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#00BBA6] focus:bg-white transition"
                    />
                    <HiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">ইমেইল অ্যাড্রেস *</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#00BBA6] focus:bg-white transition"
                    />
                    <HiEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">রোল নম্বর (যদি থাকে)</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="roll"
                      value={formData.roll}
                      onChange={handleInputChange}
                      placeholder="উদা: 615201"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#00BBA6] focus:bg-white transition"
                    />
                    <HiAcademicCap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">বিষয় শ্রেণী</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#00BBA6] focus:bg-white transition font-medium"
                  >
                    <option value="General Inquiry">সাধারণ জিজ্ঞাসা</option>
                    <option value="Book Issue">বই ইস্যু ও রিটার্ন</option>
                    <option value="Account Issue">অ্যাঙ্কউন্ট ও লগইন সমস্যা</option>
                    <option value="Book Request">নতুন বইয়ের অনুরোধ</option>
                    <option value="Fine/Penalty">বিলম্ব ফি সংক্রান্ত</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">বিষয় (Subject)</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="সংক্ষেপে সমস্যার বিষয় লিখুন"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#00BBA6] focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">বিস্তারিত বিবরণ *</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="আপনার সমস্যা বা প্রশ্নের বিস্তারিত বিবরণ লিখুন..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#00BBA6] focus:bg-white transition resize-none"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#00BBA6] hover:bg-teal-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-sm disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <HiPaperAirplane className="w-4 h-4 rotate-45" />
                    <span>মেসেজ পাঠান</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Right 5 cols: FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-teal-100/80 shadow-md space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <HiQuestionMarkCircle className="w-6 h-6 text-[#00BBA6]" />
                <div>
                  <h2 className="text-xl font-extrabold text-gray-800">সাধারণ প্রশ্নাবলী (FAQ)</h2>
                  <p className="text-xs text-gray-500">সচরাচর জিজ্ঞাসিত প্রশ্নের দ্রুত উত্তর</p>
                </div>
              </div>

              <div className="space-y-3">
                {FAQ_ITEMS.map((item, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="border border-slate-100 rounded-2xl overflow-hidden transition-all bg-slate-50/50"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-gray-800 hover:text-[#00BBA6] transition"
                      >
                        <span>{item.question}</span>
                        <HiChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform duration-300 shrink-0 ${
                            isOpen ? "rotate-180 text-[#00BBA6]" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <p className="px-4 pb-4 pt-1 text-xs text-gray-600 border-t border-slate-100/80 leading-relaxed">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quality Commitment Card */}
            <div className="bg-gradient-to-br from-slate-900 to-teal-950 p-6 rounded-3xl text-white space-y-3 shadow-lg">
              <div className="flex items-center gap-2">
                <HiShieldCheck className="w-6 h-6 text-[#00BBA6]" />
                <h3 className="font-bold text-sm">আমাদের প্রতিশ্রুতি</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                আপনার প্রতিটি অনুসন্ধান আমাদের কাছে গুরুত্বপূর্ণ। আমরা সর্বোচ্চ দ্রুততা ও নির্ভরযোগ্যতার সাথে সমাধান প্রদান করতে অঙ্গীকারবদ্ধ।
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
