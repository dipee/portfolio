import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";
import { PageHeader } from "@/components/admin/FormField";
import { getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Create and update portfolio projects."
        action={
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-3 text-sm font-headline font-bold uppercase tracking-wide text-on-secondary hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            New project
          </Link>
        }
      />

      {projects.length === 0 ? (
        <p className="text-on-tertiary-container">No projects yet.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <article
              key={project.id}
              className="bg-surface-container-low border border-outline-variant/10 rounded-xl p-5 md:p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h2 className="font-headline text-xl font-bold text-on-surface">
                      {project.title}
                    </h2>
                    {project.featured ? (
                      <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded bg-secondary/15 text-secondary">
                        Featured
                      </span>
                    ) : null}
                    {project.wide ? (
                      <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded bg-surface-container-high text-on-tertiary-container">
                        Wide
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm text-on-tertiary-container line-clamp-2">
                    {project.description}
                  </p>
                  <p className="mt-3 text-xs text-on-tertiary-container">
                    {project.category} · {project.year} · {project.tags.join(", ")}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 shrink-0">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="inline-flex items-center justify-center rounded-lg border border-outline-variant/30 px-4 py-2 text-sm font-headline font-bold uppercase tracking-wide text-on-surface hover:bg-surface-container-high transition-colors"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    endpoint={`/api/admin/projects/${project.id}`}
                    confirmMessage={`Delete project "${project.title}"?`}
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
