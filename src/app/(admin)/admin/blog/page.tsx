import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";
import { PageHeader } from "@/components/admin/FormField";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <PageHeader
        title="Blog posts"
        description="Write and publish technical posts."
        action={
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-3 text-sm font-headline font-bold uppercase tracking-wide text-on-secondary hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            New post
          </Link>
        }
      />

      {posts.length === 0 ? (
        <p className="text-on-tertiary-container">No posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-surface-container-low border border-outline-variant/10 rounded-xl p-5 md:p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h2 className="font-headline text-xl font-bold text-on-surface">
                      {post.title}
                    </h2>
                    <span
                      className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${
                        post.published
                          ? "bg-secondary/15 text-secondary"
                          : "bg-surface-container-high text-on-tertiary-container"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-sm text-on-tertiary-container line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="mt-3 text-xs text-on-tertiary-container">
                    /blog/{post.slug}
                    {post.publishedAt
                      ? ` · ${formatDate(post.publishedAt)}`
                      : " · Not published"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 shrink-0">
                  {post.published ? (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center justify-center rounded-lg border border-outline-variant/30 px-4 py-2 text-sm font-headline font-bold uppercase tracking-wide text-on-surface hover:bg-surface-container-high transition-colors"
                    >
                      View
                    </Link>
                  ) : null}
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="inline-flex items-center justify-center rounded-lg border border-outline-variant/30 px-4 py-2 text-sm font-headline font-bold uppercase tracking-wide text-on-surface hover:bg-surface-container-high transition-colors"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    endpoint={`/api/admin/blog/${post.id}`}
                    confirmMessage={`Delete post "${post.title}"?`}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
