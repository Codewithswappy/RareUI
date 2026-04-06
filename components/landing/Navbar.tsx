'use client';

import React, { useState, useEffect } from 'react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from 'next-themes';
import { Menu03Icon, Cancel01Icon } from 'hugeicons-react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [stars, setStars] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  const logoSrc = isDark ? '/logo/whiteTransparent.png' : '/logo/blackTransparent.png';

  useEffect(() => {
    let isMounted = true;
    fetch('https://api.github.com/repos/Codewithswappy/RareUI')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.stargazers_count !== undefined) {
          setStars(data.stargazers_count);
        }
      })
      .catch((err) => console.error('Error fetching stars:', err));
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!(document as any).startViewTransition) {
      setTheme(isDark ? 'light' : 'dark');
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = (document as any).startViewTransition(() => {
      setTheme(isDark ? 'light' : 'dark');
    });

    transition.ready.then(() => {
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];

      document.documentElement.animate(
        { clipPath },
        {
          duration: 750,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  const navLinks = [
    { name: 'Docs', href: '/docs/installation/cli' },
    { name: 'Components', href: '/docs' },
    // { name: 'Templates', href: '/templates' },
    { name: 'Changelog', href: '/changelog' },
    // { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -0, opacity: 0, filter: 'blur(10px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={cn(
          'fixed left-0 z-50 flex h-[60px] w-full bg-transparent transition-all duration-500',
          isScrolled ? 'top-1' : 'top-5'
        )}
      >
        <div className="mx-auto flex w-[95%] max-w-[1230px] items-center justify-between rounded-xl border border-neutral-200 bg-[#F3F3F1] pr-2 shadow-[0_0_0_1px_#0000000a,0_1px_1px_#00000029,0_2px_3px_#00000014] md:w-full md:px-6 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-[0_0_0_1px_#ffffff0a,0_1px_1px_#ffffff14,0_2px_4px_#00000040]">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <Image
                src={logoSrc}
                alt="RareUI Logo"
                width={100}
                height={100}
                style={{ width: 'auto', height: 'auto' }}
                className="object-cover transition-transform duration-300 group-hover:scale-105 md:size-18 lg:size-28"
              />
            </Link>
          </div>

          {/* Right Side / CTA */}
          <div className="flex items-center justify-end md:flex-1">
            {/* Links (Hidden on mobile) */}
            <div className="hidden flex-1 items-center justify-start gap-8 md:flex">
              {navLinks.map((link) => (
                <WavyLink key={link.name} href={link.href} name={link.name} />
              ))}
            </div>
            <div className="flex items-center justify-end gap-1">
              <motion.a
                href="https://github.com/Codewithswappy/RareUI"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="group hidden items-center gap-2 rounded-full border border-transparent px-3 py-1.5 text-neutral-800 transition-all duration-300 hover:border-black/5 hover:bg-black/5 md:flex dark:text-neutral-200 dark:hover:border-white/5 dark:hover:bg-white/5"
                aria-label="GitHub Repository"
              >
                <motion.svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </motion.svg>
                <div className="flex max-w-0 items-center gap-0 overflow-hidden opacity-0 transition-all duration-500 ease-in-out group-hover:max-w-[100px] group-hover:gap-1 group-hover:text-yellow-400 group-hover:opacity-100">
                  <svg
                    className="h-4 w-4 text-yellow-500 transition-all duration-300 group-hover:scale-110 group-hover:fill-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
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
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="hidden rounded-full border border-transparent p-2 text-neutral-800 transition-all duration-300 hover:border-black/5 hover:bg-black/5 md:block dark:text-neutral-200 dark:hover:border-white/5 dark:hover:bg-white/5"
                aria-label="Twitter Profile"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>

              {/* Theme Toggle */}
              {mounted && (
                <motion.button
                  onClick={toggleTheme}
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="hidden cursor-pointer items-center justify-center rounded-full border border-transparent p-2 text-neutral-800 transition-all duration-300 hover:border-black/5 hover:bg-black/5 md:flex dark:text-neutral-200 dark:hover:border-white/5 dark:hover:bg-white/5"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isDark ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}

              <div />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="relative z-50 p-2 text-neutral-800 md:hidden dark:text-neutral-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <Cancel01Icon className="h-6 w-6 text-black dark:text-white" />
              ) : (
                <Menu03Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay - Full Screen Slide-in */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{
              clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)',
              opacity: 0,
            }}
            animate={{
              clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)',
              opacity: 1,
            }}
            exit={{
              clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)',
              opacity: 0,
              transition: { duration: 0.4, ease: 'easeInOut' },
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 overflow-hidden bg-white/90 backdrop-blur-3xl md:hidden dark:bg-neutral-900/90"
          >
            {/* Background Gradient Element */}
            <div className="bg-radial-gradient pointer-events-none absolute inset-0 from-white/10 to-transparent opacity-20 dark:from-white/5" />

            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="relative z-10 flex w-full flex-col items-start gap-6 px-8"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      },
                    },
                  }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl font-bold tracking-tight text-black/90 transition-colors hover:text-black dark:text-white/90 dark:hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative z-10 mt-4 flex w-full gap-6 px-8"
            >
              <a
                href="https://x.com/heyyswap"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/90 bg-white/10 p-3 text-black transition-all hover:bg-white/80 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com/Codewithswappy/RareUI"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/90 bg-white/10 p-3 text-black transition-all hover:bg-white/80 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="cursor-pointer rounded-full border border-white/90 bg-white/10 p-3 text-black transition-all hover:bg-white/80 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const WavyLink = ({ href, name }: { href: string; name: string }) => {
  return (
    <Link href={href} className="group text-[16px] font-medium">
      <motion.div initial="initial" whileHover="hovered" className="flex overflow-hidden">
        {name.split('').map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: 0 },
              hovered: { y: -3 },
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 15,
              delay: 0.015 * i,
            }}
            className="inline-block text-neutral-700 transition-colors duration-300 group-hover:text-black dark:text-neutral-300 dark:group-hover:text-white"
          >
            {l === ' ' ? '\u00A0' : l}
          </motion.span>
        ))}
      </motion.div>
    </Link>
  );
};
