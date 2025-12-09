"use client";

import Link from "next/link";
import { sidebarData } from "@/lib/sidebar-data";
import LiquidButton from "@/components/rareui/LiquidButton";
import SoftButton from "@/components/rareui/SoftButton";
import { GlassShimmerButton } from "@/components/rareui/glass-shimmer-button";

import { Neumorphism3DButton } from "@/components/rareui/neumorphism3DButton";
import PremiumButton from "@/components/rareui/premium-button";
import ParticleCard from "@/components/rareui/ParticleCard";
import PremiumProfileCard from "@/components/rareui/premiumProfileCard";
import { AnimatedTabsDemo } from "@/components/rareui/AnimatedTabsDemo";

const componentMap: Record<string, any> = {
  "/docs/components/animated-tab": () => (
    <div className="scale-75">
      <AnimatedTabsDemo />
    </div>
  ),
  "/docs/components/glass-shimmer-button": () => <GlassShimmerButton>Shimmer</GlassShimmerButton>,
  "/docs/components/liquid-button": () => <LiquidButton text="Liquid" backgroundColor="bg-neutral-900 dark:bg-neutral-100" textColor="text-white dark:text-black" />,

  "/docs/components/neumorphism3DButton": () => <Neumorphism3DButton>3D Button</Neumorphism3DButton>,
  "/docs/components/soft-button": SoftButton,
  "/docs/components/premium-button": PremiumButton,
  "/docs/components/particle-card": () => (
    <div className="scale-[0.35] -my-20">
      <ParticleCard />
    </div>
  ),
  "/docs/components/premium-profile-card": () => (
    <div className="scale-[0.32] -my-24 pointer-events-none">
      <PremiumProfileCard />
    </div>
  ),
};

export function ComponentsGrid() {
  const componentSections = sidebarData.filter(
    section => !["Follow for updates", "Installation", "Getting Started"].includes(section.title)
  );

  return (
    <div className="space-y-8">
      {componentSections.map((section, index) => (
        <div key={index}>
          <h2 className="text-2xl font-bold mb-3 text-foreground">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.items.map((item, itemIndex) => {
              const Component = componentMap[item.href];
              
              return (
                <div key={itemIndex}>
                  <Link 
                    href={item.href} 
                    className="block border rounded-md overflow-hidden hover:border-neutral-100/50 hover:dark:border-neutral-900 transition-all ease-linear duration-500 no-underline hover:shadow-lg"
                  >
                    <div className="aspect-square bg-neutral-50 dark:bg-black/80 flex items-center justify-center p-4 overflow-hidden">
                      {Component ? <Component /> : <div className="text-muted-foreground text-sm">Preview</div>}
                    </div>
                  </Link>
                  <div className="mt-2 px-1">
                    <h3 className="font-semibold text-base text-foreground">{item.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
