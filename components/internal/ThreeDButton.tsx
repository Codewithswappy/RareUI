"use client";

import React from "react";
import { motion } from "framer-motion";

// Inline utility if needed
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import Link from "next/link";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ThreeDButton({
  text = "Book a call",
  className,
  href,
}: {
  text?: string;
  className?: string;
  href?: string;
}) {
  const buttonContent = (
    <motion.button
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98, y: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={cn(
        "group relative flex items-center justify-center rounded-md shadow-sm shadow-black/10 ring-1 ring-black/10  bg-[#060612] px-6 py-4 text-white transition-colors cursor-pointer",
        className
      )}
      style={{
        boxShadow:
          "inset 0px 1px 0.5px 0px rgba(255, 255, 255, 0.1), 0px 4px 2px 0px rgba(0, 0, 0, 0.25), 0px 0px 0px 1px rgb(47, 47, 55), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 47.62px 46.23px 0px rgba(15, 15, 15, 0.4), 0px 27.25px 26.45px 0px rgba(15, 15, 15, 0.34), 0px 16px 16px 0px rgba(15, 15, 15, 0.29), 0px 9px 9px 0px rgba(15, 15, 15, 0.25)",
      }}
    >
      {/* Inner Border Overlay */}
      <div className="absolute inset-[2px] rounded-md border border-neutral-800 pointer-events-none z-0 shadow-sm shadow-black/10 ring-1 ring-black/5" />
      
      <span className="relative z-10 block whitespace-nowrap text-[16px] font-medium leading-[20px] text-white/90">
        {text}
      </span>
    </motion.button>
  );

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return buttonContent;
}
