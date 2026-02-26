## Technical Audit — My Prompt Library (MPL)

**Date:** 2026-02-26  
**Scope:** Structural integrity, maintainability, performance, clarity, scalability, and entropy control.

---

## Context & Stack Summary

- **Primary languages**: TypeScript (config and some script blocks), JavaScript (inline scripts), Astro templates (`.astro`).
- **Framework / runtime**: Astro 5.x (static-first SSG on Node), Vite bundler (via Astro).
- **Build tooling**: `astro dev/build/preview` plus Vite; Tailwind 4 via `@tailwindcss/vite`.
- **Package manager**: npm-compatible scripts; repository docs prefer `pnpm` (`pnpm run dev/build/migrate`).
- **Deployment target**: Static hosting (Vercel / Netlify / Cloudflare Pages). No server runtime, no database.
- **Project type**: Static content site for a Git-native prompt library (content-first).
- **Testing setup**: None (no test runner, no test scripts, no test files).
- **Linting / formatting**: None (no ESLint, Prettier, Biome, or equivalents detected).

Assumption for scaling: 10x more prompts, tags, and pages; more contributors; still static, no backend.

---

## 1. Executive Summary

The codebase is small, focused, and generally clean. It uses Astro Content Collections with Zod schemas, a clear folder structure, and minimal client-side JavaScript. The primary long-term risks are:

- Absence of **tests** and **linting/formatting**, which increases regression risk as contributors and prompts grow.
- A **duplicated search index** (full prompt/tag/page data and JS) embedded into every page via the header search bar.
- Minor **schema–script–documentation drift** between the content schema, migration script, and docs.
- An **unused dependency** (`fuse.js`) and slightly misleading agent docs referencing Fuse-based search when the implementation is custom.
- Lack of **CI** and automated checks.

Targeted changes in these areas will improve maintainability and performance without altering features.

---

## 2. Architecture Review

### 2.1 Folder and module structure

- `content/prompts/`: Markdown prompt files with strict frontmatter. Source of truth for prompts.
- `src/content.config.ts`: Astro Content Collection schema (Zod) for `prompts`.
- `src/pages/`: Astro pages (`/`, `/prompts/`, `/prompts/[id]/`, `/tags/`, `/tags/[tag]/`, `/search/`, `/404/`).
- `src/layouts/`: Shared `Layout.astro` (shell: header, footer, theme, search).
- `src/components/`: Shared UI pieces (`PromptCard`, `TagPill`, `SearchBar`, `ThemeToggle`, `PageHeader`).
- `AGENTS/`: Requirements, specifications, expectations, TODO/AUDIT docs for AI agents and maintainers.

The structure is clear and aligned with Astro conventions. Pages are thin, and reusable concerns are factored into components and a shared layout.

### 2.2 Separation of concerns and coupling

- **Content vs presentation**: Content lives in markdown; schema and loaders are in `content.config.ts`. Presentation is in `.astro` components. This is good separation.
- **Domain vs infrastructure vs UI**:
  - Domain: prompt metadata and content live in markdown + content schema.
  - Infrastructure: Astro Content Collections, filesystem loader, migration script.
  - UI: Astro pages/layouts/components.
- **Tight coupling**:
  - Many pages repeat the same `getCollection("prompts", ...)` logic and derive tags/authors/sorts independently, leading to copy-paste and subtle drift risks.
  - `Layout.astro` imports `package.json` directly to display the project version, coupling layout to the repo root filesystem shape.
  - `SearchBar.astro` performs its own `getCollection` call and computes its own search index, separate from `search/index.astro`.

There are no obvious circular imports; the graph is small and mostly one-directional (pages → layout/components → content collections).

### 2.3 Patterns

- Pattern is a simple **content-first static site** with a shared layout and statically generated pages; not strict MVC, but conceptually a thin “view layer” over a content model.
- Search is implemented as:
  - A header search component using an inlined index and client-side filtering logic.
  - A full search page with its own inlined index and filtering logic.

**Recommendation:** Introduce a small “data layer” module for prompts (e.g. `src/data/prompts.ts`) to centralize:

- Public prompt retrieval (`getPublicPrompts()`).
- Sorting (by `updated_at`).
- Aggregate data (tag counts, author list).

Pages and search components can then import from that module, instead of reimplementing logic.

---

## 3. Dependency Audit

### 3.1 Runtime and dev dependencies

From `package.json`:

- **dependencies**
  - `astro`: core framework and content collections (essential).
  - `tailwindcss`: design system and utility classes (used in `global.css` via `@import "tailwindcss";`).
  - `@tailwindcss/vite`: Tailwind 4 plugin integrated into Vite (configured in `astro.config.mjs`).
  - `fuse.js`: **unused** (no imports in `src/` or scripts).
-- **devDependencies**: none.

### 3.2 Findings

