"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  HiOutlineKey,
  HiOutlineLockClosed,
  HiOutlineArrowLeft,
  HiOutlineEnvelope,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiCheck,
} from "react-icons/hi2";
import { resetPasswordAction } from "../_actions/auth.actions";
import { Loader2 } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(defaultEmail);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultEmail) {
      setEmail(defaultEmail);
    }
  }, [defaultEmail]);

  // Validation rules matching backend ResetPasswordZodSchema
  const hasMinLength = newPassword.length >= 8 && newPassword.length <= 20;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[!@#$%^&*]/.test(newPassword);
  const isMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const isPasswordValid =
    hasMinLength && hasUpper && hasLower && hasNumber && hasSpecial && isMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !otp.trim() || !newPassword) {
      toast.error("সকল তথ্য সঠিকভাবে পূরণ করুন।");
      return;
    }

    if (otp.trim().length !== 6) {
      toast.error("OTP কোডটি অবশ্যই ৬ সংখ্যার হতে হবে।");
      return;
    }

    if (!isPasswordValid) {
      toast.error("পাসওয়ার্ডের শর্তাবলী পূরণ করুন এবং উভয় পাসওয়ার্ড মিলিয়ে দেখুন।");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPasswordAction({
        email: email.trim(),
        otp: otp.trim(),
        newPassword,
      });

      if (res.success) {
        toast.success(res.message || "পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!");
        router.push("/login");
      } else {
        toast.error(res.message || "পাসওয়ার্ড রিসেট ব্যর্থ হয়েছে।");
      }
    } catch {
      toast.error("সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white/80 dark:bg-card/80 backdrop-blur-md rounded-2xl shadow-xl border border-teal-100/50 dark:border-border p-6 md:p-8">
      <div className="mb-6">
        <Link
          href="/forgot-password"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700 dark:text-[#00BBA6] transition mb-4"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          <span>আগের পেজে ফিরে যান</span>
        </Link>
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-foreground">
          নতুন পাসওয়ার্ড সেট করুন
        </h2>
        <p className="text-slate-500 dark:text-muted-foreground text-xs sm:text-sm mt-1">
          আপনার ইমেইলে পাঠানো ৬ সংখ্যার OTP দিন এবং একটি শক্তিশালী পাসওয়ার্ড তৈরি করুন।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-muted-foreground mb-1">
            ইমেইল
          </label>
          <div className="relative">
            <HiOutlineEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@library.edu"
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-border bg-white/70 dark:bg-secondary text-slate-900 dark:text-foreground text-sm focus:outline-none focus:border-teal-500 transition-all"
            />
          </div>
        </div>

        {/* OTP */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-muted-foreground mb-1">
            ৬ সংখ্যার OTP কোড
          </label>
          <div className="relative">
            <HiOutlineKey className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              required
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              className="w-full pl-10 pr-4 py-2 tracking-widest font-mono text-center text-lg rounded-xl border border-slate-200 dark:border-border bg-white/70 dark:bg-secondary text-slate-900 dark:text-foreground focus:outline-none focus:border-teal-500 transition-all"
            />
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-muted-foreground mb-1">
            নতুন পাসওয়ার্ড
          </label>
          <div className="relative">
            <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2 rounded-xl border border-slate-200 dark:border-border bg-white/70 dark:bg-secondary text-slate-900 dark:text-foreground text-sm focus:outline-none focus:border-teal-500 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
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
          <label className="block text-xs font-bold text-slate-700 dark:text-muted-foreground mb-1">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <div className="relative">
            <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-border bg-white/70 dark:bg-secondary text-slate-900 dark:text-foreground text-sm focus:outline-none focus:border-teal-500 transition-all"
            />
          </div>
        </div>

        {/* Validation Checklist */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-secondary/40 border border-slate-100 dark:border-border text-[11px] space-y-1 text-slate-500 dark:text-muted-foreground">
          <p className="font-bold text-slate-700 dark:text-foreground mb-1">পাসওয়ার্ড শর্তাবলী:</p>
          <div className="grid grid-cols-2 gap-1">
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
              <HiCheck className={`w-3 h-3 ${hasSpecial ? "text-teal-600" : "text-slate-300"}`} /> স্পেশাল ক্যারেক্টার (!@#$%^&*)
            </span>
            <span className={`flex items-center gap-1 ${isMatch ? "text-teal-600 font-bold" : ""}`}>
              <HiCheck className={`w-3 h-3 ${isMatch ? "text-teal-600" : "text-slate-300"}`} /> পাসওয়ার্ড ম্যাচ করেছে
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !isPasswordValid}
          className="w-full mt-2 bg-[#00BBA6] hover:bg-teal-600 text-white font-bold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>পাসওয়ার্ড পরিবর্তন হচ্ছে...</span>
            </>
          ) : (
            <span>পাসওয়ার্ড সংরক্ষণ করুন</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md p-8 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#00BBA6] animate-spin" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
