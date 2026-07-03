"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckboxField,
  FormActions,
  PrimaryButton,
  SecondaryButton,
  TextArea,
  TextInput,
} from "@/components/admin/FormField";
import { readApiError, slugify } from "@/lib/admin-ui";
import type { BlogPost } from "@/lib/types";

type BlogPostFormProps = {
  post?: BlogPost;
};

export default function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter();
  const isEditing = Boolean(post);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [published, setPublished] = useState(post?.published ?? false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      title,
      slug,
      excerpt,
      content,
      published,
    };

    try {
      const response = await fetch(
        isEditing ? `/api/admin/blog/${post!.id}` : "/api/admin/blog",
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

      router.push("/admin/blog");
      router.refresh();
    } catch {
      setError("Unable to save post. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TextInput
        label="Title"
        id="title"
        required
        value={title}
        onChange={(event) => handleTitleChange(event.target.value)}
      />

      <TextInput
        label="Slug"
        id="slug"
        required
        value={slug}
        onChange={(event) => {
          setSlugTouched(true);
          setSlug(event.target.value);
        }}
        hint="URL path under /blog/ — lowercase letters, numbers, and hyphens"
      />

      <TextArea
        label="Excerpt"
        id="excerpt"
        required
        rows={3}
        value={excerpt}
        onChange={(event) => setExcerpt(event.target.value)}
      />

      <TextArea
        label="Content"
        id="content"
        required
        rows={16}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        hint="Markdown supported: paragraphs and ## headings"
        className="font-mono text-sm"
      />

      <CheckboxField
        id="published"
        label="Published"
        checked={published}
        onChange={setPublished}
      />

      <FormActions error={error}>
        <PrimaryButton disabled={loading}>
          {loading ? "Saving..." : isEditing ? "Update post" : "Create post"}
        </PrimaryButton>
        <SecondaryButton href="/admin/blog">Cancel</SecondaryButton>
      </FormActions>
    </form>
  );
}
