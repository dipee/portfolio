"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DangerButton,
  PrimaryButton,
  SecondaryButton,
} from "@/components/admin/FormField";
import { readApiError } from "@/lib/admin-ui";
import type { AssetKey, AssetMeta } from "@/lib/assets";
import { formatDate } from "@/lib/format";

type SerializableAssetMeta = Omit<AssetMeta, "updatedAt"> & {
  updatedAt: string | Date;
};

type AssetUploadCardProps = {
  assetKey: AssetKey;
  title: string;
  description: string;
  accept: string;
  asset: SerializableAssetMeta | null;
  publicPath: string;
};

function formatBytes(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AssetUploadCard({
  assetKey,
  title,
  description,
  accept,
  asset,
  publicPath,
}: AssetUploadCardProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError("Choose a file first");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`/api/admin/assets/${assetKey}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setError(await readApiError(response));
        return;
      }

      setFile(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      router.refresh();
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete() {
    if (!asset || !window.confirm(`Remove the current ${title.toLowerCase()}?`)) {
      return;
    }

    setDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/assets/${assetKey}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setError(await readApiError(response));
        return;
      }

      router.refresh();
    } catch {
      setError("Delete failed. Try again.");
    } finally {
      setDeleting(false);
    }
  }

  const previewSrc = asset
    ? `${publicPath}?t=${new Date(asset.updatedAt).getTime()}`
    : null;

  return (
    <article className="bg-surface-container-low border border-outline-variant/10 rounded-xl p-6 md:p-8 space-y-6">
      <div>
        <h2 className="font-headline text-xl font-bold text-on-surface">{title}</h2>
        <p className="mt-2 text-sm text-on-tertiary-container">{description}</p>
      </div>

      {asset ? (
        <div className="rounded-lg border border-outline-variant/15 bg-surface-container-lowest p-4 space-y-4">
          {assetKey === "photo" && previewSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewSrc}
              alt="Current profile photo"
              className="h-40 w-40 object-cover rounded-lg border border-outline-variant/20"
            />
          ) : null}

          <div className="text-sm text-on-tertiary-container space-y-1">
            <p>
              <span className="text-on-surface font-medium">File:</span> {asset.filename}
            </p>
            <p>
              <span className="text-on-surface font-medium">Size:</span>{" "}
              {formatBytes(asset.size)}
            </p>
            <p>
              <span className="text-on-surface font-medium">Updated:</span>{" "}
              {formatDate(new Date(asset.updatedAt))}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {assetKey === "resume" ? (
              <SecondaryButton href={publicPath}>Download current</SecondaryButton>
            ) : null}
            <DangerButton onClick={handleDelete} disabled={deleting}>
              {deleting ? "Removing..." : "Remove"}
            </DangerButton>
          </div>
        </div>
      ) : (
        <p className="text-sm text-on-tertiary-container">No file uploaded yet.</p>
      )}

      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label
            htmlFor={`${assetKey}-file`}
            className="block text-xs font-headline font-bold uppercase tracking-widest text-on-tertiary-container mb-2"
          >
            Upload {asset ? "replacement" : "file"}
          </label>
          <input
            ref={inputRef}
            id={`${assetKey}-file`}
            type="file"
            accept={accept}
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="block w-full text-sm text-on-tertiary-container file:mr-4 file:rounded-lg file:border-0 file:bg-secondary/15 file:px-4 file:py-2 file:text-sm file:font-headline file:font-bold file:uppercase file:tracking-wide file:text-secondary hover:file:bg-secondary/25"
          />
        </div>

        {error ? (
          <p className="text-sm text-red-300 bg-red-950/40 border border-red-500/20 rounded-lg px-4 py-3">
            {error}
          </p>
        ) : null}

        <PrimaryButton disabled={uploading || !file}>
          {uploading ? "Uploading..." : asset ? "Replace file" : "Upload file"}
        </PrimaryButton>
      </form>
    </article>
  );
}
