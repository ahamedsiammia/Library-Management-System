
"use client";

import { useState } from "react";
import Link from "next/link";
import type { Booking } from "./MyBookings";
import {
  HiOutlineBookOpen,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineArrowUturnLeft,
  HiOutlineEye,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";

interface ReturnBooksProps {
  bookings: Booking[];
}

const PAGE_SIZE = 6;

export default function ReturnBooks({
  bookings,
}: ReturnBooksProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const issuedCount = bookings.filter(
    (booking) => booking.status === "ISSUED"
  ).length;

  const returnedCount = bookings.filter(
    (booking) => booking.status === "RETURNED"
  ).length;

  const totalPages = Math.ceil(bookings.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const currentBookings = bookings.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const formatDate = (date?: string | Date | null) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const cardClass =
    "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-teal-700";

  const mutedText = "text-slate-500 dark:text-slate-400";
  const headingText = "text-slate-900 dark:text-slate-100";

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-8 transition-colors dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
            <HiOutlineArrowUturnLeft className="h-7 w-7" />
          </div>

          <h1 className={`text-2xl font-bold sm:text-3xl ${headingText}`}>
            Return Books
          </h1>

          <p className={`mt-2 text-sm sm:text-base ${mutedText}`}>
            Manage issued books and track your returned books.
          </p>
        </div>

        {/* Summary */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className={cardClass}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${mutedText}`}>
                  Currently Issued
                </p>
                <h2 className={`mt-2 text-3xl font-bold ${headingText}`}>
                  {issuedCount}
                </h2>
              </div>

              <div className="rounded-xl bg-amber-100 p-3 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                <HiOutlineClock className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${mutedText}`}>
                  Returned Books
                </p>
                <h2 className={`mt-2 text-3xl font-bold ${headingText}`}>
                  {returnedCount}
                </h2>
              </div>

              <div className="rounded-xl bg-teal-100 p-3 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
                <HiOutlineCheckCircle className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Results information */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <h2 className={`text-lg font-bold ${headingText}`}>
            Book Records
          </h2>

          <p className={`text-sm ${mutedText}`}>
            {bookings.length === 0
              ? "0 books"
              : `${startIndex + 1}–${Math.min(
                  startIndex + PAGE_SIZE,
                  bookings.length
                )} of ${bookings.length} books`}
          </p>
        </div>

        {/* Cards */}
        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <HiOutlineBookOpen className={`mx-auto h-12 w-12 ${mutedText}`} />

            <h3 className={`mt-4 text-lg font-semibold ${headingText}`}>
              No Books Found
            </h3>

            <p className={`mt-2 text-sm ${mutedText}`}>
              You have no issued or returned books yet.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {currentBookings.map((booking) => {
                const isIssued = booking.status === "ISSUED";

                return (
                  <article
                    key={booking.id}
                    className={`${cardClass} flex min-w-0 flex-col`}
                  >
                    {/* Card heading */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
                          <HiOutlineBookOpen className="h-6 w-6" />
                        </div>

                        <div className="min-w-0">
                          <h3 className={`truncate font-bold ${headingText}`}>
                            Book ID: {booking.bookId}
                          </h3>

                          <p className={`mt-1 truncate text-xs ${mutedText}`}>
                            Booking ID: {booking.id}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          isIssued
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                            : "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    {/* Dates */}
                    <div className="my-5 space-y-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
                      <div className="flex items-center justify-between gap-3">
                        <span className={`flex items-center gap-2 text-sm ${mutedText}`}>
                          <HiOutlineCalendarDays className="h-4 w-4 shrink-0" />
                          Due Date
                        </span>

                        <span className={`text-right text-sm font-semibold ${headingText}`}>
                          {formatDate(booking.dueDate)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className={`flex items-center gap-2 text-sm ${mutedText}`}>
                          <HiOutlineCheckCircle className="h-4 w-4 shrink-0" />
                          Return Date
                        </span>

                        <span className={`text-right text-sm font-semibold ${headingText}`}>
                          {formatDate(booking.returnDate)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex flex-col gap-3">
                      {isIssued && (
                        <button
                          type="button"
                          onClick={() => {
                            // Connect the return-book API here.
                          }}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
                        >
                          <HiOutlineArrowUturnLeft className="h-5 w-5" />
                          Return Book
                        </button>
                      )}

                      <Link
                        href={`/dashboard/borrowed/${booking.id}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <HiOutlineEye className="h-5 w-5" />
                        View Details
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Client-side pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <p className={`text-sm ${mutedText}`}>
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <HiOutlineChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      aria-current={currentPage === page ? "page" : undefined}
                      className={`h-10 min-w-10 rounded-xl px-3 text-sm font-semibold transition ${
                        currentPage === page
                          ? "bg-teal-700 text-white"
                          : "border border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(totalPages, page + 1)
                      )
                    }
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Next
                    <HiOutlineChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
