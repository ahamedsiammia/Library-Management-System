"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiOutlineArrowLeft,
  HiStar,
  HiOutlineBookOpen,
  HiOutlineHeart,
  HiHeart,
  HiOutlineShare,
  HiOutlineShieldCheck,
  HiOutlineTag,
  HiOutlineBuildingLibrary,
  HiOutlineDocumentText,
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { bookService } from "@/services/book.service";
import { Book } from "@/types/book.types";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { user, loading: authLoading } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFav, setIsFav] = useState(false);
  const [requesting, setRequesting] = useState(false);

  // Authentication Protection Check
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("বইয়ের বিস্তারিত দেখতে অনুগ্রহ করে লগইন করুন।");
      router.push(`/register?redirect=/books/${id}`);
    }
  }, [user, authLoading, router, id]);

  // Fetch single book details
  useEffect(() => {
    if (!id) return;
    async function fetchBookDetails() {
      setLoading(true);
      try {
        const res = await bookService.getBookById(id);
        if (res.success && res.data) {
          setBook(res.data);
        } else {
          setError("বইটির তথ্য পাওয়া যায়নি।");
        }
      } catch (err) {
        setError("বইটির বিস্তারিত লোড করতে ব্যর্থ হয়েছে।");
      } finally {
        setLoading(false);
      }
    }
    fetchBookDetails();
  }, [id]);

  const handleBorrowRequest = () => {
    setRequesting(true);
    setTimeout(() => {
      setRequesting(false);
      toast.success("বইটির জন্য অনুরোধ সফলভাবে পাঠানো হয়েছে!");
    }, 1000);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-24 gap-3">
        <Loader2 className="w-10 h-10 text-[#00BBA6] animate-spin" />
        <p className="text-gray-500 font-medium text-sm">বইয়ের বিস্তারিত লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-slate-50/60 py-16 px-4 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-3xl border border-teal-100 shadow-md text-center max-w-md w-full space-y-4">
          <span className="text-4xl block">📚</span>
          <h2 className="text-xl font-bold text-gray-800">{error || "বই পাওয়া যায়নি"}</h2>
          <p className="text-xs text-gray-500">আপনার অনুরোধকৃত বইটি খুঁজে পাওয়া যায়নি অথবা মুছে ফেলা হয়েছে।</p>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00BBA6] text-white font-semibold rounded-xl text-sm hover:bg-teal-600 transition"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            সব বইয়ে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Link */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#00BBA6] transition"
          >
            <HiOutlineArrowLeft className="w-4 h-4 text-[#00BBA6]" />
            সব বইয়ে ফিরে যান
          </Link>
        </motion.div>

        {/* Main Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-teal-100/70 shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0"
        >
          {/* Left: Book Cover Image */}
          <div className="md:col-span-5 bg-gradient-to-b from-teal-50/50 to-slate-100 p-8 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-teal-100/60">
            <div className="relative w-64 h-88 rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {book.badge && (
                <span className="absolute top-4 left-4 bg-[#00BBA6] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {book.badge}
                </span>
              )}

              <button
                onClick={() => setIsFav(!isFav)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-700 hover:text-red-500 shadow-md transition"
              >
                {isFav ? (
                  <HiHeart className="w-6 h-6 text-red-500" />
                ) : (
                  <HiOutlineHeart className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Copies Available Badge */}
            <div className="mt-6 flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-teal-100 shadow-sm">
              <HiOutlineShieldCheck className="w-5 h-5 text-[#00BBA6]" />
              <span className="text-xs font-bold text-gray-700">
                অবশিষ্ট কপি:{" "}
                <span className="text-[#00BBA6] text-sm font-extrabold">
                  {book.copiesAvailable}
                </span>{" "}
                / {book.totalCopies}
              </span>
            </div>
          </div>

          {/* Right: Book Details Info */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00BBA6] font-semibold text-xs">
                  <HiOutlineTag className="w-3.5 h-3.5" />
                  {book.categoryBn || book.category}
                </span>

                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 text-amber-600 font-bold text-xs">
                  <HiStar className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{book.rating?.toFixed(1) ?? "4.8"}</span>
                  <span className="text-gray-400 font-normal">({book.reviewsCount ?? 12} রিভিউ)</span>
                </div>
              </div>

              {/* Titles */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-tight">
                  {book.title}
                </h1>
                {book.titleBn && (
                  <p className="text-sm font-semibold text-[#00BBA6] mt-1">{book.titleBn}</p>
                )}
              </div>

              {/* Author */}
              <div className="flex items-center gap-2 text-sm text-gray-600 pt-1">
                <HiOutlineUser className="w-4 h-4 text-teal-600" />
                <span>
                  লেখক: <strong className="text-gray-800 font-semibold">{book.author}</strong>
                </span>
              </div>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-gray-400 font-semibold block uppercase">পাবলিশার</span>
                  <span className="text-xs font-bold text-gray-700 truncate block mt-0.5">
                    {book.publisherBn || book.publisher}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-gray-400 font-semibold block uppercase">প্রকাশকাল</span>
                  <span className="text-xs font-bold text-gray-700 block mt-0.5">
                    {book.publicationYear}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-gray-400 font-semibold block uppercase">পৃষ্ঠা</span>
                  <span className="text-xs font-bold text-gray-700 block mt-0.5">{book.pages}</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-gray-400 font-semibold block uppercase">ISBN</span>
                  <span className="text-xs font-bold text-gray-700 block mt-0.5">{book.isbn}</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-gray-400 font-semibold block uppercase">শেলফ লোকেশন</span>
                  <span className="text-xs font-bold text-teal-600 block mt-0.5">
                    {book.shelfLocation}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-gray-400 font-semibold block uppercase">ভাষা</span>
                  <span className="text-xs font-bold text-gray-700 block mt-0.5">
                    {book.language || "বাংলা / English"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                  <HiOutlineDocumentText className="w-4 h-4 text-[#00BBA6]" />
                  বই বিবরণী
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed bg-teal-50/30 p-4 rounded-2xl border border-teal-100/50">
                  {book.descriptionBn || book.description}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleBorrowRequest}
                disabled={requesting || book.copiesAvailable === 0}
                className="w-full sm:flex-1 py-3.5 px-6 bg-[#00BBA6] hover:bg-teal-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                {requesting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <HiOutlineBookOpen className="w-5 h-5" />
                )}
                <span>
                  {book.copiesAvailable > 0 ? "বই ধার নেওয়ার অনুরোধ করুন" : "স্টকে কপি নেই"}
                </span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  toast.success("বইয়ের লিঙ্ক কপি করা হয়েছে!");
                }}
                className="w-full sm:w-auto p-3.5 bg-slate-100 hover:bg-slate-200 text-gray-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-xs"
              >
                <HiOutlineShare className="w-4 h-4 text-gray-500" />
                <span>শেয়ার করুন</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
