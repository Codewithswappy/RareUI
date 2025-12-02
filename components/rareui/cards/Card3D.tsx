"use client";

import React, { CSSProperties, useId } from "react";
import { motion } from "framer-motion";

export type Card3DProps = {
  /**
   * card width (CSS value)
   * e.g. "16rem", "320px", "100%"
   */
  width?: string;
  /**
   * card height (CSS value)
   */
  height?: string;
  /**
   * perspective for the 3d effect (px)
   */
  perspective?: number;
  /**
   * baseline rotation applied to the whole card (deg)
   * Use this to angle the whole stack on mount.
   */
  rotateX?: number;
  /**
   * enable/disable the subtle noise overlay
   */
  noise?: boolean;
  /**
   * main background gradient stops (CSS color strings)
   */
  gradient?: { from: string; via?: string; to: string };
  /**
   * whether to render the layered stack effect (multi-layers)
   */
  layered?: boolean;
  /**
   * shadow intensity (0..1)
   */
  shadowIntensity?: number;
  /**
   * children content inside the card
   */
  children?: React.ReactNode;
  /**
   * additional container className
   */
  className?: string;
  /**
   * inline style override
   */
  style?: CSSProperties;
};

export default function Card3D({
  width = "16rem",
  height = "12rem",
  perspective = 1200,
  rotateX = -20,
  noise = true,
  gradient = { from: "rgba(255,255,255,0.98)", via: "rgba(245,245,247,1)", to: "rgba(240,240,242,1)" },
  layered = true,
  shadowIntensity = 0.8,
  children,
  className = "",
  style,
}: Card3DProps) {
  const uid = useId().replace(/:/g, "-"); // unique id for SVG noise filter
  const noiseSvg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='noiseFilter${uid}'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noiseFilter${uid})' /></svg>`
  );
  const noiseDataUrl = `url("data:image/svg+xml,${noiseSvg}")`;

  // small helper for layered transforms
  const layerTransforms = [
    "translateY(-50px) scale(0.94) rotate(2deg)",
    "translateY(-45px) translateZ(6px) scale(0.95)",
    "translateY(-40px) translateZ(10px) scale(0.95) rotate(-2deg)",
  ];

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{
        perspective: `${perspective}px`,
        width,
        height,
        ...style,
      }}
      aria-hidden={false}
    >
      {/* Subtle radial backdrop (keeps visual from original) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 10%, rgba(255,255,255,0.4) 0%, transparent 40%)",
          opacity: 0.7,
        }}
      />

      <div
        className="relative w-full h-full group"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center bottom",
        }}
      >
        {/* optional floor shadow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "8px",
            right: "8px",
            bottom: "-3rem",
            height: "1rem",
            borderRadius: "999px",
            filter: "blur(28px)",
            background: `rgba(0,0,0,${Math.min(0.9, shadowIntensity)})`,
            transform: "rotateX(90deg) translateZ(-80px)",
            transition: "transform 0.7s",
          }}
          className="transition-transform duration-700 group-hover:scale-x-105"
        />

        {/* BACKDROP LAYER (dark shell) */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl"
          style={{
            transform: `translateZ(-20px)`,
            background: "radial-gradient(circle at 50% 0%, #3a3a3a 0%, #1a1a1a 60%, #050505 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.25), inset 1px 0 0 rgba(255,255,255,0.1), inset -1px 0 0 rgba(255,255,255,0.1), inset 0 -2px 5px rgba(0,0,0,0.8), inset 0 0 40px rgba(0,0,0,0.6), 0 25px 50px -12px rgba(0,0,0,0.8)",
            border: "1px solid rgba(255,255,255,0.05)",
            overflow: "hidden",
          }}
        >
          {/* overlay texture */}
          {noise && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.12,
                mixBlendMode: "overlay",
                pointerEvents: "none",
                backgroundImage: noiseDataUrl,
                backgroundSize: "600px 600px",
              }}
            />
          )}
          {/* soft linear darkness */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.6,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)",
            }}
          />
        </div>

        {/* Multi layered panels (keeps the look of stacked cards) */}
        {layered &&
          layerTransforms.map((tr, i) => (
            <div
              key={i}
              aria-hidden
              className="absolute inset-x-0 bottom-0 rounded-xl flex flex-col p-5 overflow-hidden"
              style={{
                transformOrigin: "center bottom",
                zIndex: 3 + i,
                background: `linear-gradient(180deg, ${gradient.from} 0%, ${gradient.via ?? gradient.from} 60%, ${gradient.to} 100%)`,
                borderTop: "1px solid rgba(255,255,255,0.8)",
                borderLeft: "1px solid rgba(255,255,255,0.4)",
                borderRight: "1px solid rgba(255,255,255,0.4)",
                boxShadow:
                  "rgba(255,255,255,0.5) 0px 0px 20px inset, rgba(0,0,0,0.05) 0px 1px 2px, rgba(0,0,0,0.05) 0px 4px 8px, rgba(0,0,0,0.1) 0px 8px 24px -4px",
                transform: tr,
                opacity: 1 - i * 0.08,
              }}
            >
              {/* very light noise layer for realism */}
              {noise && (
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.06,
                    pointerEvents: "none",
                    mixBlendMode: "multiply",
                    backgroundImage: noiseDataUrl,
                    backgroundSize: "600px 600px",
                  }}
                />
              )}
              {/* content placeholders for visual fidelity (kept empty) */}
            </div>
          ))}

        {/* MAIN INTERACTIVE SURFACE */}
        <motion.div
          className="absolute inset-x-5 bottom-4 top-4 pointer-events-auto rounded-2xl"
          style={{
            transformStyle: "preserve-3d",
            zIndex: 10,
          }}
          initial={{ opacity: 0, y: 12, rotateX }}
          animate={{ opacity: 1, y: 0, rotateX }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          whileHover={{ rotateX: 0, y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div
            className="relative w-full h-full rounded-xl overflow-hidden"
            style={{
              background: `linear-gradient(180deg, ${gradient.from} 0%, ${gradient.via ??
                gradient.from} 50%, ${gradient.to} 100%)`,
              borderTop: "1px solid rgba(255,255,255,0.8)",
              borderLeft: "1px solid rgba(255,255,255,0.4)",
              borderRight: "1px solid rgba(255,255,255,0.4)",
              boxShadow:
                "rgba(255,255,255,0.5) 0px 0px 20px inset, rgba(0,0,0,0.05) 0px 1px 2px, rgba(0,0,0,0.05) 0px 4px 8px, rgba(0,0,0,0.1) 0px 8px 24px -4px",
              transform: "translateY(-6px)",
              padding: "1rem",
            }}
          >
            {/* subtle overlay gradient + noise */}
            {noise && (
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.06,
                  pointerEvents: "none",
                  mixBlendMode: "multiply",
                  backgroundImage: noiseDataUrl,
                  backgroundSize: "600px 600px",
                }}
              />
            )}

            {/* content container where library consumers place their UI */}
            <div style={{ position: "relative", zIndex: 5, height: "100%" }}>{children}</div>

            {/* highlight shimmer (animated on hover via group) */}
            <div
              aria-hidden
              className="absolute -inset-full pointer-events-none transition-transform duration-700 group-hover:translate-y-0"
              style={{
                transform: "translateY(33%)",
                background:
                  "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.02) 60%, transparent 100%)",
              }}
            />
          </div>
        </motion.div>

        {/* top reflective shell rotated back to give depth */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center bottom",
            transform: `rotateX(${rotateX}deg)`,
          }}
        />
      </div>
    </div>
  );
}
