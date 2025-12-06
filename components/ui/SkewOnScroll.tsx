"use client";

import { motion, useScroll, useVelocity, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";

interface SkewOnScrollProps {
  children: React.ReactNode;
  className?: string;
  skewAmount?: number; // How much it skews. Default 3.
}

export default function SkewOnScroll({ children, className = "", skewAmount = 3 }: SkewOnScrollProps) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth out the velocity to avoid jitter
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Map velocity to skew degrees. 
  // e.g. velocity 1000px/s -> skew 3deg
  const skewX = useTransform(smoothVelocity, [-1000, 1000], [-skewAmount, skewAmount]);

  return (
    <motion.div style={{ skewX }} className={className}>
      {children}
    </motion.div>
  );
}
