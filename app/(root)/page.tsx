'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/landing/HeroSection';
import Navbar from '@/components/landing/Navbar';
// import RareUiBento from "@/components/landing/RareUiBento";

const HowItWorks = dynamic(() => import('@/components/landing/HowItWorks'), {
  loading: () => <div className="bg-background h-[500px] w-full" />,
});

const CTASection = dynamic(() => import('@/components/landing/CTASection'), {
  loading: () => <div className="bg-background h-[400px] w-full" />,
});

const Footer = dynamic(() => import('@/components/landing/Footer'), {
  loading: () => <div className="bg-background h-20 w-full" />,
});

const Testimonials = dynamic(() => import('@/components/landing/Testimonials'), {
  loading: () => <div className="h-[500px] w-full bg-neutral-50 dark:bg-neutral-950" />,
});

const ComponentBrowser = dynamic(
  () => import('@/components/landing/ComponentBrowser').then((mod) => mod.ComponentBrowser),
  {
    ssr: false,
    loading: () => (
      <div className="h-[800px] w-full animate-pulse rounded-2xl bg-[#f4f4f5] dark:bg-neutral-950" />
    ),
  }
);

const FAQSection = dynamic(() => import('@/components/landing/FAQSection'), {
  loading: () => <div className="h-[400px] w-full bg-neutral-50 dark:bg-neutral-950" />,
});

const WhatsNew = dynamic(() => import('@/components/landing/WhatsNew'), {
  loading: () => <div className="h-[400px] w-full bg-neutral-50 dark:bg-neutral-950" />,
});

export default function Home() {
  return (
    <main className="text-foreground flex min-h-screen w-full max-w-[100vw] flex-col overflow-x-hidden bg-neutral-50 transition-colors duration-500 dark:bg-neutral-950">
      <Navbar />

      <HeroSection />

      <div className="bg-neutral-50 transition-colors duration-500 dark:bg-neutral-950">
        <ComponentBrowser />
      </div>

      <HowItWorks />

      <FAQSection />

      <Testimonials />

      <WhatsNew />

      <CTASection />

      <Footer />
    </main>
  );
}
