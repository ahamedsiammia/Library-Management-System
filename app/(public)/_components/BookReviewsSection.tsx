"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Review } from "@/types/review.types";
import {
  getReviewsByBookIdAction,
  createReviewAction,
  updateReviewAction,
  deleteReviewAction,
} from "@/app/(dashboard)/_actions/review.actions";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  HiStar,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineChatBubbleLeftRight,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface Props {
  bookId: string;
}

export default function BookReviewsSection({ bookId }: Props) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Edit states
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getReviewsByBookIdAction(bookId);
      if (res.success && res.data) {
        setReviews(res.data);
      }
    } catch {
      // silently handle or toast
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Check if current logged-in user already wrote a review
  const userExistingReview = user
    ? reviews.find((r) => r.userId === user.id)
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("রিভিউ দিতে অনুগ্রহ করে প্রথমে লগইন করুন।");
      return;
    }
    if (!comment.trim()) {
      toast.error("অনুগ্রহ করে আপনার মন্তব্য লিখুন।");
      return;
    }

    setSubmitting(true);
    try {
      const res = await createReviewAction({
        bookId,
        rating,
        comment: comment.trim(),
      });
      if (res.success) {
        toast.success("রিভিউ সফলভাবে প্রকাশ করা হয়েছে!");
        setComment("");
        setRating(5);
        fetchReviews();
      } else {
        toast.error(res.message || "রিভিউ যোগ করতে সমস্যা হয়েছে।");
      }
    } catch {
      toast.error("সার্ভার সমস্যা। আবার চেষ্টা করুন।");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (reviewId: string) => {
    if (!editComment.trim()) {
      toast.error("অনুগ্রহ করে মন্তব্য লিখুন।");
      return;
    }
    setSubmitting(true);
    try {
      const res = await updateReviewAction(reviewId, {
        rating: editRating,
        comment: editComment.trim(),
      });
      if (res.success) {
        toast.success("রিভিউ সফলভাবে আপডেট হয়েছে!");
        setEditingReviewId(null);
        fetchReviews();
      } else {
        toast.error(res.message || "আপডেট ব্যর্থ হয়েছে।");
      }
    } catch {
      toast.error("সার্ভার সমস্যা। আবার চেষ্টা করুন।");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই রিভিউটি মুছে ফেলতে চান?")) return;
    setDeletingId(reviewId);
    try {
      const res = await deleteReviewAction(reviewId);
      if (res.success) {
        toast.success("রিভিউ মুছে ফেলা হয়েছে।");
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      } else {
        toast.error(res.message || "মুছতে ব্যর্থ হয়েছে।");
      }
    } catch {
      toast.error("সার্ভার সমস্যা।");
    } finally {
      setDeletingId(null);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "5.0";

  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 shadow-lg p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            <HiOutlineChatBubbleLeftRight className="w-6 h-6 text-[#00BBA6]" />
            পাঠকদের রিভিউ ও রেটিং ({reviews.length})
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            বইটি সম্পর্কে অন্যান্য পাঠকদের মতামত দেখুন ও আপনার মতামত শেয়ার করুন
          </p>
        </div>

        <div className="flex items-center gap-3 bg-amber-50/80 px-4 py-2 rounded-2xl border border-amber-200/70 w-fit">
          <div className="flex text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <HiStar
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(Number(averageRating))
                    ? "fill-amber-400 text-amber-400"
                    : "fill-slate-200 text-slate-200"
                }`}
              />
            ))}
          </div>
          <span className="text-base font-extrabold text-amber-700">
            {averageRating}
          </span>
          <span className="text-xs text-amber-600/70">/ 5.0</span>
        </div>
      </div>

      {/* Review Submission Form (Only if logged in and hasn't reviewed yet) */}
      {user ? (
        !userExistingReview ? (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-50/70 p-5 sm:p-6 rounded-2xl border border-teal-100/60 space-y-4"
          >
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <HiOutlineSparkles className="w-4 h-4 text-[#00BBA6]" />
              আপনার রিভিউ লিখুন
            </h3>

            {/* Star Picker */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-600">রেটিং:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-0.5 text-slate-300 hover:scale-110 transition-transform"
                  >
                    <HiStar
                      className={`w-6 h-6 ${
                        star <= (hoverRating || rating)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold text-amber-600 ml-1">
                {rating} স্টার
              </span>
            </div>

            {/* Comment Textarea */}
            <div>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="বইটি আপনার কেমন লেগেছে? অন্য পাঠকদের জন্য সংক্ষেপে লিখুন..."
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#00BBA6] transition resize-none shadow-sm"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 bg-[#00BBA6] hover:bg-teal-600 text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center gap-2 shadow-sm disabled:opacity-60"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "রিভিউ জমা দিন"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200 text-xs text-teal-800 font-medium flex items-center justify-between">
            <span>✨ আপনি ইতিমধ্যে এই বইটিতে রিভিউ দিয়েছেন। নিচে তা সম্পাদনা করতে পারেন।</span>
          </div>
        )
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-gray-600 flex items-center justify-between">
          <span>রিভিউ লিখতে অনুগ্রহ করে আপনার অ্যাকাউন্টে লগইন করুন।</span>
          <Link
            href="/register"
            className="font-bold text-[#00BBA6] hover:underline"
          >
            লগইন / রেজিস্টার
          </Link>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-10 gap-2 text-gray-400 text-xs">
            <Loader2 className="w-5 h-5 text-[#00BBA6] animate-spin" />
            <span>রিভিউ লোড হচ্ছে...</span>
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-400 text-xs py-8">
            এখনও কোনো রিভিউ দেওয়া হয়নি। আপনিই প্রথম রিভিউ প্রদান করুন!
          </p>
        ) : (
          reviews.map((r) => {
            const isOwner = user?.id === r.userId;
            const canManage =
              isOwner || user?.role === "ADMIN" || user?.role === "LIBRARIAN";
            const isEditing = editingReviewId === r.id;

            return (
              <div
                key={r.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-teal-100 transition space-y-2.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00BBA6] to-teal-700 flex items-center justify-center text-white font-extrabold text-xs uppercase shadow-sm">
                      {r.user?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-gray-800">
                        {r.user?.name || "পাঠক"}
                        {isOwner && (
                          <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] bg-teal-100 text-teal-700 font-semibold">
                            আমার রিভিউ
                          </span>
                        )}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {new Date(r.createdAt).toLocaleDateString("bn-BD")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <HiStar
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= (isEditing ? editRating : r.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "fill-slate-200 text-slate-200"
                          }`}
                        />
                      ))}
                    </div>

                    {canManage && !isEditing && (
                      <div className="flex items-center gap-1 ml-2">
                        {isOwner && (
                          <button
                            onClick={() => {
                              setEditingReviewId(r.id);
                              setEditRating(r.rating);
                              setEditComment(r.comment);
                            }}
                            className="p-1 text-gray-400 hover:text-blue-500 rounded"
                            title="সম্পাদনা করুন"
                          >
                            <HiOutlinePencilSquare className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(r.id)}
                          disabled={deletingId === r.id}
                          className="p-1 text-gray-400 hover:text-red-500 rounded disabled:opacity-40"
                          title="মুছে ফেলুন"
                        >
                          {deletingId === r.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <HiOutlineTrash className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content or Edit Form */}
                {isEditing ? (
                  <div className="pt-2 space-y-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setEditRating(star)}
                          className="p-0.5"
                        >
                          <HiStar
                            className={`w-5 h-5 ${
                              star <= editRating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-slate-200 text-slate-200"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <textarea
                      rows={2}
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#00BBA6]"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingReviewId(null)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-gray-600 rounded-lg text-xs font-semibold"
                      >
                        বাতিল
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdate(r.id)}
                        disabled={submitting}
                        className="px-3 py-1 bg-[#00BBA6] hover:bg-teal-600 text-white rounded-lg text-xs font-bold"
                      >
                        সংরক্ষণ
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-11">
                    {r.comment}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
