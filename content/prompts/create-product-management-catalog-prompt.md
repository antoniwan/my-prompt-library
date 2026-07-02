---
title: Create Product-Management Catalog Prompt
slug: create-product-management-catalog-prompt
summary: Guide an AI agent to create a docs/product-management/ catalog that defines business product boundaries, independent of monorepo folder structure.
tags:
  - product-management
  - documentation
  - architecture
  - portfolio
  - ownership
  - stakeholder
  - monorepo
  - workflows
  - llm-agnostic
  - chat-gpt
  - claude
  - gemini
  - deepseek
author: Antonio Rodriguez Martinez
difficulty: advanced
visibility: public
created_at: "2026-07-02"
updated_at: "2026-07-02"
models_tested: []
quality_score: 0
---

# Prompt: Create product-management catalog (copy into any repo)

Copy everything below the line into an AI agent chat in a target repository. It creates a `docs/product-management/` catalog that defines **business product boundaries**, independent of how folders, services, or packages are organized.

Before using: if you have a reference implementation in another repo, fill in the `<REFERENCE_REPO>` and `<DISCOVERY_INDEX>` placeholders in Step 9 and the Reference Example. If you do not, delete the "Reference example" block — the prompt works without it.

---

## Task: Create a product-management catalog for this repository

### Objective

Analyze this repository and create a **product-management reference section** that defines **business product boundaries** — independent of how folders, services, or packages are organized.

This is a **portfolio / ownership / stakeholder** artifact, not a folder inventory. Do not simply list `services/*` or `packages/*` as products without applying the boundary rules below.

---

### Step 1 — Discover before writing

Before creating files, explore the repo thoroughly:

1. **Services and apps** — `services/`, `apps/`, `web/`, `packages/`, or equivalent deployables.
2. **Existing documentation** — especially `docs/`, `README.md`, `AGENTS.md`, architecture docs, any docs discovery index (e.g. `docs/index.yaml`), and any per-area feature docs.
3. **Cross-service flows** — who calls whom, proxies, shared databases, external integrations.
4. **Legacy vs greenfield** — migrations where two codebases represent one product during transition.
5. **Shared libraries** — internal packages (`@org/*`, `libs/`, etc.) consumed by multiple services.
6. **External systems** — mobile apps, LMS, identity, third-party APIs referenced but not implemented in-repo.
7. **Existing stakeholder language** — any slides, wiki links, or product descriptions that already define scope and exclusions.

Use existing program docs as **source material**, not as the product list itself. Program doc trees and business products overlap but are not identical.

---

### Step 2 — Canonical product definition

Include this paragraph verbatim (adapt only the discovery-index reference if this repo uses a different path) in `docs/product-management/README.md` under a `## Definition` heading:

> A **product** is a bounded capability — not a monorepo folder, service, or package by default. It delivers identifiable value to a user or downstream consumer; has a clear scope (what it does); is implemented by named building blocks (services, UIs, or shared modules); and has explicit boundaries (what related work intentionally lives elsewhere). Deployables are *components* of a product; the product is the capability and ownership boundary around them. One product may span multiple services; one service belongs to one product. Program documentation trees and business products overlap but are not the same thing.

---

### Step 3 — Directory structure to create

Create this tree under `docs/` (create `docs/` if it does not exist):

```text
docs/
└── product-management/
    ├── README.md              ← catalog index + definition + how to read
    ├── index.yaml             ← machine-readable product list
    └── products/
        ├── <product-key>.md   ← one file per business product
        └── ...
```

Also update existing docs discovery files if present:

- **Docs discovery index** (e.g. `docs/index.yaml`) — add a top-level `product_management:` block pointing to `product-management/`, `product-management/index.yaml`, and `product-management/README.md`.
- **Docs layout guide** (e.g. `docs/README-docs-structure.md`) — add a `product-management/` section describing its purpose and link to the README.

Do **not** create PowerPoint files. Markdown only.

---

### Step 4 — `docs/product-management/README.md` structure

The README must contain these sections in order:

#### 1. Title

`# Product management reference`

#### 2. Definition

The canonical paragraph from Step 2.

#### 3. Short intro

One sentence: use the catalog for portfolio planning, stakeholder presentations, ownership conversations, and onboarding. Link to `products/`.

#### 4. How to read a product definition

A table with three rows:

| Section | Question it answers |
| ------- | ------------------- |
| **Functionality** | What value does this product deliver to its users or downstream consumers? |
| **Components** | What deployable services, UIs, or shared modules implement it? |
| **Excludes** | What related capabilities are intentionally *not* part of this product? |

Add one sentence: **Monorepo mapping** sections tie each product to repo paths. A single service can belong to one product; a product can span multiple services; shared packages may be a product on their own or a component of several products.

#### 5. Product catalog

A markdown table: **Product | Summary (one line) | Detail (link to `products/<file>.md`)**.

#### 6. Relationship to program docs

Explain how this catalog differs from any existing program doc trees. Include 2–4 concrete examples from *this* repo (e.g. an ops dashboard that is a *component* not a separate product; legacy + greenfield services under one product; shared packages as one internal platform product).

#### 7. Related program docs

A table mapping each business product to its canonical program documentation path(s) in this repo, if they exist.

---

### Step 5 — `docs/product-management/index.yaml` structure

Create a YAML file with:

