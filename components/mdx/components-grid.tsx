"use client";

import Link from "next/link";
import { sidebarData } from "@/lib/sidebar-data";
import { Btn01 } from "@/components/rareui/buttons/btn-01";

const componentMap: Record<string, any> = {
  "/docs/components/buttons/btn-01": Btn01,
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
                  <Link href={item.href} className="block border border-border rounded-md overflow-hidden hover:border-primary/50 transition-colors no-underline">
                    <div className="aspect-square bg-card flex items-center justify-center p-4 pointer-events-none">
                      {Component ? <Component /> : <div className="text-muted-foreground">Preview</div>}
                    </div>
                  </Link>
                  <div className="mt-1">
                    <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
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
