"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const avatars = [
  {
    src: "https://api.dicebear.com/9.x/notionists/svg?seed=Robert",
    alt: "Robert",
  },
  {
    src: "https://api.dicebear.com/9.x/notionists/svg?seed=Sophia",
    alt: "Sophia",
  },
  {
    src: "https://api.dicebear.com/9.x/notionists/svg?seed=Liliana",
    alt: "Liliana",
  },
  {
    src: "https://api.dicebear.com/9.x/notionists/svg?seed=Brian",
    alt: "Brian",
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
    <div className="flex justify-center items-start  gap-1">
      {/* Avatar Row */}
      <div className="flex items-end h-[54px]">
        {" "}
        {/* Fixed height for jumping room */}
        <div className="flex -space-x-4">
          {avatars.map((avatar, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={avatar.alt} className="relative group">
                {/* Floating Tooltip */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.9 }}
                      className="absolute -top-9 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-xl whitespace-nowrap z-50 flex items-center gap-1"
                    >
                      {avatar.alt}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 rotate-45" />{" "}
                      {/* Arrow */}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Avatar Circle */}
                <motion.div
                  className={`relative h-10 w-10  rounded-full border-2 border-white shadow-sm bg-white overflow-hidden z-20`}
                  animate={{
                    y: isActive ? -8 : 0,
                    scale: isActive ? 1.1 : 1,
                    zIndex: isActive ? 50 : avatars.length - index,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <img
                    src={avatar.src}
                    alt={avatar.alt}
                    className="h-full w-full object-cover"
                  />
                </motion.div>

                {/* Shadow underneath jumping avatar */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-0 left-2 right-2 h-1 bg-black rounded-full blur-[2px] z-10"
                  />
                )}
              </div>
            );
          })}
          {/* Add button placeholder */}
         
        </div>
      </div>

      {/* Static Label */}
      <div className="pl-3 flex flex-col items-start justify-center pt-4">
        {/* <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              className="w-3 h-3 text-orange-300 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div> */}
        <span className="text-[12px] font-semibold text-neutral-200">
          2k+ Users
        </span>
        <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide">
          &hearts; by many developers.
        </span>
      </div>
    </div>
  );
}
