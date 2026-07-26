import React from "react";
import { FaBookReader } from "react-icons/fa";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3 font-sans group">
      <div className="w-10 h-10 rounded-2xl bg-white text-teal-600 dark:bg-[#00BBA6] dark:text-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
        <FaBookReader className="text-xl" />
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black tracking-tight text-white dark:text-slate-100">
            LMS
          </span>
          <span className="w-2 h-2 rounded-full bg-teal-200 dark:bg-[#00BBA6]"></span>
        </div>

        <span className="text-[11px] font-bold text-teal-100 dark:text-slate-300 tracking-wide uppercase -mt-0.5">
          লাইব্রেরি ম্যানেজমেন্ট সিস্টেম
        </span>
      </div>
    </div>
  );
};

export default Logo;
