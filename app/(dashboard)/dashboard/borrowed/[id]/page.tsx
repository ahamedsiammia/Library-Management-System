
import { getBookingsDetails } from "@/app/(dashboard)/_actions/fetch-api";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  HiOutlineArrowLeft,
  HiOutlineBanknotes,
  HiOutlineBookOpen,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineCreditCard,
  HiOutlineEnvelope,
  HiOutlineIdentification,
  HiOutlineMapPin,
  HiOutlineStar,
  HiOutlineBuildingLibrary,
  HiOutlineUser,
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
  updatedAt?: string;

  user: {
    id: string;
    name: string;
    email: string;
    roll: number;
    instituteName: string;
    semester: string;
    shift: string;
    role: string;
    imageUrl: string;
  };

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
  if (!date) return "Not available";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (date: string | null) => {
  if (!date) return "Not available";

  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const statusStyles: Record<BookingStatus, string> = {
  PENDING:
    "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20",
  APPROVED:
    "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20",
  REJECTED:
    "bg-red-50 text-red-700 ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20",
  RETURNED:
    "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",
  CANCELLED:
    "bg-slate-100 text-slate-600 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700",
};

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) => (
  <div className="min-w-0">
    <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
    <p className="mt-1 break-words text-sm font-semibold text-slate-800 dark:text-slate-200">
      {value ?? "—"}
    </p>
  </div>
);

