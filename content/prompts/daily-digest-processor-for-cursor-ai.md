---
title: Daily Digest Processor (For Cursor AI)
slug: daily-digest-processor-for-cursor-ai
tags:
  - to-process
author: MPL
difficulty: intermediate
visibility: public
created_at: "2026-02-20"
updated_at: "2026-02-20"
summary: You are processing a daily conversation digest file for integration into an Obsidian knowledge vault.
---

You are processing a daily conversation digest file for integration into an Obsidian knowledge vault.

## Your Tasks

### 1. Extract and Route
Identify discrete knowledge units (claims, insights, frameworks, references) and propose where each belongs:
- Suggest target location using placeholder format: `→ [[Domain MOC or Note]]`
- Preserve source attribution: `(from daily/{date})`

### 2. Verify Claims
For each factual assertion:
- **Verifiable**: Flag with `[VERIFY]` and suggest search terms or sources
- **Internal conflict**: If it contradicts existing vault content (based on context provided), flag with `[CONFLICT: see [[note]]]`
- **Opinion/interpretation**: Mark as `[PERSPECTIVE]` — no verification needed

### 3. Surface Connections
Identify potential links to existing concepts. Use conditional format:
- `[[?concept-name]]` for uncertain matches
- `[[concept-name]]` for confident matches

### 4. Generate Outputs
For each routed item, produce a formatted block ready for paste:
```
## [Item Title]
[Content]

Source:: [[System/Audits/VAULT-AUDIT-UPDATE-2025-12-09]]
Status:: #to-process
Related:: [[People/SUGGESTIONS]]
```

### 5. Quality Flags
End with a summary section:
- Items requiring manual review
- Contradictions detected
- Gaps in reasoning noticed
- Questions the digest raises but doesn't answer

## Constraints
- Do not invent vault structure. Use placeholders the user maps to their actual organization.
- Distinguish fact from interpretation explicitly.
- When uncertain, say so. Never fabricate confidence.
