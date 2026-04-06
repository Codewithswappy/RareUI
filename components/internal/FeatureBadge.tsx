'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureBadge({
  badgeText = 'New',
  children = 'Multi-currency account',
  href = '#',
}: {
  badgeText?: string;
  children?: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-lg border border-neutral-200/80 bg-white/5 py-1 pr-3 pl-1 shadow-md ring-1 shadow-black/5 ring-black/5 transition-all dark:border-neutral-700/80 dark:bg-neutral-900 dark:ring-white/5"
    >
      {/* Continuous Glare Effect */}
      <motion.div
        className="pointer-events-none absolute top-0 z-0 h-full w-[50%] -skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent"
        initial={{ left: '-100%' }}
        animate={{ left: '200%' }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 3,
          ease: 'linear',
          repeatDelay: 1, // Pause between shines
        }}
      />

      <span className="relative z-10 rounded-sm bg-white px-2.5 py-0.5 text-sm font-medium tracking-tight text-black shadow-sm ring-1 shadow-black/10 ring-black/10">
        {badgeText}
      </span>
      <span className="relative z-10 text-sm font-normal text-neutral-600 transition-colors group-hover:text-neutral-800 dark:text-neutral-400 group-hover:dark:text-neutral-200">
        {children}
      </span>
    </a>
  );
}
