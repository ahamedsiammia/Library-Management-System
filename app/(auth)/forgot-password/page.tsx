"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HiOutlineEnvelope, HiOutlineArrowLeft } from "react-icons/hi2";
import { forgotPasswordAction } from "../_actions/auth.actions";
import { Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("অনুগ্রহ করে আপনার ইমেইল প্রদান করুন।");
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPasswordAction(email.trim());
      if (res.success) {
        toast.success(res.message);
        router.push(`/reset-password?email=${encodeURIComponent(email.trim())}`);
      } else {
        toast.error(res.message);
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
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700 dark:text-[#00BBA6] transition mb-4"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          <span>লগইনে ফিরে যান</span>
        </Link>
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-foreground">
          পাসওয়ার্ড ভুলে গেছেন?
        </h2>
        <p className="text-slate-500 dark:text-muted-foreground text-xs sm:text-sm mt-1">
          আপনার অ্যাকাউন্টের সাথে যুক্ত ইমেইল দিন। আমরা একটি ৬ সংখ্যার ভেরিফিকেশন কোড (OTP) পাঠাবো।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-muted-foreground mb-1.5">
            ইমেইল অ্যাড্রেস
          </label>
          <div className="relative">
            <HiOutlineEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@library.edu"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-border bg-white/70 dark:bg-secondary text-slate-900 dark:text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-[#00BBA6] hover:bg-teal-600 text-white font-bold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>কোড পাঠানো হচ্ছে...</span>
            </>
          ) : (
            <span>OTP কোড পাঠান</span>
          )}
        </button>
      </form>
    </div>
  );
}
