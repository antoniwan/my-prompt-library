Generate a structured markdown report from this conversation for integration into an Obsidian vault.
## Output Structure

### Metadata
```yaml
---
date: [YYYY-MM-DD]
domains: [list 2-4 topic areas]
type: [reflection | problem-solving | research | creative | planning]
route: [target folder path]
mocs: [relevant MOC links]
status: #to-process
---
```

### Summary
2-3 sentences. What was resolved, decided, or surfaced?
### Ground Level
Chronological record of significant exchanges:
- **Trigger**: What prompted this moment
- **Content**: The substance (direct quote or precise paraphrase)
- **Output**: Any concrete result (decision, artifact, realization)
### Pattern Level
Themes, tensions, or frameworks that emerged. Connections to ongoing lines of thinking.
### Action Level
Specific next steps, unresolved questions, items requiring follow-up.

### Suggested Links
Use `[[wikilink]]` notation:
- `[[Inventory/Digital Assets/Domains/Domains]]` for relevant MOCs
- `[[folder/note-name]]` for specific notes
- `[[?uncertain-link]]` for possible connections (user resolves)

---
## Routing Rules

Determine the primary domain and route accordingly:

| Domain | Route to | Link to MOC |
|--------|----------|-------------|
| Active project, planning, task-based | `Active Projects/` | — |
| Philosophical inquiry, values, ethics | `Learning/Philosophy/` | `[[MOC - Philosophy]]` |
| Self-reflection, identity, inner work | `Learning/Self-Understanding/` | — |
| Interpersonal, family, partnership | `Learning/Relationships/` | `[[MOC - Relationships]]` |
| Financial, economic, business strategy | `Learning/Systems & Economics/` | `[[MOC - Systems Thinking]]` |
| Parenting, fatherhood | `Learning/` or appropriate subfolder | `[[MOC - Fatherhood]]` |
| Physical health, training, body | `Learning/` or appropriate subfolder | `[[MOC - Physical Training]]` |
| Creative work, writing, music | `Learning/` or appropriate subfolder | `[[MOC - Creative Writing]]` |
| Technical, architecture, code | `Learning/` or appropriate subfolder | `[[MOC - Technical Architecture]]` |
| Gaming analysis or design | `Learning/` or appropriate subfolder | `[[MOC - Gaming]]` |
| Business, SHSH LLC | `Learning/` or appropriate subfolder | `[[MOC - Strong Hands Soft Heart (Business)]]` |
| Legacy, long-term thinking | `Learning/` or appropriate subfolder | `[[MOC - Legacy]]` |
| Emotional processing, inner alchemy | `Learning/` or appropriate subfolder | `[[MOC - Emotional Alchemy]]` |
| Inventory, tools, resources | `Inventory/` | — |
| DIY, hands-on projects | `DIY & Projects/` | — |
| Recipes | `Recipes/` | — |
| People notes | `People/` | — |
| System/vault maintenance | `System/` | — |
| Unclear or mixed | `Inbox/` | Tag with `#to-sort` |

### Structural Notes
- MOCs live at vault root with naming pattern `MOC - [Domain].md`
- Content files live in `Learning/[Subfolder]/` or other domain folders
- Daily digests originate in `Daily/`
- When a note belongs to multiple domains, route to primary and link to secondary MOCs

### Filename Convention
`{YYYY-MM-DD}-{type}-{brief-descriptor}.md`

Examples:
- `2024-12-08-reflection-knowledge-system-design.md`
- `2024-12-08-planning-tmobile-consolidation.md`

---

## Formatting Rules

- Obsidian-compatible markdown
- No filler. Every line justifies its presence.
- Flag uncertainty with `[?]`
- Use `#tags` sparingly and intentionally
- Blank line before lists and after headers (CommonMark compliance)



