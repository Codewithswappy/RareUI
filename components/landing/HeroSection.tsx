"use client";

import ThreeDButton from "@/components/internal/ThreeDButton";
import Navbar from "@/components/landing/Navbar";
import FeatureBadge from "@/components/rareui/FeatureBadge";
import AvatarGroup from "@/components/rareui/AvatarGroup";
import GlassSearchBar from "@/components/rareui/GlassSearchBar";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="w-full flex justify-center items-start pt-4 bg-neutral-50">
      <div 
        style={{ 
          maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)'
        }}
        className="relative z-20 h-[calc(100vh-2rem)] min-h-[600px] max-h-[900px] w-[98%] max-w-[1600px] mx-auto flex flex-col items-center justify-center transition-colors duration-500 border border-b-0 ring-b-0 shadow-b-0 rounded-b-none border-neutral-200/60 shadow-sm shadow-black/5 ring-1 ring-black/5 rounded-t-2xl"
      >
        <Navbar />

        {/* Main Mesh Gradient: Matching ComponentBrowser */}
        <div className="absolute inset-0 transition-opacity duration-500 bg-linear-to-t from-[#FBFBFA] via-[#F5F5F3] to-[#F2F2F0] " />

        {/* Custom Diamond Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 L50 0 L100 50 L50 100 Z' fill='none' stroke='black' stroke-width='1' stroke-dasharray='2 2'/%3E%3Ccircle cx='0' cy='50' r='1.5' fill='black'/%3E%3Ccircle cx='50' cy='0' r='1.5' fill='black'/%3E%3Ccircle cx='100' cy='50' r='1.5' fill='black'/%3E%3Ccircle cx='50' cy='100' r='1.5' fill='black'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Radial depth for premium look */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(245,245,243,0.4)_100%)]" />

        {/* Hero Content */}
        <div className="w-full max-w-7xl z-10 flex flex-col md:flex-row items-center justify-center mb-12">
          <div className="flex flex-col items-start justify-center w-full md:w-1/2 px-6 py-12 md:p-12 md:pt-0 z-10 text-pretty">
            <div className="mb-1">
              <FeatureBadge badgeText="RareUI">
                New Component every week
              </FeatureBadge>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-clip text-transparent bg-clip-text px-1.8 pr-2 pb-3 bg-linear-to-r from-neutral-900 via-neutral-800 to-neutral-900 ">
              Design Less <br /> Ship{" "}
              <span className="inline-flex min-w-[200px] perspective-[1000px]">
                <div className="inline-flex h-[1.5em] relative items-center justify-start pr-4">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={words[index]}
                      className="inline-flex whitespace-nowrap"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      {words[index].split("").map((letter, i) => (
                        <motion.span
                          key={i}
                          variants={{
                            initial: {
                              y: 40,
                              opacity: 0,
                              filter: "blur(10px)",
                              scale: 0.8,
                            },
                            animate: {
                              y: 0,
                              opacity: 1,
                              filter: "blur(0px)",
                              scale: 1,
                            },
                            exit: {
                              y: -40,
                              opacity: 0,
                              filter: "blur(10px)",
                              scale: 1.1,
                            },
                          }}
                          transition={{
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                            delay: i * 0.04,
                          }}
                          className="inline-block text-neutral-900 "
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </span>
            </h1>
            <h3 className="text-md font-normal tracking-tighter md:hidden text-neutral-600 mb-3">
              Spend less time designing and tweaking UI, and more time shipping
              reliable, visually refined interfaces.
            </h3>
            {/* <div className="m-3">
              <AvatarGroup />
            </div> */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center md:hidden mt-6 gap-6 w-full">
              <ThreeDButton text="Browse Components" href="/docs" />
              <div className="w-full sm:w-auto max-w-[360px]">
                <GlassSearchBar />
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-start justify-center w-1/2 pl-0 p-12 z-10">
            <h3 className="text-xl font-normal tracking-tighter text-neutral-600 mb-6">
              Spend less time designing and tweaking UI, and more time shipping
              reliable, visually refined interfaces.
            </h3>
            <div className="flex items-center gap-6">
              <ThreeDButton text="Browse Components" href="/docs" />
              <GlassSearchBar />
            </div>
          </div>
        </div>

        <div className="w-full h-[3vh] absolute md:bottom-16 bottom-4 flex items-center justify-center pointer-events-none ">
          <h1 className="text-[80px] sm:text-[120px] md:text-[230px] lg:text-[300px] z-5 tracking-tighter text-center text-clip text-transparent bg-clip-text bg-linear-to-r transition-colors duration-500 from-black/20 via-black/10 to-black/3 font-medium">
            RareUI
          </h1>
        </div>
      </div>
    </div>
  );
}
