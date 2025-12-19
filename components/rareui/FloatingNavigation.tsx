"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Types ---
interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

interface FloatingNavigationProps {
    items?: NavItem[];
    className?: string;
}

// --- Icons (Internal SVGs for reliability) ---
const HomeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);
const SearchIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
);
const BellIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
);
const UserIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const SettingsIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
);

const defaultItems: NavItem[] = [
    { id: "home", label: "Home", icon: <HomeIcon className="w-5 h-5" /> },
    { id: "search", label: "Search", icon: <SearchIcon className="w-5 h-5" /> },
    { id: "notifications", label: "Inbox", icon: <BellIcon className="w-5 h-5" /> },
    { id: "profile", label: "Profile", icon: <UserIcon className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon className="w-5 h-5" /> },
];

const iconVariants = {
    home: {
        active: { scale: 1.1, y: -2, transition: { type: "spring", stiffness: 400, damping: 10 } },
        inactive: { scale: 1, y: 0 }
    },
    search: {
        active: { rotate: [0, -10, 10, 0], scale: 1.1, transition: { duration: 0.5, ease: "easeInOut" } },
        inactive: { rotate: 0, scale: 1 }
    },
    notifications: {
        active: { rotate: [0, 15, -15, 10, -10, 0], transition: { duration: 0.5 } },
        inactive: { rotate: 0 }
    },
    profile: {
        active: { scale: 1.1, transition: { type: "spring", stiffness: 300 } },
        inactive: { scale: 1 }
    },
    settings: {
        active: { rotate: 90, transition: { type: "spring", stiffness: 200 } },
        inactive: { rotate: 0 }
    }
};

export default function FloatingNavigation({ items = defaultItems, className }: FloatingNavigationProps) {
    const [activeTab, setActiveTab] = useState(items[0].id);
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        buttonRefs.current = buttonRefs.current.slice(0, items.length);
    }, [items]);

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            const nextIndex = (index + 1) % items.length;
            const nextId = items[nextIndex].id;
            setActiveTab(nextId);
            buttonRefs.current[nextIndex]?.focus();
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            const prevIndex = (index - 1 + items.length) % items.length;
            const prevId = items[prevIndex].id;
            setActiveTab(prevId);
            buttonRefs.current[prevIndex]?.focus();
        }
    };

    return (
        <div className={cn("fixed bottom-8 left-1/2 -translate-x-1/2 z-50", className)}>
            <div className="flex items-center gap-2 p-2 rounded-full border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.2)]" role="tablist">
                {items.map((item, index) => {
                    const isActive = activeTab === item.id;
                    const isHovered = hoveredTab === item.id;

                    return (
                        <button
                            key={item.id}
                            ref={(el) => { buttonRefs.current[index] = el; }}
                            onClick={() => setActiveTab(item.id)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onMouseEnter={() => setHoveredTab(item.id)}
                            onMouseLeave={() => setHoveredTab(null)}
                            className={cn(
                                "relative flex items-center justify-center w-12 h-12 rounded-full p-0 bg-transparent border-none appearance-none select-none outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 text-[0px] leading-none transition-colors duration-300",
                                isActive ? "text-white" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                            )}
                            style={{ WebkitTapHighlightColor: "transparent" }}
                            role="tab"
                            aria-selected={isActive}
                            tabIndex={isActive ? 0 : -1}
                        >
                            {/* Hover Background - Subtle light pill */}
                            {isHovered && !isActive && (
                                <motion.div
                                    layoutId="nav-hover"
                                    className="absolute inset-0 rounded-full bg-neutral-100 dark:bg-white/10"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                />
                            )}

                            {/* Active Background - Glowing Pill with Gradient */}
                            {isActive && (
                                <motion.div
                                    layoutId="nav-active"
                                    className="absolute inset-0 rounded-full bg-linear-to-b from-neutral-800 to-neutral-900 dark:from-white dark:to-neutral-200 shadow-[0_0_20px_rgba(0,0,0,0.3)] dark:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                />
                            )}

                            {/* Icon layer with unique animations */}
                            <motion.span
                                className={cn(
                                    "relative z-10 block",
                                    isActive
                                        ? "text-white dark:text-black"
                                        : "text-neutral-600 dark:text-neutral-400"
                                )}
                                variants={(iconVariants as any)[item.id] || iconVariants.home}
                                animate={isActive ? "active" : "inactive"}
                            >
                                {item.icon}
                            </motion.span>

                            {/* Tooltip */}
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                        animate={{ opacity: 1, y: -50, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className="absolute left-1/2 -translate-x-1/2 top-0 px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-semibold whitespace-nowrap shadow-xl border border-neutral-700 dark:border-neutral-200 pointer-events-none"
                                    >
                                        <div className="absolute inset-x-0 -bottom-1 mx-auto w-2 h-2 bg-neutral-900 dark:bg-white rotate-45" />
                                        {item.label}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
