import { z } from "zod";

/** Difficulty levels for prompts. Single source of truth for schema and UI. */
export const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];

/**
 * Prompt frontmatter schema. Keep in sync with PROMPT-SCHEMA.md and contributor docs.
 * Used by src/content.config.ts and by unit tests.
 */
export const promptSchema = z.object({
  title: z.string(),
  slug: z.string(),
  tags: z.array(z.string()),
  author: z.string(),
  difficulty: z.enum(DIFFICULTIES),
  visibility: z.enum(["public", "draft"]).default("public"),
  created_at: z.string(),
  updated_at: z.string(),
  summary: z.string().optional(),
  models_tested: z.array(z.string()).optional(),
  quality_score: z.number().min(0).max(5).optional(),
});

export type PromptFrontmatter = z.infer<typeof promptSchema>;
