import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth/session";

export async function requireAdmin(): Promise<NextResponse | null> {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
