"use client";

import {
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineCreditCard,
  HiOutlineEye,
  HiOutlineTrash,
} from "react-icons/hi";
import {
  HiOutlineBanknotes,
  HiOutlineCurrencyBangladeshi,
} from "react-icons/hi2";
import { getBookingsDetails } from "../_actions/fetch-api";
import Link from "next/link";

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

interface BookingTableProps {
  bookings: Booking[];
}

const formatDate = (date: string | null) => {
  if (!date) return "Not available";

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

const MyBookings = ({ bookings }: BookingTableProps) => {
  const handleViewDetails = async (bookingId: string) => {
    const result = await getBookingsDetails(bookingId);
    if (result.success === true) {
    }
    console.log("View booking details:", bookingId);
  };

  const handleDelete = (bookingId: string) => {
    console.log("Delete booking:", bookingId);
  };

  const handlePayment = (bookingId: string) => {
    console.log("Pay booking:", bookingId);
  };

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
              My Bookings
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Track your book requests, payments and returns.
            </p>
          </div>

          <div className="hidden rounded-xl border border-[#00BBA6]/20 bg-[#00BBA6]/5 px-4 py-2 dark:bg-[#00BBA6]/10 sm:block">
            <p className="text-xs font-semibold text-[#00A991] dark:text-[#2dd4bf]">
              Total Bookings
            </p>
            <p className="text-lg font-bold text-slate-800 dark:text-white">
              {bookings.length}
            </p>
          </div>
        </div>
      </div>

      {/* Booking Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {bookings.map((booking) => (
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

              {/* Book info */}
              <div className="mt-4 min-w-0">
                <div className="mb-1 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                  <span className="font-medium uppercase tracking-wider">
                    Booking
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span>#{booking.id.slice(0, 8)}</span>
                </div>

                <h3
                  className="truncate text-sm font-bold text-slate-800 dark:text-slate-100"
                  title={booking.bookId}
                >
                  {booking.bookId}
                </h3>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <HiOutlineCalendar className="h-4 w-4 shrink-0" />
                  <span>Requested {formatDate(booking.requestDate)}</span>
                </div>
              </div>

              {/* Fee + Fine */}
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Rent Fee
                  </p>
                  <div className="flex items-center gap-1">
                    <HiOutlineCurrencyBangladeshi className="h-4 w-4 text-[#00A991] dark:text-[#2dd4bf]" />
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      ৳{booking.rentFee}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Fine
                  </p>
                  <div className="flex items-center gap-1">
                    <HiOutlineCurrencyBangladeshi
                      className={`h-4 w-4 ${
                        booking.fineAmount > 0
                          ? "text-red-500 dark:text-red-400"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    />
                    <span
                      className={`text-sm font-bold ${
                        booking.fineAmount > 0
                          ? "text-red-500 dark:text-red-400"
                          : "text-slate-800 dark:text-slate-100"
                      }`}
                    >
                      ৳{booking.fineAmount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="mt-4 flex items-center gap-2">
                <HiOutlineCreditCard
                  className={`h-5 w-5 ${
                    booking.isPaid
                      ? "text-emerald-500 dark:text-emerald-400"
                      : "text-amber-500 dark:text-amber-400"
                  }`}
                />
                <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                  Payment:
                </p>
                <p
                  className={`text-xs font-bold ${
                    booking.isPaid
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {booking.isPaid ? "Paid" : "Unpaid"}
                </p>
              </div>

              {/* Bottom info */}
              <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <HiOutlineClock className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <span>
                    Due:{" "}
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      {formatDate(booking.dueDate)}
                    </span>
                  </span>
                </div>

                {booking.returnDate && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <HiOutlineCheckCircle className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                    <span>
                      Returned:{" "}
                      <span className="font-semibold text-slate-600 dark:text-slate-300">
                        {formatDate(booking.returnDate)}
                      </span>
                    </span>
                  </div>
                )}

                {booking.fineAmount > 0 && (
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-slate-400 dark:text-slate-500">
                      Fine payment:
                    </span>
                    <span
                      className={`font-bold ${
                        booking.finePaid
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-500 dark:text-red-400"
                      }`}
                    >
                      {booking.finePaid ? "Paid" : "Unpaid"}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions: mt-auto diye sobsomoy kartir niche thakbe */}
              <div className="mt-auto flex gap-2 pt-5">
                {booking.status === "PENDING" && (
                  <button
                    type="button"
                    onClick={() => handleDelete(booking.id)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-bold text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/15"
                  >
                    <HiOutlineTrash className="h-4 w-4" />
                    Delete
                  </button>
                )}

                {booking.status === "APPROVED" && (
                  <button
                    type="button"
                    onClick={() => handlePayment(booking.id)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#00BBA6] px-3 py-2.5 text-xs font-bold text-white shadow-sm shadow-[#00BBA6]/20 transition-all duration-200 hover:bg-[#0F766E] dark:bg-[#00A991] dark:hover:bg-[#00BBA6]"
                  >
                    <HiOutlineBanknotes className="h-4 w-4" />
                    Pay
                  </button>
                )}

                <Link
                  href={`/dashboard/borrowed/${booking.id}`}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 transition-all duration-200 hover:border-[#00BBA6]/40 hover:bg-[#00BBA6]/5 hover:text-[#00A991] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-[#00BBA6]/40 dark:hover:bg-[#00BBA6]/10 dark:hover:text-[#2dd4bf]"
                >
                  <HiOutlineEye className="h-4 w-4" />
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyBookings;
