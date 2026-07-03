export function apiErrorMessage(context: string, error?: unknown): string {
  if (process.env.NODE_ENV === "development") {
    const detail =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : null;

    if (detail) {
      return `Failed to ${context}: ${detail}`;
    }

    return `Failed to ${context}. Check DATABASE_URL and run db:seed.`;
  }

  return "Internal server error";
}

