import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/** Prompt frontmatter schema. Keep in sync with PROMPT-SCHEMA.md and contributor docs (README, CONTRIBUTING). */
const prompts = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./content/prompts" }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		tags: z.array(z.string()),
		author: z.string(),
		difficulty: z.enum(["beginner", "intermediate", "advanced"]),
		visibility: z.enum(["public", "draft"]).default("public"),
		created_at: z.string(),
		updated_at: z.string(),
		summary: z.string().optional(),
		models_tested: z.array(z.string()).optional(),
		quality_score: z.number().min(0).max(5).optional(),
	}),
});

export const collections = {
	prompts,
};
