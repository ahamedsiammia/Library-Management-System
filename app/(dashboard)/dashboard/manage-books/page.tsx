"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineBookOpen,
  HiOutlinePlus,
  HiOutlineMagnifyingGlass,
  HiOutlinePencilSquare,
  HiOutlineXMark,
  HiOutlineBookmark,
  HiOutlineBuildingLibrary,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi2";
import { Book } from "@/types/book.types";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  createBookAction,
  updateBookAction,
  getAllBooksAdminAction,
} from "@/app/(dashboard)/_actions/books.actions";
import Image from "next/image";

const CATEGORIES = [
  "Technology",
  "Programming",
  "Science",
  "Mathematics",
  "Literature",
  "History",
  "Business",
  "Fiction",
  "Non-Fiction",
];

const INITIAL_FORM: Partial<Book> = {
  title: "",
  titleBn: "",
  author: "",
  category: "Technology",
  isbn: "",
  publisher: "",
  publicationYear: new Date().getFullYear(),
  pages: 200,
  totalCopies: 5,
  copiesAvailable: 5,
  shelfLocation: "A-1",
  coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
  description: "",
  status: "AVAILABLE",
  keyTopics: [],
  tags: [],
};

export default function ManageBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ page: 1, limit: 12, total: 0, totalPage: 1 });

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<Partial<Book>>(INITIAL_FORM);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllBooksAdminAction(page, search, category);
      if (res.success && res.data) {
        setBooks(res.data);
        if (res.meta) setMeta(res.meta);
      } else {
        toast.error(res.message || "বইয়ের তথ্য লোড করতে ব্যর্থ হয়েছে।");
      }
    } catch {
      toast.error("সার্ভারের সাথে সংযোগ ব্যর্থ হয়েছে।");
    } finally {
      setLoading(false);
    }
  }, [page, search, category]);

  useEffect(() => {
    const timer = setTimeout(() => fetchBooks(), 300);
    return () => clearTimeout(timer);
  }, [fetchBooks]);

  const openCreate = () => {
    setEditingBook(null);
    setForm(INITIAL_FORM);
    setShowModal(true);
  };

  const openEdit = (book: Book) => {
    setEditingBook(book);
    setForm({ ...book });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.isbn || !form.shelfLocation) {
      toast.error("অনুগ্রহ করে সকল প্রয়োজনীয় ফিল্ড পূরণ করুন।");
      return;
    }

    setSubmitting(true);
    try {
      const payload: Partial<Book> = {
        ...form,
        publicationYear: Number(form.publicationYear) || new Date().getFullYear(),
        pages: Number(form.pages) || 100,
        totalCopies: Number(form.totalCopies) || 1,
        copiesAvailable: Number(form.copiesAvailable) || 0,
        keyTopics: Array.isArray(form.keyTopics) ? form.keyTopics : [],
        tags: Array.isArray(form.tags) ? form.tags : [],
      };

      if (editingBook) {
        const res = await updateBookAction(editingBook.id, payload);
        if (res.success) {
          toast.success("বইয়ের তথ্য সফলভাবে আপডেট হয়েছে!");
          setShowModal(false);
          fetchBooks();
        } else {
          toast.error(res.message || "আপডেট ব্যর্থ হয়েছে।");
        }
      } else {
        const res = await createBookAction(payload);
        if (res.success) {
          toast.success("নতুন বই সফলভাবে যুক্ত হয়েছে!");
          setShowModal(false);
          fetchBooks();
        } else {
          toast.error(res.message || "বই তৈরি ব্যর্থ হয়েছে।");
        }
      }
    } catch {
      toast.error("সার্ভার ত্রুটি হয়েছে।");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <HiOutlineBookOpen className="w-7 h-7 text-[#00BBA6]" />
            Book Catalog Management
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            লাইব্রেরির বইয়ের সংগ্রহ ও কপি স্ট্যাটাস পরিচালনা করুন
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#00BBA6] hover:bg-teal-600 text-white font-bold rounded-xl shadow-md shadow-teal-500/20 transition text-sm shrink-0"
        >
          <HiOutlinePlus className="w-4 h-4" />
          নতুন বই যুক্ত করুন
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="বইয়ের নাম, লেখক অথবা ISBN দিয়ে অনুসন্ধান..."
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-[#00BBA6] transition"
          />
        </div>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2.5 bg-card border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#00BBA6] transition cursor-pointer min-w-[170px]"
        >
          <option value="">সকল ক্যাটাগরি</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Books Table / Grid */}
      <div className="dashboard-card rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-8 h-8 text-[#00BBA6] animate-spin" />
            <p className="text-muted-foreground text-sm">বইয়ের তালিকা লোড হচ্ছে...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 border border-dashed border-border rounded-2xl m-4">
            <HiOutlineBookOpen className="w-12 h-12 text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm">কোনো বই পাওয়া যায়নি।</p>
            <button
              onClick={openCreate}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#00BBA6]/10 text-[#00BBA6] font-bold rounded-xl border border-[#00BBA6]/30 text-sm hover:bg-[#00BBA6]/20 transition"
            >
              <HiOutlinePlus className="w-4 h-4" /> প্রথম বইটি যুক্ত করুন
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-5 py-3.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    বই
                  </th>
                  <th className="px-4 py-3.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    ক্যাটাগরি
                  </th>
                  <th className="px-4 py-3.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    কপি সংখ্যা
                  </th>
                  <th className="px-4 py-3.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    শেলফ অবস্থান
                  </th>
                  <th className="px-4 py-3.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    স্ট্যাটাস
                  </th>
                  <th className="px-4 py-3.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    অ্যাকশন
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {books.map((b) => {
                  const isAvailable = (b.copiesAvailable ?? 0) > 0;
                  return (
                    <tr key={b.id} className="hover:bg-secondary/40 transition">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-16 rounded-lg overflow-hidden shrink-0 bg-secondary border border-border">
                            {b.coverImage ? (
                              <Image
                                src={b.coverImage}
                                alt={b.title}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                <HiOutlineBookmark className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-foreground font-bold text-sm truncate max-w-[260px]">
                              {b.title}
                            </p>
                            <p className="text-muted-foreground text-xs">{b.author}</p>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              ISBN: {b.isbn}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-foreground border border-border">
                          {b.category}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-xs">
                          <span className="font-bold text-foreground">
                            {b.copiesAvailable ?? 0}
                          </span>
                          <span className="text-muted-foreground"> / {b.totalCopies ?? 0} টি</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <HiOutlineBuildingLibrary className="w-3.5 h-3.5" />
                          <span>{b.shelfLocation || "N/A"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                            isAvailable
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25"
                              : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/25"
                          }`}
                        >
                          {isAvailable ? (
                            <>
                              <HiOutlineCheckCircle className="w-3 h-3" />
                              মজুদ আছে
                            </>
                          ) : (
                            <>
                              <HiOutlineExclamationCircle className="w-3 h-3" />
                              মজুদ নেই
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => openEdit(b)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#00BBA6]/10 text-[#00BBA6] hover:bg-[#00BBA6]/20 border border-[#00BBA6]/25 transition"
                        >
                          <HiOutlinePencilSquare className="w-3.5 h-3.5" />
                          সম্পাদনা
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {meta.totalPage > 1 && (
          <div className="p-4 border-t border-border flex items-center ">
            <span className="text-xs text-muted-foreground">
              পৃষ্ঠা {meta.page} / {meta.totalPage} (মোট {meta.total} টি বই)
            </span>
            <div className="flex items-center gap-2 ml-5">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-2 rounded-xl bg-secondary border border-border text-foreground hover:bg-[#00BBA6]/10 hover:text-[#00BBA6] transition disabled:opacity-40"
              >
                <HiOutlineChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={page >= meta.totalPage}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 rounded-xl bg-secondary border border-border text-foreground hover:bg-[#00BBA6]/10 hover:text-[#00BBA6] transition disabled:opacity-40"
              >
                <HiOutlineChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-2xl p-6 w-full max-w-2xl shadow-2xl my-8"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-foreground font-extrabold text-lg">
                    {editingBook ? "বইয়ের তথ্য সম্পাদনা" : "নতুন বই যুক্ত করুন"}
                  </h2>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {editingBook ? "Edit Book Metadata" : "Add New Book to Catalog"}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1.5">
                      বইয়ের শিরোনাম (Title) *
                    </label>
                    <input
                      type="text"
                      value={form.title || ""}
                      onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                      placeholder="Clean Code"
                      className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#00BBA6] transition"
                      required
                    />
                  </div>

                  {/* Title Bengali */}
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1.5">
                      বাংলা শিরোনাম (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      value={form.titleBn || ""}
                      onChange={(e) => setForm((p) => ({ ...p, titleBn: e.target.value }))}
                      placeholder="ক্লিন কোড"
                      className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#00BBA6] transition"
                    />
                  </div>

                  {/* Author */}
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1.5">
                      লেখক (Author) *
                    </label>
                    <input
                      type="text"
                      value={form.author || ""}
                      onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
                      placeholder="Robert C. Martin"
                      className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#00BBA6] transition"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1.5">
                      ক্যাটাগরি *
                    </label>
                    <select
                      value={form.category || "Technology"}
                      onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#00BBA6] transition"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ISBN */}
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1.5">
                      ISBN নম্বর *
                    </label>
                    <input
                      type="text"
                      value={form.isbn || ""}
                      onChange={(e) => setForm((p) => ({ ...p, isbn: e.target.value }))}
                      placeholder="978-0132350884"
                      className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#00BBA6] transition"
                      required
                    />
                  </div>

                  {/* Publisher */}
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1.5">
                      প্রকাশক (Publisher)
                    </label>
                    <input
                      type="text"
                      value={form.publisher || ""}
                      onChange={(e) => setForm((p) => ({ ...p, publisher: e.target.value }))}
                      placeholder="Prentice Hall"
                      className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#00BBA6] transition"
                    />
                  </div>

                  {/* Total Copies */}
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1.5">
                      মোট কপি সংখ্যা *
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={form.totalCopies ?? 5}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          totalCopies: Number(e.target.value),
                          copiesAvailable: Number(e.target.value),
                        }))
                      }
                      className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#00BBA6] transition"
                      required
                    />
                  </div>

                  {/* Available Copies */}
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1.5">
                      বিদ্যমান কপি সংখ্যা *
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={form.copiesAvailable ?? 5}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, copiesAvailable: Number(e.target.value) }))
                      }
                      className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#00BBA6] transition"
                      required
                    />
                  </div>

                  {/* Shelf Location */}
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1.5">
                      শেলফ লোকেশন (Shelf Location) *
                    </label>
                    <input
                      type="text"
                      value={form.shelfLocation || ""}
                      onChange={(e) => setForm((p) => ({ ...p, shelfLocation: e.target.value }))}
                      placeholder="Shelf A-3, Row 2"
                      className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#00BBA6] transition"
                      required
                    />
                  </div>

                  {/* Cover Image URL */}
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1.5">
                      কভার ইমেজ URL
                    </label>
                    <input
                      type="text"
                      value={form.coverImage || ""}
                      onChange={(e) => setForm((p) => ({ ...p, coverImage: e.target.value }))}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#00BBA6] transition"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1.5">
                    বইয়ের বিবরণ (Description)
                  </label>
                  <textarea
                    value={form.description || ""}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    placeholder="বইটি সম্পর্কে সংক্ষিপ্ত বিবরণ..."
                    rows={3}
                    className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#00BBA6] transition resize-none"
                  />
                </div>

                {/* Form Actions */}
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
                    ) : editingBook ? (
                      "আপডেট সংরক্ষণ করুন"
                    ) : (
                      "বই সংরক্ষণ করুন"
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
