
import { getBookingsDetails } from "@/app/(dashboard)/_actions/fetch-api";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  HiOutlineArrowLeft,
  HiOutlineBanknotes,
  HiOutlineBookOpen,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineCreditCard,
  HiOutlineMapPin,
  HiOutlineStar,
  HiOutlineXCircle,
} from "react-icons/hi2";

type BookingStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "RETURNED"
  | "CANCELLED";

type BookingDetails = {
  id: string;
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

  book: {
    id: string;
    title: string;
    titleBn: string;
    author: string;
    category: string;
    rating: number;
    reviewsCount: number;
    coverImage: string;
    isbn: string;
    publisher: string;
    publicationYear: number;
    edition: string;
    language: string;
    pages: number;
    format: string;
    shelfLocation: string;
    description: string;
  };
};

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
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20";

    case "APPROVED":
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20";

    case "RETURNED":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";

    default:
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20";
  }
};

const BookingDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const result = await getBookingsDetails(id);

  if (!result?.success || !result?.data) {
    notFound();
  }

  const booking: BookingDetails = result.data;
  const { book } = booking;

  const totalPayable = booking.rentFee + booking.fineAmount;

  const timeline = [
    {
      label: "Requested",
      date: booking.requestDate,
      description: "Booking request submitted",
    },
    {
      label: "Approved",
      date: booking.approvedAt,
      description: "Your booking was approved",
    },
    {
      label: "Issued",
      date: booking.bookingDate,
      description: "Book was issued",
    },
    {
      label: "Due",
      date: booking.dueDate,
      description: "Expected return date",
    },
    {
      label: "Returned",
      date: booking.returnDate,
      description: "Book returned to library",
    },
  ];

  const bookInfo = [
    { label: "ISBN", value: book.isbn },
    { label: "Publisher", value: book.publisher },
    { label: "Publication Year", value: book.publicationYear },
    { label: "Edition", value: book.edition },
    { label: "Language", value: book.language },
    { label: "Pages", value: book.pages },
    { label: "Format", value: book.format },
    { label: "Shelf Location", value: book.shelfLocation },
  ];

  return (
    <section className="w-full space-y-6 pb-8">
      {/* Back */}
      <Link
        href="/dashboard/borrowed"
        className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#00A991] dark:text-slate-400 dark:hover:text-[#2dd4bf]"
      >
        <HiOutlineArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to My Bookings
      </Link>

      {/* Hero */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="h-2 bg-gradient-to-r from-[#00BBA6] via-teal-400 to-cyan-400" />

        <div className="grid lg:grid-cols-[280px_1fr]">
          {/* Cover */}
          <div className="bg-slate-50 p-6 dark:bg-slate-950/40 lg:p-8">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-[#00BBA6]/10 to-teal-50 shadow-xl dark:from-[#00BBA6]/10 dark:to-slate-900">
              <div className="absolute inset-0 flex items-center justify-center text-[#00A991]/40 dark:text-[#2dd4bf]/30">
                <HiOutlineBookOpen className="h-20 w-20" />
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.coverImage}
                alt={book.title}
                className="relative h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Hero Content */}
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-[#00BBA6]/10 px-3 py-1.5 text-xs font-bold text-[#009F8D] dark:bg-[#00BBA6]/10 dark:text-[#2dd4bf]">
                  {book.category}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusStyle(
                    booking.status,
                  )}`}
                >
                  <HiOutlineCheckCircle className="h-4 w-4" />
                  {booking.status}
                </span>
              </div>

              <h1 className="mt-5 max-w-2xl text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {book.title}
              </h1>

              <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
                {book.titleBn}
              </p>

              <p className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Written by {book.author}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-1.5">
                  <HiOutlineStar className="h-5 w-5 text-amber-500" />
                  <span className="font-bold text-slate-800 dark:text-white">
                    {book.rating}
                  </span>
                  <span className="text-sm text-slate-400">
                    ({book.reviewsCount} reviews)
                  </span>
                </div>

                <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

                <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                  <HiOutlineMapPin className="h-4 w-4 text-[#00A991] dark:text-[#2dd4bf]" />
                  Shelf {book.shelfLocation}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Booking ID
              </p>

              <p className="mt-1 font-mono text-sm font-semibold text-slate-600 dark:text-slate-300">
                #{booking.id.slice(0, 12)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rejection */}
      {booking.rejectionReason && (
        <div className="flex gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-500/20 dark:bg-red-500/10">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 dark:bg-red-500/10">
            <HiOutlineXCircle className="h-5 w-5 text-red-500" />
          </div>

          <div>
            <p className="font-bold text-red-700 dark:text-red-400">
              Booking Rejected
            </p>

            <p className="mt-1 text-sm leading-relaxed text-red-600 dark:text-red-300">
              {booking.rejectionReason}
            </p>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left */}
        <div className="space-y-6 lg:col-span-3">
          {/* Timeline */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#00A991] dark:text-[#2dd4bf]">
                Activity
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                Booking Timeline
              </h2>
            </div>

            <div className="relative">
              <div className="absolute bottom-4 left-[15px] top-4 w-px bg-slate-200 dark:bg-slate-700" />

              <div className="space-y-7">
                {timeline.map((step) => {
                  const done = Boolean(step.date);

                  return (
                    <div
                      key={step.label}
                      className="relative flex items-start gap-4"
                    >
                      <div
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-white dark:border-slate-900 ${
                          done
                            ? "bg-[#00BBA6] text-white"
                            : "bg-slate-200 text-slate-400 dark:bg-slate-700"
                        }`}
                      >
                        {done && <HiOutlineCheckCircle className="h-4 w-4" />}
                      </div>

                      <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
                        <div>
                          <p
                            className={`text-sm font-bold ${
                              done
                                ? "text-slate-800 dark:text-white"
                                : "text-slate-400 dark:text-slate-500"
                            }`}
                          >
                            {step.label}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                            {step.description}
                          </p>
                        </div>

                        <span className="shrink-0 text-xs font-medium text-slate-400 dark:text-slate-500">
                          {formatDate(step.date)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* About */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#00A991] dark:text-[#2dd4bf]">
              Book Information
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              About this Book
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {book.description}
            </p>

            <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-slate-100 pt-6 dark:border-slate-800 sm:grid-cols-4">
              {bookInfo.map((info) => (
                <div key={info.label}>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {info.label}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {info.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6 lg:col-span-2">
          {/* Payment */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-100 p-6 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00BBA6]/10 text-[#00A991] dark:text-[#2dd4bf]">
                  <HiOutlineCreditCard className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900 dark:text-white">
                    Payment Summary
                  </h2>

                  <p className="text-xs text-slate-400">
                    Your booking charges
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Rent Fee
                </span>

                <span className="font-bold text-slate-800 dark:text-white">
                  ৳{booking.rentFee}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Fine
                </span>

                <span
                  className={`font-bold ${
                    booking.fineAmount > 0
                      ? "text-red-500"
                      : "text-slate-800 dark:text-white"
                  }`}
                >
                  ৳{booking.fineAmount}
                </span>
              </div>

              <div className="border-t border-dashed border-slate-200 dark:border-slate-700" />

              <div className="rounded-2xl bg-[#00BBA6]/8 p-4 dark:bg-[#00BBA6]/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Total Payable
                  </span>

                  <span className="text-2xl font-black text-[#009F8D] dark:text-[#2dd4bf]">
                    ৳{totalPayable}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <HiOutlineBanknotes className="h-4 w-4" />
                    Rent + Fine
                  </span>

                  <span
                    className={`text-xs font-bold ${
                      booking.isPaid
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {booking.isPaid ? "Payment Completed" : "Payment Pending"}
                  </span>
                </div>
              </div>

              {booking.fineAmount > 0 && (
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Fine payment
                  </span>

                  <span
                    className={`text-xs font-bold ${
                      booking.finePaid
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-500 dark:text-red-400"
                    }`}>
                    {booking.finePaid ? "Paid" : "Unpaid"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Important Dates */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#00A991] dark:text-[#2dd4bf]">
              Schedule
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              Important Dates
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                <div>
                  <p className="text-xs text-slate-400">Requested</p>
                  <p className="mt-1 text-sm font-bold text-slate-800 dark:text-white">
                    {formatDate(booking.requestDate)}
                  </p>
                </div>

                <HiOutlineClock className="h-5 w-5 text-[#00A991] dark:text-[#2dd4bf]" />
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                <div>
                  <p className="text-xs text-slate-400">Due Date</p>
                  <p className="mt-1 text-sm font-bold text-slate-800 dark:text-white">
                    {formatDate(booking.dueDate)}
                  </p>
                </div>

                <HiOutlineClock className="h-5 w-5 text-[#00A991] dark:text-[#2dd4bf]" />
              </div>

              {booking.returnDate && (
                <div className="flex items-center justify-between rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
                  <div>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      Returned
                    </p>

                    <p className="mt-1 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                      {formatDate(booking.returnDate)}
                    </p>
                  </div>

                  <HiOutlineCheckCircle className="h-5 w-5 text-emerald-500" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingDetailsPage;

