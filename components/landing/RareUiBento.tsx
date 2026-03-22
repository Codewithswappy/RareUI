"use client";

import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

export type RareUiBentoProps = {
  className?: string;
  style?: CSSProperties;
};

function OrbitIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="3.2" fill="currentColor" />
      <path
        d="M5.1 9c1.85-3.9 6.9-5.58 11.37-3.8M18.9 15c-1.85 3.9-6.9 5.58-11.37 3.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M15 5.1c3.9 1.85 5.58 6.9 3.8 11.37M9 18.9c-3.9-1.85-5.58-6.9-3.8-11.37"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SparkIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 2.9 13.95 8.05 19.1 10 13.95 11.95 12 17.1 10.05 11.95 4.9 10 10.05 8.05 12 2.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LayersIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="m12 4 8 4-8 4-8-4 8-4Zm0 8 8 4-8 4-8-4 8-4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 text-neutral-500">
      <path
        d="M6 12h11M13 7l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FloatingBadge({
  icon,
  label,
  className,
  delay = 0,
}: {
  icon: ReactNode;
  label: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
      transition={{
        opacity: { duration: 0.45, delay },
        y: { duration: 6.2, repeat: Infinity, ease: "easeInOut", delay },
        scale: { duration: 0.45, delay },
      }}
      className={[
        "inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/80 px-4 py-3 text-[13px] font-medium tracking-[-0.02em] shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl",
        className ?? "",
      ].join(" ")}
    >
      <span className="text-[#2d6cff]">{icon}</span>
      <span>{label}</span>
    </motion.div>
  );
}

function ShimmerLine({
  width,
  delay = 0,
}: {
  width: string;
  delay?: number;
}) {
  return (
    <div
      className="relative h-2 overflow-hidden rounded-full bg-slate-200/80"
      style={{ width }}
    >
      <motion.div
        className="absolute inset-y-0 -left-1/3 w-1/3 rounded-full bg-white/90 blur-[1px]"
        animate={{ x: ["0%", "360%"] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay }}
      />
    </div>
  );
}

function ParticleField() {
  const particles = [
    { left: "18%", top: "18%", delay: 0 },
    { left: "28%", top: "70%", delay: 1.2 },
    { left: "58%", top: "26%", delay: 0.5 },
    { left: "82%", top: "22%", delay: 1.8 },
    { left: "76%", top: "74%", delay: 0.9 },
    { left: "46%", top: "82%", delay: 1.5 },
  ];

  return (
    <>
      {particles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="absolute size-1.5 rounded-full bg-[#2d6cff] shadow-[0_0_20px_rgba(45,108,255,0.45)]"
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [0, -18, -6, 0], opacity: [0.3, 1, 0.75, 0.3], scale: [0.9, 1.15, 1, 0.85] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: particle.delay }}
        />
      ))}
    </>
  );
}

