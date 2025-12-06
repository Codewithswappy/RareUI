"use client";

import SkewOnScroll from "@/components/ui/SkewOnScroll";

import { motion } from "motion/react";
import Link from "next/link";
import { MoveRight, BookOpen, Layers } from "lucide-react";

export default function CTASection() {
    return (
        <section className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden bg-background">
             {/* Ambient Background Effects */}
             <div className="absolute inset-0 pointer-events-none overflow-hidden">
                 {/* Top Center Glow */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[100px] opacity-60" />
                 {/* Bottom Right Subtle */}
                 <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
                 {/* Grid Pattern Overlay (Optional, keeping it clean for now) */}
             </div>

             <div className="max-w-4xl mx-auto relative z-10 text-center">
                 {/* Badge/Label */}
                 <SkewOnScroll>
                     <motion.div
                        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center px-3 py-1 mb-6"
                     >
                        <span className="text-md font-medium text-neutral-900 dark:text-neutral-50 uppercase">Ready to build?</span>
                     </motion.div>
                 </SkewOnScroll>

                 {/* Headline */}
                 <SkewOnScroll>
                     <motion.h2 
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground"
                     >
                        Ship your next project <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-600 to-neutral-400 dark:from-neutral-600 dark:to-neutral-500">
                            faster than ever.
                        </span>
                     </motion.h2>
                 </SkewOnScroll>

                 {/* Subheadline */}
                 <SkewOnScroll>
                     <motion.p 
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
                     >
                        Join thousands of developers building with RareUI. 
                        Beautifully designed components that work seamlessly with your existing stack.
                     </motion.p>
                 </SkewOnScroll>

                 {/* Buttons */}
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                 >
                    {/* Browse Components - Primary */}
                    <Link href="/docs" className="w-full sm:w-auto">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 text-base font-semibold text-background bg-foreground rounded-lg overflow-hidden cursor-pointer transition-all shadow-lg hover:shadow-xl hover:shadow-orange-100/20"
                        >
                             <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-300 to-orange-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                             <div className="relative flex items-center gap-2">
                                <Layers className="w-5 h-5" />
                                <span>Browse Components</span>
                                {/* <MoveRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" /> */}
                             </div>
                        </motion.button>
                    </Link>

                    {/* Docs - Secondary */}
                    <Link href="/docs/installation/cli" className="w-full sm:w-auto">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 text-base font-medium text-foreground bg-background border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer shadow-sm"
                        >
                             <div className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-neutral-500 group-hover:text-foreground transition-colors" />
                                <span>Read Docs</span>
                             </div>
                        </motion.button>
                    </Link>
                 </motion.div>
             </div>
        </section>
    );
}
