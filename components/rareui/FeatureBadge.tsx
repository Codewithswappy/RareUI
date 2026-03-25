"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FeatureBadge({
  badgeText = "New",
  children = "Multi-currency account",
  href = "#",
}: {
  badgeText?: string;
  children?: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-2 rounded-lg bg-white/5 border border-neutral-200/80 shadow-md shadow-black/5 ring-1 ring-black/5 pl-1 pr-3 py-1  cursor-pointer overflow-hidden transition-all "
    >
      {/* Continuous Glare Effect */}
      <motion.div
        className="absolute top-0 w-[50%] h-full bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none z-0"
        initial={{ left: "-100%" }}
        animate={{ left: "200%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 3,
          ease: "linear",
          repeatDelay: 1, // Pause between shines
        }}
      />

      <span className="relative z-10 rounded-sm bg-white px-2.5 py-0.5 text-sm font-medium tracking-tight text-black shadow-sm shadow-black/10 ring-1 ring-black/10">
        {badgeText}
      </span>
      <span className="relative z-10 text-sm font-normal text-neutral-600 group-hover:text-neutral-800 transition-colors">
        {children}
      </span>
    </a>
  );
}
