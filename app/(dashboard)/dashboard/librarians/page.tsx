"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineUserGroup,
  HiOutlinePlus,
  HiOutlineXMark,
  HiOutlineShieldCheck,
  HiOutlineNoSymbol,
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineKey,
  HiOutlineAcademicCap,
  HiOutlineBuildingOffice,
  HiOutlineClock,
} from "react-icons/hi2";
import { ManagedUser, CreateLibrarianPayload } from "@/types/moderator.types";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://library-management-system-backend-fawn.vercel.app";

const SHIFT_OPTIONS = [
  { value: "MORNING", label: "Morning Shift (সকাল)" },
  { value: "EVENING", label: "Evening Shift (বিকাল)" },
];

const STATUS_BADGE: Record<string, string> = {
  ACTIVE: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
  BLOCKED: "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30",
};

export default function LibrariansPage() {
  const [librarians, setLibrarians] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  const [form, setForm] = useState<CreateLibrarianPayload & { confirmPassword: string }>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    roll: 0,
    instituteName: "",
    semester: "6th",
    shift: "MORNING",
  });

  const fetchLibrarians = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/moderator/users?role=LIBRARYAN`, {
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();
      if (res.ok) setLibrarians(data.data || []);
    } catch {
      toast.error("লাইব্রেরিয়ান তথ্য লোড করতে ব্যর্থ হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibrarians();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.roll || !form.instituteName) {
      toast.error("অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড একই নয়।");
      return;
    }
    if (form.password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");
      return;
    }

    setSubmitting(true);
    try {
      const { confirmPassword, ...payload } = form;
      const res = await fetch(`${API_BASE_URL}/moderator/librarians`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...payload, roll: Number(form.roll) }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`${form.name}-এর লাইব্রেরিয়ান অ্যাকাউন্ট তৈরি হয়েছে!`);
        setShowModal(false);
        setForm({ name: "", email: "", password: "", confirmPassword: "", roll: 0, instituteName: "", semester: "6th", shift: "MORNING" });
        fetchLibrarians();
      } else {
        toast.error(data.message || "লাইব্রেরিয়ান অ্যাকাউন্ট তৈরি ব্যর্থ হয়েছে।");
      }
    } catch {
      toast.error("সার্ভারের সাথে সংযোগ ব্যর্থ হয়েছে।");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusToggle = async (lib: ManagedUser) => {
    const newStatus = lib.activeStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    setUpdating(lib.id);
    try {
      const res = await fetch(`${API_BASE_URL}/moderator/users/${lib.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLibrarians((prev) =>
          prev.map((l) => (l.id === lib.id ? { ...l, activeStatus: newStatus } : l))
        );
        toast.success(newStatus === "ACTIVE" ? "লাইব্রেরিয়ান অ্যাকাউন্ট সক্রিয় করা হয়েছে।" : "লাইব্রেরিয়ান সাসপেন্ড করা হয়েছে।");
      }
    } catch {
      toast.error("স্ট্যাটাস আপডেট ব্যর্থ হয়েছে।");
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
            <HiOutlineUserGroup className="w-7 h-7 text-[#00BBA6]" />
            Librarian Staff Management
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">লাইব্রেরিয়ান স্টাফ প্রভিশনিং ও অ্যাক্সেস ম্যানেজমেন্ট</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#00BBA6] hover:bg-teal-600 text-white font-bold rounded-xl shadow-md shadow-teal-500/20 transition text-sm"
        >
          <HiOutlinePlus className="w-4 h-4" />
          নতুন লাইব্রেরিয়ান তৈরি করুন
        </button>
      </div>

      {/* Librarians Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="w-8 h-8 text-[#00BBA6] animate-spin" />
          <p className="text-muted-foreground text-sm">লাইব্রেরিয়ান ডেটা লোড হচ্ছে...</p>
        </div>
      ) : librarians.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 border border-dashed border-border rounded-2xl">
          <HiOutlineUserGroup className="w-12 h-12 text-muted-foreground/40" />
          <p className="text-muted-foreground text-sm">কোনো লাইব্রেরিয়ান পাওয়া যায়নি।</p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#00BBA6]/10 text-[#00BBA6] font-bold rounded-xl border border-[#00BBA6]/30 text-sm hover:bg-[#00BBA6]/20 transition"
          >
            <HiOutlinePlus className="w-4 h-4" /> প্রথম লাইব্রেরিয়ান তৈরি করুন
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence>
            {librarians.map((lib) => (
              <motion.div
                key={lib.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="dashboard-card rounded-2xl p-5 space-y-4 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00BBA6] to-teal-700 flex items-center justify-center text-white font-extrabold text-lg uppercase shadow-md">
                      {lib.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-foreground font-bold text-sm">{lib.name}</p>
                      <p className="text-muted-foreground text-xs">{lib.email}</p>
                    </div>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_BADGE[lib.activeStatus]}`}>
                    {lib.activeStatus === "ACTIVE" ? "Active" : "Blocked"}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <HiOutlineBuildingOffice className="w-3.5 h-3.5" />
                    <span>{lib.instituteName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <HiOutlineClock className="w-3.5 h-3.5" />
                    <span>{lib.shift} Shift</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <HiOutlineAcademicCap className="w-3.5 h-3.5" />
                    <span>Roll: {lib.roll}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleStatusToggle(lib)}
                  disabled={updating === lib.id}
                  className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition disabled:opacity-60
                    ${lib.activeStatus === "ACTIVE"
                      ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
                      : "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20"
                    }`}
                >
                  {updating === lib.id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : lib.activeStatus === "ACTIVE" ? (
                    <HiOutlineNoSymbol className="w-3.5 h-3.5" />
                  ) : (
                    <HiOutlineShieldCheck className="w-3.5 h-3.5" />
                  )}
                  {lib.activeStatus === "ACTIVE" ? "অ্যাকাউন্ট সাসপেন্ড করুন" : "অ্যাকাউন্ট সক্রিয় করুন"}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Create Librarian Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-foreground font-extrabold text-lg">নতুন লাইব্রেরিয়ান তৈরি</h2>
                  <p className="text-muted-foreground text-xs mt-0.5">Create New Librarian Account</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  <HiOutlineXMark className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                {[
                  { name: "name", label: "পূর্ণ নাম", placeholder: "লাইব্রেরিয়ানের নাম", icon: HiOutlineUser, type: "text" },
                  { name: "email", label: "ইমেইল", placeholder: "staff@library.edu", icon: HiOutlineEnvelope, type: "email" },
                  { name: "roll", label: "এমপ্লয়ি আইডি / রোল নম্বর", placeholder: "615201", icon: HiOutlineAcademicCap, type: "number" },
                  { name: "instituteName", label: "ইনস্টিটিউটের নাম", placeholder: "ময়মনসিংহ পলিটেকনিক ইন্সটিটিউট", icon: HiOutlineBuildingOffice, type: "text" },
                  { name: "password", label: "পাসওয়ার্ড", placeholder: "কমপক্ষে ৬ অক্ষর", icon: HiOutlineKey, type: "password" },
                  { name: "confirmPassword", label: "কনফার্ম পাসওয়ার্ড", placeholder: "পুনরায় পাসওয়ার্ড লিখুন", icon: HiOutlineKey, type: "password" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs font-bold text-muted-foreground mb-1.5">{field.label}</label>
                    <div className="relative">
                      <field.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type={field.type}
                        value={(form as any)[field.name]}
                        onChange={(e) => setForm((prev) => ({ ...prev, [field.name]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-[#00BBA6] transition"
                      />
                    </div>
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1.5">শিফট</label>
                  <select
                    value={form.shift}
                    onChange={(e) => setForm((prev) => ({ ...prev, shift: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-secondary border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#00BBA6] transition"
                  >
                    {SHIFT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 bg-secondary hover:bg-border text-foreground font-bold rounded-xl text-sm transition"
                  >
                    বাতিল করুন
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-2.5 bg-[#00BBA6] hover:bg-teal-600 text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "লাইব্রেরিয়ান তৈরি করুন"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
