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
    <div className="relative z-50 flex flex-col items-center md:items-start w-[90%] md:w-[360px]">
      {/* Search Input - Glass Wrapper */}
      <div
        className={`relative w-full p-2 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${isFocused ? "ring-2 ring-white/30" : ""}`}
      >
        {/* Inner Solid Core */}
        <div className="relative flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all w-full bg-[#e8e8ed]">
          <div className="flex items-center gap-3 w-full">
            <Search className="w-5 h-5 text-neutral-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="What would you like to find today?"
              className="bg-transparent border-none outline-none text-sm w-full transition-colors text-neutral-800 placeholder:text-neutral-500 font-medium"
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                // Delay blur to allow clicks on items
                setTimeout(() => setIsFocused(false), 200);
              }}
            />
          </div>

          {/* Keyboard Shortcut Hint */}
          <div className="flex items-center gap-1.5 text-neutral-400">
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
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 w-full p-2 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[28px] shadow-2xl mt-1.5"
          >
            {/* Inner List Core with Max Height */}
            <div className="rounded-[20px] overflow-hidden bg-[#e8e8ed]">
              <div
                className="max-h-[280px] overflow-y-auto p-2 flex flex-col gap-1 custom-scrollbar"
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
                      className={`group flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                        selectedIndex === i
                          ? "bg-white/80 shadow-sm"
                          : "hover:bg-white/60"
                      }`}
                    >
                      <span
                        className={`text-sm font-medium transition-colors ${
                          selectedIndex === i
                            ? "text-black"
                            : "text-neutral-700"
                        }`}
                      >
                        {item.name}
                      </span>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-7 w-7 flex items-center justify-center rounded-lg transition-all ${
                            selectedIndex === i
                              ? "bg-white shadow-sm text-black"
                              : "bg-black/5 text-neutral-400"
                          }`}
                        >
                          <CornerUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-neutral-500 text-center font-medium">
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
