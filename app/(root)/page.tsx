import dynamic from "next/dynamic";
import HeroSection from "@/components/landing/HeroSection";

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
    <main className="min-h-screen bg-background h-screen text-foreground overflow-x-hidden">
      <HeroSection />
      <HowItWorks />
      <CTASection />
      <Footer />
    </main>
  );
}
