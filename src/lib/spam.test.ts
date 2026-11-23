import { describe, expect, it } from "vitest";

import {
  countLinks,
  HONEYPOT_FIELD,
  isLikelyBot,
  MIN_FILL_MS,
  STARTED_AT_FIELD,
} from "./spam";

const NOW = 1_700_000_000_000;

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

describe("isLikelyBot", () => {
  it("accepts a human-paced submission with an empty honeypot", () => {
    const data = form({
      [HONEYPOT_FIELD]: "",
      [STARTED_AT_FIELD]: String(NOW - MIN_FILL_MS - 1),
    });
    expect(isLikelyBot(data, NOW)).toBe(false);
  });

  it("flags a filled honeypot", () => {
    const data = form({
      [HONEYPOT_FIELD]: "https://spam.example",
      [STARTED_AT_FIELD]: String(NOW - 60_000),
    });
    expect(isLikelyBot(data, NOW)).toBe(true);
  });

  it("flags a missing or malformed timestamp", () => {
    expect(isLikelyBot(form({}), NOW)).toBe(true);
    expect(isLikelyBot(form({ [STARTED_AT_FIELD]: "" }), NOW)).toBe(true);
    expect(isLikelyBot(form({ [STARTED_AT_FIELD]: "abc" }), NOW)).toBe(true);
  });

  it("flags submissions that are too fast or from the future", () => {
    expect(
      isLikelyBot(form({ [STARTED_AT_FIELD]: String(NOW - 500) }), NOW),
    ).toBe(true);
    expect(
      isLikelyBot(form({ [STARTED_AT_FIELD]: String(NOW + 10_000) }), NOW),
    ).toBe(true);
  });
});

describe("countLinks", () => {
  it("counts http(s) and www links", () => {
    expect(countLinks("no links here")).toBe(0);
    expect(countLinks("see https://a.com and http://b.com or www.c.com")).toBe(
      3,
    );
  });
});
