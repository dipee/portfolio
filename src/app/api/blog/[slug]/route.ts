import { NextResponse } from "next/server";
import { apiErrorMessage } from "@/lib/api-error";
import { getPostBySlug } from "@/lib/blog";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;

  try {
    const post = await getPostBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: apiErrorMessage("fetch blog post") }, { status: 500 });
  }
}
