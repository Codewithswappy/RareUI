"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface Tab {
  id: string;
  label: string;
}

interface InternalAnimatedTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: any) => void;
  className?: string;
  layoutId?: string;
}

export const InternalAnimatedTabs: React.FC<InternalAnimatedTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
  layoutId = "active-pill"
}) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div
      className={cn(
        'flex flex-row items-center p-1 rounded-lg bg-muted/50 border border-border/50',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isHovered = hoveredTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            onMouseEnter={() => setHoveredTab(tab.id)}
            onMouseLeave={() => setHoveredTab(null)}
            className={cn(
              'relative z-10 px-4 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 outline-none cursor-pointer flex-1 text-center',
              isActive
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
            style={{
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {/* Active Pill */}
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 bg-background rounded-md shadow-sm border border-border/50 z-[-1]"
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}

            {/* Hover Background */}
            {isHovered && !isActive && (
              <motion.div
                layoutId={`${layoutId}-hover`}
                className="absolute inset-0 bg-muted/50 rounded-md z-[-1]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            )}

            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
