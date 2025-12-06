"use client";

import { ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CustomSearchBar } from "@/components/landing/CustomSearchBar";
import { ThemeToggle } from "@/components/theme-toggle";
import { DraggableTwitterBadge } from "@/components/layout/draggable-twitter-badge";
import { motion } from "motion/react";

interface SidebarItem {
  title: string;
  href: string;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

interface CustomDocsLayoutProps {
  children: ReactNode;
  sidebar: SidebarSection[];
}

export function CustomDocsLayout({ children, sidebar }: CustomDocsLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  return (
    <div className="h-screen overflow-hidden overflow-x-hidden">

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      
        <div className="flex h-14 items-center justify-between px-4">
          {/* Left: Logo & Nav Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-accent/50 rounded-lg transition-all duration-300 active:scale-95"
              aria-label="Toggle Menu"
            >
              <div className="relative w-5 h-4">
                <span className={cn("absolute left-0 w-full h-0.5 bg-foreground transition-all duration-300 ease-in-out rounded-full", isOpen ? "top-1.5 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 top-1.5 w-full h-0.5 bg-foreground transition-all duration-300 ease-in-out rounded-full", isOpen ? "opacity-0 translate-x-2" : "opacity-100")} />
                <span className={cn("absolute left-0 w-full h-0.5 bg-foreground transition-all duration-300 ease-in-out rounded-full", isOpen ? "top-1.5 -rotate-45" : "top-3")} />
              </div>
            </button>
            <TransitionLink href="/" className="hidden md:block">
              <motion.div
                className="relative"
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 10, 0],
                  transition: { duration: 0.5 }
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
            <TransitionLink
              href="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 active:scale-95 hidden md:block"
            >
              Pricing
            </TransitionLink>
          </div>

          {/* Right: Search & Theme */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex md:items-center">
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
            "fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full",
            "top-14 md:top-0"
          )}
        >
          <div className="h-full flex flex-col bg-background/95 backdrop-blur-xl border-r border-border">
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              
              {/* Mobile Main Nav Links */}
              <div className="md:hidden space-y-2 pb-6 border-b border-border">
                <h3 className="px-2 py-1 text-sm font-semibold text-foreground/90">
                  Menu
                </h3>
                <div className="space-y-1">
                   {[
                     { title: "Components", href: "/docs" },
                     { title: "Templates", href: "/templates" },
                     { title: "Pricing", href: "/pricing" }
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
                <div key={index} className="space-y-2">
                  <h3 className="px-2 py-1 text-sm font-semibold text-foreground/90">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item, itemIndex) => {
                      const isActive = pathname === item.href;
                      const isExternal = item.href.startsWith("http");

                      const linkContent = (
                        <div
                          className={cn(
                            "group flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-300 ease-out relative overflow-hidden",
                            isActive
                              ? "text-foreground font-medium bg-accent/50 shadow-sm"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/30 hover:pl-4"
                          )}
                        >
                          {isActive && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,0.2)] animate-in fade-in slide-in-from-left-1 duration-300" />
                          )}
                          {item.title}
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
                          onClick={() => setIsOpen(false)}
                        >
                          {linkContent}
                        </TransitionLink>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Social Footer */}
            <div className="p-4 border-t border-border md:hidden bg-muted/10">
                <div className="flex items-center justify-center gap-6">
                    <a href="https://x.com/heyyswap" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                    </a>
                </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden touch-pan-y">
          <div className="container mx-auto px-4 py-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
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
      <DraggableTwitterBadge />
    </div>
  );
}
