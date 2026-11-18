import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

/**
 * Returns TEST_DATABASE_URL, or throws if it is missing or does not name a
 * database ending in `_test`. Integration tests truncate tables, so this guard
 * keeps them away from the dev/production database in `.env`.
 */
export function getTestDatabaseUrl(): string {
  const url = process.env.TEST_DATABASE_URL;
  if (!url) {
    throw new Error(
      "TEST_DATABASE_URL is not set. Integration tests need a disposable Postgres database, e.g. postgresql://postgres:postgres@localhost:5432/rigocodes_test",
    );
  }

  const dbName = new URL(url).pathname.replace(/^\//, "");
  if (!dbName.endsWith("_test")) {
    throw new Error(
      `Refusing to run integration tests against database "${dbName}": its name must end with "_test".`,
    );
  }

  return url;
}

/** Prisma client used by tests to seed and inspect the test database. */
export const testDb = new PrismaClient({
  adapter: new PrismaPg({ connectionString: getTestDatabaseUrl() }),
});

/** Empties every app table and resets id sequences. Auth tables included. */
export async function resetDatabase() {
  await testDb.$executeRawUnsafe(`
    TRUNCATE TABLE
      "_PostToTag", "Post", "Tag", "Suggestion", "Category", "Message",
      "session", "account", "verification", "user"
    RESTART IDENTITY CASCADE
  `);
}
