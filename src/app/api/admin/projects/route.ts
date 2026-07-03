import { NextResponse } from "next/server";
import { parseProjectInput } from "@/lib/admin-validation";
import { apiErrorMessage } from "@/lib/api-error";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createProject, getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: apiErrorMessage("fetch projects") }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const parsed = parseProjectInput(body);
    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const project = await createProject(parsed.data);
    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json({ error: apiErrorMessage("create project") }, { status: 500 });
  }
}
