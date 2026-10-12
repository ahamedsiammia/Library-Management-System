"use client";

import Link from "next/link";
import  { useState } from "react";
import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineCheckCircle,
  HiOutlineEye,
  HiOutlineHashtag,
} from "react-icons/hi2";

type Payment = {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  type: string;
  method: string;
  status: string;
  transactionId: string;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type PaymentCardsProps = {
  payments: Payment[];
};

const ITEMS_PER_PAGE = 4;

const formatDate = (date: string | null) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const PaymentCards = ({ payments }: PaymentCardsProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(payments.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentPayments = payments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#00A991] dark:text-[#2dd4bf]">
            Payment History
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            My Payments
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            View your payment transactions and details.
          </p>
        </div>

        <div className="hidden rounded-full bg-[#00BBA6]/10 px-3 py-1.5 text-xs font-bold text-[#009F8D] dark:text-[#2dd4bf] sm:block">
          {payments.length} Payments
        </div>
      </div>

      {/* Payment Cards */}
      {currentPayments.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {currentPayments.map((payment) => (
            <div
              key={payment.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#00BBA6]/30 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-[#00BBA6]/30"
            >
              {/* Top */}
              <div className="border-b border-slate-100 p-5 dark:border-slate-800">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00BBA6]/10 text-[#00A991] dark:bg-[#00BBA6]/10 dark:text-[#2dd4bf]">
                    <HiOutlineBanknotes className="h-6 w-6" />
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <HiOutlineCheckCircle className="h-3.5 w-3.5" />
                    {payment.status}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-medium text-slate-400">
                    Payment Amount
                  </p>

                  <h3 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
                    ৳{payment.amount}
                  </h3>
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 space-y-4 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">Type</span>

                  <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {payment.type}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">Method</span>

                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {payment.method}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <HiOutlineHashtag className="h-3.5 w-3.5" />
                    Transaction ID
                  </div>

                  <p className="mt-1 truncate font-mono text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    {payment.transactionId}
                  </p>
                </div>

                <div className="flex items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <HiOutlineCalendarDays className="h-4 w-4 text-slate-400" />

                  <div>
                    <p className="text-[10px] text-slate-400">Paid At</p>

                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {formatDate(payment.paidAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Details Button */}
              <div className="border-t border-slate-100 p-4 dark:border-slate-800">
                <Link
                href={`/dashboard/payments/${payment.id}`}
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-[#00BBA6] hover:bg-[#00BBA6]/5 hover:text-[#009F8D] dark:border-slate-700 dark:text-slate-300 dark:hover:border-[#2dd4bf] dark:hover:bg-[#00BBA6]/10 dark:hover:text-[#2dd4bf]"
                >
                  <HiOutlineEye className="h-4 w-4" />
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center dark:border-slate-700 dark:bg-slate-900/50">
          <HiOutlineBanknotes className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600" />

          <h3 className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-300">
            No payments found
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Your payment history will appear here.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {/* Previous */}
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-600 transition hover:border-[#00BBA6] hover:text-[#009F8D] disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:border-[#2dd4bf] dark:hover:text-[#2dd4bf]"
          >
            <HiOutlineChevronLeft className="h-4 w-4" />
            <span className="hidden sm:block">Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange(page)}
                  className={`h-9 min-w-9 rounded-lg px-2 text-xs font-bold transition ${
                    currentPage === page
                      ? "bg-[#00BBA6] text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-[#00BBA6] hover:text-[#009F8D] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-[#2dd4bf] dark:hover:text-[#2dd4bf]"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Next */}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-600 transition hover:border-[#00BBA6] hover:text-[#009F8D] disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:border-[#2dd4bf] dark:hover:text-[#2dd4bf]"
          >
            <span className="hidden sm:block">Next</span>
            <HiOutlineChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Page Info */}
      {payments.length > 0 && totalPages > 1 && (
        <p className="mt-3 text-center text-xs text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-500 dark:text-slate-300">
            {startIndex + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-slate-500 dark:text-slate-300">
            {Math.min(startIndex + ITEMS_PER_PAGE, payments.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-500 dark:text-slate-300">
            {payments.length}
          </span>{" "}
          payments
        </p>
      )}
    </section>
  );
};

export default PaymentCards;

