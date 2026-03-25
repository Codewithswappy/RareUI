
import { Metadata } from "next";
import { SearchProvider } from "@/components/internal/search-context";
import { CommandPaletteModal } from "@/components/internal/modal";
import { SmoothScroll } from "@/components/internal/SmoothScroll";

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
            <SmoothScroll>
            <main className="relative w-full pt-0 md:pt-0">
                {children}
            </main>
            </SmoothScroll>
            <CommandPaletteModal />
        </SearchProvider>
    )
}