'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Inline utility if needed
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import Link from 'next/link';
import { useTheme } from 'next-themes';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LIGHT_SHADOW =
  'inset 0px 1px 0.5px 0px rgba(255, 255, 255, 0.1), 0px 4px 2px 0px rgba(0, 0, 0, 0.25), 0px 0px 0px 1px rgb(47, 47, 55), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 47.62px 46.23px 0px rgba(15, 15, 15, 0.4), 0px 27.25px 26.45px 0px rgba(15, 15, 15, 0.34), 0px 16px 16px 0px rgba(15, 15, 15, 0.29), 0px 9px 9px 0px rgba(15, 15, 15, 0.25)';

const DARK_SHADOW =
  'inset 0px 1px 0.5px 0px rgba(255, 255, 255, 0.15), 0px 0px 0px 1px rgba(255, 255, 255, 0.08), 0px 4px 8px 0px rgba(0, 0, 0, 0.4), 0px 2px 4px 0px rgba(0, 0, 0, 0.3), 0px 0px 24px 0px rgba(255, 255, 255, 0.04)';

export default function ThreeDButton({
  text = 'Book a call',
  className,
  href,
}: {
  text?: string;
  className?: string;
  href?: string;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const buttonContent = (
    <motion.button
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98, y: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={cn(
        'group relative flex cursor-pointer items-center justify-center rounded-md bg-[#060612] px-6 py-4 text-white ring-1 ring-black/10 transition-colors dark:bg-neutral-50 dark:text-black dark:ring-white',
        className
      )}
      style={{
        boxShadow: isDark ? DARK_SHADOW : LIGHT_SHADOW,
      }}
    >
      {/* Inner Border Overlay */}
      <div className="pointer-events-none absolute inset-[3px] z-0 rounded-md border border-neutral-800 ring-1 ring-black/5 dark:border-neutral-400 dark:ring-neutral-300" />

      <span className="relative z-10 block text-[16px] leading-[20px] font-medium whitespace-nowrap text-white/90 dark:text-black">
        {text}
      </span>
    </motion.button>
  );

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return buttonContent;
}