```yaml
# Product catalog — business product boundaries (not 1:1 with monorepo folders).
# See README.md for how this relates to program doc trees.

catalog: product-management
products_dir: product-management/products/

products:
  - key: <kebab-case-key>
    name: <Human Name>
    path: products/<kebab-case-key>.md
    program_docs: <optional path under docs/>
    services: [<optional service folder names>]
    web: [<optional web app folder names>]
    packages: [<optional package scope, e.g. "@org/*">]
    external: true # optional — product boundary exists but implementation is outside repo
```

Include every product from the README catalog. Use `external: true` only when the product is a deliberate boundary but not implemented in this repo.

---

### Step 6 — Per-product file template (`docs/product-management/products/<name>.md`)

Create **one file per business product**. Each file must follow this exact structure:

```markdown
# <Product Name>

## Functionality

- <Bullet: what value this product delivers — user-facing or consumer-facing outcomes>
- <4–8 bullets; start with verbs: Provides, Manages, Exposes, Orchestrates, etc.>
- <Focus on outcomes, not implementation details>

## Components

- **<Component name>** — <what it is> (`<repo path>` if in-repo; note "external" if not).
- <List deployable services, UIs, workers, databases, and major shared modules that implement this product>
- <Operator dashboards and admin UIs belong here as components unless they are truly standalone products>

## Excludes

- **<Excluded capability>** — <one-line reason>; belongs to [<Other Product>](<other-product-file>.md).
- <3–6 exclusions; cross-link to sibling product files using relative markdown links>
- <Excludes are the most important section — they prevent scope creep between teams>

## Monorepo mapping

| Path | Role |
| ---- | ---- |
| `<path>` | <short role description> |

**Program docs:** [`docs/<area>/...`](<relative link>) <!-- omit if none exist -->
```

#### Optional sections (use when they add clarity)

- **`## Why this is its own product`** — 1 short paragraph when the boundary is non-obvious (e.g. a service consumed by one main product but with different runtime, cost, or release cadence).
- **`## Primary consumers`** — when the product is infrastructure consumed by named siblings.
- **`## Integration note`** — when proxy/integration patterns matter for ownership.

#### Title rules

- Use plain product names: `# Organization Manager`, `# Billing`
- Do **not** use demo phrasing like `X is a "Product"`

#### Writing style

- Complete sentences in bullets where natural; concise and scannable.
- Cross-link between product files in **Excludes** using relative paths: `[Other Product](other-product.md)`.
- Repo paths in backticks. Link to existing program docs where they exist.
- Do not invent features not supported by the codebase or existing docs; mark uncertain items as "planned" or "TBD" only when docs already say so.

---

### Step 7 — Boundary decision rules

Apply these rules when deciding what is a product vs a component:

| Situation | Decision |
| --------- | -------- |
| Single deployable with one clear consumer outcome | Usually one product |
| Ops / admin UI for a larger product | **Component** of that product, not its own product |
| Service A calls Service B; B has distinct runtime, cost, or reuse story | B may be its **own product** even if A is the main consumer |
| Legacy + greenfield rewrite of same capability | **One product**, two components, until cutover is complete |
| Shared internal libraries (`@org/*`, `libs/`) | One **internal platform product** if they have shared consumers and versioning risk; otherwise components |
| Capability referenced but not in repo (LMS, mobile app agency build) | **Boundary product** with `external: true` if stakeholders treat it as separate scope |
| Proxy that only forwards to another product | Usually **not** a product; document under the consumer or the upstream owner |
| "Could be a product someday" but no distinct ownership today | **Component** for now; note in Excludes of the parent |

Every product must have at least **3 Excludes** that point to real sibling products or named external boundaries.

---

### Step 8 — Quality bar

Before finishing, verify:

- [ ] Every service/app in the repo is mapped to exactly **one** product (as a component or primary owner).
- [ ] No product file is just a copy of a service README — it must include **Excludes** and cross-links.
- [ ] README catalog table matches `index.yaml` entries (same keys and names).
- [ ] Docs discovery index (if present) references `product-management/`.
- [ ] Docs structure guide (if present) documents the new section.
- [ ] Relative links between product files work.
- [ ] Definition paragraph is present verbatim in README.
- [ ] No slide-deck/demo phrasing in titles.

---

### Step 9 — What NOT to do

- Do not equate `services/*` 1:1 with products without boundary analysis.
- Do not create empty placeholder products for every folder.
- Do not merge unrelated capabilities just because they share a database.
- Do not omit **Excludes** — they are the core value of this catalog.
- Do not create commits unless I explicitly ask.
- Do not add unrelated refactors or edit application code.

---

### Reference example (optional — structure only, do not copy product names)

<!-- Delete this block if you have no reference repo. Otherwise fill in the placeholders. -->

The **<REFERENCE_REPO>** repo implements this pattern at `docs/product-management/` with products such as <example products>. Match **structure and rigor**, not the specific product list — derive products from **this** repository.

Canonical reference files in <REFERENCE_REPO>:

- `README.md` — definition and catalog index
- `index.yaml` — machine-readable list
- `products/<example-a>.md` — example product file
- `products/<example-b>.md` — example with cross-links in Excludes

---

### Deliverables checklist

1. `docs/product-management/README.md`
2. `docs/product-management/index.yaml`
3. `docs/product-management/products/*.md` (one per business product)
4. Updated docs discovery index (if exists)
5. Updated docs structure README (if exists)
6. Brief summary in your response: product list, key boundary decisions, and anything you flagged as ambiguous
