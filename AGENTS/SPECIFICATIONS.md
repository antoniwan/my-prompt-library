---
author: Antonio Rodriguez
created_at: 2026-02-17
difficulty: beginner
models_tested:
- gpt-4o
- claude-3-opus
quality_score: 4.5
slug: sales-follow-up-email
tags:
- marketing
- email-draft
- formal
title: Sales Follow-Up Email
updated_at: 2026-02-17
use_count: 0
visibility: public
---

# MPL --- Specifications Document

## 1. Overview

MPL (My Prompt Library) is a Git-native, content-first public prompt
library built with Astro. Markdown files stored in a GitHub repository
act as the single source of truth.

The system prioritizes: - Sovereignty (no database dependency) -
Performance (static-first) - Versioning (Git history) - Curation
(maintainer-reviewed contributions)

------------------------------------------------------------------------

## 2. Architecture

### 2.1 Source of Truth

-   GitHub repository
-   Markdown files
-   Structured frontmatter
-   Version control via PR workflow

### 2.2 Framework

-   Astro (static-first)
-   Content Collections for schema validation
-   Type-safe frontmatter using Zod

### 2.3 Deployment

-   Static site generation
-   Deployed to Vercel (or equivalent static host)
-   Automatic builds on merge to main

------------------------------------------------------------------------

## 3. Content Model

Each prompt is a Markdown file with structured frontmatter.

Example:

## Context

...

## Length

...

## Examples

...

## Prompt

...

------------------------------------------------------------------------

## 4. Folder Structure

/content /prompts sales-follow-up-email.md meeting-summary.md

/src /pages /prompts /tags /components /layouts

------------------------------------------------------------------------

## 5. Core Features (v1)

-   Prompt listing page
-   Individual prompt page
-   Tag filtering
-   Search (client-side index)
-   Copy-to-clipboard button
-   Shareable URL per prompt
-   SEO metadata per prompt

------------------------------------------------------------------------

## 6. Search Implementation

-   Build-time JSON index generation
-   Client-side search (Fuse.js or equivalent)
-   Filter by:
    -   Tags
    -   Difficulty
    -   Author

------------------------------------------------------------------------

## 7. Governance Model

-   External contributors submit PRs
-   Maintainer review required
-   Prompts may be edited for clarity and structure
-   Credit preserved in frontmatter

------------------------------------------------------------------------

## 8. Performance Goals

-   Lighthouse score: 95+
-   Zero unnecessary client-side JavaScript
-   Sub-100ms TTFB on static host
-   Fully accessible (WCAG AA)

------------------------------------------------------------------------

## 9. Future Extensibility

-   Parameterized prompts
-   CLI integration
-   VS Code extension
-   API endpoint exporting prompt JSON
-   Optional authentication layer (v2)
