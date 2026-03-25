"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/landing/HeroSection";
// import RareUiBento from "@/components/landing/RareUiBento";

const HowItWorks = dynamic(() => import("@/components/landing/HowItWorks"), {
  loading: () => <div className="h-[500px] w-full bg-background" />,
});

const CTASection = dynamic(() => import("@/components/landing/CTASection"), {
  loading: () => <div className="h-[400px] w-full bg-background" />,
});

const Footer = dynamic(() => import("@/components/landing/Footer"), {
  loading: () => <div className="h-20 w-full bg-background" />,
});

const Testimonials = dynamic(() => import("@/components/landing/Testimonials"), {
  loading: () => <div className="h-[500px] w-full bg-neutral-50/50" />,
});

const ComponentBrowser = dynamic(() => import("@/components/landing/ComponentBrowser").then(mod => mod.ComponentBrowser), {
  ssr: false,
  loading: () => <div className="h-[800px] w-full bg-[#f4f4f5] rounded-2xl animate-pulse" />,
});

export default function Home() {
  return (
    <main className="flex min-h-screen w-full max-w-[100vw] flex-col overflow-x-hidden bg-neutral-50 text-foreground">
      <HeroSection />  
      <div className=" bg-neutral-50">
        <ComponentBrowser />
      </div>
      {/* <HowItWorks /> */}
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
