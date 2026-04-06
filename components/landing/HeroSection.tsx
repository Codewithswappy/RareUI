'use client';

import ThreeDButton from '@/components/internal/ThreeDButton';
import Navbar from '@/components/landing/Navbar';
import FeatureBadge from '@/components/internal/FeatureBadge';
import AvatarGroup from '@/components/internal/AvatarGroup';
import GlassSearchBar from '@/components/internal/GlassSearchBar';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const words = ['Better.', 'Fast.', 'Rare.'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full items-start justify-center bg-neutral-50 pt-4 transition-colors duration-500 dark:bg-neutral-950">
      <div
        style={{
          maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
        }}
        className="ring-b-0 shadow-b-0 relative z-20 mx-auto flex h-[calc(100vh-2rem)] max-h-[900px] min-h-[600px] w-[98%] max-w-[1600px] flex-col items-center justify-center rounded-t-2xl rounded-b-none border border-b-0 border-neutral-200/60 shadow-sm ring-1 shadow-black/5 ring-black/5 transition-colors duration-500 dark:border-neutral-700/40 dark:shadow-black/20 dark:ring-white/5"
      >
        {/* <Navbar /> */}

        {/* Main Mesh Gradient: Matching ComponentBrowser */}
        <div className="absolute inset-0 rounded-t-2xl bg-linear-to-t from-[#FBFBFA] via-[#F5F5F3] to-[#F2F2F0] transition-all duration-500 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-950" />

        {/* Custom Diamond Grid Pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 L50 0 L100 50 L50 100 Z' fill='none' stroke='%23888' stroke-width='1' stroke-dasharray='2 2'/%3E%3Ccircle cx='0' cy='50' r='1.5' fill='%23888'/%3E%3Ccircle cx='50' cy='0' r='1.5' fill='%23888'/%3E%3Ccircle cx='100' cy='50' r='1.5' fill='%23888'/%3E%3Ccircle cx='50' cy='100' r='1.5' fill='%23888'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Radial depth for premium look */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(245,245,243,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(38,38,38,0.4)_100%)]" />

        {/* Hero Content */}
        <div className="z-10 mb-12 flex w-full max-w-7xl flex-col items-center justify-center md:flex-row">
          <div className="z-10 flex w-full flex-col items-start justify-center px-6 py-12 text-pretty md:w-1/2 md:p-12 md:pt-0">
            <div className="mb-1">
              <FeatureBadge badgeText="RareUI">New Component every week</FeatureBadge>
            </div>
            <h1 className="px-1.8 bg-linear-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text pr-2 pb-3 text-5xl font-bold tracking-tighter text-clip text-transparent md:text-7xl lg:text-8xl dark:from-white dark:via-neutral-200 dark:to-white">
              Design Less <br /> Ship{' '}
              <span className="inline-flex min-w-[200px] perspective-[1000px]">
                <div className="relative inline-flex h-[1.5em] items-center justify-start pr-4">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={words[index]}
                      className="inline-flex whitespace-nowrap"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      {words[index].split('').map((letter, i) => (
                        <motion.span
                          key={i}
                          variants={{
                            initial: {
                              y: 40,
                              opacity: 0,
                              filter: 'blur(10px)',
                              scale: 0.8,
                            },
                            animate: {
                              y: 0,
                              opacity: 1,
                              filter: 'blur(0px)',
                              scale: 1,
                            },
                            exit: {
                              y: -40,
                              opacity: 0,
                              filter: 'blur(10px)',
                              scale: 1.1,
                            },
                          }}
                          transition={{
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                            delay: i * 0.04,
                          }}
                          className="inline-block text-neutral-900 dark:text-white"
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </span>
            </h1>
            <h3 className="text-md mb-3 font-normal tracking-tighter text-neutral-600 md:hidden dark:text-neutral-400">
              Spend less time designing and tweaking UI, and more time shipping reliable, visually
              refined interfaces.
            </h3>
            {/* <div className="m-3">
              <AvatarGroup />
            </div> */}
            <div className="mt-6 flex w-full flex-col items-start gap-6 sm:flex-row sm:items-center md:hidden">
              <ThreeDButton text="Browse Components" href="/docs" />
              <div className="w-full max-w-[360px] sm:w-auto">
                <GlassSearchBar />
              </div>
            </div>
          </div>

          <div className="z-10 hidden w-1/2 flex-col items-start justify-center p-12 pl-0 md:flex">
            <h3 className="mb-6 text-xl font-normal tracking-tighter text-neutral-600 dark:text-neutral-400">
              Spend less time designing and tweaking UI, and more time shipping reliable, visually
              refined interfaces.
            </h3>
            <div className="flex items-center gap-6">
              <ThreeDButton text="Browse Components" href="/docs" />
              <GlassSearchBar />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-4 flex h-[3vh] w-full items-center justify-center md:bottom-16">
          <h1 className="z-5 bg-linear-to-r from-black/20 via-black/10 to-black/3 bg-clip-text text-center text-[80px] font-medium tracking-tighter text-clip text-transparent transition-colors duration-500 sm:text-[120px] md:text-[230px] lg:text-[300px] dark:from-white/15 dark:via-white/8 dark:to-white/3">
            RareUI
          </h1>
        </div>
      </div>
    </div>
  );
}
