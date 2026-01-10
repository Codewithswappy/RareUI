"use client";

import { ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CustomSearchBar } from "@/components/landing/CustomSearchBar";
import { ThemeToggle } from "@/components/theme-toggle";
import { DraggableTwitterBadge } from "@/components/layout/draggable-twitter-badge";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState<boolean>(
    isActiveSection || isDefaultOpen
  );

  useEffect(() => {
    if (isActiveSection) setIsOpen(true);
  }, [isActiveSection]);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-2 py-1.5 text-sm font-semibold transition-colors group",
          isOpen
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <span>{section.title}</span>
        <ChevronRight
          className={cn(
            "w-4 h-4 transition-transform duration-200 opacity-50 group-hover:opacity-100",
            isOpen && "rotate-90"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-0.5 pb-2">
              {section.items.map((item, itemIndex) => {
                const isActive = pathname === item.href;
                const isExternal = item.href.startsWith("http");

                const linkContent = (
                  <div
                    className={cn(
                      "group flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors relative overflow-hidden pl-6",
                      isActive
                        ? "text-foreground font-medium bg-accent/50"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-all duration-300"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active-line"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-6 bg-red-500 rounded-r-full shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2 flex-1">
                      <span className="flex-1 truncate">{item.title}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "px-1.5 py-0.5 text-[10px] font-semibold rounded uppercase tracking-wider",
                            item.badge.toLowerCase() === "new" &&
                              "bg-neutral-950 text-white dark:bg-neutral-100 dark:text-black rounded-full",
                            item.badge.toLowerCase() === "updated" &&
                              "bg-neutral-500 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-500 rounded-full",
                            item.badge.toLowerCase() === "pro" &&
                              "bg-yellow-200 text-yellow-600 dark:bg-yellow-200 dark:text-yellow-600 rounded-full",
                            !["new", "updated", "pro"].includes(
                              item.badge.toLowerCase()
                            ) && "bg-primary/20 text-primary dark:bg-primary/30"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </span>
                  </div>
                );

                return isExternal ? (
                  <a
                    key={itemIndex}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkContent}
                  </a>
                ) : (
                  <TransitionLink
                    key={itemIndex}
                    href={item.href}
                    onClick={onLinkClick}
                  >
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
    fetch("https://api.github.com/repos/Codewithswappy/RareUI")
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count))
      .catch((e) => console.error("Error fetching stars:", e));
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="h-screen overflow-hidden overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/5 dark:border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between px-4">
          {/* Left: Logo & Nav Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-accent/50 rounded-lg transition-all duration-300 active:scale-95"
              aria-label="Toggle Menu"
            >
              <div className="relative w-5 h-4">
                <span
                  className={cn(
                    "absolute left-0 w-full h-0.5 bg-foreground transition-all duration-300 ease-in-out rounded-full",
                    isOpen ? "top-1.5 rotate-45" : "top-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 w-full h-0.5 bg-foreground transition-all duration-300 ease-in-out rounded-full",
                    isOpen ? "opacity-0 translate-x-2" : "opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 w-full h-0.5 bg-foreground transition-all duration-300 ease-in-out rounded-full",
                    isOpen ? "top-1.5 -rotate-45" : "top-3"
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
                  src="/RareUI_Logo.svg"
                  alt="RareUI"
                  className="h-16 w-auto invert dark:invert-0"
                  width={80}
                  height={80}
                />
              </motion.div>
            </TransitionLink>
            <TransitionLink
              href="/docs"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 active:scale-95 hidden md:block"
            >
              Components
            </TransitionLink>
            <TransitionLink
              href="/templates"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 active:scale-95 hidden md:block"
            >
              Templates
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
            <div className="hidden md:flex md:items-center gap-4">
              <motion.a
                href="https://github.com/Codewithswappy/RareUI"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors group text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10"
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
                <div className="flex items-center gap-1 group-hover:text-yellow-400 transition-colors">
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
            "fixed md:relative z-40 transform transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1)",
            // Mobile: Bottom Sheet logic
            "inset-x-0 bottom-0 top-auto h-[85vh] w-full rounded-t-[20px] border-t shadow-2xl md:shadow-none md:border-t-0 md:rounded-none",
            isOpen ? "translate-y-0" : "translate-y-full",
            // Desktop: Normal Sidebar logic
            "md:inset-y-0 md:left-0 md:top-0 md:h-full md:w-60 md:translate-y-0"
          )}
        >
          <div className="h-full flex flex-col bg-background/95 backdrop-blur-xl md:border-r border-black/5 dark:border-white/10 rounded-t-[20px] md:rounded-none overflow-hidden">
            {/* Scrollable Content Wrapper */}
            <div className="flex-1 relative min-h-0">
              <div className="h-full overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40 scrollbar-track-transparent">
                {/* Handle Bar for Mobile */}
                <div
                  className="md:hidden w-full flex justify-center pb-4 pt-2"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-12 h-1.5 bg-muted-foreground/20 rounded-full" />
                </div>

                {/* Mobile Search */}
                <div className="md:hidden px-2 pb-6 border-b border-border mb-6">
                  <CustomSearchBar />
                </div>

                {/* Mobile Main Nav Links */}
                <div className="md:hidden space-y-2 pb-6 border-b border-border">
                  <h3 className="px-2 py-1 text-sm font-semibold text-foreground/90">
                    Menu
                  </h3>
                  <div className="space-y-1">
                    {[
                      { title: "Home", href: "/" },
                      { title: "Components", href: "/docs" },
                      { title: "Templates", href: "/templates" },
                    ].map((item) => (
                      <TransitionLink
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "group flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-300 ease-out relative overflow-hidden",
                          pathname === item.href
                            ? "text-foreground font-medium bg-accent/50 shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/30 hover:pl-4"
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
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background via-background/60 to-transparent pointer-events-none z-10" />
            </div>

            {/* Mobile Social Footer */}
            <div className="p-4 border-t border-border md:hidden bg-muted/10">
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
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <svg
                    className="h-5 w-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="flex items-center gap-1 group-hover:text-yellow-400 transition-colors">
                    <svg
                      className="w-4 h-4 text-yellow-500 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                    <span className="text-sm font-medium">
                      {stars !== null ? stars : "..."}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden touch-pan-y">
          <div className="container mx-auto px-6 md:px-16 py-12 md:py-10 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 dark:bg-black/80 md:hidden"
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
