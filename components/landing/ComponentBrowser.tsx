"use client";

import React, { useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Layout,
  MousePointer2,
  Box,
  Layers,
  Sparkles,
  Type,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewCard } from "./PreviewCard";

// --- Dynamic Imports for Real Components (with lazy loading) ---
const LiquidButton = dynamic(() => import("@/components/rareui/LiquidButton").then(mod => mod.default), { ssr: false, loading: () => <PreviewSkeleton /> });
const SoftButton = dynamic(() => import("@/components/rareui/SoftButton").then(mod => mod.default), { ssr: false, loading: () => <PreviewSkeleton /> });
const Book3D = dynamic(() => import("@/components/rareui/3D elements/book-3d").then(mod => mod.Book3D), { ssr: false, loading: () => <PreviewSkeleton /> });
const LiquidMetal = dynamic(() => import("@/components/rareui/LiquidMetal").then(mod => mod.default), { ssr: false, loading: () => <PreviewSkeleton /> });
const LiquidWave = dynamic(() => import("@/components/rareui/interactive-background/LiquidWave").then(mod => mod.default), { ssr: false, loading: () => <PreviewSkeleton /> });
const VaporSmokeText = dynamic(() => import("@/components/rareui/Text Animation/VaporSmokeText").then(mod => mod.VaporSmokeText), { ssr: false, loading: () => <PreviewSkeleton /> });
const MagneticScatterText = dynamic(() => import("@/components/rareui/Text Animation/MagneticScatterText").then(mod => mod.MagneticScatterText), { ssr: false, loading: () => <PreviewSkeleton /> });
const WordMagnet = dynamic(() => import("@/components/rareui/Text Animation/WordMagnet").then(mod => mod.default), { ssr: false, loading: () => <PreviewSkeleton /> });
const SoundText = dynamic(() => import("@/components/rareui/Text Animation/SoundText").then(mod => mod.default), { ssr: false, loading: () => <PreviewSkeleton /> });
const ImageExpandTestimonial = dynamic(() => import("@/components/rareui/Sections/imageExpandTestimonial").then(mod => mod.ImageExpandTestimonial), { ssr: false, loading: () => <PreviewSkeleton /> });
const RetroPixelButton = dynamic(() => import("@/components/rareui/retro-pixel-button").then(mod => mod.default), { ssr: false, loading: () => <PreviewSkeleton /> });
const GlassShimmerButton = dynamic(() => import("@/components/rareui/glass-shimmer-button").then(mod => mod.GlassShimmerButton), { ssr: false, loading: () => <PreviewSkeleton /> });
const Neumorphism3DButton = dynamic(() => import("@/components/rareui/neumorphism3DButton").then(mod => mod.Neumorphism3DButton), { ssr: false, loading: () => <PreviewSkeleton /> });
const LoadingSpinner = dynamic(() => import("@/components/rareui/LoadingSpinner").then(mod => mod.default), { ssr: false, loading: () => <PreviewSkeleton /> });

// --- Skeleton Loader for lazy-loaded components ---
function PreviewSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-neutral-200 dark:border-neutral-700 border-t-neutral-400 dark:border-t-neutral-500 animate-spin" />
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
  { id: "all", name: "All", icon: <Layout className="w-3.5 h-3.5" /> },
  { id: "components", name: "Components", icon: <MousePointer2 className="w-3.5 h-3.5" /> },
  { id: "text", name: "Text Effects", icon: <Type className="w-3.5 h-3.5" /> },
  { id: "backgrounds", name: "Backgrounds", icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: "3d", name: "3D Blocks", icon: <Box className="w-3.5 h-3.5" /> },
  { id: "sections", name: "Sections", icon: <Layers className="w-3.5 h-3.5" /> },
];

