"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowLeftIcon,
  ArrowRight,
  ArrowRightIcon,
  Star,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  rating?: number;
}

interface ImageExpandTestimonialProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
  className?: string;
}

export function ImageExpandTestimonial({
  testimonials,
  autoPlayInterval = 5000,
  className,
}: ImageExpandTestimonialProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  // Handle responsive state to switch between "Center Active" (Mobile) and "Right Active" (Desktop)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile(); // Check on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(nextTestimonial, autoPlayInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextTestimonial, autoPlayInterval, activeIndex]);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <div
      className={twMerge(
        "w-full max-w-7xl mx-auto px-4 lg:px-8 py-12 font-sans overflow-hidden",
        className
      )}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:h-[600px] items-stretch">
        {/* SECTION 1: Metadata (Desktop Only Left Sidebar) */}
        <div className="hidden lg:flex flex-col justify-between w-24 border-r border-gray-100 py-4 shrink-0">
          <div className="text-sm font-semibold tracking-widest text-gray-900 dark:text-white">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
          </div>
          <div className="relative h-full w-full flex items-center justify-center">
            <div className="-rotate-90 whitespace-nowrap text-gray-400 dark:text-gray-500 font-bold tracking-[0.2em] uppercase text-xs origin-center absolute">
              Reviews
            </div>
          </div>
        </div>

        {/* SECTION 2: Images (Center-Left) */}
        <div className="flex-1 min-w-0 flex items-end justify-center lg:justify-end gap-4 h-[350px] lg:h-full w-full overflow-hidden">
          {(() => {
            // Logic:
            // Desktop (>=1024): Active is Last (Right side).
            // Mobile (<1024): Active is Center.

            let rotatedTestimonials = [];
            const len = testimonials.length;

            if (isMobile) {
              // Center active element for mobile
              const mid = Math.floor(len / 2); // e.g. 4/2 = 2
              // We want activeIndex to appear at index 'mid' in the rendered array
              // If activeIndex is 0, we want it at index 2.
              // Shift: (0 - 2) = -2 => +4 = 2.
              const start = (activeIndex - mid + len) % len;
              rotatedTestimonials = [
                ...testimonials.slice(start),
                ...testimonials.slice(0, start),
              ];
            } else {
              // Desktop: Active Last
              rotatedTestimonials = [
                ...testimonials.slice(activeIndex + 1),
                ...testimonials.slice(0, activeIndex + 1),
              ];
            }

            return rotatedTestimonials.map((testimonial) => {
              const isActive = testimonial.id === activeTestimonial.id;

              // Dynamic dimensions based on device state
              const desktopActiveWidth = 220;
              const desktopActiveHeight = 550;
              const mobileActiveWidth = 200; // Reduced for smaller screens
              const mobileActiveHeight = 350;

              const desktopInactiveWidth = 100;
              const desktopInactiveHeight = 100;
              const mobileInactiveWidth = 60;
              const mobileInactiveHeight = 80;

              return (
                <motion.div
                  key={testimonial.id}
                  layout // Essential for smooth reordering animation
                  onClick={() => {
                    const originalIndex = testimonials.findIndex(
                      (t) => t.id === testimonial.id
                    );
                    setActiveIndex(originalIndex);
                  }}
                  className={clsx(
                    "relative cursor-pointer rounded-md bg-gray-200 dark:bg-neutral-800 shrink-0 overflow-hidden shadow-lg border border-white/50 dark:border-white/10",
                    isActive
                      ? "z-10 shadow-2xl"
                      : "z-0 opacity-60 hover:opacity-100"
                  )}
                  animate={{
                    width: isActive
                      ? isMobile
                        ? mobileActiveWidth
                        : desktopActiveWidth
                      : isMobile
                        ? mobileInactiveWidth
                        : desktopInactiveWidth,
                    height: isActive
                      ? isMobile
                        ? mobileActiveHeight
                        : desktopActiveHeight
                      : isMobile
                        ? mobileInactiveHeight
                        : desktopInactiveHeight,
                    filter: isActive
                      ? "grayscale(0%) brightness(1.05)"
                      : "grayscale(100%) brightness(0.9)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 24,
                    mass: 1.2,
                  }}
                >
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes={isActive ? "400px" : "150px"}
                  />
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/10 transition-colors hover:bg-transparent" />
                  )}
                </motion.div>
              );
            });
          })()}
        </div>

        {/* SECTION 3: Content (Right) */}
        <div className="flex flex-col justify-center lg:w-[400px] xl:w-[450px] space-y-6 lg:space-y-8 shrink-0 px-2 lg:px-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-4 lg:space-y-6 text-center lg:text-left"
            >
              <div>
                <h3 className="text-xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {activeTestimonial.name}
                </h3>
                <div className="text-xs lg:text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-1">
                  {activeTestimonial.company}
                </div>
              </div>

              <blockquote className="text-md lg:text-xl font-medium leading-tight text-gray-800 dark:text-gray-200">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </blockquote>

              <div className="flex gap-1 pt-2">
                {[0, 1, 2, 3, 4].map((index) => {
                  const rating = activeTestimonial.rating || 5;
                  const isFull = rating >= index + 1;
                  const isHalf = rating > index && rating < index + 1;

                  return (
                    <div key={index} className="relative w-5 h-5">
                      {/* Background/Empty Star */}
                      <StarIcon className="absolute inset-0 text-gray-200 dark:text-neutral-700 fill-gray-200 dark:fill-neutral-700" />

                      {/* Full Star Overlay */}
                      {isFull && (
                        <StarIcon className="absolute inset-0 text-yellow-400 fill-yellow-400" />
                      )}

                      {/* Half Star Overlay */}
                      {isHalf && (
                        <div className="absolute inset-0 overflow-hidden w-1/2">
                          <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 lg:pt-8">
            <button
              onClick={prevTestimonial}
              className="p-4 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-700 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-label="Previous testimonial"
            >
              <ArrowLeftIcon className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-4 rounded-full bg-yellow-400 text-black shadow-lg shadow-yellow-400/30 hover:bg-yellow-300 hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label="Next testimonial"
            >
              <ArrowRightIcon className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Index Indicator */}
      <div className="flex lg:hidden justify-center items-center mt-8 gap-2">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={clsx(
              "h-1.5 rounded-full transition-all duration-300",
              i === activeIndex
                ? "w-8 bg-yellow-400"
                : "w-1.5 bg-gray-300 dark:bg-gray-700"
            )}
          />
        ))}
      </div>
    </div>
  );
}
