import { prisma } from "@/lib/prisma";

export const ASSET_KEYS = ["resume", "photo"] as const;
export type AssetKey = (typeof ASSET_KEYS)[number];

export type AssetMeta = {
  key: AssetKey;
  filename: string;
  mimeType: string;
  size: number;
  updatedAt: Date;
};

type AssetMetaRow = {
  key: string;
  filename: string;
  mimeType: string;
  size: number;
  updatedAt: Date;
};

export function isAssetKey(value: string): value is AssetKey {
  return ASSET_KEYS.includes(value as AssetKey);
}

function toMeta(row: AssetMetaRow): AssetMeta {
  return {
    key: row.key as AssetKey,
    filename: row.filename,
    mimeType: row.mimeType,
    size: Number(row.size),
    updatedAt: row.updatedAt,
  };
}

export async function getAsset(key: AssetKey): Promise<AssetMeta | null> {
  const rows = await prisma.$queryRaw<AssetMetaRow[]>`
    SELECT key, filename, "mimeType", octet_length(data) AS size, "updatedAt"
    FROM "SiteAsset"
    WHERE key = ${key}
    LIMIT 1
  `;

  const row = rows[0];
  return row ? toMeta(row) : null;
}

export async function getAssetWithData(key: AssetKey) {
  return prisma.siteAsset.findUnique({ where: { key } });
}

export async function getAllAssetMeta(): Promise<Record<AssetKey, AssetMeta | null>> {
  const rows = await prisma.$queryRaw<AssetMetaRow[]>`
    SELECT key, filename, "mimeType", octet_length(data) AS size, "updatedAt"
    FROM "SiteAsset"
    WHERE key IN ('resume', 'photo')
  `;

  const byKey = new Map(rows.map((row) => [row.key as AssetKey, toMeta(row)]));

  return {
    resume: byKey.get("resume") ?? null,
    photo: byKey.get("photo") ?? null,
  };
}

export async function assetExists(key: AssetKey): Promise<boolean> {
  const asset = await prisma.siteAsset.findUnique({
    where: { key },
    select: { id: true },
  });
  return Boolean(asset);
}

export async function upsertAsset(
  key: AssetKey,
  input: { filename: string; mimeType: string; data: Buffer },
) {
  const data = new Uint8Array(input.data);

  return prisma.siteAsset.upsert({
    where: { key },
    create: {
      key,
      filename: input.filename,
      mimeType: input.mimeType,
      data,
    },
    update: {
      filename: input.filename,
      mimeType: input.mimeType,
      data,
    },
  });
}

export async function deleteAsset(key: AssetKey): Promise<boolean> {
  try {
    await prisma.siteAsset.delete({ where: { key } });
    return true;
  } catch {
    return false;
  }
}
