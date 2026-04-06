import Link from 'next/link';
import { Home, Search, BookOpen } from 'lucide-react';
import { Metadata } from 'next';
import { GoBackButton } from '@/components/GoBackButton';

export const metadata: Metadata = {
  title: '404 - Page Not Found | RareUI',
  description:
    "The page you're looking for doesn't exist. Explore our component library or return to the homepage.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="from-background to-muted/20 text-foreground flex min-h-screen flex-col items-center justify-center bg-linear-to-b p-6">
      <div className="max-w-lg space-y-8 text-center">
        {/* 404 Visual */}
        <div className="relative">
          <h1 className="text-muted-foreground/10 text-[10rem] leading-none font-bold select-none md:text-[14rem]">
            404
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Page Not Found</h2>
          <p className="text-muted-foreground mx-auto max-w-md leading-relaxed">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s
            get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
          <Link
            href="/"
            className="bg-foreground text-background inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/docs"
            className="bg-muted text-foreground hover:bg-muted inline-flex items-center justify-center gap-2 rounded-lg border-[0.5px] border-gray-200 px-6 py-3 font-medium transition-all"
          >
            <BookOpen className="h-4 w-4" />
            Browse Components
          </Link>
        </div>

        {/* Back Link */}
        <div className="pt-4">
          <GoBackButton />
        </div>
      </div>
    </div>
  );
}
