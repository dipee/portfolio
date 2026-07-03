import { NextResponse } from "next/server";
import { apiErrorMessage } from "@/lib/api-error";
import { parseAssetUpload } from "@/lib/asset-upload";
import { deleteAsset, getAsset, isAssetKey, upsertAsset } from "@/lib/assets";
import { requireAdmin } from "@/lib/auth/require-admin";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ key: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { key } = await context.params;
  if (!isAssetKey(key)) {
    return NextResponse.json({ error: "Invalid asset key" }, { status: 400 });
  }

  try {
    const parsed = await parseAssetUpload(request, key);
    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    await upsertAsset(key, parsed.data);
    const meta = await getAsset(key);
    return NextResponse.json(meta, { status: 201 });
  } catch (error) {
    console.error(`upload ${key} failed`, error);
    return NextResponse.json(
      { error: apiErrorMessage(`upload ${key}`, error) },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { key } = await context.params;
  if (!isAssetKey(key)) {
    return NextResponse.json({ error: "Invalid asset key" }, { status: 400 });
  }

  try {
    const deleted = await deleteAsset(key);
    if (!deleted) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(`delete ${key} failed`, error);
    return NextResponse.json(
      { error: apiErrorMessage(`delete ${key}`, error) },
      { status: 500 },
    );
  }
}
