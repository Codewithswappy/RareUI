"use client";

import SkewOnScroll from "@/components/ui/SkewOnScroll";

import { motion } from "motion/react";
import Link from "next/link";
import { MoveRight, BookOpen, Layers } from "lucide-react";

export default function CTASection() {
    return (
        <section className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden bg-background">
             {/* --- Background Grid & Lines --- */}
           <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-grid-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-neutral-300 dark:text-neutral-500"/>
            </pattern>
          </defs>
          {/* Desktop Grid */}
          <rect x="10%" y="0" width="80%" height="100%" fill="url(#cta-grid-pattern)" className="hidden md:block" />
          <line x1="10%" y1="0" x2="10%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400 hidden md:block" strokeDasharray="4 4"/>
          <line x1="90%" y1="0" x2="90%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400 hidden md:block" strokeDasharray="4 4"/>

          {/* Mobile Grid */}
          <rect x="2.5%" y="0" width="95%" height="100%" fill="url(#cta-grid-pattern)" className="block md:hidden" />
          <line x1="2.5%" y1="0" x2="2.5%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400 block md:hidden" strokeDasharray="4 4"/>
          <line x1="97.5%" y1="0" x2="97.5%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400 block md:hidden" strokeDasharray="4 4"/>
          
          {/* Horizontal Lines */}
          <line x1="0" y1="0%" x2="100%" y2="0%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400" strokeDasharray="4 4"/>
          <line x1="0" y1="91%" x2="100%" y2="91%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400" strokeDasharray="4 4"/>
        </svg>
      </div>

             <div className="max-w-4xl w-[95%] md:w-[80%] mx-auto relative z-10 text-center">
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
                            className="group relative w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 text-base font-semibold text-background bg-foreground rounded-lg overflow-hidden cursor-pointer transition-all shadow-sm hover:shadow-md hover:shadow-orange-100/20"
                        >
                             <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-200 to-orange-400 opacity-0 group-hover:opacity-100 dark:group-hover:opacity-0 group-hover:text-white transition-opacity duration-400 ease-linear" />
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
