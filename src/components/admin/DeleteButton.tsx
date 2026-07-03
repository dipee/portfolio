"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DangerButton } from "@/components/admin/FormField";
import { readApiError } from "@/lib/admin-ui";

type DeleteButtonProps = {
  endpoint: string;
  label?: string;
  confirmMessage: string;
  redirectTo?: string;
};

export default function DeleteButton({
  endpoint,
  label = "Delete",
  confirmMessage,
  redirectTo,
}: DeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!window.confirm(confirmMessage)) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint, { method: "DELETE" });
      if (!response.ok) {
        setError(await readApiError(response));
        return;
      }

      if (redirectTo) {
        router.push(redirectTo);
      }
      router.refresh();
    } catch {
      setError("Delete failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <DangerButton onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : label}
      </DangerButton>
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
