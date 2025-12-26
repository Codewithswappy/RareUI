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
      className="group relative inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 pl-1 pr-3 py-1 backdrop-blur-md cursor-pointer overflow-hidden transition-all hover:bg-white/10 hover:border-white/20"
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

      <span className="relative z-10 rounded-full bg-white px-2.5 py-0.5 text-xs font-bold tracking-tight text-black shadow-sm">
        {badgeText}
      </span>
      <span className="relative z-10 text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
        {children}
      </span>
    </a>
  );
}
