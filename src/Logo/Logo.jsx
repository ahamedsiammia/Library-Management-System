import React from 'react';
import { FaBookReader } from 'react-icons/fa';

const Logo = () => {
    return (
        <div>
                <div className="flex items-center gap-3 font-sans group">
      <div className="avatar placeholder ">
        <div className=" text-neutral-content rounded-full w-12 h-12 flex items-center justify-center border-2  transition-all bg-zinc-100/50  border-zinc-200/80">
          <FaBookReader className="text-2xl" />
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold tracking-tighter text-primary">
            LMS
          </span>
          <span className="w-2 h-2 rounded-full bg-zinc-100/50 border border-zinc-200/80"></span>
        </div>
        
        <span className="text-xs font-medium text-base-content/70 tracking-wide uppercase -mt-1">
          Library Management System
        </span>
      </div>
    </div>
        </div>
    );
};

export default Logo;