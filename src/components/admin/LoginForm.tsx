"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormActions, PrimaryButton, TextInput } from "@/components/admin/FormField";
import { readApiError } from "@/lib/admin-ui";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError(await readApiError(response));
        return;
      }

      const from = searchParams.get("from");
      const destination =
        from && from.startsWith("/admin") && from !== "/admin/login" ? from : "/admin";
      router.push(destination);
      router.refresh();
    } catch {
      setError("Unable to sign in. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <p className="text-secondary font-headline font-bold tracking-widest uppercase text-xs mb-3">
          Admin Access
        </p>
        <h1 className="font-headline text-4xl font-bold tracking-tight text-on-surface mb-2">
          Sign in
        </h1>
        <p className="text-on-tertiary-container mb-8">
          Enter the admin password to manage projects and blog posts.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-low border border-outline-variant/10 rounded-xl p-6 space-y-6"
        >
          <TextInput
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <FormActions error={error}>
            <PrimaryButton disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </PrimaryButton>
          </FormActions>
        </form>
      </div>
    </div>
  );
}
