import HeroSection from '@/components/landing/HeroSection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />   
      {/* <Footer /> */}
    </main>
  );
}
