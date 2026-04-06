'use client';

import React, { useState, useRef } from 'react';
import {
  ArrowUpRight,
  Mail,
  Globe,
  Layers,
  MapPin,
  Feather,
  PenTool,
  Hash,
  MoveRight,
  Palette,
  Cpu,
  Ruler,
  Zap,
} from 'lucide-react';

const PremiumProfileCard = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Configuration for the tilt effect
  const friction = 1 / 32;
  const maxRotation = 10;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = -mouseY * friction;
    const rotateY = mouseX * friction;

    const clampedX = Math.max(-maxRotation, Math.min(maxRotation, rotateX));
    const clampedY = Math.max(-maxRotation, Math.min(maxRotation, rotateY));

    setRotation({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="perspective-1000 relative flex w-full items-center justify-center p-8">
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        @keyframes borderSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-border-spin {
            animation: borderSpin 4s linear infinite;
        }
      `}</style>

      {/* Ambient Atmospheric Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.05)_0%,transparent_60%)] blur-[80px] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_60%)]" />

      {/* Card Container */}
      <div
        className="group perspective-1000 relative z-10 h-[500px] w-[320px] cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={toggleFlip}
      >
        {/* Animated Glowing Border Circling the Card */}
        <div className="pointer-events-none absolute -inset-[3px] overflow-hidden rounded-[27px]">
          {/* Moving Gradient Border */}
          <div className="animate-border-spin absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(0,0,0,0.2)_360deg)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(255,255,255,0.6)_360deg)]" />
        </div>

        {/* Inner Mask for Border Effect */}
        <div className="absolute inset-[1px] z-0 rounded-[26px] bg-white dark:bg-[#121212]" />

        <div
          ref={cardRef}
          className="cubic-bezier(0.2, 0.6, 0.35, 1) preserve-3d relative z-10 h-full w-full transition-all duration-700"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y + (isFlipped ? 180 : 0)}deg) scale3d(1, 1, 1)`,
          }}
        >
          {/* --- FRONT FACE --- */}
          <div
            className={`absolute inset-0 h-full w-full overflow-hidden rounded-[24px] border border-black/5 bg-[#FDFCF8] shadow-xl transition-all duration-300 ease-out backface-hidden dark:border-white/10 dark:bg-[#0d0d0d] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] ${isFlipped ? 'pointer-events-none' : 'pointer-events-auto'}`}
          >
            {/* Texture */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.5] mix-blend-multiply brightness-110 contrast-125 filter dark:mix-blend-overlay" />

            {/* Subtle Sheen */}
            <div
              className="pointer-events-none absolute inset-0 z-50 opacity-0 mix-blend-soft-light transition-opacity duration-1000 group-hover:opacity-100"
              style={{
                background: `linear-gradient(${105 + rotation.y}deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)`,
              }}
            />

            {/* Content Layer */}
            <div className="absolute inset-0 flex h-full flex-col p-3">
              {/* Image Container */}
              <div className="relative w-full flex-[0_0_260px] overflow-hidden rounded-t-[20px] rounded-b-[4px] bg-[#F0F0F0] dark:bg-[#2a2a2a]">
                {/* Image - object-top ensures hair is visible */}
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Henry Jackson"
                  className="relative z-10 h-full w-full object-cover object-top brightness-[1.05] contrast-[1.1] grayscale transition-transform duration-700 ease-out"
                  style={{
                    transform: `scale(1.05) translateX(${rotation.y * 0.2}px) translateY(${rotation.x * 0.2}px)`,
                  }}
                />

                {/* Overlay Frame */}
                <div className="pointer-events-none absolute inset-0 z-20 rounded-t-[20px] border-[10px] border-[#FDFCF8] dark:border-[#0d0d0d]" />

                {/* Technical Graphic - Bottom Right */}
                <div
                  className="absolute right-6 bottom-6 z-30 text-white mix-blend-difference"
                  style={{
                    transform: `translateX(${rotation.y * 0.4}px) translateY(${rotation.x * 0.4}px)`,
                  }}
                >
                  <Ruler size={28} strokeWidth={1} />
                </div>
              </div>

              {/* Typography Section (Bottom) */}
              <div className="relative z-20 flex flex-1 flex-col justify-end px-4 pb-4">
                <div className="flex items-end justify-between">
                  <div className="space-y-1">
                    <div className="group/status mb-1 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-stone-800 transition-transform group-hover/status:scale-150 dark:bg-stone-200"></span>
                      <p className="text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase transition-colors group-hover/status:text-stone-800 dark:text-stone-400 dark:group-hover/status:text-stone-200">
                        Design Engineer
                      </p>
                    </div>

                    {/* Static Name */}
                    <h2 className="font-serif text-[2.5rem] leading-[0.9] tracking-tight text-[#1a1a1a] dark:text-white">
                      Henry <span className="font-light text-stone-400 italic">Jackson</span>
                    </h2>

                    <div className="overflow-hidden">
                      <p className="mt-1 flex translate-y-full items-center gap-1 text-xs font-light text-stone-400 transition-transform delay-75 duration-500 group-hover:translate-y-0">
                        <MapPin size={10} className="text-stone-800 dark:text-stone-200" /> Mumbai,
                        India
                      </p>
                    </div>
                  </div>

                  {/* Interactive Arrow Button */}
                  <div className="relative">
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-transparent text-stone-300 transition-all duration-300 group-hover:scale-110 group-hover:border-[#1a1a1a] group-hover:bg-[#1a1a1a] group-hover:text-white dark:border-stone-700 dark:text-stone-600 dark:group-hover:border-white dark:group-hover:bg-white dark:group-hover:text-black">
                      <MoveRight
                        size={18}
                        strokeWidth={1}
                        className="transition-transform duration-300 group-hover:-rotate-45"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- BACK FACE --- */}
          <div
            className={`absolute inset-0 h-full w-full overflow-hidden rounded-[24px] bg-[#0a0a0a] shadow-xl backface-hidden dark:bg-black dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] ${!isFlipped ? 'pointer-events-none' : 'pointer-events-auto'}`}
            style={{ transform: 'rotateY(180deg)' }}
          >
            {/* Technical Grid Texture */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.08]" />

            <div className="relative flex h-full w-full flex-col p-6 text-[#FDFCF8]">
              {/* Header */}
              <div className="group/header mb-8 flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <Layers
                    size={24}
                    className="mb-2 text-white transition-transform duration-300 group-hover/header:rotate-12"
                    strokeWidth={1}
                  />
                  <h3 className="font-serif text-base tracking-widest text-white transition-colors duration-300 group-hover/header:text-white/90">
                    STUDIO JACKSON
                  </h3>
                </div>
                <div className="text-right">
                  <p className="mb-1 text-[9px] tracking-widest text-white/40 uppercase">
                    Location
                  </p>
                  <p className="text-xs font-light text-white/90">Mumbai, MH</p>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex flex-1 flex-col gap-8">
                {/* Expertise Section */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Zap size={12} className="text-white/40" />
                    <p className="text-[9px] tracking-[0.2em] text-white/40 uppercase">Skills</p>
                  </div>
                  {/* Grid items now have improved hover areas and visual feedback */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <SkillItem>Product Design</SkillItem>
                    <SkillItem>Systems Eng.</SkillItem>
                    <SkillItem>Prototyping</SkillItem>
                    <SkillItem>CAD / 3D Mod.</SkillItem>
                  </div>
                </div>

                {/* Contact Section */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Hash size={12} className="text-white/40" />
                    <p className="text-[9px] tracking-[0.2em] text-white/40 uppercase">Contact</p>
                  </div>
                  <div className="space-y-1">
                    <ContactRow icon={<Mail />} text="henry@jackson.eng" />
                    <ContactRow icon={<Globe />} text="jackson.engineering" />
                    <ContactRow icon={<MapPin />} text="Bandra West, Mumbai" />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="group/footer mt-auto flex cursor-default items-end justify-between pt-4">
                <div className="flex flex-col">
                  {/* SVG Signature */}
                  <svg
                    width="80"
                    height="24"
                    viewBox="0 0 100 30"
                    fill="none"
                    stroke="currentColor"
                    className="mb-1 text-white opacity-80 transition-opacity duration-300 group-hover/footer:opacity-100"
                  >
                    <path
                      d="M5,15 C20,25 35,5 50,20 C65,10 80,25 95,15"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="font-mono text-[8px] tracking-widest text-white/30 uppercase transition-colors duration-300 group-hover/footer:text-white/50">
                    Lead Engineer
                  </span>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 opacity-50 transition-all duration-300 group-hover/footer:rotate-12 group-hover/footer:border-white/40 group-hover/footer:opacity-100">
                  <Feather size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactRow = ({ icon, text }: { icon: React.ReactElement; text: string }) => (
  <div className="group flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-all duration-300 hover:translate-x-1 hover:bg-white/5">
    <div className="text-white/60 transition-colors duration-300 group-hover:text-white">
      {React.cloneElement(icon as any, { size: 16, strokeWidth: 1.5 })}
    </div>
    <span className="truncate text-xs font-light text-white/90 transition-colors group-hover:text-white">
      {text}
    </span>
  </div>
);

const SkillItem = ({ children }: { children: React.ReactNode }) => (
  <div className="group/skill flex cursor-default items-center gap-2 p-1 text-white/80 transition-colors hover:text-white">
    <div className="h-1.5 w-1.5 rounded-full bg-white/40 transition-all duration-300 group-hover/skill:scale-150 group-hover/skill:bg-white" />
    <span className="text-xs font-light transition-transform duration-300 group-hover/skill:translate-x-1">
      {children}
    </span>
  </div>
);

export default PremiumProfileCard;
