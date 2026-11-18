import { afterAll, beforeEach, vi } from "vitest";

import { getTestDatabaseUrl, resetDatabase, testDb } from "./db";

// Fail before any test file (and the app's Prisma client) is imported.
getTestDatabaseUrl();

// Server actions call revalidatePath, which only works inside a Next.js request.
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));

beforeEach(async () => {
  await resetDatabase();
});

afterAll(async () => {
  await testDb.$disconnect();
});
