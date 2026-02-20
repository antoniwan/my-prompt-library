# MPL --- Specifications Document

## 1. Overview

MPL (My Prompt Library) is a Git-native, content-first public prompt
library built with Astro. Markdown files stored in a GitHub repository
act as the single source of truth.

The system prioritizes: - Sovereignty (no database dependency) -
Performance (static-first) - Versioning (Git history) - Curation
(maintainer-reviewed contributions)

------------------------------------------------------------------------

## 2. Architecture

### 2.1 Source of Truth

-   GitHub repository
-   Markdown files
-   Structured frontmatter
-   Version control via PR workflow

### 2.2 Framework

-   Astro (static-first)
-   Content Collections for schema validation
-   Type-safe frontmatter using Zod

### 2.3 Deployment

-   Static site generation
-   Deployed to Vercel (or equivalent static host)
-   Automatic builds on merge to main

------------------------------------------------------------------------

## 3. Content Model

Each prompt is a Markdown file with structured frontmatter.

Example:

## Context

...

## Length

...

## Examples

...

## Prompt

...

------------------------------------------------------------------------

## 4. Folder Structure

/content /prompts sales-follow-up-email.md meeting-summary.md

/imports User-added prompt files (e.g. from Obsidian); not part of the built site until migrated.

/src /pages /prompts /tags /components /layouts /scripts (e.g. migrate-imports)

------------------------------------------------------------------------

## 5. Core Features (v1)

-   Prompt listing page
-   Individual prompt page
-   Tag filtering
-   Search (client-side index)
-   Copy-to-clipboard button
-   Shareable URL per prompt
-   SEO metadata per prompt

------------------------------------------------------------------------

## 6. Search Implementation

-   Build-time JSON index generation
-   Client-side search (Fuse.js or equivalent)
-   Filter by:
    -   Tags
    -   Difficulty
    -   Author

------------------------------------------------------------------------

## 7. Governance Model

-   External contributors submit PRs
-   Maintainer review required
-   Prompts may be edited for clarity and structure
-   Credit preserved in frontmatter

------------------------------------------------------------------------

## 8. Performance Goals

-   Lighthouse score: 95+
-   Zero unnecessary client-side JavaScript
-   Sub-100ms TTFB on static host
-   Fully accessible (WCAG AA)

------------------------------------------------------------------------

## 9. Imports and Migration

-   **Purpose**: Let users add prompts they already have (Obsidian, Notion, other Markdown) without manually writing frontmatter.
-   **Location**: Files placed in `imports/` (or subfolders); `imports/README.md` documents the workflow.
-   **Migration script**: Run via `pnpm run migrate`. Reads all `.md` in `imports/` (except `README.md`), parses frontmatter and body, maps to the content collection schema, and writes to `content/prompts/{slug}.md`.
-   **Frontmatter mapping**: Title from frontmatter or first `#` heading or filename; slug from frontmatter or slugified title; tags from frontmatter (array or comma-separated) or optional enhancement from `#hashtags` in body; author, difficulty, visibility, dates from frontmatter or defaults.
-   **Output**: Each migrated file has full required frontmatter and unchanged body; dates emitted as quoted strings for schema compatibility. User can then edit the new file in `content/prompts/` and delete or keep the original in `imports/`.

------------------------------------------------------------------------

## 10. Future Extensibility

-   Parameterized prompts
-   CLI integration
-   VS Code extension
-   API endpoint exporting prompt JSON
-   Optional authentication layer (v2)
