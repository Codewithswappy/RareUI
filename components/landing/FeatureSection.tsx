"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { 
  MoonStar, 
  Layers, 
  MousePointerClick, 
  Sparkles,
  Wind,
  SwitchCamera
} from "lucide-react";
import ParticleCard from "@/components/rareui/cards/ParticleCard";
import LiquidButton from "@/components/rareui/buttons/LiquidButton";
import SoftButton from "@/components/rareui/buttons/SoftButton";
import { Neumorphism3DButton } from "@/components/rareui/buttons/neumorphism3DButton";
import { cn } from "@/lib/utils";

const features = [
  {
    id: "animations",
    title: "Fluid Animations",
    description: "Pre-configured, buttery smooth animations powered by Framer Motion. Just copy, paste, and wow your users.",
    icon: <Wind className="w-5 h-5 text-blue-500" />,
    gradient: "from-blue-500 to-cyan-400",
    visual: () => (
      <div className="relative w-full h-full flex items-center justify-center p-8">
        <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    animate={{ 
                        scale: [1, 0.9, 1],
                        rotate: [0, 180, 360],
                        borderRadius: ["20%", "50%", "20%"]
                    }}
                    transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        delay: i * 0.5,
                        ease: "linear"
                    }}
                    className="w-24 h-24 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-xl rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                >
                   <motion.div 
                      className="w-full h-full flex items-center justify-center"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                   >
                     <div className="w-2 h-2 rounded-full bg-blue-400/50" />
                   </motion.div>
                </motion.div>
            ))}
        </div>
      </div>
    )
  },
  {
    id: "components",
    title: "Premium Components",
    description: "A growing collection of intricate, high-quality React components designed for modern web applications.",
    icon: <Layers className="w-5 h-5 text-violet-500" />,
    gradient: "from-violet-500 to-purple-400",
    visual: () => (
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="scale-[0.8] sm:scale-90 md:scale-100">
           <ParticleCard 
             name="Sarah Chen"
             role="Senior Developer"
             bio="Building the future of digital interactions. Expert in React and WebGL."
             tags={['RareUI', 'WebGL', 'Three.js']}
           />
        </div>
      </div>
    )
  },
  {
    id: "interactions",
    title: "Micro-Interactions",
    description: "Delightful details that make your app feel alive. Hover effects, click feedbacks, and more.",
    icon: <MousePointerClick className="w-5 h-5 text-orange-500" />,
    gradient: "from-orange-500 to-red-400",
    visual: () => (
      <div className="relative w-full h-full flex items-center justify-center p-8">
          <div className="flex flex-col gap-8 w-full max-w-sm items-center">
              
              <div className="flex items-center gap-6">
                 <div className="scale-75 origin-center">
                     <SoftButton>Soft UI</SoftButton>
                 </div>

                 <div className="scale-90 origin-center">
                     <Neumorphism3DButton>3D Click</Neumorphism3DButton>
                 </div>
              </div>

              <div className="scale-75 origin-center">
                 <LiquidButton text="Liquid Effect" backgroundColor="bg-orange-500" />
              </div>
          </div>
      </div>
    )
  },
  {
     id: "theming",
     title: "Dark Mode Ready",
     description: "Every component is built with dark mode in mind. Seamlessly switch themes without breaking a sweat.",
     icon: <MoonStar className="w-5 h-5 text-emerald-500" />,
     gradient: "from-emerald-500 to-green-400",
     visual: () => (
        <div className="relative w-full h-full flex items-center justify-center p-8">
           <div className="relative w-full max-w-sm h-64 rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-white">
              {/* Light Side Background */}
              <div className="absolute inset-0 bg-white flex flex-col p-6">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 mb-4" />
                  <div className="space-y-3">
                      <div className="h-4 w-3/4 rounded-full bg-zinc-100" />
                      <div className="h-3 w-full rounded-full bg-zinc-50" />
                      <div className="h-3 w-5/6 rounded-full bg-zinc-50" />
                  </div>
                  <div className="mt-6 flex gap-2">
                      <div className="h-8 w-20 rounded-lg bg-emerald-50" />
                      <div className="h-8 w-20 rounded-lg bg-zinc-50" />
                  </div>
              </div>

              {/* Dark Side Overlay */}
              <motion.div 
                 className="absolute inset-0 bg-zinc-950 flex flex-col p-6 z-10"
                 initial={{ clipPath: "circle(0% at 100% 0%)" }}
                 animate={{ clipPath: ["circle(0% at 100% 0%)", "circle(150% at 100% 0%)", "circle(0% at 100% 0%)"] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
              >
                  <div className="w-8 h-8 rounded-full bg-zinc-800 mb-4" />
                  <div className="space-y-3">
                      <div className="h-4 w-3/4 rounded-full bg-zinc-800" />
                      <div className="h-3 w-full rounded-full bg-zinc-900" />
                      <div className="h-3 w-5/6 rounded-full bg-zinc-900" />
                  </div>
                  <div className="mt-6 flex gap-2">
                      <div className="h-8 w-20 rounded-lg bg-emerald-500/20" />
                      <div className="h-8 w-20 rounded-lg bg-zinc-800" />
                  </div>
                  
                  {/* Floating Moon Icon */}
                  <div className="absolute top-6 right-6">
                      <div className="w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center text-white border border-white/10 shadow-lg">
                          <MoonStar size={18} />
                      </div>
                  </div>
              </motion.div>

              {/* Label */}
              <div className="absolute bottom-4 right-4 z-20 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-[10px] text-white font-medium flex items-center gap-1">
                  <SwitchCamera size={10} /> Auto-Detect
              </div>
           </div>
        </div>
     )
  }
];

export default function FeatureSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-background">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
              className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50" 
            />
            <motion.div 
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
              className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-3xl opacity-50" 
            />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
            
            {/* Header with Scroll & Text Animations */}
            <div className="max-w-3xl mx-auto text-center mb-20">
                {/* <motion.div 
                   initial={{ opacity: 0, scale: 0.8 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ type: "spring", duration: 0.8 }}
                   className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/30 border border-border/50 text-xs font-medium text-secondary-foreground mb-4 backdrop-blur-sm"
                >
                    <Sparkles className="w-3 h-3" />
                    <span>Features</span>
                </motion.div> */}
                
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 p-1">
                  {["Everything", "you", "need", "to", "build"].map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="inline-block mr-2"
                    >
                      {word}
                    </motion.span>
                  ))}
                  <br className="hidden md:block" />
                  <motion.span
                      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-neutral-400 inline-block"
                  >
                      pixel-perfect interfaces.
                  </motion.span>
                </h2>

                <motion.p 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.8, duration: 0.6 }}
                   className="text-lg text-muted-foreground leading-relaxed"
                >
                    RareUI provides the building blocks for modern applications. 
                    Focus on your product, while we handle the pixels, animations, and accessibility.
                </motion.p>
            </div>

            {/* Feature Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                
                {/* Left: Navigation with Hover Effects */}
                <div className="flex flex-col gap-4">
                    {features.map((feature, index) => (
                        <FeatureItem 
                           key={feature.id}
                           feature={feature}
                           isActive={activeFeature === index}
                           onClick={() => setActiveFeature(index)}
                        />
                    ))}
                </div>

                {/* Right: Preview Area with Staggered Entry */}
                <div className="relative h-[500px] lg:h-[600px] w-full sticky top-24">
                   <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-transparent rounded-3xl overflow-hidden"
                   >
                      <div className="relative w-full h-full flex items-center justify-center z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeFeature}
                                initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="w-full h-full"
                            >
                                {features[activeFeature].visual()}
                            </motion.div>
                        </AnimatePresence>
                      </div>
                   </motion.div>
                </div>

            </div>
        </div>
    </section>
  );
}

