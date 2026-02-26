/**
 * Site-wide constants for SEO, metadata, and structured data.
 * Single source of truth for site name and default description.
 */

export const SITE_NAME = "My Prompt Library";

export const DEFAULT_DESCRIPTION =
  "A Git-native library of plain-text prompts for AI workflows you control.";

/** Production URL. Used when Astro.site is unset (e.g. dev) and in Organization sameAs. */
export const SITE_URL = "https://mpl.antoniwan.online";

/** Used in WebSite / Organization schema and optional meta. From package.json author. */
export const SITE_AUTHOR = {
  name: "Antonio Rodriguez Martinez",
  url: "https://github.com/antoniwan",
} as const;

/** Twitter/X handle (without @) for twitter:site and twitter:creator. */
export const TWITTER_HANDLE = "antoniwan";

/** Default share image dimensions (Open Graph recommends 1200×630). */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/** Alt text for the default share image. */
export const OG_IMAGE_ALT = "My Prompt Library — Markdown prompts in a Git repo, portable by design.";
