import Link from "next/link";
import { ArrowLeft, LayoutTemplate } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Templates - Coming Soon | RareUI Component Library",
  description:
    "Premium React component templates coming soon. Production-ready dashboards, landing pages, and complete SaaS kits built with our UI component library.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function TemplatesPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6">
      <div className="max-w-md text-center space-y-6">
        <div className="inline-block px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
          Coming Soon
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Premium Component Templates
        </h1>

        <p className="text-muted-foreground leading-relaxed">
          Full-stack component templates are coming soon. Production-ready
          dashboards, landing pages, and complete SaaS kits built with our React
          component library.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
