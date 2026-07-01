import { prisma } from "@/lib/prisma";
import type { BlogPost, BlogPostSummary } from "@/lib/types";

const postSummarySelect = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  publishedAt: true,
} as const;

export async function getPublishedPosts(): Promise<BlogPostSummary[]> {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: postSummarySelect,
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return prisma.blogPost.findFirst({
    where: { slug, published: true },
  });
}
