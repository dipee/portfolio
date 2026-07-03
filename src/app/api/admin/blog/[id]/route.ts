import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { parseBlogPostInput } from "@/lib/admin-validation";
import { apiErrorMessage } from "@/lib/api-error";
import { requireAdmin } from "@/lib/auth/require-admin";
import { deletePost, getPostById, updatePost } from "@/lib/blog";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function parseId(id: string): number | null {
  const postId = Number.parseInt(id, 10);
  return Number.isNaN(postId) ? null : postId;
}

export async function GET(_request: Request, context: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  const postId = parseId(id);
  if (postId === null) {
    return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
  }

  try {
    const post = await getPostById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: apiErrorMessage("fetch blog post") }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  const postId = parseId(id);
  if (postId === null) {
    return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
  }

  try {
    const existing = await getPostById(postId);
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const body = await request.json();
    const parsed = parseBlogPostInput(body);
    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const post = await updatePost(postId, parsed.data);
    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: apiErrorMessage("update blog post") }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  const postId = parseId(id);
  if (postId === null) {
    return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
  }

  try {
    const existing = await getPostById(postId);
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await deletePost(postId);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: apiErrorMessage("delete blog post") }, { status: 500 });
  }
}
