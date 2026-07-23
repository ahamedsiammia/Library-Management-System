import React, { useState } from "react";
import Logo from "../Logo/Logo";
import {  Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "About", path: "/about" },
    { name: "Support", path: "/support" }, 
  ];

  return (
    <div className="bg-teal-500 sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Desktop Navigation - Hidden on Mobile */}
        <div className="hidden md:flex items-center bg-zinc-100/20 backdrop-blur-md border border-white/20 rounded-full px-2 py-1 shadow-sm">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  isActive 
                  ? "bg-white text-teal-600 shadow-md" 
                  : "text-white hover:text-zinc-200"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Auth Buttons - Hidden on Mobile */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to={"/register"} className="text-white font-medium px-4 py-1.5 hover:opacity-80 transition-opacity bg-zinc-100/50 border border-zinc-200/80 rounded-full">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button - Visible only on Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar/Drawer */}
      <div
        className={`fixed inset-0 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
          onClick={() => setIsOpen(false)}
        ></div>

        <div className="relative bg-white w-3/4 h-full shadow-xl p-6 flex flex-col">
          <div className="mb-8">
             <Logo />
          </div>
          
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-semibold p-3 rounded-xl transition-colors ${
                    isActive ? "bg-teal-50 text-teal-600" : "text-zinc-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="mt-auto flex flex-col space-y-3 border-t pt-6">
            <Link to={"/register"} className="w-full py-3 bg-teal-500 text-white font-bold rounded-xl shadow-lg cursor-pointer text-center">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;