import { NextResponse } from "next/server";
import { apiErrorMessage } from "@/lib/api-error";
import { getPublishedPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await getPublishedPosts();
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: apiErrorMessage("fetch blog posts") }, { status: 500 });
  }
}
