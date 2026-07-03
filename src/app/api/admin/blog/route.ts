import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { parseBlogPostInput } from "@/lib/admin-validation";
import { apiErrorMessage } from "@/lib/api-error";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createPost, getAllPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: apiErrorMessage("fetch blog posts") }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const parsed = parseBlogPostInput(body);
    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const post = await createPost(parsed.data);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: apiErrorMessage("create blog post") }, { status: 500 });
  }
}