const COMPONENT_DATA: ComponentItem[] = [
  // --- Components ---
  {
    id: "c1",
    name: "Liquid Button",
    category: "components",
    tag: "Motion",
    preview: <div className="scale-75"><LiquidButton text="RareUI" /></div>,
    slug: "components/liquid-button"
  },
  {
    id: "c2",
    name: "Crystal Soft Button",
    category: "components",
    tag: "Glass",
    preview: <SoftButton>Crystal</SoftButton>,
    slug: "components/soft-button"
  },
  {
    id: "c3",
    name: "Retro Pixel Button",
    category: "components",
    tag: "Game",
    preview: <div className="scale-75"><RetroPixelButton>Click Me</RetroPixelButton></div>,
    slug: "components/retro-pixel-button"
  },
  {
    id: "c4",
    name: "Glass Shimmer",
    category: "components",
    tag: "Premium",
    preview: <GlassShimmerButton>Shimmer</GlassShimmerButton>,
    slug: "components/glass-shimmer-button"
  },
  {
    id: "c5",
    name: "Loading Spinner",
    category: "components",
    tag: "Utility",
    preview: <LoadingSpinner />,
    slug: "components/loading-spinner"
  },

  // --- Text Effects ---
  {
    id: "t1",
    name: "Magnetic Scatter",
    category: "text",
    tag: "Hover",
    preview: <MagneticScatterText text="RAREUI" className="text-2xl" />,
    slug: "text-animation/magnetic-scatterText"
  },
  {
    id: "t2",
    name: "Vapor Smoke",
    category: "text",
    tag: "Anim",
    preview: <div className="scale-90"><VaporSmokeText text="Smoke" /></div>,
    slug: "text-animation/vapor-smokeText"
  },
  {
    id: "t3",
    name: "Word Magnet",
    category: "text",
    tag: "Physics",
    preview: <div className="scale-50 opacity-80 text-black dark:text-white"><WordMagnet text="Magnet Effect" radius={80} textColor="currentColor" /></div>,
    slug: "text-animation/word-magnet"
  },
  {
    id: "t4",
    name: "Sound Text",
    category: "text",
    tag: "Audio",
    preview: <div className="scale-75"><SoundText text="Sound" /></div>,
    slug: "text-animation/sound-text"
  },

  // --- Backgrounds ---
  {
    id: "b1",
    name: "Liquid Metal",
    category: "backgrounds",
    tag: "Shader",
    preview: <div className="w-full h-full"><LiquidMetal text="RARE" speed={0.05} /></div>,
    slug: "components/liquid-metal"
  },
  {
    id: "b2",
    name: "Liquid Wave",
    category: "backgrounds",
    tag: "Canvas",
    preview: <div className="w-full h-full scale-150"><LiquidWave /></div>,
    slug: "interactive-background/liquid-wave"
  },

  // --- 3D Blocks ---
  {
    id: "3d1",
    name: "3D Interaction Book",
    category: "3d",
    tag: "3D",
    preview: <div className="scale-90 opacity-90"><Book3D /></div>,
    slug: "3d-elements/book-3d"
  },
  {
    id: "c6",
    name: "3D Neumorphism",
    category: "components",
    tag: "Glass",
    preview: <div className="scale-75"><Neumorphism3DButton /></div>,
    slug: "components/neumorphism3DButton"
  },

  // --- Sections ---
  {
    id: "s1",
    name: "Expand Testimonial",
    category: "sections",
    tag: "Layout",
    preview: <div className="scale-[0.22] origin-center opacity-80"><ImageExpandTestimonial testimonials={[
      { id: '1', name: 'James Wilson', role: 'CEO', company: 'Nexus', quote: 'RareUI is a game changer.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
      { id: '2', name: 'Sarah Chen', role: 'Designer', company: 'Opal', quote: 'The animations are world class.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
      { id: '3', name: 'Alex Rivera', role: 'Dev', company: 'Flow', quote: 'Setup takes seconds.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' }
    ]} /></div>,
    slug: "sections/image-expand-testimonial"
  }
];

// --- Sub-components ---

const BrowserTab = ({ 
  active, 
  onClick, 
  children,
  icon
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
        "flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-1.5 cursor-pointer transition-all duration-300 rounded-md shadow-xs select-none shrink-0",
        active 
          ? "bg-[#FEFEFE] dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-md shadow-black/5 dark:shadow-black/20 ring-1 ring-black/5 dark:ring-white/5 text-[#111] dark:text-neutral-50" 
          : "bg-[#EBEBEB] dark:bg-neutral-800/50 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.2)] dark:shadow-[inset_1px_1px_3px_rgba(0,0,0,1),inset_-1px_-1px_3px_rgba(255,255,255,0.05)] text-[#8E8E8E] dark:text-neutral-400 hover:bg-[#EBEBEB]/80 dark:hover:bg-neutral-800/80 opacity-60 hover:opacity-100 ring-1 ring-black/5 dark:ring-white/5"
      )}
    >
      <span className={cn("shrink-0 transform scale-75 md:scale-90 transition-opacity", active ? "opacity-100" : "opacity-60")}>{icon}</span>
      <span className="text-[10px] md:text-[11.5px] font-semibold tracking-tight whitespace-nowrap">{children}</span>
    </div>
  );
};

