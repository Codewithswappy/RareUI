'use client';

import React, { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, MousePointer2, Box, Layers, Sparkles, Type } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PreviewCard } from './PreviewCard';

// --- Dynamic Imports for Real Components (with lazy loading) ---
const LiquidButton = dynamic(
  () => import('@/components/rareui/LiquidButton').then((mod) => mod.default),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const SoftButton = dynamic(
  () => import('@/components/rareui/SoftButton').then((mod) => mod.default),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const Book3D = dynamic(
  () => import('@/components/rareui/3D elements/book-3d').then((mod) => mod.Book3D),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const LiquidMetal = dynamic(
  () => import('@/components/rareui/LiquidMetal').then((mod) => mod.default),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const LiquidWave = dynamic(
  () => import('@/components/rareui/interactive-background/LiquidWave').then((mod) => mod.default),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const VaporSmokeText = dynamic(
  () =>
    import('@/components/rareui/Text Animation/VaporSmokeText').then((mod) => mod.VaporSmokeText),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const MagneticScatterText = dynamic(
  () =>
    import('@/components/rareui/Text Animation/MagneticScatterText').then(
      (mod) => mod.MagneticScatterText
    ),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const WordMagnet = dynamic(
  () => import('@/components/rareui/Text Animation/WordMagnet').then((mod) => mod.default),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const SoundText = dynamic(
  () => import('@/components/rareui/Text Animation/SoundText').then((mod) => mod.default),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const ImageExpandTestimonial = dynamic(
  () =>
    import('@/components/rareui/Sections/imageExpandTestimonial').then(
      (mod) => mod.ImageExpandTestimonial
    ),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const RetroPixelButton = dynamic(
  () => import('@/components/rareui/RetroPixelButton').then((mod) => mod.default),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const GlassShimmerButton = dynamic(
  () => import('@/components/rareui/GlassShimmerButton').then((mod) => mod.GlassShimmerButton),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const Neumorphism3DButton = dynamic(
  () => import('@/components/rareui/Neumorphism3DButton').then((mod) => mod.Neumorphism3DButton),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const LoadingSpinner = dynamic(
  () => import('@/components/rareui/LoadingSpinner').then((mod) => mod.default),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);

const InteractiveAnimatedTabs = dynamic(
  () =>
    import('@/components/mdx/InteractiveAnimatedTabs').then((mod) => mod.InteractiveAnimatedTabs),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const FloatingNavigation = dynamic(
  () => import('@/components/rareui/FloatingNavigation').then((mod) => mod.default),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const LiquidTooltip = dynamic(
  () => import('@/components/rareui/LiquidTooltip').then((mod) => mod.LiquidTooltip),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const ParticleCard = dynamic(
  () => import('@/components/rareui/ParticleCard').then((mod) => mod.default),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const PremiumButton = dynamic(
  () => import('@/components/rareui/PremiumButton').then((mod) => mod.default),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const PremiumProfileCard = dynamic(
  () => import('@/components/rareui/PremiumProfileCard').then((mod) => mod.default),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);
const ToastTabs = dynamic(
  () => import('@/components/rareui/ToastTabs').then((mod) => mod.default),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);

// --- Skeleton Loader for lazy-loaded components ---
function PreviewSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-400 dark:border-neutral-700 dark:border-t-neutral-500" />
    </div>
  );
}

// --- Types ---
interface ComponentItem {
  id: string;
  name: string;
  category: string;
  tag: string;
  preview: React.ReactNode;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const CATEGORIES: Category[] = [
  { id: 'all', name: 'All', icon: <Layout className="h-3.5 w-3.5" /> },
  { id: 'components', name: 'Components', icon: <MousePointer2 className="h-3.5 w-3.5" /> },
  { id: 'text', name: 'Text Effects', icon: <Type className="h-3.5 w-3.5" /> },
  { id: 'backgrounds', name: 'Backgrounds', icon: <Sparkles className="h-3.5 w-3.5" /> },
  { id: '3d', name: '3D Blocks', icon: <Box className="h-3.5 w-3.5" /> },
  { id: 'sections', name: 'Sections', icon: <Layers className="h-3.5 w-3.5" /> },
];

const COMPONENT_DATA: ComponentItem[] = [
  // --- Components ---
  {
    id: 'c1',
    name: 'Liquid Button',
    category: 'components',
    tag: 'Motion',
    preview: (
      <div className="scale-100">
        <LiquidButton text="RareUI" />
      </div>
    ),
    slug: 'components/liquid-button',
  },
  {
    id: 'c2',
    name: 'Crystal Soft Button',
    category: 'components',
    tag: 'Glass',
    preview: <SoftButton>Crystal</SoftButton>,
    slug: 'components/soft-button',
  },
  {
    id: 'c3',
    name: 'Retro Pixel Button',
    category: 'components',
    tag: 'Game',
    preview: (
      <div className="scale-100">
        <RetroPixelButton>Click Me</RetroPixelButton>
      </div>
    ),
    slug: 'components/retro-pixel-button',
  },
  {
    id: 'c4',
    name: 'Glass Shimmer',
    category: 'components',
    tag: 'Premium',
    preview: <GlassShimmerButton>Shimmer</GlassShimmerButton>,
    slug: 'components/glass-shimmer-button',
  },
  {
    id: 'c5',
    name: 'Loading Spinner',
    category: 'components',
    tag: 'Utility',
    preview: <LoadingSpinner />,
    slug: 'components/loading-spinner',
  },

  {
    id: 'c7',
    name: 'Animated Tab',
    category: 'components',
    tag: 'Navigation',
    preview: (
      <div className="scale-[0.60]">
        <InteractiveAnimatedTabs />
      </div>
    ),
    slug: 'components/animated-tab',
  },
  {
    id: 'c8',
    name: 'Floating Navigation',
    category: 'components',
    tag: 'Navigation',
    preview: (
      <div className="absolute bottom-12 flex w-full scale-75 items-end justify-center">
        <FloatingNavigation />
      </div>
    ),
    slug: 'components/floating-navigation',
  },
  {
    id: 'c9',
    name: 'Liquid Tooltip',
    category: 'components',
    tag: 'Tooltip',
    preview: (
      <div className="flex h-full scale-100 items-center justify-center">
        <LiquidTooltip text="Liquid tooltip magic!">
          <div className="cursor-pointer text-3xl font-bold text-neutral-800 dark:text-neutral-200">
            Hover me
          </div>
        </LiquidTooltip>
      </div>
    ),
    slug: 'components/liquid-tooltip',
  },
  {
    id: 'c10',
    name: 'Particle Card',
    category: 'components',
    tag: 'Premium',
    preview: (
      <div className="scale-[0.35]">
        <ParticleCard />
      </div>
    ),
    slug: 'components/particle-card',
  },
  {
    id: 'c11',
    name: 'Premium Button',
    category: 'components',
    tag: 'Premium',
    preview: (
      <div className="scale-100">
        <PremiumButton />
      </div>
    ),
    slug: 'components/premium-button',
  },
  {
    id: 'c12',
    name: 'Premium Profile Card',
    category: 'components',
    tag: 'Premium',
    preview: (
      <div className="scale-[0.35]">
        <PremiumProfileCard />
      </div>
    ),
    slug: 'components/premium-profile-card',
  },
  {
    id: 'c13',
    name: 'Toast Tabs',
    category: 'components',
    tag: 'Feedback',
    preview: (
      <div className="scale-60">
        <ToastTabs />
      </div>
    ),
    slug: 'components/toast-tabs',
  },

  // --- Text Effects ---
  {
    id: 't1',
    name: 'Magnetic Scatter',
    category: 'text',
    tag: 'Hover',
    preview: <MagneticScatterText text="Scatter Effect" className="text-4xl font-medium" />,
    slug: 'text-animation/magnetic-scatterText',
  },
  {
    id: 't2',
    name: 'Vapor Smoke',
    category: 'text',
    tag: 'Anim',
    preview: (
      <div className="scale-100">
        <VaporSmokeText text="Smoke Effect" className="text-4xl font-medium" />
      </div>
    ),
    slug: 'text-animation/vapor-smokeText',
  },
  {
    id: 't3',
    name: 'Word Magnet',
    category: 'text',
    tag: 'Physics',
    preview: (
      <div className="scale-100 text-black opacity-80 dark:text-white">
        <WordMagnet
          text="Magnet Effect"
          radius={80}
          textColor="currentColor"
          className="text-2xl font-medium"
        />
      </div>
    ),
    slug: 'text-animation/word-magnet',
  },
  {
    id: 't4',
    name: 'Sound Text',
    category: 'text',
    tag: 'Audio',
    preview: (
      <div className="scale-100">
        <SoundText text="Play Sound" className="text-4xl font-medium" />
      </div>
    ),
    slug: 'text-animation/sound-text',
  },

  // --- Backgrounds ---
  {
    id: 'b1',
    name: 'Liquid Metal',
    category: 'backgrounds',
    tag: 'Shader',
    preview: (
      <div className="h-full w-full">
        <LiquidMetal text="RARE" speed={0.05} />
      </div>
    ),
    slug: 'components/liquid-metal',
  },
  {
    id: 'b2',
    name: 'Liquid Wave',
    category: 'backgrounds',
    tag: 'Canvas',
    preview: (
      <div className="h-full w-full scale-150">
        <LiquidWave />
      </div>
    ),
    slug: 'interactive-background/liquid-wave',
  },

  // --- 3D Blocks ---
  {
    id: '3d1',
    name: '3D Interaction Book',
    category: '3d',
    tag: '3D',
    preview: (
      <div className="scale-50 opacity-90">
        <Book3D />
      </div>
    ),
    slug: '3d-elements/book-3d',
  },
  {
    id: 'c6',
    name: '3D Neumorphism',
    category: 'components',
    tag: 'Glass',
    preview: (
      <div className="scale-100">
        <Neumorphism3DButton />
      </div>
    ),
    slug: 'components/neumorphism3DButton',
  },

  // --- Sections ---
  {
    id: 's1',
    name: 'Expand Testimonial',
    category: 'sections',
    tag: 'Layout',
    preview: (
      <div className="origin-center scale-[0.25] opacity-80">
        <ImageExpandTestimonial
          testimonials={[
            {
              id: '1',
              name: 'James Wilson',
              role: 'CEO',
              company: 'Nexus',
              quote: 'RareUI is a game changer.',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            },
            {
              id: '2',
              name: 'Sarah Chen',
              role: 'Designer',
              company: 'Opal',
              quote: 'The animations are world class.',
              image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
            },
            {
              id: '3',
              name: 'Alex Rivera',
              role: 'Dev',
              company: 'Flow',
              quote: 'Setup takes seconds.',
              image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
            },
          ]}
        />
      </div>
    ),
    slug: 'sections/image-expand-testimonial',
  },
];

// --- Sub-components ---

const BrowserTab = ({
  active,
  onClick,
  children,
  icon,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 shadow-xs transition-all duration-300 select-none md:px-4 md:py-2',
        active
          ? 'border border-neutral-200/80 bg-[#FEFEFE] text-[#111] shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014] ring-1 ring-black/5 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040] dark:ring-white/5'
          : 'bg-[#EBEBEB] text-[#8E8E8E] opacity-60 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.2)] ring-1 ring-black/5 hover:bg-[#EBEBEB]/80 hover:opacity-100 dark:bg-neutral-700/50 dark:text-neutral-400 dark:shadow-[inset_1px_1px_3px_rgba(0,0,0,1),inset_-1px_-1px_3px_rgba(255,255,255,0.1)] dark:ring-white/5 dark:hover:bg-neutral-800/80'
      )}
    >
      <span
        className={cn(
          'shrink-0 scale-75 transform transition-opacity md:scale-90',
          active ? 'opacity-100' : 'opacity-60'
        )}
      >
        {icon}
      </span>
      <span className="text-[10px] font-semibold tracking-tight whitespace-nowrap md:text-[11.5px]">
        {children}
      </span>
    </div>
  );
};

export function ComponentBrowser() {
  const [activeTab, setActiveTab] = useState('all');

  const handleTabChange = useCallback((newTab: string) => {
    // @ts-ignore
    if (!document.startViewTransition) {
      setActiveTab(newTab);
      return;
    }
    // @ts-ignore
    document.startViewTransition(() => {
      setActiveTab(newTab);
    });
  }, []);

  const filteredItems = useMemo(
    () =>
      activeTab === 'all'
        ? COMPONENT_DATA
        : COMPONENT_DATA.filter((item) => item.category === activeTab),
    [activeTab]
  );

  return (
    <div className="group/browser-container relative mx-auto w-[98%] max-w-[1600px] py-10 pt-20">
      <div className="relative z-10 flex w-full flex-col overflow-hidden rounded-2xl border border-neutral-200/60 bg-[#f4f4f5] shadow-md ring-1 shadow-black/5 ring-black/5 transition-all duration-500 dark:border-neutral-700/40 dark:bg-neutral-900 dark:shadow-black/20 dark:ring-white/5">
        {/* Browser Toolbar - Compact Skeuomorphic */}
        <div className="flex items-center gap-4 border-b border-neutral-100 bg-[#F5F5F3] px-4 py-2 dark:border-neutral-800 dark:bg-neutral-950">
          {/* macOS Control Dots - Hidden on mobile to save space */}
          <div className="hidden shrink-0 items-center gap-1.5 px-1 sm:flex">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] shadow-sm ring-1 shadow-black/5 ring-black/5" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] shadow-sm ring-1 shadow-black/5 ring-black/5" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F] shadow-sm ring-1 shadow-black/5 ring-black/5" />
          </div>

          {/* Navigation Tabs - COMPACT NEUMORPHIC with Horizontal Scroll */}
          <div className="no-scrollbar flex flex-1 items-center gap-1.5 overflow-x-auto p-1 pb-1 md:pb-1">
            {CATEGORIES.map((cat) => (
              <BrowserTab
                key={cat.id}
                active={activeTab === cat.id}
                onClick={() => handleTabChange(cat.id)}
                icon={cat.icon}
              >
                {cat.name}
              </BrowserTab>
            ))}
          </div>
        </div>

        {/* Browser Content Area - WITH INSET SHADOW */}
        <div className="relative flex min-h-[500px] flex-col bg-[#FBFBFA] shadow-[inset_0_4px_24px_rgba(0,0,0,0.04)] transition-colors duration-500 dark:bg-neutral-950 dark:shadow-[inset_0_4px_24px_rgba(0,0,0,0.15)]">
          {/* Inner Content Border Layer */}
          <div className="pointer-events-none absolute inset-3 z-0 rounded-xl border border-neutral-200/80 shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)] dark:border-neutral-700/40 dark:shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]" />

          <div className="relative z-10 flex flex-1 flex-col items-center justify-start overflow-auto px-4 py-6 md:px-8 md:py-12">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="flex h-full w-full items-start justify-center"
              >
                {filteredItems.length > 0 ? (
                  <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    <AnimatePresence mode="popLayout">
                      {filteredItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.23, 1, 0.32, 1],
                            delay: index * 0.04,
                          }}
                        >
                          <PreviewCard item={item} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="relative flex flex-col items-center justify-center py-20 text-center">
                    <div className="flex flex-col items-center gap-6 opacity-30">
                      <Box className="h-16 w-16" />
                      <h2 className="font-mono text-xl font-bold tracking-tighter">
                        Coming Soon to RareUI
                      </h2>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
