"use client";

import React, { useState, useRef } from 'react';
import { ArrowUpRight, Mail, Globe, Layers, MapPin, Feather, PenTool, Hash, MoveRight, Palette, Cpu, Ruler, Zap } from 'lucide-react';

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
    <div className="relative w-full flex items-center justify-center p-8 perspective-1000">
      
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,0,0,0.05)_0%,transparent_60%)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_60%)] rounded-full blur-[80px] pointer-events-none" />
      
      {/* Card Container */}
      <div 
        className="relative w-[320px] h-[500px] cursor-pointer group perspective-1000 z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={toggleFlip}
      >
        {/* Animated Glowing Border Circling the Card */}
        <div className="absolute -inset-[3px] rounded-[27px] overflow-hidden pointer-events-none">
            {/* Moving Gradient Border */}
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(0,0,0,0.2)_360deg)] dark:bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(255,255,255,0.6)_360deg)] animate-border-spin opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* Inner Mask for Border Effect */}
        <div className="absolute inset-[1px] bg-white dark:bg-[#121212] rounded-[26px] z-0" />

        <div 
          ref={cardRef}
          className="w-full h-full transition-all duration-700 cubic-bezier(0.2, 0.6, 0.35, 1) preserve-3d relative z-10"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y + (isFlipped ? 180 : 0)}deg) scale3d(1, 1, 1)`,
          }}
        >
          {/* --- FRONT FACE --- */}
          <div className={`absolute inset-0 w-full h-full bg-[#FDFCF8] dark:bg-[#0d0d0d] rounded-[24px] backface-hidden shadow-xl dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 ease-out border border-black/5 dark:border-white/10 ${isFlipped ? 'pointer-events-none' : 'pointer-events-auto'}`}>
            
            {/* Texture */}
            <div className="absolute inset-0 opacity-[0.5] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply dark:mix-blend-overlay pointer-events-none z-10 filter contrast-125 brightness-110" />

            {/* Subtle Sheen */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-50 mix-blend-soft-light"
              style={{
                background: `linear-gradient(${105 + rotation.y}deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)`
              }}
            />

            {/* Content Layer */}
            <div className="absolute inset-0 flex flex-col h-full p-3">
               
               {/* Image Container */}
               <div className="flex-[0_0_260px] w-full relative overflow-hidden bg-[#F0F0F0] dark:bg-[#2a2a2a] rounded-t-[20px] rounded-b-[4px]">
                  {/* Image - object-top ensures hair is visible */}
                  <img 
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Henry Jackson"
                    className="w-full h-full object-cover object-top relative z-10 grayscale contrast-[1.1] brightness-[1.05] transition-transform duration-700 ease-out"
                    style={{ 
                        transform: `scale(1.05) translateX(${rotation.y * 0.2}px) translateY(${rotation.x * 0.2}px)`,
                    }}
                  />
                  
                  {/* Overlay Frame */}
                  <div className="absolute inset-0 border-[10px] border-[#FDFCF8] dark:border-[#0d0d0d] z-20 pointer-events-none rounded-t-[20px]" />
                  
                  {/* Technical Graphic - Bottom Right */}
                  <div 
                    className="absolute bottom-6 right-6 z-30 mix-blend-difference text-white"
                    style={{ transform: `translateX(${rotation.y * 0.4}px) translateY(${rotation.x * 0.4}px)` }}
                  >
                     <Ruler size={28} strokeWidth={1} />
                  </div>
               </div>

               {/* Typography Section (Bottom) */}
               <div className="flex-1 flex flex-col justify-end pb-4 px-4 relative z-20">
                  <div className="flex justify-between items-end">
                      <div className="space-y-1">
                         <div className="flex items-center gap-2 mb-1 group/status">
                             <span className="w-1.5 h-1.5 rounded-full bg-stone-800 dark:bg-stone-200 animate-pulse group-hover/status:scale-150 transition-transform"></span>
                             <p className="text-[10px] text-stone-500 dark:text-stone-400 font-bold uppercase tracking-[0.2em] group-hover/status:text-stone-800 dark:group-hover/status:text-stone-200 transition-colors">Design Engineer</p>
                         </div>
                         
                         {/* Static Name */}
                         <h2 className="text-[2.5rem] font-serif text-[#1a1a1a] dark:text-white leading-[0.9] tracking-tight">
                           Henry <span className="italic font-light text-stone-400">Jackson</span>
                         </h2>

                         <div className="overflow-hidden">
                            <p className="text-xs text-stone-400 font-light mt-1 flex items-center gap-1 translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                <MapPin size={10} className="text-stone-800 dark:text-stone-200" /> Mumbai, India
                            </p>
                         </div>
                      </div>
                      
                      {/* Interactive Arrow Button */}
                      <div className="relative">
                          <div className="w-10 h-10 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-300 dark:text-stone-600 bg-transparent relative z-10 transition-all duration-300 group-hover:bg-[#1a1a1a] dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black group-hover:border-[#1a1a1a] dark:group-hover:border-white group-hover:scale-110">
                             <MoveRight size={18} strokeWidth={1} className="group-hover:-rotate-45 transition-transform duration-300" />
                          </div>
                      </div>
                  </div>
               </div>
            </div>
          </div>

          {/* --- BACK FACE --- */}
          <div 
            className={`absolute inset-0 w-full h-full bg-[#0a0a0a] dark:bg-black rounded-[24px] backface-hidden shadow-xl dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden ${!isFlipped ? 'pointer-events-none' : 'pointer-events-auto'}`}
            style={{ transform: 'rotateY(180deg)' }} 
          >
             {/* Technical Grid Texture */}
             <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
             
             <div className="relative w-full h-full p-6 flex flex-col text-[#FDFCF8]">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-8 pb-4 border-b border-white/10 group/header">
                    <div>
                        <Layers size={24} className="text-white mb-2 transition-transform duration-300 group-hover/header:rotate-12" strokeWidth={1} />
                        <h3 className="text-base font-serif tracking-widest text-white transition-colors duration-300 group-hover/header:text-white/90">STUDIO JACKSON</h3>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Location</p>
                        <p className="text-xs font-light text-white/90">Mumbai, MH</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col gap-8">
                   
                   {/* Expertise Section */}
                   <div>
                       <div className="flex items-center gap-2 mb-3">
                           <Zap size={12} className="text-white/40" />
                           <p className="text-[9px] text-white/40 uppercase tracking-[0.2em]">Skills</p>
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
                       <div className="flex items-center gap-2 mb-3">
                           <Hash size={12} className="text-white/40" />
                           <p className="text-[9px] text-white/40 uppercase tracking-[0.2em]">Contact</p>
                       </div>
                       <div className="space-y-1">
                           <ContactRow icon={<Mail />} text="henry@jackson.eng" />
                           <ContactRow icon={<Globe />} text="jackson.engineering" />
                           <ContactRow icon={<MapPin />} text="Bandra West, Mumbai" />
                       </div>
                   </div>
                </div>

                {/* Footer */}
                <div className="pt-4 mt-auto flex justify-between items-end group/footer cursor-default">
                   <div className="flex flex-col">
                       {/* SVG Signature */}
                       <svg width="80" height="24" viewBox="0 0 100 30" fill="none" stroke="currentColor" className="text-white opacity-80 mb-1 transition-opacity duration-300 group-hover/footer:opacity-100">
                           <path d="M5,15 C20,25 35,5 50,20 C65,10 80,25 95,15" strokeWidth="1" strokeLinecap="round" />
                       </svg>
                       <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest transition-colors duration-300 group-hover/footer:text-white/50">Lead Engineer</span>
                   </div>
                   
                   <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-50 transition-all duration-300 group-hover/footer:opacity-100 group-hover/footer:border-white/40 group-hover/footer:rotate-12">
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

const ContactRow = ({ icon, text }: { icon: React.ReactElement, text: string }) => (
    <div className="flex items-center gap-3 group cursor-pointer p-2 rounded-lg transition-all duration-300 hover:bg-white/5 hover:translate-x-1">
        <div className="text-white/60 group-hover:text-white transition-colors duration-300">
            {React.cloneElement(icon as any, { size: 16, strokeWidth: 1.5 })}
        </div>
        <span className="text-xs text-white/90 font-light group-hover:text-white transition-colors truncate">{text}</span>
    </div>
);

const SkillItem = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-default group/skill p-1">
        <div className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover/skill:bg-white group-hover/skill:scale-150 transition-all duration-300" />
        <span className="text-xs font-light group-hover/skill:translate-x-1 transition-transform duration-300">{children}</span>
    </div>
);

export default PremiumProfileCard;