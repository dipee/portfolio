import { notFound } from "next/navigation";
import BlogPostForm from "@/components/admin/BlogPostForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { PageHeader } from "@/components/admin/FormField";
import { getPostById } from "@/lib/blog";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const postId = Number.parseInt(id, 10);

  if (Number.isNaN(postId)) {
    notFound();
  }

  const post = await getPostById(postId);
  if (!post) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="Edit post"
        description={post.title}
        action={
          <DeleteButton
            endpoint={`/api/admin/blog/${post.id}`}
            confirmMessage={`Delete post "${post.title}"?`}
            redirectTo="/admin/blog"
          />
        }
      />
      <div className="bg-surface-container-low border border-outline-variant/10 rounded-xl p-6 md:p-8">
        <BlogPostForm post={post} />
      </div>
    </div>
  );
}
