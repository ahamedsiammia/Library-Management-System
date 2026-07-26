"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineChartBarSquare,
  HiOutlineUsers,
  HiOutlineUserGroup,
  HiOutlineBookOpen,
  HiOutlineCog6Tooth,
  HiOutlineDocumentText,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineShieldCheck,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBell,
  HiOutlineHome,
} from "react-icons/hi2";
import { useAuth } from "@/hooks/useAuth";
import { logoutAction } from "@/app/(auth)/_actions/auth.actions";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const NAV_ITEMS = [
  {
    label: "Command Center",
    labelBn: "ড্যাশবোর্ড",
    href: "/dashboard",
    icon: HiOutlineChartBarSquare,
    exact: true,
  },
  {
    label: "User Management",
    labelBn: "ইউজার ম্যানেজমেন্ট",
    href: "/dashboard/users",
    icon: HiOutlineUsers,
  },
  {
    label: "Librarian Staff",
    labelBn: "লাইব্রেরিয়ান স্টাফ",
    href: "/dashboard/librarians",
    icon: HiOutlineUserGroup,
  },
  {
    label: "Book Catalog",
    labelBn: "বুক ক্যাটালগ",
    href: "/books",
    icon: HiOutlineBookOpen,
  },
  {
    label: "System Settings",
    labelBn: "সিস্টেম সেটিংস",
    href: "/dashboard/settings",
    icon: HiOutlineCog6Tooth,
  },
  {
    label: "Audit Logs",
    labelBn: "অডিট লগস",
    href: "/dashboard/logs",
    icon: HiOutlineDocumentText,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (item: (typeof NAV_ITEMS)[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const currentPage = NAV_ITEMS.find((item) => isActive(item));

  const handleLogout = async () => {
    await logoutAction();
    window.location.href = "/register";
  };

  // Role guard
  useEffect(() => {
    if (!loading && user && user.role !== "MODARATOR") {
      toast.error("শুধুমাত্র Moderator এই পেজ অ্যাক্সেস করতে পারবেন।");
      window.location.href = "/";
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#00BBA6] border-t-transparent rounded-full animate-spin" />
          <span className="text-muted-foreground text-sm font-medium">
            অথেন্টিকেশন যাচাই হচ্ছে...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ══════════════════════ SIDEBAR ══════════════════════ */}
      {/* Desktop: always visible static. Mobile: slide in from left */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-40 flex flex-col
          sidebar-container
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[var(--sidebar-border)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00BBA6] flex items-center justify-center shadow-lg shadow-teal-500/30">
              <HiOutlineShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-extrabold text-sm text-foreground leading-none">
                LMS
              </p>
              <p className="text-[#00BBA6] text-[10px] font-bold uppercase tracking-widest">
                Moderator
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-muted-foreground hover:text-foreground transition"
          >
            <HiOutlineXMark className="w-5 h-5" />
          </button>
        </div>

        {/* Back to Home Button */}
        <div className="px-3 pt-3 pb-1">
          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#00BBA6]/10 text-[#00BBA6] border border-[#00BBA6]/25 hover:bg-[#00BBA6]/20 transition shadow-sm"
          >
            <HiOutlineHome className="w-4 h-4 shrink-0" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`sidebar-nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${active ? "active" : ""}`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <div className="leading-tight">
                  <span className="block text-[13px]">{item.label}</span>
                  <span className="block text-[10px] font-normal opacity-60 mt-0.5">
                    {item.labelBn}
                  </span>
                </div>
                {active && (
                  <div className="ml-auto w-1.5 h-5 bg-[#00BBA6] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Profile strip */}
        <div className="px-3 pb-4 pt-3 border-t border-[var(--sidebar-border)] space-y-2 shrink-0">
          {user && (
            <div className="px-3 py-2.5 rounded-xl bg-[var(--sidebar-hover-bg)] border border-[var(--sidebar-border)] flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00BBA6] to-teal-700 flex items-center justify-center text-white font-extrabold text-sm uppercase shadow">
                {user.name?.charAt(0) || "M"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs truncate text-foreground">
                  {user.name}
                </p>
                <span className="inline-block text-[10px] bg-[#00BBA6]/15 text-[#00BBA6] px-2 py-0.5 rounded-full font-bold mt-0.5">
                  Moderator
                </span>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition text-sm font-semibold"
          >
            <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
            <span>লগআউট করুন</span>
          </button>
        </div>
      </aside>

      {/* ══════════════════════ MAIN ══════════════════════ */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top bar */}
        <header className="dashboard-topbar sticky top-0 z-20 px-4 sm:px-6 py-3.5 flex items-center gap-4">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-muted-foreground hover:text-foreground transition"
          >
            <HiOutlineBars3 className="w-6 h-6" />
          </button>

          {/* Page title */}
          <div className="flex-1 hidden sm:block">
            <h2 className="font-bold text-base text-foreground">
              {currentPage?.label || "Dashboard"}
            </h2>
            <p className="text-xs text-muted-foreground">{currentPage?.labelBn}</p>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Topbar Return Home Button */}
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary border border-border text-foreground hover:bg-[#00BBA6]/10 hover:border-[#00BBA6]/30 hover:text-[#00BBA6] transition text-xs font-bold"
            >
              <HiOutlineHome className="w-4 h-4 text-[#00BBA6]" />
              <span className="hidden sm:inline">Home Page</span>
            </Link>

            <ThemeToggle />

            <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:text-foreground transition">
              <HiOutlineBell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00BBA6] rounded-full border-2 border-background" />
            </button>

            {user && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary border border-border">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00BBA6] to-teal-700 flex items-center justify-center text-white font-bold text-xs uppercase">
                  {user.name?.charAt(0) || "M"}
                </div>
                <span className="text-foreground font-semibold text-xs">
                  {user.name}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
