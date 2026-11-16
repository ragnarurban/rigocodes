import { describe, expect, it } from "vitest";

import { extractHeadings } from "./extract-headings";

describe("extractHeadings", () => {
  it("returns level, text and slug id for each markdown heading", () => {
    const markdown =
      "# Intro\n\nSome text\n\n## Setting Up Next.js\n### Step 1: Install";

    expect(extractHeadings(markdown)).toEqual([
      { level: 1, text: "Intro", id: "intro" },
      { level: 2, text: "Setting Up Next.js", id: "setting-up-nextjs" },
      { level: 3, text: "Step 1: Install", id: "step-1-install" },
    ]);
  });

  it("ignores lines that are not headings", () => {
    const markdown = "Plain paragraph\n#hashtag without space\n    # indented";

    expect(extractHeadings(markdown)).toEqual([]);
  });

  it("returns an empty array for empty input", () => {
    expect(extractHeadings("")).toEqual([]);
  });
});
