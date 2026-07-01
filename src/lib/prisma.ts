import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaDatabaseUrl: string | undefined;
};

function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl && process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL environment variable is not set.");
  }

  return new PrismaClient({
    datasources: databaseUrl ? { db: { url: databaseUrl } } : undefined,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

function getPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL;

  if (
    globalForPrisma.prisma &&
    globalForPrisma.prismaDatabaseUrl === databaseUrl
  ) {
    return globalForPrisma.prisma;
  }

  if (globalForPrisma.prisma) {
    void globalForPrisma.prisma.$disconnect();
  }

  const client = createPrismaClient();

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
    globalForPrisma.prismaDatabaseUrl = databaseUrl;
  }

  return client;
}

export const prisma = getPrismaClient();
