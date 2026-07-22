import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Login from "../Login/Login";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, } from "react-router";
// import { batchUrl } from "../utils/batchUrl";

const Register = () => {
  const [authMode, setAuthMode] = useState("register");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onRegisterSubmit = async (data) => {
    console.log("Registering Data:", data);
    try {
      const result = await axios.post(
        // `${batchUrl}/user/register`,
        `http://localhost:5000/user/register`,
        data,
      );
      console.log(data);
      if(result.data){
        reset()
        toast.success("Your register successfully")
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

  const handleToggle = (mode) => {
    setAuthMode(mode);
    setShowPassword(false); 
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-teal-50/40 p-4 font-sans">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-teal-100/50 p-6 md:p-8 transition-all duration-300">
        {/* টগল বাটন কন্টেইনার */}
        <div className="flex justify-center mb-8">
          <div className="relative w-64 h-12 bg-slate-100 rounded-full p-1 flex items-center cursor-pointer shadow-inner">
            <div
              className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-teal-500 rounded-full shadow-md transition-all duration-300 ease-in-out  ${
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

            <form
              onSubmit={handleSubmit(onRegisterSubmit)}
              className="space-y-4"
            >
              {/* Full Name ফিল্ড */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  {...register("name", { required: "Name is required" })}
                  className={`w-full px-4 py-2 rounded-lg border bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all ${
                    errors.name
                      ? "border-red-400 focus:border-red-400"
                      : "border-slate-200 focus:border-teal-500"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Institute Name ফিল্ড */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Institute Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Institute Name"
                  {...register("instituteName", {
                    required: "Institute name is required",
                  })}
                  className={`w-full px-4 py-2 rounded-lg border bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all ${
                    errors.instituteName
                      ? "border-red-400 focus:border-red-400"
                      : "border-slate-200 focus:border-teal-500"
                  }`}
                />
                {errors.instituteName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.instituteName.message}
                  </p>
                )}
              </div>

              {/* একাডেমিক গ্রিড */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Roll Number
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Your Roll "
                    {...register("roll", {
                      required: "Roll is required",
                      valueAsNumber: true,
                    })}
                    className={`w-full px-4 py-2 rounded-lg border bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all ${
                      errors.roll
                        ? "border-red-400 focus:border-red-400"
                        : "border-slate-200 focus:border-teal-500"
                    }`}
                  />
                  {errors.roll && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.roll.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Semester
                  </label>
                  <select
                    {...register("semester", { required: "Required" })}
                    className={`w-full px-4 py-2 rounded-lg border bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all ${
                      errors.semester
                        ? "border-red-400 focus:border-red-400"
                        : "border-slate-200 focus:border-teal-500"
                    }`}
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
                  {errors.semester && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.semester.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Shift
                  </label>
                  <select
                    {...register("shift", { required: "Required" })}
                    className={`w-full px-4 py-2 rounded-lg border bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all ${
                      errors.shift
                        ? "border-red-400 focus:border-red-400"
                        : "border-slate-200 focus:border-teal-500"
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="MORNING">MORNING</option>
                    <option value="EVENING">EVENING</option>
                  </select>
                  {errors.shift && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.shift.message}
                    </p>
                  )}
                </div>
              </div>

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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password ফিল্ড (Show/Hide বাটন সহ) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} // স্টেট অনুযায়ী টাইপ চেঞ্জ হবে
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 5,
                        message: "Password must be at least 5 characters",
                      },
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
                Sign Up
              </button>
            </form>
          </>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

export default Register;
