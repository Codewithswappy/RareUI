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
    }, 3500); // Slower interval to enjoy the state
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3">
      {/* Dynamic Avatar Stack */}
      <div className="flex items-center">
        {avatars.map((avatar, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={avatar.alt}
              layout
              className={`relative flex items-center overflow-hidden rounded-full border-2 bg-white shadow-sm`}
              style={{
                zIndex: isActive ? 50 : avatars.length - index,
                willChange: "width, margin-left",
              }}
              initial={false}
              animate={{
                width: isActive ? "auto" : 40,
                marginLeft: index === 0 ? 0 : -10,
                borderColor: isActive ? "#ffffff" : "#e5e5e5",
                paddingRight: isActive ? 14 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <img
                src={avatar.src}
                alt={avatar.alt}
                className="h-10 w-10 object-cover shrink-0"
              />

              <AnimatePresence mode="popLayout">
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex items-center"
                  >
                    <span className="whitespace-nowrap pl-2 text-xs font-semibold text-black">
                      {avatar.alt}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Static Context Label */}
      <div className="flex items-start flex-col">
        <p className="text-[12px] font-medium text-white">1k+ Users</p>
        <p className="text-[8px] font-normal text-neutral-400">
          Used and &hearts; by developers.
        </p>
      </div>
    </div>
  );
}