function HeroVisual() {
  return (
    <div className="relative min-h-[340px]">
      <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.10)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(circle_at_center,black_32%,transparent_90%)]" />
      <ParticleField />

      <div className="absolute inset-y-4 left-0 hidden flex-col justify-around lg:flex">
        <FloatingBadge icon={<OrbitIcon />} label="Liquid" className="text-slate-500" />
        <FloatingBadge icon={<LayersIcon />} label="Neumorph" className="text-[#2d6cff]" delay={0.6} />
        <FloatingBadge icon={<SparkIcon />} label="Glass" className="text-[#ff8c4b]" delay={1.2} />
      </div>

      <div className="absolute inset-y-4 right-0 hidden flex-col justify-around lg:flex">
        <FloatingBadge icon={<OrbitIcon />} label="Motion" className="text-[#7a7cff]" delay={0.3} />
        <FloatingBadge icon={<SparkIcon />} label="Preview" className="text-slate-400" delay={0.9} />
        <FloatingBadge icon={<LayersIcon />} label="Sections" className="text-[#2d6cff]" delay={1.4} />
      </div>

      <motion.div
        className="absolute left-[18%] top-[14%] h-20 w-40 rounded-[2rem] border-r-2 border-t-2 border-[#2d6cff]/20"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[18%] left-[28%] h-20 w-52 rounded-[2rem] border-b-2 border-r-2 border-[#2d6cff]/20"
        animate={{ opacity: [1, 0.35, 1] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute right-[18%] top-[38%] h-24 w-32 rounded-[2rem] border-b-2 border-l-2 border-[#2d6cff]/20"
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative mx-auto mt-8 flex max-w-[260px] items-center justify-center lg:mt-0 lg:h-full">
        <motion.div
          className="absolute inset-4 rounded-[2.5rem] bg-[radial-gradient(circle_at_center,rgba(45,108,255,0.22),transparent_62%)] blur-2xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="relative grid aspect-[1/1.14] w-full place-items-center gap-2 overflow-hidden rounded-[2.25rem] border border-slate-200/90 bg-[linear-gradient(135deg,rgba(45,108,255,0.92),transparent_16%),linear-gradient(315deg,rgba(45,108,255,0.74),transparent_15%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(240,245,255,0.96))] px-6 py-8 shadow-[0_20px_50px_rgba(45,108,255,0.16),0_4px_14px_rgba(15,23,42,0.08)]"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-[-35%] bg-[conic-gradient(from_180deg,transparent,rgba(255,255,255,0.72),transparent_32%)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="relative grid size-[78px] place-items-center rounded-full bg-[conic-gradient(from_0deg,#2d6cff,#7ab1ff,#96a7ff,#2d6cff)] p-[7px] shadow-[0_12px_30px_rgba(45,108,255,0.28)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <div className="grid size-full place-items-center rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.98),rgba(231,240,255,0.98))] text-[#2d6cff] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
              <OrbitIcon className="size-6" />
            </div>
          </motion.div>

          <div className="relative text-3xl font-semibold tracking-[-0.05em] text-neutral-900">
            RareUI
          </div>
          <div className="relative text-sm tracking-[-0.02em] text-slate-500">
            Interactive component library
          </div>

          <div className="relative mt-2 flex gap-2">
            <span className="h-2 w-9 rounded-full bg-linear-to-r from-[#2d6cff] to-[#70a2ff]" />
            <span className="h-2 w-9 rounded-full bg-slate-300/80" />
            <span className="h-2 w-9 rounded-full bg-slate-300/80" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PrimitiveVisual() {
  return (
    <div className="relative min-h-[260px]">
      <div className="absolute inset-6 rounded-[1.75rem] bg-[radial-gradient(circle_at_center,rgba(45,108,255,0.08),transparent_34%),linear-gradient(90deg,transparent_0_16%,rgba(45,108,255,0.07)_16%_17%,transparent_17%_50%,rgba(45,108,255,0.07)_50%_51%,transparent_51%_84%,rgba(45,108,255,0.07)_84%_85%,transparent_85%),linear-gradient(180deg,transparent_0_28%,rgba(45,108,255,0.07)_28%_29%,transparent_29%_70%,rgba(45,108,255,0.07)_70%_71%,transparent_71%)]" />

      <motion.div
        className="absolute left-8 top-14 h-[230px] w-[230px] rounded-[1.75rem] border border-slate-200/90 bg-white/70 shadow-[0_20px_35px_rgba(15,23,42,0.08)]"
        animate={{ x: [0, -6, 0], rotate: [-7, -9, -7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-10 top-10 h-[230px] w-[230px] rounded-[1.75rem] border border-slate-200/90 bg-white/75 shadow-[0_20px_35px_rgba(15,23,42,0.08)]"
        animate={{ x: [0, 7, 0], rotate: [7, 9, 7] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      <motion.div
        className="relative mx-auto flex h-[250px] w-[250px] flex-col items-center justify-center gap-5 rounded-[1.9rem] border border-white/90 bg-white/90 p-6 shadow-[0_20px_45px_rgba(15,23,42,0.10)]"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="grid size-[130px] place-items-center rounded-[2rem] bg-[linear-gradient(145deg,#f8fbff,#dceaff)] text-[#2d6cff] shadow-[-14px_-14px_28px_rgba(255,255,255,0.92),16px_16px_30px_rgba(143,169,216,0.35)]"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
        >
          <OrbitIcon className="size-9" />
        </motion.div>

        <div className="grid w-full gap-2.5">
          <ShimmerLine width="38%" />
          <ShimmerLine width="84%" delay={0.25} />
          <ShimmerLine width="62%" delay={0.5} />
        </div>
      </motion.div>

      <motion.div
        className="absolute left-8 bottom-10 grid size-14 place-items-center rounded-2xl border border-white/80 bg-white/80 text-[#2d6cff] shadow-[0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        <LayersIcon />
      </motion.div>
      <motion.div
        className="absolute right-8 top-10 grid size-14 place-items-center rounded-2xl border border-white/80 bg-white/80 text-[#ff8c4b] shadow-[0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5.7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <SparkIcon />
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-8 grid size-14 place-items-center rounded-2xl border border-white/80 bg-white/80 text-[#2d6cff] shadow-[0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
      >
        <OrbitIcon />
      </motion.div>
    </div>
  );
}

function GalleryVisual() {
  return (
    <div className="relative min-h-[260px]">
      <div className="flex gap-2">
        <span className="size-2.5 rounded-full bg-slate-200" />
        <span className="size-2.5 rounded-full bg-slate-200" />
        <span className="size-2.5 rounded-full bg-slate-200" />
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        <span className="rounded-full border border-[#d9e5ff] bg-gradient-to-b from-white to-[#e8f1ff] px-4 py-2 text-[13px] font-medium tracking-[-0.02em] text-[#2d6cff] shadow-[0_8px_18px_rgba(45,108,255,0.1)]">
          Components
        </span>
        <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-[13px] tracking-[-0.02em] text-slate-500">
          Text
        </span>
        <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-[13px] tracking-[-0.02em] text-slate-500">
          Sections
        </span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-[1.15fr_0.95fr]">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-slate-200/90 bg-white/90 p-4 shadow-[0_14px_28px_rgba(15,23,42,0.06)] md:row-span-2">
          <motion.div
            className="absolute inset-[-35%] bg-[radial-gradient(circle_at_30%_30%,rgba(45,108,255,0.20),transparent_24%),radial-gradient(circle_at_60%_55%,rgba(122,124,255,0.18),transparent_28%),radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.92),transparent_24%)] blur-xl"
            animate={{ scale: [1, 1.08, 1], opacity: [0.82, 1, 0.82] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="relative mb-5 size-[88px] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.98),rgba(131,175,255,0.9)_42%,rgba(45,108,255,0.96))] shadow-[0_18px_34px_rgba(45,108,255,0.18)]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative grid gap-2.5">
            <ShimmerLine width="80%" />
            <ShimmerLine width="56%" delay={0.3} />
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200/90 bg-white/90 p-4 shadow-[0_14px_28px_rgba(15,23,42,0.05)]">
          <motion.div
            className="mb-5 h-11 w-[92px] rounded-[1.1rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(202,213,231,0.95),rgba(255,255,255,0.96))] bg-[length:200%_100%] shadow-[0_10px_22px_rgba(148,163,184,0.24)]"
            animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
          />
          <ShimmerLine width="64%" />
        </div>

        <div className="rounded-[1.5rem] border border-slate-200/90 bg-white/90 p-4 shadow-[0_14px_28px_rgba(15,23,42,0.05)]">
          <div className="mb-5 grid grid-cols-3 gap-[9px]">
            {Array.from({ length: 9 }).map((_, index) => (
              <motion.span
                key={index}
                className="size-2 rounded-full bg-[#2d6cff]/25"
                animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.1, 1] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (index % 3) * 0.2,
                }}
              />
            ))}
          </div>
          <ShimmerLine width="48%" delay={0.5} />
        </div>
      </div>

      <motion.div
        className="mt-4 flex items-center justify-between gap-4 rounded-full border border-[#c2d5ff] bg-[linear-gradient(90deg,rgba(45,108,255,0.18),rgba(255,255,255,0.92)_18%,rgba(255,255,255,0.96)_82%,rgba(45,108,255,0.12))] px-5 py-4 shadow-[0_12px_26px_rgba(45,108,255,0.12)] backdrop-blur-xl"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[15px] tracking-[-0.02em] text-slate-400">
          Search component, effect, or section...
        </span>
        <ArrowIcon />
      </motion.div>
    </div>
  );
}

export default function RareUiBento({
  className = "",
  style,
}: RareUiBentoProps) {
  return (
    <section
      className={[
        "w-[98%] max-w-[1600px] mx-auto mt-16 bg-[radial-gradient(circle_at_top_left,rgba(45,108,255,0.10),transparent_26%),radial-gradient(circle_at_90%_20%,rgba(122,124,255,0.08),transparent_24%),radial-gradient(circle_at_15%_100%,rgba(255,140,75,0.08),transparent_22%),linear-gradient(180deg,#f9faf8_0%,#f3f4ef_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_18px_60px_rgba(148,163,184,0.22)] sm:p-5 lg:p-10",
        className,
      ].join(" ")}
      style={style}
      aria-label="RareUI bento showcase"
    >
      <div className="mx-auto grid w-full grid-cols-1 gap-6 lg:grid-cols-12">
        <article className="relative overflow-hidden border-10 border-neutral-200 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.72),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(252,252,251,0.94))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_16px_36px_rgba(15,23,42,0.08),0_3px_10px_rgba(15,23,42,0.05)] lg:col-span-12 lg:grid lg:min-h-[420px] lg:grid-cols-[minmax(260px,0.98fr)_minmax(360px,1.12fr)] lg:items-center lg:gap-7 lg:p-[30px]">
          <div className="relative z-10 max-w-[460px]">
            <div className="mb-[22px] inline-flex items-center gap-3">
              <span className="h-[10px] w-5 rounded-full bg-linear-to-r from-[#2d6cff] to-[#70a2ff]" />
              <span className="text-[0.92rem] tracking-[-0.02em] text-slate-500">
                RareUI Component Library
              </span>
            </div>

            <h2 className="m-0 text-[clamp(2.15rem,3.2vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-neutral-900">
              Premium UI blocks with motion-first polish.
            </h2>
            <p className="mt-4 text-[clamp(1rem,1.2vw,1.16rem)] leading-[1.58] tracking-[-0.02em] text-slate-500">
              RareUI focuses on crafting refined surfaces, tactile depth, and buttery-smooth animated interactions. Built with Framer Motion and Tailwind CSS to instantly drop into your React applications and upgrade your project from standard to stunning.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <span className="rounded-full border border-[#d9e5ff] bg-white/85 px-3 py-2 text-[12px] font-medium tracking-[-0.02em] text-[#2d6cff] shadow-[0_8px_18px_rgba(45,108,255,0.08)]">
                UI Components
              </span>
              <span className="rounded-full border border-slate-200 bg-white/85 px-3 py-2 text-[12px] font-medium tracking-[-0.02em] text-slate-500 shadow-[0_8px_18px_rgba(15,23,42,0.04)]">
                Text Animations
              </span>
              <span className="rounded-full border border-slate-200 bg-white/85 px-3 py-2 text-[12px] font-medium tracking-[-0.02em] text-slate-500 shadow-[0_8px_18px_rgba(15,23,42,0.04)]">
                3D Elements
              </span>
              <span className="rounded-full border border-slate-200 bg-white/85 px-3 py-2 text-[12px] font-medium tracking-[-0.02em] text-slate-500 shadow-[0_8px_18px_rgba(15,23,42,0.04)]">
                CLI Ready
              </span>
            </div>
          </div>

          <HeroVisual />
        </article>

        <article className="relative flex flex-col justify-between  overflow-hidden border-10 border-neutral-200 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.72),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(252,252,251,0.94))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_16px_36px_rgba(15,23,42,0.08),0_3px_10px_rgba(15,23,42,0.05)] lg:col-span-6 lg:min-h-[430px] lg:p-[30px]">
          <PrimitiveVisual />
          <div className="relative z-10 mt-6">
            <h3 className="m-0 text-[clamp(1.55rem,2vw,2.25rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-neutral-900">
              Interactive 3D & Neumorphic Depth
            </h3>
            <p className="mt-4 text-[clamp(1rem,1.2vw,1.16rem)] leading-[1.58] tracking-[-0.02em] text-slate-500">
              Integrate soft 3D buttons, dynamic layout cards, and fluid 3D objects like the interactive Book-3D. RareUI components breathe life into your interfaces with layered physical styling and precise easing before real content even lands.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-medium tracking-[-0.02em] text-slate-500">
              <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm">Book-3D</span>
              <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm">Neumorphic Buttons</span>
              <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm">Liquid Metals</span>
              <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm">Perspective Cards</span>
            </div>
          </div>
        </article>

        <article className="relative overflow-hidden border-10 border-neutral-200 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.72),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(252,252,251,0.94))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_16px_36px_rgba(15,23,42,0.08),0_3px_10px_rgba(15,23,42,0.05)] lg:col-span-6 lg:min-h-[430px] lg:p-[30px]">
          <GalleryVisual />
          <div className="relative z-10 mt-6">
            <h3 className="m-0 text-[clamp(1.55rem,2vw,2.25rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-neutral-900">
              A Massive Library of Effects & Layouts
            </h3>
            <p className="mt-4 text-[clamp(1rem,1.2vw,1.16rem)] leading-[1.58] tracking-[-0.02em] text-slate-500">
              Browse through an expanding collection of complex page sections, stunning text hover effects, and full landing page templates. Whether you need a simple magnetic button or a full glass-morphic navigation—RareUI has it styled out-of-the-box.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-medium tracking-[-0.02em] text-slate-500">
              <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm">Landing Pages</span>
              <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm">Navigations</span>
              <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm">Bento Grids</span>
              <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm">Text Effects</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
