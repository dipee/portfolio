import Link from "next/link";
import { PageHeader } from "@/components/admin/FormField";
import { getAllPosts } from "@/lib/blog";
import { getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [projects, posts] = await Promise.all([getProjects(), getAllPosts()]);
  const publishedPosts = posts.filter((post) => post.published).length;
  const draftPosts = posts.length - publishedPosts;
  const featuredProjects = projects.filter((project) => project.featured).length;

  const cards = [
    {
      href: "/admin/projects",
      label: "Projects",
      value: projects.length,
      detail: `${featuredProjects} featured`,
      icon: "folder_open",
    },
    {
      href: "/admin/blog",
      label: "Blog posts",
      value: posts.length,
      detail: `${publishedPosts} published · ${draftPosts} draft`,
      icon: "article",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Manage portfolio projects and technical writing."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group bg-surface-container-low border border-outline-variant/10 rounded-xl p-6 hover:border-secondary/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-headline font-bold uppercase tracking-widest text-on-tertiary-container">
                  {card.label}
                </p>
                <p className="mt-3 font-headline text-4xl font-bold text-on-surface">
                  {card.value}
                </p>
                <p className="mt-2 text-sm text-on-tertiary-container">{card.detail}</p>
              </div>
              <span className="material-symbols-outlined text-secondary text-[28px]">
                {card.icon}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-3 text-sm font-headline font-bold uppercase tracking-wide text-on-secondary hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New project
        </Link>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/30 px-5 py-3 text-sm font-headline font-bold uppercase tracking-wide text-on-surface hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New post
        </Link>
      </div>
    </div>
  );
}
