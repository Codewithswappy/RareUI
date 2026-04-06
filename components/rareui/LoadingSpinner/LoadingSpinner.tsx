'use client';

import React from 'react';
import { motion, Transition } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string; // Allow custom classes
}

const spinTransition: Transition = {
  repeat: Infinity,
  ease: 'linear',
  duration: 1, // continuous spin
};

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative flex h-6 w-6 items-center justify-center">
        <svg
          viewBox="0 0 18 18"
          className="absolute h-full w-full text-neutral-200 dark:text-neutral-800"
        >
          <path
            d="M 9 16.25 C 4.996 16.25 1.75 13.004 1.75 9 C 1.75 4.996 4.996 1.75 9 1.75 C 13.004 1.75 16.25 4.996 16.25 9 C 16.25 13.004 13.004 16.25 9 16.25 Z"
            fill="transparent"
            strokeWidth="2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Rotating Segment */}
        <motion.div
          className="absolute h-full w-full"
          animate={{ rotate: 360 }}
          transition={spinTransition}
        >
          {/* Main Stroke */}
          <svg
            viewBox="0 0 18 18"
            className="absolute top-0 left-0 h-full w-full text-black dark:text-white"
          >
            <path
              d="M 16.25 9 C 16.25 10.07 16.018 11.086 15.602 12 C 15.163 12.965 14.518 13.817 13.724 14.5"
              fill="transparent"
              strokeWidth="2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <svg
            viewBox="0 0 18 18"
            className="absolute top-0 left-0 h-full w-full text-black opacity-60 blur-[2px] dark:text-white"
          >
            <path
              d="M 16.25 9 C 16.25 10.07 16.018 11.086 15.602 12 C 15.163 12.965 14.518 13.817 13.724 14.5"
              fill="transparent"
              strokeWidth="2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      <div className="relative overflow-hidden rounded-full">
        <motion.span
          className={cn(
            'block bg-clip-text font-sans text-sm font-medium text-transparent',
            'bg-linear-to-r from-neutral-950 via-neutral-500 to-neutral-950',
            'dark:from-[#f1f2f4] dark:via-neutral-500 dark:to-[#f1f2f4]'
          )}
          initial={{ backgroundPosition: '200% 0' }}
          animate={{ backgroundPosition: '-200% 0' }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% auto',
          }}
        >
          Loading...
        </motion.span>
      </div>
    </div>
  );
}
