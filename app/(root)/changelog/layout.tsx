import { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Changelog — RareUI',
  description: 'Track every new component, improvement, and fix shipped in RareUI. Updated weekly.',
};

export default function ChangelogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-foreground min-h-screen bg-neutral-50 transition-colors duration-500 dark:bg-neutral-950">
      <div className="relative z-50">
        <Navbar />
      </div>
      <main className="pt-28 pb-20">{children}</main>
      <Footer />
    </div>
  );
}
