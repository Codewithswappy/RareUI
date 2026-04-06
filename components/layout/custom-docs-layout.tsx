'use client';

import { ReactNode, useState, useEffect } from 'react';
import Image from 'next/image';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CustomSearchBar } from '@/components/landing/CustomSearchBar';
import { ThemeToggle } from '@/components/theme-toggle';
import { DraggableTwitterBadge } from '@/components/layout/draggable-twitter-badge';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface SidebarItem {
  title: string;
  href: string;
  badge?: string;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

interface CustomDocsLayoutProps {
  children: ReactNode;
  sidebar: SidebarSection[];
}

function CollapsibleSection({
  section,
  pathname,
  onLinkClick,
}: {
  section: SidebarSection;
  pathname: string;
  onLinkClick: () => void;
}) {
  const isActiveSection = section.items.some((item) => pathname === item.href);
  const isDefaultOpen = true; // All sections open by default
  const [isOpen, setIsOpen] = useState<boolean>(isActiveSection || isDefaultOpen);

  useEffect(() => {
    if (isActiveSection) setIsOpen(true);
  }, [isActiveSection]);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'group flex w-full items-center justify-between px-2 py-1.5 text-sm font-semibold transition-colors',
          isOpen ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
        )}
      >
        <span>{section.title}</span>
        <ChevronRight
          className={cn(
            'h-4 w-4 opacity-50 transition-transform duration-200 group-hover:opacity-100',
            isOpen && 'rotate-90'
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-0.5 pb-2">
              {section.items.map((item, itemIndex) => {
                const isActive = pathname === item.href;
                const isExternal = item.href.startsWith('http');

                const linkContent = (
                  <div
                    className={cn(
                      'group relative flex items-center gap-2 overflow-hidden rounded-lg px-3 py-2 pl-6 text-sm transition-colors',
                      isActive
                        ? 'text-foreground bg-accent/50 font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-all duration-300'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active-line"
                        className="absolute top-1/2 left-0 h-6 w-[2px] -translate-y-1/2 rounded-r-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                      />
                    )}
                    <span className="relative z-10 flex flex-1 items-center gap-2">
                      <span className="flex-1 truncate">{item.title}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            'rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase',
                            item.badge.toLowerCase() === 'new' &&
                              'rounded-full bg-neutral-950 text-white dark:bg-neutral-100 dark:text-black',
                            item.badge.toLowerCase() === 'updated' &&
                              'rounded-full bg-neutral-500 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-500',
                            item.badge.toLowerCase() === 'pro' &&
                              'rounded-full bg-yellow-200 text-yellow-600 dark:bg-yellow-200 dark:text-yellow-600',
                            !['new', 'updated', 'pro'].includes(item.badge.toLowerCase()) &&
                              'bg-primary/20 text-primary dark:bg-primary/30'
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </span>
                  </div>
                );

                return isExternal ? (
                  <a key={itemIndex} href={item.href} target="_blank" rel="noopener noreferrer">
                    {linkContent}
                  </a>
                ) : (
                  <TransitionLink key={itemIndex} href={item.href} onClick={onLinkClick}>
                    {linkContent}
                  </TransitionLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CustomDocsLayout({ children, sidebar }: CustomDocsLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [stars, setStars] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    fetch('https://api.github.com/repos/Codewithswappy/RareUI')
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count))
      .catch((e) => console.error('Error fetching stars:', e));
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="h-screen overflow-hidden overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-neutral-50 backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950">
        <div className="flex h-14 w-full items-center justify-between px-4 md:px-6">
          {/* Left: Logo & Nav Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-accent/50 rounded-lg p-2 transition-all duration-300 active:scale-95 md:hidden"
              aria-label="Toggle Menu"
            >
              <div className="relative h-4 w-5">
                <span
                  className={cn(
                    'bg-foreground absolute left-0 h-0.5 w-full rounded-full transition-all duration-300 ease-in-out',
                    isOpen ? 'top-1.5 rotate-45' : 'top-0'
                  )}
                />
                <span
                  className={cn(
                    'bg-foreground absolute top-1.5 left-0 h-0.5 w-full rounded-full transition-all duration-300 ease-in-out',
                    isOpen ? 'translate-x-2 opacity-0' : 'opacity-100'
                  )}
                />
                <span
                  className={cn(
                    'bg-foreground absolute left-0 h-0.5 w-full rounded-full transition-all duration-300 ease-in-out',
                    isOpen ? 'top-1.5 -rotate-45' : 'top-3'
                  )}
                />
              </div>
            </button>
            <TransitionLink href="/" className="hidden md:block">
              <motion.div
                className="relative"
                whileHover={{
                  rotate: [0, -10, 10, -10, 10, 0],
                  transition: { duration: 0.5 },
                }}
              >
                <Image
                  src="/logo/whiteTransparent.png"
                  alt="RareUI"
                  className="h-16 w-auto invert dark:invert-0"
                  width={80}
                  height={80}
                  style={{ width: 'auto', height: 'auto' }}
                />
              </motion.div>
            </TransitionLink>
            <TransitionLink
              href="/docs"
              className="text-muted-foreground hover:text-foreground hidden text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 md:block"
            >
              Components
            </TransitionLink>
            <TransitionLink
              href="/templates"
              className="text-muted-foreground hover:text-foreground hidden text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 md:block"
            >
              Templates
            </TransitionLink>
            <TransitionLink
              href="/changelog"
              className="text-muted-foreground hover:text-foreground hidden text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 md:block"
            >
              Changelog
            </TransitionLink>
            {/* <TransitionLink
              href="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 active:scale-95 hidden md:block"
            >
              Pricing
            </TransitionLink> */}
          </div>

          {/* Right: Search & Theme */}
          <div className="flex items-center gap-4">
            <div className="hidden gap-4 md:flex md:items-center">
              <motion.a
                href="https://github.com/Codewithswappy/RareUI"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group hidden items-center gap-2 rounded-full px-3 py-1.5 text-gray-600 transition-colors hover:bg-black/5 md:flex dark:text-gray-300 dark:hover:bg-white/10"
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
                <div className="flex items-center gap-1 transition-colors group-hover:text-yellow-400">
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
              <CustomSearchBar />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-3.5rem)] overflow-x-hidden">
        {/* Sidebar */}
        <aside
          className={cn(
            'cubic-bezier(0.32, 0.72, 0, 1) fixed z-40 transform transition-transform duration-500 md:relative',
            // Mobile: Bottom Sheet logic
            'inset-x-0 top-auto bottom-0 h-[85vh] w-full rounded-t-[20px] border-t shadow-2xl md:rounded-none md:border-t-0 md:shadow-none',
            isOpen ? 'translate-y-0' : 'translate-y-full',
            // Desktop: Normal Sidebar logic
            'md:inset-y-0 md:top-0 md:left-0 md:h-full md:w-60 md:translate-y-0'
          )}
        >
          <div className="flex h-full flex-col overflow-hidden rounded-t-[20px] border-black/5 bg-neutral-50 backdrop-blur-xl md:rounded-none md:border-r dark:border-white/10 dark:bg-neutral-950">
            {/* Scrollable Content Wrapper */}
            <div className="relative min-h-0 flex-1">
              <div className="scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40 scrollbar-track-transparent h-full space-y-6 overflow-y-auto p-4">
                {/* Handle Bar for Mobile */}
                <div
                  className="flex w-full justify-center pt-2 pb-4 md:hidden"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="bg-muted-foreground/20 h-1.5 w-12 rounded-full" />
                </div>

                {/* Mobile Search */}
                <div className="border-border mb-6 border-b px-2 pb-6 md:hidden">
                  <CustomSearchBar />
                </div>

                {/* Mobile Main Nav Links */}
                <div className="border-border space-y-2 border-b pb-6 md:hidden">
                  <h3 className="text-foreground/90 px-2 py-1 text-sm font-semibold">Menu</h3>
                  <div className="space-y-1">
                    {[
                      { title: 'Home', href: '/' },
                      { title: 'Components', href: '/docs' },
                      { title: 'Templates', href: '/templates' },
                      { title: 'Changelog', href: '/changelog' },
                    ].map((item) => (
                      <TransitionLink
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'group relative flex items-center gap-2 overflow-hidden rounded-lg px-3 py-2 text-sm transition-all duration-300 ease-out',
                          pathname === item.href
                            ? 'text-foreground bg-accent/50 font-medium shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent/30 hover:pl-4'
                        )}
                      >
                        {item.title}
                      </TransitionLink>
                    ))}
                  </div>
                </div>

                {sidebar.map((section, index) => (
                  <CollapsibleSection
                    key={index}
                    section={section}
                    pathname={pathname}
                    onLinkClick={() => setIsOpen(false)}
                  />
                ))}
                {/* Padding bottom to prevent content from being hidden behind mask */}
                <div className="h-10" />
              </div>

              {/* Bottom Gradient Mask */}
              <div className="from-background via-background/60 pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-24 bg-linear-to-t to-transparent" />
            </div>

            {/* Mobile Social Footer */}
            <div className="border-border bg-muted/10 border-t p-4 md:hidden">
              <div className="flex items-center justify-center gap-6">
                <a
                  href="https://x.com/heyyswap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>

                {/* Github Star Count */}
                <a
                  href="https://github.com/Codewithswappy/RareUI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground group flex items-center gap-2 transition-colors"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="flex items-center gap-1 transition-colors group-hover:text-yellow-400">
                    <svg className="h-4 w-4 fill-current text-yellow-500" viewBox="0 0 24 24">
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                    <span className="text-sm font-medium">{stars !== null ? stars : '...'}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 touch-pan-y overflow-x-hidden overflow-y-auto bg-white dark:bg-black">
          <div className="animate-in fade-in slide-in-from-bottom-4 container mx-auto max-w-6xl px-6 py-12 duration-700 ease-out md:px-16 md:py-10">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden dark:bg-black/80"
          onClick={() => setIsOpen(false)}
          onTouchMove={(e) => e.preventDefault()}
        />
      )}

      {/* Draggable Twitter Badge */}
      <div className="hidden md:block">
        <DraggableTwitterBadge />
      </div>
    </div>
  );
}
