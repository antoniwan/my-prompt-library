# My Prompt Library (MPL) — Archived

**This repo is archived.** The live demo at [my-prompt-library-lilac.vercel.app](https://my-prompt-library-lilac.vercel.app) is retired.

## What happened

This was a Git-native library of structured prompts: Markdown files, Astro site, copy-to-clipboard UX. That pattern made sense when you pasted prompts into ChatGPT by hand.

**Prompt libraries are obsolete.** Cursor, Codex, and Claude Code use **agent skills**: the same protocols, but loaded automatically when the task matches. No copy-paste. No separate browse-and-copy site.

All five prompts from this repo were converted to skills in my private skills repo and removed from active maintenance here.

## Where the content went

| Prompt | Skill name |
| --- | --- |
| Add Light/Dark Theme Support | `add-light-dark-theme` |
| Conversation Digest Generator | `conversation-digest` |
| Daily Digest Processor (For Cursor AI) | `daily-digest-processor` |
| Meeting Summary | `meeting-summary` |
| Sales Follow-Up Email | `sales-follow-up-email` |

Skills live in `antoniwan/my-agentic-skills` (private). If you forked prompts from here, treat the Markdown under `content/prompts/` as the last public snapshot.

## If you landed here from a link

- **Old blog or profile link:** The prompt library is sunset. Use agent skills in your AI tool of choice instead.
- **Fork or clone:** You can still read `content/prompts/` for reference. Do not expect updates or a working deploy without restoring dependencies yourself.
- **Contributing:** PRs are not accepted on archived repos.

## Historical stack (for archaeologists)

- `content/prompts/` — Markdown prompt files (frontmatter + body)
- Astro static site, client-side search
- Deployed to Vercel as a static export

Prior setup and dev docs are in git history before Aug 2026.

## License

See repository license.
