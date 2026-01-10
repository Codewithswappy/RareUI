"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useAnimationFrame,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabData {
  id: string | number;
  image: string;
  title: string;
  description: string;
}

interface ToastTabsProps {
  tabs?: TabData[];
  autoplay?: boolean;
  autoplayDelay?: number; // ms
  ringColor?: string;
  className?: string;
}

const defaultTabs: TabData[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
    title: "Sarah Jenkins",
    description:
      "The workflow integration is simply seamless. It has completely transformed.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
    title: "Mark Thompson",
    description:
      "I was skeptical at first, but the performance gains are undeniable. The snappy animations and clean UI make it a joy to use daily.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop",
    title: "Alex Riviera",
    description:
      "Finally, a solution that actually considers dark mode as a first-class citizen. The attention to detail in the design system is outstanding.",
  },
];

export default function ToastTabs({
  tabs = defaultTabs,
  autoplay = true,
  autoplayDelay = 3000,
  ringColor = "#f97316", // Orange-500 default
  className,
}: ToastTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Use Motion Value for high-performance animation (no react re-renders)
  const progressMv = useMotionValue(0);
  const CIRCUMFERENCE = 175.929; // 2 * pi * 28

  // Map progress (0 -> autoplayDelay) to dashoffset (CIRCUMFERENCE -> 0)
  const strokeDashoffset = useTransform(
    progressMv,
    [0, autoplayDelay],
    [CIRCUMFERENCE, 0]
  );

  // Handle Autoplay Loop
  useAnimationFrame((time, delta) => {
    if (!isPaused && autoplay) {
      let newProgress = progressMv.get() + delta;

      if (newProgress >= autoplayDelay) {
        newProgress = 0;
        setActiveIndex((prev) => (prev + 1) % tabs.length);
      }
      progressMv.set(newProgress);
    }
  });

  // Refs for keyboard navigation logic
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    // Adjust refs array size if tabs change
    buttonRefs.current = buttonRefs.current.slice(0, tabs.length);
  }, [tabs]);

  // Reset progress when manually changing tabs
  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    progressMv.set(0);
  };

  // Keyboard Navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault(); // Prevent scroll
      const nextIndex = (index + 1) % tabs.length;
      setActiveIndex(nextIndex);
      buttonRefs.current[nextIndex]?.focus();
      progressMv.set(0);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault(); // Prevent scroll
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      setActiveIndex(prevIndex);
      buttonRefs.current[prevIndex]?.focus();
      progressMv.set(0);
    }
  };

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto flex flex-col items-center gap-8 [--beam-color:var(--custom-color)] dark:[--beam-color:#ffffff]",
        className
      )}
      style={{ "--custom-color": ringColor } as React.CSSProperties}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
      }}
    >
      {/* --- Content Area (Toast) --- */}
      <div className="relative w-full text-center px-4 mb-4 flex items-center justify-center min-h-[110px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(4px)" }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="bg-neutral-100 dark:bg-neutral-800 border-2 border-dotted border-neutral-300 dark:border-neutral-600 rounded-2xl p-3 shadow-sm max-w-xs relative cursor-default select-none"
          >
            <p className="text-sm leading-relaxed text-neutral-900 dark:text-white font-medium">
              "{tabs[activeIndex].description}"
            </p>

            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-neutral-100 dark:bg-neutral-800 border-b-2 border-r-2 border-dotted border-neutral-300 dark:border-neutral-600 rotate-45" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- Tabs / Head --- */}
      <div className="flex items-center gap-4" role="tablist">
        {tabs.map((tab, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              onClick={() => handleTabClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="relative flex items-center justify-center p-0 bg-transparent border-none appearance-none select-none outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 text-[0px] leading-none group transition-transform duration-300 hover:-translate-y-2 focus-visible:-translate-y-2"
              style={{ WebkitTapHighlightColor: "transparent" }}
              aria-selected={isActive}
              role="tab"
              tabIndex={isActive ? 0 : -1}
            >
              {/* Active Ring & Progress Indicator (Glass Effect) */}
              {isActive && (
                <motion.div
                  layoutId="active-ring"
                  className="absolute -inset-2 rounded-full z-0 pointer-events-none bg-neutral-200/50 dark:bg-neutral-700/30 backdrop-blur-md shadow-sm border border-white/20 dark:border-white/10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Rotating SVG for the beam effect */}
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
                    {/* Progress Trail (Beam) */}
                    {autoplay && (
                      <>
                        <motion.circle
                          cx="30"
                          cy="30"
                          r="28"
                          fill="none"
                          stroke="var(--beam-color)"
                          strokeWidth="1.5"
                          strokeDasharray="175.929"
                          style={{
                            strokeDashoffset,
                            filter: `drop-shadow(0 0 2px var(--beam-color))`,
                          }}
                          strokeLinecap="round"
                          className="opacity-80"
                        />
                      </>
                    )}

                    {/* Static ring indicator if no autoplay */}
                    {!autoplay && (
                      <circle
                        cx="30"
                        cy="30"
                        r="28"
                        fill="none"
                        stroke="var(--beam-color)"
                        strokeWidth="1.5"
                        style={{
                          filter: `drop-shadow(0 0 4px var(--beam-color))`,
                        }}
                      />
                    )}
                  </svg>
                </motion.div>
              )}

              {/* Avatar Image */}
              <div
                className={cn(
                  "relative z-10 w-12 h-12 rounded-full overflow-hidden transition-all duration-300 border-2",
                  isActive
                    ? "scale-125 border-transparent shadow-xl z-20"
                    : "scale-90 border-transparent opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 group-focus-visible:grayscale-0 group-focus-visible:opacity-100"
                )}
              >
                <img
                  src={tab.image}
                  alt={tab.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
