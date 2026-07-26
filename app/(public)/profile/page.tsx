"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineAcademicCap,
  HiOutlineBuildingOffice,
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineSparkles,
  HiOutlineIdentification,
} from "react-icons/hi2";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/60 dark:bg-slate-950 gap-3">
        <Loader2 className="w-9 h-9 text-[#00BBA6] animate-spin" />
        <p className="text-slate-500 text-sm font-medium">প্রোফাইল লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/60 dark:bg-slate-950 px-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-xl">
          <HiOutlineUser className="w-16 h-16 mx-auto text-[#00BBA6]" />
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
            লগইন প্রয়োজন
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            আপনার প্রোফাইল দেখতে অনুগ্রহ করে আপনার অ্যাকাউন্টে লগইন করুন।
          </p>
          <Link
            href="/register"
            className="inline-block w-full py-3 bg-[#00BBA6] hover:bg-teal-600 text-white font-bold rounded-xl text-sm transition shadow-md"
          >
            লগইন / রেজিস্টার করুন
          </Link>
        </div>
      </div>
    );
  }

  const roleLabel =
    user.role === "MODARATOR"
      ? "Moderator"
      : user.role === "LIBRARYAN"
      ? "Librarian"
      : "Student / Patron";

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 text-[#00BBA6] font-semibold text-xs">
            <HiOutlineSparkles className="w-4 h-4" /> আপনার ব্যক্তিগত তথ্য
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100">
            User <span className="text-[#00BBA6]">Profile</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            লাইব্রেরি সিস্টেমে সংরক্ষিত আপনার অ্যাকাউন্ট বিবরণী
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#00BBA6] via-teal-600 to-teal-800 p-8 text-white relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-900 text-[#00BBA6] flex items-center justify-center text-4xl font-extrabold shadow-lg shrink-0 uppercase border-4 border-white/30">
                {user.name?.charAt(0) || "U"}
              </div>
              <div className="text-center sm:text-left space-y-1">
                <h2 className="text-2xl font-extrabold">{user.name}</h2>
                <p className="text-teal-100 text-sm">{user.email}</p>
                <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/30">
                    {roleLabel}
                  </span>
                  <span className="bg-emerald-500/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <HiOutlineShieldCheck className="w-3.5 h-3.5" /> Active Account
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* User Details Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <HiOutlineUser className="w-4 h-4 text-[#00BBA6]" /> পূর্ণ নাম
              </span>
              <p className="text-slate-800 dark:text-slate-100 font-bold text-base">
                {user.name}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <HiOutlineEnvelope className="w-4 h-4 text-[#00BBA6]" /> ইমেইল ঠিকানা
              </span>
              <p className="text-slate-800 dark:text-slate-100 font-bold text-base">
                {user.email}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <HiOutlineAcademicCap className="w-4 h-4 text-[#00BBA6]" /> রোল নম্বর
              </span>
              <p className="text-slate-800 dark:text-slate-100 font-bold text-base">
                {user.roll || "—"}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <HiOutlineBuildingOffice className="w-4 h-4 text-[#00BBA6]" /> ইনস্টিটিউটের নাম
              </span>
              <p className="text-slate-800 dark:text-slate-100 font-bold text-base">
                {user.instituteName || "ময়মনসিংহ পলিটেকনিক ইন্সটিটিউট"}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <HiOutlineClock className="w-4 h-4 text-[#00BBA6]" /> শিফট / সেমিস্টার
              </span>
              <p className="text-slate-800 dark:text-slate-100 font-bold text-base">
                {user.shift || "Morning"} Shift ({user.semester || "6th"} Semester)
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <HiOutlineIdentification className="w-4 h-4 text-[#00BBA6]" /> রোল / অনুমতি
              </span>
              <p className="text-slate-800 dark:text-slate-100 font-bold text-base">
                {roleLabel}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-6 pb-8 flex flex-wrap gap-3">
            {user.role === "MODARATOR" && (
              <Link
                href="/dashboard"
                className="px-5 py-2.5 bg-[#00BBA6] hover:bg-teal-600 text-white font-bold rounded-xl text-xs transition shadow-md"
              >
                Moderator Dashboard এ যান →
              </Link>
            )}
            <Link
              href="/books"
              className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs transition"
            >
              বই ক্যাটালগ দেখুন
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
