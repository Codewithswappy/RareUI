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
    </article>
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