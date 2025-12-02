import { CustomDocsLayout } from "@/components/layout/custom-docs-layout";
import { SearchProvider } from "@/components/rareui/search-context";
import { CommandPaletteModal } from "@/components/rareui/overlays/modal";
import { sidebarData } from "@/lib/sidebar-data";
import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | RareUI - Free UI Components",
    default: "RareUI - Free UI Components to build beautiful websites",
  },
};

export default function DocsLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <SearchProvider>
      <CustomDocsLayout sidebar={sidebarData}>
        {children}
      </CustomDocsLayout>
      <CommandPaletteModal />
    </SearchProvider>
  );
}
