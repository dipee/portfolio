import type { BlogPostInput } from "@/lib/blog";
import type { ProjectInput } from "@/lib/projects";

function asString(value: unknown): string | null {
  return typeof value === "string" ? value.trim() : null;
}

function asOptionalString(value: unknown): string | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  return typeof value === "string" ? value.trim() : null;
}

function asBoolean(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function asStringArray(value: unknown): string[] | null {
  if (Array.isArray(value)) {
    const tags = value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean);
    return tags;
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return null;
}

export function parseProjectInput(
  body: unknown,
): { data: ProjectInput } | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body" };
  }

  const record = body as Record<string, unknown>;
  const title = asString(record.title);
  const description = asString(record.description);
  const tags = asStringArray(record.tags);
  const category = asString(record.category);
  const year = asString(record.year);
  const github = asString(record.github);
  const gradient = asString(record.gradient);
  const live = asOptionalString(record.live);

  if (!title) return { error: "Title is required" };
  if (!description) return { error: "Description is required" };
  if (!tags || tags.length === 0) return { error: "At least one tag is required" };
  if (!category) return { error: "Category is required" };
  if (!year) return { error: "Year is required" };
  if (!github) return { error: "GitHub URL is required" };
  if (!gradient) return { error: "Gradient is required" };

  return {
    data: {
      title,
      description,
      tags,
      category,
      year,
      github,
      live,
      featured: asBoolean(record.featured),
      gradient,
      wide: asBoolean(record.wide),
    },
  };
}

export function parseBlogPostInput(
  body: unknown,
): { data: BlogPostInput } | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body" };
  }

  const record = body as Record<string, unknown>;
  const slug = asString(record.slug);
  const title = asString(record.title);
  const excerpt = asString(record.excerpt);
  const content = asString(record.content);

  if (!slug) return { error: "Slug is required" };
  if (!title) return { error: "Title is required" };
  if (!excerpt) return { error: "Excerpt is required" };
  if (!content) return { error: "Content is required" };

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { error: "Slug must be lowercase letters, numbers, and hyphens only" };
  }

  return {
    data: {
      slug,
      title,
      excerpt,
      content,
      published: asBoolean(record.published),
    },
  };
}
