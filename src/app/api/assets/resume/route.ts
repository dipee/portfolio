import { NextResponse } from "next/server";
import { contentDisposition } from "@/lib/asset-upload";
import { getAssetWithData } from "@/lib/assets";

export const dynamic = "force-dynamic";

export async function GET() {
  const asset = await getAssetWithData("resume");
  if (!asset) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(asset.data), {
    headers: {
      "Content-Type": asset.mimeType,
      "Content-Disposition": contentDisposition(asset.filename, "attachment"),
      "Content-Length": String(asset.data.length),
      "Cache-Control": "public, max-age=3600",
    },
  });
}
