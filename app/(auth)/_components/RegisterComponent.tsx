"use client";

import React, { useActionState, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { registerAction } from "../_actions/register.action";
import LoginComponent from "./LoginComponent";

const RegisterComponent: React.FC = () => {
  const [authMode, setAuthMode] = useState<"register" | "login">("register");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(registerAction, null);

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message || "Registered successfully!");
        router.push("/");
        router.refresh();
      } else {
        toast.error(state.message || "Registration failed.");
      }
    }
  }, [state, router]);

  const handleToggle = (mode: "register" | "login") => {
    setAuthMode(mode);
    setShowPassword(false);
  };

  return (
    <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-teal-100/50 p-6 md:p-8 transition-all duration-300">
      {/* Toggle Button Container */}
      <div className="flex justify-center mb-8">
        <div className="relative w-64 h-12 bg-slate-100 rounded-full p-1 flex items-center cursor-pointer shadow-inner">
          <div
            className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-teal-500 rounded-full shadow-md transition-all duration-300 ease-in-out ${
              authMode === "login" ? "translate-x-full" : ""
            }`}
          />
          <button
            type="button"
            onClick={() => handleToggle("register")}
            className={`relative z-10 w-1/2 text-center text-sm font-semibold transition-colors duration-300 cursor-pointer ${
              authMode === "register" ? "text-white" : "text-slate-500"
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => handleToggle("login")}
            className={`relative z-10 w-1/2 text-center text-sm font-semibold transition-colors duration-300 cursor-pointer ${
              authMode === "login" ? "text-white" : "text-slate-500"
            }`}
          >
            Sign In
          </button>
        </div>
      </div>

      {authMode === "register" ? (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
              Create an Account
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Join your college digital library system
            </p>
          </div>

          <form action={formAction} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter Your Name"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>

            {/* Institute Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Institute Name
              </label>
              <input
                type="text"
                name="instituteName"
                required
                placeholder="Enter Your Institute Name"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>

            {/* Academic Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Roll Number
                </label>
                <input
                  type="number"
                  name="roll"
                  required
                  placeholder="Enter Your Roll"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Semester
                </label>
                <select
                  name="semester"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                >
                  <option value="">Select</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                  <option value="5th">5th</option>
                  <option value="6th">6th</option>
                  <option value="7th">7th</option>
                  <option value="8th">8th</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Shift
                </label>
                <select
                  name="shift"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                >
                  <option value="">Select</option>
                  <option value="MORNING">MORNING</option>
                  <option value="EVENING">EVENING</option>
                </select>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter Your Email"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  minLength={5}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600 transition-colors select-none text-lg"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-6 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Signing Up...</span>
                </>
              ) : (
                <span>Sign Up</span>
              )}
            </button>
          </form>
        </>
      ) : (
        <LoginComponent />
      )}
    </div>
  );
};

export default RegisterComponent;
