"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { 
  IconSearch, 
  IconTerminal, 
  IconCpu, 
  IconLayout, 
  IconMouse, 
  IconCode, 
  IconCircleCheck, 
  IconLayers,
  IconChevronRight,
  IconSettings,
  IconBolt,
  IconWorld,
  IconFingerprint,
  IconActivity,
  IconBox,
  IconShieldCheck,
  IconZap
} from "@tabler/icons-react";

/**
 * Custom Shadow: shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014]
 * Dark equivalent: dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040]
 */
const CARD_SHADOW = "shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014] dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040]";

// ─── Visual 1: Browse Components ───────────────────────────────────
function BrowseVisual() {
  const components = [
    { name: "Button", icon: <IconMouse className="w-3.5 h-3.5" />, tag: "New" },
    { name: "Card", icon: <IconLayout className="w-3.5 h-3.5" />, tag: "Ready" },
    { name: "Input", icon: <IconTerminal className="w-3.5 h-3.5" />, tag: "Beta" },
    { name: "Bento", icon: <IconLayers className="w-3.5 h-3.5" />, tag: "Clean" },
  ];

  return (
    <div className="w-full h-full p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3 px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-100 dark:border-neutral-700/50">
        <IconSearch className="w-4 h-4 text-neutral-400" />
        <div className="h-1.5 w-24 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {components.map((comp, i) => (
          <motion.div
            key={comp.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`p-3 bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/50 rounded-xl ${CARD_SHADOW} flex flex-col gap-2`}
          >
            <div className="flex items-center justify-between">
              <div className="text-neutral-400">{comp.icon}</div>
              <span className="text-[7px] font-mono font-bold px-1.5 py-0.5 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-100 dark:border-neutral-800 text-neutral-500 uppercase tracking-tighter">
                {comp.tag}
              </span>
            </div>
            <div className="h-1.5 w-12 bg-neutral-100 dark:bg-neutral-700 rounded-full" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Visual 2: Install CLI ──────────────────────────────────────────
function InstallVisual() {
  return (
    <div className="w-full h-full p-4 font-mono">
      <div className={`h-full bg-neutral-900 rounded-2xl p-5 border border-neutral-800 overflow-hidden ${CARD_SHADOW} flex flex-col gap-4`}>
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
           <div className="flex gap-2">
             <div className="w-2 h-2 rounded-full bg-neutral-700" />
             <div className="w-2 h-2 rounded-full bg-neutral-700" />
             <div className="w-2 h-2 rounded-full bg-neutral-700" />
           </div>
           <span className="text-[8px] text-neutral-600 font-bold uppercase tracking-widest">rareui.cli</span>
        </div>
        <div className="space-y-3 text-[11px]">
          <div className="flex items-center gap-2.5">
            <IconTerminal className="w-4 h-4 text-emerald-500" />
            <span className="text-neutral-500">$</span>
            <span className="text-white font-bold">npx rareui@latest init</span>
          </div>
          <div className="flex flex-col gap-2 pl-6.5 border-l border-neutral-800/50">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-neutral-400">Authenticating components...</span>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="flex items-center gap-3 text-neutral-600">
              <IconChevronRight className="w-3 h-3" />
              <span>Merging tailwind configs</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="flex items-center gap-3 text-emerald-500 font-bold">
              <IconCircleCheck className="w-4 h-4" />
              <span>Project Ready</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Visual 3: Add Component ───────────────────────────────────────
function AddVisual() {
  return (
    <div className="w-full h-full p-6 flex flex-col gap-5">
      <div className={`bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 ${CARD_SHADOW}`}>
        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <IconCode className="w-4 h-4 text-neutral-400" />
          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest font-black">components/rareui</span>
        </div>
        <div className="space-y-2 font-mono">
          <div className="flex items-center gap-3 px-2 py-1.5 rounded bg-neutral-50 dark:bg-neutral-800/50">
            <div className="w-6 h-6 rounded bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-500 text-[9px] font-black">BTN</div>
            <div className="h-1.5 w-20 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
          </div>
          <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }} className="flex items-center gap-3 px-2 py-1.5 rounded bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-800/20">
            <div className="w-6 h-6 rounded bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-500 text-[9px] font-black">LQD</div>
            <div className="h-1.5 w-28 bg-indigo-200/50 dark:bg-indigo-800/30 rounded-full" />
            <span className="text-[7px] font-black text-indigo-500 uppercase">ADD</span>
          </motion.div>
        </div>
      </div>
      <div className="flex items-center justify-center h-14 bg-neutral-50 dark:bg-neutral-900/50 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
        <div className="flex flex-col items-center gap-2">
          <div className="h-1.5 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
          <div className="h-1 w-10 bg-neutral-100 dark:bg-neutral-800 rounded-full opacity-50" />
        </div>
      </div>
    </div>
  );
}

// ─── Visual 4: Professional Inspector (REFINED) ───────────────────
function CustomizeVisual() {
  const [stiffness, setStiffness] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setStiffness((s) => (s === 100 ? 250 : 100));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full h-full bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 flex flex-col shadow-2xl relative`}>
      <div className="h-9 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900 px-4 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <span className="text-[10px] font-mono text-neutral-400 font-black uppercase tracking-widest">Physics.Inspector</span>
      </div>

      <div className="flex-1 grid grid-cols-5 h-full">
        <div className="col-span-2 bg-white dark:bg-neutral-900 p-5 font-mono text-[10px] border-r border-neutral-100 dark:border-neutral-800">
          <div className="space-y-2 pt-3">
            <div className="text-blue-600 dark:text-blue-400">const <span className="text-neutral-900 dark:text-white">curve</span> = {"{"}</div>
            <div className="pl-4 text-neutral-400">stiffness: <motion.span animate={{ color: stiffness === 100 ? "#2563eb" : "#d97706" }} className="font-bold underline decoration-blue-200">{stiffness}</motion.span>,</div>
            <div className="pl-4 text-neutral-400">damping: <span className="text-blue-600 font-bold">12</span></div>
            <div className="text-blue-600 dark:text-blue-400">{"}"};</div>
          </div>
          
          <div className="mt-12 pt-5 border-t border-neutral-50 dark:border-neutral-800">
             <div className="text-[8px] font-black text-neutral-300 dark:text-neutral-700 uppercase tracking-widest mb-3">Runtime.Stats</div>
             <div className="h-1.5 w-full bg-neutral-50 dark:bg-neutral-800 rounded-full overflow-hidden">
                <motion.div animate={{ width: stiffness === 100 ? "30%" : "80%" }} className="h-full bg-blue-500/20 rounded-full" />
             </div>
          </div>
        </div>

        <div className="col-span-3 bg-neutral-50/20 dark:bg-neutral-900/50 flex flex-col">
          <div className="flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-neutral-300/[0.08] dark:bg-grid-white/[0.02]" />
            <motion.div 
              animate={{ 
                scale: stiffness === 100 ? 1 : 1.15,
                borderRadius: stiffness === 100 ? "20px" : "60px",
                rotate: stiffness === 100 ? 0 : 5,
                boxShadow: stiffness === 100 
                  ? "0 4px 10px rgba(59, 130, 246, 0.1)" 
                  : "0 20px 40px rgba(59, 130, 246, 0.3)"
              }}
              transition={{ type: "spring", stiffness: stiffness, damping: 12 }}
              className="w-20 h-20 bg-blue-500 flex items-center justify-center relative z-10"
            >
              <IconBolt className="w-10 h-10 text-white fill-white" />
            </motion.div>
          </div>

          <div className="p-5 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 space-y-4 shadow-inner">
            {[
              { label: "Damping", val: "12.0", p: 40 },
              { label: "Stiffness", val: `${stiffness}.0`, p: (stiffness / 300) * 100 },
            ].map((s) => (
              <div key={s.label} className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-mono">
                  <span className="text-neutral-400 uppercase font-black tracking-widest">{s.label}</span>
                  <span className="text-blue-500 font-black">{s.val}</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-50 dark:bg-neutral-800 rounded-full overflow-hidden border border-neutral-100 dark:border-neutral-800">
                  <motion.div animate={{ width: `${s.p}%` }} className="h-full bg-blue-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Visual 5: Production Pipeline (REFINED) ─────────────────────
function ShipVisual() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full p-6 flex flex-col gap-5 relative">
      <div className={`p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between shadow-2xl`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center border border-indigo-100 dark:border-indigo-900">
            <IconShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-black text-neutral-900 dark:text-white uppercase tracking-tight">System Deployment</span>
            <div className="flex items-center gap-2.5 mt-2">
              <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                ready-v1.prod
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <IconWorld className="w-6 h-6 text-neutral-200 dark:text-neutral-800" strokeWidth={1} />
          <div className="flex gap-1.5">
             {[0, 1, 2].map(i => (
               <div key={i} className={`w-1 h-5 rounded-full ${activeStep >= i ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'bg-neutral-100 dark:bg-neutral-800'}`} />
             ))}
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-5">
        <div className={`p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between shadow-xl relative overflow-hidden`}>
          <IconBox className="absolute top-0 right-0 p-4 w-12 h-12 text-indigo-500 opacity-5" />
          <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest font-black">Bundle.Size</span>
          <div className="space-y-3">
            <div className="text-3xl font-black text-neutral-900 dark:text-white tracking-tighter">0.9<span className="text-xs text-neutral-300 pl-1">kb</span></div>
            <div className="h-1.5 w-full bg-neutral-50 dark:bg-neutral-800 rounded-full overflow-hidden border border-neutral-100 dark:border-neutral-800">
              <motion.div animate={{ width: "18%" }} className="h-full bg-indigo-500" />
            </div>
            <span className="text-[8px] font-black text-indigo-500 uppercase tracking-widest">Optimized Core</span>
          </div>
        </div>

        <div className={`p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between shadow-xl text-center`}>
          <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest font-black">Latency</span>
          <div className="space-y-3 pt-2">
            <div className="text-3xl font-black text-neutral-900 dark:text-white tracking-tighter">0.0<span className="text-xs text-neutral-300">ms</span></div>
            <div className="flex gap-1.5 h-10 items-end justify-center">
              {[2, 4, 3, 5, 4, 3, 2].map((h, i) => (
                <motion.div 
                  key={i} 
                  animate={{ height: [`${h*15}%`, `${h*10}%`, `${h*15}%`] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                  className="w-1.5 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-t-full border-b-2 border-indigo-500" 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const steps = [
    {
      title: "Browse Assets",
      desc: "Explore our evolving library of 50+ high-fidelity animated components.",
      visual: <BrowseVisual />,
      icon: <IconSearch />,
      colSpan: "col-span-1"
    },
    {
      title: "Clean Install",
      desc: "Initialize your project workspace with our professional-grade CLI.",
      visual: <InstallVisual />,
      icon: <IconTerminal />,
      colSpan: "col-span-1"
    },
    {
      title: "Smart Fetch",
      desc: "Automatically extract source code directly into your file system.",
      visual: <AddVisual />,
      icon: <IconCode />,
      colSpan: "col-span-1"
    },
    {
      title: "Atomic Control",
      desc: "Every property is exposed. Fine-tune physics and visual states via code or inspector.",
      visual: <CustomizeVisual />,
      icon: <IconSettings />,
      colSpan: "col-span-1 md:col-span-2"
    },
    {
      title: "Verified Ship",
      desc: "Production-ready components optimized for performance and accessibility.",
      visual: <ShipVisual />,
      icon: <IconZap />,
      colSpan: "col-span-1"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-neutral-950 transition-colors duration-700 relative overflow-hidden">
      <div className="w-[98%] max-w-[1500px] mx-auto relative px-6">
        {/* Header */}
        <div className="mb-24 space-y-6">
          <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center ${CARD_SHADOW}`}>
              <IconCpu className="w-5 h-5 text-neutral-400" strokeWidth={1.5} />
            </div>
            <span className="text-[12px] font-mono font-black tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
              Workflow.v1
            </span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} className="text-5xl md:text-7xl font-medium tracking-tighter text-neutral-900 dark:text-white leading-[0.95]">
            Built for developers. <br /> Detailed by design.
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-neutral-500 dark:text-neutral-400 max-w-2xl text-xl tracking-tight leading-relaxed">
            From deep component logic to production-ready deployment, our system handles 
            the high-fidelity complexity so you can focus on building beautiful products.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${step.colSpan} flex flex-col gap-8 p-1 bg-white dark:bg-neutral-900 rounded-[2.5rem] border border-neutral-200 dark:border-neutral-800 ${CARD_SHADOW} hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-500 group`}
            >
              {/* Visual Mockup - ON TOP */}
              <div className="min-h-[320px] h-full rounded-[2.2rem] bg-neutral-50/50 dark:bg-neutral-950/50 border border-neutral-100/50 dark:border-neutral-800/50 overflow-hidden relative group-hover:scale-[0.99] transition-transform duration-700">
                {step.visual}
              </div>

              {/* Text Content - BELOW */}
              <div className="px-10 pb-12 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-neutral-400 group-hover:text-blue-500 transition-colors duration-500">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white uppercase">
                    {step.title}
                  </h3>
                </div>
                <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed tracking-tight">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
