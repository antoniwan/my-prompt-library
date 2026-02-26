/**
 * Central URL helpers for prompts, tags, and core pages.
 * Single source of truth for path construction.
 */

/** Used by client-side search to build prompt URLs without duplicating the path pattern. */
export const PROMPT_PATH_PREFIX = "/prompts/";
export const PROMPT_PATH_SUFFIX = "/";

export function promptsIndex(): string {
  return "/prompts/";
}

export function promptDetail(id: string): string {
  return `${PROMPT_PATH_PREFIX}${id}${PROMPT_PATH_SUFFIX}`;
}

export function promptsByDifficulty(difficulty: string): string {
  return `/prompts/?difficulty=${encodeURIComponent(difficulty)}`;
}

export function promptsByAuthor(author: string): string {
  return `/prompts/?author=${encodeURIComponent(author)}`;
}

export function tagsIndex(): string {
  return "/tags/";
}

export function tagDetail(tag: string): string {
  return `/tags/${encodeURIComponent(tag)}/`;
}

export function searchPage(): string {
  return "/search/";
}

export function home(): string {
  return "/";
}
