import dynamic from 'next/dynamic';
import HeroSection from '@/components/landing/HeroSection';

const FeatureSection = dynamic(() => import('@/components/landing/FeatureSection'), {
  loading: () => <div className="h-[600px] w-full bg-background" />, // Simple placeholder to prevent layout shift
});

const Footer = dynamic(() => import('@/components/landing/Footer'), {
    loading: () => <div className="h-20 w-full bg-background" />
});

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <FeatureSection />   
      <Footer />
    </main> 
  );
}
