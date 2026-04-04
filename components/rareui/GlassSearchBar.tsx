"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Command, CornerUpRight, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const COMPONENTS = [
  { name: "Animated Tab", href: "/docs/components/animated-tab" },
  { name: "Floating Navigation", href: "/docs/components/floating-navigation" },
  {
    name: "Glass Shimmer Button",
    href: "/docs/components/glass-shimmer-button",
  },
  { name: "Liquid Button", href: "/docs/components/liquid-button" },
  { name: "Liquid Metal", href: "/docs/components/liquid-metal" },
  { name: "Loading Spinner", href: "/docs/components/loading-spinner" },
  {
    name: "Neumorphism 3D Button",
    href: "/docs/components/neumorphism3DButton",
  },
  { name: "Particle Card", href: "/docs/components/particle-card" },
  { name: "Premium Button", href: "/docs/components/premium-button" },
  {
    name: "Premium Profile Card",
    href: "/docs/components/premium-profile-card",
  },
  { name: "Retro Pixel Button", href: "/docs/components/retro-pixel-button" },
  { name: "Soft Button", href: "/docs/components/soft-button" },
  { name: "Toast Tabs", href: "/docs/components/toast-tabs" },
  {
    name: "Magnetic Scatter Text",
    href: "/docs/text-animation/magnetic-scatterText",
  },
  { name: "Sound Text", href: "/docs/text-animation/sound-text" },
  { name: "Vapor Smoke Text", href: "/docs/text-animation/vapor-smokeText" },
  { name: "Word Magnet", href: "/docs/text-animation/word-magnet" },
  { name: "Book 3D", href: "/docs/3d-elements/book-3d" },
  { name: "Liquid Wave", href: "/docs/interactive-background/liquid-wave" },
];

export default function GlassSearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const filteredComponents = query
    ? COMPONENTS.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : COMPONENTS.slice(0, 4);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (isFocused) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredComponents.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex(
            (prev) =>
              (prev - 1 + filteredComponents.length) % filteredComponents.length
          );
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filteredComponents[selectedIndex]) {
            router.push(filteredComponents[selectedIndex].href);
            setIsFocused(false);
          }
        } else if (e.key === "Escape") {
          setIsFocused(false);
          inputRef.current?.blur();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, filteredComponents, selectedIndex, router]);

  const handleItemClick = (href: string) => {
    router.push(href);
    setIsFocused(false);
  };

  return (
    <div className="relative z-50 flex flex-col items-start w-full md:w-[360px]">
      {/* Search Input - Glass Wrapper */}
      <div
        className={`relative w-full p-1 bg-neutral-50 dark:bg-neutral-950  border border-neutral-200/80 dark:border-neutral-800/80 rounded-md shadow-lg shadow-black/10 dark:shadow-black/30 overflow-hidden transition-all duration-300 ${isFocused ? "ring-1 ring-black/10 dark:ring-white/10" : ""}`}
      >
        {/* Inner Solid Core */}
        <div className="relative flex items-center justify-between gap-3 px-4 py-3 rounded-sm transition-all w-full bg-neutral-200 dark:bg-neutral-900 shadow shadow-black/5 dark:shadow-black/20 ring-1 ring-black/5 dark:ring-white/5">
          <div className="flex items-center gap-3 w-full">
            <Search className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder={typeof window !== "undefined" && window.innerWidth < 450 ? "Search components..." : "Search components..."}
              className="bg-transparent border-none outline-none text-sm w-full transition-colors text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-500 font-medium"
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                // Delay blur to allow clicks on items
                setTimeout(() => {
                  if (isMounted.current) setIsFocused(false);
                }, 200);
              }}
            />
          </div>

          {/* Keyboard Shortcut Hint - Hidden on mobile for space */}
          <div className="flex items-center gap-1.5 text-neutral-400 dark:text-neutral-500">
            <Command className="w-4 h-4" />
            <span className="text-xs font-medium">+</span>
            <span className="text-xs font-medium">/</span>
          </div>
        </div>
      </div>

      {/* Dropdown Suggestions - Separate Island */}
      <AnimatePresence>
        {isFocused && (filteredComponents.length > 0 || query) && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 8, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 w-full p-1 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800/80 rounded-md shadow-md shadow-black/5 dark:shadow-black/30 ring-1 ring-black/5 dark:ring-white/5 mt-1.5 z-100"
          >
            {/* Inner List Core with Max Height */}
            <div className="rounded-sm overflow-hidden bg-neutral-200 dark:bg-neutral-900">
              <div
                className="max-h-[280px] overflow-y-auto p-1 flex flex-col gap-1 custom-scrollbar"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {filteredComponents.length > 0 ? (
                  filteredComponents.map((item, i) => (
                    <div
                      key={item.href}
                      onClick={() => handleItemClick(item.href)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`group flex items-center justify-between px-4 py-3 rounded-sm cursor-pointer transition-colors ${
                        selectedIndex === i
                          ? "bg-white/80 dark:bg-neutral-50/90 shadow-sm"
                          : "hover:bg-white/60 dark:hover:bg-neutral-700/40"
                      }`}
                    >
                      <span
                        className={`text-sm font-medium transition-colors ${
                          selectedIndex === i
                            ? "text-black"
                            : "text-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        {item.name}
                      </span>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-7 w-7 flex items-center justify-center rounded-lg transition-all ${
                            selectedIndex === i
                              ? "bg-white dark:bg-neutral-800 shadow-sm text-black dark:text-white"
                              : "bg-black/5 dark:bg-white/5 text-neutral-400 dark:text-neutral-500"
                          }`}
                        >
                          <CornerUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400 text-center font-medium">
                    No components found for "{query}"
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
