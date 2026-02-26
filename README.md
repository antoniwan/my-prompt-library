# My Prompt Library (MPL)

A small, Git-native library of structured prompts. Markdown files in this repository are the source of truth. There is no database or runtime backend.

## Prerequisites

- **Node.js** 18+ (Astro 5 requirement; repo does not pin a version)
- **npm** or **pnpm**

## Setup

```bash
npm install
```

Or with pnpm:

```bash
pnpm install
```

No environment variables are required.

## Run

```bash
npm run dev
```

Open **[http://localhost:4321](http://localhost:4321)**. You should see the home page and be able to open **Prompts**, open a prompt, use the search bar, and filter on `/prompts/` by tag, difficulty, and author.

## Project Structure


| Path                    | Purpose                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| `content/prompts/`      | Prompt Markdown files. Filename (without `.md`) = URL slug.                                      |
| `src/content.config.ts` | Content collection schema (Zod). Defines required frontmatter and validation.                    |
| `src/pages/`            | Astro routes: `/`, `/prompts/`, `/prompts/[id]/`, `/tags/`, `/tags/[tag]/`, `/search/`, `/404`.  |
| `src/layouts/`          | Shared layout (header, footer, theme, search).                                                   |
| `src/components/`       | Reusable UI: `PromptCard`, `TagPill`, `SearchBar`, `ThemeToggle`, `PageHeader`, `ButtonPrimary`. |
| `src/styles/global.css` | Global design tokens and Tailwind import.                                                        |
| `public/`               | Static assets (favicons, PWA, images).                                                           |


## How to Make a Change

**Add a prompt**

1. Add a new `.md` file under `content/prompts/`. Use the filename as the slug (e.g. `my-prompt-name.md` → slug `my-prompt-name`).
2. Include required frontmatter (see `src/content.config.ts`): `title`, `slug`, `tags` (array), `author`, `difficulty` (`beginner`  `intermediate`  `advanced`), `visibility` (`public`  `draft`), `created_at`, `updated_at` (YYYY-MM-DD). Optional: `summary`, `models_tested`, `quality_score`.
3. Run `npm run dev` and open `/prompts/` or the new `/prompts/<slug>/` to confirm it appears. Only `visibility: public` entries are shown on the site.

**Modify behavior or UI**

- Edit the relevant page in `src/pages/`, component in `src/components/`, or layout in `src/layouts/`. Styling: `src/styles/global.css` or Tailwind classes in components.

**Test and verify**

- `npm run dev` — confirm locally.
- `npm run build` — must complete without errors. Preview with `npm run preview`.

There are no test scripts or lint/format config in the repo; validation is via the content schema (build fails if frontmatter is invalid) and manual checks.

## Known Constraints

- **Slug = filename:** The prompt URL is `/prompts/<id>/`. With the glob loader, `id` is the file path relative to `content/prompts/` without the `.md` extension. The `slug` in frontmatter should match the filename (e.g. `my-prompt.md` → `slug: my-prompt`). Mismatches can break links.
- **Visibility:** Only entries with `visibility: public` are included in lists, tags, search, and `getStaticPaths`. `draft` entries exist in the repo but are never rendered on the site.
- **Schema is strict:** Adding or changing frontmatter fields requires updating `src/content.config.ts` (Zod schema). Invalid or missing required fields cause the build to fail.
- **Search index:** Header search and the `/search/` page each build their own in-memory index from the prompts collection; there is no shared search module. Changing what’s searchable (e.g. new fields) may require edits in both `SearchBar.astro` and `search/index.astro`.

