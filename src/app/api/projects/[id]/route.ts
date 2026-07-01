import { NextResponse } from "next/server";
import { apiErrorMessage } from "@/lib/api-error";
import { getProjectById } from "@/lib/projects";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const projectId = Number.parseInt(id, 10);

  if (Number.isNaN(projectId)) {
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
