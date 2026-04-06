'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import ThreeDButton from '../internal/ThreeDButton';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-neutral-50 py-20 transition-colors duration-500 dark:bg-neutral-950">
      <div className="relative z-10 mx-auto w-[98%] max-w-[1600px] flex-col rounded-lg border border-neutral-100/80 bg-neutral-50 p-4 shadow-sm ring-1 shadow-black/5 ring-black/5 transition-colors duration-500 md:flex md:p-10 dark:border-neutral-800/40 dark:bg-neutral-900/50 dark:shadow-black/20 dark:ring-white/5">
        <div>
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-left text-4xl font-medium tracking-tighter text-neutral-900 md:text-6xl dark:text-white"
          >
            Ship your next project <br className="hidden md:block" />
            <span className="pl-0 text-neutral-400 md:pl-6 dark:text-neutral-600">
              faster than ever.
            </span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-md mb-12 max-w-2xl pl-0 text-left leading-relaxed tracking-tight text-neutral-500 md:pl-10 md:text-xl dark:text-neutral-400"
          >
            Join thousands of developers building with RareUI. Beautifully designed components that
            work seamlessly with your existing stack.
          </motion.p>
        </div>

        <div className="flex justify-end">
          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
          >
            {/* Browse Components - Primary */}
            <Link href="/docs" className="w-full sm:w-auto">
              <button className="cursor-pointer rounded-md border-2 border-neutral-200/80 bg-neutral-200/50 px-4 py-3 font-medium text-neutral-900 shadow-md ring-1 inset-shadow-sm shadow-black/10 ring-black/20 inset-shadow-black/40 transition-colors duration-300 dark:border-neutral-700/50 dark:bg-neutral-800/50 dark:text-neutral-50 dark:shadow-black/20 dark:ring-white/10 dark:inset-shadow-black/60">
                Browse Components
              </button>
            </Link>

            {/* Docs - Secondary */}
            <Link href="/docs/installation/cli" className="w-full sm:w-auto">
              <button className="cursor-pointer rounded-md border-2 border-neutral-800/80 bg-neutral-950 px-4 py-3 font-medium text-neutral-100 shadow-md ring-1 inset-shadow-sm shadow-white/10 ring-white/20 inset-shadow-white/40 transition-colors duration-300 dark:border-neutral-300/80 dark:bg-white dark:text-neutral-900 dark:shadow-black/10 dark:ring-black/20 dark:inset-shadow-black/40">
                Documentation
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Mesh Elements - matching other sections */}
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/4 -translate-y-1/4 rounded-full bg-neutral-100 opacity-40 blur-[100px] dark:bg-neutral-700/20" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/4 rounded-full bg-neutral-100 opacity-40 blur-[100px] dark:bg-neutral-700/20" />
    </section>
  );
}
