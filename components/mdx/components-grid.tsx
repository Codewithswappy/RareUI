"use client";

import Link from "next/link";
import { sidebarData } from "@/lib/sidebar-data";
import LiquidButton from "@/components/rareui/buttons/LiquidButton";
import SoftButton from "@/components/rareui/buttons/SoftButton";
import { GlassShimmerButton } from "@/components/rareui/buttons/glass-shimmer-button";
import Loader from "@/components/rareui/buttons/loader";
import { Neumorphism3DButton } from "@/components/rareui/buttons/neumorphism3DButton";
import UpgradeButton from "@/components/rareui/buttons/upgrade-button";
import ParticleCard from "@/components/rareui/cards/ParticleCard";
import PremiumProfileCard from "@/components/rareui/cards/premiumProfileCard";

const componentMap: Record<string, any> = {
  "/docs/components/buttons/glass-shimmer-button": () => <GlassShimmerButton>Shimmer</GlassShimmerButton>,
  "/docs/components/buttons/liquid-button": () => <LiquidButton text="Liquid" backgroundColor="bg-neutral-900 dark:bg-neutral-100" textColor="text-white dark:text-black" />,
  "/docs/components/buttons/loader": Loader,
  "/docs/components/buttons/neumorphism3DButton": () => <Neumorphism3DButton>3D Button</Neumorphism3DButton>,
  "/docs/components/buttons/soft-button": SoftButton,
  "/docs/components/buttons/upgrade-button": UpgradeButton,
  "/docs/components/cards/particle-card": () => (
    <div className="scale-[0.35] -my-20">
      <ParticleCard />
    </div>
  ),
  "/docs/components/cards/premium-profile-card": () => (
    <div className="scale-[0.32] -my-24 pointer-events-none">
      <PremiumProfileCard />
    </div>
  ),
};

export function ComponentsGrid() {
  const componentSections = sidebarData.filter(
    section => !["Follow for updates", "Installation"].includes(section.title)
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
                    className="block border border-border rounded-md overflow-hidden hover:border-primary/50 transition-colors no-underline hover:shadow-lg"
                  >
                    <div className="aspect-square bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4 overflow-hidden">
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
