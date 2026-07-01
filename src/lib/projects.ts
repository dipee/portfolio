import { prisma } from "@/lib/prisma";
import type { Project } from "@/lib/types";

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
