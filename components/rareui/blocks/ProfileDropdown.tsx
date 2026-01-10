"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { cn } from "@/lib/utils";

interface ProfileDropdownProps {
  className?: string;
}

// Define Account Types
interface Account {
  id: string;
  name: string;
  plan: string;
  image: string;
  isPro?: boolean;
}

export default function ProfileDropdown({ className }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountSwitcherOpen, setIsAccountSwitcherOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>("activity");

  // State for the currently active account (default: Personal Pro)
  const [activeAccount, setActiveAccount] = useState<Account>({
    id: "personal_pro",
    name: "Personal",
    plan: "Pro plan",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=Sophia",
    isPro: true,
  });

  // List of other available accounts
  const allAccounts: Account[] = [
    {
      id: "personal_pro",
      name: "Personal",
      plan: "Pro plan",
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=Sophia",
      isPro: true,
    },
    {
      id: "team",
      name: "Team Plan",
      plan: "Enterprise",
      image: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Ryan",
    },
    {
      id: "personal_free",
      name: "Personal",
      plan: "Free plan",
      image: "https://api.dicebear.com/9.x/notionists/svg?seed=Riley",
    },
  ];

  // Filter out the active account from the switcher list
  const switcherAccounts = allAccounts.filter(
    (acc) => acc.id !== activeAccount.id
  );

  const handleSwitchAccount = (account: Account) => {
    setActiveAccount(account);
    setIsAccountSwitcherOpen(false); // Close switcher after selection
  };

  const springTransition = {
    type: "spring" as const,
    stiffness: 450,
    damping: 35,
    mass: 1,
  };

  const menuItems = [
    { id: "upgrade", label: "Upgrade plan", icon: UpgradeIcon },
    { id: "activity", label: "Activity", icon: ActivityIcon },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  const bottomItems = [
    { id: "help", label: "Help", icon: HelpIcon, hasChevron: true },
    { id: "logout", label: "Log out", icon: LogoutIcon },
  ];

  return (
    <div className={cn("font-sans w-full flex justify-center", className)}>
      <div className="relative">
        {/* ------------------- TRIGGER BUTTON ------------------- */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-[280px] max-w-[90vw] outline-none z-50 group"
          whileTap={{ scale: 0.98 }}
          transition={springTransition}
        >
          <div
            className="
            flex items-center gap-3 p-2 pr-4
            bg-[#F7F7F7] dark:bg-[#1A1A1A]
            rounded-[24px] 
            shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.8)_inset]
            border border-white/60 dark:border-white/5
        "
          >
            {/* Profile Picture */}
            <div className="relative shrink-0">
              <img
                src={activeAccount.image}
                alt={activeAccount.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-[#2C2C2C]"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00C48C] rounded-full border-[2px] border-[#F7F7F7] dark:border-[#1A1A1A]" />
            </div>

            {/* User Info */}
            <div className="flex-1 text-left flex flex-col justify-center">
              <h3 className="text-[15px] font-bold text-[#1A1A1A] dark:text-white leading-tight tracking-tight">
                {activeAccount.name}
              </h3>
              <p className="text-[13px] text-[#999] dark:text-[#A0A0A0] font-medium leading-tight mt-0.5">
                {activeAccount.plan}
              </p>
            </div>

            {/* Selector Icon */}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={springTransition}
              className="text-[#BBB] dark:text-[#666]"
            >
              <DiamondSelectorIcon />
            </motion.div>
          </div>
        </motion.button>

        {/* ------------------- EXPANDED MENU ------------------- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, scale: 0.95, filter: "blur(4px)" }}
              transition={{ ...springTransition, duration: 0.2 }}
              className="
                absolute top-full left-0 mt-2
                w-[280px] max-w-[90vw]
                bg-[#F2F3F5] dark:bg-[#161616]
                rounded-[32px]
                shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.02)]
                border border-white/50 dark:border-white/5
                overflow-hidden
                z-40
            "
            >
              {/* 1. Header: Email */}
              <div className="pt-5 pb-2 px-5 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full border border-[#E5E6E8] dark:border-[#333] flex items-center justify-center text-[#888] dark:text-[#999] bg-white dark:bg-white/5">
                  <MailIcon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[13px] font-medium text-[#666] dark:text-[#AAA]">
                  jasim.design@gmail.com
                </span>
              </div>

              {/* Separator */}
              <div className="h-px bg-[#E5E6E8] dark:bg-[#222] mx-4 my-2" />

              {/* 2. Account Switcher Trigger */}
              <div className="px-2.5">
                <motion.button
                  onClick={() =>
                    setIsAccountSwitcherOpen(!isAccountSwitcherOpen)
                  }
                  className="w-full flex items-center gap-2.5 p-2 rounded-[20px] hover:bg-white/60 dark:hover:bg-white/5 transition-colors text-left group"
                >
                  <div className="relative shrink-0">
                    <img
                      src={activeAccount.image}
                      alt={activeAccount.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-[#2C2C2C]"
                    />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00C48C] rounded-full border-[2px] border-[#F2F3F5] dark:border-[#161616]" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-[14px] font-bold text-[#1A1A1A] dark:text-white leading-tight group-hover:text-black dark:group-hover:text-white transition-colors">
                      {activeAccount.name}
                    </h3>
                    <p className="text-[12px] text-[#888] dark:text-[#A0A0A0] font-medium leading-tight mt-0.5 group-hover:text-[#666] dark:group-hover:text-[#888] transition-colors">
                      {activeAccount.plan}
                    </p>
                  </div>

                  <motion.div
                    animate={{ rotate: isAccountSwitcherOpen ? 180 : 0 }}
                    className="mr-1 text-[#999] dark:text-[#666]"
                  >
                    <ChevronDownIcon />
                  </motion.div>
                </motion.button>

                {/* 2a. Nested Account List */}
                <AnimatePresence>
                  {isAccountSwitcherOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={springTransition}
                      className="overflow-hidden pl-2 pr-1"
                    >
                      {switcherAccounts.map((acc) => (
                        <motion.button
                          key={acc.id}
                          onClick={() => handleSwitchAccount(acc)}
                          className="w-full flex items-center gap-2 p-1.5 rounded-[16px] hover:bg-white/60 dark:hover:bg-white/5 transition-colors text-left mb-1 group"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="relative shrink-0 w-8 h-8">
                            <img
                              src={acc.image}
                              className="w-full h-full rounded-full opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-[#555] dark:text-[#CCC] group-hover:text-[#1A1A1A] dark:group-hover:text-white transition-colors leading-tight">
                              {acc.name}
                            </p>
                            <p className="text-[11px] text-[#999] group-hover:text-[#777] dark:group-hover:text-[#AAA] transition-colors leading-tight">
                              {acc.plan}
                            </p>
                          </div>
                        </motion.button>
                      ))}
                      <div className="h-2" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Separator */}
              <div
                className={cn(
                  "h-px bg-[#E5E6E8] dark:bg-[#222] mx-4 my-2 transition-opacity duration-200",
                  isAccountSwitcherOpen ? "opacity-30" : "opacity-100"
                )}
              />

              {/* 3. Main Menu */}
              <div className="px-2.5 pb-4 space-y-0.5">
                <LayoutGroup>
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      isSelected={selectedItem === item.id}
                      onClick={() => setSelectedItem(item.id)}
                      isActiveAccount={true}
                    />
                  ))}

                  {/* Spacer */}
                  <div className="h-2" />
                  <div className="h-px bg-[#E5E6E8] dark:bg-[#222] mx-2 mb-2" />

                  {bottomItems.map((item) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      isSelected={selectedItem === item.id}
                      onClick={() => setSelectedItem(item.id)}
                      isRed={item.id === "logout"}
                    />
                  ))}
                </LayoutGroup>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MenuItem({
  item,
  isSelected,
  onClick,
  isRed,
  isActiveAccount,
}: {
  item: any;
  isSelected: boolean;
  onClick: () => void;
  isRed?: boolean;
  isActiveAccount?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative w-full flex items-center gap-3 px-4 py-3 rounded-[20px] text-left outline-none transition-all duration-200 group z-0",
        isSelected ? "" : "hover:bg-white/40 dark:hover:bg-white/5"
      )}
      whileTap={{ scale: 0.98 }}
    >
      {/* Active Pill Background */}
      {isSelected && (
        <motion.div
          layoutId="active-pill"
          className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-white to-[#F7F9FC] dark:from-[#333] dark:to-[#222] shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7),0_1px_1px_rgba(0,0,0,0.02)] border-t border-white/80 dark:border-white/10 z-[-1]"
          transition={{ type: "spring", stiffness: 450, damping: 35 }}
        />
      )}

      {/* Icon */}
      <span
        className={cn(
          "relative z-10 transition-colors duration-200",
          isSelected
            ? "text-[#1A1A1A] dark:text-white"
            : "text-[#777] dark:text-[#888] group-hover:text-[#333] dark:group-hover:text-[#CCC]"
        )}
      >
        <item.icon />
      </span>

      {/* Label */}
      <span
        className={cn(
          "relative z-10 flex-1 text-[14px] transition-colors duration-200 leading-none",
          isSelected
            ? "text-[#1A1A1A] dark:text-white font-semibold"
            : "text-[#555] dark:text-[#999] font-medium group-hover:text-[#1A1A1A] dark:group-hover:text-white"
        )}
      >
        {item.label}
      </span>

      {/* Optional Chevron */}
      {item.hasChevron && (
        <span className="relative z-10 text-[#CCC] dark:text-[#555] group-hover:text-[#999] dark:group-hover:text-[#888] transition-colors">
          <ChevronRightIcon />
        </span>
      )}

      {/* Universal subtle glow for ACTIVE state */}
      {isSelected && (
        <div className="absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-[1px]" />
      )}
    </motion.button>
  );
}

// Icons

function DiamondSelectorIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: "rotate(45deg)" }}
    >
      <rect x="5" y="5" width="14" height="14" rx="2" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function UpgradeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <line x1="10" y1="16" x2="14" y2="16" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
