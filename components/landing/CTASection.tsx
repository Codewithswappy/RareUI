"use client";

import { motion } from "motion/react";
import Link from "next/link";
import ThreeDButton from "../internal/ThreeDButton";

export default function CTASection() {
  return (
    <section className="py-4 relative overflow-hidden bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500">
      <div className="w-[98%] max-w-[1600px] mx-auto bg-neutral-50 dark:bg-neutral-900/50 p-4 md:p-10 relative z-10 md:flex flex-col rounded-lg border border-neutral-100/80 dark:border-neutral-800/40 shadow-sm shadow-black/5 dark:shadow-black/20 ring-1 ring-black/5 dark:ring-white/5 transition-colors duration-500">
        <div>
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl text-left font-medium tracking-tighter mb-6 text-neutral-900 dark:text-white"
          >
            Ship your next project <br className="hidden md:block" />
            <span className="text-neutral-400 dark:text-neutral-600 md:pl-6 pl-0">
              faster than ever.
            </span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-md md:text-xl text-neutral-500 dark:text-neutral-400 mb-12 text-left md:pl-10 pl-0  max-w-2xl leading-relaxed tracking-tight"
          >
            Join thousands of developers building with RareUI. Beautifully
            designed components that work seamlessly with your existing stack.
          </motion.p>
        </div>

        <div className="flex justify-end">
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
              <button className="bg-neutral-200/50 dark:bg-neutral-800/50 px-4 py-3 rounded-md border-2 border-neutral-200/80 dark:border-neutral-700/50 inset-shadow-sm inset-shadow-black/40 dark:inset-shadow-black/60 text-neutral-900 dark:text-neutral-50 font-medium shadow-md shadow-black/10 dark:shadow-black/20 ring-1 ring-black/20 dark:ring-white/10  cursor-pointer transition-colors duration-300">
                Browse Components
              </button>
            </Link>

            {/* Docs - Secondary */}
            <Link href="/docs/installation/cli" className="w-full sm:w-auto">
              <button className="bg-neutral-950 dark:bg-white px-4 py-3 rounded-md border-2 border-neutral-800/80 dark:border-neutral-300/80 inset-shadow-sm inset-shadow-white/40 dark:inset-shadow-black/40 text-neutral-100 dark:text-neutral-900 font-medium shadow-md shadow-white/10 dark:shadow-black/10 ring-1 ring-white/20 dark:ring-black/20  cursor-pointer transition-colors duration-300">
                Documentation
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Mesh Elements - matching other sections */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 dark:bg-neutral-700/20 rounded-full blur-[100px] opacity-40 pointer-events-none translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neutral-100 dark:bg-neutral-700/20 rounded-full blur-[100px] opacity-40 pointer-events-none -translate-x-1/4 translate-y-1/4" />
    </section>
  );
}
