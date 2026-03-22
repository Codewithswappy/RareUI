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

export default function Home() {
  return (
    <main className="flex min-h-screen w-full max-w-[100vw] flex-col overflow-x-hidden bg-background text-foreground">
      <HeroSection />  
      {/* <RareUiBento /> */}
      <HowItWorks />
      <CTASection />
      <Footer />
    </main>
  );
}
