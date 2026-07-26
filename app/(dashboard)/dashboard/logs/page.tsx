import React from "react";
import {
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineCheckCircle,
  HiOutlineInformationCircle,
  HiOutlineXCircle,
} from "react-icons/hi2";
import { moderatorService } from "@/services/moderator.service";
import { ActivityLog } from "@/types/moderator.types";

export const revalidate = 60;

const SEVERITY_CONFIG: Record<
  string,
  { icon: React.ElementType; color: string; bg: string }
> = {
  SUCCESS: {
    icon: HiOutlineCheckCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  WARNING: {
    icon: HiOutlineExclamationTriangle,
    color: "text-amber-500",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  ERROR: {
    icon: HiOutlineXCircle,
    color: "text-red-500",
    bg: "bg-red-500/10 border-red-500/20",
  },
  INFO: {
    icon: HiOutlineInformationCircle,
    color: "text-blue-500",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
};

function formatTime(isoString: string) {
  return new Date(isoString).toLocaleString("bn-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function LogsPage() {
  let logs: ActivityLog[] = [];
  try {
    logs = await moderatorService.getActivityLogs();
  } catch {
    logs = [];
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
          <HiOutlineDocumentText className="w-7 h-7 text-[#00BBA6]" />
          Audit & Activity Logs
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          সিস্টেমের সকল গুরুত্বপূর্ণ কার্যক্রমের অপরিবর্তনীয় অডিট ট্রেইল।
        </p>
      </div>

      {/* Log Entries */}
      {logs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 border border-dashed border-border rounded-2xl">
          <HiOutlineDocumentText className="w-12 h-12 text-muted-foreground/40" />
          <p className="text-muted-foreground text-sm">কোনো অ্যাক্টিভিটি লগ পাওয়া যায়নি।</p>
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => {
            const cfg = SEVERITY_CONFIG[log.severity] ?? SEVERITY_CONFIG.INFO;
            const Icon = cfg.icon;
            return (
              <div
                key={log.id}
                className={`flex items-start gap-4 p-4 rounded-2xl border ${cfg.bg} transition`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg}`}>
                  <Icon className={`w-5 h-5 ${cfg.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-xs font-extrabold ${cfg.color} uppercase tracking-wider`}>
                      {log.action.replace(/_/g, " ")}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      By: {log.performedBy}
                    </span>
                  </div>
                  <p className="text-foreground text-sm leading-relaxed">{log.details}</p>
                  <p className="text-muted-foreground text-[11px] mt-1.5">{formatTime(log.timestamp)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
