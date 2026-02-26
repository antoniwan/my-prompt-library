# My Prompt Library (MPL)

A small, Git-native library of structured prompts. Markdown files in this repository are the source of truth. There is no database or runtime backend.

## Features

- **Browse prompts**: list of all public prompts, sorted by last update
- **Filter prompts**: on `/prompts/` filter by difficulty, author, and tag (client-side)
- **Tags**: tags index and per-tag pages listing related prompts
- **Search**: header search bar for prompts, tags, and core pages; dedicated `/search/` page for prompt search with filters
- **Copy to clipboard**: one-click copy of the full prompt markdown on each prompt page
- **Light / dark theme**: theme toggle stored in `localStorage`
- **SEO-friendly**: per-prompt meta titles, descriptions, and basic structured data
- **Static-first**: built as a static Astro site; deployable to any static host

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:4321`.

## Build

```bash
npm run build
```

The static output is written to `dist/`. You can preview it with:

```bash
npm run preview
```

## Deploy

Deploy the `dist/` folder to Vercel, Netlify, Cloudflare Pages, or any other static host. No server-side runtime is required.

## Project structure

- `content/prompts/` — Markdown prompt files (frontmatter + body)
- `src/content.config.ts` — Content collection schema (Zod) for the `prompts` collection
- `src/pages/` — Astro pages (`/`, `/prompts/`, `/prompts/[id]/`, `/tags/`, `/tags/[tag]/`, `/search/`)
- `src/layouts/` — Shared layout, header, footer, and global styles wiring
- `src/components/` — Reusable UI pieces (prompt card, tag pill, search bar, theme toggle, page header)
- `src/styles/global.css` — Global design tokens and base styles
- `AGENTS/` — Requirements, expectations, and specifications for AI agents working on this repo

## Contributing

See `CONTRIBUTING.md` for how to submit prompts via pull request.

## License

See the repository license file.
