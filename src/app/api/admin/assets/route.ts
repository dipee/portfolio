import { NextResponse } from "next/server";
import { apiErrorMessage } from "@/lib/api-error";
import { getAllAssetMeta } from "@/lib/assets";
import { requireAdmin } from "@/lib/auth/require-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const assets = await getAllAssetMeta();
    return NextResponse.json(assets);
  } catch {
    return NextResponse.json({ error: apiErrorMessage("fetch assets") }, { status: 500 });
  }
}
