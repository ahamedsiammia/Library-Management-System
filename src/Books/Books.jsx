import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  HiCheck
} from 'react-icons/hi2';

// ডামি বুক ডেটা
const booksData = [
  {
    id: 1,
    title: "Clean Code",
    titleBn: "ক্লিন কোড: চটপট ও গুছানো কোডিং",
    author: "Robert C. Martin",
    category: "Programming",
    categoryBn: "প্রোগ্রামিং",
    rating: 4.8,
    reviews: 120,
    copiesAvailable: 5,
    badge: "Best Seller",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "The Pragmatic Programmer",
    titleBn: "দ্যা প্রাগম্যাটিক প্রোগ্রামার",
    author: "Andrew Hunt & David Thomas",
    category: "Software Eng.",
    categoryBn: "সফটওয়্যার ইঞ্জিনিয়ারিং",
    rating: 4.9,
    reviews: 98,
    copiesAvailable: 3,
    badge: "Trending",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: "Introduction to Algorithms",
    titleBn: "অ্যালগরিদম পরিচিতি ও অ্যানালাইসিস",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    categoryBn: "কম্পিউটার সায়েন্স",
    rating: 4.7,
    reviews: 145,
    copiesAvailable: 2,
    badge: "Academic",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 4,
    title: "Eloquent JavaScript",
    titleBn: "ইলোকোয়েন্ট জাভাস্ক্রিপ্ট",
    author: "Marijn Haverbeke",
    category: "Web Dev",
    categoryBn: "ওয়েব ডেভেলপমেন্ট",
    rating: 4.9,
    reviews: 210,
    copiesAvailable: 8,
    badge: "Popular",
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 5,
    title: "Design Patterns",
    titleBn: "ডিজাইন প্যাটার্নস: অবজেক্ট ওরিয়েন্টেড",
    author: "Erich Gamma & Gang of Four",
    category: "Software Eng.",
    categoryBn: "সফটওয়্যার ইঞ্জিনিয়ারিং",
    rating: 4.6,
    reviews: 75,
    copiesAvailable: 4,
    badge: "Essential",
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 6,
    title: "Grokking Algorithms",
    titleBn: "গ্রোকিং অ্যালগরিদম চিত্রসহ",
    author: "Aditya Y. Bhargava",
    category: "Programming",
    categoryBn: "প্রোগ্রামিং",
    rating: 4.9,
    reviews: 180,
    copiesAvailable: 6,
    badge: "Recommended",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600"
  }
];

// কাস্টম ড্রপডাউনের জন্য ক্যাটাগরি লিস্ট
const categories = [
  { name: "All", nameBn: "সকল ক্যাটাগরি" },
  { name: "Programming", nameBn: "প্রোগ্রামিং" },
  { name: "Software Eng.", nameBn: "সফটওয়্যার ইঞ্জিনিয়ারিং" },
  { name: "Computer Science", nameBn: "কম্পিউটার সায়েন্স" },
  { name: "Web Dev", nameBn: "ওয়েব ডেভেলপমেন্ট" }
];

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // ফেভারিট টগল
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // ক্যাটাগরি ও সার্চ ফিল্টারিং
  const filteredBooks = booksData.filter(book => {
    const matchesCategory = selectedCategory.name === "All" || book.category === selectedCategory.name;
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.titleBn.includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
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

          {/* Smart Filter Bar (Search Box + Custom Animated Dropdown) */}
          <div className="pt-6 max-w-2xl mx-auto relative z-30">
            <div className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-full border border-teal-100 shadow-sm focus-within:shadow-md focus-within:border-[#00BBA6] transition-all flex flex-col sm:flex-row items-center gap-2">
              
              {/* Search Input Box */}
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

              {/* Divider Line */}
              <div className="hidden sm:block w-[1px] h-6 bg-slate-200"></div>

              {/* Custom Category Dropdown Button */}
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
                  <HiChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#00BBA6]' : ''}`} />
                </button>

                {/* Animated Dropdown Menu */}
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
                        {categories.map((cat) => {
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
                                  ? 'bg-teal-50 text-[#00BBA6] font-semibold' 
                                  : 'text-gray-700 hover:bg-slate-50'
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

        {/* Books Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7"
        >
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
                  {/* Top Image Box */}
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    <img 
                      src={book.coverImage} 
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

                    {/* Badge */}
                    <span className="absolute top-3 left-3 bg-[#00BBA6] text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-md">
                      {book.badge}
                    </span>

                    {/* Favorite Button */}
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

                    {/* Category Tag */}
                    <span className="absolute bottom-3 left-3 text-xs bg-white/90 backdrop-blur-md text-gray-800 font-medium px-2.5 py-1 rounded-lg">
                      {book.categoryBn}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Rating & Stock */}
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

                      {/* Titles */}
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#00BBA6] transition-colors line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium line-clamp-1 mb-1">
                        {book.titleBn}
                      </p>

                      {/* Author */}
                      <p className="text-xs text-gray-600 font-medium">
                        লেখক: <span className="text-gray-800 font-semibold">{book.author}</span>
                      </p>
                    </div>

                    {/* Action Buttons (Details + Request) */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {/* View Details Button */}
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-gray-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300"
                      >
                        <HiOutlineEye className="w-4 h-4 text-gray-500" />
                        <span>বিস্তারিত</span>
                      </motion.button>

                      {/* Request Button */}
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

        {/* Empty State */}
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

export default Books;