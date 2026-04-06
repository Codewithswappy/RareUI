'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface PageData {
  title?: string;
  content?: string;
  image?: string;
  caption?: string;
  quote?: string;
  author?: string;
}

interface Book3DProps {
  src?: string;
  title?: string;
  subtitle?: string;
  width?: number;
  height?: number;
  className?: string;
  pages?: PageData[];
}

export function Book3D({
  src,
  title,
  subtitle,
  width = 230,
  height = 350,
  className,
  pages = [
    {
      title: 'Welcome to RareUI',
      content:
        'A premium collection of beautifully crafted, animated React components. Built with Motion and Tailwind CSS for modern web applications.',
    },
    {
      image:
        'https://images.unsplash.com/photo-1589561253898-768105ca91a8?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: 'Beautiful Design',
    },
    {
      title: 'Premium Components',
      content:
        'From glass-morphic buttons to 3D cards, each component is designed with attention to detail. Self-contained, easy to install via CLI, and ready to use.',
    },
    {
      quote:
        'Great design is not just what looks good. It also needs to perform, convert, and amaze.',
      author: 'RareUI Philosophy',
    },
    {
      title: 'Getting Started',
      content:
        'Install any component with a single command: npx rareui@latest add [component-name]. No configuration needed, just beautiful components ready to go.',
    },
    {
      title: 'Build Something Rare',
      content:
        'Join thousands of developers creating stunning interfaces with RareUI. Your next project deserves components that stand out.',
    },
  ],
}: Book3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [pageIndex, setPageIndex] = useState(0); // 0 means just cover open, no pages flipped

  // Reset pages when book closes
  useEffect(() => {
    if (!isHovered) {
      const timer = setTimeout(() => {
        setPageIndex(0);
      }, 300); // Small delay to allow cover to start closing
      return () => clearTimeout(timer);
    }
  }, [isHovered]);

  const [isFlipping, setIsFlipping] = useState(false);

  const handlePageClick = (index: number) => {
    if (!isHovered || isFlipping) return;
    if (pageIndex === index) {
      setIsFlipping(true);
      setPageIndex((prev) => prev + 1);
      setTimeout(() => setIsFlipping(false), 300); // Debounce
    }
  };

  const handleBackClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (isFlipping) return;
    setIsFlipping(true);
    setPageIndex(index);
    setTimeout(() => setIsFlipping(false), 300);
  };

  return (
    <div
      className={cn('group relative z-10 cursor-pointer', className, isHovered && 'z-50')}
      style={{
        perspective: '1500px',
        paddingLeft: '150px', // Extra space for the rotated cover on the left
        marginLeft: '-150px', // Pull back to maintain visual position
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="preserve-3d relative transition-all duration-700 ease-out"
        style={{
          width,
          height,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: isHovered ? -35 : 0,
          rotateX: isHovered ? 15 : 0,
          z: isHovered ? 60 : 0,
        }}
      >
        {/* Back Cover - Static Base */}
        <div
          className="absolute inset-0 rounded-l-sm rounded-r-md bg-[#2f2f2f] shadow-2xl"
          style={{
            transform: 'translateZ(-20px)',
            boxShadow: '20px 20px 50px rgba(0,0,0,0.5)',
          }}
        />

        {/* PAGES STACK */}
        {Array.from({ length: pages.length })
          .map((_, i) => pages.length - 1 - i)
          .map((index) => {
            const isFlipped = index < pageIndex;

            // Dynamic z-index optimization
            let activeZIndex = 0;
            if (isFlipped) {
              activeZIndex = index + 1;
            } else {
              activeZIndex = 20 - index; // Higher base to safely sit above back cover but below front cover
            }

            return (
              <motion.div
                key={index}
                className="transform-style-3d absolute inset-y-[2px] right-[2px] left-[4px] origin-left cursor-pointer rounded-l-sm rounded-r-md border border-neutral-100/50 bg-[#fffcf5]"
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex: activeZIndex,
                }}
                animate={{
                  rotateY: isFlipped ? -178 : 0,
                  z: isFlipped ? 0 : pages.length - 1 - index,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.23, 1, 0.32, 1],
                  delay: isFlipped ? 0 : index * 0.05,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isFlipped) {
                    handleBackClick(e, index);
                  } else {
                    handlePageClick(index);
                  }
                }}
              >
                {/* FRONT FACE (Right side content) */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-white p-6 text-center backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10" />
                  {/* Deeper right edge shadow for book crease */}
                  <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-12 bg-linear-to-l from-black/20 via-black/5 to-transparent" />
                  {/* Left edge for binding */}
                  <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-2 bg-linear-to-r from-black/10 to-transparent" />

                  <div className="relative z-10 font-serif text-neutral-800 select-none">
                    {pages[index].image && (
                      <div className="mb-4 overflow-hidden rounded-sm border border-neutral-200 shadow-inner">
                        <img
                          src={pages[index].image}
                          alt="Page visual"
                          className="h-32 w-full object-cover grayscale transition-all hover:grayscale-0"
                        />
                      </div>
                    )}
                    {pages[index].title && (
                      <h3 className="mb-2 font-sans text-lg text-[10px] font-bold tracking-widest uppercase">
                        {pages[index].title}
                      </h3>
                    )}
                    {pages[index].content && (
                      <p className="text-[10px] leading-relaxed text-neutral-600">
                        {pages[index].content}
                      </p>
                    )}
                    {pages[index].quote && (
                      <blockquote className="border-l-2 border-neutral-300 pl-3 text-sm text-neutral-600 italic">
                        "{pages[index].quote}"
                        <footer className="mt-2 font-sans text-[9px] text-neutral-400 not-italic">
                          - {pages[index].author}
                        </footer>
                      </blockquote>
                    )}
                    <span className="absolute right-4 bottom-2 text-[8px] text-neutral-400">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* BACK FACE (Left side content) */}
                <div
                  className="absolute inset-0 flex items-center justify-center bg-[#f8f5f0] backface-hidden"
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10" />
                  {/* Left edge shadow (becomes visible when flipped) */}
                  <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-12 bg-linear-to-r from-black/20 via-black/5 to-transparent" />
                  <div className="rotate-90 transform font-sans text-[9px] tracking-widest text-neutral-400 uppercase opacity-30 select-none">
                    Notes
                  </div>
                </div>
              </motion.div>
            );
          })}

        {/* Front Cover */}
        <motion.div
          className={cn(
            'absolute inset-0 origin-left',
            isHovered ? 'pointer-events-none z-0' : 'pointer-events-auto z-50'
          )}
          style={{
            transformStyle: 'preserve-3d',
            transform: !isHovered ? 'translateZ(10px)' : undefined, // Ensure it starts in front
          }}
          initial={{
            rotateY: 0,
            z: 10,
          }}
          animate={{
            rotateY: isHovered ? -180 : 0,
            z: isHovered ? 0 : 10, // Push far forward when closed to be in front of all pages
          }}
          transition={{
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
            delay: isHovered ? 0 : 0.5, // Delay closing so pages flip back first
          }}
        >
          {/* Outer Cover */}
          <div
            className={cn(
              'absolute inset-0 overflow-hidden rounded-l-sm rounded-r-md border-l border-white/10 shadow-md backface-hidden',
              src
                ? 'bg-neutral-900'
                : 'bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-900'
            )}
            style={{
              backgroundImage: src ? `url(${src})` : undefined,
              backgroundSize: src ? 'cover' : undefined,
              backgroundPosition: src ? 'center' : undefined,
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Conditional overlays based on mode */}
            {src ? (
              <>
                {/* Image mode overlays */}
                <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40" />
              </>
            ) : (
              <>
                {/* Branding mode pattern */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '32px 32px',
                  }}
                />
              </>
            )}

            {/* Decorative border frame */}
            <div className="pointer-events-none absolute inset-4 rounded-sm border border-white/20" />
            <div className="pointer-events-none absolute inset-6 rounded-sm border border-white/10" />

            {/* Corner ornaments */}
            <div className="absolute top-8 left-8 h-8 w-8 border-t-2 border-l-2 border-white/30" />
            <div className="absolute top-8 right-8 h-8 w-8 border-t-2 border-r-2 border-white/30" />
            <div className="absolute bottom-8 left-8 h-8 w-8 border-b-2 border-l-2 border-white/30" />
            <div className="absolute right-8 bottom-8 h-8 w-8 border-r-2 border-b-2 border-white/30" />

            {/* Content - Custom or Default */}
            {src || title || subtitle ? (
              // Custom cover with user's image/title/subtitle
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-white select-none">
                {title && (
                  <div className="mb-4 text-center">
                    <div className="mx-auto mb-6 h-px w-16 bg-white/40" />
                    <h3 className="mb-2 font-serif text-3xl font-bold tracking-wider drop-shadow-lg">
                      {title}
                    </h3>
                    <div className="mx-auto mt-4 h-px w-16 bg-white/40" />
                  </div>
                )}
                {subtitle && (
                  <p className="mt-2 text-sm font-light tracking-widest uppercase opacity-90">
                    {subtitle}
                  </p>
                )}
              </div>
            ) : (
              // Default RareUI branding cover
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pr-10 pl-10 text-white select-none">
                {/* Logo/Brand */}
                <div className="mb-8 text-center">
                  <div className="mx-auto h-px w-20 bg-linear-to-r from-transparent via-white/60 to-transparent pt-16" />
                  <h1 className="mb-2 bg-linear-to-r from-white via-white to-white/80 bg-clip-text pt-1 font-serif text-4xl font-bold tracking-wider text-transparent drop-shadow-lg">
                    RareUI
                  </h1>
                  <div className="mx-auto mt-4 h-px w-20 bg-linear-to-r from-transparent via-white/60 to-transparent" />
                </div>

                {/* Tagline */}
                <p className="mb-8 text-xs font-light tracking-[0.3em] uppercase opacity-80">
                  Premium Component Library
                </p>

                {/* Description */}
                <div className="max-w-[180px] space-y-3 text-center text-[9px] leading-relaxed font-light opacity-70">
                  <p>Beautifully crafted React components with stunning animations</p>
                  <p className="text-white/50">•</p>
                  <p>Built with Motion & Tailwind CSS</p>
                  <p className="text-white/50">•</p>
                  <p className="pb-8.5">Easy installation via CLI</p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-2">
                    <div className="h-px w-8 bg-white/30" />
                    <div className="h-1 w-1 rounded-full bg-white/50" />
                    <div className="h-px w-8 bg-white/30" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Inner Cover */}
          <div
            className="absolute inset-0 overflow-hidden rounded-l-md rounded-r-sm border-r border-neutral-200 bg-[#f5f1e8] backface-hidden"
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="flex h-full w-full flex-col justify-end p-8">
              <p className="text-center font-serif text-xs text-neutral-500 italic select-none">
                RareUi
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Shadow */}
      <div
        className={cn(
          'absolute right-4 bottom-0 left-4 h-10 rounded-[100%] bg-black/40 blur-xl transition-all duration-500',
          isHovered ? 'scale-110 opacity-80' : 'opacity-40'
        )}
        style={{
          transform: 'perspective(1000px) rotateX(60deg) translateZ(-60px)',
        }}
      />
    </div>
  );
}
export default Book3D;
