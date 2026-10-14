"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineBell,
  HiOutlinePlus,
  HiOutlineXMark,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineClock,
  HiOutlineGlobeAlt,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { Notice, CreateNoticePayload, NoticeVisibility } from "@/types/notice.types";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  getAllNoticesAction,
  createNoticeAction,
  updateNoticeAction,
  deleteNoticeAction,
} from "@/app/(dashboard)/_actions/notice.actions";
import { useAuth } from "@/hooks/useAuth";

const EMPTY_FORM: CreateNoticePayload = {
  title: "",
  description: "",
  visibility: "PUBLIC",
};

export default function NoticesPage() {
  const { user } = useAuth();
  const isManager = user?.role === "LIBRARIAN" || user?.role === "ADMIN";

  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState<CreateNoticePayload>(EMPTY_FORM);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await getAllNoticesAction();
      if (res.success && res.data) {
        setNotices(res.data);
      } else {
        toast.error(res.message || "নোটিশ লোড করতে ব্যর্থ হয়েছে।");
      }
    } catch {
      toast.error("সার্ভারের সাথে সংযোগ ব্যর্থ হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const openCreate = () => {
    setEditingNotice(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setForm({
      title: notice.title,
      description: notice.description,
      visibility: notice.visibility || "PUBLIC",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("শিরোনাম এবং বিবরণ পূরণ করুন।");
      return;
    }
    setSubmitting(true);
    try {
      if (editingNotice) {
        const res = await updateNoticeAction(editingNotice.id, form);
        if (res.success) {
          toast.success("নোটিশ আপডেট হয়েছে!");
          setShowModal(false);
          fetchNotices();
        } else {
          toast.error(res.message || "আপডেট ব্যর্থ হয়েছে।");
        }
      } else {
        const res = await createNoticeAction(form);
        if (res.success) {
          toast.success("নোটিশ তৈরি হয়েছে!");
          setShowModal(false);
          fetchNotices();
        } else {
          toast.error(res.message || "নোটিশ তৈরি ব্যর্থ হয়েছে।");
        }
      }
    } catch {
      toast.error("সার্ভারের সাথে সংযোগ ব্যর্থ হয়েছে।");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (noticeId: string) => {
    if (!confirm("আপনি কি এই নোটিশটি মুছতে চান?")) return;
    setDeletingId(noticeId);
    try {
      const res = await deleteNoticeAction(noticeId);
      if (res.success) {
        toast.success("নোটিশ মুছে ফেলা হয়েছে।");
        setNotices((prev) => prev.filter((n) => n.id !== noticeId));
      } else {
        toast.error(res.message || "মুছতে ব্যর্থ হয়েছে।");
      }
    } catch {
      toast.error("সার্ভারের সাথে সংযোগ ব্যর্থ হয়েছে।");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <HiOutlineBell className="w-7 h-7 text-[#00BBA6]" />
            {isManager ? "Notice Management" : "Library Notices"}
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {isManager
              ? "লাইব্রেরির সকল নোটিশ তৈরি ও পরিচালনা করুন"
              : "লাইব্রেরির সকল গুরুত্বপূর্ণ নোটিশ ও আপডেট দেখুন"}
          </p>
        </div>
        {isManager && (
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#00BBA6] hover:bg-teal-600 text-white font-bold rounded-xl shadow-md shadow-teal-500/20 transition text-sm"
          >
            <HiOutlinePlus className="w-4 h-4" />
            নতুন নোটিশ তৈরি
          </button>
        )}
      </div>

      {/* Notices List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="w-8 h-8 text-[#00BBA6] animate-spin" />
          <p className="text-muted-foreground text-sm font-medium">নোটিশ লোড হচ্ছে...</p>
        </div>
      ) : notices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 border border-dashed border-border rounded-2xl">
          <HiOutlineBell className="w-12 h-12 text-muted-foreground/40" />
          <p className="text-muted-foreground text-sm">কোনো নোটিশ পাওয়া যায়নি।</p>
          {isManager && (
            <button
              onClick={openCreate}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#00BBA6]/10 text-[#00BBA6] font-bold rounded-xl border border-[#00BBA6]/30 text-sm hover:bg-[#00BBA6]/20 transition"
            >
              <HiOutlinePlus className="w-4 h-4" /> প্রথম নোটিশ তৈরি করুন
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {notices.map((notice) => {
              const isPublic = notice.visibility === "PUBLIC";
              return (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 mt-0.5 ${
                          isPublic
                            ? "bg-teal-500/10 text-[#00BBA6] border-teal-500/25"
                            : "bg-amber-500/10 text-amber-500 border-amber-500/25"
                        }`}
                      >
                        {isPublic ? (
                          <HiOutlineGlobeAlt className="w-5 h-5" />
                        ) : (
                          <HiOutlineLockClosed className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                              isPublic
                                ? "bg-teal-500/10 text-[#00BBA6] border-teal-500/25"
                                : "bg-amber-500/10 text-amber-500 border-amber-500/25"
                            }`}
                          >
                            {isPublic ? "পাবলিক নোটিশ" : "প্রাইভেট নোটিশ"}
                          </span>
                        </div>
                        <h3 className="font-bold text-foreground text-base truncate">
                          {notice.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed whitespace-pre-wrap">
                          {notice.description}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <HiOutlineClock className="w-3.5 h-3.5" />
                            {new Date(notice.createdAt).toLocaleString("bn-BD")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isManager && (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => openEdit(notice)}
                          className="w-8 h-8 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition"
                          title="সম্পাদনা করুন"
                        >
                          <HiOutlinePencilSquare className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(notice.id)}
                          disabled={deletingId === notice.id}
                          className="w-8 h-8 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition disabled:opacity-60"
                          title="মুছে ফেলুন"
                        >
                          {deletingId === notice.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <HiOutlineTrash className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Create / Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-foreground font-extrabold text-lg">
                    {editingNotice ? "নোটিশ সম্পাদনা" : "নতুন নোটিশ তৈরি"}
                  </h2>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {editingNotice ? "Edit Notice" : "Create New Notice"}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  <HiOutlineXMark className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1.5">
                    নোটিশের শিরোনাম
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                    placeholder="নোটিশের শিরোনাম লিখুন..."
                    className="w-full px-4 py-2.5 bg-secondary border border-border rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-[#00BBA6] transition"
                  />
                </div>

                {/* Visibility */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1.5">
                    ভিজিবিলিটি (Visibility)
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, visibility: "PUBLIC" }))}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                        form.visibility === "PUBLIC"
                          ? "bg-teal-500/15 text-[#00BBA6] border-[#00BBA6]"
                          : "bg-secondary border-border text-muted-foreground hover:border-[#00BBA6]"
                      }`}
                    >
                      <HiOutlineGlobeAlt className="w-4 h-4" />
                      পাবলিক (সকলের জন্য)
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, visibility: "PRIVATE" }))}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                        form.visibility === "PRIVATE"
                          ? "bg-amber-500/15 text-amber-500 border-amber-500"
                          : "bg-secondary border-border text-muted-foreground hover:border-amber-500"
                      }`}
                    >
                      <HiOutlineLockClosed className="w-4 h-4" />
                      প্রাইভেট (শুধু স্টাফদের জন্য)
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1.5">
                    নোটিশের বিবরণ
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    placeholder="নোটিশের বিস্তারিত বিবরণ লিখুন..."
                    rows={5}
                    className="w-full px-4 py-2.5 bg-secondary border border-border rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-[#00BBA6] transition resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 bg-secondary hover:bg-border text-foreground font-bold rounded-xl text-sm transition"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-2.5 bg-[#00BBA6] hover:bg-teal-600 text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : editingNotice ? (
                      "আপডেট করুন"
                    ) : (
                      "নোটিশ তৈরি করুন"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
