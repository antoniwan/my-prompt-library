# Prompt content schema (canonical reference)

This document is the **canonical list** of prompt frontmatter fields. It must stay in sync with `src/content.config.ts`. When adding or removing fields, update both this file and the Zod schema.

**Source of truth:** `src/content.config.ts`.

---

## Required fields

| Field        | Type     | Description |
| ------------ | -------- | ----------- |
| `title`      | string   | Display title of the prompt. |
| `slug`       | string   | URL segment; must match filename without `.md` (e.g. `my-prompt.md` → `slug: my-prompt`). |
| `tags`       | string[] | Array of tag slugs used for filtering and `/tags/[tag]/`. |
| `author`     | string   | Author name or handle (attribution). |
| `difficulty` | enum     | `beginner` \| `intermediate` \| `advanced`. |
| `visibility` | enum     | `public` \| `draft`. Default: `public`. Only `public` entries are shown on the site. |
| `created_at` | string   | Date in `YYYY-MM-DD` format. |
| `updated_at` | string   | Date in `YYYY-MM-DD` format. |

## Optional fields

| Field            | Type     | Description |
| ---------------- | -------- | ----------- |
| `summary`        | string   | Short description (e.g. for cards and search). |
| `models_tested`  | string[] | List of model names the prompt was tested with. |
| `quality_score`  | number   | Numeric score from 0 to 5 (inclusive). |

---

**Note:** There is no `use_count` or similar field in the schema. Do not document or add such fields without updating both this file and `src/content.config.ts`.
