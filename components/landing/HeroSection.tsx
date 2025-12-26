"use client";

import ThreeDButton from "@/components/rareui/ThreeDButton";
import Navbar from "@/components/landing/Navbar";
import FeatureBadge from "@/components/rareui/FeatureBadge";
import AvatarGroup from "@/components/rareui/AvatarGroup";
import GlassSearchBar from "@/components/rareui/GlassSearchBar";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export default function Hero() {
  const words = ["Better.", "Fast.", "Rare."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center items-start pt-4 pb-12">
      <div className="relative h-[calc(100vh-2rem)] min-h-[600px] max-h-[900px] w-[98%] max-w-[1600px] mx-auto flex flex-col items-center justify-center overflow-hidden rounded-2xl md:rounded-2xl transition-colors duration-500 rounded-t-2xl md:rounded-t-2xl bg-[#0d2a36] dark:bg-[#052b3b]">
        <Navbar />
        {/* Main Gradient: Adjust based on theme */}
        <div className="absolute inset-0 transition-opacity duration-500 bg-linear-to-b from-white/50 via-[#e8f2f6]/50 to-[#0d2a36] dark:from-black/50 dark:via-[#e8f2f6]/50 dark:to-[#263a42]" />

        {/* Vertical Lines Pattern */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #020617 1px, transparent 1px)",
            backgroundSize: "6px 100%",
          }}
        />

        {/* Radial overlay for depth */}
        <div className="absolute inset-0 pointer-events-none transition-colors duration-500 bg-linear-to-t from-[#0d2a36]/90 to-transparent dark:from-[#0d2a36]/90" />

        {/* Hero Content */}
        <div className="w-full max-w-7xl z-10 flex flex-col md:flex-row items-center justify-center mb-12">
          <div className="flex flex-col items-start justify-center w-full md:w-1/2 px-6 py-12 md:p-12 md:pt-0 z-10 text-pretty">
            <div className="mb-1">
              <FeatureBadge badgeText="RareUI">
                New Component everyday
              </FeatureBadge>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-clip text-transparent bg-clip-text px-1.8 pb-3 bg-linear-to-r from-neutral-50 via-neutral-100 to-neutral-50 dark:from-neutral-50 dark:via-neutral-100 dark:to-neutral-50">
              Design Less <br /> Ship{" "}
              <span className="inline-flex min-w-[200px] [perspective:1000px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[index]}
                    initial={{ opacity: 0, rotateX: 90, y: 20 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    exit={{ opacity: 0, rotateX: -90, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="inline-block origin-bottom bg-clip-text text-transparent bg-linear-to-r from-neutral-50 via-neutral-50 to-neutral-50 dark:from-neutral-50 dark:via-neutral-50 dark:to-neutral-50"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            <h3 className="text-md font-normal tracking-tighter md:hidden text-neutral-300 mb-3">
              Spend less time designing and tweaking UI, and more time shipping
              reliable, visually refined interfaces.
            </h3>
            <div className="m-3">
              <AvatarGroup />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center md:hidden mt-6 gap-6 w-full">
              <ThreeDButton text="Browse Components" href="/docs" />
              <div className="w-full sm:w-auto max-w-[360px]">
                <GlassSearchBar />
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-start justify-center w-1/2 pl-0 p-12 z-10">
            <h3 className="text-xl font-normal tracking-tighter text-neutral-300 mb-6">
              Spend less time designing and tweaking UI, and more time shipping
              reliable, visually refined interfaces.
            </h3>
            <div className="flex items-center gap-6">
              <ThreeDButton text="Browse Components" href="/docs" />
              <GlassSearchBar />
            </div>
          </div>
        </div>

        <div className="w-full h-[3vh] absolute md:bottom-12 bottom-4 flex items-center justify-center pointer-events-none ">
          <h1 className="text-[80px] sm:text-[120px] md:text-[230px] lg:text-[300px] z-5 tracking-tighter text-center text-clip text-transparent bg-clip-text bg-linear-to-r transition-colors duration-500 from-neutral-50/6 via-neutral-300/4 to-neutral-500/2 dark:from-white/10 dark:via-white/5 dark:to-transparent">
            RareUI
          </h1>
        </div>
      </div>
    </div>
  );
}