export function ComponentBrowser() {
  const [activeTab, setActiveTab] = useState("all");

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

  const filteredItems = useMemo(() => 
    activeTab === "all" 
      ? COMPONENT_DATA 
      : COMPONENT_DATA.filter(item => item.category === activeTab),
    [activeTab]
  );

  return (
    <div className="w-[98%] max-w-[1600px] mx-auto py-10 pt-20 relative group/browser-container">
      <div className="relative w-full bg-[#f4f4f5] dark:bg-neutral-900 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/40 overflow-hidden flex flex-col z-10 shadow-md shadow-black/5 dark:shadow-black/20 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-500">
        
        {/* Browser Toolbar - Compact Skeuomorphic */}
        <div className="flex items-center px-4 py-2 bg-[#F5F5F3] dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 gap-4">
          {/* macOS Control Dots - Hidden on mobile to save space */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0 px-1">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-sm shadow-black/5 ring-1 ring-black/5" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-sm shadow-black/5 ring-1 ring-black/5" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-sm shadow-black/5 ring-1 ring-black/5" />
          </div>

          {/* Navigation Tabs - COMPACT NEUMORPHIC with Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1 pb-1 md:pb-1">
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
        <div className="relative min-h-[500px] bg-[#FBFBFA] dark:bg-neutral-900 flex flex-col shadow-[inset_0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_4px_24px_rgba(0,0,0,0.15)] transition-colors duration-500">
          {/* Inner Content Border Layer */}
          <div className="absolute inset-3 rounded-xl border border-neutral-200/80 dark:border-neutral-700/40 pointer-events-none z-0 shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]" />
          
          <div className="flex-1 relative z-10 flex flex-col items-center justify-start py-6 md:py-12 px-4 md:px-8 overflow-auto">
             <AnimatePresence mode="popLayout" initial={false}>
               <motion.div
                 key={activeTab}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                 className="w-full h-full flex items-start justify-center"
               >
                  {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 w-full max-w-6xl mx-auto">
                       <AnimatePresence mode="popLayout">
                         {filteredItems.map((item, index) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                duration: 0.3, 
                                ease: [0.23, 1, 0.32, 1],
                                delay: index * 0.04 
                              }}
                            >
                              <PreviewCard item={item} />
                            </motion.div>
                         ))}
                       </AnimatePresence>
                    </div>
                  ) : (
                    <div className="relative flex flex-col items-center justify-center text-center py-20">
                       <div className="flex flex-col items-center gap-6 opacity-30">
                          <Box className="w-16 h-16" />
                          <h2 className="text-xl font-bold font-mono tracking-tighter">Coming Soon to RareUI</h2>
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
