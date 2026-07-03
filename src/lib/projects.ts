import { prisma } from "@/lib/prisma";
import type { Project } from "@/lib/types";

export type ProjectInput = {
  title: string;
  description: string;
  tags: string[];
  category: string;
  year: string;
  github: string;
  live?: string | null;
  featured?: boolean;
  gradient: string;
  wide?: boolean;
};

export async function getProjects(): Promise<Project[]> {
  return prisma.project.findMany({
    orderBy: [{ year: "desc" }, { id: "desc" }],
  });
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return prisma.project.findMany({
    where: { featured: true },
    orderBy: [{ year: "desc" }, { id: "desc" }],
  });
}

export async function getProjectById(id: number): Promise<Project | null> {
  return prisma.project.findUnique({ where: { id } });
}

export async function createProject(data: ProjectInput): Promise<Project> {
  return prisma.project.create({
    data: {
      title: data.title,
      description: data.description,
      tags: data.tags,
      category: data.category,
      year: data.year,
      github: data.github,
      live: data.live ?? null,
      featured: data.featured ?? false,
      gradient: data.gradient,
      wide: data.wide ?? false,
    },
  });
}

export async function updateProject(id: number, data: ProjectInput): Promise<Project> {
  return prisma.project.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      tags: data.tags,
      category: data.category,
      year: data.year,
      github: data.github,
      live: data.live ?? null,
      featured: data.featured ?? false,
      gradient: data.gradient,
      wide: data.wide ?? false,
    },
  });
}

export async function deleteProject(id: number): Promise<void> {
  await prisma.project.delete({ where: { id } });
}