- **Unused package**: `fuse.js` is installed but not used. Search implementation is custom; TODO docs referencing Fuse are out of date.
- **Transitive risk**: Limited dependency set; primary exposure is via Astro/Vite/Tailwind and `gray-matter`. Risk is moderate but acceptable; keep deps updated.
- **Redundancy**: No overlapping libraries for routing, styling, or data fetching.

### 3.3 Recommendations

- **Remove `fuse.js`** from `dependencies` and the lockfile to reduce install size and vulnerability surface.
- Ensure `gray-matter` remains in `devDependencies` and not moved to runtime.

---

## 4. Performance Analysis

### 4.1 Frontend / bundle-level

- Astro output is **static HTML** with a small CSS bundle (`/_astro/index.*.css`) and a limited amount of inline JavaScript per page.
- Theme initialization (critical CSS + theme script + service worker registration) is inlined in the `<head>` of every page. This is acceptable given low script size and high UX value (FOUC avoidance).
- Header search (`SearchBar.astro`) inlines:
  - A full `searchData` array (prompts + tags + “core pages”).
  - A non-trivial custom search class (`SearchBar`).
  - This script and data are included on every page via `Layout.astro`.
- `search/index.astro` also assembles its own `searchIndex` array and embeds a separate search script.

**Issue:** At 10x prompts and tags, the per-page HTML size will grow proportionally because each page includes the full search index for the header, plus the search page includes another index. This is particularly wasteful on pages where users might not use the header search.

### 4.2 Static output size and build

- Build completes in ~2 seconds and generates ~30 static pages. Folder listing shows ~39 files in `dist/` (HTML pages, CSS, icons, sw.js, etc.).
- There is no evidence of large JS bundles; complexity is mostly in HTML + CSS + small inline scripts.

### 4.3 Algorithmic considerations

- Search logic (both header and full page) is an O(N) scan across prompts per query, with simple string matching and scoring. With a few hundred prompts, this remains viable.
- Filtering by difficulty/author/tag is done on small, in-memory arrays; no expensive operations or nested scans of concern.

### 4.4 Recommendations

1. **Move header search index to a shared JSON asset**
   - Generate a single `search-index.json` at build time (e.g. via a dedicated Astro endpoint or by emitting a static asset using a small script).
   - Have the header `SearchBar` fetch this JSON on first focus or when the user types.
   - This removes the large `searchData` array and `SearchBar` class from every page’s HTML.

2. **Use a “lite” index for header search**
   - For the global header search, limit data to `{ type, id, title, url, optional short description }`.
   - Reserve heavier fields (e.g. `bodyExcerpt`) for the full search page index only.

3. **Keep search result caps**
   - Retain the `slice(0, 50)` cap on results in `search/index.astro`.
   - Consider trimming `bodyExcerpt` to ~300–400 characters to keep the in-page index light.

4. **Service worker**
   - The current `sw.js` is a no-op and is registered on every page. Either:
     - Remove registration if offline support/caching is not planned, or
     - Replace with a minimal caching strategy once performance requirements justify it.

---

## 5. Code Quality & Consistency

### 5.1 Naming and duplication

- Naming is generally clear and consistent (`PromptCard`, `TagPill`, `ThemeToggle`, `PageHeader`).
- There is duplication in:
  - Difficulty lists (arrays repeated in multiple files).
  - Prompt aggregation (`getCollection` + filter + sort + tag/author sets).
  - Search index construction (header vs full search page).

### 5.2 Types and strictness

- `tsconfig.json` extends `astro/tsconfigs/strict`, which is good.
- Many inline scripts in `.astro` files are **not typed** or are loosely typed, especially in `SearchBar.astro` and `search/index.astro`.

### 5.3 Error handling, logging, observability

- Theme and service worker registration script swallows errors silently (`catch {}`).
- Search code shows basic user-facing errors (“search failed to load”) but does not log them, making debugging harder in development.
- There is no structured logging or analytics. Given the static nature of the site, this is not critical but should be considered if usage metrics become important.

### 5.4 Linting and formatting

- No ESLint, Prettier, or Biome configuration present.
- Code style is manually consistent, but that will drift with more contributors.

### 5.5 Recommendations

1. **Add linting and formatting**
   - Introduce ESLint with `eslint-plugin-astro` and TypeScript support, or Biome as an all-in-one alternative.
   - Enforce: unused variables, consistent return types, no-undef, and Astro-specific best practices.
   - Add Prettier or rely on Biome for formatting; configure format-on-save.

2. **Type the migration script**
   - Convert `scripts/migrate-imports.mjs` to TypeScript (e.g. `.mts`) and use `tsx` or a small build step to run it.
   - Define interfaces for frontmatter and options so changes surface at compile time.

3. **Centralize constants**
   - Extract shared enums/constants (e.g. difficulties) into a single module and import them where needed.

4. **Improve error handling**
   - In dev builds, log search and theme errors to `console.error` or `console.warn` while still providing user-friendly messages.

---

## 6. Configuration & Tooling

