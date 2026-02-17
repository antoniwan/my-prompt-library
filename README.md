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
- `src/content.config.ts` — Content collection schema (Zod)
- `src/pages/` — Astro pages (home, prompts, tags, search)
- `src/layouts/` — Shared layout and nav
- `AGENTS/` — Requirements, expectations, and specifications

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to submit prompts via Pull Request.

## License

See repository license.
