"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineQuestionMarkCircle,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/60 dark:bg-slate-950 px-4 py-12 transition-colors duration-300">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Animated Badge & Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-block"
        >
          <div className="w-28 h-28 mx-auto rounded-3xl bg-[#00BBA6]/10 dark:bg-[#00BBA6]/20 border border-[#00BBA6]/30 flex items-center justify-center text-[#00BBA6] shadow-xl">
            <HiOutlineExclamationTriangle className="w-14 h-14" />
          </div>
          <span className="absolute -bottom-2 -right-2 px-3 py-1 bg-[#00BBA6] text-white text-xs font-black rounded-full shadow-md">
            404
          </span>
        </motion.div>

        {/* Text Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-2"
        >
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Page <span className="text-[#00BBA6]">Not Found</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            দুঃখিত! আপনি যে পেজটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা অস্তিত্ব নেই।
          </p>
        </motion.div>

        {/* Navigation Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
        >
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#00BBA6] hover:bg-teal-600 text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md shadow-teal-500/20"
          >
            <HiOutlineHome className="w-4 h-4" />
            <span>হোম পেজে যান</span>
          </Link>

          <Link
            href="/books"
            className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm"
          >
            <HiOutlineBookOpen className="w-4 h-4 text-[#00BBA6]" />
            <span>বই ক্যাটালগ দেখুন</span>
          </Link>
        </motion.div>

        {/* Support Help Link */}
        <p className="text-xs text-slate-400 dark:text-slate-500 pt-4">
          কোনো সাহায্য প্রয়োজন?{" "}
          <Link
            href="/support"
            className="text-[#00BBA6] font-bold hover:underline inline-flex items-center gap-1"
          >
            <HiOutlineQuestionMarkCircle className="w-3.5 h-3.5 inline" /> সাপোর্ট টিমের সাথে যোগাযোগ করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
