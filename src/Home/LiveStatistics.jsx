import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    {
        id: 1,
        label: "Total Books",
        value: "২৫,০০০+",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
        ),
        delay: 0.1
    },
    {
        id: 2,
        label: "Active Students",
        value: "১৫,৪০০+",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
        ),
        delay: 0.2
    },
    {
        id: 3,
        label: "Digital Resources",
        value: "৮,২০০+",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
        ),
        delay: 0.3
    },
    {
        id: 4,
        label: "Daily Visitors",
        value: "১,১০০+",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
        ),
        delay: 0.4
    }
];

const LiveStatistics = () => {
    return (
        <section className="py-20 bg-transparent overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-xl"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
                            Our <span className="text-teal-500">Library Impact</span> In Numbers
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            লাইব্রেরির বিশাল সংগ্রহ এবং সক্রিয় শিক্ষার্থীদের পরিসংখ্যান এক নজরে দেখে নিন।
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="hidden md:block"
                    >
                        <div className="px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-lg backdrop-blur-sm">
                            <span className="text-teal-600 dark:text-teal-400 font-semibold text-sm">
                                ● Live Updates
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ 
                                duration: 0.5, 
                                delay: stat.delay,
                            }}
                            className="relative group"
                        >
                            {/* Card with Internal Decorations */}
                            <div className="relative p-8 rounded-3xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/30 dark:border-slate-700/50 shadow-xl text-center hover:border-teal-500/50 transition-all duration-500 overflow-hidden h-full">
                                
                                {/* Background Decorative Blurs Inside Card */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-teal-500/20 transition-colors"></div>
                                <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-500/5 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>

                                <div className="relative z-10">
                                    <div className="inline-flex items-center justify-center p-4 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl mb-6 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300 shadow-inner">
                                        {stat.icon}
                                    </div>
                                    <h3 className="text-4xl font-extrabold text-slate-800 dark:text-white mb-2 tracking-tight">
                                        {stat.value}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 font-medium tracking-wide uppercase text-xs">
                                        {stat.label}
                                    </p>
                                </div>
                                
                                {/* Bottom Accent Line */}
                                <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-gradient-to-r from-teal-500 to-cyan-400 group-hover:w-full transition-all duration-700"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LiveStatistics;