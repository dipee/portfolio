import { NextResponse } from "next/server";
import { parseProjectInput } from "@/lib/admin-validation";
import { apiErrorMessage } from "@/lib/api-error";
import { requireAdmin } from "@/lib/auth/require-admin";
import { deleteProject, getProjectById, updateProject } from "@/lib/projects";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function parseId(id: string): number | null {
  const projectId = Number.parseInt(id, 10);
  return Number.isNaN(projectId) ? null : projectId;
}

export async function GET(_request: Request, context: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  const projectId = parseId(id);
  if (projectId === null) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }

  try {
    const project = await getProjectById(projectId);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: apiErrorMessage("fetch project") }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  const projectId = parseId(id);
  if (projectId === null) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }

  try {
    const existing = await getProjectById(projectId);
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const body = await request.json();
    const parsed = parseProjectInput(body);
    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const project = await updateProject(projectId, parsed.data);
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: apiErrorMessage("update project") }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  const projectId = parseId(id);
  if (projectId === null) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }

  try {
    const existing = await getProjectById(projectId);
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await deleteProject(projectId);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: apiErrorMessage("delete project") }, { status: 500 });
  }
}
