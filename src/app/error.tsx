"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-8 text-center">
      <p className="font-label text-xs uppercase tracking-[0.2em] text-error mb-4">Error</p>
      <h1 className="font-headline text-4xl md:text-5xl font-bold text-on-surface mb-4">
        Something went wrong
      </h1>
      <p className="text-on-surface-variant max-w-md mb-8">
        An unexpected error occurred. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="bg-secondary-fixed text-on-secondary-fixed px-6 py-3 rounded-lg font-headline font-bold text-sm uppercase tracking-widest"
      >
        Try again
      </button>
    </div>
  );
}
