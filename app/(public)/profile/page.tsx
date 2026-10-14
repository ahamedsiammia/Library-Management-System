"use client";

import React, { useState } from "react";
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
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiCheck,
  HiOutlineCamera,
} from "react-icons/hi2";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { uploadProfile } from "@/app/(dashboard)/_actions/fetch-api";
import { setPasswordAction } from "@/app/(auth)/_actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Profile image upload state
  const [uploadingImage, setUploadingImage] = useState(false);

  // Password management states
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Validation rules matching backend SetPasswordZodSchema
  const hasMinLength = newPassword.length >= 8 && newPassword.length <= 20;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[!@#$%^&*]/.test(newPassword);
  const isMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const isPasswordValid =
    hasMinLength && hasUpper && hasLower && hasNumber && hasSpecial && isMatch;

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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("profileImage", file);

      const result = await uploadProfile(formData);
      if (result.success === true) {
        toast.success(result.message || "প্রোফাইল ছবি সফলভাবে আপডেট হয়েছে!");
        router.refresh();
        window.location.reload();
      } else {
        toast.error(result.message || "ছবি আপলোড করতে ব্যর্থ হয়েছে।");
      }
    } catch {
      toast.error("ছবি আপলোডে সমস্যা হয়েছে।");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid) {
      toast.error("অনুগ্রহ করে পাসওয়ার্ডের সকল শর্তাবলী পূরণ করুন।");
      return;
    }

    setSavingPassword(true);
    try {
      const res = await setPasswordAction(newPassword);
      if (res.success) {
        toast.success(res.message || "পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!");
        setNewPassword("");
        setConfirmPassword("");
        setShowPasswordSection(false);
      } else {
        toast.error(res.message || "পাসওয়ার্ড পরিবর্তন করতে ব্যর্থ হয়েছে।");
      }
    } catch {
      toast.error("সার্ভার সমস্যা। পরে আবার চেষ্টা করুন।");
    } finally {
      setSavingPassword(false);
    }
  };

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
            লাইব্রেরি সিস্টেমে সংরক্ষিত আপনার অ্যাকাউন্ট বিবরণী ও নিরাপত্তা সেটিংস
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
              {/* Avatar */}
              <div className="relative h-24 w-24 shrink-0">
                <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white/30 bg-white shadow-lg dark:bg-slate-900">
                  {user?.imageUrl ? (
                    <Image
                      src={user.imageUrl}
                      alt={user.name ?? "Profile"}
                      fill
                      sizes="96px"
                      quality={90}
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl font-extrabold uppercase text-[#00BBA6]">
                      {user.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>

                {/* Camera icon + file input */}
                <label
                  aria-label="প্রোফাইল ছবি পরিবর্তন করুন"
                  className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#00BBA6] text-white shadow-md transition hover:scale-110 hover:bg-teal-700 dark:border-slate-900"
                >
                  {uploadingImage ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <HiOutlineCamera className="h-4 w-4" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingImage}
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
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

          {/* Password Management Collapsible Section */}
          <div className="px-6 pb-6 sm:px-8">
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <HiOutlineLockClosed className="w-5 h-5 text-[#00BBA6]" />
                    পাসওয়ার্ড পরিবর্তন (Password Settings)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    আপনার অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করতে নতুন পাসওয়ার্ড সেট করুন
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPasswordSection(!showPasswordSection)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#00BBA6]/10 text-[#00BBA6] hover:bg-[#00BBA6]/20 transition"
                >
                  {showPasswordSection ? "লুকান" : "পাসওয়ার্ড পরিবর্তন করুন"}
                </button>
              </div>

              {showPasswordSection && (
                <form
                  onSubmit={handlePasswordSubmit}
                  className="bg-slate-50/70 dark:bg-slate-800/40 p-5 rounded-2xl border border-teal-100 dark:border-slate-800 space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* New Password */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                        নতুন পাসওয়ার্ড
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-3.5 pr-10 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#00BBA6]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                          {showPassword ? (
                            <HiOutlineEyeSlash className="w-4 h-4" />
                          ) : (
                            <HiOutlineEye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                        পাসওয়ার্ড নিশ্চিত করুন
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#00BBA6]"
                      />
                    </div>
                  </div>

                  {/* Requirements checklist */}
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[11px] space-y-1 text-slate-500">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                      <span className={`flex items-center gap-1 ${hasMinLength ? "text-teal-600 font-bold" : ""}`}>
                        <HiCheck className={`w-3 h-3 ${hasMinLength ? "text-teal-600" : "text-slate-300"}`} /> ৮-২০ অক্ষর
                      </span>
                      <span className={`flex items-center gap-1 ${hasUpper ? "text-teal-600 font-bold" : ""}`}>
                        <HiCheck className={`w-3 h-3 ${hasUpper ? "text-teal-600" : "text-slate-300"}`} /> ১টি বড় হাতের অক্ষর
                      </span>
                      <span className={`flex items-center gap-1 ${hasLower ? "text-teal-600 font-bold" : ""}`}>
                        <HiCheck className={`w-3 h-3 ${hasLower ? "text-teal-600" : "text-slate-300"}`} /> ১টি ছোট হাতের অক্ষর
                      </span>
                      <span className={`flex items-center gap-1 ${hasNumber ? "text-teal-600 font-bold" : ""}`}>
                        <HiCheck className={`w-3 h-3 ${hasNumber ? "text-teal-600" : "text-slate-300"}`} /> ১টি সংখ্যা
                      </span>
                      <span className={`flex items-center gap-1 ${hasSpecial ? "text-teal-600 font-bold" : ""}`}>
                        <HiCheck className={`w-3 h-3 ${hasSpecial ? "text-teal-600" : "text-slate-300"}`} /> স্পেশাল ক্যারেক্টার
                      </span>
                      <span className={`flex items-center gap-1 ${isMatch ? "text-teal-600 font-bold" : ""}`}>
                        <HiCheck className={`w-3 h-3 ${isMatch ? "text-teal-600" : "text-slate-300"}`} /> উভয়টি মিলেছে
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowPasswordSection(false)}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-semibold"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      disabled={savingPassword || !isPasswordValid}
                      className="px-5 py-2 bg-[#00BBA6] hover:bg-teal-600 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      {savingPassword ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>সংরক্ষণ হচ্ছে...</span>
                        </>
                      ) : (
                        <span>নতুন পাসওয়ার্ড সংরক্ষণ করুন</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-6 pb-8 flex flex-wrap gap-3">
            {(user.role === "MODARATOR" || user.role === "LIBRARYAN" || user.role === "ADMIN") && (
              <Link
                href="/dashboard"
                className="px-5 py-2.5 bg-[#00BBA6] hover:bg-teal-600 text-white font-bold rounded-xl text-xs transition shadow-md"
              >
                ড্যাশবোর্ডে যান →
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
