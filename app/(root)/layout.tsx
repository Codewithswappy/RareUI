
import { Metadata } from "next";
import { SearchProvider } from "@/components/rareui/search-context";
import { CommandPaletteModal } from "@/components/rareui/overlays/modal";

export const metadata: Metadata = {
  title: {
        template:"Rare UI = Open Source Components",
        default:"RareUI"
  }
  
};

export default function HomeLayout({
    children
}:{ children:React.ReactNode}) {
    return (
        <SearchProvider>
            <main className="relative w-full pt-0 md:pt-0">
                {children}
            </main>
            <CommandPaletteModal />
        </SearchProvider>
    )
}