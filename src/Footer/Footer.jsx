import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../Logo/Logo';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative pt-16 pb-8 bg-transparent overflow-hidden border-t border-white/20 dark:border-slate-800/50">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Brand Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-2">
                            <Logo></Logo>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            আধুনিক ডিজিটাল লাইব্রেরি সমাধান। আমরা বই পড়াকে সহজ এবং আনন্দদায়ক করতে প্রতিশ্রুতিবদ্ধ।
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                            <li><a href="#" className="hover:text-teal-500 transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-teal-500 transition-colors">All Books</a></li>
                            <li><a href="#" className="hover:text-teal-500 transition-colors">Categories</a></li>
                            <li><a href="#" className="hover:text-teal-500 transition-colors">Digital Archive</a></li>
                        </ul>
                    </motion.div>

                    {/* Support */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Support</h4>
                        <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                            <li><a href="#" className="hover:text-teal-500 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-teal-500 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-teal-500 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-teal-500 transition-colors">Contact Us</a></li>
                        </ul>
                    </motion.div>

                    {/* Newsletter / Contact */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Newsletter</h4>
                        <div className="relative group">
                            <input 
                                type="email" 
                                placeholder="Enter email"
                                className="w-full p-4 pr-12 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/30 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all shadow-lg"
                            />
                            <button className="absolute right-2 top-2 p-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors shadow-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 dark:border-slate-800/30 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <p>© {currentYear} DevAxe. All rights reserved.</p>
                    <div className="flex gap-6">
                        <motion.a whileHover={{ y: -3 }} target="_blank" href="https://www.facebook.com/farhan.ahamed.siam.2024" className="hover:text-teal-500 transition-colors">Facebook</motion.a>
                        <motion.a whileHover={{ y: -3 }} href="https://www.linkedin.com/in/siam-ahamed/" target="_blank"  className="hover:text-teal-500 transition-colors">LinkedIn</motion.a>
                        <motion.a whileHover={{ y: -3 }} target="_blank" href="https://github.com/ahamedsiammia" className="hover:text-teal-500 transition-colors">GitHub</motion.a>
                    </div>
                </div>
            </div>

            {/* Inner Decoration Blurs */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
        </footer>
    );
};

export default Footer;