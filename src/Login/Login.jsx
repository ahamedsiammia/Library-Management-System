import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { batchUrl } from "../utils/batchUrl";

const Login = () => {
  // লগইন ফর্মের জন্য আলাদা শো/হাইড স্টেট
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onLoginSubmit = async (data) => {
    console.log("Logging in Data:", data);
        try {
      const result = await axios.post(
        `${batchUrl}/user/login`,
        // `http://localhost:5000/user/login`,
        data,
        {
           withCredentials: true,
        }
      );
      console.log(data);
      if(result.data){
        reset()
        toast.success("Your LogIn successfully")
        navigate("/")
      }
      console.log(result.data);
      
    }catch (error) {
  console.log(error);

  const message = await
    error.response?.data?.message ;

  toast.error(message);
}
  };

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

      <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-4">
        {/* Email Address ফিল্ড */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter Your Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className={`w-full px-4 py-2 rounded-lg border bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all ${
              errors.email
                ? "border-red-400 focus:border-red-400"
                : "border-slate-200 focus:border-teal-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password ফিল্ড (Show/Hide বাটন সহ) */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              {...register("password", {
                required: "Password is required",
              })}
              className={`w-full px-4 py-2 rounded-lg border bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all pr-12 ${
                errors.password
                  ? "border-red-400 focus:border-red-400"
                  : "border-slate-200 focus:border-teal-500"
              }`}
            />
            {/* শো/হাইড টগল বাটন */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600 transition-colors select-none text-lg"
            >
              {/* এখানে পরিবর্তন: টেক্সটের জায়গায় আইকন কন্ডিশন */}
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 active:scale-[0.98] transition-all duration-200"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
