import { prisma } from "@/lib/prisma";
import type { BlogPost, BlogPostSummary } from "@/lib/types";

const postSummarySelect = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  publishedAt: true,
} as const;

export type BlogPostInput = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  published?: boolean;
};

function resolvePublishedAt(
  published: boolean,
  existingPublishedAt: Date | null | undefined,
): Date | null {
  if (!published) {
    return existingPublishedAt ?? null;
  }
  return existingPublishedAt ?? new Date();
}

export async function getPublishedPosts(): Promise<BlogPostSummary[]> {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: postSummarySelect,
  });
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return prisma.blogPost.findMany({
    orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return prisma.blogPost.findFirst({
    where: { slug, published: true },
  });
}

export async function getPostById(id: number): Promise<BlogPost | null> {
  return prisma.blogPost.findUnique({ where: { id } });
}

export async function createPost(data: BlogPostInput): Promise<BlogPost> {
  const published = data.published ?? false;
  return prisma.blogPost.create({
    data: {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      published,
      publishedAt: resolvePublishedAt(published, null),
    },
  });
}

export async function updatePost(id: number, data: BlogPostInput): Promise<BlogPost> {
  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("Post not found");
  }

  const published = data.published ?? false;
  return prisma.blogPost.update({
    where: { id },
    data: {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      published,
      publishedAt: resolvePublishedAt(published, existing.publishedAt),
    },
  });
}

export async function deletePost(id: number): Promise<void> {
  await prisma.blogPost.delete({ where: { id } });
}
