"use client";

import { ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CustomSearchBar } from "@/components/landing/CustomSearchBar";
import { ThemeToggle } from "@/components/theme-toggle";

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
            <Link href="/" className="hidden md:block">
              <Image
                src="/RareUI_Logo.svg"
                alt="RareUI"
                className="h-16 w-auto invert dark:invert-0"
                width={80}
                height={80}
              />
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 active:scale-95 hidden md:block"
            >
              Components
            </Link>
            <Link
              href="/templates"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 active:scale-95 hidden md:block"
            >
              Templates
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 active:scale-95 hidden md:block"
            >
              Pricing
            </Link>
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
          <div className="h-full overflow-y-auto bg-background/40 backdrop-blur-xl border-r border-border">
            <div className="p-4 space-y-6">
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
                        <Link
                          key={itemIndex}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                        >
                          {linkContent}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
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
    </div>
  );
}
