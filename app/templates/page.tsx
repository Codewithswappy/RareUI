import Link from 'next/link';
import { ArrowLeft, LayoutTemplate } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium Templates - Coming Soon | RareUI Component Library',
  description:
    'Premium React component templates coming soon. Production-ready dashboards, landing pages, and complete SaaS kits built with our UI component library.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function TemplatesPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-6">
      <div className="max-w-md space-y-6 text-center">
        <div className="bg-muted text-muted-foreground inline-block rounded-full px-3 py-1 text-xs font-medium">
          Coming Soon
        </div>

        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Premium Component Templates
        </h1>

        <p className="text-muted-foreground leading-relaxed">
          Full-stack component templates are coming soon. Production-ready dashboards, landing
          pages, and complete SaaS kits built with our React component library.
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
