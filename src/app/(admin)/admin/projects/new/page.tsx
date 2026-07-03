import { PageHeader } from "@/components/admin/FormField";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <PageHeader title="New project" description="Add a project to the portfolio." />
      <div className="bg-surface-container-low border border-outline-variant/10 rounded-xl p-6 md:p-8">
        <ProjectForm />
      </div>
    </div>
  );
}
