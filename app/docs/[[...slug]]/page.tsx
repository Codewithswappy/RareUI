import Link from "next/link";
import { source } from "@/lib/source";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const slug = params.slug ?? [];
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <article className="prose prose-invert dark:prose-invert max-w-none">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{page.data.title}</h1>
        {page.data.description && (
          <p className="text-lg text-muted-foreground">{page.data.description}</p>
        )}
      </header>
      <div className="text-foreground">
        <MDX />
      </div>

      <DocsPager currentSlug={page.slugs} />
    </article>
  );
}

function DocsPager({ currentSlug }: { currentSlug: string[] }) {
  const pages = source.getPages();
  const index = pages.findIndex((page) => JSON.stringify(page.slugs) === JSON.stringify(currentSlug));
  
  const prev = pages[index - 1];
  const next = pages[index + 1];

  if (!prev && !next) return null;

  return (
    <div className="mt-16 pt-8 border-t border-border/40">
      <div className="flex flex-row items-stretch justify-between gap-2 sm:gap-4">
        {prev ? (
          <Link 
            href={prev.url}
            className="group relative flex items-center justify-start gap-3 p-4 rounded-xl bg-background/50 hover:bg-accent/5 backdrop-blur-sm transition-all duration-300 w-1/2 overflow-hidden no-underline"
          >
             {/* Hover Gradient Shine */}
             <div className="absolute inset-0 bg-linear-to-r from-transparent via-sidebar-primary/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
             
            <svg className="w-5 h-5 text-muted-foreground group-hover:text-sidebar-primary transition-colors duration-300 group-hover:-translate-x-1 transform min-w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            
            <span className="text-sm font-semibold text-foreground group-hover:text-sidebar-primary transition-colors tracking-wide uppercase no-underline truncate">
               Previous
            </span>
          </Link>
        ) : (
          <div className="w-1/2" />
        )}
        
        {next ? (
          <Link 
            href={next.url}
            className="group relative flex items-center justify-end gap-3 p-4 rounded-xl bg-background/50 hover:bg-accent/5 backdrop-blur-sm transition-all duration-300 w-1/2 overflow-hidden no-underline"
          >
             {/* Hover Gradient Shine */}
             <div className="absolute inset-0 bg-linear-to-r from-transparent via-sidebar-primary/5 to-transparent translate-x-full group-hover:animate-shimmer-reverse" />

            <span className="text-sm font-semibold text-foreground group-hover:text-sidebar-primary transition-colors tracking-wide uppercase no-underline truncate">
               Next
            </span>
            
            <svg className="w-5 h-5 text-muted-foreground group-hover:text-sidebar-primary transition-colors duration-300 group-hover:translate-x-1 transform min-w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div className="w-1/2" />
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug ?? []);

  if (!page) {
    return {};
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}