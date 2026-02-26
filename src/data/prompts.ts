import { getCollection, type CollectionEntry } from "astro:content";

/** Difficulty levels for prompts (matches content schema). */
export const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];

/**
 * Returns all public prompts, sorted by `updated_at` descending (newest first).
 * Single source of truth for prompt retrieval across pages and components.
 */
export async function getPublicPrompts(): Promise<CollectionEntry<"prompts">[]> {
  const entries = await getCollection("prompts", ({ data }) => data.visibility === "public");
  return entries.sort(
    (a, b) => new Date(b.data.updated_at).getTime() - new Date(a.data.updated_at).getTime(),
  );
}

/** Unique tag names from the given prompts, sorted alphabetically. */
export function getUniqueTags(entries: CollectionEntry<"prompts">[]): string[] {
  const set = new Set<string>();
  for (const entry of entries) {
    for (const tag of entry.data.tags) {
      set.add(tag);
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/** Unique author names from the given prompts, sorted alphabetically. */
export function getUniqueAuthors(entries: CollectionEntry<"prompts">[]): string[] {
  const set = new Set<string>();
  for (const entry of entries) {
    set.add(entry.data.author);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/** Tag names with counts, sorted by tag name. */
export function getTagCounts(entries: CollectionEntry<"prompts">[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    for (const tag of entry.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([tag, count]) => ({ tag, count }));
}
