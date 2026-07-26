import React from "react";
import {
  HiOutlineUsers,
  HiOutlineBookOpen,
  HiOutlineCurrencyDollar,
  HiOutlineUserGroup,
  HiOutlineShieldExclamation,
  HiOutlineArrowTrendingUp,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import Link from "next/link";
import { moderatorService } from "@/services/moderator.service";

// ── Revalidate every 60 seconds (server-side caching) ──────────────
export const revalidate = 60;

function StatCard({
  title,
  titleBn,
  value,
  subValue,
  icon: Icon,
  trend,
  accentColor,
}: {
  title: string;
  titleBn: string;
  value: string | number;
  subValue?: string;
  icon: React.ElementType;
  trend?: string;
  accentColor: string;
}) {
  return (
    <div className="dashboard-card rounded-2xl p-5 relative overflow-hidden group transition-all">
      {/* glow blob */}
      <div
        className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-10"
        style={{ backgroundColor: accentColor }}
      />
      <div className="relative z-10 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {titleBn}
            </p>
            <p className="text-[11px] text-muted-foreground/60">{title}</p>
          </div>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}20` }}
          >
            <Icon className="w-5 h-5" style={{ color: accentColor }} />
          </div>
        </div>
        <div>
          <p className="text-3xl font-extrabold text-foreground">{value}</p>
          {subValue && (
            <p className="text-xs text-muted-foreground mt-0.5">{subValue}</p>
          )}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: accentColor }}>
            <HiOutlineArrowTrendingUp className="w-3.5 h-3.5" />
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  let stats;
  try {
    stats = await moderatorService.getDashboardStats();
  } catch {
    stats = null;
  }

  const ov = stats?.overview;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
          Moderator{" "}
          <span style={{ color: "#00BBA6" }}>Command Center</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Library Management System — Real-time operational overview
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="Total Patrons"
          titleBn="মোট শিক্ষার্থী"
          value={ov?.totalPatrons ?? "—"}
          subValue={`${ov?.activePatrons ?? 0} active · ${ov?.suspendedPatrons ?? 0} suspended`}
          icon={HiOutlineUsers}
          accentColor="#3b82f6"
          trend="+4.2% this month"
        />
        <StatCard
          title="Books Currently Loaned"
          titleBn="সক্রিয় ধার করা বই"
          value={ov?.activeLoans ?? "—"}
          subValue={`${ov?.availableCopies ?? 0} copies available in stock`}
          icon={HiOutlineBookOpen}
          accentColor="#00BBA6"
        />
        <StatCard
          title="Total Librarian Staff"
          titleBn="লাইব্রেরিয়ান স্টাফ"
          value={ov?.totalLibrarians ?? "—"}
          subValue="Active operational staff"
          icon={HiOutlineUserGroup}
          accentColor="#8b5cf6"
        />
        <StatCard
          title="Fine Revenue Collected"
          titleBn="ফাইন সংগ্রহ"
          value={`$${(ov?.fineCollected ?? 0).toFixed(2)}`}
          subValue={`$${(ov?.pendingFines ?? 0).toFixed(2)} outstanding pending`}
          icon={HiOutlineCurrencyDollar}
          accentColor="#f59e0b"
          trend="This month"
        />
      </div>

      {/* Quick Actions + Policy + Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-4 dashboard-card rounded-2xl p-5 space-y-4">
          <div>
            <h2 className="font-bold text-base text-foreground">দ্রুত অ্যাকশন</h2>
            <p className="text-muted-foreground text-xs mt-0.5">Quick Actions Panel</p>
          </div>
          <div className="space-y-2.5">
            <Link
              href="/dashboard/librarians"
              className="flex items-center gap-3 p-3 rounded-xl bg-[#00BBA6]/10 border border-[#00BBA6]/25 text-[#00BBA6] hover:bg-[#00BBA6]/20 transition text-sm font-semibold"
            >
              <HiOutlineUserGroup className="w-5 h-5" />
              <span>নতুন লাইব্রেরিয়ান তৈরি করুন</span>
            </Link>
            <Link
              href="/dashboard/users"
              className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border text-foreground hover:bg-[#00BBA6]/10 hover:border-[#00BBA6]/25 hover:text-[#00BBA6] transition text-sm font-semibold"
            >
              <HiOutlineUsers className="w-5 h-5" />
              <span>ইউজার ম্যানেজমেন্ট দেখুন</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border text-foreground hover:bg-[#00BBA6]/10 hover:border-[#00BBA6]/25 hover:text-[#00BBA6] transition text-sm font-semibold"
            >
              <HiOutlineShieldExclamation className="w-5 h-5" />
              <span>ফাইন ও পলিসি কনফিগার করুন</span>
            </Link>
            <Link
              href="/dashboard/logs"
              className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border text-foreground hover:bg-[#00BBA6]/10 hover:border-[#00BBA6]/25 hover:text-[#00BBA6] transition text-sm font-semibold"
            >
              <HiOutlineClipboardDocumentList className="w-5 h-5" />
              <span>সিস্টেম অডিট লগ দেখুন</span>
            </Link>
          </div>
        </div>

        {/* Active Policy Summary */}
        <div className="lg:col-span-4 dashboard-card rounded-2xl p-5 space-y-4">
          <div>
            <h2 className="font-bold text-base text-foreground">সক্রিয় পলিসি সারসংক্ষেপ</h2>
            <p className="text-muted-foreground text-xs mt-0.5">Active System Policy</p>
          </div>
          <div className="space-y-0">
            {[
              { label: "সর্বোচ্চ বই ধার সীমা", value: `${stats?.settings?.maxBorrowLimit ?? 3} টি বই` },
              { label: "ধার নেওয়ার মেয়াদ", value: `${stats?.settings?.borrowDurationDays ?? 14} দিন` },
              { label: "দৈনিক বিলম্ব ফাইন", value: `$${stats?.settings?.finePerDay ?? 1.0}/দিন` },
              { label: "গ্রেস পিরিয়ড", value: `${stats?.settings?.gracePeriodDays ?? 1} দিন` },
              { label: "সর্বোচ্চ ফাইন ক্যাপ", value: `$${stats?.settings?.maxUnpaidFineCap ?? 20}` },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-2.5 border-b border-border last:border-0"
              >
                <span className="text-muted-foreground text-xs font-medium">{item.label}</span>
                <span className="text-foreground font-bold text-sm">{item.value}</span>
              </div>
            ))}
          </div>
          <Link
            href="/dashboard/settings"
            className="block text-center text-xs font-bold hover:underline mt-2"
            style={{ color: "#00BBA6" }}
          >
            পলিসি পরিবর্তন করুন →
          </Link>
        </div>

        {/* Inventory */}
        <div className="lg:col-span-4 dashboard-card rounded-2xl p-5 space-y-4">
          <div>
            <h2 className="font-bold text-base text-foreground">ইনভেন্টরি অবস্থা</h2>
            <p className="text-muted-foreground text-xs mt-0.5">Book Inventory Status</p>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-muted-foreground font-medium">মোট বইয়ের কপি</span>
                <span className="text-foreground font-bold">{ov?.totalPhysicalCopies ?? 0}</span>
              </div>
              <div className="h-2.5 bg-secondary rounded-full overflow-hidden border border-border">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    backgroundColor: "#00BBA6",
                    width: `${ov?.totalPhysicalCopies
                      ? ((ov.availableCopies ?? 0) / ov.totalPhysicalCopies) * 100
                      : 0}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[11px] mt-1.5">
                <span className="font-semibold" style={{ color: "#00BBA6" }}>
                  {ov?.availableCopies ?? 0} Available
                </span>
                <span className="text-amber-500 font-semibold">
                  {ov?.activeLoans ?? 0} Loaned Out
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary rounded-xl p-3 text-center border border-border">
                <p className="text-2xl font-extrabold" style={{ color: "#00BBA6" }}>
                  {ov?.totalBooks ?? 0}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Unique Titles</p>
              </div>
              <div className="bg-secondary rounded-xl p-3 text-center border border-border">
                <p className="text-2xl font-extrabold text-amber-500">
                  {ov?.activeLoans ?? 0}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Currently Loaned</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
