# Imports

Drop prompt files here (e.g. from Obsidian, Notion, or plain Markdown) to **migrate** them into the library.

## How it works

1. **Add your files** — Place one or more `.md` files in this folder (or in subfolders; they’re all scanned).
2. **Run the migrator** — From the project root:
   ```bash
   pnpm run migrate
   ```
3. **Result** — Each file is converted into the [content collection](https://docs.astro.build/en/guides/content-collections/) format and written to `content/prompts/` with:
   - Required frontmatter: `title`, `slug`, `tags`, `author`, `difficulty`, `visibility`, `created_at`, `updated_at`
   - Optional: `summary`, `models_tested`, `quality_score`, `use_count`
   - Body unchanged (or lightly normalized)

## Where values come from

| Field        | Source |
|-------------|--------|
| **title**   | Your frontmatter `title`, or first `# Heading`, or filename. |
| **slug**    | Your frontmatter `slug`, or slugified title/filename (used for URL). |
| **tags**    | Your frontmatter `tags` (array or comma-separated), plus optional enhancement from `#hashtags` in the body. |
| **author**  | Your frontmatter `author`, or the default you set when running the script. |
| **difficulty** | Your frontmatter `difficulty` (must be `beginner` \| `intermediate` \| `advanced`), or default. |
| **visibility** | Your frontmatter `visibility` or `public`. |
| **created_at / updated_at** | Your frontmatter dates, or today. |
| **summary** | Your frontmatter `summary`, or first paragraph of the body. |

Obsidian-style frontmatter (e.g. `tags: [a, b]` or `tag: x`) is mapped where possible. After migration, review and edit the new files in `content/prompts/` as needed.

## After migrating

- **Remove or keep** — You can delete the originals from `imports/` or keep them as a backup.
- **Build** — Run `pnpm run build` or `pnpm run dev`; the new prompts will appear in the site.
