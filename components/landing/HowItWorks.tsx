"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Search, Zap, Check, ZapIcon } from "lucide-react";

export default function HowItWorks() {
  const [terminalStep, setTerminalStep] = useState(0);
  const [deploymentStep, setDeploymentStep] = useState(0);

  useEffect(() => {
    const termInterval = setInterval(() => {
      setTerminalStep((prev) => prev + 1);
    }, 4000);

    const deployInterval = setInterval(() => {
      setDeploymentStep((prev) => prev + 1);
    }, 1500);

    return () => {
      clearInterval(termInterval);
      clearInterval(deployInterval);
    };
  }, []);

  return (
    <section className="pb-0 relative overflow-hidden bg-neutral-50/50">
      <div className="w-[98%] max-w-[1600px] mx-auto relative overflow-hidden py-4 md:py-8">
        <div className="relative z-10 px-4">
          {/* Header */}
          <div className="text-left mb-24 space-y-8">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-neutral-900 mb-4">
              Built for developers. <br /> Designed for speed.
            </h2>
            <p className="text-neutral-500 max-w-xl text-lg tracking-tight">
              Stop reinventing the wheel. From copy-paste to CLI installation,
              our workflow streamlines your UI development so you can focus on
              building features.
            </p>
          </div>

          {/* Glowing Grid Container */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden"
          >
            {/* Inner Grid Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
              className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden p-4"
            >
              {/* Card 1: Browse Components */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group relative p-2 md:p-6 h-auto md:h-[350px] bg-[#FBFBFA] shadow-sm shadow-black/5 ring-1 ring-black/5 rounded-lg"
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <span className="text-xl font-bold text-foreground">
                        1
                      </span>
                      <div>
                        <h4 className="text-xl font-bold text-foreground mb-1">
                          Browse Components
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed text-pretty max-w-xs">
                          Explore components with live previews and variant
                          controls.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visual: Dynamic Component Search (Interactive) */}
                  <div className="mt-4 space-y-3 group-hover:translate-y-[-5px] transition-transform duration-500">
                    {/* Dynamic Search Bar */}
                    <div className="bg-white/50 dark:bg-black/20 shadow-sm shadow-black/5 ring-1 ring-black/5 dark:ring-white/5 border border-neutral-200/50 dark:border-white/5 rounded-md p-4 flex items-center gap-2">
                      <Search className="w-5 h-5 text-muted-foreground/70" />
                      <div className="h-4 w-32 relative overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={terminalStep % 3}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-[14px] text-muted-foreground font-medium flex items-center h-full"
                          >
                            {
                              ["Button", "Switch", "Profile Card"][
                                terminalStep % 3
                              ]
                            }
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Component Showcase Stage */}
                    <div className="h-28 rounded-md shadow-sm shadow-black/5 ring-1 ring-black/5 dark:ring-white/5 bg-muted/20 border border-border/30 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
                      <AnimatePresence mode="wait">
                        {/* State 0: Button */}
                        {terminalStep % 3 === 0 && (
                          <motion.div
                            key="button"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                          >
                            <button className="px-5 py-2 rounded-lg bg-linear-to-r from-neutral-800 to-neutral-900 text-white text-xs font-semibold shadow-lg shadow-neutral-500/20 active:scale-95 transition-transform">
                              Click me
                            </button>
                          </motion.div>
                        )}

                        {/* State 1: Switch */}
                        {terminalStep % 3 === 1 && (
                          <motion.div
                            key="switch"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className="flex items-center gap-3"
                          >
                            <div className="w-12 h-7 rounded-full bg-green-500 p-1 flex justify-end shadow-inner">
                              <motion.div
                                layoutId="switch-thumb"
                                className="w-5 h-5 rounded-full bg-white shadow-sm"
                              />
                            </div>
                          </motion.div>
                        )}

                        {/* State 2: Profile Card */}
                        {terminalStep % 3 === 2 && (
                          <motion.div
                            key="card"
                            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className="w-40 p-3 rounded-xl bg-background border border-border shadow-xl flex items-center gap-3"
                          >
                            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-neutral-500 to-neutral-200" />
                            <div className="space-y-1">
                              <div className="h-1.5 w-16 bg-muted-foreground/30 rounded-full" />
                              <div className="h-1.5 w-10 bg-muted-foreground/10 rounded-full" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Install RareUI */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group relative p-2 md:p-6 h-[320px] md:h-[350px] bg-[#FBFBFA] shadow-sm shadow-black/5 ring-1 ring-black/5 rounded-lg"
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <span className="text-xl font-bold text-foreground">
                        2
                      </span>
                      <div>
                        <h4 className="text-xl font-bold text-foreground mb-1">
                          Install RareUI
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed text-pretty max-w-xs">
                          Get started with a single command using our CLI.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visual: Animated Terminal (Interactive) */}
                  <div className="mt-8 group-hover:scale-[1.02] transition-transform duration-500 cursor-default">
                    <div className="bg-white/40 dark:bg-black/40  border border-neutral-200/80 dark:border-white/10 rounded-md p-5 font-mono text-[10px] shadow-md shadow-black/5 dark:shadow-white/5 ring-1 ring-black/5 dark:ring-white/5 min-h-[120px] flex flex-col">
                      <div className="flex gap-1.5 mb-3 opacity-50">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-600" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
                      </div>
                      <div
                        className="space-y-1.5 flex-1 font-mono"
                        key={terminalStep}
                      >
                        <div className="flex items-center gap-2 text-foreground/90 dark:text-white/90">
                          <span className="text-blue-500 dark:text-blue-400">
                            ~
                          </span>
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
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group relative p-2 md:p-6 h-[320px] md:h-[350px] bg-[#FBFBFA] shadow-sm shadow-black/5 ring-1 ring-black/5 rounded-lg"
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <span className="text-xl font-bold text-foreground">
                        3
                      </span>
                      <div>
                        <h4 className="text-xl font-bold text-foreground mb-1">
                          Add Components
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed text-pretty max-w-xs">
                          Copy code or install with{" "}
                          <code className="bg-muted px-1 py-0.5 rounded">
                            npx rareui add
                          </code>
                          .
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visual: CLI Add Animation (Interactive) */}
                  <div
                    className="mt-8 flex flex-col gap-4 group-hover:-translate-y-1 transition-transform duration-300"
                    key={terminalStep}
                  >
                    {/* Terminal Command */}
                    <div className="bg-white/40 dark:bg-black/40 rounded-md border border-neutral-200/80 dark:border-white/10 p-4 font-mono text-[10px] shadow-md shadow-black/5 dark:shadow-white/5 ring-1 ring-black/5 dark:ring-white/5">
                      <div className="flex items-center gap-2 text-foreground/90 dark:text-white/90">
                        <span className="text-blue-500 dark:text-blue-400">
                          ~
                        </span>
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
                      className="bg-white/60 dark:bg-white/3 border border-neutral-200/80 dark:border-white/10 p-4 rounded-md shadow-md shadow-black/5 dark:shadow-white/5 ring-1 ring-black/5 dark:ring-white/5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shadow-sm">
                          <ZapIcon className="w-4 h-4 fill-current" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-[11px] font-medium text-foreground">
                            Button Component
                          </div>
                          <div className="text-[9px] text-muted-foreground">
                            Ready to use
                          </div>
                        </div>
                      </div>
                      <div className="px-2 py-1 bg-black text-white dark:text-white text-[9px] font-medium rounded">
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
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group relative p-2 md:p-6 h-[320px] md:h-[350px] bg-[#FBFBFA] shadow-sm shadow-black/5 ring-1 ring-black/5 rounded-lg"
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <span className="text-xl font-bold text-foreground">
                        4
                      </span>
                      <div>
                        <h4 className="text-xl font-bold text-foreground mb-1">
                          Customize Easily
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed text-pretty max-w-xs">
                          Modify styles using Tailwind, themes, and built-in
                          props.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visual: Live Code Customization (Interactive) */}
                  <div className="mt-8 flex flex-col gap-4 group-hover:-translate-y-1 transition-transform duration-300">
                    {/* Live Code Block */}
                    <div className="bg-muted dark:bg-neutral-950 rounded-md p-3 font-mono text-[10px] shadow-sm shadow-black/5 dark:shadow-white/5 ring-1 ring-black/5 dark:ring-white/5 border border-neutral-200/80 dark:border-white/10 relative overflow-hidden flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                        <span>&lt;Card</span>
                        <span className="text-purple-600 dark:text-purple-400">
                          variant
                        </span>
                        <span>=</span>
                        <span className="relative">
                          <span className="text-amber-600 dark:text-yellow-400">
                            "
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={terminalStep % 3}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="inline-block"
                              >
                                {["classic", "glass", "neon"][terminalStep % 3]}
                              </motion.span>
                            </AnimatePresence>
                            "
                          </span>
                        </span>
                        <span>/&gt;</span>
                      </div>
                    </div>

                    {/* Live Preview */}
                    <div className="flex items-center justify-center p-4 min-h-[100px] relative">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={terminalStep % 3}
                          initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            rotateX: 0,
                            borderColor:
                              terminalStep % 3 === 2 ? "var(--primary)" : "rgba(0, 0, 0, 0)",
                            boxShadow:
                              terminalStep % 3 === 2
                                ? "0 0 20px -5px hsl(var(--primary))"
                                : "0 0 0px 0px rgba(0,0,0,0)",
                          }}
                          exit={{ opacity: 0, scale: 0.95, rotateX: 10 }}
                          transition={{ duration: 0.4 }}
                          className={`
                                        w-24 h-16 rounded-md flex items-center justify-center
                                        ${terminalStep % 3 === 0 ? "border-2 border-dashed border-muted-foreground/30 bg-muted/20" : ""}
                                        ${terminalStep % 3 === 1 ? "bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 shadow-sm" : ""}
                                        ${terminalStep % 3 === 2 ? "bg-background border border-primary text-primary" : ""}
                                    `}
                        >
                          <div
                            className={`
                                        w-8 h-8 rounded-full flex items-center justify-center
                                        ${terminalStep % 3 === 0 ? "bg-muted-foreground/20" : ""}
                                        ${terminalStep % 3 === 1 ? "bg-white/20" : ""}
                                        ${terminalStep % 3 === 2 ? "bg-primary/20" : ""}
                                    `}
                          >
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 5: Delivery - Full Width Bottom */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group relative p-2 md:p-6 transition-all duration-300 md:col-span-2 bg-[#FBFBFA] shadow-sm shadow-black/5 ring-1 ring-black/5 rounded-lg"
              >
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                  <div className="space-y-4 max-w-md">
                    <div className="flex items-start gap-4">
                      <span className="text-xl font-bold text-foreground">
                        5
                      </span>
                      <div>
                        <h4 className="text-xl font-bold text-foreground mb-1">
                          Ship Production-Ready UI
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                          All components are fast, accessible, and optimized for
                          modern apps.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visual: Deployment & Performance Dashboard (Interactive) */}
                  <div className="relative w-full max-w-md ml-auto group/checklist h-full flex items-center">
                    <motion.div
                      whileHover={{
                        y: -5,
                        boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)",
                      }}
                      className="w-full bg-background border border-border/60 rounded-xl shadow-lg overflow-hidden transition-colors duration-300"
                    >
                      {/* Browser Header */}
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-muted/30 backdrop-blur-md">
                        <div className="flex gap-1.5 opacity-80">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-sm" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-sm" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-sm" />
                        </div>
                        <div className="flex-1 flex justify-center ml-2">
                          <div className="px-3 py-1 bg-background/80 rounded-lg border border-border/40 flex items-center gap-2 max-w-[200px] w-full shadow-xs">
                            <Search className="w-2.5 h-2.5 text-muted-foreground/50" />
                            <div className="h-1 w-full bg-muted-foreground/10 rounded-full" />
                          </div>
                        </div>
                        <div className="w-8 h-2.5 flex items-center gap-0.5 opacity-20">
                          <div className="w-full h-full bg-foreground rounded-xs" />
                        </div>
                      </div>

                      {/* Dashboard Content */}
                      <div className="p-6 h-[180px] flex flex-col justify-center relative bg-linear-to-b from-background to-muted/20 overflow-hidden">
                        {/* Scanner Effect */}
                        <motion.div
                          animate={{ y: ["-100%", "200%"] }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent h-1/2 w-full pointer-events-none z-10"
                        />
                        <AnimatePresence mode="wait">
                          {/* State 0: Building */}
                          {deploymentStep % 4 === 0 && (
                            <motion.div
                              key="building"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="flex flex-col items-center gap-4 py-2 w-full"
                            >
                              <div className="relative w-14 h-14">
                                <div className="absolute inset-0 rounded-full border-4 border-muted/30" />
                                <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-amber-500/50 border-b-transparent border-l-transparent animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-8 h-8 bg-amber-500/10 rounded-full flex items-center justify-center">
                                    <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-1.5 text-center w-full max-w-[200px]">
                                <div className="text-sm font-semibold text-foreground">
                                  Building Project...
                                </div>
                                <div className="flex flex-col gap-1">
                                  <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ x: "-100%" }}
                                      animate={{ x: "100%" }}
                                      transition={{
                                        repeat: Infinity,
                                        duration: 0.8,
                                        ease: "linear",
                                      }}
                                      className="h-full w-1/2 bg-amber-500/50 rounded-full"
                                    />
                                  </div>
                                  <div className="text-[10px] text-muted-foreground font-mono">
                                    Compiling modules (142/405)
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* State 1: Optimizing */}
                          {deploymentStep % 4 === 1 && (
                            <motion.div
                              key="optimizing"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="flex flex-col items-center gap-5 w-full px-8 py-2"
                            >
                              <div className="w-full space-y-3">
                                <div className="flex justify-between items-end">
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse">
                                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    </div>
                                    <span className="text-sm font-medium">
                                      Optimizing Assets
                                    </span>
                                  </div>
                                  <span className="text-xs font-mono text-muted-foreground">
                                    85%
                                  </span>
                                </div>
                                <div className="h-2 w-full bg-muted/40 rounded-full overflow-hidden p-px">
                                  <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "85%" }}
                                    transition={{
                                      duration: 0.8,
                                      ease: "circOut",
                                    }}
                                    className="h-full bg-linear-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-3 w-full">
                                {[1, 2, 3].map((i) => (
                                  <div
                                    key={i}
                                    className="h-10 bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-black/5 dark:border-white/5 rounded-lg shadow-xs flex items-center justify-center px-1 gap-2"
                                  >
                                    <div className="w-2 h-1 rounded-full bg-neutral-500/20" />
                                    <div className="w-10 h-2 rounded-full bg-neutral-500/20" />
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}

                          {/* State 2: Deployed */}
                          {deploymentStep % 4 >= 2 && (
                            <motion.div
                              key="deployed"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                              className="w-full"
                            >
                              <div className="flex items-center justify-between mb-5 p-3 rounded-lg border border-green-500/20 bg-green-500/5 backdrop-blur-sm">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-bold text-foreground">
                                      Deployed
                                    </div>
                                    <div className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                      rareui.in
                                    </div>
                                  </div>
                                </div>
                                <button className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                                  Visit Site
                                </button>
                              </div>

                              {/* Lighthouse Scores */}
                              <div className="grid grid-cols-4 gap-3">
                                {[
                                  { label: "Performance", score: 100 },
                                  { label: "Accessibility", score: 100 },
                                  { label: "Best Practice", score: 100 },
                                  { label: "SEO", score: 100 },
                                ].map((item, i) => (
                                  <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex flex-col items-center gap-1.5"
                                  >
                                    <div className="relative w-10 h-10 flex items-center justify-center translate-z-0">
                                      <svg className="w-full h-full -rotate-90">
                                        <circle
                                          cx="20"
                                          cy="20"
                                          r="17"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="3"
                                          className="text-emerald-500/10"
                                        />
                                        <motion.circle
                                          cx="20"
                                          cy="20"
                                          r="17"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="3"
                                          strokeDasharray="100 100"
                                          initial={{ strokeDashoffset: 100 }}
                                          animate={{ strokeDashoffset: 0 }}
                                          transition={{
                                            duration: 1,
                                            delay: i * 0.1 + 0.5,
                                          }}
                                          className="text-emerald-500"
                                        />
                                      </svg>
                                      <span className="absolute text-[9px] font-black text-emerald-600 dark:text-emerald-400">
                                        {item.score}
                                      </span>
                                    </div>
                                    <div className="text-[7px] text-muted-foreground/80 font-bold uppercase tracking-tighter text-center leading-none">
                                      {item.label}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
