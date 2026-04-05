"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { 
  Search, 
  Terminal, 
  Cpu, 
  Layout, 
  MousePointer2, 
  Code2, 
  CheckCircle2, 
  Layers,
  ChevronRight,
  Settings2,
  Zap,
  Globe,
  Fingerprint,
  Activity,
  Box,
  Binary,
  ShieldCheck,
  ZapIcon
} from "lucide-react";

/**
 * Custom Shadow: shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014]
 * Dark equivalent: dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040]
 */
const CARD_SHADOW = "shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014] dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040]";

// ─── Visual 1: Browse Components ───────────────────────────────────
function BrowseVisual() {
  const components = [
    { name: "Button", icon: <MousePointer2 className="w-3 h-3" />, tag: "New" },
    { name: "Card", icon: <Layout className="w-3 h-3" />, tag: "Ready" },
    { name: "Input", icon: <Terminal className="w-3 h-3" />, tag: "Beta" },
    { name: "Bento", icon: <Layers className="w-3 h-3" />, tag: "Clean" },
  ];

  return (
    <div className="w-full h-full p-4 flex flex-col gap-3 ">
      <div className="flex items-center gap-2 px-3 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-md border border-neutral-200 dark:border-neutral-700/50">
        <Search className="w-3.5 h-3.5 text-neutral-400" />
        <div className="h-2 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {components.map((comp, i) => (
          <motion.div
            key={comp.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`p-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700/50 rounded-lg ${CARD_SHADOW} flex flex-col gap-1.5`}
          >
            <div className="flex items-center justify-between">
              <div className="text-neutral-400">{comp.icon}</div>
              <span className="text-[8px] font-mono px-1 bg-neutral-100 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase tracking-tighter">
                {comp.tag}
              </span>
            </div>
            <div className="h-1.5 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Visual 2: Install CLI ──────────────────────────────────────────
function InstallVisual() {
  return (
    <div className="w-full h-full p-2 font-mono">
      <div className={`h-full bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 border border-neutral-200 dark:border-neutral-800 overflow-hidden ${CARD_SHADOW}`}>
        <div className="flex gap-1.5 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-70" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-70" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-70" />
        </div>
        <div className="space-y-2 text-[10px]">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">~</span>
            <span className="text-neutral-500">$</span>
            <span className="text-neutral-100">npm rareui init</span>
          </div>
          <div className="flex flex-col gap-1 pl-4 opacity-70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full border border-blue-500/50 border-t-blue-500 animate-spin" />
              <span className="text-blue-400">Fetching packages...</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-500">
              <ChevronRight className="w-2.5 h-2.5" />
              <span>Configuring tailwind.config.js</span>
            </div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="flex items-center gap-1.5 text-emerald-500 pl-4">
            <CheckCircle2 className="w-3 h-3" />
            <span className="font-bold">Initialization Complete</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Visual 3: Add Component (Technical Accuracy Update) ───────────
function AddVisual() {
  return (
    <div className="w-full h-full p-2 flex flex-col gap-4">
      <div className={`bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 ${CARD_SHADOW}`}>
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-neutral-200 dark:border-neutral-800">
          <Code2 className="w-4 h-4 text-neutral-400" />
          <span className="text-[10px] font-mono text-neutral-500">components.json</span>
        </div>
        <div className="space-y-1.5 text-[9px] font-mono">
          <div className="flex items-center gap-2 pl-2">
            <div className="w-3 h-3 rounded bg-blue-100 dark:bg-neutral-800 flex items-center justify-center text-blue-500 dark:text-neutral-100 font-bold">@</div>
            <div className="h-1.5 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
          </div>
          <motion.div 
            initial={{ opacity: 0, x: -5 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 1 }} 
            className="flex items-center gap-2 pl-2"
          >
            <div className="w-3 h-3 rounded bg-indigo-100 dark:bg-neutral-800 flex items-center justify-center text-indigo-500 dark:text-neutral-100 font-bold">r</div>
            <div className="h-1.5 w-24 bg-indigo-100 dark:bg-neutral-700 border border-indigo-200 dark:border-neutral-500 rounded-full" />
            <span className="text-indigo-500 dark:text-white font-bold tracking-tighter">Added</span>
          </motion.div>
        </div>
      </div>
      
      {/* File Tree Integration Visual */}
      <div className="flex flex-col gap-1 px-2">
        <div className="flex items-center gap-2 opacity-40">
          <Layers className="w-3 h-3 text-neutral-400" />
          <div className="h-1 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
        </div>
        <div className="flex items-center gap-2 pl-4">
          <div className="w-0.5 h-3 bg-neutral-200 dark:bg-neutral-800" />
          <div className="w-2.5 h-2.5 rounded bg-blue-500/20 dark:bg-neutral-600 border border-blue-500/40 dark:border-neutral-500" />
          <div className="h-1 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ─── Visual 4: Figma-style Property Inspector ───────────────────────
function CustomizeVisual() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((a) => !a);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const radius = active ? 16 : 6;
  const shadowY = active ? 12 : 4;
  const blur = active ? 28 : 8;
  const spread = active ? 0 : -2;

  // Values for sliders (progress %)
  const radiusPct = (radius / 24) * 100;
  const yPct = (shadowY / 20) * 100;
  const blurPct = (blur / 40) * 100;
  const spreadPct = ((spread + 4) / 8) * 100;

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-4 p-1.5 font-sans">
      {/* ── Figma-style Panel ── */}
      <div className={`w-full lg:w-[260px] lg:shrink-0 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014] dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040]`}>
        {/* Section Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-1.5">
            <div className="px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 text-[8px] font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-tight">Appearance</div>
            <ChevronRight className="w-2.5 h-2.5 text-neutral-300 dark:text-neutral-600 rotate-90" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center justify-center transition-colors">
              <Fingerprint className="w-3 h-3 text-neutral-400" />
            </div>
            <span className="text-[10px] text-neutral-300 dark:text-neutral-600 cursor-default">×</span>
          </div>
        </div>

        {/* Property Rows */}
        <div className="flex-1 px-3 py-3 flex flex-col gap-3.5">
          {/* Radius with Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-medium text-neutral-400 uppercase tracking-wider">Radius</span>
              <span className="text-[8px] font-mono text-neutral-600 dark:text-neutral-300">{radius}px</span>
            </div>
            <div className="h-1 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full relative">
              <motion.div 
                animate={{ width: `${radiusPct}%` }}
                className="h-full bg-neutral-800 dark:bg-neutral-200 rounded-full"
              />
              <motion.div
                animate={{ left: `${radiusPct}%` }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border border-neutral-300 dark:border-neutral-600 shadow-sm"
              />
            </div>
          </div>

          {/* Y Offset with Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-medium text-neutral-400 uppercase tracking-wider">Y Offset</span>
              <span className="text-[8px] font-mono text-neutral-600 dark:text-neutral-300">{shadowY}px</span>
            </div>
            <div className="h-1 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full relative">
              <motion.div 
                animate={{ width: `${yPct}%` }}
                className="h-full bg-neutral-800 dark:bg-neutral-200 rounded-full"
              />
              <motion.div
                animate={{ left: `${yPct}%` }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border border-neutral-300 dark:border-neutral-600 shadow-sm"
              />
            </div>
          </div>

          {/* Blur with Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-medium text-neutral-400 uppercase tracking-wider">Blur</span>
              <span className="text-[8px] font-mono text-neutral-600 dark:text-neutral-300">{blur}px</span>
            </div>
            <div className="h-1 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full relative">
              <motion.div 
                animate={{ width: `${blurPct}%` }}
                className="h-full bg-neutral-800 dark:bg-neutral-200 rounded-full"
              />
              <motion.div
                animate={{ left: `${blurPct}%` }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border border-neutral-300 dark:border-neutral-600 shadow-sm"
              />
            </div>
          </div>

          {/* Spread with Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-medium text-neutral-400 uppercase tracking-wider">Spread</span>
              <span className="text-[8px] font-mono text-neutral-600 dark:text-neutral-300">{spread}px</span>
            </div>
            <div className="h-1 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full relative">
              <motion.div 
                animate={{ width: `${spreadPct}%` }}
                className="h-full bg-neutral-800 dark:bg-neutral-200 rounded-full"
              />
              <motion.div
                animate={{ left: `${spreadPct}%` }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border border-neutral-300 dark:border-neutral-600 shadow-sm"
              />
            </div>
          </div>

          {/* Color Section */}
          <div className="flex items-center justify-between pt-1 px-0.5">
            <span className="text-[8px] font-medium text-neutral-400 uppercase tracking-wider shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014] dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040]">Color</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-neutral-50 dark:bg-neutral-800 rounded-md border border-neutral-100 dark:border-neutral-800 shadow-sm">
              <div className="w-2.5 h-2.5 rounded-[2px] bg-neutral-900 dark:bg-neutral-100" />
              <span className="text-[7.5px] font-mono text-neutral-400 dark:text-neutral-500 font-bold">#171717</span>
            </div>
          </div>
        </div>

        {/* Transition footer */}
        <div className="px-3 py-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/40 dark:bg-neutral-950/40">
          <div className="flex items-center gap-1.5 opacity-60">
            <Activity className="w-3 h-3 text-neutral-400" />
            <span className="text-[7px] font-mono text-neutral-400 uppercase tracking-widest font-bold">Animation</span>
          </div>
          <span className="text-[7px] font-mono text-neutral-400 font-bold">spring(180, 20)</span>
        </div>
      </div>

      {/* ── Live Preview ── */}
      <div className={`flex-1  bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014] dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040]`}>
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </div>
            <span className="text-[7.5px] font-mono text-neutral-400 uppercase tracking-[0.2em] font-bold">Canvas</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600 animate-pulse" />
        </div>
        <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-white dark:bg-neutral-950 py-4 shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014] dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040]">
          {/* Subtle Grid */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgb(0 0 0 / 0.05) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          <div className="absolute inset-0 dark:block hidden" style={{ backgroundImage: 'radial-gradient(circle, rgb(255 255 255 / 0.03) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

          {/* Premium "Project Access" Dialog */}
          <motion.div
            animate={{
              borderRadius: `${radius}px`,
              boxShadow: `0 ${shadowY}px ${blur}px ${spread}px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.05) ` ,
              
            }}
            transition={{ type: "spring", stiffness: active ? 180 : 100, damping: 16 }}
            className="w-[185px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden relative z-10 flex flex-col shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014] dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040]"
          >
            {/* Dialog Header */}
            <div className="px-3.5 pt-4 pb-3 ">
              <div className="flex items-center justify-between mb-0.5 ">
                <h4 className="text-[10px] font-bold text-neutral-900 dark:text-white tracking-tight uppercase">Settings</h4>
                <div className="w-3.5 h-3.5 rounded-md border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                  <span className="text-[8px] text-neutral-500 font-bold leading-none">×</span>
                </div>
              </div>
              <p className="text-[7.5px] text-neutral-400 leading-tight">Configuring project accessibility and team roles.</p>
            </div>

            {/* Member Section */}
            <div className="px-3.5 py-1 space-y-2.5">
              {[
                { name: "Sarah Connor", role: "Project Owner", initial: "SC", delay: 0, activeState: true },
                { name: "John Doe", role: "Contributor", initial: "JD", delay: 0.1, activeState: false }
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <motion.div
                      animate={{ borderRadius: `${Math.max(radius / 2.5, 4)}px` }}
                      className="w-5.5 h-5.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700 flex items-center justify-center"
                    >
                      <span className="text-[6.5px] font-bold text-neutral-500 dark:text-neutral-400">{m.initial}</span>
                    </motion.div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold text-neutral-800 dark:text-neutral-100 leading-none">{m.name}</span>
                      <span className="text-[6.5px] text-neutral-400 font-medium mt-0.5">{m.role}</span>
                    </div>
                  </div>
                  <div className={`w-5 h-2.5 rounded-full flex items-center px-0.5 transition-all duration-300 ${active && m.activeState ? 'bg-neutral-950 dark:bg-white justify-end' : 'bg-neutral-100 dark:bg-neutral-800 justify-start'}`}>
                    <motion.div layout className="w-1.5 h-1.5 rounded-full bg-white dark:bg-neutral-900 shadow-sm" />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Row */}
            <div className="px-3.5 py-3 mt-1.5 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/20 dark:bg-neutral-950/20">
              <div className="flex flex-col gap-1.5 mb-3">
                <span className="text-[7px] font-bold text-neutral-400 uppercase tracking-widest">Invite Link</span>
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 h-5.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 rounded px-2 flex items-center">
                    <span className="text-[7px] text-neutral-500 font-mono truncate">rareui.to/prj_k29a...</span>
                  </div>
                  <div className="w-5.5 h-5.5 rounded border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-sm">
                    <Code2 className="w-2.5 h-2.5 text-neutral-500" />
                  </div>
                </div>
              </div>

              {/* Primary Action Button */}
              <motion.div
                animate={{ borderRadius: `${Math.max(radius / 3.5, 3)}px` }}
                className="w-full h-7 bg-neutral-950 dark:bg-white flex items-center justify-center active:scale-[0.98] transition-transform shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014] dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040] cursor-default group"
              >
                <div className="flex items-center gap-1.5">
                  <Zap className="w-2.5 h-2.5 text-white dark:text-neutral-900 fill-current group-hover:scale-110 transition-transform" />
                  <span className="text-[7px] font-bold text-white dark:text-neutral-900 uppercase tracking-[0.2em]">Deploy Now</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Visual 5: Production Pipeline (UPGRADED) ──────────────────────
function ShipVisual() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full p-2 flex flex-col gap-3 relative mt-2">
      {/* Pipeline Header */}
      <div className={`p-2.5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800 flex items-center justify-between shadow-sm shadow-black/10 dark:shadow-white/10 `}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-neutral-900 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-neutral-900 dark:text-neutral-50" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-neutral-800 dark:text-neutral-100 leading-none">DEPLOYMENT CORE</span>
            <span className="text-[8px] font-mono text-neutral-400 mt-1 flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 animate-pulse" />
              v3.2.0.stable
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`w-1 h-3 rounded-full ${activeStep >= i ? 'bg-orange-500' : 'bg-neutral-100 dark:bg-neutral-800'}`} />
          ))}
        </div>
      </div>

      {/* Production Metrics */}
      <div className="grid grid-cols-2 gap-3">
        {/* Bundle Metric */}
        <div className={`p-2 bg-neutral-800 dark:bg-neutral-900 rounded-xl border border-neutral-800 flex flex-col justify-between h-24 ${CARD_SHADOW}`}>
          <div className="flex justify-between items-start">
            <Box className="w-4 h-4 text-orange-400" />
            <span className="text-[7.5px] font-mono text-neutral-500 tracking-widest font-bold text-right pt-0.5">Asset.Bundle</span>
          </div>
          <div className="space-y-1">
            <div className="text-xl font-medium text-white tracking-tighter">1.2<span className="text-[10px] text-neutral-500 opacity-80 pl-0.5 tracking-wide"> kb</span></div>
            <div className="h-0.5 w-full bg-neutral-800 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: "24%" }}
                className="h-full bg-orange-500"
              />
            </div>
            <div className="text-[7px] font-mono text-neutral-600 uppercase">Gzip optimization active</div>
          </div>
        </div>

        {/* Speed Metric */}
        <div className={`p-2 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-100 dark:border-neutral-800 flex flex-col justify-between h-24 ${CARD_SHADOW}`}>
          <div className="flex justify-between items-start text-neutral-400">
            <Activity className="w-4 h-4" />
            <span className="text-[7.5px] font-mono tracking-widest font-bold pt-0.5">UI.Physics</span>
          </div>
          <div className="space-y-1">
            <div className="text-xl font-bold text-neutral-900 dark:text-white tracking-tighter">120<span className="text-[10px] text-neutral-500 opacity-80 pl-0.5 tracking-wide">fps</span></div>
            <div className="flex gap-0.5 h-6 items-end">
              {[1, 2, 1, 3, 2, 4, 3, 5, 2, 4].map((h, i) => (
                <motion.div 
                  key={i} 
                  animate={{ height: [`${h*15}%`, `${h*22}%`, `${h*15}%`] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                  className="flex-1 bg-orange-500/20 dark:bg-orange-500/30 rounded-t-sm" 
                />
              ))}
            </div>
            <div className="text-[7px] font-mono text-neutral-400 uppercase">Target: Zero Frame Latency</div>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500 relative overflow-hidden">
      <div className="w-[98%] max-w-[1600px] mx-auto relative px-4">
        {/* Header */}
        <div className="mb-20 space-y-4">
         
          <motion.h2 initial={{ opacity: 0, y: 16, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} className="text-4xl md:text-6xl font-medium tracking-tighter text-neutral-900 dark:text-white">Built for developers. <br /> Detailed by design.</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-neutral-500 dark:text-neutral-400 max-w-xl text-lg tracking-tight">From deep component logic to production-ready deployment, our system handles the complexity so you can focus on building beautiful products.</motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Step 1: Browse */}
          <div className={`row-span-1 p-6 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col gap-6 ${CARD_SHADOW}`}>
            <div className="h-48 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <BrowseVisual />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">Browse Components</h3>
              <p className="text-[14px] text-neutral-500 leading-relaxed">Search through our 50+ animated components, each with unique themes and variants.</p>
            </div>
          </div>

          {/* Step 2: Install */}
          <div className={`row-span-1 p-6 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col gap-6 ${CARD_SHADOW}`}>
            <div className="h-48 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <InstallVisual />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">Install CLI</h3>
              <p className="text-[14px] text-neutral-500 leading-relaxed">Init your project with a single command. We handle the Tailwind and Framer config automatically.</p>
            </div>
          </div>

          {/* Step 3: Add */}
          <div className={`row-span-1 p-6 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col gap-6 ${CARD_SHADOW}`}>
            <div className="h-48 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <AddVisual />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">Extract & Integrate</h3>
              <p className="text-[14px] text-neutral-500 leading-relaxed">Add any component directly to your file tree. Full source code access, zero dependencies.</p>
            </div>
          </div>

          {/* Step 4: Customize — unique side-by-side layout */}
          <div className={`md:col-span-1 lg:col-span-2 p-6 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col lg:flex-row gap-4 ${CARD_SHADOW}`}>
            <div className="lg:w-[250px] shrink-0 flex items-start gap-3 justify-center flex-col">
              <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Customize Everything</h3>
              <p className="text-[14px] text-neutral-500 leading-relaxed">Full design control at your fingertips. Adjust shadows, radii, colors, and spring physics — watch your component update in real time.</p>
            </div>
            <div className="flex-1 h-[530px] lg:h-80 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <CustomizeVisual />
            </div>
          </div>

          {/* Step 5: Ship */}
          <div className={`col-span-1 p-6 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col gap-6 ${CARD_SHADOW}`}>
            <div className="h-48 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <ShipVisual />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">Ship Production Ready</h3>
              <p className="text-[14px] text-neutral-500 leading-relaxed">Optimized for Next.js, SEO-friendly, and accessible by default. Ready for the real world.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
