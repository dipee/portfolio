export const PROJECT_GRADIENTS = [
  { label: "Deep Blue", value: "from-[#002b48] to-[#0d3d6e]" },
  { label: "Midnight", value: "from-[#1a2a3e] to-[#002b48]" },
  { label: "Slate", value: "from-[#171f33] to-[#2d3449]" },
  { label: "Void", value: "from-[#060e20] to-[#131b2e]" },
  { label: "Ocean", value: "from-[#0b1c30] to-[#1a2a3e]" },
] as const;

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function readApiError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { error?: string };
    return data.error ?? "Something went wrong";
  } catch {
    return "Something went wrong";
  }
}
