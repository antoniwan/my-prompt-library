/**
 * Shared Tailwind class strings for consistent form controls and links.
 * Used by filter forms and muted/secondary links across pages.
 */

/** Select used in prompts index filter bar. */
export const filterSelectClasses =
  "rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1.5 text-sm text-[var(--color-foreground)] focus:border-[var(--color-accent)]";

/** Select used in search page filter bar (slightly larger tap target). */
export const filterSelectClassesSearch =
  "rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-foreground)] focus:border-[var(--color-accent)]";

/** Muted text link that highlights on hover/focus (e.g. difficulty/author links on cards). */
export const mutedLinkClasses =
  "text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:underline focus-visible:text-[var(--color-accent)]";
