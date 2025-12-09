'use client'

import PremiumProfileCard from '@/components/rareui/premiumProfileCard'

import { motion, AnimatePresence, hover } from 'motion/react'
import LiquidButton  from '@/components/rareui/LiquidButton'
import Link from "next/link"
import Navbar from "@/components/landing/Navbar"
import { useState, useEffect } from 'react'
import { latestComponent } from '@/lib/latest-component'

export default function HeroSection() {
  const [hasCopied, setHasCopied] = useState(false);
  
  return (
    <div className="relative w-full overflow-hidden font-sans transition-colors duration-300 bg-background text-foreground selection:bg-primary/20">
      
      {/* --- Navbar (Floating Pill) --- */}
      <Navbar />

      {/* --- Background Grid & Lines --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-neutral-400 dark:text-neutral-400"/>
            </pattern>
          </defs>
          {/* Base Grid - Constrained to vertical lines */}
          {/* Desktop Grid */}
          <rect x="10%" y="0" width="80%" height="100%" fill="url(#grid-pattern)" className="hidden md:block" /> 
          <line x1="10%" y1="0" x2="10%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400 hidden md:block" strokeDasharray="4 4"/>
          <line x1="90%" y1="0" x2="90%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400 hidden md:block" strokeDasharray="4 4"/>
          
          {/* Mobile Grid */}
          <rect x="2.5%" y="0" width="95%" height="100%" fill="url(#grid-pattern)" className="block md:hidden" /> 
          <line x1="2.5%" y1="0" x2="2.5%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400 block md:hidden" strokeDasharray="4 4"/>
          <line x1="97.5%" y1="0" x2="97.5%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400 block md:hidden" strokeDasharray="4 4"/>
          
          {/* Horizontal Lines */}
          <line x1="0" y1="11%" x2="100%" y2="11%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400" strokeDasharray="4 4"/>
          <line x1="0" y1="90%" x2="100%" y2="90%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400" strokeDasharray="4 4"/>

          {/* Curved Decorative Lines */}
          {/* <path 
            d="M 0 500 C 500 500, 600 700, 900 600 S 1400 400, 1600 600" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            className="text-primary/40"
          />
          <path 
            d="M 1600 200 C 1300 300, 1000 100, 700 200 S 200 400, 0 200" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            className="text-primary/30" 
            strokeDasharray="10 10"
          /> */}
        </svg>
      </div>

      {/* --- Main Hero Container --- */}
      <main className="max-w-[1400px] w-[95%] md:w-[80%] mx-auto pt-32 pb-10 mt-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            
            {/* 1. Badge - Dynamic Latest Component */}
            <Link href={latestComponent.href}>
              <div className="relative inline-flex overflow-hidden rounded-full p-[1px] mb-8 cursor-pointer">
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#000_50%,transparent_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#fff_50%,transparent_100%)] opacity-70" />
                <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-secondary/80 dark:bg-background/90 px-3 py-1.5 backdrop-blur-3xl gap-2 hover:bg-secondary/60 transition-all duration-300 group relative">
                    <span className="bg-foreground text-background text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{latestComponent.name}</span>
                    <svg className="w-3 h-3 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </span>
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
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Keep your design system organized under one roof. Manage components quickly, easily & efficiently with our premium motion library.
            </p>

            {/* 4. CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-2">
              
              {/* CLI Command Button */}
              <button 
                onClick={() => {
                   navigator.clipboard.writeText("npx rareui init");
                   setHasCopied(true);
                   setTimeout(() => setHasCopied(false), 2000);
                }}
                className="relative inline-flex overflow-hidden rounded-full p-[1px] transition-all active:scale-95 group shadow-sm focus:outline-none"
              >
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#000_50%,transparent_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#fff_50%,transparent_100%)] opacity-70" />
                
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-6 py-4 text-foreground transition-colors backdrop-blur-3xl gap-2 relative">
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
                          className="w-4 h-4 text-foreground absolute inset-0"
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
                </span>
              </button>

              <Link href="/docs">
                <LiquidButton 
                  text="Browse Components" 
                  backgroundColor="bg-foreground"
                  textColor="text-background"
                  isDripping={true}
                />
              </Link>
            </div>
            
            {/* 5. Tech Stack */}
           
          </motion.div>
        </div>
           <div className="flex items-center justify-center">
             <div className="flex flex-wrap items-center justify-center gap-5 md:gap-10 ">
               {/* React */}
               <div className="relative flex items-center justify-center w-10 h-10 group/icon pt-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                  <svg className="w-8 h-8 text-[#61DAFB] transition-transform group-hover/icon:rotate-180 duration-700 ease-in-out" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="0" cy="0" r="2" fill="currentColor"/>
                    <g stroke="currentColor" strokeWidth="1" fill="none">
                      <ellipse rx="10" ry="4.5"/>
                      <ellipse rx="10" ry="4.5" transform="rotate(60)"/>
                      <ellipse rx="10" ry="4.5" transform="rotate(120)"/>
                    </g>
                  </svg>
                  {/* Tooltip */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-xs rounded-full font-medium opacity-0 group-hover/icon:opacity-100 transition-all duration-300 transform scale-75 group-hover/icon:scale-100 group-hover/icon:-translate-y-3 pointer-events-none whitespace-nowrap z-20">
                    React
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                  </div>
               </div>

               {/* Tailwind CSS */}
               <div className="relative flex items-center justify-center w-10 h-10 group/icon pt-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                  <svg className="w-8 h-8 text-[#38B2AC] transition-transform group-hover/icon:scale-110 duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
                  </svg>
                  {/* Tooltip */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-xs rounded-full font-medium opacity-0 group-hover/icon:opacity-100 transition-all duration-300 transform scale-75 group-hover/icon:scale-100 group-hover/icon:-translate-y-3 pointer-events-none whitespace-nowrap z-20">
                    Tailwind CSS
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                  </div>
               </div>

               {/* Framer Motion */}
               <div className="relative flex items-center justify-center h-10 w-10 min-w-[40px] group/icon pt-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                  <svg className="h-8 md:h-8 w-auto text-foreground transition-transform group-hover/icon:scale-110 duration-300 -mt-2" viewBox="0 0 1260 454" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M475.753 0 226.8 453.6H0L194.392 99.412C224.526 44.508 299.724 0 362.353 0zM1031.93 113.4c0-62.63 50.77-113.4 113.4-113.4s113.4 50.77 113.4 113.4c0 62.629-50.77 113.4-113.4 113.4s-113.4-50.771-113.4-113.4M518.278 0h226.8L496.125 453.6h-226.8zM786.147 0h226.803L818.555 354.188C788.422 409.092 713.223 453.6 650.594 453.6h-113.4z"/>
                  </svg>
                  {/* Tooltip */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-xs rounded-full font-medium opacity-0 group-hover/icon:opacity-100 transition-all duration-300 transform scale-75 group-hover/icon:scale-100 group-hover/icon:-translate-y-3 pointer-events-none whitespace-nowrap z-20">
                    Framer Motion
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                  </div>
               </div>

               {/* Next.js */}
               <div className="relative flex items-center justify-center w-10 h-10 group/icon pt-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                  <svg className="w-8 h-8 text-foreground transition-transform group-hover/icon:scale-110 duration-300" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.974,31.5c0,0.828-0.671,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-14c0-0.653,0.423-1.231,1.045-1.43 c0.625-0.198,1.302,0.03,1.679,0.563l16.777,23.704C40.617,36.709,44,30.735,44,24c0-11-9-20-20-20S4,13,4,24s9,20,20,20 c3.192,0,6.206-0.777,8.89-2.122L18.974,22.216V31.5z M28.974,16.5c0-0.828,0.671-1.5,1.5-1.5s1.5,0.672,1.5,1.5v13.84l-3-4.227 V16.5z"/>
                  </svg>
                  {/* Tooltip */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-xs rounded-full font-medium opacity-0 group-hover/icon:opacity-100 transition-all duration-300 transform scale-75 group-hover/icon:scale-100 group-hover/icon:-translate-y-3 pointer-events-none whitespace-nowrap z-20">
                    Next.js
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                  </div>
               </div>

               {/* TypeScript */}
               <div className="relative flex items-center justify-center w-10 h-10 group/icon pt-10 md:mr-16 lg:mr-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                  <svg className="w-8 h-8 text-[#3178C6] transition-transform group-hover/icon:scale-110 duration-300" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M45,4H5C4.447,4,4,4.448,4,5v40c0,0.552,0.447,1,1,1h40c0.553,0,1-0.448,1-1V5C46,4.448,45.553,4,45,4z M29,26.445h-5V42h-4V26.445h-5V23h14V26.445z M30.121,41.112v-4.158c0,0,2.271,1.712,4.996,1.712c2.725,0,2.62-1.782,2.62-2.026c0-2.586-7.721-2.586-7.721-8.315c0-7.791,11.25-4.717,11.25-4.717l-0.14,3.704c0,0-1.887-1.258-4.018-1.258s-2.9,1.013-2.9,2.096c0,2.795,7.791,2.516,7.791,8.141C42,44.955,30.121,41.112,30.121,41.112z"/>
                  </svg>
                  {/* Tooltip */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-xs rounded-full font-medium opacity-0 group-hover/icon:opacity-100 transition-all duration-300 transform scale-75 group-hover/icon:scale-100 group-hover/icon:-translate-y-3 pointer-events-none whitespace-nowrap z-20">
                    TypeScript
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                  </div>
               </div>
            </div>

           </div>
      </main>

      {/* --- Bottom Fade Mask --- */}
      {/* <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" /> */}
    </div>
  );
}