const SectionHeading = ({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle?: string;
  icon: React.ElementType;
}) => (
  <div className="flex items-center gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400">
      <Icon className="h-[18px] w-[18px]" />
    </div>
    <div className="min-w-0">
      <h2 className="text-sm font-bold text-slate-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

const cardClass =
  "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900";

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

  const booking = result.data as BookingDetails;
  const { book, user } = booking;

  const totalCharges = booking.rentFee + booking.fineAmount;

  const bookInfo = [
    { label: "ISBN", value: book.isbn },
    { label: "Publisher", value: book.publisher },
    { label: "Publication year", value: book.publicationYear },
    { label: "Edition", value: book.edition },
    { label: "Language", value: book.language },
    { label: "Pages", value: book.pages },
    { label: "Format", value: book.format },
    { label: "Shelf location", value: book.shelfLocation },
  ];

  return (
    <main className="mx-auto w-full max-w-7xl space-y-5 pb-8">
      {/* Page heading */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href="/dashboard/borrowed"
            className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-400"
          >
            <HiOutlineArrowLeft className="h-4 w-4" />
            Back to bookings
          </Link>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Booking Details
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage borrower information, book details and payment records.
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold ring-1 ${statusStyles[booking.status]}`}
        >
          {booking.status === "REJECTED" ||
          booking.status === "CANCELLED" ? (
            <HiOutlineXCircle className="h-4 w-4" />
          ) : (
            <HiOutlineCheckCircle className="h-4 w-4" />
          )}
          {booking.status}
        </span>
      </div>

      {/* Booking reference strip */}
      <div className={`${cardClass} flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5`}>
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400">
            <HiOutlineIdentification className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Booking reference
            </p>
            <p className="mt-0.5 break-all font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
              {booking.id}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Request date
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-800 dark:text-slate-200">
            {formatDate(booking.requestDate)}
          </p>
        </div>
      </div>

      {/* Rejection and cancellation notices */}
      {booking.status === "REJECTED" && (
        <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/10">
          <HiOutlineXCircle className="h-5 w-5 shrink-0 text-red-500" />
          <div>
            <h2 className="text-sm font-bold text-red-700 dark:text-red-400">
              Booking Rejected
            </h2>
            <p className="mt-1 text-sm text-red-700/80 dark:text-red-300">
              {booking.rejectionReason || "No rejection reason was provided."}
            </p>
          </div>
        </div>
      )}

      {booking.status === "CANCELLED" && (
        <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
          <HiOutlineXCircle className="h-5 w-5 shrink-0 text-slate-500" />
          <div>
            <h2 className="text-sm font-bold text-slate-800 dark:text-white">
              Booking Cancelled
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              This booking is no longer active.
            </p>
          </div>
        </div>
      )}

      {/* Main compact grid */}
      <div className="grid items-start gap-5 lg:grid-cols-12">
        {/* Main column */}
        <div className="min-w-0 space-y-5 lg:col-span-7">
          {/* User information */}
          <section className={`${cardClass} p-4 sm:p-5`}>
            <SectionHeading
              title="Borrower Information"
              subtitle="Registered user and student profile"
              icon={HiOutlineUser}
            />

            <div className="mt-5 flex items-center gap-3 border-b border-slate-100 pb-5 dark:border-slate-800">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400">
                {user.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.imageUrl}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <HiOutlineUser className="h-7 w-7" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="break-words text-base font-bold text-slate-900 dark:text-white">
                    {user.name}
                  </h3>
                  <span className="rounded-md bg-teal-50 px-2 py-1 text-[10px] font-bold text-teal-700 dark:bg-teal-500/10 dark:text-teal-400">
                    {user.role}
                  </span>
                </div>

                <p className="mt-1 flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <HiOutlineEnvelope className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span className="break-all">{user.email}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-5 pt-5 sm:grid-cols-3">
              <DetailItem label="Student roll" value={user.roll} />
              <DetailItem label="Semester" value={user.semester} />
              <DetailItem label="Shift" value={user.shift} />
              <div className="col-span-2 sm:col-span-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Institute
                </p>
                <p className="mt-1 flex items-start gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <HiOutlineBuildingLibrary className="mt-0.5 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" />
                  {user.instituteName}
                </p>
              </div>
              <div className="col-span-2 sm:col-span-3">
                <DetailItem label="User ID" value={user.id} />
              </div>
            </div>
          </section>

          {/* Book information */}
          <section className={`${cardClass} overflow-hidden`}>
            <div className="border-b border-slate-100 p-4 dark:border-slate-800 sm:p-5">
              <SectionHeading
                title="Book Information"
                subtitle="Book details from the library collection"
                icon={HiOutlineBookOpen}
              />
            </div>

            <div className="p-4 sm:p-5">
              <div className="grid gap-4 sm:grid-cols-[112px_minmax(0,1fr)]">
                <div className="mx-auto w-full max-w-[112px] sm:mx-0">
                  <div className="aspect-[3/4] overflow-hidden rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                    {book.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-400">
                        <HiOutlineBookOpen className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="min-w-0">
                  <span className="inline-flex rounded-md bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-700 dark:bg-teal-500/10 dark:text-teal-400">
                    {book.category}
                  </span>

                  <h2 className="mt-2 break-words text-lg font-bold leading-snug text-slate-900 dark:text-white">
                    {book.title}
                  </h2>

                  {book.titleBn && (
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {book.titleBn}
                    </p>
                  )}

                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                    By {book.author}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1.5 text-[11px] font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                      <HiOutlineStar className="h-3.5 w-3.5" />
                      {book.rating} ({book.reviewsCount})
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1.5 text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      <HiOutlineMapPin className="h-3.5 w-3.5" />
                      {book.shelfLocation}
                    </span>
                  </div>
                </div>
              </div>

              {book.description && (
                <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    Description
                  </p>
                  <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400">
                    {book.description}
                  </p>
                </div>
              )}

              <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
                <h3 className="mb-4 text-xs font-bold text-slate-800 dark:text-slate-200">
                  Additional Details
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
                  {bookInfo.map((item) => (
                    <DetailItem
                      key={item.label}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="min-w-0 space-y-5 lg:col-span-5">
          {/* Booking overview */}
          <section className={`${cardClass} p-4 sm:p-5`}>
            <SectionHeading
              title="Booking Overview"
              subtitle="Request and borrowing dates"
              icon={HiOutlineCalendarDays}
            />

            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5">
              <DetailItem
                label="Booking status"
                value={booking.status}
              />
              <DetailItem
                label="Request date"
                value={formatDateTime(booking.requestDate)}
              />
              <DetailItem
                label="Approved date"
                value={formatDateTime(booking.approvedAt)}
              />
              <DetailItem
                label="Issue date"
                value={formatDateTime(booking.bookingDate)}
              />
              <DetailItem
                label="Due date"
                value={formatDate(booking.dueDate)}
              />
              <DetailItem
                label="Return date"
                value={formatDateTime(booking.returnDate)}
              />
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
              <DetailItem label="Booking ID" value={booking.id} />
            </div>
          </section>

          {/* Payment summary */}
          <section className={`${cardClass} overflow-hidden`}>
            <div className="flex items-center gap-3 border-b border-slate-100 p-4 dark:border-slate-800 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400">
                <HiOutlineCreditCard className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Payment Summary
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Charges and payment status
                </p>
              </div>
            </div>

            <div className="space-y-4 p-4 sm:p-5">
              <div className="rounded-xl bg-teal-50 p-4 dark:bg-teal-500/10">
                <p className="text-xs font-medium text-teal-700 dark:text-teal-400">
                  Total charges
                </p>
                <p className="mt-1 text-2xl font-black tracking-tight text-teal-800 dark:text-teal-300">
                  ৳{totalCharges.toFixed(2)}
                </p>
                <p className="mt-1 text-[11px] text-teal-700/70 dark:text-teal-400/70">
                  Rent fee + fine
                </p>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Rent fee
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  ৳{booking.rentFee.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Fine amount
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  ৳{booking.fineAmount.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-dashed border-slate-200 dark:border-slate-700" />

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Rent payment
                </span>
                <span
                  className={`rounded-md px-2.5 py-1 text-[10px] font-bold ${
                    booking.isPaid
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                  }`}
                >
                  {booking.isPaid ? "PAID" : "UNPAID"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Fine payment
                </span>
                <span
                  className={`rounded-md px-2.5 py-1 text-[10px] font-bold ${
                    booking.fineAmount === 0 || booking.finePaid
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                  }`}
                >
                  {booking.fineAmount === 0
                    ? "NO FINE"
                    : booking.finePaid
                      ? "PAID"
                      : "UNPAID"}
                </span>
              </div>

              <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
                <HiOutlineBanknotes className="mt-0.5 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" />
                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Total charges include rent and any applicable fine.
                  Payment statuses are tracked separately.
                </p>
              </div>
            </div>
          </section>

          {/* Quick details */}
          <section className={`${cardClass} p-4 sm:p-5`}>
            <SectionHeading
              title="Quick Details"
              subtitle="Reference information"
              icon={HiOutlineIdentification}
            />

            <div className="mt-5 space-y-4">
              <DetailItem label="Student roll" value={user.roll} />
              <div className="border-t border-slate-100 dark:border-slate-800" />
              <DetailItem label="Book ID" value={book.id} />
              <div className="border-t border-slate-100 dark:border-slate-800" />
              <DetailItem
                label="Last updated"
                value={formatDateTime(booking.updatedAt ?? null)}
              />
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
};

export default BookingDetailsPage;
