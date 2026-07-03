import type { AssetKey } from "@/lib/assets";

const RESUME_MAX_BYTES = 5 * 1024 * 1024;
const PHOTO_MAX_BYTES = 2 * 1024 * 1024;

const RESUME_MIME_TYPES = new Set(["application/pdf"]);
const PHOTO_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

type UploadRules = {
  allowedMimeTypes: Set<string>;
  maxBytes: number;
  label: string;
};

const rulesByKey: Record<AssetKey, UploadRules> = {
  resume: {
    allowedMimeTypes: RESUME_MIME_TYPES,
    maxBytes: RESUME_MAX_BYTES,
    label: "Resume",
  },
  photo: {
    allowedMimeTypes: PHOTO_MIME_TYPES,
    maxBytes: PHOTO_MAX_BYTES,
    label: "Photo",
  },
};

export type ParsedUpload =
  | { data: { filename: string; mimeType: string; data: Buffer } }
  | { error: string };

export async function parseAssetUpload(
  request: Request,
  key: AssetKey,
): Promise<ParsedUpload> {
  const rules = rulesByKey[key];

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return { error: "Invalid form data" };
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { error: "File is required" };
  }

  if (!file.size) {
    return { error: "File is empty" };
  }

  if (file.size > rules.maxBytes) {
    const maxMb = rules.maxBytes / (1024 * 1024);
    return { error: `${rules.label} must be ${maxMb}MB or smaller` };
  }

  const mimeType = file.type || "application/octet-stream";
  if (!rules.allowedMimeTypes.has(mimeType)) {
    if (key === "resume") {
      return { error: "Resume must be a PDF file" };
    }
    return { error: "Photo must be a JPEG, PNG, or WebP image" };
  }

  const filename = file.name.trim() || `${key}.${mimeType.split("/")[1] ?? "bin"}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  return {
    data: {
      filename,
      mimeType,
      data: buffer,
    },
  };
}

export function contentDisposition(filename: string, disposition: "inline" | "attachment") {
  const safeName = filename.replace(/["\r\n]/g, "_");
  return `${disposition}; filename="${safeName}"`;
}
