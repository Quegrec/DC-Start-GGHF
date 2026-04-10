import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function validateDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is missing. Create a .env file and set DATABASE_URL (e.g. postgresql://postgres:postgres@localhost:5432/dcstartgghf?schema=public).",
    );
  }

  const isValidProtocol =
    url.startsWith("postgresql://") ||
    url.startsWith("postgres://") ||
    url.startsWith("prisma://") ||
    url.startsWith("prisma+postgres://");

  if (!isValidProtocol) {
    throw new Error(
      `DATABASE_URL has an invalid protocol. Expected postgresql:// (local/dev) or prisma:// / prisma+postgres:// (Prisma Accelerate). Got: ${url.split(":")[0]}://`,
    );
  }
}

validateDatabaseUrl();

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
