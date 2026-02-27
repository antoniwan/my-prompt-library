import { describe, expect, it } from "vitest";
import type { CollectionEntry } from "astro:content";
import { DIFFICULTIES, getTagCounts, getUniqueAuthors, getUniqueTags } from "./prompts";

function mockEntry(
  overrides: Partial<CollectionEntry<"prompts">["data"]> = {}
): CollectionEntry<"prompts"> {
  return {
    id: "mock-id",
    body: "",
    collection: "prompts",
    data: {
      title: "Mock Prompt",
      slug: "mock-prompt",
      tags: ["tag1"],
      author: "Author A",
      difficulty: "beginner",
      visibility: "public",
      created_at: "2025-01-01",
      updated_at: "2025-01-01",
      ...overrides,
    },
  };
}

describe("DIFFICULTIES", () => {
  it("has exactly beginner, intermediate, advanced", () => {
    expect(DIFFICULTIES).toEqual(["beginner", "intermediate", "advanced"]);
  });
});

describe("getUniqueTags", () => {
  it("returns unique tags sorted alphabetically", () => {
    const entries = [
      mockEntry({ tags: ["z-tag", "a-tag"] }),
      mockEntry({ tags: ["a-tag", "m-tag"] }),
    ];
    expect(getUniqueTags(entries)).toEqual(["a-tag", "m-tag", "z-tag"]);
  });

  it("returns empty array for no entries", () => {
    expect(getUniqueTags([])).toEqual([]);
  });
});

describe("getUniqueAuthors", () => {
  it("returns unique authors sorted alphabetically", () => {
    const entries = [
      mockEntry({ author: "Zoe" }),
      mockEntry({ author: "Alice" }),
      mockEntry({ author: "Alice" }),
    ];
    expect(getUniqueAuthors(entries)).toEqual(["Alice", "Zoe"]);
  });

  it("returns empty array for no entries", () => {
    expect(getUniqueAuthors([])).toEqual([]);
  });
});

describe("getTagCounts", () => {
  it("returns tag names with counts sorted by tag name", () => {
    const entries = [
      mockEntry({ tags: ["js", "ts"] }),
      mockEntry({ tags: ["ts"] }),
      mockEntry({ tags: ["js"] }),
    ];
    expect(getTagCounts(entries)).toEqual([
      { tag: "js", count: 2 },
      { tag: "ts", count: 2 },
    ]);
  });

  it("returns empty array for no entries", () => {
    expect(getTagCounts([])).toEqual([]);
  });
});
