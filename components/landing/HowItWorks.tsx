'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
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
  ZapIcon,
} from 'lucide-react';

/**
 * Custom Shadow: shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014]
 * Dark equivalent: dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040]
 */
const CARD_SHADOW =
  'shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014] dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040]';

// ─── Visual 1: Browse Components ───────────────────────────────────
function BrowseVisual() {
  const components = [
    { name: 'Button', icon: <MousePointer2 className="h-3 w-3" />, tag: 'New' },
    { name: 'Card', icon: <Layout className="h-3 w-3" />, tag: 'Ready' },
    { name: 'Input', icon: <Terminal className="h-3 w-3" />, tag: 'Beta' },
    { name: 'Bento', icon: <Layers className="h-3 w-3" />, tag: 'Clean' },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4">
      <div className="flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-100 px-3 py-2 dark:border-neutral-700/50 dark:bg-neutral-900">
        <Search className="h-3.5 w-3.5 text-neutral-400" />
        <div className="h-2 w-24 rounded-full bg-neutral-200 dark:bg-neutral-800" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {components.map((comp, i) => (
          <motion.div
            key={comp.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`rounded-lg border border-neutral-200 bg-white p-2.5 dark:border-neutral-700/50 dark:bg-neutral-900 ${CARD_SHADOW} flex flex-col gap-1.5`}
          >
            <div className="flex items-center justify-between">
              <div className="text-neutral-400">{comp.icon}</div>
              <span className="rounded border border-neutral-200 bg-neutral-100 px-1 font-mono text-[8px] tracking-tighter text-neutral-500 uppercase dark:border-neutral-800 dark:bg-neutral-900">
                {comp.tag}
              </span>
            </div>
            <div className="h-1.5 w-10 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Visual 2: Install CLI ──────────────────────────────────────────
function InstallVisual() {
  return (
    <div className="h-full w-full p-2 font-mono">
      <div
        className={`h-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900 ${CARD_SHADOW}`}
      >
        <div className="mb-4 flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] opacity-70" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] opacity-70" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F] opacity-70" />
        </div>
        <div className="space-y-2 text-[10px]">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">~</span>
            <span className="text-neutral-500">$</span>
            <span className="text-neutral-100">npm rareui init</span>
          </div>
          <div className="flex flex-col gap-1 pl-4 opacity-70">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-spin rounded-full border border-blue-500/50 border-t-blue-500" />
              <span className="text-blue-400">Fetching packages...</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-500">
              <ChevronRight className="h-2.5 w-2.5" />
              <span>Configuring tailwind.config.js</span>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex items-center gap-1.5 pl-4 text-emerald-500"
          >
            <CheckCircle2 className="h-3 w-3" />
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
    <div className="flex h-full w-full flex-col gap-4 p-2">
      <div
        className={`rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900 ${CARD_SHADOW}`}
      >
        <div className="mb-2 flex items-center gap-2 border-b border-neutral-200 pb-2 dark:border-neutral-800">
          <Code2 className="h-4 w-4 text-neutral-400" />
          <span className="font-mono text-[10px] text-neutral-500">components.json</span>
        </div>
        <div className="space-y-1.5 font-mono text-[9px]">
          <div className="flex items-center gap-2 pl-2">
            <div className="flex h-3 w-3 items-center justify-center rounded bg-blue-100 font-bold text-blue-500 dark:bg-neutral-800 dark:text-neutral-100">
              @
            </div>
            <div className="h-1.5 w-16 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-2 pl-2"
          >
            <div className="flex h-3 w-3 items-center justify-center rounded bg-indigo-100 font-bold text-indigo-500 dark:bg-neutral-800 dark:text-neutral-100">
              r
            </div>
            <div className="h-1.5 w-24 rounded-full border border-indigo-200 bg-indigo-100 dark:border-neutral-500 dark:bg-neutral-700" />
            <span className="font-bold tracking-tighter text-indigo-500 dark:text-white">
              Added
            </span>
          </motion.div>
        </div>
      </div>

      {/* File Tree Integration Visual */}
      <div className="flex flex-col gap-1 px-2">
        <div className="flex items-center gap-2 opacity-40">
          <Layers className="h-3 w-3 text-neutral-400" />
          <div className="h-1 w-12 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <div className="flex items-center gap-2 pl-4">
          <div className="h-3 w-0.5 bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-2.5 w-2.5 rounded border border-blue-500/40 bg-blue-500/20 dark:border-neutral-500 dark:bg-neutral-600" />
          <div className="h-1 w-20 rounded-full bg-neutral-200 dark:bg-neutral-800" />
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
    <div className="flex h-full w-full flex-col gap-4 p-1.5 font-sans lg:flex-row">
      {/* ── Figma-style Panel ── */}
      <div
        className={`flex w-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014] lg:w-[260px] lg:shrink-0 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040]`}
      >
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-3 py-2 dark:border-neutral-800">
          <div className="flex items-center gap-1.5">
            <div className="rounded border border-neutral-200 px-1.5 py-0.5 text-[8px] font-medium tracking-tight text-neutral-700 uppercase dark:border-neutral-700 dark:text-neutral-300">
              Appearance
            </div>
            <ChevronRight className="h-2.5 w-2.5 rotate-90 text-neutral-300 dark:text-neutral-600" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex h-4 w-4 items-center justify-center rounded transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800">
              <Fingerprint className="h-3 w-3 text-neutral-400" />
            </div>
            <span className="cursor-default text-[10px] text-neutral-300 dark:text-neutral-600">
              ×
            </span>
          </div>
        </div>

        {/* Property Rows */}
        <div className="flex flex-1 flex-col gap-3.5 px-3 py-3">
          {/* Radius with Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-medium tracking-wider text-neutral-400 uppercase">
                Radius
              </span>
              <span className="font-mono text-[8px] text-neutral-600 dark:text-neutral-300">
                {radius}px
              </span>
            </div>
            <div className="relative h-1 w-full rounded-full bg-neutral-100 dark:bg-neutral-800">
              <motion.div
                animate={{ width: `${radiusPct}%` }}
                className="h-full rounded-full bg-neutral-800 dark:bg-neutral-200"
              />
              <motion.div
                animate={{ left: `${radiusPct}%` }}
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-neutral-300 bg-white shadow-sm dark:border-neutral-600"
              />
            </div>
          </div>

          {/* Y Offset with Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-medium tracking-wider text-neutral-400 uppercase">
                Y Offset
              </span>
              <span className="font-mono text-[8px] text-neutral-600 dark:text-neutral-300">
                {shadowY}px
              </span>
            </div>
            <div className="relative h-1 w-full rounded-full bg-neutral-100 dark:bg-neutral-800">
              <motion.div
                animate={{ width: `${yPct}%` }}
                className="h-full rounded-full bg-neutral-800 dark:bg-neutral-200"
              />
              <motion.div
                animate={{ left: `${yPct}%` }}
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-neutral-300 bg-white shadow-sm dark:border-neutral-600"
              />
            </div>
          </div>

          {/* Blur with Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-medium tracking-wider text-neutral-400 uppercase">
                Blur
              </span>
              <span className="font-mono text-[8px] text-neutral-600 dark:text-neutral-300">
                {blur}px
              </span>
            </div>
            <div className="relative h-1 w-full rounded-full bg-neutral-100 dark:bg-neutral-800">
              <motion.div
                animate={{ width: `${blurPct}%` }}
                className="h-full rounded-full bg-neutral-800 dark:bg-neutral-200"
              />
              <motion.div
                animate={{ left: `${blurPct}%` }}
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-neutral-300 bg-white shadow-sm dark:border-neutral-600"
              />
            </div>
          </div>

          {/* Spread with Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-medium tracking-wider text-neutral-400 uppercase">
                Spread
              </span>
              <span className="font-mono text-[8px] text-neutral-600 dark:text-neutral-300">
                {spread}px
              </span>
            </div>
            <div className="relative h-1 w-full rounded-full bg-neutral-100 dark:bg-neutral-800">
              <motion.div
                animate={{ width: `${spreadPct}%` }}
                className="h-full rounded-full bg-neutral-800 dark:bg-neutral-200"
              />
              <motion.div
                animate={{ left: `${spreadPct}%` }}
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-neutral-300 bg-white shadow-sm dark:border-neutral-600"
              />
            </div>
          </div>

          {/* Color Section */}
          <div className="flex items-center justify-between px-0.5 pt-1">
            <span className="text-[8px] font-medium tracking-wider text-neutral-400 uppercase shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014] dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040]">
              Color
            </span>
            <div className="flex items-center gap-1.5 rounded-md border border-neutral-100 bg-neutral-50 px-2 py-0.5 shadow-sm dark:border-neutral-800 dark:bg-neutral-800">
              <div className="h-2.5 w-2.5 rounded-[2px] bg-neutral-900 dark:bg-neutral-100" />
              <span className="font-mono text-[7.5px] font-bold text-neutral-400 dark:text-neutral-500">
                #171717
              </span>
            </div>
          </div>
        </div>

        {/* Transition footer */}
        <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50/40 px-3 py-2 dark:border-neutral-800 dark:bg-neutral-950/40">
          <div className="flex items-center gap-1.5 opacity-60">
            <Activity className="h-3 w-3 text-neutral-400" />
            <span className="font-mono text-[7px] font-bold tracking-widest text-neutral-400 uppercase">
              Animation
            </span>
          </div>
          <span className="font-mono text-[7px] font-bold text-neutral-400">spring(180, 20)</span>
        </div>
      </div>

      {/* ── Live Preview ── */}
      <div
        className={`flex flex-1 flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014] dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040]`}
      >
        <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50/50 px-3 py-1.5 dark:border-neutral-800 dark:bg-neutral-950/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <div className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <div className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </div>
            <span className="font-mono text-[7.5px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
              Canvas
            </span>
          </div>
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-300 dark:bg-neutral-600" />
        </div>
        <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-white py-4 shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014] dark:bg-neutral-950 dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040]">
          {/* Subtle Grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgb(0 0 0 / 0.05) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />
          <div
            className="absolute inset-0 hidden dark:block"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgb(255 255 255 / 0.03) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* Premium "Project Access" Dialog */}
          <motion.div
            animate={{
              borderRadius: `${radius}px`,
              boxShadow: `0 ${shadowY}px ${blur}px ${spread}px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.05) `,
            }}
            transition={{ type: 'spring', stiffness: active ? 180 : 100, damping: 16 }}
            className="relative z-10 flex w-[185px] flex-col overflow-hidden border border-neutral-200 bg-white shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014] dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040]"
          >
            {/* Dialog Header */}
            <div className="px-3.5 pt-4 pb-3">
              <div className="mb-0.5 flex items-center justify-between">
                <h4 className="text-[10px] font-bold tracking-tight text-neutral-900 uppercase dark:text-white">
                  Settings
                </h4>
                <div className="flex h-3.5 w-3.5 items-center justify-center rounded-md border border-neutral-200 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800">
                  <span className="text-[8px] leading-none font-bold text-neutral-500">×</span>
                </div>
              </div>
              <p className="text-[7.5px] leading-tight text-neutral-400">
                Configuring project accessibility and team roles.
              </p>
            </div>

            {/* Member Section */}
            <div className="space-y-2.5 px-3.5 py-1">
              {[
                {
                  name: 'Sarah Connor',
                  role: 'Project Owner',
                  initial: 'SC',
                  delay: 0,
                  activeState: true,
                },
                {
                  name: 'John Doe',
                  role: 'Contributor',
                  initial: 'JD',
                  delay: 0.1,
                  activeState: false,
                },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <motion.div
                      animate={{ borderRadius: `${Math.max(radius / 2.5, 4)}px` }}
                      className="flex h-5.5 w-5.5 items-center justify-center border border-neutral-200/50 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800"
                    >
                      <span className="text-[6.5px] font-bold text-neutral-500 dark:text-neutral-400">
                        {m.initial}
                      </span>
                    </motion.div>
                    <div className="flex flex-col">
                      <span className="text-[8px] leading-none font-bold text-neutral-800 dark:text-neutral-100">
                        {m.name}
                      </span>
                      <span className="mt-0.5 text-[6.5px] font-medium text-neutral-400">
                        {m.role}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`flex h-2.5 w-5 items-center rounded-full px-0.5 transition-all duration-300 ${active && m.activeState ? 'justify-end bg-neutral-950 dark:bg-white' : 'justify-start bg-neutral-100 dark:bg-neutral-800'}`}
                  >
                    <motion.div
                      layout
                      className="h-1.5 w-1.5 rounded-full bg-white shadow-sm dark:bg-neutral-900"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Row */}
            <div className="mt-1.5 border-t border-neutral-100 bg-neutral-50/20 px-3.5 py-3 dark:border-neutral-800 dark:bg-neutral-950/20">
              <div className="mb-3 flex flex-col gap-1.5">
                <span className="text-[7px] font-bold tracking-widest text-neutral-400 uppercase">
                  Invite Link
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex h-5.5 flex-1 items-center rounded border border-neutral-100 bg-neutral-50 px-2 dark:border-neutral-800 dark:bg-neutral-950">
                    <span className="truncate font-mono text-[7px] text-neutral-500">
                      rareui.to/prj_k29a...
                    </span>
                  </div>
                  <div className="flex h-5.5 w-5.5 items-center justify-center rounded border border-neutral-100 bg-white shadow-sm transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                    <Code2 className="h-2.5 w-2.5 text-neutral-500" />
                  </div>
                </div>
              </div>

              {/* Primary Action Button */}
              <motion.div
                animate={{ borderRadius: `${Math.max(radius / 3.5, 3)}px` }}
                className="group flex h-7 w-full cursor-default items-center justify-center bg-neutral-950 shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014] transition-transform active:scale-[0.98] dark:bg-white dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040]"
              >
                <div className="flex items-center gap-1.5">
                  <Zap className="h-2.5 w-2.5 fill-current text-white transition-transform group-hover:scale-110 dark:text-neutral-900" />
                  <span className="text-[7px] font-bold tracking-[0.2em] text-white uppercase dark:text-neutral-900">
                    Deploy Now
                  </span>
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
    <div className="relative mt-2 flex h-full w-full flex-col gap-3 p-2">
      {/* Pipeline Header */}
      <div
        className={`flex items-center justify-between rounded-xl border border-neutral-100 bg-white p-2.5 shadow-sm shadow-black/10 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-white/10`}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 dark:bg-neutral-900">
            <ShieldCheck className="h-4 w-4 text-neutral-900 dark:text-neutral-50" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] leading-none font-medium text-neutral-800 dark:text-neutral-100">
              DEPLOYMENT CORE
            </span>
            <span className="mt-1 flex items-center gap-1 font-mono text-[8px] text-neutral-400">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-800" />
              v3.2.0.stable
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-3 w-1 rounded-full ${activeStep >= i ? 'bg-orange-500' : 'bg-neutral-100 dark:bg-neutral-800'}`}
            />
          ))}
        </div>
      </div>

      {/* Production Metrics */}
      <div className="grid grid-cols-2 gap-3">
        {/* Bundle Metric */}
        <div
          className={`flex h-24 flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-800 p-2 dark:bg-neutral-900 ${CARD_SHADOW}`}
        >
          <div className="flex items-start justify-between">
            <Box className="h-4 w-4 text-orange-400" />
            <span className="pt-0.5 text-right font-mono text-[7.5px] font-bold tracking-widest text-neutral-500">
              Asset.Bundle
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-xl font-medium tracking-tighter text-white">
              1.2
              <span className="pl-0.5 text-[10px] tracking-wide text-neutral-500 opacity-80">
                {' '}
                kb
              </span>
            </div>
            <div className="h-0.5 w-full overflow-hidden rounded-full bg-neutral-800">
              <motion.div animate={{ width: '24%' }} className="h-full bg-orange-500" />
            </div>
            <div className="font-mono text-[7px] text-neutral-600 uppercase">
              Gzip optimization active
            </div>
          </div>
        </div>

        {/* Speed Metric */}
        <div
          className={`flex h-24 flex-col justify-between rounded-lg border border-neutral-100 bg-white p-2 dark:border-neutral-800 dark:bg-neutral-900 ${CARD_SHADOW}`}
        >
          <div className="flex items-start justify-between text-neutral-400">
            <Activity className="h-4 w-4" />
            <span className="pt-0.5 font-mono text-[7.5px] font-bold tracking-widest">
              UI.Physics
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-xl font-bold tracking-tighter text-neutral-900 dark:text-white">
              120
              <span className="pl-0.5 text-[10px] tracking-wide text-neutral-500 opacity-80">
                fps
              </span>
            </div>
            <div className="flex h-6 items-end gap-0.5">
              {[1, 2, 1, 3, 2, 4, 3, 5, 2, 4].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [`${h * 15}%`, `${h * 22}%`, `${h * 15}%`] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                  className="flex-1 rounded-t-sm bg-orange-500/20 dark:bg-orange-500/30"
                />
              ))}
            </div>
            <div className="font-mono text-[7px] text-neutral-400 uppercase">
              Target: Zero Frame Latency
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-neutral-50 py-20 transition-colors duration-500 md:py-28 dark:bg-neutral-950">
      <div className="relative mx-auto w-[98%] max-w-[1600px] px-4">
        {/* Header */}
        <div className="mb-20 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            className="text-4xl font-medium tracking-tighter text-neutral-900 md:text-6xl dark:text-white"
          >
            Built for developers. <br /> Detailed by design.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-xl text-lg tracking-tight text-neutral-500 dark:text-neutral-400"
          >
            From deep component logic to production-ready deployment, our system handles the
            complexity so you can focus on building beautiful products.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Step 1: Browse */}
          <div
            className={`row-span-1 flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 ${CARD_SHADOW}`}
          >
            <div className="h-48 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
              <BrowseVisual />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Browse Components
              </h3>
              <p className="text-[14px] leading-relaxed text-neutral-500">
                Search through our 50+ animated components, each with unique themes and variants.
              </p>
            </div>
          </div>

          {/* Step 2: Install */}
          <div
            className={`row-span-1 flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 ${CARD_SHADOW}`}
          >
            <div className="h-48 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
              <InstallVisual />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Install CLI
              </h3>
              <p className="text-[14px] leading-relaxed text-neutral-500">
                Init your project with a single command. We handle the Tailwind and Framer config
                automatically.
              </p>
            </div>
          </div>

          {/* Step 3: Add */}
          <div
            className={`row-span-1 flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 ${CARD_SHADOW}`}
          >
            <div className="h-48 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
              <AddVisual />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Extract & Integrate
              </h3>
              <p className="text-[14px] leading-relaxed text-neutral-500">
                Add any component directly to your file tree. Full source code access, zero
                dependencies.
              </p>
            </div>
          </div>

          {/* Step 4: Customize — unique side-by-side layout */}
          <div
            className={`flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 md:col-span-1 lg:col-span-2 lg:flex-row dark:border-neutral-800 dark:bg-neutral-950 ${CARD_SHADOW}`}
          >
            <div className="flex shrink-0 flex-col items-start justify-center gap-3 lg:w-[250px]">
              <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Customize Everything
              </h3>
              <p className="text-[14px] leading-relaxed text-neutral-500">
                Full design control at your fingertips. Adjust shadows, radii, colors, and spring
                physics — watch your component update in real time.
              </p>
            </div>
            <div className="h-[530px] flex-1 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 lg:h-80 dark:border-neutral-800 dark:bg-neutral-950">
              <CustomizeVisual />
            </div>
          </div>

          {/* Step 5: Ship */}
          <div
            className={`col-span-1 flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 ${CARD_SHADOW}`}
          >
            <div className="h-48 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
              <ShipVisual />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Ship Production Ready
              </h3>
              <p className="text-[14px] leading-relaxed text-neutral-500">
                Optimized for Next.js, SEO-friendly, and accessible by default. Ready for the real
                world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
