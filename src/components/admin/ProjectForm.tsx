"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckboxField,
  FormActions,
  PrimaryButton,
  SecondaryButton,
  SelectField,
  TextArea,
  TextInput,
} from "@/components/admin/FormField";
import { PROJECT_GRADIENTS, readApiError } from "@/lib/admin-ui";
import type { Project } from "@/lib/types";

type ProjectFormProps = {
  project?: Project;
};

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const isEditing = Boolean(project);

  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [tags, setTags] = useState(project?.tags.join(", ") ?? "");
  const [category, setCategory] = useState(project?.category ?? "");
  const [year, setYear] = useState(project?.year ?? new Date().getFullYear().toString());
  const [github, setGithub] = useState(project?.github ?? "");
  const [live, setLive] = useState(project?.live ?? "");
  const [gradient, setGradient] = useState(
    project?.gradient ?? PROJECT_GRADIENTS[0].value,
  );
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [wide, setWide] = useState(project?.wide ?? false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      title,
      description,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      category,
      year,
      github,
      live: live || null,
      gradient,
      featured,
      wide,
    };

    try {
      const response = await fetch(
        isEditing ? `/api/admin/projects/${project!.id}` : "/api/admin/projects",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        setError(await readApiError(response));
        return;
      }

      router.push("/admin/projects");
      router.refresh();
    } catch {
      setError("Unable to save project. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label="Title"
          id="title"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextInput
          label="Category"
          id="category"
          required
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="FinTech, SaaS, DevOps..."
        />
      </div>

      <TextArea
        label="Description"
        id="description"
        required
        rows={4}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label="Tags"
          id="tags"
          required
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          placeholder="React, FastAPI, Docker"
          hint="Comma-separated list"
        />
        <TextInput
          label="Year"
          id="year"
          required
          value={year}
          onChange={(event) => setYear(event.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label="GitHub URL"
          id="github"
          type="url"
          required
          value={github}
          onChange={(event) => setGithub(event.target.value)}
        />
        <TextInput
          label="Live URL"
          id="live"
          type="url"
          value={live}
          onChange={(event) => setLive(event.target.value)}
          placeholder="Optional"
        />
      </div>

      <SelectField
        label="Gradient"
        id="gradient"
        value={gradient}
        onChange={(event) => setGradient(event.target.value)}
        options={PROJECT_GRADIENTS.map((item) => ({
          label: item.label,
          value: item.value,
        }))}
      />

      <div className={`h-24 rounded-lg bg-gradient-to-br ${gradient}`} />

      <div className="flex flex-wrap gap-6">
        <CheckboxField
          id="featured"
          label="Featured"
          checked={featured}
          onChange={setFeatured}
        />
        <CheckboxField id="wide" label="Wide card" checked={wide} onChange={setWide} />
      </div>

      <FormActions error={error}>
        <PrimaryButton disabled={loading}>
          {loading ? "Saving..." : isEditing ? "Update project" : "Create project"}
        </PrimaryButton>
        <SecondaryButton href="/admin/projects">Cancel</SecondaryButton>
      </FormActions>
    </form>
  );
}
