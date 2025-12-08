'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { GlassShimmerButton } from '@/components/rareui/buttons/glass-shimmer-button'
import LiquidButton from '@/components/rareui/buttons/LiquidButton'
import { Neumorphism3DButton } from '@/components/rareui/buttons/neumorphism3DButton'
import SoftButton from '@/components/rareui/buttons/SoftButton'
import { UpgradeButton } from '@/components/rareui/buttons/upgrade-button'
import ParticleCard from '@/components/rareui/cards/ParticleCard'
import PremiumProfileCard from '@/components/rareui/cards/premiumProfileCard'

const components = [
  {
    name: 'Liquid Button',
    component: <LiquidButton />,
    href: '/docs/components/buttons/liquid-button',
    className: 'col-span-1'
  },
  {
    name: 'Glass Shimmer',
    component: <GlassShimmerButton>Shimmer</GlassShimmerButton>,
    href: '/docs/components/buttons/glass-shimmer-button',
    className: 'col-span-1'
  },
  {
    name: 'Neumorphism 3D',
    component: <Neumorphism3DButton>Click Me</Neumorphism3DButton>,
    href: '/docs/components/buttons/neumorphism3DButton',
    className: 'col-span-1'
  },
  {
    name: 'Soft Button',
    component: <SoftButton>Button</SoftButton>,
    href: '/docs/components/buttons/soft-button',
    className: 'col-span-1'
  },
  {
    name: 'Upgrade Button',
    component: <UpgradeButton />,
    href: '/docs/components/buttons/upgrade-button',
    className: 'col-span-1'
  },
  {
    name: 'Particle Card',
    component: <div className="scale-[0.6] origin-center"><ParticleCard /></div>,
    href: '/docs/components/cards/particle-card',
    className: 'col-span-1 md:col-span-2 lg:col-span-1'
  },
  {
    name: 'Premium Profile',
    component: <div className="scale-75 origin-center"><PremiumProfileCard /></div>,
    href: '/docs/components/cards/premium-profile-card',
    className: 'col-span-1 md:col-span-2 lg:col-span-2'
  }
]

export default function ComponentsGrid() {
  return (
    <section className="relative w-full md:py-19 py-4 overflow-hidden bg-background">
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none h-full w-full">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid-pattern-components" width="80" height="80" patternUnits="userSpaceOnUse">
                         <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-neutral-400 dark:text-neutral-600" />
                    </pattern>
                </defs>
                {/* Desktop Grid */}
                <rect x="10%" y="0" width="80%" height="100%" fill="url(#grid-pattern-components)" className="hidden md:block" />
                <line x1="10%" y1="0" x2="10%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400 hidden md:block" strokeDasharray="4 4"/>
                <line x1="90%" y1="0" x2="90%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400 hidden md:block" strokeDasharray="4 4"/>

                {/* Mobile Grid */}
                <rect x="2.5%" y="0" width="95%" height="100%" fill="url(#grid-pattern-components)" className="block md:hidden" />
                <line x1="2.5%" y1="0" x2="2.5%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400 block md:hidden" strokeDasharray="4 4"/>
                <line x1="97.5%" y1="0" x2="97.5%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400 block md:hidden" strokeDasharray="4 4"/>
                <line x1="0" y1="0" x2="100%" y2="0" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400" strokeDasharray="4 4"/>
                <line x1="0" y1="94.5%" x2="100%" y2="94.5%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400 hidden md:block" strokeDasharray="4 4" style={{ transform: 'translateY(-1px)' }}/>
                <line x1="0" y1="95.5%" x2="100%" y2="95.5%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400 block md:hidden" strokeDasharray="4 4" style={{ transform: 'translateY(-1px)' }}/>
            </svg>
        </div>

        <div className="max-w-[1400px] w-[95%] md:w-[80%] mx-auto relative z-10">
            {/* Header */}
            <div className="text-center mb-16 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                    Component <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-950 to-neutral-500 dark:from-neutral-100 dark:to-neutral-500">Gallery</span>
                </h2>
                <p className="text-muted-foreground text-lg text-pretty">
                    Explore our collection of meticulously crafted components, ready to drop into your project.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:p-6 p-4">
                {components.slice(0, 6).map((item, idx) => (
                    <Link key={idx} href={item.href} className={`group block relative ${item.className || ''}`}>
                        <div className="h-[300px] w-full rounded-2xl border border-dashed border-neutral-400/60 dark:border-neutral-600/60 bg-background/50 hover:bg-secondary/20 transition-all duration-500 flex items-center justify-center relative overflow-hidden group-hover:border-foreground/20">
                           {/* Highlight */}
                           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                           
                           <div className="relative z-10 transform transition-transform duration-500 md:group-hover:scale-105">
                              {item.component}
                           </div>

                           <div className="absolute bottom-4 left-6 z-20">
                               <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                           </div>
                           
                           {/* Arrow Icon */}
                           <div className="absolute top-4 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                                </svg>
                           </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* View All Button */}
            <div className="flex justify-center mt-7">
                <Link href="/docs">
                    <div className="relative inline-flex overflow-hidden rounded-full p-[1px] group cursor-pointer">
                        <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#000_50%,transparent_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#fff_50%,transparent_100%)] opacity-70" />
                        <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-secondary/80 hover:bg-secondary text-foreground font-medium transition-colors backdrop-blur-sm px-8 py-3 relative">
                            View All Components
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    </section>
  )
}
