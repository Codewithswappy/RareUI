"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Check, Terminal, Search, Code, Palette, Zap } from "lucide-react";

// Custom hook for mouse position (if needed for individual card glow, but user asked for "flow around cards border")
// We will use a simpler CSS approach for the flowing border using a moving gradient on the parent container's mask or border image.

export default function HowItWorks() {
  const [terminalStep, setTerminalStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTerminalStep((prev) => prev + 1);
    }, 4000); // Restart every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 px-4 md:px-8 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-wide text-primary uppercase"
          >
            How It Works
          </motion.h2>
          
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-3xl mx-auto leading-tight">
             {["Built", "for", "developers."].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
             ))}
             <br className="hidden md:block" />
             {["Designed", "for", "speed."].map((word, i) => (
                <motion.span
                  key={`line2-${i}`}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
             ))}
          </h3>

          <motion.p 
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Stop reinventing the wheel. From copy-paste to CLI installation, our workflow streamlines your UI development so you can focus on building features.
          </motion.p>
        </div>

        {/* Glowing Grid Container */}
        <div className="relative p-[1px] overflow-hidden bg-neutral-200 dark:bg-neutral-800">
            {/* Animated Gradient Border Layer */}
            <div className="absolute inset-0 z-0">
                 {/* Spinner 1 */}
                 <div className="absolute inset-[-50%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_290deg,black_360deg)] dark:bg-[conic-gradient(from_0deg,transparent_0_290deg,white_360deg)] opacity-40 mix-blend-color-dodge dark:mix-blend-normal" />
                 {/* Spinner 2 (Offset) */}
                 <div className="absolute inset-[-50%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_290deg,black_360deg)] dark:bg-[conic-gradient(from_0deg,transparent_0_290deg,white_360deg)] opacity-40 mix-blend-color-dodge dark:mix-blend-normal [animation-delay:-3s]" />
            </div>

             {/* Inner Grid Content */}
             <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.15
                        }
                    }
                }}
                className="relative z-10 bg-transparent grid grid-cols-1 md:grid-cols-3 gap-px overflow-hidden"
             >
              
              {/* Card 1: Browse Components */}
              <motion.div 
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="group relative bg-background dark:bg-background p-8 md:p-10 h-[320px] md:h-[350px] transition-colors duration-300"
              >
                 <div className="relative z-10 h-full flex flex-col justify-between">
                   <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <span className="text-xl font-bold text-foreground">1</span>
                        <div>
                            <h4 className="text-xl font-bold text-foreground mb-1">Browse Components</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed text-pretty max-w-xs">
                             Explore 100+ minimal components with live previews and variant controls.
                            </p>
                        </div>
                    </div>
                  </div>

                   {/* Visual: Component Gallery (Interactive) */}
                   <div className="mt-6 space-y-3 group-hover:translate-y-[-5px] transition-transform duration-500">
                      {/* Search Bar Mock */}
                      <div className="bg-muted/30 border border-border/50 rounded-lg p-2.5 flex items-center gap-2">
                           <Search className="w-3.5 h-3.5 text-muted-foreground" />
                           <div className="h-1.5 w-24 bg-muted-foreground/20 rounded-full" />
                      </div>
                      {/* Mock Gallery */}
                      <div className="grid grid-cols-2 gap-2.5">
                           <motion.div whileHover={{ scale: 1.02 }} className="h-14 rounded-md bg-primary/5 border border-primary/10 flex items-center justify-center">
                               <div className="h-5 w-10 bg-primary/20 rounded-sm" />
                           </motion.div>
                           <motion.div whileHover={{ scale: 1.02 }} className="h-14 rounded-md bg-muted/5 border border-border/50 flex items-center justify-center">
                                <div className="h-5 w-5 rounded-full bg-muted-foreground/20" />
                           </motion.div>
                           <motion.div whileHover={{ scale: 1.02 }} className="h-14 rounded-md bg-muted/5 border border-border/50 flex items-center justify-center">
                                <div className="h-1.5 w-12 bg-muted-foreground/20 rounded-full" />
                           </motion.div>
                           <motion.div whileHover={{ scale: 1.02 }} className="h-14 rounded-md bg-blue-500/5 border border-blue-500/10 flex items-center justify-center">
                                <div className="h-4 w-4 rounded-sm border md-blue-200 bg-blue-500/20" />
                           </motion.div>
                      </div>
                   </div>
                </div>
              </motion.div>

              {/* Card 2: Install RareUI */}
              <motion.div 
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="group relative bg-background dark:bg-background p-8 md:p-10 h-[320px] md:h-[350px] transition-colors duration-300"
              >
                 <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <span className="text-xl font-bold text-foreground">2</span>
                        <div>
                            <h4 className="text-xl font-bold text-foreground mb-1">Install RareUI</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed text-pretty max-w-xs">
                             Get started with a single command using our CLI.
                            </p>
                        </div>
                    </div>
                  </div>

                  {/* Visual: Animated Terminal (Interactive) */}
                  <div className="mt-8 group-hover:scale-105 transition-transform duration-500 cursor-default">
                     <div className="bg-muted dark:bg-neutral-950 border border-border/50 dark:border-white/10 rounded-lg p-4 font-mono text-[10px] shadow-lg min-h-[100px] flex flex-col">
                        <div className="flex gap-1.5 mb-3 opacity-50">
                             <div className="w-2 h-2 rounded-full bg-red-500" />
                             <div className="w-2 h-2 rounded-full bg-yellow-500" />
                             <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                        <div className="space-y-1.5 flex-1 font-mono" key={terminalStep}>
                            <div className="flex items-center gap-2 text-foreground/90 dark:text-white/90">
                                <span className="text-blue-500 dark:text-blue-400">~</span>
                                <span className="text-muted-foreground">$</span>
                                <motion.span 
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "auto", opacity: 1 }}
                                    transition={{ duration: 1, ease: "linear" }}
                                    className="text-green-600 dark:text-green-400 overflow-hidden whitespace-nowrap"
                                >
                                    npm rareui init
                                </motion.span>
                            </div>
                            <motion.div 
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.3 }}
                                className="text-foreground/60 dark:text-white/60 pl-4"
                            >
                                ⠋ Initializing...
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.8, duration: 0.3 }}
                                className="text-foreground/60 dark:text-white/60 pl-4"
                            >
                                ✓ Added 24 packages
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.5, duration: 0.3 }}
                                className="text-green-600 dark:text-green-400 pl-4 font-bold"
                            >
                                Success! Project ready.
                            </motion.div>
                         </div>
                     </div>
                  </div>
                </div>
              </motion.div>

               {/* Card 3: Iteration */}
               <motion.div 
                 variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                 }}
                 className="group relative bg-background dark:bg-background p-8 md:p-10 h-[320px] md:h-[350px] transition-colors duration-300"
               >
                 <div className="relative z-10 h-full flex flex-col justify-between">
                   <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <span className="text-xl font-bold text-foreground">3</span>
                        <div>
                            <h4 className="text-xl font-bold text-foreground mb-1">Add Components</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed text-pretty max-w-xs">
                             Copy code or install with <code className="bg-muted px-1 py-0.5 rounded">npx rareui add</code>.
                            </p>
                        </div>
                    </div>
                  </div>
                  
                   {/* Visual: CLI Add Animation (Interactive) */}
                   <div className="mt-8 flex flex-col gap-4 group-hover:-translate-y-1 transition-transform duration-300" key={terminalStep}>
                        {/* Terminal Command */}
                        <div className="bg-muted dark:bg-neutral-950 rounded-md p-3 font-mono text-[10px] shadow-sm border border-border/10">
                            <div className="flex items-center gap-2 text-foreground/90 dark:text-white/90">
                                <span className="text-blue-500 dark:text-blue-400">~</span>
                                <span className="text-muted-foreground">$</span>
                                <motion.span 
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "auto", opacity: 1 }}
                                    transition={{ duration: 1, ease: "linear" }}
                                    className="text-foreground dark:text-white overflow-hidden whitespace-nowrap"
                                >
                                    npx rareui add button
                                </motion.span>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                transition={{ delay: 1.2, duration: 0.2 }}
                                className="text-green-600 dark:text-green-400 mt-1 pl-4"
                            >
                                ✔ Button.tsx created
                            </motion.div>
                        </div>

                        {/* Resulting Component Card */}
                        <motion.div
                             initial={{ opacity: 0, scale: 0.8, y: 10 }}
                             animate={{ opacity: 1, scale: 1, y: 0 }}
                             transition={{ delay: 1.5, type: "spring", bounce: 0.5 }}
                             className="bg-background dark:bg-neutral-900 border-0.5 p-3 rounded-lg shadow-md flex items-center justify-between"
                        >
                             <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shadow-sm">
                                     <Zap className="w-4 h-4 fill-current" />
                                 </div>
                                 <div className="space-y-1">
                                     <div className="text-[11px] font-medium text-foreground">Button Component</div>
                                     <div className="text-[9px] text-muted-foreground">Ready to use</div>
                                 </div>
                             </div>
                             <div className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-[9px] font-medium rounded">
                                 Added
                             </div>
                        </motion.div>
                   </div>
                </div>
              </motion.div>

              {/* Card 4: Design */}
              <motion.div 
                 variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                 }}
                 className="group relative bg-background dark:bg-background p-8 md:p-10 h-[320px] md:h-[350px] transition-colors duration-300"
              >
                 <div className="relative z-10 h-full flex flex-col justify-between">
                   <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <span className="text-xl font-bold text-foreground">4</span>
                        <div>
                            <h4 className="text-xl font-bold text-foreground mb-1">Customize Easily</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed text-pretty max-w-xs">
                             Modify styles using Tailwind, themes, and built-in props.
                            </p>
                        </div>
                    </div>
                  </div>

                   {/* Visual: Live Code Customization (Interactive) */}
                   <div className="mt-8 flex flex-col gap-4 group-hover:-translate-y-1 transition-transform duration-300" key={terminalStep}>
                        {/* Live Code Block */}
                        <div className="bg-muted dark:bg-neutral-950 rounded-md p-3 font-mono text-[10px] shadow-sm border border-border/10 relative overflow-hidden flex flex-col gap-0.5">
                             <div className="text-blue-600 dark:text-blue-400">&lt;Button</div>
                             <div className="flex">
                                 <motion.span 
                                     initial={{ width: 0, opacity: 0 }}
                                     animate={{ width: "auto", opacity: 1 }}
                                     transition={{ duration: 0.6, ease: "linear", delay: 0.5 }}
                                     className="text-amber-600 dark:text-yellow-400 overflow-hidden whitespace-nowrap pl-4"
                                 >
                                      size="lg"
                                 </motion.span>
                             </div>
                             <div className="flex">
                                 <motion.span 
                                     initial={{ width: 0, opacity: 0 }}
                                     animate={{ width: "auto", opacity: 1 }}
                                     transition={{ duration: 0.8, ease: "linear", delay: 1.5 }}
                                     className="text-amber-600 dark:text-yellow-400 overflow-hidden whitespace-nowrap pl-4"
                                 >
                                      className="bg-blue-600"
                                 </motion.span>
                             </div>
                             <div className="text-blue-600 dark:text-blue-400">/&gt;</div>
                        </div>

                        {/* Live Preview */}
                        <div className="flex items-center justify-center p-6 min-h-[80px]">
                            <motion.button
                                initial={{ 
                                    scale: 1,
                                    backgroundColor: "hsl(var(--primary))",
                                }}
                                animate={{ 
                                    scale: [1, 1.2, 1.2],
                                    backgroundColor: ["hsl(var(--primary))", "hsl(var(--primary))", "#2563eb"], // blue-600
                                }}
                                transition={{ 
                                    duration: 2.5,
                                    times: [0, 0.4, 1] // 0->1.1s (scale), 1.1->END (color)? No.
                                    // Complex timing:
                                    // 0-0.5s: Wait
                                    // 0.5-1.1s: Scale (typing size="lg")
                                    // 1.1-1.5s: Wait
                                    // 1.5-2.3s: Color (typing class)
                                }}
                            >
                                {/* We need separate animate props for cleaner control or use keyframes with calculated times */}
                                {/* Let's use separate motion value changes or simpler sequence */}
                            </motion.button>
                             <motion.button
                                initial={{ 
                                    scale: 1, 
                                    backgroundColor: "hsl(var(--primary))",
                                    color: "hsl(var(--primary-foreground))"
                                }}
                                animate={{ 
                                    scale: 1.2,
                                    backgroundColor: "#2563eb",
                                    color: "#ffffff"
                                }}
                                transition={{
                                    scale: { delay: 1.1, duration: 0.2 },
                                    backgroundColor: { delay: 2.3, duration: 0.2 },
                                    color: { delay: 2.3, duration: 0.2 }
                                }}
                                className="px-4 py-2 rounded-md text-sm font-medium shadow-sm border border-transparent"
                            >
                                Button
                            </motion.button>
                        </div>
                   </div>
                </div>
              </motion.div>

             {/* Card 5: Delivery - Full Width Bottom */}
             <motion.div 
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="group relative bg-background dark:bg-background p-8 md:p-12 transition-colors duration-300 md:col-span-2"
             >
                 <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-4 max-w-md">
                         <div className="flex items-start gap-4">
                            <span className="text-xl font-bold text-foreground">5</span>
                            <div>
                                <h4 className="text-xl font-bold text-foreground mb-1">Ship Production-Ready UI</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                                    All components are fast, accessible, and optimized for modern apps.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Visual: Checklist Window (Interactive) */}
                    <div className="relative w-full max-w-md ml-auto group/checklist">
                        <motion.div 
                            whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                            className="bg-background border border-border/60 rounded-lg shadow-sm overflow-hidden transition-all duration-300"
                        >
                            <div className="flex items-center gap-2 px-4 py-2 border-b border-border/60 bg-muted/10">
                                <div className="flex gap-1.5 opacity-50">
                                    <div className="w-2 h-2 rounded-full bg-foreground" />
                                    <div className="w-2 h-2 rounded-full bg-foreground" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                     <div className="w-32 h-1.5 bg-border/40 rounded-full" />
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                                        <Check className="w-3.5 h-3.5 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold">All checks have passed</div>
                                        <div className="text-[10px] text-muted-foreground">7 successful checks</div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 pl-9">
                                    {['Accessibility Ready', 'Type Safe', 'SSR Optimized', 'Lightweight'].map((check, i) => (
                                        <motion.div 
                                            key={check}
                                            whileHover={{ x: 2, color: "var(--primary)" }}
                                            className="flex items-center gap-2 cursor-default transition-colors"
                                        >
                                            <Check className="w-3 h-3 text-green-500" />
                                            <span className="text-[11px] font-medium text-muted-foreground">{check}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                 </div>
              </motion.div>
             </motion.div>
        </div>
      </div>
    </section>
  );
}
