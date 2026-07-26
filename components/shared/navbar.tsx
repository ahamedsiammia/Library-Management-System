"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bell, LogOut, LayoutDashboard, ChevronDown, User, Shield } from "lucide-react";
import Logo from "./logo";
import { useAuth } from "@/hooks/useAuth";
import { logoutAction } from "@/app/(auth)/_actions/auth.actions";
import { motion, AnimatePresence } from "framer-motion";

// ── Mock notifications (later replace with API) ─────────────────────────────
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
      await authService.logout();
    } catch {
      // ignore
    } finally {
      setIsProfileOpen(false);
      // Hard redirect to clear all state
      window.location.href = "/login";
    }
  };


  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getRoleLabel = (role?: string) => {
    if (!role) return "Member";
    if (role.toLowerCase() === "admin") return "Admin";
    if (role.toLowerCase() === "librarian") return "Librarian";
    return "Student";
  };

  const getRoleBg = (role?: string) => {
    if (!role) return "bg-teal-100 text-teal-700";
    if (role.toLowerCase() === "admin") return "bg-rose-100 text-rose-700";
    if (role.toLowerCase() === "librarian") return "bg-violet-100 text-violet-700";
    return "bg-teal-100 text-teal-700";
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
    <div className="bg-teal-500 sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center bg-zinc-100/20 backdrop-blur-md border border-white/20 rounded-full px-2 py-1 shadow-sm">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white text-teal-600 shadow-md"
                    : "text-white hover:text-zinc-200"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Notification Bell - always visible */}
          <div ref={notifRef} className="relative">
            <button
              id="notification-btn"
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsProfileOpen(false);
              }}
              className="relative w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-200 border border-white/30"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-teal-500 leading-none px-[3px]">
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
                  className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/80">
                    <div className="flex items-center gap-2">
                      <Bell size={15} className="text-teal-500" />
                      <span className="font-bold text-sm text-gray-800">নোটিফিকেশন</span>
                      {unreadCount > 0 && (
                        <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-[11px] text-teal-600 hover:text-teal-700 font-semibold"
                      >
                        সব পড়া হয়েছে
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                    {notifications.length === 0 ? (
                      <div className="py-10 text-center text-gray-400 text-sm">
                        কোনো নোটিফিকেশন নেই
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`flex gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer ${
                            !notif.read ? "bg-teal-50/40" : ""
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
                            <p className={`text-xs font-semibold text-gray-800 ${!notif.read ? "" : "opacity-70"}`}>
                              {notif.title}
                            </p>
                            <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">
                              {notif.message}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">{notif.time}</p>
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

                  <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/60">
                    <button className="w-full text-center text-xs text-teal-600 hover:text-teal-700 font-semibold">
                      সব নোটিফিকেশন দেখুন
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile / Auth */}
          {loading ? (
            <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse" />
          ) : user ? (
            <div ref={profileRef} className="relative">
              <button
                id="profile-btn"
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotifOpen(false);
                }}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-full pl-1 pr-3 py-1 text-white transition-all duration-200"
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-white text-teal-600 flex items-center justify-center text-xs font-bold shadow">
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
                    className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                  >
                    {/* User Info Header */}
                    <div className="px-4 py-4 bg-gradient-to-br from-teal-500 to-teal-600">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white text-teal-600 flex items-center justify-center text-lg font-bold shadow-md flex-shrink-0">
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
                    <div className="p-2">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-teal-50 text-gray-700 hover:text-teal-600 transition-colors group"
                      >
                        <LayoutDashboard size={16} className="text-gray-400 group-hover:text-teal-500" />
                        <span className="text-sm font-medium">Dashboard</span>
                      </Link>

                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-teal-50 text-gray-700 hover:text-teal-600 transition-colors group"
                      >
                        <User size={16} className="text-gray-400 group-hover:text-teal-500" />
                        <span className="text-sm font-medium">প্রোফাইল</span>
                      </Link>

                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-rose-50 text-gray-700 hover:text-rose-600 transition-colors group"
                        >
                          <LogOut size={16} className="text-gray-400 group-hover:text-rose-500" />
                          <span className="text-sm font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/register"
              className="text-white font-medium px-5 py-2 hover:opacity-90 transition-all bg-white/20 hover:bg-white/30 border border-white/30 rounded-full text-sm"
            >
              Sign Up
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Notification Bell */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsOpen(false);
              }}
              className="relative w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white border border-white/30"
            >
              <Bell size={17} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-teal-500 px-[2px]">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Mobile Notif Dropdown */}
            <AnimatePresence>
              {isNotifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                    <span className="font-bold text-sm text-gray-800">নোটিফিকেশন</span>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-[11px] text-teal-600 font-semibold">
                        সব পড়া হয়েছে
                      </button>
                    )}
                  </div>
                  <div className="max-h-60 overflow-y-auto divide-y divide-slate-50">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`flex gap-3 px-4 py-3 hover:bg-slate-50 ${!notif.read ? "bg-teal-50/40" : ""}`}
                      >
                        <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notifTypeColor(notif.type)} ${notif.read ? "opacity-30" : ""}`} />
                        <div>
                          <p className="text-xs font-semibold text-gray-800">{notif.title}</p>
                          <p className="text-[11px] text-gray-500 line-clamp-2">{notif.message}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <div className="relative bg-white w-3/4 max-w-xs h-full shadow-xl p-6 flex flex-col">
          <div className="mb-8">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Logo />
            </Link>
          </div>

          {/* Mobile User Card */}
          {user && (
            <div className="mb-6 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white text-teal-600 flex items-center justify-center text-base font-bold flex-shrink-0">
                {getInitials(user.name)}
              </div>
              <div className="min-w-0">
                <p className="text-white font-bold text-sm truncate">{user.name}</p>
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 ${getRoleBg(user.role)}`}>
                  <Shield size={9} />
                  {getRoleLabel(user.role)}
                </span>
              </div>
            </div>
          )}

          {/* Mobile Nav Links */}
          <div className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-semibold p-3 rounded-xl transition-colors ${
                    isActive ? "bg-teal-50 text-teal-600" : "text-zinc-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Auth Buttons */}
          <div className="mt-auto flex flex-col space-y-3 border-t pt-6">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-teal-50 text-teal-700 font-bold rounded-xl text-center flex items-center justify-center gap-2"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-rose-50 text-rose-600 font-bold rounded-xl flex items-center justify-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-teal-500 text-white font-bold rounded-xl shadow-lg cursor-pointer text-center"
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
