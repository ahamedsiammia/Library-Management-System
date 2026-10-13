"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  HiOutlineBookOpen,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineClock,
  HiOutlineCreditCard,
  HiOutlineEye,
  HiOutlineUser,
  HiOutlineXCircle,
} from "react-icons/hi2";
import { updateBookingRequest } from "../_actions/fetch-api";

/* ---------- Types ---------- */

type BookingStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "RETURNED"
  | "CANCELLED";

export type Booking = {
  id: string;
  userId: string;
  bookId: string;
  status: BookingStatus;
  rentFee: number;
  isPaid: boolean;
  requestDate: string;
  approvedAt: string | null;
  bookingDate: string | null;
  dueDate: string | null;
  returnDate: string | null;
  fineAmount: number;
  finePaid: boolean;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

type ManageRequestCardsProps = {
  bookings: Booking[];
  meta: Meta;
};

/* ---------- Config / helpers ---------- */

// Details page এর path এখানে বদলাতে পারো
const DETAILS_BASE_PATH = "/dashboard/manage-request";

const formatDate = (date: string | null) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusStyle = (status: BookingStatus) => {
  switch (status) {
    case "PENDING":
      return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400";
    case "APPROVED":
      return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400";
    case "RETURNED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400";
    case "REJECTED":
    case "CANCELLED":
      return "border-red-200 bg-red-50 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400";
    default:
      return "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }
};

// 1 ... 4 5 6 ... 20 ধরনের page list বানায়
const getPageNumbers = (current: number, total: number) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = Array.from(
    new Set([1, total, current - 1, current, current + 1]),
  )
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const result: (number | "...")[] = [];
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) result.push("...");
    result.push(p);
  });

  return result;
};

const pageLinkBase =
  "flex h-9 items-center gap-1 rounded-lg border px-3 text-xs font-bold transition";
const pageLinkActive =
  "border-slate-200 bg-white text-slate-600 hover:border-[#00BBA6] hover:text-[#009F8D] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-[#2dd4bf] dark:hover:text-[#2dd4bf]";
const pageLinkDisabled =
  "cursor-not-allowed border-slate-200 text-slate-400 opacity-40 dark:border-slate-700 dark:text-slate-500";

/* ---------- Component ---------- */

