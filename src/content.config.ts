import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { promptSchema } from "./schema/prompt";

const prompts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/prompts" }),
  schema: promptSchema,
});

export const collections = {
  prompts,
};
