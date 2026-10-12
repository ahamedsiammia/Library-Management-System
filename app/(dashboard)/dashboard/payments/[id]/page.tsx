import { getPaymentDetails } from '@/app/(dashboard)/_actions/fetch-api';
import {
    ArrowLeft,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    Clock3,
    CreditCard,
    Mail,
    ReceiptText,
    UserRound,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const PaymentDetailsPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    const result = await getPaymentDetails(id);
    const payment = result.data;

    const user = payment.user;
    const booking = payment.booking;

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:px-6 lg:px-8">

            {/* Header */}
            <div className="mx-auto mb-6 max-w-6xl">
                <Link
                    href="/dashboard/payments"
                    className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#00BBA6] dark:text-slate-400 dark:hover:text-[#00BBA6]"
                >
                    <ArrowLeft size={17} />
                    Back to Payments
                </Link>

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Payment Details
                        </h1>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            View payment, user and booking information
                        </p>
                    </div>

                    <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400">
                        <CheckCircle2 size={17} />
                        {payment.status}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">

                {/* Payment Summary */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00BBA6]/10 text-[#00BBA6]">
                            <CreditCard size={21} />
                        </div>

                        <div>
                            <h2 className="font-semibold">Payment Information</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Transaction details
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">

                        <InfoItem
                            label="Amount"
                            value={`৳${payment.amount}`}
                            highlight
                        />

                        <InfoItem
                            label="Payment Type"
                            value={payment.type}
                        />

                        <InfoItem
                            label="Payment Method"
                            value={payment.method}
                        />

                        <InfoItem
                            label="Status"
                            value={payment.status}
                            valueClass="text-emerald-600 dark:text-emerald-400"
                        />

                        <InfoItem
                            label="Transaction ID"
                            value={payment.transactionId}
                            full
                            mono
                        />

                        <InfoItem
                            label="Payment ID"
                            value={payment.id}
                            full
                            mono
                        />

                        <InfoItem
                            label="Paid At"
                            value={formatDate(payment.paidAt)}
                        />

                        <InfoItem
                            label="Created At"
                            value={formatDate(payment.createdAt)}
                        />
                    </div>
                </div>

                {/* User Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                            <UserRound size={21} />
                        </div>

                        <div>
                            <h2 className="font-semibold">User Details</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Customer information
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">

                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Name
                            </p>
                            <p className="mt-1 font-semibold">
                                {user.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Email
                            </p>
                            <div className="mt-1 flex items-center gap-2 text-sm">
                                <Mail size={15} className="text-slate-400" />
                                <span className="break-all">
                                    {user.email}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Roll
                                </p>
                                <p className="mt-1 font-medium">
                                    {user.roll}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Role
                                </p>
                                <p className="mt-1 font-medium">
                                    {user.role}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Institute
                            </p>
                            <p className="mt-1 text-sm font-medium">
                                {user.instituteName}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Semester
                                </p>
                                <p className="mt-1 font-medium">
                                    {user.semester}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Shift
                                </p>
                                <p className="mt-1 font-medium">
                                    {user.shift}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Booking Information */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-3">

                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                            <BookOpen size={21} />
                        </div>

                        <div>
                            <h2 className="font-semibold">Booking Information</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Related book booking details
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        <InfoItem
                            label="Booking Status"
                            value={booking.status}
                            valueClass="text-blue-600 dark:text-blue-400"
                        />

                        <InfoItem
                            label="Rent Fee"
                            value={`৳${booking.rentFee}`}
                        />

                        <InfoItem
                            label="Payment"
                            value={booking.isPaid ? 'Paid' : 'Unpaid'}
                            valueClass={
                                booking.isPaid
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : 'text-red-500'
                            }
                        />

                        <InfoItem
                            label="Fine"
                            value={`৳${booking.fineAmount}`}
                        />

                        <InfoItem
                            label="Request Date"
                            value={formatDate(booking.requestDate)}
                        />

                        <InfoItem
                            label="Approved At"
                            value={formatDate(booking.approvedAt)}
                        />

                        <InfoItem
                            label="Booking Date"
                            value={formatDate(booking.bookingDate)}
                        />

                        <InfoItem
                            label="Due Date"
                            value={formatDate(booking.dueDate)}
                        />

                        <InfoItem
                            label="Return Date"
                            value={formatDate(booking.returnDate)}
                        />

                        <InfoItem
                            label="Fine Paid"
                            value={booking.finePaid ? 'Yes' : 'No'}
                        />

                        <InfoItem
                            label="Book ID"
                            value={booking.bookId}
                            full
                            mono
                        />

                        <InfoItem
                            label="Booking ID"
                            value={booking.id}
                            full
                            mono
                        />

                    </div>
                </div>

                {/* Timeline */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-3">

                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                            <Clock3 size={21} />
                        </div>

                        <div>
                            <h2 className="font-semibold">Payment Timeline</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Payment activity
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">

                        <TimelineItem
                            title="Payment Created"
                            date={payment.createdAt}
                            icon={<ReceiptText size={17} />}
                        />

                        <TimelineItem
                            title="Payment Completed"
                            date={payment.paidAt}
                            icon={<CheckCircle2 size={17} />}
                        />

                        <TimelineItem
                            title="Last Updated"
                            date={payment.updatedAt}
                            icon={<CalendarDays size={17} />}
                        />

                    </div>
                </div>

            </div>
        </div>
    );
};

const InfoItem = ({
    label,
    value,
    full = false,
    mono = false,
    highlight = false,
    valueClass = '',
}: {
    label: string;
    value: string | number | null;
    full?: boolean;
    mono?: boolean;
    highlight?: boolean;
    valueClass?: string;
}) => {
    return (
        <div
            className={`rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50 ${
                full ? 'sm:col-span-2' : ''
            }`}
        >
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {label}
            </p>

            <p
                className={`mt-1.5 break-all font-semibold ${
                    highlight
                        ? 'text-xl text-[#00BBA6]'
                        : 'text-slate-800 dark:text-slate-100'
                } ${mono ? 'font-mono text-xs' : 'text-sm'} ${valueClass}`}
            >
                {value ?? 'N/A'}
            </p>
        </div>
    );
};

const TimelineItem = ({
    title,
    date,
    icon,
}: {
    title: string;
    date: string | null;
    icon: React.ReactNode;
}) => {
    return (
        <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00BBA6]/10 text-[#00BBA6]">
                {icon}
            </div>

            <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(date)}
                </p>
            </div>
        </div>
    );
};

const formatDate = (date: string | null) => {
    if (!date) return 'N/A';

    return new Date(date).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
};

export default PaymentDetailsPage;