/**
 * Site-wide constants for SEO, metadata, and structured data.
 * Single source of truth for site name and default description.
 */

export const SITE_NAME = "My Prompt Library";

export const DEFAULT_DESCRIPTION =
  "A Git-native library of plain-text prompts for AI workflows you control.";

/** Used in WebSite / Organization schema and optional meta. From package.json author. */
export const SITE_AUTHOR = {
  name: "Antonio Rodriguez Martinez",
  url: "https://github.com/antoniwan",
} as const;
