"use client";

import React, { useState, useEffect } from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { Menu03Icon, Cancel01Icon } from "hugeicons-react";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [stars, setStars] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const logoSrc = isDark
    ? "/logo/whiteTransparent.png"
    : "/logo/blackTransparent.png";

  useEffect(() => {
    let isMounted = true;
    fetch("https://api.github.com/repos/Codewithswappy/RareUI")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.stargazers_count !== undefined) {
          setStars(data.stargazers_count);
        }
      })
      .catch((err) => console.error("Error fetching stars:", err));
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!(document as any).startViewTransition) {
      setTheme(isDark ? "light" : "dark");
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = (document as any).startViewTransition(() => {
      setTheme(isDark ? "light" : "dark");
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        { clipPath },
        {
          duration: 750,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  const navLinks = [
    { name: "Docs", href: "/docs/installation/cli" },
    { name: "Components", href: "/docs" },
    { name: "Templates", href: "/templates" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <>
    <motion.nav
      initial={{ y: -20, opacity: 0, filter: "blur(10px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="absolute top-0 left-0 w-full h-20 z-50 flex items-center justify-between px-1 md:px-10  bg-transparent"
    >
      <div className="flex items-center ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src={logoSrc}
            alt="RareUI Logo"
            width={100}
            height={100}
            style={{ width: "auto", height: "auto" }}
            className="object-contain transition-transform duration-300 group-hover:scale-105 md:size-18 lg:size-28"
          />
        </Link>
      </div>

      {/* Right Side / CTA */}
      <div className="flex items-center justify-start md:flex-1 ">
        {/* Links (Hidden on mobile) */}
        <div className="hidden md:flex items-center justify-center  flex-1  gap-8">
          {navLinks.map((link) => (
            <WavyLink key={link.name} href={link.href} name={link.name} />
          ))}
        </div>
        <div className="flex justify-end items-center gap-1">
          <motion.a
            href="https://github.com/Codewithswappy/RareUI"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 group text-neutral-800 dark:text-neutral-200 border border-transparent hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/5 dark:hover:border-white/5"
            aria-label="GitHub Repository"
          >
            <motion.svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              transition={{ type: "spring", stiffness: 300 }}
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </motion.svg>
            <div className="flex items-center gap-0 group-hover:gap-1 max-w-0 group-hover:max-w-[100px] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden group-hover:text-yellow-400">
              <svg
                className="w-4 h-4 text-yellow-500 group-hover:fill-current group-hover:scale-110 transition-all duration-300"
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
              <span className="text-xs font-medium">
                {stars !== null ? stars : "..."}
              </span>
            </div>
          </motion.a>

          {/* Twitter Icon */}
          <motion.a
            href="https://x.com/heyyswap"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="p-2 rounded-full transition-all duration-300 hidden md:block text-neutral-800 dark:text-neutral-200 border border-transparent hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/5 dark:hover:border-white/5"
            aria-label="Twitter Profile"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </motion.a>

          {/* Theme Toggle */}
          {mounted && (
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="p-2 rounded-full transition-all duration-300 hidden md:flex items-center justify-center text-neutral-800 dark:text-neutral-200 border border-transparent hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/5 dark:hover:border-white/5 cursor-pointer"
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
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}

          <div />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-neutral-800 dark:text-neutral-200 z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <Cancel01Icon className="w-6 h-6 text-black dark:text-white" />
          ) : (
            <Menu03Icon className="w-6 h-6" />
          )}
        </button>
      </div>
    </motion.nav>

    {/* Mobile Menu Overlay - Full Screen Slide-in */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{
            clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
            opacity: 0,
          }}
          animate={{
            clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)",
            opacity: 1,
          }}
          exit={{
            clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
            opacity: 0,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-40 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-3xl md:hidden flex flex-col items-center justify-center gap-8 overflow-hidden"
        >
          {/* Background Gradient Element */}
          <div className="absolute inset-0 bg-radial-gradient from-white/10 dark:from-white/5 to-transparent opacity-20 pointer-events-none" />

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
            className="flex flex-col items-center gap-6 relative z-10"
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
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    },
                  },
                }}
              >
                <Link
                  href={link.href}
                  className="text-4xl font-bold text-black/90 dark:text-white/90 hover:text-black dark:hover:text-white transition-colors tracking-tight"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Theme Toggle */}
            {mounted && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    },
                  },
                }}
              >
                <button
                  onClick={toggleTheme}
                  className="p-3 bg-white/10 rounded-full text-black dark:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-all border border-white/90 dark:border-white/20 cursor-pointer"
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <Sun className="w-6 h-6" />
                  ) : (
                    <Moon className="w-6 h-6" />
                  )}
                </button>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-6 mt-4 relative z-10"
          >
            <a
              href="https://x.com/heyyswap"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full text-black dark:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-all border border-white/90 dark:border-white/20"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://github.com/Codewithswappy/RareUI"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full text-black dark:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-all border border-white/90 dark:border-white/20"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

const WavyLink = ({ href, name }: { href: string; name: string }) => {
  return (
    <Link href={href} className="group text-[16px] font-normal ">
      <motion.div
        initial="initial"
        whileHover="hovered"
        className="flex overflow-hidden"
      >
        {name.split("").map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: 0 },
              hovered: { y: -3 },
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              delay: 0.015 * i,
            }}
            className="inline-block transition-colors duration-300 text-neutral-800 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white"
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </motion.div>
    </Link>
  );
};
