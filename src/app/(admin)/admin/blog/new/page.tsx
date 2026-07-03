import { PageHeader } from "@/components/admin/FormField";
import BlogPostForm from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <PageHeader title="New post" description="Write a new blog post." />
      <div className="bg-surface-container-low border border-outline-variant/10 rounded-xl p-6 md:p-8">
        <BlogPostForm />
      </div>
    </div>
  );
}
