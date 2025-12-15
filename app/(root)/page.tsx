import dynamic from 'next/dynamic';
import HeroSection from '@/components/landing/HeroSection';
import LoadingSpinner from '@/components/rareui/LoadingSpinner';

const HowItWorks = dynamic(() => import('@/components/landing/HowItWorks'), {
  loading: () => <div className="h-[500px] w-full bg-background" />,
});

const FeatureSection = dynamic(() => import('@/components/landing/FeatureSection'), {
  loading: () => <div className="h-[600px] w-full bg-background" />,
});

const CTASection = dynamic(() => import('@/components/landing/CTASection'), {
  loading: () => <div className="h-[400px] w-full bg-background" />
});

const Footer = dynamic(() => import('@/components/landing/Footer'), {
    loading: () => <div className="h-20 w-full bg-background" />
});

const ComponentsGrid = dynamic(() => import('@/components/landing/ComponentsGrid'), {
  loading: () => <div className="h-[600px] w-full bg-background" />
});

export default function Home() {
  return (
    <main className="min-h-screen bg-background h-screen text-foreground overflow-x-hidden">
      <HeroSection />
      <LoadingSpinner />
      {/* <ComponentsGrid />
      <HowItWorks />
      <CTASection />
      <Footer /> */}
      {/* <div className=' flex flex-col items-center justify-center h-screen'>
        <RetroPixelButton/>
      </div> */}
    </main> 
  );
}
