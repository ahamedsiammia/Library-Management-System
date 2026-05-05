import React from 'react';
import { motion } from 'framer-motion';

const categories = [
    {
        id: 1,
        name: "Engineering",
        count: "1,250 Books",
        icon: "⚙️",
        color: "from-blue-500/20 to-cyan-500/20"
    },
    {
        id: 2,
        name: "Programming",
        count: "840 Books",
        icon: "💻",
        color: "from-purple-500/20 to-pink-500/20"
    },
    {
        id: 3,
        name: "Literature",
        count: "620 Books",
        icon: "📚",
        color: "from-orange-500/20 to-yellow-500/20"
    },
    {
        id: 4,
        name: "Science",
        count: "950 Books",
        icon: "🧪",
        color: "from-green-500/20 to-emerald-500/20"
    }
];

const BooksCategory = () => {
    return (
        <section className="py-16  dark:bg-slate-900 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
                        Explore Our <span className="text-teal-500">Categories</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        আপনার প্রয়োজনীয় বই দ্রুত খুঁজে পেতে নিচের ক্যাটাগরিগুলো ব্রাউজ করুন। আমরা প্রতিনিয়ত নতুন নতুন রিসোর্স যুক্ত করছি।
                    </p>
                </motion.div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className={`relative group p-8 rounded-2xl border border-white/20 bg-gradient-to-br ${category.color} backdrop-blur-md shadow-xl cursor-pointer overflow-hidden`}
                        >
                            {/* Decorative Background Circle */}
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
                            
                            <div className="relative z-10">
                                <div className="text-4xl mb-4 bg-white/50 dark:bg-slate-800/50 w-16 h-16 flex items-center justify-center rounded-xl shadow-inner">
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                                    {category.name}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">
                                    {category.count}
                                </p>
                                
                                <motion.div 
                                    className="mt-4 flex items-center text-teal-600 dark:text-teal-400 font-bold text-sm"
                                    whileHover={{ x: 5 }}
                                >
                                    View Details 
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BooksCategory;