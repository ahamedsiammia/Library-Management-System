"use client";

import React, { useState } from "react";
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
} from "react-icons/hi2";
import { BOOKS_DATA, CATEGORIES_DATA } from "@/constants";
import { Category } from "@/types/book.types";

const BooksPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>(CATEGORIES_DATA[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredBooks = BOOKS_DATA.filter((book) => {
    const matchesCategory =
      selectedCategory.name === "All" || book.category === selectedCategory.name;
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.titleBn.includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
            আমাদের সমৃদ্ধ ক্যাটালগ থেকে আপনার পছন্দের বইটি খুঁজে নিন এবং পড়া শুরু করুন।
          </p>

          <div className="pt-6 max-w-2xl mx-auto relative z-30">
            <div className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-full border border-teal-100 shadow-sm focus-within:shadow-md focus-within:border-[#00BBA6] transition-all flex flex-col sm:flex-row items-center gap-2">
              <div className="relative w-full sm:flex-1">
                <input
                  type="text"
                  placeholder="বইয়ের নাম বা লেখক দিয়ে খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm text-gray-700 focus:outline-none placeholder-gray-400"
                />
                <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>

              <div className="hidden sm:block w-[1px] h-6 bg-slate-200"></div>

              <div className="relative w-full sm:w-auto">
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
                        {CATEGORIES_DATA.map((cat) => {
                          const isSelected = selectedCategory.name === cat.name;
                          return (
                            <button
                              key={cat.name}
                              onClick={() => {
                                setSelectedCategory(cat);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                                isSelected
                                  ? "bg-teal-50 text-[#00BBA6] font-semibold"
                                  : "text-gray-700 hover:bg-slate-50"
                              }`}
                            >
                              <span> ({cat.name})</span>
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
        </motion.div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          <AnimatePresence>
            {filteredBooks.map((book) => {
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
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

                    <span className="absolute top-3 left-3 bg-[#00BBA6] text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-md">
                      {book.badge}
                    </span>

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

                    <span className="absolute bottom-3 left-3 text-xs bg-white/90 backdrop-blur-md text-gray-800 font-medium px-2.5 py-1 rounded-lg">
                      {book.categoryBn}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <HiStar className="w-4 h-4 fill-amber-400" />
                          <span>{book.rating}</span>
                          <span className="text-gray-400 font-normal">({book.reviews})</span>
                        </div>
                        <span className="text-teal-600 font-medium bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                          {book.copiesAvailable} টি কপি খালি
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#00BBA6] transition-colors line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium line-clamp-1 mb-1">
                        {book.titleBn}
                      </p>

                      <p className="text-xs text-gray-600 font-medium">
                        লেখক: <span className="text-gray-800 font-semibold">{book.author}</span>
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
                        className="py-2.5 px-3 bg-[#00BBA6] hover:bg-teal-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm hover:shadow-md"
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

        {filteredBooks.length === 0 && (
          <div className="text-center py-16 text-gray-500 space-y-2">
            <HiOutlineBookmark className="w-12 h-12 mx-auto text-teal-300" />
            <p className="text-base font-semibold">কোনো বই পাওয়া যায়নি!</p>
            <p className="text-xs">ফিল্টার পরিবর্তন করে অথবা অন্য নাম দিয়ে চেষ্টা করুন।</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksPage;
