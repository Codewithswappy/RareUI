'use client'

import PremiumProfileCard from '@/components/rareui/cards/premiumProfileCard'

import { motion, AnimatePresence, hover } from 'motion/react'
import LiquidButton  from '@/components/rareui/buttons/LiquidButton'
import Link from "next/link"
import Navbar from "@/components/landing/Navbar"
import { useState, useEffect } from 'react'
import { latestComponent } from '@/lib/latest-component'

export default function HeroSection() {
  const [hasCopied, setHasCopied] = useState(false);
  
  return (
    <div className="min-h-screen font-sans transition-colors duration-300 bg-background text-foreground selection:bg-primary/20">
      
      {/* --- Navbar (Floating Pill) --- */}
      <Navbar />

      {/* --- Main Hero Container --- */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start text-left"
          >
            
            {/* 1. Badge - Dynamic Latest Component */}
            <Link href={latestComponent.href}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border mb-8 backdrop-blur-sm cursor-pointer hover:bg-secondary/70 hover:border-foreground/20 transition-all duration-300 group">
                <span className="bg-foreground text-background text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{latestComponent.name}</span>
                <svg className="w-3 h-3 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* 2. Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-foreground">
              Build Interfaces <br className="hidden md:block"/>
              That Feel <span className="inline-flex ml-2 md:ml-3">
                {"Rare.".split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.8,
                      ease: [0.2, 0.65, 0.3, 0.9]
                    }}
                    className="text-muted-foreground inline-block hover:text-foreground transition-colors cursor-default"
                    whileHover={{ 
                      y: -8,
                      rotate: index % 2 === 0 ? 5 : -5,
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* 3. Description */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Keep your design system organized under one roof. Manage components quickly, easily & efficiently with our premium motion library.
            </p>

            {/* 4. CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              
              {/* CLI Command Button */}
              <button 
                onClick={() => {
                   navigator.clipboard.writeText("npx rareui init");
                   setHasCopied(true);
                   setTimeout(() => setHasCopied(false), 2000);
                }}
                className="relative flex items-center gap-2 px-6 py-4 rounded-full border border-border bg-background hover:bg-muted/50 transition-all active:scale-95 group shadow-sm text-foreground"
              >
                <div className="flex items-center gap-1 font-mono text-sm">
                  <span className="text-muted-foreground select-none">$</span>
                  <span className="font-medium mr-2">npx rareui init</span>
                </div>
                <div className="relative w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors">
                  <AnimatePresence mode='wait' initial={false}>
                    {hasCopied ? (
                      <motion.svg
                        key="check"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="w-4 h-4 text-green-500 absolute inset-0"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5"/>
                      </motion.svg>
                    ) : (
                      <motion.svg
                        key="copy"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="w-4 h-4 absolute inset-0"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </div>
              </button>

              <Link href="/docs">
                <LiquidButton 
                  text="Browse Components" 
                  backgroundColor="bg-foreground"
                  textColor="text-background"
                />
              </Link>
            </div>



          </motion.div>

          {/* Right Column: Visual */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="relative w-full min-h-[500px] md:min-h-0 md:aspect-[2/3] lg:aspect-square bg-background rounded-lg overflow-hidden flex items-center justify-center p-2 lg:p-0"
          >
             {/* Premium Profile Card */}
             <div className="relative z-10 scale-[0.85] sm:scale-100">
                <PremiumProfileCard />
             </div>

             {/* Floating Elements (Decorations) */}
             {/* React Icon */}
             <motion.div 
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-24 left-10 md:left-20 bg-background/80 backdrop-blur-md border border-border/50 p-3 rounded-2xl shadow-xl z-20 group cursor-pointer"
             >
                <svg className="w-8 h-8 text-[#61DAFB]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9z" />
                </svg>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <span className="text-[10px] font-bold bg-foreground text-background px-2 py-1 rounded-full whitespace-nowrap shadow-xl">
                        React
                    </span>
                </div>
             </motion.div>

             {/* Tailwind Icon */}
             <motion.div 
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} 
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 right-8 md:right-16 bg-background/80 backdrop-blur-md border border-border/50 p-3 rounded-2xl shadow-xl z-20 group cursor-pointer"
             >
                <svg className="w-8 h-8 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                </svg>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <span className="text-[10px] font-bold bg-foreground text-background px-2 py-1 rounded-full whitespace-nowrap shadow-xl">
                        Tailwind
                    </span>
                </div>
             </motion.div>

             {/* Next.js Icon */}
             <motion.div 
                animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }} 
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-24 left-4 md:left-8 bg-background/80 backdrop-blur-md border border-border/50 p-3 rounded-2xl shadow-xl z-20 group cursor-pointer"
             >
                <svg className="w-6 h-6 text-foreground" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_408_134" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                    <circle cx="90" cy="90" r="90" fill="black"/>
                    </mask>
                    <g mask="url(#mask0_408_134)">
                    <circle cx="90" cy="90" r="90" fill="black" stroke="white" strokeWidth="6" />
                    <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_408_134)"/>
                    <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_134)"/>
                    </g>
                    <defs>
                    <linearGradient id="paint0_linear_408_134" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_408_134" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                    </linearGradient>
                    </defs>
                </svg>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <span className="text-[10px] font-bold bg-foreground text-background px-2 py-1 rounded-full whitespace-nowrap shadow-xl">
                        Next.js
                    </span>
                </div>
             </motion.div>

             {/* Motion Icon */}
             <motion.div 
                animate={{ x: [0, 10, 0], y: [0, 10, 0] }} 
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 right-4 translate-y-1/2 bg-background/80 backdrop-blur-md border border-border/50 p-3 rounded-2xl shadow-xl z-20 hidden md:block group cursor-pointer"
             >
                <svg className="w-6 h-6 text-[#FF0080]" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M4 4l7.07 16 2.51-7.39L21 10.07z" />
                </svg>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <span className="text-[10px] font-bold bg-foreground text-background px-2 py-1 rounded-full whitespace-nowrap shadow-xl">
                        Motion
                    </span>
                </div>
             </motion.div>


          </motion.div>

        </div>
      </main>
    </div>
  );
}
