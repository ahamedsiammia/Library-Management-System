import React from "react";
import { Link } from "react-router";
import Logo from "../Logo/Logo";

const Navbar = () => {
  return (
    <div className="bg-teal-500">

    <nav className="sticky top-0 container mx-auto z-50 bg-teal-500 backdrop-blur-xl border-b border-zinc-200/50 flex items-center justify-between px-8 py-4 font-sans text-sm">
      <div className="flex items-center space-x-2">
        <div >
            <Logo></Logo>
        </div>
      </div>
      <div className="bg-zinc-100/50 border border-zinc-200/80 rounded-full px-1 py-1 flex items-center shadow-sm">
        <Link className="bg-white text-teal-600 px-5 py-2 rounded-full font-medium transition-all shadow-md">
          Home
        </Link>
        <Link className="text-zinc-600 px-5 py-2 hover:text-black transition-colors">
          Destinations
        </Link>
   
      </div>

      <div className="flex items-center space-x-6">
        <button className="bg-zinc-100/50 border border-zinc-200/80 font-medium px-4 py-2 rounded-lg">Log In</button>
        <button className="bg-zinc-900 text-white  px-4 py-2 rounded-lg font-medium">
          Sign Up
        </button>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