const ManageRequestCards = ({ bookings, meta }: ManageRequestCardsProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [activeId, setActiveId] = useState<string | null>(null); // কোন card এ কাজ চলছে
  const [rejectingId, setRejectingId] = useState<string | null>(null); // কোন card এ reject form খোলা
  const [reason, setReason] = useState("");

  // এই পেজের ভেতরে নতুন booking আগে
  const sortedBookings = useMemo(
    () =>
      [...bookings].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [bookings],
  );

  const handleUpdate = (bookingId: string,status: "APPROVED" | "REJECTED",rejectionReason?: string,) => {
    setActiveId(bookingId);
    const data = {status,rejectionReason}
    startTransition(async () => {
      const result = await updateBookingRequest(data,bookingId);
        // console.log(result,"status update result");
      if (result?.success === true) {
        toast.success(
          status === "APPROVED"
            ? "অনুরোধটি অনুমোদন করা হয়েছে!"
            : "অনুরোধটি বাতিল করা হয়েছে!",
        );
        setRejectingId(null);
        setReason("");
        router.refresh();
      } else {
        toast.error(result?.message || "স্ট্যাটাস আপডেট করা যায়নি");
      }

      setActiveId(null);
    });
  };

  const startIndex = (meta.page - 1) * meta.limit;
  const pageNumbers = getPageNumbers(meta.page, meta.totalPage);

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#00A991] dark:text-[#2dd4bf]">
            Librarian Panel
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            Manage Requests
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Review borrow requests and approve or reject them.
          </p>
        </div>

        <div className="hidden rounded-xl border border-[#00BBA6]/20 bg-[#00BBA6]/5 px-4 py-2 dark:bg-[#00BBA6]/10 sm:block">
          <p className="text-xs font-semibold text-[#00A991] dark:text-[#2dd4bf]">
            Total Requests
          </p>
          <p className="text-lg font-bold text-slate-800 dark:text-white">
            {meta.total}
          </p>
        </div>
      </div>

      {/* Cards */}
      {sortedBookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {sortedBookings.map((booking) => {
            const isBusy = isPending && activeId === booking.id;
            const isRejecting = rejectingId === booking.id;

            return (
              <div
                key={booking.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00BBA6]/30 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 dark:hover:border-[#00BBA6]/40"
              >
                <div className="flex flex-1 flex-col p-5">
                  {/* Top: icon + status */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00BBA6]/10 to-teal-50 text-[#00A991] dark:from-[#00BBA6]/15 dark:to-teal-950/40 dark:text-[#2dd4bf]">
                      <HiOutlineBookOpen className="h-6 w-6" />
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold ${getStatusStyle(
                        booking.status,
                      )}`}
                    >
                      <HiOutlineCheckCircle className="h-3.5 w-3.5" />
                      {booking.status}
                    </span>
                  </div>

                  {/* IDs */}
                  <div className="mt-4 min-w-0 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                      <span className="font-medium uppercase tracking-wider">
                        Request
                      </span>
                      <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                      <span className="font-mono">#{booking.id.slice(0, 8)}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <HiOutlineBookOpen className="h-4 w-4 shrink-0" />
                      <span className="shrink-0">Book:</span>
                      <span
                        className="truncate font-mono font-semibold text-slate-700 dark:text-slate-200"
                        title={booking.bookId}
                      >
                        {booking.bookId.slice(0, 8)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <HiOutlineUser className="h-4 w-4 shrink-0" />
                      <span className="shrink-0">User:</span>
                      <span
                        className="truncate font-mono font-semibold text-slate-700 dark:text-slate-200"
                        title={booking.userId}
                      >
                        {booking.userId.slice(0, 8)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <HiOutlineCalendarDays className="h-4 w-4 shrink-0" />
                      <span>Requested {formatDate(booking.requestDate)}</span>
                    </div>
                  </div>

                  {/* Fee + Payment */}
                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <div>
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Rent Fee
                      </p>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        ৳{booking.rentFee}
                      </span>
                    </div>

                    <div>
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Payment
                      </p>
                      <div className="flex items-center gap-1">
                        <HiOutlineCreditCard
                          className={`h-4 w-4 ${
                            booking.isPaid
                              ? "text-emerald-500 dark:text-emerald-400"
                              : "text-amber-500 dark:text-amber-400"
                          }`}
                        />
                        <span
                          className={`text-xs font-bold ${
                            booking.isPaid
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {booking.isPaid ? "Paid" : "Unpaid"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Due date / rejection reason */}
                  {(booking.dueDate || booking.rejectionReason) && (
                    <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 dark:border-slate-800">
                      {booking.dueDate && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                          <HiOutlineClock className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                          <span>
                            Due:{" "}
                            <span className="font-semibold text-slate-600 dark:text-slate-300">
                              {formatDate(booking.dueDate)}
                            </span>
                          </span>
                        </div>
                      )}

                      {booking.rejectionReason && (
                        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-500/10 dark:text-red-400">
                          <span className="font-bold">Reason: </span>
                          {booking.rejectionReason}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-auto space-y-2 pt-5">
                    {/* Reject reason form */}
                    {isRejecting && (
                      <div className="space-y-2 rounded-xl border border-red-200 bg-red-50/60 p-3 dark:border-red-500/20 dark:bg-red-500/5">
                        <label
                          htmlFor={`reason-${booking.id}`}
                          className="text-[11px] font-bold text-red-600 dark:text-red-400"
                        >
                          Rejection reason (optional)
                        </label>
                        <textarea
                          id={`reason-${booking.id}`}
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          rows={2}
                          placeholder="কেন বাতিল করছেন লিখুন..."
                          className="w-full resize-none rounded-lg border border-red-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none focus:border-red-400 dark:border-red-500/20 dark:bg-slate-900 dark:text-slate-200"
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => {
                              setRejectingId(null);
                              setReason("");
                            }}
                            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() =>
                              handleUpdate(
                                booking.id,
                                "REJECTED",
                                reason.trim() || undefined,
                              )
                            }
                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-600 disabled:opacity-50"
                          >
                            {isBusy && (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            )}
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Approve / Reject (শুধু PENDING হলে) */}
                    {booking.status === "PENDING" && !isRejecting && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => handleUpdate(booking.id, "APPROVED")}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#00BBA6] px-3 py-2.5 text-xs font-bold text-white shadow-sm shadow-[#00BBA6]/20 transition-all duration-200 hover:bg-[#0F766E] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#00A991] dark:hover:bg-[#00BBA6]"
                        >
                          {isBusy ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <HiOutlineCheckCircle className="h-4 w-4" />
                          )}
                          Approve
                        </button>

                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => {
                            setRejectingId(booking.id);
                            setReason("");
                          }}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-bold text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/15"
                        >
                          <HiOutlineXCircle className="h-4 w-4" />
                          Reject
                        </button>
                      </div>
                    )}

                    {/* Details */}
                    <Link
                      href={`/dashboard/manage-request/${booking.id}`}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 transition-all duration-200 hover:border-[#00BBA6]/40 hover:bg-[#00BBA6]/5 hover:text-[#00A991] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-[#00BBA6]/40 dark:hover:bg-[#00BBA6]/10 dark:hover:text-[#2dd4bf]"
                    >
                      <HiOutlineEye className="h-4 w-4" />
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center dark:border-slate-700 dark:bg-slate-900/50">
          <HiOutlineBookOpen className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600" />
          <h3 className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-300">
            No requests found
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            New borrow requests will appear here.
          </p>
        </div>
      )}

      {/* Pagination (URL এর ?page= দিয়ে) */}
      {meta.totalPage > 1 && (
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {meta.page > 1 ? (
              <Link
                href={`?page=${meta.page - 1}`}
                className={`${pageLinkBase} ${pageLinkActive}`}
              >
                <HiOutlineChevronLeft className="h-4 w-4" />
                <span className="hidden sm:block">Previous</span>
              </Link>
            ) : (
              <span className={`${pageLinkBase} ${pageLinkDisabled}`}>
                <HiOutlineChevronLeft className="h-4 w-4" />
                <span className="hidden sm:block">Previous</span>
              </span>
            )}

            <div className="flex items-center gap-1.5">
              {pageNumbers.map((p, index) =>
                p === "..." ? (
                  <span
                    key={`dots-${index}`}
                    className="px-1 text-xs font-bold text-slate-400"
                  >
                    …
                  </span>
                ) : (
                  <Link
                    key={p}
                    href={`?page=${p}`}
                    aria-current={p === meta.page ? "page" : undefined}
                    className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-bold transition ${
                      p === meta.page
                        ? "bg-[#00BBA6] text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-[#00BBA6] hover:text-[#009F8D] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-[#2dd4bf] dark:hover:text-[#2dd4bf]"
                    }`}
                  >
                    {p}
                  </Link>
                ),
              )}
            </div>

            {meta.page < meta.totalPage ? (
              <Link
                href={`?page=${meta.page + 1}`}
                className={`${pageLinkBase} ${pageLinkActive}`}
              >
                <span className="hidden sm:block">Next</span>
                <HiOutlineChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <span className={`${pageLinkBase} ${pageLinkDisabled}`}>
                <span className="hidden sm:block">Next</span>
                <HiOutlineChevronRight className="h-4 w-4" />
              </span>
            )}
          </div>

          <p className="text-xs text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-500 dark:text-slate-300">
              {startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-slate-500 dark:text-slate-300">
              {Math.min(startIndex + meta.limit, meta.total)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-500 dark:text-slate-300">
              {meta.total}
            </span>{" "}
            requests
          </p>
        </div>
      )}
    </section>
  );
};

export default ManageRequestCards;