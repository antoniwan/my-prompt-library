# MPL --- Requirements Document

## 1. Functional Requirements

### 1.1 Prompt Management

-   System must support Markdown-based prompts
-   Must validate frontmatter schema at build time
-   Must render structured sections consistently

### 1.2 Tag System

-   Prompts must support multiple tags
-   Tags must be browsable via dedicated routes
-   Tag filtering must be fast and intuitive

### 1.3 Search

-   Must support keyword search
-   Must support tag filtering
-   Must not require server-side search service

### 1.4 Copy Feature

-   One-click copy-to-clipboard
-   Clear visual feedback on copy

### 1.5 SEO

-   Unique meta title per prompt
-   Meta description generated from summary
-   Structured data support (optional)

### 1.6 Contribution Flow

-   External contributors submit via Pull Request
-   All prompts require maintainer approval
-   Author attribution required

### 1.7 TODO / Agent Governance

-   The file [AGENTS/TODO.md](TODO.md) must be kept in sync with the project’s implementation status.
-   When requirements or specifications change, or when work is completed, TODO.md must be updated accordingly.
-   Every item in TODO.md must reference the source that asks for it (e.g. REQUIREMENTS §1.4, SPEC §6). This keeps REQUIREMENTS and SPECIFICATIONS as the single source of truth and makes the agent docs self-governing.

### 1.8 Imports / Migration

-   An **imports** folder exists where users can place prompt files from elsewhere (e.g. Obsidian, Notion, plain Markdown).
-   A **migration** step (script) converts those files into the content collection format and writes them to `content/prompts/` with required frontmatter (title, slug, tags, author, difficulty, visibility, created_at, updated_at).
-   Migration may infer or enhance values (e.g. title from first heading, tags from frontmatter or optional `#hashtags` in the body, summary from first paragraph).
-   Migrated prompts are normal content; if contributed via PR, they remain subject to maintainer review and author attribution (see §1.6).

------------------------------------------------------------------------

## 2. Non-Functional Requirements

### 2.1 Performance

-   Static-first architecture
-   Minimal JS shipped to client
-   Page load under 1 second on 3G

### 2.2 Maintainability

-   Clear folder structure
-   Enforced schema validation
-   Human-readable Markdown

### 2.3 Portability

-   No dependency on proprietary CMS
-   Must be portable to another host easily
-   Markdown files must remain usable outside UI

### 2.4 Scalability

-   Must handle 1,000+ prompts without performance degradation
-   Search must remain performant at scale

------------------------------------------------------------------------

## 3. Security

-   No user-submitted content rendered without review
-   No dynamic prompt execution in v1
-   No API keys stored in frontend

------------------------------------------------------------------------

## 4. Constraints

-   No database in v1
-   No authentication in v1
-   No server-side runtime dependency
-   GitHub must remain source of truth
