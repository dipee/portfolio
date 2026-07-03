import { notFound } from "next/navigation";
import DeleteButton from "@/components/admin/DeleteButton";
import { PageHeader } from "@/components/admin/FormField";
import ProjectForm from "@/components/admin/ProjectForm";
import { getProjectById } from "@/lib/projects";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const projectId = Number.parseInt(id, 10);

  if (Number.isNaN(projectId)) {
    notFound();
  }

  const project = await getProjectById(projectId);
  if (!project) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="Edit project"
        description={project.title}
        action={
          <DeleteButton
            endpoint={`/api/admin/projects/${project.id}`}
            confirmMessage={`Delete project "${project.title}"?`}
            redirectTo="/admin/projects"
          />
        }
      />
      <div className="bg-surface-container-low border border-outline-variant/10 rounded-xl p-6 md:p-8">
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
