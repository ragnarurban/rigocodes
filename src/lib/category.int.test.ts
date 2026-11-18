import { describe, expect, it } from "vitest";

import { testDb } from "@/test/integration/db";

import { getCategories, getCategory } from "./category";

async function seedCategories() {
  // Ids restart at 1 after each reset, so "uncategorized" gets id 1.
  await testDb.category.createMany({
    data: [
      { key: "uncategorized", name: "Uncategorized", translationKey: "Uncat" },
      { key: "web-dev", name: "Web Dev", translationKey: "WebDev" },
      { key: "game-dev", name: "Game Dev", translationKey: "GameDev" },
    ],
  });
}

describe("category queries", () => {
  it("getCategories leaves out the category with id 1", async () => {
    await seedCategories();

    const categories = await getCategories();

    expect(categories.map((c) => c.key)).toEqual(["web-dev", "game-dev"]);
  });

  it("getCategory finds a category by key", async () => {
    await seedCategories();

    const category = await getCategory("web-dev");

    expect(category).toMatchObject({ key: "web-dev", name: "Web Dev" });
  });

  it("getCategory returns null for an unknown key", async () => {
    await seedCategories();

    expect(await getCategory("does-not-exist")).toBeNull();
  });
});
