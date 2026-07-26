"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineBookOpen,
  HiStar,
  HiOutlineHeart,
  HiHeart,
  HiOutlineBookmark,
  HiOutlineSparkles,
  HiOutlineMagnifyingGlass,
  HiOutlineFunnel,
  HiOutlineEye,
  HiChevronDown,
  HiCheck,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import { bookService } from "@/services/book.service";
import { Book, BookMeta } from "@/types/book.types";
import { Loader2 } from "lucide-react";

const CATEGORIES = [
  { name: "", nameBn: "সকল ক্যাটাগরি" },
  { name: "Programming", nameBn: "প্রোগ্রামিং" },
  { name: "Software Engineering", nameBn: "সফটওয়্যার ইঞ্জিনিয়ারিং" },
  { name: "Computer Science", nameBn: "কম্পিউটার সায়েন্স" },
  { name: "Web Development", nameBn: "ওয়েব ডেভেলপমেন্ট" },
  { name: "Data Science", nameBn: "ডাটা সায়েন্স" },
  { name: "Mathematics", nameBn: "গণিত" },
  { name: "Physics", nameBn: "পদার্থবিজ্ঞান" },
  { name: "Literature", nameBn: "সাহিত্য" },
];

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [meta, setMeta] = useState<BookMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Debounce search input
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchTerm]);

  // Fetch books from backend
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await bookService.getAllBooks({
        page: currentPage,
        search: debouncedSearch || undefined,
        category: selectedCategory.name || undefined,
      });
      if (res.success) {
        setBooks(res.data);
        setMeta(res.meta);
      } else {
        setError("বই লোড করতে সমস্যা হয়েছে।");
      }
    } catch (err) {
      setError("Server error. পরে আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch, selectedCategory.name]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleCategoryChange = (cat: (typeof CATEGORIES)[0]) => {
    setSelectedCategory(cat);
    setIsDropdownOpen(false);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    if (!meta || meta.totalPage <= 1) return null;
    const pages = [];
    const { totalPage, page } = meta;

    for (let i = 1; i <= totalPage; i++) {
      if (
        i === 1 ||
        i === totalPage ||
        (i >= page - 1 && i <= page + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-12">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-gray-500 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <HiChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((p, idx) =>
          p === "..." ? (
            <span key={`ellipsis-${idx}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => handlePageChange(Number(p))}
              className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                page === p
                  ? "bg-[#00BBA6] text-white shadow-md"
                  : "border border-slate-200 text-gray-600 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-600"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPage}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-gray-500 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <HiChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 space-y-3"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#00BBA6] font-medium text-sm">
            <HiOutlineSparkles className="w-4 h-4" /> ডিজিটাল লাইব্রেরি ক্যাটালগ
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800">
            Explore All <span className="text-[#00BBA6]">Books</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
            আমাদের সমৃদ্ধ ক্যাটালগ থেকে আপনার পছন্দের বইটি খুঁজে নিন এবং পড়া শুরু করুন।
          </p>

          {/* Search + Filter Bar */}
          <div className="pt-6 max-w-2xl mx-auto relative z-30">
            <div className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-full border border-teal-100 shadow-sm focus-within:shadow-md focus-within:border-[#00BBA6] transition-all flex flex-col sm:flex-row items-center gap-2">
              {/* Search Input */}
              <div className="relative w-full sm:flex-1">
                <input
                  type="text"
                  placeholder="বইয়ের নাম, লেখক বা ISBN দিয়ে খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm text-gray-700 focus:outline-none placeholder-gray-400"
                />
                <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>

              <div className="hidden sm:block w-[1px] h-6 bg-slate-200" />

              {/* Category Dropdown */}
              <div ref={dropdownRef} className="relative w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full sm:w-56 px-4 py-2.5 bg-slate-50 hover:bg-teal-50/60 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold text-gray-700 flex items-center justify-between gap-2 border border-slate-100 sm:border-none transition-all"
                >
                  <span className="flex items-center gap-2 truncate">
                    <HiOutlineFunnel className="text-[#00BBA6] w-4 h-4 shrink-0" />
                    <span>{selectedCategory.nameBn}</span>
                  </span>
                  <HiChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180 text-[#00BBA6]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-full sm:w-60 bg-white rounded-2xl shadow-xl border border-teal-100 p-2 overflow-hidden z-50"
                    >
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1.5 border-b border-slate-100">
                        ক্যাটাগরি সিলেক্ট করুন
                      </div>
                      <div className="space-y-1 mt-1 max-h-56 overflow-y-auto">
                        {CATEGORIES.map((cat) => {
                          const isSelected = selectedCategory.name === cat.name;
                          return (
                            <button
                              key={cat.name || "all"}
                              onClick={() => handleCategoryChange(cat)}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                                isSelected
                                  ? "bg-teal-50 text-[#00BBA6] font-semibold"
                                  : "text-gray-700 hover:bg-slate-50"
                              }`}
                            >
                              <span>{cat.nameBn}</span>
                              {isSelected && <HiCheck className="w-4 h-4 text-[#00BBA6]" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Result Count */}
          {meta && !loading && (
            <p className="text-xs text-gray-400 pt-1">
              মোট{" "}
              <span className="text-[#00BBA6] font-bold">{meta.total}</span> টি বই পাওয়া গেছে
              {debouncedSearch && (
                <> &quot;<span className="text-gray-600">{debouncedSearch}</span>&quot; অনুযায়ী</>
              )}
            </p>
          )}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-10 h-10 text-[#00BBA6] animate-spin" />
            <p className="text-gray-400 text-sm font-medium">বই লোড হচ্ছে...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-16 space-y-3">
            <HiOutlineBookmark className="w-12 h-12 mx-auto text-rose-300" />
            <p className="text-base font-semibold text-rose-500">{error}</p>
            <button
              onClick={fetchBooks}
              className="px-5 py-2 bg-[#00BBA6] text-white rounded-xl text-sm font-semibold hover:bg-teal-600 transition"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {/* Books Grid */}
        {!loading && !error && (
          <>
            {books.length === 0 ? (
              <div className="text-center py-16 text-gray-500 space-y-2">
                <HiOutlineBookmark className="w-12 h-12 mx-auto text-teal-300" />
                <p className="text-base font-semibold">কোনো বই পাওয়া যায়নি!</p>
                <p className="text-xs">ফিল্টার পরিবর্তন করে অথবা অন্য নাম দিয়ে চেষ্টা করুন।</p>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7"
              >
                <AnimatePresence>
                  {books.map((book) => {
                    const isFav = favorites.includes(book.id);
                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.3 }}
                        key={book.id}
                        className="bg-white rounded-3xl overflow-hidden border border-teal-100/70 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative z-10"
                      >
                        {/* Cover Image */}
                        <div className="relative h-56 bg-slate-100 overflow-hidden">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                          {book.badge && (
                            <span className="absolute top-3 left-3 bg-[#00BBA6] text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-md">
                              {book.badge}
                            </span>
                          )}

                          <button
                            onClick={() => toggleFavorite(book.id)}
                            className="absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-700 hover:text-red-500 shadow-sm transition-all active:scale-90"
                          >
                            {isFav ? (
                              <HiHeart className="w-5 h-5 text-red-500" />
                            ) : (
                              <HiOutlineHeart className="w-5 h-5" />
                            )}
                          </button>

                          {book.categoryBn && (
                            <span className="absolute bottom-3 left-3 text-xs bg-white/90 backdrop-blur-md text-gray-800 font-medium px-2.5 py-1 rounded-lg">
                              {book.categoryBn}
                            </span>
                          )}
                        </div>

                        {/* Book Info */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <div className="flex items-center justify-between text-xs mb-2">
                              <div className="flex items-center gap-1 text-amber-500 font-bold">
                                <HiStar className="w-4 h-4 fill-amber-400" />
                                <span>{book.rating?.toFixed(1) ?? "—"}</span>
                                <span className="text-gray-400 font-normal">
                                  ({book.reviewsCount ?? 0})
                                </span>
                              </div>
                              <span className="text-teal-600 font-medium bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                                {book.copiesAvailable} টি কপি খালি
                              </span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#00BBA6] transition-colors line-clamp-1">
                              {book.title}
                            </h3>
                            {book.titleBn && (
                              <p className="text-xs text-gray-500 font-medium line-clamp-1 mb-1">
                                {book.titleBn}
                              </p>
                            )}

                            <p className="text-xs text-gray-600 font-medium">
                              লেখক:{" "}
                              <span className="text-gray-800 font-semibold">{book.author}</span>
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-2">
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-gray-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300"
                            >
                              <HiOutlineEye className="w-4 h-4 text-gray-500" />
                              <span>বিস্তারিত</span>
                            </motion.button>

                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              disabled={book.copiesAvailable === 0}
                              className="py-2.5 px-3 bg-[#00BBA6] hover:bg-teal-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <HiOutlineBookOpen className="w-4 h-4" />
                              <span>অনুরোধ</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination */}
            {renderPagination()}

            {/* Meta info */}
            {meta && books.length > 0 && (
              <p className="text-center text-xs text-gray-400 mt-4">
                Page {meta.page} of {meta.totalPage} — মোট {meta.total} টি বই
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BooksPage;
