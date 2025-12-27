import Link from "next/link";
import { Home, Search, BookOpen } from "lucide-react";
import { Metadata } from "next";
import { GoBackButton } from "@/components/GoBackButton";

export const metadata: Metadata = {
  title: "404 - Page Not Found | RareUI",
  description:
    "The page you're looking for doesn't exist. Explore our component library or return to the homepage.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-background to-muted/20 text-foreground p-6">
      <div className="max-w-lg text-center space-y-8">
        {/* 404 Visual */}
        <div className="relative">
          <h1 className="text-[10rem] md:text-[14rem] font-bold text-muted-foreground/10 leading-none select-none">
            404
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Page Not Found
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-muted text-foreground font-medium hover:bg-muted transition-all border-[0.5px] border-gray-200"
          >
            <BookOpen className="w-4 h-4" />
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
