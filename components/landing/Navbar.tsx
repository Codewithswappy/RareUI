'use client';

import Link from "next/link"
import { TransitionLink } from '@/components/ui/TransitionLink'
import Image from "next/image"
import { useSearchContext } from '@/components/rareui/search-context'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'motion/react'

export default function Navbar() {
  const { setOpenSearch } = useSearchContext();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/Codewithswappy/RareUI")
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count))
      .catch((e) => console.error("Error fetching stars:", e));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  if (!mounted) return null;

  const isDark = mounted && (theme === 'dark' || resolvedTheme === 'dark');

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    // If view transitions are not supported, just switch theme
    if (!document.startViewTransition) {
      setTheme(isDark ? "light" : "dark");
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    
    const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
         setTheme(isDark ? "light" : "dark");
    });
    
    transition.ready.then(() => {
        const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        
        document.documentElement.animate(
            {
                clipPath: clipPath,
            },
            {
                duration: 750, // Smoother and slightly slower
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    });
  };

  return (
    <>
      <div className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'top-4 w-[85%] max-w-[800px]' : 'top-4 w-[90%] max-w-[1000px]'}`}>
        <nav 
          className={`
            w-full px-2 md:px-6 py-1.5 rounded-full flex items-center justify-between transition-all duration-300 border shadow-2xl backdrop-blur-md
            ${isDark 
              ? 'bg-[#0a0a0a]/80 border-white/6 shadow-black/50 text-white' 
              : 'bg-white/80 border-black/5 shadow-black/5 text-black'
            }
          `}
        >
          
          {/* Left Side: Logo + Links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <TransitionLink href="/" className="flex items-center gap-3 z-50">
              <motion.div 
                className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <Image 
                  src="/RareUI_Logo.svg"
                  alt="RareUI Logo" 
                  width={40} 
                  height={40}
                  priority
                  fetchPriority="high"
                  className={`object-contain transition-all duration-300 brightness-0 ${isDark ? 'invert' : ''}`}
                />
              </motion.div>
            </TransitionLink>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              {[

                { name: 'Docs', href: '/docs/installation/cli' },
                { name: 'Components', href: '/docs' },
                { name: 'Templates', href: '/templates' },
                { name: 'Pricing', href: '/pricing' }
              ].map((item) => (
                <TransitionLink 
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-all duration-400 hover:-translate-y-0.5 ease-in-out ${
                    isDark ? 'text-neutral-500 hover:text-neutral-50' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {item.name}
                </TransitionLink>
              ))}
            </div>
          </div>

          {/* Right Side: Search + Actions */}
          <div className="flex items-center gap-2">
            
            {/* GitHub Icon + Stars */}
            <motion.a 
              href="https://github.com/Codewithswappy/RareUI" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors group ${
                isDark ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-black/5 text-gray-600'
              }`}
              aria-label="GitHub Repository"
            >
               <motion.svg 
                  className="w-5 h-5" 
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  aria-hidden="true"
                  transition={{ type: "spring", stiffness: 300 }}
               >
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
               </motion.svg>
               <div className="flex items-center gap-1 group-hover:text-yellow-400 transition-colors">
                  <svg className="w-4 h-4 text-yellow-500 group-hover:fill-current group-hover:scale-110 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span className="text-xs font-medium">{stars !== null ? stars : '...'}</span>
               </div>
            </motion.a>

            {/* Twitter Icon */}
            <motion.a 
              href="https://x.com/heyyswap" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-colors hidden md:block ${
                isDark ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-black/5 text-gray-600'
              }`}
              aria-label="Twitter Profile"
            >
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
               </svg>
            </motion.a>

            {/* Search Bar (Desktop) - Smooth Transition */}
            <div 
               className={`relative group hidden lg:flex items-center justify-end transition-all duration-500 ease-in-out ${isScrolled ? 'w-10' : 'w-64'}`}
             >
               {/* Full Search Button (Mirrors Docs Style) */}
               <button 
                 onClick={() => setOpenSearch(true)}
                 className={`
                   relative flex items-center gap-2 whitespace-nowrap transition-all duration-500 overflow-hidden
                   border border-border bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground 
                   px-4 py-2 justify-start rounded-xl text-sm font-normal shadow-sm hover:shadow-md cursor-pointer h-10 w-full backdrop-blur-md
                   ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                 `}
                 type="button"
               >
                 <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <span className="opacity-80 group-hover:opacity-100 transition-opacity">Search...</span>
                  
                  <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex shadow-sm">
                    <span className="text-xs">⌘</span>K
                  </kbd>
               </button>
               
               {/* Icon on Right (Visible ONLY when Scrolled) */}
               <button 
                  onClick={() => setOpenSearch(true)}
                  className={`absolute right-0 p-2.5 cursor-pointer rounded-full z-20 transition-all duration-300 ${
                    isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'
                  } ${isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
               >
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                 </svg>
               </button>
             </div>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setOpenSearch(true)}
              className={`lg:hidden p-2 rounded-full transition-colors ${
                isDark ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-black/5 text-gray-600'
              }`}
            >
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                isDark ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-black/5 text-gray-600'
              }`}
            >
              {isDark ? (
                 <svg className="w-5 h-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                 </svg>
               ) : (
                 <svg className="w-5 h-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                 </svg>
               )}
            </button>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-5 flex flex-col items-end gap-1">
                <span className={`h-0.5 w-full rounded-full transition-all ${isDark ? 'bg-white' : 'bg-black'}`} />
                <span className={`h-0.5 w-3/4 rounded-full transition-all ${isDark ? 'bg-white' : 'bg-black'}`} />
                <span className={`h-0.5 w-full rounded-full transition-all ${isDark ? 'bg-white' : 'bg-black'}`} />
              </div>
            </button>

          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 pt-28 px-6 bg-background/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex flex-col gap-6 text-3xl font-bold tracking-tight flex-1">
              {[
                { name: 'Home', href: '/' },
                { name: 'Docs', href: '/docs/installation/cli' },
                { name: 'Components', href: '/docs' },
                { name: 'Templates', href: '/templates' },
                { name: 'Pricing', href: '/pricing' }
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                >
                  <TransitionLink 
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 transition-colors text-foreground hover:text-muted-foreground"
                  >
                    {item.name}
                  </TransitionLink>
                </motion.div>
              ))}
              
            </div>

            {/* Socials in Bottom */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="py-8 border-t border-border flex items-center justify-center gap-6"
            >
                {/* GitHub */}
                <motion.a 
                  href="https://github.com/Codewithswappy/RareUI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-3 bg-muted/50 rounded-full text-foreground hover:bg-muted transition-colors group"
                >
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                   </svg>
                   <div className="flex items-center gap-1 group-hover:text-yellow-400 transition-colors">
                      <svg className="w-4 h-4 text-yellow-500 group-hover:fill-current group-hover:scale-110 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <span className="text-sm font-medium">{stars !== null ? stars : '...'}</span>
                   </div>
                </motion.a>

                {/* Twitter */}
                <motion.a 
                  href="https://x.com/heyyswap" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-muted/50 rounded-full text-foreground hover:bg-muted transition-colors"
                >
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                   </svg>
                </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
