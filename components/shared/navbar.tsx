"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bell, LogOut, LayoutDashboard, ChevronDown, User, Shield } from "lucide-react";
import Logo from "./logo";
import { useAuth } from "@/hooks/useAuth";
import { logoutAction } from "@/app/(auth)/_actions/auth.actions";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

// ── Mock notifications ─────────────────────────────
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "বই রিটার্ন রিমাইন্ডার",
    message: "\"Clean Code\" বইটি আগামীকাল রিটার্ন দিতে হবে।",
    time: "১ ঘণ্টা আগে",
    read: false,
    type: "warning",
  },
  {
    id: 2,
    title: "নতুন বই যোগ হয়েছে",
    message: "\"The Pragmatic Programmer\" নতুন কপি পাওয়া গেছে।",
    time: "৩ ঘণ্টা আগে",
    read: false,
    type: "info",
  },
  {
    id: 3,
    title: "অনুরোধ অনুমোদিত",
    message: "আপনার বই অনুরোধ অনুমোদন করা হয়েছে।",
    time: "গতকাল",
    read: true,
    type: "success",
  },
];

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Books", path: "/books" },
  { name: "About", path: "/about" },
  { name: "Support", path: "/support" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const pathname = usePathname();
  const { user, loading } = useAuth();

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAction();
    } catch {
      // ignore
    } finally {
      setIsProfileOpen(false);
      window.location.href = "/register";
    }
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getRoleLabel = (role?: string) => {
    if (!role) return "Member";
    if (role.toLowerCase() === "modarator" || role.toLowerCase() === "admin") return "Moderator";
    if (role.toLowerCase() === "librarian" || role.toLowerCase() === "libraryan") return "Librarian";
    return "Student";
  };

  const getRoleBg = (role?: string) => {
    if (!role) return "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300";
    if (role.toLowerCase() === "modarator" || role.toLowerCase() === "admin") return "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300";
    if (role.toLowerCase() === "librarian" || role.toLowerCase() === "libraryan") return "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300";
    return "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300";
  };

  const getInitials = (name?: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const notifTypeColor = (type: string) => {
    if (type === "warning") return "bg-amber-400";
    if (type === "success") return "bg-emerald-400";
    return "bg-teal-400";
  };

  return (
    <div className="bg-teal-500 dark:bg-slate-900 sticky top-0 z-50 shadow-md border-b border-teal-600/20 dark:border-slate-800 transition-colors duration-300">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center bg-zinc-100/20 dark:bg-slate-800/60 backdrop-blur-md border border-white/20 dark:border-slate-700/50 rounded-full px-2 py-1 shadow-sm">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white text-teal-600 dark:bg-[#00BBA6] dark:text-white shadow-md"
                    : "text-white dark:text-slate-200 hover:text-zinc-200 dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Theme Toggle */}
          <ThemeToggle className="bg-white/20 hover:bg-white/30 text-white dark:bg-slate-800 dark:text-yellow-400 dark:hover:bg-slate-700 border border-white/30 dark:border-slate-700" />

          {/* Notification Bell - always visible */}
          <div ref={notifRef} className="relative">
            <button
              id="notification-btn"
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsProfileOpen(false);
              }}
              className="relative w-10 h-10 bg-white/20 hover:bg-white/30 dark:bg-slate-800 dark:hover:bg-slate-700 backdrop-blur-md rounded-full flex items-center justify-center text-white dark:text-slate-200 transition-all duration-200 border border-white/30 dark:border-slate-700"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-teal-500 dark:border-slate-900 leading-none px-[3px]">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            <AnimatePresence>
              {isNotifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2">
                      <Bell size={15} className="text-[#00BBA6]" />
                      <span className="font-bold text-sm text-gray-800 dark:text-slate-100">নোটিফিকেশন</span>
                      {unreadCount > 0 && (
                        <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-[11px] text-teal-600 dark:text-[#00BBA6] hover:underline font-semibold"
                      >
                        সব পড়া হয়েছে
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800">
                    {notifications.length === 0 ? (
                      <div className="py-10 text-center text-gray-400 dark:text-slate-500 text-sm">
                        কোনো নোটিফিকেশন নেই
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`flex gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer ${
                            !notif.read ? "bg-teal-50/40 dark:bg-teal-950/20" : ""
                          }`}
                        >
                          <div className="flex-shrink-0 mt-1">
                            <span
                              className={`w-2.5 h-2.5 rounded-full block mt-0.5 ${notifTypeColor(
                                notif.type
                              )} ${notif.read ? "opacity-30" : ""}`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-semibold text-gray-800 dark:text-slate-200 ${!notif.read ? "" : "opacity-70"}`}>
                              {notif.title}
                            </p>
                            <p className="text-[11px] text-gray-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                              {notif.message}
                            </p>
                            <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-1">{notif.time}</p>
                          </div>
                          {!notif.read && (
                            <div className="flex-shrink-0">
                              <span className="w-2 h-2 bg-teal-500 rounded-full block mt-1.5" />
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                    <button className="w-full text-center text-xs text-teal-600 dark:text-[#00BBA6] font-semibold hover:underline">
                      সব নোটিফিকেশন দেখুন
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile / Auth */}
          {loading ? (
            <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-slate-800 animate-pulse" />
          ) : user ? (
            <div ref={profileRef} className="relative">
              <button
                id="profile-btn"
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotifOpen(false);
                }}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 dark:bg-slate-800 dark:hover:bg-slate-700 backdrop-blur-md border border-white/30 dark:border-slate-700 rounded-full pl-1 pr-3 py-1 text-white dark:text-slate-100 transition-all duration-200"
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-white dark:bg-[#00BBA6] text-teal-600 dark:text-white flex items-center justify-center text-xs font-bold shadow">
                  {getInitials(user.name)}
                </div>
                <span className="text-sm font-semibold max-w-[80px] truncate hidden sm:block">
                  {user.name?.split(" ")[0]}
                </span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50"
                  >
                    {/* User Info Header */}
                    <div className="px-4 py-4 bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-800">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 text-teal-600 dark:text-[#00BBA6] flex items-center justify-center text-lg font-bold shadow-md flex-shrink-0">
                          {getInitials(user.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-bold text-sm truncate">{user.name}</p>
                          <p className="text-teal-100 text-[11px] truncate">{user.email}</p>
                          <span
                            className={`inline-flex items-center gap-1 mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${getRoleBg(
                              user.role
                            )}`}
                          >
                            <Shield size={9} />
                            {getRoleLabel(user.role)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 space-y-0.5">
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-teal-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-[#00BBA6] transition-colors group"
                      >
                        <User size={16} className="text-gray-400 dark:text-slate-400 group-hover:text-teal-500 dark:group-hover:text-[#00BBA6]" />
                        <span className="text-sm font-medium">My Profile</span>
                      </Link>

                      <Link
                        href="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-teal-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-[#00BBA6] transition-colors group"
                      >
                        <LayoutDashboard size={16} className="text-gray-400 dark:text-slate-400 group-hover:text-teal-500 dark:group-hover:text-[#00BBA6]" />
                        <span className="text-sm font-medium">Dashboard</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 text-gray-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors group text-left mt-1"
                      >
                        <LogOut size={16} className="text-gray-400 dark:text-slate-400 group-hover:text-rose-500" />
                        <span className="text-sm font-medium">লগআউট করুন</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/register">
                <button className="bg-white text-teal-600 dark:bg-slate-800 dark:text-slate-100 border border-white/40 dark:border-slate-700 font-semibold px-4 py-2 rounded-full hover:bg-teal-50 dark:hover:bg-slate-700 transition shadow-sm text-sm">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle className="bg-white/20 text-white dark:bg-slate-800 dark:text-yellow-400 border border-white/30 dark:border-slate-700" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-zinc-200 p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-teal-600 dark:bg-slate-900 border-t border-teal-500 dark:border-slate-800 px-6 py-4 space-y-3 overflow-hidden"
          >
            {/* User Info Bar in Mobile */}
            {user && (
              <div className="flex items-center gap-3 pb-3 border-b border-teal-500/40 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-[#00BBA6] text-teal-600 dark:text-white flex items-center justify-center font-bold text-sm">
                  {getInitials(user.name)}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{user.name}</p>
                  <span className="text-[10px] text-teal-200 dark:text-slate-400">{getRoleLabel(user.role)}</span>
                </div>
              </div>
            )}

            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-base font-medium transition-colors ${
                  pathname === link.path
                    ? "text-white font-bold pl-2 border-l-4 border-white"
                    : "text-teal-100 dark:text-slate-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {user && (
              <div className="pt-2 space-y-2 border-t border-teal-500/40 dark:border-slate-800">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 py-2 text-white font-semibold"
                >
                  <User size={18} />
                  <span>My Profile</span>
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 py-2 text-white font-semibold"
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 py-2 text-rose-200 dark:text-rose-400 font-semibold w-full text-left"
                >
                  <LogOut size={18} />
                  <span>লগআউট করুন</span>
                </button>
              </div>
            )}

            {!user && !loading && (
              <div className="pt-2">
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-white text-teal-600 dark:bg-[#00BBA6] dark:text-white font-bold py-2.5 rounded-xl text-center">
                    Sign Up / Log In
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
