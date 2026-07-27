"use client";

import React from "react";
import {
  HiOutlineSparkles,
  HiOutlineRocketLaunch,
  HiOutlineLightBulb,
  HiOutlineBookOpen,
  HiOutlineShieldCheck,
  HiOutlineDevicePhoneMobile,
} from "react-icons/hi2";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import ChatBot from "@/components/chat/chat-bot";

interface Highlight {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  github: string;
  linkedin: string;
  facebook: string;
}

const AboutPage: React.FC = () => {
  const highlights: Highlight[] = [
    {
      id: 1,
      title: "ডিজিটাল ক্যাটালগ",
      desc: "এক ক্লিকেই পছন্দসই বই খুঁজে বের করার জন্য দ্রুত ও আধুনিক সার্চ ফিল্টার।",
      icon: <HiOutlineBookOpen className="w-6 h-6 text-[#00BBA6]" />,
      bgColor: "bg-teal-50 dark:bg-teal-950/30",
      borderColor: "border-teal-100 dark:border-teal-900/40",
    },
    {
      id: 2,
      title: "সহজ বুক ইস্যু",
      desc: "লাইনে না দাঁড়িয়ে সরাসরি ড্যাশবোর্ড থেকে বইয়ের জন্য রিকোয়েস্ট করার সুবিধা।",
      icon: <HiOutlineRocketLaunch className="w-6 h-6 text-blue-500" />,
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      borderColor: "border-blue-100 dark:border-blue-900/40",
    },
    {
      id: 3,
      title: "যেকোনো ডিভাইসে এক্সেস",
      desc: "মোবাইল, ট্যাবলেট বা ল্যাপটপ—সব ডিভাইস থেকেই ই-বুক পড়ার চমৎকার অভিজ্ঞতা।",
      icon: <HiOutlineDevicePhoneMobile className="w-6 h-6 text-purple-500" />,
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      borderColor: "border-purple-100 dark:border-purple-900/40",
    },
    {
      id: 4,
      title: "নিরাপদ ও আধুনিক",
      desc: "ব্যবহারকারীর ডেটা সুরক্ষা এবং স্মুথ পারফরম্যান্স নিশ্চিত করতে আধুনিক প্রযুক্তি।",
      icon: <HiOutlineShieldCheck className="w-6 h-6 text-emerald-500" />,
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      borderColor: "border-emerald-100 dark:border-emerald-900/40",
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "সিয়াম আহামেদ",
      role: "Lead Full Stack Developer",
      image: "https://i.postimg.cc/52cv17yb/IMG-2400-JPG-Copy-(2).jpg",
      bio: "MERN Stack এবং আধুনিক ওয়েব টেকনোলজিতে বিশেষজ্ঞ। লাইব্রেরি সিস্টেমের মূল আর্কিটেকচার তৈরিতে নিয়োজিত।",
      github: "https://github.com/ahamedsiammia",
      linkedin: "https://www.linkedin.com/in/siam-ahamed/",
      facebook: "https://www.facebook.com/farhan.ahamed.siam.2024",
    },
    {
      id: 2,
      name: "আরাফাত রহমান",
      role: "UI/UX Designer & Frontend Dev",
      image: "https://i.postimg.cc/TPKKBBvG/wingtilldie-avatar-1577909.jpg",
      bio: "ইউজার-ফ্রেন্ডলি ইন্টারফেস ও সফট রেসপনসিভ ডিজাইন তৈরিতে আগ্রহী। কাস্টমার এক্সপেরিয়েন্স বাড়াতে কাজ করছেন।",
      github: "#",
      linkedin: "#",
      facebook: "#",
    },
    {
      id: 3,
      name: "রায়হান",
      role: "Designer & Cyber Security",
      image: "https://i.postimg.cc/TPKKBBvG/wingtilldie-avatar-1577909.jpg",
      bio: "ড্যাশবোর্ড ম্যানেজমেন্ট ও সিকিউর এপিআই ইন্টিগ্রেশনে দক্ষ। ডেটাবেজ অপটিমাইজেশন নিশ্চিত করেন।",
      github: "#",
      linkedin: "#",
      facebook: "#",
    },
    {
      id: 4,
      name: "মুক্তাদির রহমান",
      role: "Designer",
      image: "https://i.postimg.cc/TPKKBBvG/wingtilldie-avatar-1577909.jpg",
      bio: "ড্যাশবোর্ড ম্যানেজমেন্ট ও সিকিউর এপিআই ইন্টিগ্রেশনে দক্ষ। ডেটাবেজ অপটিমাইজেশন নিশ্চিত করেন।",
      github: "#",
      linkedin: "#",
      facebook: "#",
    },
    {
      id: 5,
      name: "ইসরাত জাহান ইপ্তি",
      role: "Graphic Designer",
      image: "https://i.postimg.cc/TPKKBBvG/wingtilldie-avatar-1577909.jpg",
      bio: "ড্যাশবোর্ড ম্যানেজমেন্ট ও সিকিউর এপিআই ইন্টিগ্রেশনে দক্ষ। ডেটাবেজ অপটিমাইজেশন নিশ্চিত করেন।",
      github: "#",
      linkedin: "#",
      facebook: "#",
    },
    {
      id: 6,
      name: "",
      role: "-",
      image: "https://i.postimg.cc/TPKKBBvG/wingtilldie-avatar-1577909.jpg",
      bio: "",
      github: "#",
      linkedin: "#",
      facebook: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 text-[#00BBA6] font-semibold text-xs sm:text-sm">
            <HiOutlineSparkles className="w-4 h-4" /> আমাদের মূল লক্ষ্য ও পরিচিতি
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-slate-100 leading-tight">
            জ্ঞান অর্জনের পথকে <span className="text-[#00BBA6]">সহজ ও ডিজিটাল</span> করা
          </h1>
          <p className="text-gray-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            স্মার্ট শিক্ষা ব্যবস্থার অংশ হিসেবে আমাদের এই লাইব্রেরি ম্যানেজমেন্ট সিস্টেম। আমরা ঐতিহ্যবাহী বই পড়ার অভিজ্ঞতার সাথে আধুনিক প্রযুক্তির মেলবন্ধন ঘটিয়েছি।
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-[#00BBA6]">
              <HiOutlineLightBulb className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">আমাদের ভিশন (Our Vision)</h2>
            <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
              প্রতিটি শিক্ষার্থীর হাতের নাগালে ডিজিটাল লাইব্রেরির সুবিধা পৌঁছে দেওয়া। যেখানে লাইনে দাঁড়ানো বা সময় নষ্ট না করে সহজেই যেকোনো বই পড়ার বা সংগ্রহের সুযোগ থাকবে।
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-500">
              <HiOutlineRocketLaunch className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">আমাদের মিশন (Our Mission)</h2>
            <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
              আধুনিক প্রযুক্তি ব্যবহার করে বই পরিচালনা ব্যবস্থা অটোমেট করা, রিয়েল-টাইম ক্যাটালগ ট্র্যাক করা এবং পাঠক ও লাইব্রেরিয়ানের মধ্যে একটি সুনির্দিষ্ট ডিজিটাল নেটওয়ার্ক তৈরি করা।
            </p>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-slate-100">সিস্টেমের বিশেষত্ব</h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1">আমাদের প্ল্যাটফর্ম কেন ব্যবহার করবেন?</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h) => (
              <div
                key={h.id}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${h.bgColor} ${h.borderColor}`}>
                  {h.icon}
                </div>
                <h3 className="text-base font-bold text-gray-800 dark:text-slate-100">{h.title}</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[#00BBA6] font-bold text-xs uppercase tracking-wider">Our Creative Team</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-slate-100 mt-1">ডেভেলপমেন্ট টিম</h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1">যাদের পরিশ্রম ও দক্ষতায় তৈরি হয়েছে এই সিস্টেম</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 text-center space-y-4 group"
              >
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-teal-100 dark:border-slate-800 group-hover:border-[#00BBA6] transition-colors shadow-md">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100">{member.name}</h3>
                  <p className="text-xs font-semibold text-[#00BBA6] mt-0.5">{member.role}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 leading-relaxed px-2">{member.bio}</p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <Link href={member.github} target="_blank" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#00BBA6] dark:hover:bg-[#00BBA6] text-gray-600 dark:text-slate-300 hover:text-white flex items-center justify-center transition">
                    <FaGithub className="w-4 h-4" />
                  </Link>
                  <Link href={member.linkedin} target="_blank" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#00BBA6] dark:hover:bg-[#00BBA6] text-gray-600 dark:text-slate-300 hover:text-white flex items-center justify-center transition">
                    <FaLinkedin className="w-4 h-4" />
                  </Link>
                  <Link href={member.facebook} target="_blank" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#00BBA6] dark:hover:bg-[#00BBA6] text-gray-600 dark:text-slate-300 hover:text-white flex items-center justify-center transition">
                    <FaFacebook className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ChatBot></ChatBot>
    </div>
  );
};

export default AboutPage;
