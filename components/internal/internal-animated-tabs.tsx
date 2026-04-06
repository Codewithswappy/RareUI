'use client';

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
  layoutId = 'active-pill',
}) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div
      className={cn(
        'bg-muted/50 border-border/50 flex flex-row items-center rounded-lg border p-1',
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
              'relative z-10 flex-1 cursor-pointer rounded-md px-4 py-1.5 text-center text-sm font-medium transition-colors duration-200 outline-none',
              isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
            style={{
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {/* Active Pill */}
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="bg-background border-border/50 absolute inset-0 z-[-1] rounded-md border shadow-sm"
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
                className="bg-muted/50 absolute inset-0 z-[-1] rounded-md"
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
