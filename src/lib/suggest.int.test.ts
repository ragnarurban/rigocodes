import { beforeEach, describe, expect, it, vi } from "vitest";

import { testDb } from "@/test/integration/db";

import { MIN_FILL_MS, RATE_LIMIT_MAX, STARTED_AT_FIELD } from "./spam";
import { createSuggestion } from "./suggest";

// Return the message key so assertions don't depend on the copy.
vi.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => key,
}));

let categoryId: number;

beforeEach(async () => {
  const category = await testDb.category.create({
    data: { key: "web-dev", name: "Web Dev", translationKey: "WebDev" },
  });
  categoryId = category.id;
});

function suggestionForm(overrides: Record<string, string> = {}) {
  const data = new FormData();
  const fields = {
    topic: "React Server Components",
    category: String(categoryId),
    details: "How do they work under the hood?",
    email: "reader@example.com",
    website: "",
    [STARTED_AT_FIELD]: String(Date.now() - MIN_FILL_MS - 1_000),
    ...overrides,
  };
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

describe("createSuggestion", () => {
  it("stores a valid suggestion", async () => {
    const result = await createSuggestion(null, suggestionForm());

    expect(result).toEqual({ success: "Form submitted!" });
    expect(await testDb.suggestion.count()).toBe(1);
  });

  it("rejects a duplicate topic, ignoring case and surrounding spaces", async () => {
    await createSuggestion(null, suggestionForm());

    const result = await createSuggestion(
      null,
      suggestionForm({
        topic: "  react server COMPONENTS ",
        email: "other@example.com",
      }),
    );

    expect(result).toEqual({ error: "duplicateTopic" });
    expect(await testDb.suggestion.count()).toBe(1);
  });

  it("silently drops bot submissions", async () => {
    const result = await createSuggestion(
      null,
      suggestionForm({ website: "https://spam.example" }),
    );

    expect(result).toEqual({ success: "Form submitted!" });
    expect(await testDb.suggestion.count()).toBe(0);
  });

  it("rate limits repeated submissions from the same email", async () => {
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      await createSuggestion(null, suggestionForm({ topic: `Topic ${i}` }));
    }

    const result = await createSuggestion(
      null,
      suggestionForm({ topic: "One more topic" }),
    );

    expect(result).toEqual({ error: "tooManyRequests" });
    expect(await testDb.suggestion.count()).toBe(RATE_LIMIT_MAX);
  });
});