- `astro.config.mjs`:
  - Uses `@tailwindcss/vite` plugin to wire Tailwind 4 into Vite.
  - Does **not** set `site`, so canonical and structured data URLs fall back to path-only behavior.
- `tsconfig.json`:
  - Extends Astro strict preset and includes all files except `dist/`.
- `.vscode/settings.json`:
  - Only customizes the color theme for easy project identification; no formatting or linting hooks.
- No `.github/workflows` or other CI configuration detected.

### Recommendations

1. **Set `site` in `astro.config.mjs`**
   - Define the production URL to enable correct canonical links and structured data URLs.

2. **Add CI**
   - Use GitHub Actions (or similar) to run:
     - Install.
     - `npm run build`.
     - `npm run lint` and `npm run test` (once introduced).

3. **Clarify package manager**
   - Decide on a primary package manager (likely `pnpm`, as used in docs).
   - Document it in `README.md` and/or `CONTRIBUTING.md`.

---

## 7. Data & State Management

- Global state is minimal:
  - Theme (`data-theme` attribute on `<html>` and `localStorage["theme"]`).
  - Header search dropdown state (purely client-side and ephemeral).
- Page content is fully static; no runtime data fetching.
- No shared client-side global store (e.g. Redux, Zustand), which is appropriate for this project.

### Recommendations

- Keep state local to components. No need for a global store at current scope.
- Ensure theme state changes are idempotent and synchronized across tabs (already partially handled via `storage` event).

---

## 8. Security & Risk Surface

- No backend, no authentication, and no API keys in the frontend.
- All content is repository-controlled markdown, with contribution gated by PR review.
- Migration script runs locally; no network access.

### Recommendations

- Continue to enforce PR-based contributions and review frontmatter and content carefully.
- Maintain dependency updates to minimize transitive vulnerability risk.

---

## 9. Maintenance & Scalability

### 9.1 Patterns that may degrade at scale

- **Header search index duplication**:
  - Biggest risk for bloat as prompt and tag counts increase.
- **Copy-paste of collection logic**:
  - Multiple files repeat `getCollection` and common transforms, increasing the cost of changes.
- **Lack of automated checks**:
  - With more contributors, absence of tests and lint leads to subtle regressions.

### 9.2 Documentation and implicit knowledge

- AGENTS docs (REQUIREMENTS, SPECIFICATIONS, EXPECTATIONS, TODO) are strong and explicit.
- Some drift between SPEC (Fuse.js) and actual implementation (custom search) plus minor encoding issues in `AGENTS/TODO.md`.

### Recommendations

- Keep AGENTS docs as the **single source of truth** but ensure they are regularly updated alongside code changes (especially search implementation details).
- Fix encoding issues in `AGENTS/TODO.md` and align descriptions with current behavior (e.g. “client-side search (custom)”).

---

## 10. Refactoring Roadmap (Ordered by Architectural Leverage)

1. **Align content schema and documentation** ✓ *Done*
   - Add or remove fields like `use_count` consistently across `content.config.ts` and contributor-facing docs. *Canonical reference added in `PROMPT-SCHEMA.md`; README and CONTRIBUTING updated to match schema (visibility default, quality_score 0–5, models_tested type); schema comment added in `content.config.ts`.*

2. **Remove `fuse.js` and update AGENTS references** ✓ *Done*
   - Clarify that search is implemented via a custom index and scoring. *`fuse.js` removed from dependencies; search remains custom (no Fuse).*

3. **Introduce a central prompt data module** ✓ *Done*
   - Implement `getPublicPrompts()` and helper functions in `src/data/prompts.ts`.
   - Refactor pages and search components to rely on it. *Added `src/data/prompts.ts` with `getPublicPrompts()`, `getUniqueTags()`, `getUniqueAuthors()`, `getTagCounts()`, and `DIFFICULTIES`; all pages and `SearchBar.astro` now use it.*

4. **Externalize header search index**
   - Build and serve a single `search-index.json`.
   - Update `SearchBar.astro` to fetch and cache this index on demand.

5. **Add linting + formatting**
   - ESLint (with Astro + TS) and Prettier or Biome.
   - Establish a standard coding style for all contributors.

6. **Introduce tests and CI**
   - Start with unit tests for the content schema and migration script.
   - Add a GitHub Actions workflow for build, lint, and tests on PRs.

7. **Type and harden the migration script**
   - Convert to TypeScript with explicit types.
   - Add tests for slug generation, date handling, tag extraction, and frontmatter formatting.

8. **Set `site` in `astro.config.mjs`**
   - Improve SEO and consistency of structured data URLs.

9. **Deduplicate constants and utilities**
   - Extract difficulties, URL helpers, and shared class names/variants where appropriate.

10. **Optional performance tweaks**
    - Optimize font loading (preload, `font-display`).
    - Refine service worker usage (either remove or implement minimal caching).

This roadmap focuses on consolidating data and behavior, removing dead weight, and introducing guardrails (lint, tests, CI) before tackling smaller polish tasks.
