import { describe, expect, it } from "vitest";
import { promptSchema } from "./prompt";

const validBase = {
  title: "My Prompt",
  slug: "my-prompt",
  tags: ["tag1", "tag2"],
  author: "Author Name",
  difficulty: "intermediate",
  created_at: "2025-01-01",
  updated_at: "2025-01-15",
};

describe("promptSchema", () => {
  it("accepts valid required fields only", () => {
    const result = promptSchema.safeParse(validBase);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.visibility).toBe("public");
    }
  });

  it("accepts valid data with all optional fields", () => {
    const full = {
      ...validBase,
      visibility: "draft" as const,
      summary: "A short summary",
      models_tested: ["gpt-4", "claude-3"],
      quality_score: 4,
    };
    const result = promptSchema.safeParse(full);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.summary).toBe("A short summary");
      expect(result.data.quality_score).toBe(4);
    }
  });

  it("defaults visibility to public when omitted", () => {
    const result = promptSchema.safeParse(validBase);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.visibility).toBe("public");
    }
  });

  it("rejects invalid difficulty", () => {
    const result = promptSchema.safeParse({
      ...validBase,
      difficulty: "expert",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid visibility", () => {
    const result = promptSchema.safeParse({
      ...validBase,
      visibility: "private",
    });
    expect(result.success).toBe(false);
  });

  it("rejects quality_score above 5", () => {
    const result = promptSchema.safeParse({
      ...validBase,
      quality_score: 6,
    });
    expect(result.success).toBe(false);
  });

  it("rejects quality_score below 0", () => {
    const result = promptSchema.safeParse({
      ...validBase,
      quality_score: -1,
    });
    expect(result.success).toBe(false);
  });

  it("accepts quality_score 0 and 5", () => {
    expect(promptSchema.safeParse({ ...validBase, quality_score: 0 }).success).toBe(true);
    expect(promptSchema.safeParse({ ...validBase, quality_score: 5 }).success).toBe(true);
  });

  it("rejects missing required fields", () => {
    const missingSlug = { ...validBase };
    delete (missingSlug as Record<string, unknown>).slug;
    expect(promptSchema.safeParse(missingSlug).success).toBe(false);
  });

  it("rejects empty tags", () => {
    const result = promptSchema.safeParse({
      ...validBase,
      tags: [],
    });
    expect(result.success).toBe(true);
  });
});