function FeatureItem({ feature, isActive, onClick }: { feature: any, isActive: boolean, onClick: () => void }) {
    return (
        <motion.div 
           layout
           onMouseEnter={onClick}
           onClick={onClick}
           className={cn(
             "group relative p-6 cursor-pointer transition-all duration-300 border-l-2 pl-6",
             isActive 
               ? "border-primary bg-secondary/10" 
               : "border-border/50 hover:bg-secondary/5 hover:border-primary/50"
           )}
           whileHover={{ x: 4 }}
        >
            <div className="relative z-10 flex gap-6">
                <div className={cn(
                    "mt-1 flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                    isActive 
                    ? "bg-primary text-primary-foreground shadow-lg scale-110" 
                    : "bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                )}>
                    {feature.icon}
                </div>
                <div className="space-y-2">
                    <h3 className={cn(
                        "text-xl font-semibold transition-colors duration-300",
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}>
                        {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                        {feature.description}
                    </p>
                </div>
            </div>

            {/* Active Glow Effect - Removed as requested */}
            {/* {isActive && (
                <motion.div 
                   layoutId="activeFeatureGlow"
                   className="absolute inset-0 rounded-2xl ring-1 ring-primary/20 z-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none"
                   transition={{ duration: 0.3 }}
                />
            )} */}
            
            {/* Hover Spotlight Gradient */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        </motion.div>
    )
}
