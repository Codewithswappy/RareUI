"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

function Counter({ value, label }: { value: number; label: string }) {
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <div className="flex  items-center justify-center gap-3 px-8">
      <div className="flex items-baseline gap-1">
        <motion.span className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
          {display}
        </motion.span>
        {label === "Components" || label === "Downloads" ? (
          <span className="text-xl font-medium text-neutral-400 dark:text-neutral-500 self-center">+</span>
        ) : null}
      </div>
      <span className="text-xs font-mono font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mt-1">
        {label}
      </span>
    </div>
  );
}

export default function StatsBar() {
  return (
    <div className="w-[98%] max-w-[1600px] mx-auto px-4 py-8">
      <div className="relative overflow-hidden bg-white/50 dark:bg-neutral-900/30  py-4 ">
        {/* Subtle decorative background detail */}
        <div className="absolute inset-0 bg-grid-neutral-100/50 dark:bg-grid-white/[0.02] mask-[radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" />
        
        <div className="relative flex justify-around items-center">
          <Counter value={54} label="Components"  />
          <Counter value={100} label="% Open Source" />
          <Counter value={1240} label="Downloads" />
          <Counter value={1} label="MIT License" />
        </div>
      </div>
    </div>
  );
}
