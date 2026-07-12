import React from 'react';
import { motion } from 'framer-motion';

const reviews = [
    {
        id: 1,
        name: "Siam Ahmed",
        role: "CSE Student",
        comment: "এই লাইব্রেরি সিস্টেমটি আমার পড়াশোনাকে অনেক সহজ করে দিয়েছে। এখন আমি ঘরে বসেই বইয়ের প্রাপ্যতা চেক করতে পারি।",
        image: "https://i.pravatar.cc/150?u=siam",
        delay: 0.1
    },
    {
        id: 2,
        name: "Ariful Islam",
        role: "Librarian",
        comment: "অ্যাডমিন প্যানেলটি অত্যন্ত শক্তিশালী। বই আদান-প্রদান এবং জরিমানা হিসাব করা এখন মাত্র কয়েক সেকেন্ডের ব্যাপার।",
        image: "https://i.pravatar.cc/150?u=arif",
        delay: 0.2
    },
    {
        id: 3,
        name: "Sumaiya Akter",
        role: "Faculty Member",
        comment: "ডিজিটাল আর্কাইভ ফিচারটি অসাধারণ! ই-বুক এবং রিসার্চ পেপার খুঁজে পাওয়া এখন অনেক বেশি সুবিধাজনক।",
        image: "https://i.pravatar.cc/150?u=sumaiya",
        delay: 0.3
    }
];

const Testimonials = () => {
    return (
        <section className="py-20 bg-transparent overflow-hidden">
            <div className="container mx-auto px-4 relative">
                
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
                            What Our <span className="text-teal-500">Users Say</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            আমাদের লাইব্রেরি ম্যানেজমেন্ট সিস্টেম ব্যবহারকারীদের অভিজ্ঞতা এবং সাফল্যের গল্পগুলো পড়ুন।
                        </p>
                    </motion.div>
                </div>

                {/* Testimonial Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.4, delay: review.delay }}
                            className="relative group"
                        >
                            {/* Card with Glassmorphism */}
                            <div className="h-full p-8 rounded-3xl bg-white/30 dark:bg-slate-800/30 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 shadow-2xl overflow-hidden flex flex-col relative">
                                
                                {/* Inner Decorative Circles */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all duration-500"></div>
                                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl"></div>

                                {/* Quote Icon */}
                                <div className="mb-6 text-teal-500 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.34315 15.3601 2 17.017 2H19.017C20.6739 2 22.017 3.34315 22.017 5V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.017 21L2.017 18C2.017 16.8954 2.91243 16 4.017 16H7.017C7.56928 16 8.017 15.5523 8.017 15V9C8.017 8.44772 7.56928 8 7.017 8H4.017C2.91243 8 2.017 7.10457 2.017 6V5C2.017 3.34315 3.36014 2 5.017 2H7.017C8.67386 2 10.017 3.34315 10.017 5V15C10.017 18.3137 7.33071 21 4.017 21H2.017Z" />
                                    </svg>
                                </div>

                                {/* Comment */}
                                <p className="text-slate-700 dark:text-slate-300 italic mb-8 relative z-10 leading-relaxed">
                                    {review.comment}
                                </p>

                                {/* User Info */}
                                <div className="mt-auto flex items-center gap-4 relative z-10">
                                    <div className="w-14 h-14 rounded-full border-2 border-teal-500 p-0.5 shadow-lg group-hover:scale-110 transition-transform">
                                        <img 
                                            src={review.image} 
                                            alt={review.name} 
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 dark:text-white group-hover:text-teal-500 transition-colors">
                                            {review.name}
                                        </h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {review.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom Accent Decoration */}
                                <div className="absolute bottom-0 right-0 w-0 h-1 bg-teal-500 group-hover:w-full transition-all duration-700"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;