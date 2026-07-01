import { NextResponse } from "next/server";
import { apiErrorMessage } from "@/lib/api-error";
import { getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: apiErrorMessage("fetch projects") }, { status: 500 });
  }
}
