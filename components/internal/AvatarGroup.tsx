'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const avatars = [
  {
    src: 'https://api.dicebear.com/9.x/notionists/svg?seed=Robert',
    alt: 'Robert',
  },
  {
    src: 'https://api.dicebear.com/9.x/notionists/svg?seed=Sophia',
    alt: 'Sophia',
  },
  {
    src: 'https://api.dicebear.com/9.x/notionists/svg?seed=Liliana',
    alt: 'Liliana',
  },
  {
    src: 'https://api.dicebear.com/9.x/notionists/svg?seed=Brian',
    alt: 'Brian',
  },
];

export default function AvatarGroup() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % avatars.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-start justify-center gap-1">
      {/* Avatar Row */}
      <div className="flex h-[54px] items-end">
        {' '}
        {/* Fixed height for jumping room */}
        <div className="flex -space-x-4">
          {avatars.map((avatar, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={avatar.alt} className="group relative">
                {/* Floating Tooltip */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.9 }}
                      className="absolute -top-9 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-md bg-neutral-900 px-2 py-1 text-[10px] font-bold whitespace-nowrap text-white shadow-xl"
                    >
                      {avatar.alt}
                      <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-neutral-900" />{' '}
                      {/* Arrow */}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Avatar Circle */}
                <motion.div
                  className={`relative z-20 h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-white shadow-sm`}
                  animate={{
                    y: isActive ? -8 : 0,
                    scale: isActive ? 1.1 : 1,
                    zIndex: isActive ? 50 : avatars.length - index,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <img src={avatar.src} alt={avatar.alt} className="h-full w-full object-cover" />
                </motion.div>

                {/* Shadow underneath jumping avatar */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-2 bottom-0 left-2 z-10 h-1 rounded-full bg-black blur-[2px]"
                  />
                )}
              </div>
            );
          })}
          {/* Add button placeholder */}
        </div>
      </div>

      {/* Static Label */}
      <div className="flex flex-col items-start justify-center pt-4 pl-3">
        <span className="text-[12px] font-semibold text-neutral-200">2k+ Users</span>
        <span className="text-[10px] font-semibold tracking-wide text-neutral-400 uppercase">
          &hearts; by many developers.
        </span>
      </div>
    </div>
  );
}
