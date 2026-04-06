'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ParticleData {
  x: number;
  y: number;
  posX: number;
  posY: number;
  randX: number;
  randY: number;
  rotate: number;
  scale: number;
  delay: number;
  blur: number;
}

interface ParticleCardProps {
  name?: string;
  role?: string;
  bio?: string;
  img?: string;
  tags?: string[];
  cols?: number;
  rows?: number;
}

const Particle = ({
  p,
  active,
  img,
  cols,
  rows,
}: {
  p: ParticleData;
  active: boolean;
  img: string;
  cols: number;
  rows: number;
}) => {
  const innerPadding = 4; // Reduced padding for tighter fit

  const backgroundStyle = {
    backgroundImage: `url(${img})`,
    backgroundSize: `${cols * 100}% ${rows * 100}%`,
    backgroundPosition: `${p.posX}% ${p.posY}%`,
    backgroundRepeat: 'no-repeat',
  };

  // More dramatic scattering
  const finalTransform = `translate3d(${p.randX * 1.5}px, ${p.randY * 1.5}px, 0) rotate(${p.rotate * 2}deg) scale(${p.scale * 0.8})`;

  const style: React.CSSProperties = {
    ...backgroundStyle,
    // Slower, smoother transition (increased duration)
    transition: `transform 5400ms cubic-bezier(.2,.8,.2,1) ${p.delay}ms, opacity 5400ms ease-in ${p.delay + 500}ms`,
    transform: active ? finalTransform : 'translate3d(0,0,0) rotate(0deg) scale(1)',
    opacity: active ? 0 : 1,
    // Remove artifacts when inactive
    boxShadow: active ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
    borderRadius: active ? 4 : 0,
    width: '100.5%', // Slight overlap to prevent sub-pixel gaps
    height: '100.5%',
    willChange: 'transform, opacity',
    position: 'absolute',
    top: 0,
    left: 0,
  };

  return (
    <div
      style={{
        width: `${100 / cols}%`,
        height: `${100 / rows}%`,
        position: 'absolute',
        left: `${(p.x / cols) * 100}%`,
        top: `${(p.y / rows) * 100}%`,
      }}
    >
      <div style={style} />
    </div>
  );
};

export default function ParticleCard({
  name = 'Sam Jenkins',
  role = 'Product Designer',
  bio = 'Passionate about creating intuitive and beautiful user experiences. I specialize in UI/UX design and frontend development with a focus on accessibility. I am a frontend developer with a passion for creating engaging and interactive user interfaces.',
  img = 'https://images.unsplash.com/photo-1676377630534-a08fd9778701?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  tags = ['UI/UX', 'React', 'Motion', 'Figma'],
  cols = 20,
  rows = 24,
}: ParticleCardProps) {
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Precompute particle metadata
  const particles = useMemo(() => {
    const arr: ParticleData[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const posX = (x / (cols - 1)) * 100;
        const posY = (y / (rows - 1)) * 100;

        // Center-based explosion logic
        const centerX = cols / 2;
        const centerY = rows / 2;
        const dx = x - centerX;
        const dy = y - centerY;

        const angle = Math.atan2(dy, dx);
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Randomize slightly but keep directional momentum
        const spread = 150 + Math.random() * 300;
        const randX = Math.cos(angle) * spread * (1 + Math.random() * 0.5);
        const randY = Math.sin(angle) * spread * (1 + Math.random() * 0.5);

        const rotate = (Math.random() * 2 - 1) * 180;
        const scale = 0.5 + Math.random() * 0.5;

        // Delay based on distance from center (ripple effect) or random
        const delay = distance * 20 + Math.random() * 150; // Increased delay spread
        const blur = Math.random() * 2;

        arr.push({ x, y, posX, posY, randX, randY, rotate, scale, delay, blur });
      }
    }
    return arr;
  }, [cols, rows]);

  return (
    <div className="flex min-h-[400px] items-center justify-center p-8">
      <motion.div
        className={cn(
          'bg-card relative h-[450px] w-[330px] cursor-pointer overflow-hidden rounded-lg shadow-2xl',
          'group select-none'
        )}
        initial={false}
        animate={active ? { scale: 1.02 } : { scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onHoverStart={() => !isMobile && setActive(true)}
        onHoverEnd={() => !isMobile && setActive(false)}
        onClick={() => setIsMobile(!active)} // Tap to toggle on mobile
      >
        {/* --- Background Content (Revealed on Hover) --- */}
        <div className="from-background to-muted absolute inset-0 z-0 flex flex-col bg-linear-to-br p-6 pt-4 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex h-full flex-col gap-3"
          >
            <div>
              <h3 className="text-foreground m-0 text-2xl font-bold">{name}</h3>
              <p className="text-muted-foreground m-0 font-medium">{role}</p>
            </div>

            <p className="text-muted-foreground m-0 flex-1 text-sm leading-relaxed">{bio}</p>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-foreground bg-background/80 border-border hover:bg-background rounded-md border px-3 py-1 text-xs font-semibold duration-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button className="bg-primary! text-primary-foreground hover:bg-primary/90! group/btn mt-3 flex! w-full cursor-pointer items-center! justify-center! gap-2 rounded-xl border-0! py-3 text-sm font-semibold shadow-lg transition-all duration-300">
              View Profile
              <svg
                className="h-4 w-4 transition-transform group-hover/btn:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* --- Foreground Image / Particles (Vanish on Hover) --- */}
        <div className="absolute inset-0 z-10 h-full w-full">
          {/* Static Image (fades out) */}
          <img
            src={img}
            alt={name}
            className={cn(
              'pointer-events-none absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-500 ease-out',
              active ? 'opacity-0' : 'opacity-100'
            )}
          />

          {/* Overlay Gradient for text readability (fades out) */}
          <div
            className={cn(
              'absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500',
              active ? 'opacity-0' : 'opacity-100'
            )}
          />

          {/* Initial Text Overlay (fades out) */}
          <div
            className={cn(
              'absolute right-0 bottom-0 left-0 transform p-8 transition-all duration-500',
              active ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
            )}
          >
            <h2 className="mb-1 text-3xl font-bold text-white">{name}</h2>
            <p className="font-medium text-white/90">{role}</p>
          </div>

          {/* Particle Grid */}
          <div className="absolute inset-0 h-full w-full overflow-hidden">
            {particles.map((p, i) => (
              <Particle key={i} p={p} active={active} img={img} cols={cols} rows={rows} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
