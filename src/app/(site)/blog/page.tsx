import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical writing by Dipendra Nath — architecture, backends, and high-performance systems.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="pt-24 min-h-screen">
      <header className="max-w-7xl mx-auto px-8 py-20 md:py-32">
        <p className="text-secondary font-headline font-bold tracking-widest uppercase text-sm mb-4">
          Portfolio Index 03
        </p>
        <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter text-on-surface leading-none mb-8">
          Technical <br />
          <span className="text-secondary">Writing.</span>
        </h1>
        <p className="max-w-2xl text-on-tertiary-container text-lg leading-relaxed">
          Notes on architecture, backends, and building systems that stay fast under load.
        </p>
      </header>

      <section className="bg-surface-container-low py-24">
        <div className="max-w-4xl mx-auto px-8 space-y-8">
          {posts.length === 0 ? (
            <p className="text-on-surface-variant">No posts published yet.</p>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="group bg-surface-container-high rounded-lg p-8 border border-outline-variant/10 hover:-translate-y-0.5 transition-transform"
              >
                {post.publishedAt && (
                  <time
                    dateTime={post.publishedAt.toISOString()}
                    className="text-[10px] font-label uppercase tracking-widest text-on-tertiary-container"
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                )}
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mt-3 mb-4 group-hover:text-secondary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-on-surface-variant leading-relaxed mb-6">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-secondary font-headline font-bold text-xs uppercase tracking-widest group/link"
                >
                  Read article
                  <span className="material-symbols-outlined ml-2 text-sm transition-transform group-hover/link:translate-x-1">
                    arrow_forward
                  </span>
                </Link>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
