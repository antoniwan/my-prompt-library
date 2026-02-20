# MPL — Agent TODO

Track implementation status of items from the AGENTS documents. Each entry **must** reference the source file and section that require it (see [REQUIREMENTS §1.7](REQUIREMENTS.md#17-todo--agent-governance)).

Update this file when completing work or when requirements/specifications change so the project stays self-governing.

---

## From REQUIREMENTS.md

### §1.1 Prompt Management

| Status | Item | Source |
|--------|------|--------|
| Done | Markdown-based prompts | REQUIREMENTS §1.1 |
| Done | Validate frontmatter schema at build time | REQUIREMENTS §1.1 |
| Done | Render structured sections consistently | REQUIREMENTS §1.1 |

### §1.2 Tag System

| Status | Item | Source |
|--------|------|--------|
| Done | Prompts support multiple tags | REQUIREMENTS §1.2 |
| Done | Tags browsable via dedicated routes | REQUIREMENTS §1.2 |
| Done | Tag filtering fast and intuitive (listing + search) | REQUIREMENTS §1.2 |

### §1.3 Search

| Status | Item | Source |
|--------|------|--------|
| Done | Keyword search | REQUIREMENTS §1.3 |
| Done | Tag filtering (in search) | REQUIREMENTS §1.3 |
| Done | No server-side search service | REQUIREMENTS §1.3 |

### §1.4 Copy Feature

| Status | Item | Source |
|--------|------|--------|
| Done | One-click copy-to-clipboard | REQUIREMENTS §1.4 |
| Done | Clear visual feedback on copy | REQUIREMENTS §1.4 |

### §1.5 SEO

| Status | Item | Source |
|--------|------|--------|
| Done | Unique meta title per prompt | REQUIREMENTS §1.5 |
| Done | Meta description from summary | REQUIREMENTS §1.5 |
| Done | Structured data support (optional) | REQUIREMENTS §1.5 |

### §1.6 Contribution Flow

| Status | Item | Source |
|--------|------|--------|
| Done | External contributors submit via Pull Request | REQUIREMENTS §1.6 |
| Done | All prompts require maintainer approval | REQUIREMENTS §1.6 |
| Done | Author attribution required | REQUIREMENTS §1.6 |

### §1.8 Imports / Migration

| Status | Item | Source |
|--------|------|--------|
| Done | Imports folder for user prompt files (Obsidian, etc.) | REQUIREMENTS §1.8 |
| Done | Migration script converts to content collection format with required frontmatter | REQUIREMENTS §1.8 |
| Done | Optional value inference/enhancement (title, tags from #hashtags, summary) | REQUIREMENTS §1.8 |
| Done | Migrated prompts subject to same governance if contributed via PR | REQUIREMENTS §1.8 |

### §2 Non-Functional, §3 Security, §4 Constraints

| Status | Item | Source |
|--------|------|--------|
| Done | Static-first architecture | REQUIREMENTS §2.1 |
| Done | Minimal JS to client | REQUIREMENTS §2.1 |
| Todo | Page load under 1s on 3G (verify) | REQUIREMENTS §2.1 |
| Done | Clear folder structure | REQUIREMENTS §2.2 |
| Done | Enforced schema validation | REQUIREMENTS §2.2 |
| Done | Human-readable Markdown | REQUIREMENTS §2.2 |
| Done | No proprietary CMS; portable; Markdown usable outside UI | REQUIREMENTS §2.3 |
| Todo | Handle 1,000+ prompts; search performant at scale | REQUIREMENTS §2.4 |
| Done | No user content without review; no dynamic execution; no API keys in frontend | REQUIREMENTS §3 |
| Done | No database, no auth, no server runtime; GitHub source of truth | REQUIREMENTS §4 |

---

## From SPECIFICATIONS.md

### §5 Core Features (v1)

| Status | Item | Source |
|--------|------|--------|
| Done | Prompt listing page | SPEC §5 |
| Done | Individual prompt page | SPEC §5 |
| Done | Tag filtering | SPEC §5 |
| Done | Search (client-side index) | SPEC §5 |
| Done | Copy-to-clipboard button | SPEC §5 |
| Done | Shareable URL per prompt (canonical + OG) | SPEC §5 |
| Done | SEO metadata per prompt | SPEC §5 |

### §6 Search Implementation

| Status | Item | Source |
|--------|------|--------|
| Done | Build-time JSON index generation | SPEC §6 |
| Done | Client-side search (Fuse.js) | SPEC §6 |
| Done | Filter by tags, difficulty, author | SPEC §6 |

### §7 Governance Model

| Status | Item | Source |
|--------|------|--------|
| Done | External contributors submit PRs; maintainer review; credit in frontmatter | SPEC §7 |

### §8 Performance Goals

| Status | Item | Source |
|--------|------|--------|
| Todo | Lighthouse score 95+ | SPEC §8 |
| Done | Zero unnecessary client-side JS | SPEC §8 |
| Todo | Sub-100ms TTFB on static host (verify on deploy) | SPEC §8 |
| Todo | Fully accessible (WCAG AA) | SPEC §8 |

### §9 Imports and Migration

| Status | Item | Source |
|--------|------|--------|
| Done | imports/ folder and README workflow | SPEC §9 |
| Done | Migration script (pnpm run migrate); frontmatter mapping; output to content/prompts | SPEC §9 |
| Done | Optional tag enhancement from #hashtags; quoted dates for schema | SPEC §9 |

### §10 Future Extensibility

| Status | Item | Source |
|--------|------|--------|
| — | Parameterized prompts; CLI; VS Code; API; auth (v2) | SPEC §10 (optional) |

---

## Legend

- **Done** — Implemented and aligned with the referenced requirement/spec.
- **Todo** — Not yet done or not yet verified.
- **—** — Optional or out of scope for current phase.

When adding or closing items, keep the **Source** column accurate so REQUIREMENTS and SPECIFICATIONS remain the single source of truth.
