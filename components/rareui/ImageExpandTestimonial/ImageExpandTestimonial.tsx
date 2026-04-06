'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeftIcon, ArrowRightIcon, StarIcon } from 'lucide-react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
        'mx-auto w-full max-w-7xl overflow-hidden px-4 py-12 font-sans lg:px-8',
        className
      )}
    >
      <div className="flex flex-col items-stretch gap-8 lg:h-[600px] lg:flex-row lg:gap-12">
        {/* SECTION 1: Metadata (Desktop Only Left Sidebar) */}
        <div className="hidden w-24 shrink-0 flex-col justify-between border-r border-gray-100 py-4 lg:flex">
          <div className="text-sm font-semibold tracking-widest text-gray-900 dark:text-white">
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(testimonials.length).padStart(2, '0')}
          </div>
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="absolute origin-center -rotate-90 text-xs font-bold tracking-[0.2em] whitespace-nowrap text-gray-400 uppercase dark:text-gray-500">
              Reviews
            </div>
          </div>
        </div>

        {/* SECTION 2: Images (Center-Left) */}
        <div className="flex h-[350px] w-full min-w-0 flex-1 items-end justify-center gap-4 overflow-hidden lg:h-full lg:justify-end">
          {(() => {
            let rotatedTestimonials = [];
            const len = testimonials.length;

            if (isMobile) {
              const mid = Math.floor(len / 2);
              const start = (activeIndex - mid + len) % len;
              rotatedTestimonials = [...testimonials.slice(start), ...testimonials.slice(0, start)];
            } else {
              rotatedTestimonials = [
                ...testimonials.slice(activeIndex + 1),
                ...testimonials.slice(0, activeIndex + 1),
              ];
            }

            return rotatedTestimonials.map((testimonial) => {
              const isActive = testimonial.id === activeTestimonial.id;

              const desktopActiveWidth = 220;
              const desktopActiveHeight = 550;
              const mobileActiveWidth = 200;
              const mobileActiveHeight = 350;

              const desktopInactiveWidth = 100;
              const desktopInactiveHeight = 100;
              const mobileInactiveWidth = 60;
              const mobileInactiveHeight = 80;

              return (
                <motion.div
                  key={testimonial.id}
                  layout
                  onClick={() => {
                    const originalIndex = testimonials.findIndex((t) => t.id === testimonial.id);
                    setActiveIndex(originalIndex);
                  }}
                  className={clsx(
                    'relative shrink-0 cursor-pointer overflow-hidden rounded-md border border-white/50 bg-gray-200 shadow-lg dark:border-white/10 dark:bg-neutral-800',
                    isActive ? 'z-10 shadow-2xl' : 'z-0 opacity-60 hover:opacity-100'
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
                      ? 'grayscale(0%) brightness(1.05)'
                      : 'grayscale(100%) brightness(0.9)',
                  }}
                  transition={{
                    type: 'spring',
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
                    sizes={isActive ? '400px' : '150px'}
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
        <div className="flex shrink-0 flex-col justify-center space-y-6 px-2 lg:w-[400px] lg:space-y-8 lg:px-0 xl:w-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="space-y-4 text-center lg:space-y-6 lg:text-left"
            >
              <div>
                <h3 className="text-xl font-bold tracking-tight text-gray-900 lg:text-3xl dark:text-white">
                  {activeTestimonial.name}
                </h3>
                <div className="mt-1 text-xs font-semibold tracking-wider text-gray-500 uppercase lg:text-sm dark:text-gray-400">
                  {activeTestimonial.company}
                </div>
              </div>

              <blockquote className="text-md leading-tight font-medium text-gray-800 lg:text-xl dark:text-gray-200">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </blockquote>

              <div className="flex gap-1 pt-2">
                {[0, 1, 2, 3, 4].map((index) => {
                  const rating = activeTestimonial.rating || 5;
                  const isFull = rating >= index + 1;
                  const isHalf = rating > index && rating < index + 1;

                  return (
                    <div key={index} className="relative h-5 w-5">
                      <StarIcon className="absolute inset-0 fill-gray-200 text-gray-200 dark:fill-neutral-700 dark:text-neutral-700" />
                      {isFull && (
                        <StarIcon className="absolute inset-0 fill-yellow-400 text-yellow-400" />
                      )}
                      {isHalf && (
                        <div className="absolute inset-0 w-1/2 overflow-hidden">
                          <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 pt-4 lg:justify-start lg:pt-8">
            <button
              onClick={prevTestimonial}
              className="rounded-full bg-gray-100 p-4 text-gray-600 transition-all hover:scale-105 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700 dark:focus:ring-gray-600"
              aria-label="Previous testimonial"
            >
              <ArrowLeftIcon className="h-5 w-5 lg:h-6 lg:w-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="rounded-full bg-yellow-400 p-4 text-black shadow-lg shadow-yellow-400/30 transition-all hover:scale-110 hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none active:scale-95"
              aria-label="Next testimonial"
            >
              <ArrowRightIcon className="h-5 w-5 lg:h-6 lg:w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Index Indicator */}
      <div className="mt-8 flex items-center justify-center gap-2 lg:hidden">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={clsx(
              'h-1.5 rounded-full transition-all duration-300',
              i === activeIndex ? 'w-8 bg-yellow-400' : 'w-1.5 bg-gray-300 dark:bg-gray-700'
            )}
          />
        ))}
      </div>
    </div>
  );
}
