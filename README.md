# My Prompt Library (MPL)

A Git-native library of structured prompts. Markdown files in this repository are the single source of truth. No database.

## Features

- **Browse prompts** by list or tag
- **Search** by keyword, tag, difficulty, or author (client-side, no server)
- **Copy to clipboard** on each prompt page
- **SEO** with per-prompt meta titles and descriptions
- **Static-first** — static output; deployable to any static host

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
```

Output is in `dist/`. Serve with any static host.

## Deploy

Deploy the `dist/` folder to Vercel, Netlify, Cloudflare Pages, or any static host. No server-side runtime required.

## Project structure

- `content/prompts/` — Markdown prompt files (frontmatter + body)
- `imports/` — Drop prompt files here (e.g. from Obsidian); run **Importing prompts** below to migrate them
- `src/content.config.ts` — Content collection schema (Zod)
- `src/pages/` — Astro pages (home, prompts, tags, search)
- `src/layouts/` — Shared layout and nav
- `AGENTS/` — Requirements, expectations, and specifications

## Importing prompts

If you have prompts elsewhere (Obsidian, Notion, plain Markdown), add them to the **`imports/`** folder, then run:

```bash
pnpm run migrate
```

Optional flags:

- `--author "Your Name"` — Default author when frontmatter has no `author`
- `--enhance-tags` — Add tags from `#hashtags` in the body to frontmatter
- `--dry-run` — Show what would be written without creating files

Migrated files are written to `content/prompts/` with the required frontmatter. See [imports/README.md](imports/README.md) for details.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to submit prompts via Pull Request.

## License

See repository license.
