"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MoonStar, 
  Layers, 
  MousePointerClick, 
  Wind,
  Zap,
  Sparkles,
  CheckCircle2,
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Interactive Visual Components ---

function AnimationVisual() {
    const [activeId, setActiveId] = useState<number | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveId(prev => {
                if (prev === null) return 0;
                if (prev === 3) return null; // End of cycle, go back to grid
                return prev + 1;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const items = [
        {
            id: 0,
            color: "bg-white dark:bg-neutral-800",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
            label: "Music",
            sub: "Playing",
            renderExpanded: () => (
                <div className="flex flex-col h-full justify-end">
                     <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-indigo-500/20 to-transparent" />
                     <div className="w-full aspect-square bg-neutral-900 rounded-2xl mb-4 shadow-2xl flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop')] bg-cover bg-center opacity-80" />
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center z-10"><svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
                     </div>
                     <div className="space-y-1 mb-4">
                        <div className="text-xl font-bold dark:text-white">Midnight City</div>
                        <div className="text-sm text-neutral-500">M83 • Hurry Up, We're Dreaming</div>
                     </div>
                     <div className="bg-neutral-100 dark:bg-neutral-700 h-1 rounded-full overflow-hidden"><div className="w-2/3 h-full bg-indigo-500" /></div>
                </div>
            )
        },
        {
            id: 1,
            color: "bg-white dark:bg-neutral-800",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
            label: "Wi-Fi",
            sub: "Connected",
            renderExpanded: () => (
                <div className="flex flex-col h-full justify-between pt-8">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-500">240</div>
                        <div className="text-sm text-neutral-400 font-medium">Mbps Download</div>
                    </div>
                    <div className="h-32 flex items-end gap-1 justify-between px-2 pb-2">
                        {[40, 60, 30, 80, 50, 90, 40, 60, 80, 50].map((h, i) => (
                            <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.05 }}
                                className="w-4 bg-blue-500/20 hover:bg-blue-500 rounded-t-sm transition-colors"
                            />
                        ))}
                    </div>
                    <div className="flex gap-2 justify-center">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-xs text-neutral-500">Network Stable</span>
                    </div>
                </div>
            )
        },
        {
            id: 2,
            color: "bg-neutral-900 dark:bg-white",
            textOverride: "text-white dark:text-neutral-900",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6"/><path d="M12 18v2"/><path d="M4.93 4.93l4.24 4.24"/><path d="M14.83 14.83l4.24 4.24"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/></svg>,
            label: "Lights",
            sub: "On",
            renderExpanded: () => (
                <div className="flex flex-col h-full pt-4">
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-lg font-bold">Living Room</span>
                        <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">ON</div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-6">
                         <div className="space-y-2">
                            <div className="flex justify-between text-xs opacity-70"><span>Brightness</span><span>80%</span></div>
                            <div className="h-4 bg-white/20 rounded-full overflow-hidden"><div className="w-[80%] h-full bg-white" /></div>
                         </div>
                         <div className="flex justify-between gap-2">
                            {["#fff", "#f00", "#0f0", "#00f"].map(c => (
                                <div key={c} className="w-10 h-10 rounded-full border-2 border-white/20" style={{ backgroundColor: c }} />
                            ))}
                         </div>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            color: "bg-white dark:bg-neutral-800",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>,
            label: "Climate",
            sub: "72°F",
            renderExpanded: () => (
                <div className="flex flex-col h-full items-center justify-center relative">
                     <div className="w-40 h-40 rounded-full border-4 border-orange-100 dark:border-orange-900/30 flex items-center justify-center relative">
                        <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full rotate-45" />
                        <div className="text-center">
                            <div className="text-4xl font-bold text-neutral-900 dark:text-white">72°</div>
                            <div className="text-xs text-neutral-500">Heating</div>
                        </div>
                     </div>
                     <div className="absolute bottom-0 flex gap-4 w-full justify-between">
                         <button className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-xl font-bold">-</button>
                         <button className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-orange-500/30">+</button>
                     </div>
                </div>
            )
        }
    ];

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-72 h-72 bg-neutral-50 dark:bg-neutral-900 rounded-[2rem] border border-neutral-200 dark:border-neutral-800 shadow-2xl p-4 overflow-hidden relative">
                <motion.div 
                    layout
                    className={cn(
                        "w-full h-full",
                        activeId !== null ? "flex flex-col" : "grid grid-cols-2 gap-3"
                    )}
                >
                    <AnimatePresence mode="popLayout">
                        {items.map((item) => {
                            if (activeId !== null && activeId !== item.id) return null;
                            
                            return (
                                <motion.div
                                    layout
                                    key={item.id}
                                    onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                                    layoutId={`card-${item.id}`}
                                    className={cn(
                                        "rounded-3xl p-4 cursor-pointer relative overflow-hidden group border border-neutral-100 dark:border-neutral-700 shadow-sm transition-all hover:shadow-md",
                                        activeId === item.id ? "w-full h-full z-20" : "aspect-square flex flex-col justify-between",
                                        item.color,
                                        item.textOverride || "text-neutral-900 dark:text-white"
                                    )}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                >
                                    {activeId === item.id ? (
                                        <motion.div 
                                            initial={{ opacity: 0 }} 
                                            animate={{ opacity: 1 }} 
                                            transition={{ delay: 0.2 }}
                                            className="h-full"
                                        >
                                            <div className="absolute top-4 right-4 opacity-50"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>
                                            {item.renderExpanded()}
                                        </motion.div>
                                    ) : (
                                        <>
                                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center opacity-80", item.textOverride ? "bg-white/20" : "bg-neutral-100 dark:bg-neutral-800")}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm">{item.label}</div>
                                                <div className="text-xs opacity-60 font-medium">{item.sub}</div>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

function ComponentVisual() {
    const [progress, setProgress] = useState(75);
    const [status, setStatus] = useState("In Progress");
    const [assigned, setAssigned] = useState([1, 2, 3]);

    // Auto-cycle progress
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 0;
                return prev + 1;
            });
        }, 50);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setStatus(progress >= 100 ? "Completed" : "In Progress");
    }, [progress]);

    const handleProgressClick = () => {
        const newProgress = Math.floor(Math.random() * 100);
        setProgress(newProgress);
    };

    return (
        <div className="w-full h-full flex items-center justify-center p-6">
            <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full max-w-xs bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden select-none cursor-pointer"
                onClick={handleProgressClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {/* Header */}
                <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center bg-neutral-50/50 dark:bg-neutral-900/50">
                    <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full animate-pulse", status === "Completed" ? "bg-green-500" : "bg-orange-500")} />
                        <span className="text-xs font-medium text-neutral-500">{status}</span>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-neutral-400" />
                </div>
                
                {/* Body */}
                <div className="p-4 space-y-4">
                    <div className="space-y-2">
                        <div className="h-4 w-16 bg-blue-100 dark:bg-blue-900/30 text-[10px] font-bold text-blue-600 dark:text-blue-400 r px-1 flex items-center">
                            DESIGN
                        </div>
                        <h4 className="font-bold text-lg leading-tight">Redesign Dashboard</h4>
                        <p className="text-xs text-neutral-500">Implement new glassmorphism controls and improve accessibility.</p>
                    </div>
                    
                    {/* Progress */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-neutral-500">Progress</span>
                            <span className="font-bold">{progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                            <motion.div 
                                animate={{ width: `${progress}%` }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }} // Smooth update from state change
                                className={cn("h-full rounded-full relative", status === "Completed" ? "bg-green-500" : "bg-gradient-to-r from-violet-500 to-purple-500")}
                            >
                                <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Footer Buttons/Avatars */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex -space-x-2">
                            {assigned.map(i => (
                                <motion.div 
                                    key={i} 
                                    animate={{ 
                                        y: [0, -3, 0],
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{ 
                                        duration: 2, 
                                        repeat: Infinity, 
                                        delay: i * 0.2,
                                        ease: "easeInOut" 
                                    }}
                                    className={`w-6 h-6 rounded-full border-2 border-white dark:border-neutral-900 flex items-center justify-center text-[8px] font-bold text-white ${i===1?'bg-pink-500':i===2?'bg-blue-500':'bg-emerald-500'}`}
                                >
                                    {i === 1 ? 'JD' : i === 2 ? 'AS' : 'MK'}
                                </motion.div>
                            ))}
                        </div>
                        <button className="text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full text-neutral-500">
                            Auto-Sync
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function InteractionVisual() {
    const [sliderHeight, setSliderHeight] = useState(50);
    const [isToggled, setIsToggled] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    // Auto-loop interactions
    useEffect(() => {
        const sliderInterval = setInterval(() => {
            setSliderHeight(Math.floor(Math.random() * 80 + 20));
        }, 2000);

        const toggleInterval = setInterval(() => {
            setIsToggled(prev => !prev);
        }, 3000);

        const buttonInterval = setInterval(() => {
            setIsPressed(true);
            setTimeout(() => setIsPressed(false), 200);
        }, 2500);

        return () => {
            clearInterval(sliderInterval);
            clearInterval(toggleInterval);
            clearInterval(buttonInterval);
        };
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="flex gap-4 items-center">
                {/* Elastic Slider */}
                <div 
                    className="h-32 w-12 bg-neutral-100 dark:bg-neutral-800 rounded-full relative overflow-hidden flex flex-col justify-end p-1 group cursor-pointer border border-neutral-200 dark:border-neutral-700 hover:border-orange-200 transition-colors"
                    onClick={() => setSliderHeight(Math.random() * 80 + 20)}
                >
                    <motion.div 
                        initial={false}
                        animate={{ height: `${sliderHeight}%` }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="w-full bg-orange-500 rounded-full relative"
                    >
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-white/20 rounded-full" />
                    </motion.div>
                </div>

                {/* Bouncy Toggle Switch */}
                <div className="flex flex-col gap-4">
                    <motion.div 
                        className={cn("w-16 h-10 rounded-full p-1 cursor-pointer flex transition-colors", isToggled ? "bg-green-500 justify-end" : "bg-neutral-200 dark:bg-neutral-800 justify-start")}
                        onClick={() => setIsToggled(!isToggled)}
                        whileTap={{ scale: 0.9 }}
                    >
                        <motion.div 
                            layout
                            className="w-8 h-8 rounded-full bg-white shadow-md relative"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className={cn("w-1.5 h-1.5 rounded-full", isToggled ? "bg-green-500" : "bg-neutral-300")} />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Tactile Button */}
                    <motion.button
                        animate={{ scale: isPressed ? 0.85 : 1 }}
                        onClick={() => { setIsPressed(true); setTimeout(() => setIsPressed(false), 200); }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.85 }}
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 text-white flex items-center justify-center shadow-lg active:shadow-inner transition-transform"
                    >
                        <MousePointerClick className="w-6 h-6" />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

function GlobalThemeVisual() {
    const [isDark, setIsDark] = useState(false);

    // Auto-toggle theme
    useEffect(() => {
        const interval = setInterval(() => {
            setIsDark(prev => !prev);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center p-8">
            <div className="relative w-full max-w-sm h-64 rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-white scale-90 md:scale-100 select-none">
                {/* Light Side Background */}
                <div className="absolute inset-0 bg-white flex flex-col p-6 pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 mb-4" />
                    <div className="space-y-3">
                        <div className="h-4 w-3/4 rounded-full bg-zinc-100" />
                        <div className="h-3 w-full rounded-full bg-zinc-50" />
                        <div className="h-3 w-5/6 rounded-full bg-zinc-50" />
                    </div>
                </div>
  
                {/* Dark Side Overlay */}
                <motion.div 
                    className="absolute inset-0 bg-zinc-950 flex flex-col p-6 z-10 pointer-events-none"
                    initial={false}
                    animate={{ clipPath: isDark ? "circle(150% at 100% 0%)" : "circle(0% at 100% 0%)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="w-8 h-8 rounded-full bg-zinc-800 mb-4" />
                    <div className="space-y-3">
                        <div className="h-4 w-3/4 rounded-full bg-zinc-800" />
                        <div className="h-3 w-full rounded-full bg-zinc-900" />
                        <div className="h-3 w-5/6 rounded-full bg-zinc-900" />
                    </div>
                </motion.div>

                {/* Interactive Toggle */}
                <div className="absolute top-6 right-6 z-20">
                    <motion.button
                        onClick={() => setIsDark(!isDark)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center text-white border border-white/10 shadow-lg cursor-pointer hover:bg-zinc-700"
                    >
                        <MoonStar size={18} className={cn("transition-transform", isDark ? "rotate-360" : "rotate-0")} />
                    </motion.button>
                </div>
             </div>
         </div>
    );
}

const features = [
  {
    id: "animations",
    title: "Animations",
    description: "Animations that feel natural, not mechanical. Powered by Framer Motion for buttery smooth performance.",
    color: "from-blue-500 to-cyan-400",
    visual: AnimationVisual
  },
  {
    id: "components",
    title: "Premium Components",
    description: "Don't settle for basic. Our components are crafted with obsessive attention to detail, featuring glassmorphism, gradients, and micro-interactions out of the box.",
    color: "from-violet-500 to-purple-400",
    visual: ComponentVisual
  },
  {
    id: "interactions",
    title: "Micro-Interactions",
    description: "The difference between good and great UI lies in the details. Delight your users with satisfying clicks, hovers, and focus states.",
    color: "from-orange-500 to-red-400",
    visual: InteractionVisual
  },
  {
     id: "theming",
     title: "Dark Mode Native",
     description: "Built for the night owls. Every component automatically adapts to dark mode with properly calibrated colors.",
     color: "from-emerald-500 to-green-400",
     visual: GlobalThemeVisual
  }
];

export default function FeatureSection() {
  return (
    <section className="bg-background relative pt-20 pb-32 px-4 md:px-8 overflow-hidden">
       {/* Ambient Background */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
       </div>

       <div className="max-w-[1400px] mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-24 md:mb-32">
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="inline-flex items-center gap-2 px-3 py-1 text-md font-medium text-black uppercase mb-4"
              >
                 <span>Core Capabilities</span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 ">
                  Everything you need.
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-neutral-400 pb-2.5">
                      Nothing you don't.
                  </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-xl mx-auto">
                  Built for modern applications that demand performance, aesthetics, and accessibility.
              </p>
          </div>

          {/* Features List (Zig-Zag Layout) */}
          <div className="flex flex-col gap-24 md:gap-40">
              {features.map((feature, index) => (
                  <FeatureRow 
                     key={feature.id} 
                     feature={feature} 
                     index={index} 
                  />
              ))}
          </div>
       </div>
    </section>
  )
}

function FeatureRow({ feature, index }: { feature: any, index: number }) {
    const isEven = index % 2 === 0;

    return (
        <div className={cn(
            "flex flex-col lg:flex-row items-center gap-12 lg:gap-24",
            !isEven && "lg:flex-row-reverse"
        )}>
            {/* Text Content */}
            <motion.div 
               initial={{ opacity: 0, x: isEven ? -50 : 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="flex-1 w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
            >
                 <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                     {feature.title}
                 </h3>
                 
                 <p className="text-lg text-muted-foreground leading-relaxed max-w-md text-pretty">
                     {feature.description}
                 </p>
            </motion.div>

            {/* Visual Card */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
               className="flex-1 w-full lg:w-1/2 flex items-center justify-center"
            >
                <feature.visual />
            </motion.div>
        </div>
    )
}
