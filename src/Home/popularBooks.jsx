import React from 'react';
import { motion } from 'framer-motion';

const popularBooks = [
    {
        id: 1,
        title: "Clean Code",
        author: "Robert C. Martin",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=300&h=400",
        tag: "Best Seller"
    },
    {
        id: 2,
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&q=80&w=300&h=400",
        tag: "Trending"
    },
    {
        id: 3,
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=300&h=400",
        tag: "Academic"
    },
    {
        id: 4,
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300&h=400",
        tag: "Popular"
    }
];

const PopularBooks = () => {
    return (
        <section className="py-20 bg-white dark:bg-slate-950 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-xl"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
                            Most <span className="text-teal-500">Popular Books</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            আমাদের লাইব্রেরির সেরা এবং সবচেয়ে বেশি পঠিত বইগুলো এখান থেকে দেখে নিন। 
                        </p>
                    </motion.div>
                    
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 border-2 border-teal-500 text-teal-500 font-bold rounded-full hover:bg-teal-500 hover:text-white transition-all duration-300"
                    >
                        View All Books
                    </motion.button>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {popularBooks.map((book, index) => (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            {/* Glass Effect Card */}
                            <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg">
                                {/* Image Section */}
                                <div className="h-[350px] overflow-hidden relative">
                                    <img 
                                        src={book.image} 
                                        alt={book.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                        {book.tag}
                                    </div>
                                    
                                    {/* Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                        <button className="p-3 bg-white text-teal-500 rounded-full hover:bg-teal-500 hover:text-white transition-colors shadow-xl">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                        </button>
                                        <button className="p-3 bg-white text-teal-500 rounded-full hover:bg-teal-500 hover:text-white transition-colors shadow-xl">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'fill-current' : 'text-slate-300'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                            ))}
                                            <span className="ml-2 text-xs text-slate-500 font-bold">{book.rating}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-white truncate mb-1">
                                        {book.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        by {book.author}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularBooks;