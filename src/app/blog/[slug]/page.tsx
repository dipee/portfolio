import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { renderSimpleMarkdown } from "@/lib/markdown";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-24 min-h-screen">
      <article className="max-w-3xl mx-auto px-8 py-20 md:py-32">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-secondary font-headline font-bold text-xs uppercase tracking-widest mb-12 group"
        >
          <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
            arrow_back
          </span>
          Back to blog
        </Link>

        {post.publishedAt && (
          <time
            dateTime={post.publishedAt.toISOString()}
            className="text-[10px] font-label uppercase tracking-widest text-on-tertiary-container"
          >
            {formatDate(post.publishedAt)}
          </time>
        )}

        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter text-on-surface mt-4 mb-8">
          {post.title}
        </h1>

        <p className="text-xl text-on-tertiary-container leading-relaxed mb-12 border-l-2 border-secondary pl-6">
          {post.excerpt}
        </p>

        <div className="prose-portfolio">{renderSimpleMarkdown(post.content)}</div>
      </article>
    </div>
  );
}
