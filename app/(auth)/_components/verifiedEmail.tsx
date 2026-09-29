"use client";

import { useState } from "react";
import {
  HiOutlineMail,
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
} from "react-icons/hi";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { verifyEmail } from "../_actions/verifiEmail";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
const router = useRouter()
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await verifyEmail(email , otp)
    if (data?.success === true) {
            toast.success(data.message)
      router.push("/books");
    }
    if(data.success === false){
        toast.error(data.message)
        router.push("/register")
    }
  };

  return (
    <div>

      {/* Background Decorations */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#00BBA6]/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative w-full max-w-lg">

        {/* Main Card */}
        <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_25px_70px_-25px_rgba(15,118,110,0.25)]">

          {/* Top Header */}
          <div className="relative overflow-hidden bg-linear-to-br from-[#00BBA6] via-[#08A895] to-[#0F766E] px-7 pb-10 pt-8 text-white">

            {/* Header Decorations */}
            <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full border-[30px] border-white/5" />
            <div className="absolute -bottom-24 -left-16 h-48 w-48 rounded-full border-[25px] border-white/5" />

            <div className="relative">

              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur-sm">
                <HiOutlineShieldCheck className="h-8 w-8 text-white" />
              </div>

              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-teal-100">
                    Account Security
                  </p>

                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Verify your email
                  </h1>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-teal-50">
                    Confirm your email address to securely activate your
                    Library Management System account.
                  </p>
                </div>

                {/* Security Badge */}
                <div className="hidden shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm sm:flex sm:items-center sm:gap-1.5">
                  <HiOutlineLockClosed className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-semibold">
                    Secure
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* Form Area */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 px-6 py-7 sm:px-8 sm:py-9"
          >

            {/* Email */}
            <div>
              <div className="mb-2.5 flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <span className="text-[11px] font-medium text-slate-400">
                  Required
                </span>
              </div>

              <div className="group relative">
                <HiOutlineMail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#00BBA6]" />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-12 pr-4 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#00BBA6] focus:bg-white focus:ring-4 focus:ring-[#00BBA6]/10"
                />
              </div>
            </div>

            {/* OTP */}
            <div>

              <div className="mb-2.5 flex items-center justify-between">
                <label
                  htmlFor="otp"
                  className="text-sm font-semibold text-slate-700"
                >
                  Verification Code
                </label>

                <button
                  type="button"
                  className="text-xs font-bold text-[#00A991] transition-colors hover:text-[#0F766E]"
                >
                  Resend code
                </button>
              </div>

              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                maxLength={6}
                inputMode="numeric"
                placeholder="000000"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-4 text-center text-2xl font-bold tracking-[0.65em] text-slate-700 outline-none transition-all duration-200 placeholder:text-base placeholder:font-medium placeholder:tracking-[0.3em] placeholder:text-slate-300 hover:border-slate-300 focus:border-[#00BBA6] focus:bg-white focus:ring-4 focus:ring-[#00BBA6]/10"
              />

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                <div className="h-1.5 w-1.5 rounded-full bg-[#00BBA6]" />
                <span>
                  Enter the 6-digit verification code sent to your email.
                </span>
              </div>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#00BBA6] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#00BBA6]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0F766E] hover:shadow-xl hover:shadow-[#0F766E]/20 active:translate-y-0"
            >
              <span>Verify Email</span>

              <HiOutlineArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Security Info */}
            <div className="rounded-xl border border-teal-100 bg-teal-50/60 px-4 py-3.5">
              <div className="flex gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#00A991] shadow-sm">
                  <HiOutlineShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-700">
                    Your information is secure
                  </p>

                  <p className="mt-0.5 text-[11px] leading-5 text-slate-500">
                    We use email verification to keep your account protected
                    and prevent unauthorized access.
                  </p>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;