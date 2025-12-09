"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Tab {
  id: string;
  label: string;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const AnimatedTabs: React.FC<AnimatedTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
}) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div
      className={cn(
        'flex flex-row items-center justify-center p-1.5 rounded-full',
        'bg-white/60 dark:bg-zinc-900/60', // Light/Dark glass effect
        'border border-black/5 dark:border-white/10', // Border adaptation
        'backdrop-blur-xl', // Strong glass effect
        'shadow-2xl', // Container shadow
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isHovered = hoveredTab === tab.id;

        return (
          <motion.button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            onMouseEnter={() => setHoveredTab(tab.id)}
            onMouseLeave={() => setHoveredTab(null)}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'relative z-10 px-6 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200 outline-none cursor-pointer',
              isActive
                ? 'text-white dark:text-black' // Active text
                : 'text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300' // Inactive text
            )}
            style={{
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {/* Active Pill with "Transferring" Shadow */}
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-black dark:bg-white rounded-full z-[-1] shadow-xl dark:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 32,
                  mass: 0.9
                }}
              />
            )}

            {/* Hover Background - Subtle highlight */}
            {isHovered && !isActive && (
              <motion.div
                layoutId="hover-pill"
                className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-full z-[-1]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            )}

            <span className="relative z-10">{tab.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};