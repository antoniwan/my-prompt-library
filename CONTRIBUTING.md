# Contributing to My Prompt Library

Thank you for your interest in contributing. This project is a curated prompt library; all prompts are stored as Markdown files and reviewed by maintainers.

## How to contribute prompts

1. **Fork and clone** this repository.
2. **Add your prompt** as a new Markdown file under `content/prompts/`. Use the filename as the slug (e.g. `my-prompt-name.md`).
3. **Use the required frontmatter** (canonical list: `PROMPT-SCHEMA.md`; schema: `src/content.config.ts`):
   - `title` (string)
   - `slug` (string; must match filename without `.md`)
   - `tags` (array of strings)
   - `author` (your name or handle)
   - `difficulty`: `beginner` | `intermediate` | `advanced`
   - `visibility`: `public` or `draft` (default `public`; only `public` is shown on the site)
   - `created_at`, `updated_at` (YYYY-MM-DD strings)
   - Optional: `summary` (string), `models_tested` (array of strings), `quality_score` (number 0–5)
4. **Structure the body** with sections such as: Context, Length, Examples, Prompt.
5. **Open a Pull Request** with a short description of your prompt.
6. A **maintainer will review** your submission. Prompts may be edited for clarity and structure; author attribution is preserved in frontmatter.

## Governance

- All contributions require maintainer approval (no user-submitted content is published without review).
- **Author attribution is required** — your name or handle must be set in the `author` frontmatter field and is preserved on the prompt.
- This is a static site: no database or server-side runtime. GitHub is the source of truth.

## Questions

Open an issue if you have questions about the format or process.
