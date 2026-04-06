'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Sparkles,
  MousePointer2,
  Leaf,
  MoveHorizontal,
  LineChart,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureItem {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface FeaturesListProps {
  features: string[] | FeatureItem[];
}

const DEFAULT_ICONS = [
  <MousePointer2 className="h-5 w-5" />,
  <Sparkles className="h-5 w-5" />,
  <Leaf className="h-5 w-5" />,
  <MoveHorizontal className="h-5 w-5" />,
  <LineChart className="h-5 w-5" />,
];

export const FeaturesList = ({ features }: FeaturesListProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const items = features.map((f, i) => {
    if (typeof f === 'string') {
      return {
        title: f,
        description: 'Seamlessly integrated and optimized for high-performance React applications.',
        icon: DEFAULT_ICONS[i % DEFAULT_ICONS.length],
      };
    }
    return {
      ...f,
      icon: f.icon || DEFAULT_ICONS[i % DEFAULT_ICONS.length],
    };
  });

  return (
    <div className="flex max-w-full flex-col gap-8">
      <h2 className="font-mono text-4xl font-semibold tracking-tight text-neutral-400 dark:text-neutral-800">
        Features
      </h2>

      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              'group overflow-hidden rounded-md transition-all duration-500',
              activeIndex === index
                ? 'bg-neutral-50 dark:bg-neutral-900/40'
                : 'bg-white dark:bg-neutral-950'
            )}
          >
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="flex w-full items-center justify-between p-5 text-left transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    'rounded-lg p-2 transition-colors duration-500',
                    activeIndex === index
                      ? 'text-neutral-900 dark:text-neutral-100'
                      : 'text-neutral-400 group-hover:text-neutral-600 dark:text-neutral-600 dark:group-hover:text-neutral-400'
                  )}
                >
                  {item.icon}
                </div>
                <span
                  className={cn(
                    'text-[17px] font-semibold tracking-tight transition-colors duration-500',
                    activeIndex === index
                      ? 'text-neutral-900 dark:text-neutral-100'
                      : 'text-neutral-600 dark:text-neutral-400'
                  )}
                >
                  {item.title}
                </span>
              </div>
              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="text-neutral-400"
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: {
                      height: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                        restDelta: 0.01,
                      },
                      opacity: { duration: 0.2, delay: 0.1 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      },
                      opacity: { duration: 0.1 },
                    },
                  }}
                >
                  <div className="ml-14 px-5 pb-6">
                    <p className="max-w-[90%] text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
