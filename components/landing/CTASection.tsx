"use client";

import SkewOnScroll from "@/components/ui/SkewOnScroll";

import { motion } from "motion/react";
import Link from "next/link";
import ThreeDButton from "../internal/ThreeDButton";

export default function CTASection() {
  return (
    <section className="relative w-[98%] max-w-[1600px] mx-auto pt-8 md:pt-8 px-4 md:px-8 overflow-hidden mb-0">
      {/* --- Technical Blueprint Background --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        {/* 1. Base Gradient Foundation */}
        <div className="absolute inset-0 transition-opacity duration-700 bg-linear-to-b from-white via-[#e8f2f6]/50 to-[#d8e8f0] dark:from-zinc-950 dark:via-[#0d2a36]/15 dark:to-black" />

        {/* 2. Vertical Technical Lines (Match Hero) */}
        <div
          className="absolute inset-0 opacity-[0.012] dark:opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "8px 100%",
          }}
        />

        {/* 3. Radial Depth Glow */}
        <div className="absolute inset-0 pointer-events-none transition-colors duration-700 bg-linear-to-t from-white/60 via-transparent to-transparent dark:from-black dark:via-transparent" />
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10 text-center py-20 px-8">
        <GridBrackets />
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
            <span className="text-transparent bg-clip-text bg-linear-to-r from-neutral-600 to-neutral-400 dark:from-neutral-600 dark:to-neutral-500">
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
            Join thousands of developers building with RareUI. Beautifully
            designed components that work seamlessly with your existing stack.
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
            <ThreeDButton
              text="Browse Components"
              className="dark:bg-white [&>span]:dark:text-black dark:shadow-[inset_0px_1px_0.75px_0px_rgba(0,0,0,0.02),0px_4px_4px_0px_rgba(255,255,255,0.1),0px_0px_0px_1px_rgba(255,255,255,0.2),0px_4px_4px_0px_rgba(255,255,255,0.1),0px_47.62px_46.23px_0px_rgba(255,255,255,0.1),0px_27.25px_26.45px_0px_rgba(255,255,255,0.1),0px_16.54px_16.06px_0px_rgba(255,255,255,0.1),0px_9.97px_9.68px_0px_rgba(255,255,255,0.1)]! border border-gray-200"
            />
          </Link>

          {/* Docs - Secondary */}
          <Link href="/docs/installation/cli" className="w-full sm:w-auto">
            <ThreeDButton
              text="Docs"
              className="dark:bg-white [&>span]:dark:text-black dark:shadow-[inset_0px_1px_0.75px_0px_rgba(0,0,0,0.02),0px_4px_4px_0px_rgba(255,255,255,0.1),0px_0px_0px_1px_rgba(255,255,255,0.2),0px_4px_4px_0px_rgba(255,255,255,0.1),0px_47.62px_46.23px_0px_rgba(255,255,255,0.1),0px_27.25px_26.45px_0px_rgba(255,255,255,0.1),0px_16.54px_16.06px_0px_rgba(255,255,255,0.1),0px_9.97px_9.68px_0px_rgba(255,255,255,0.1)]! border border-gray-400"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
function GridBrackets() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {/* Precision corner markers */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/30" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/30" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/30" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/30" />

      {/* Ghost layout line */}
      <div className="absolute inset-0 border border-primary/5 dark:border-white/5 opacity-20" />
    </div>
  );
}
