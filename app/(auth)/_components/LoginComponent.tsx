"use client";

import React, { useActionState, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginAction } from "../_actions/login.action";

const LoginComponent: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(loginAction, null);

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message || "Logged in successfully!");
        router.push("/");
        router.refresh();
      } else {
        toast.error(state.message || "Login failed.");
      }
    }
  }, [state, router]);

  return (
    <div className="transition-all duration-300">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
          Welcome Back
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Sign in to access your library resources
        </p>
      </div>

      <form action={formAction} className="space-y-4">
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
              placeholder="Enter Your Password"
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
              <span>Signing In...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
