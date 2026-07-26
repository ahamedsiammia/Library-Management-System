"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineCog6Tooth, HiOutlineInformationCircle } from "react-icons/hi2";
import { SystemSettings } from "@/types/moderator.types";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface PolicyField {
  key: keyof SystemSettings;
  label: string;
  labelBn: string;
  description: string;
  unit: string;
  min: number;
  max: number;
  step: number;
}

const POLICY_FIELDS: PolicyField[] = [
  {
    key: "maxBorrowLimit",
    label: "Maximum Borrow Limit",
    labelBn: "সর্বোচ্চ বই ধার সীমা",
    description: "একজন শিক্ষার্থী একসাথে সর্বোচ্চ কতটি বই ধার নিতে পারবেন।",
    unit: "books",
    min: 1,
    max: 10,
    step: 1,
  },
  {
    key: "borrowDurationDays",
    label: "Borrow Duration",
    labelBn: "ধার নেওয়ার মেয়াদ",
    description: "একটি বই কতদিনের জন্য ধার নেওয়া যাবে। মেয়াদ শেষে ফাইন প্রযোজ্য।",
    unit: "days",
    min: 1,
    max: 60,
    step: 1,
  },
  {
    key: "finePerDay",
    label: "Fine Per Overdue Day",
    labelBn: "দৈনিক বিলম্ব ফাইন",
    description: "প্রতিটি অতিরিক্ত দিনের জন্য শিক্ষার্থীর উপর কত ডলার ফাইন আরোপ হবে।",
    unit: "$/day",
    min: 0,
    max: 50,
    step: 0.5,
  },
  {
    key: "gracePeriodDays",
    label: "Grace Period",
    labelBn: "গ্রেস পিরিয়ড",
    description: "মেয়াদ শেষের পরে কতদিন পর্যন্ত ফাইন ছাড়াই বই ফেরত দেওয়া যাবে।",
    unit: "days",
    min: 0,
    max: 7,
    step: 1,
  },
  {
    key: "maxUnpaidFineCap",
    label: "Maximum Unpaid Fine Cap",
    labelBn: "সর্বোচ্চ ফাইন ক্যাপ",
    description: "কোনো শিক্ষার্থীর মোট অপরিশোধিত ফাইন এই সীমা ছাড়ালে তার ধার নেওয়ার সুবিধা স্বয়ংক্রিয়ভাবে বন্ধ হয়ে যাবে।",
    unit: "$",
    min: 5,
    max: 500,
    step: 5,
  },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>({
    maxBorrowLimit: 3,
    borrowDurationDays: 14,
    finePerDay: 1.0,
    gracePeriodDays: 1,
    maxUnpaidFineCap: 20.0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/moderator/settings`, {
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json();
        if (res.ok && data.data) setSettings(data.data);
      } catch {
        toast.error("সিস্টেম সেটিংস লোড করতে ব্যর্থ হয়েছে।");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/moderator/settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (res.ok) {
        setSettings(data.data);
        toast.success("সিস্টেম পলিসি সফলভাবে আপডেট করা হয়েছে!");
      } else {
        toast.error(data.message || "সেটিংস আপডেট ব্যর্থ হয়েছে।");
      }
    } catch {
      toast.error("সার্ভারের সাথে সংযোগ ব্যর্থ হয়েছে।");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 gap-3">
        <Loader2 className="w-8 h-8 text-[#00BBA6] animate-spin" />
        <span className="text-muted-foreground text-sm">সেটিংস লোড হচ্ছে...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
          <HiOutlineCog6Tooth className="w-7 h-7 text-[#00BBA6]" />
          Fine & System Policy Settings
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          ফাইন রেট, ধার সীমা ও পলিসি কনফিগারেশন — শুধুমাত্র Moderator পরিবর্তন করতে পারবেন।
        </p>
      </div>

      {/* Policy Settings */}
      <div className="dashboard-card rounded-2xl divide-y divide-border">
        {POLICY_FIELDS.map((field, index) => (
          <motion.div
            key={field.key}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-5 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-foreground font-bold text-sm">{field.labelBn}</p>
                <span className="text-[11px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full border border-border">
                  {field.label}
                </span>
              </div>
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                {field.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    [field.key]: Math.max(field.min, Number((prev[field.key] - field.step).toFixed(2))),
                  }))
                }
                className="w-8 h-8 rounded-lg bg-secondary border border-border text-foreground font-bold text-lg hover:bg-[#00BBA6]/10 hover:border-[#00BBA6]/30 transition flex items-center justify-center"
              >
                −
              </button>

              <div className="w-24 text-center">
                <span className="text-foreground font-extrabold text-lg block">
                  {settings[field.key]}
                </span>
                <span className="text-muted-foreground text-[11px]">{field.unit}</span>
              </div>

              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    [field.key]: Math.min(field.max, Number((prev[field.key] + field.step).toFixed(2))),
                  }))
                }
                className="w-8 h-8 rounded-lg bg-secondary border border-border text-foreground font-bold text-lg hover:bg-[#00BBA6]/10 hover:border-[#00BBA6]/30 transition flex items-center justify-center"
              >
                +
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info */}
      <div className="flex items-start gap-3 px-4 py-3 bg-[#00BBA6]/10 border border-[#00BBA6]/20 rounded-xl">
        <HiOutlineInformationCircle className="w-5 h-5 text-[#00BBA6] shrink-0 mt-0.5" />
        <p className="text-xs text-foreground/80 leading-relaxed">
          পলিসি পরিবর্তনগুলো সংরক্ষণের পরে তাৎক্ষণিকভাবে কার্যকর হবে। নতুন বই ইস্যুগুলোতে নতুন নিয়ম প্রযোজ্য হবে; চলমান লোনগুলোতে পূর্বের নিয়ম বহাল থাকবে।
        </p>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full sm:w-auto px-8 py-3.5 bg-[#00BBA6] hover:bg-teal-600 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 transition flex items-center justify-center gap-2 text-sm disabled:opacity-60"
      >
        {saving ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "পলিসি পরিবর্তন সংরক্ষণ করুন"
        )}
      </button>
    </div>
  );
}
