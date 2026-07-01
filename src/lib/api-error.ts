export function apiErrorMessage(context: string): string {
  if (process.env.NODE_ENV === "development") {
    return `Failed to ${context}. Check DATABASE_URL and run db:seed.`;
  }

  return "Internal server error";
}
