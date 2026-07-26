"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineUsers,
  HiOutlineMagnifyingGlass,
  HiOutlineShieldCheck,
  HiOutlineNoSymbol,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import { ManagedUser } from "@/types/moderator.types";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  getAllUsersAction,
  updateUserStatusAction,
} from "@/app/(dashboard)/_actions/moderator.actions";

const ROLE_OPTIONS = [
  { value: "", label: "সকল রোল" },
  { value: "USER", label: "Student / Patron" },
  { value: "LIBRARYAN", label: "Librarian" },
];

const STATUS_BADGE: Record<string, string> = {
  ACTIVE: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
  BLOCKED: "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30",
};

const ROLE_BADGE: Record<string, string> = {
  MODARATOR: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/30",
  LIBRARYAN: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30",
  USER: "bg-secondary text-muted-foreground border border-border",
};

export default function UsersPage() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllUsersAction(roleFilter, search);
      if (res.success && res.data) {
        setUsers(res.data);
      } else {
        toast.error(res.message || "ইউজার ডেটা লোড করতে ব্যর্থ হয়েছে।");
      }
    } catch {
      toast.error("ইউজার ডেটা লোড করতে ব্যর্থ হয়েছে।");
    } finally {
      setLoading(false);
    }
  }, [search, roleFilter]);

  useEffect(() => {
    const timer = setTimeout(() => fetchUsers(), 400);
    return () => clearTimeout(timer);
  }, [fetchUsers]);

  const handleStatusToggle = async (user: ManagedUser) => {
    const newStatus = user.activeStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    setUpdating(user.id);
    try {
      const res = await updateUserStatusAction(user.id, newStatus);
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === user.id ? { ...u, activeStatus: newStatus } : u
          )
        );
        toast.success(
          newStatus === "ACTIVE"
            ? `${user.name}-এর অ্যাকাউন্ট সক্রিয় করা হয়েছে।`
            : `${user.name}-এর অ্যাকাউন্ট সাসপেন্ড করা হয়েছে।`
        );
      } else {
        toast.error(res.message || "স্ট্যাটাস আপডেট ব্যর্থ হয়েছে।");
      }
    } catch {
      toast.error("সার্ভারের সাথে সংযোগ ব্যর্থ হয়েছে।");
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <HiOutlineUsers className="w-7 h-7 text-[#00BBA6]" />
            User Management
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            শিক্ষার্থী ও লাইব্রেরিয়ান অ্যাকাউন্ট ব্যবস্থাপনা
          </p>
        </div>
        <div className="text-muted-foreground text-sm font-semibold bg-secondary px-4 py-2 rounded-xl border border-border">
          মোট: <span className="text-foreground font-bold">{users.length}</span> ইউজার
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="নাম, ইমেইল বা ইনস্টিটিউট দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-[#00BBA6] transition"
          />
        </div>
        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 bg-card border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#00BBA6] transition min-w-[160px] cursor-pointer"
          >
            {ROLE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <HiOutlineChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
        </div>
      </div>

      {/* Users Table */}
      <div className="dashboard-card rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-[#00BBA6] animate-spin" />
            <p className="text-muted-foreground text-sm">ইউজার ডেটা লোড হচ্ছে...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <HiOutlineUsers className="w-12 h-12 text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm">কোনো ইউজার পাওয়া যায়নি।</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-5 py-3.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    ইউজার
                  </th>
                  <th className="px-4 py-3.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    ইনস্টিটিউট
                  </th>
                  <th className="px-4 py-3.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    রোল
                  </th>
                  <th className="px-4 py-3.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    স্ট্যাটাস
                  </th>
                  <th className="px-4 py-3.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    অ্যাকশন
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <AnimatePresence>
                  {users.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-secondary/50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00BBA6] to-teal-700 flex items-center justify-center text-white font-bold text-sm uppercase shrink-0">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-foreground font-semibold text-sm">
                              {user.name}
                            </p>
                            <p className="text-muted-foreground text-xs">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-foreground text-xs font-medium">
                          {user.instituteName}
                        </p>
                        <p className="text-muted-foreground text-[11px]">
                          Roll: {user.roll}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${ROLE_BADGE[user.role] || ROLE_BADGE.USER}`}
                        >
                          {user.role === "LIBRARYAN"
                            ? "Librarian"
                            : user.role === "MODARATOR"
                            ? "Moderator"
                            : "Student"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_BADGE[user.activeStatus]}`}
                        >
                          {user.activeStatus === "ACTIVE" ? "Active" : "Blocked"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {user.role !== "MODARATOR" && (
                          <button
                            onClick={() => handleStatusToggle(user)}
                            disabled={updating === user.id}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-60
                              ${
                                user.activeStatus === "ACTIVE"
                                  ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
                                  : "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20"
                              }`}
                          >
                            {updating === user.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : user.activeStatus === "ACTIVE" ? (
                              <HiOutlineNoSymbol className="w-3.5 h-3.5" />
                            ) : (
                              <HiOutlineShieldCheck className="w-3.5 h-3.5" />
                            )}
                            {user.activeStatus === "ACTIVE"
                              ? "সাসপেন্ড"
                              : "সক্রিয় করুন"}
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
