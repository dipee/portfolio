import type { Project as PrismaProject, BlogPost as PrismaBlogPost } from "@prisma/client";

export type Project = PrismaProject;
export type BlogPost = PrismaBlogPost;

export type ProjectCardData = Pick<
  Project,
  | "id"
  | "title"
  | "description"
  | "tags"
  | "category"
  | "year"
  | "github"
  | "live"
  | "featured"
  | "gradient"
  | "wide"
>;

export type BlogPostSummary = Pick<
  BlogPost,
  "id" | "slug" | "title" | "excerpt" | "publishedAt"
>;
