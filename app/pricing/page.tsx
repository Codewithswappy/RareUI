import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | RareUI',
  description: 'Simple, transparent pricing for lifetime access to RareUI components.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function PricingPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-6">
      <div className="max-w-md space-y-6 text-center">
        <div className="bg-muted text-muted-foreground inline-block rounded-full px-3 py-1 text-xs font-medium">
          Coming Soon
        </div>

        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Pricing</h1>

        <p className="text-muted-foreground leading-relaxed">
          Simple, transparent pricing is on the way. We believe in one-time payments for lifetime
          access.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
