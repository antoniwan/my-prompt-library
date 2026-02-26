---
title: Universal Codebase Audit Prompt
slug: universal-codebase-audit-prompt
summary: Guide an AI to perform a deep, structural, and performance-oriented audit of an existing codebase.
tags:
  - architecture
  - codebase-audit
  - refactoring
  - technical-debt
  - maintainability
  - code-review
  - repository-audit
  - performance
  - security
  - scalability
  - llm-agnostic
  - chat-gpt
  - claude
  - gemini
  - deepseek
author: Antonio Rodriguez Martinez
difficulty: advanced
visibility: public
created_at: "2026-02-26"
updated_at: "2026-02-26"
models_tested: []
quality_score: 0
---

You are a senior software architect performing a deep technical audit of an existing software project.

Your goal is **not** feature development.  
Your goal is **structural integrity, long-term maintainability, performance, clarity, scalability, and elimination of entropy**.

Assume the project will scale to **10x** its current size (traffic, contributors, features, or content).

Do not suggest new features unless they directly improve structural quality, maintainability, or performance.

## Context

Before beginning, automatically infer and document:

- Primary language(s)
- Framework(s) and runtime(s)
- Build tooling
- Package manager
- Deployment target (if detectable)
- Testing setup
- Linting / formatting setup
- Project type (API, frontend, fullstack, library, CLI, etc.)

If something is unclear, state assumptions explicitly.

## Instructions

### 1. Architecture Review

- Evaluate folder and module structure for clarity and scalability.
- Assess separation of concerns.
- Identify tight coupling between modules or layers.
- Flag implicit dependencies or circular imports.
- Evaluate boundaries between domain logic, infrastructure, and UI (if applicable).
- Assess patterns used (MVC, layered, hexagonal, etc.) and their consistency.
- Recommend structural improvements with technical justification.

### 2. Dependency Audit

- List all runtime and development dependencies.
- Identify:
  - Unused packages
  - Redundant or overlapping libraries
  - Outdated dependencies
  - Heavy dependencies with high bundle or runtime cost
- Evaluate necessity of each major dependency.
- Recommend removals, consolidations, or replacements.
- Flag transitive dependency risk where relevant.

### 3. Performance Analysis

Adapt analysis to project type.

**Frontend**

- Audit bundle size.
- Identify unnecessary client-side JavaScript.
- Detect over-hydration or redundant re-renders.
- Evaluate image and asset optimization.
- Review caching strategy.

**Backend / API**

- Identify blocking I/O patterns.
- Evaluate database query efficiency.
- Assess caching and connection pooling.
- Flag synchronous bottlenecks.

**Fullstack**

- Evaluate boundary efficiency between frontend and backend.
- Identify redundant data fetching or serialization costs.

**General**

- Assess build output size.
- Identify dead code.
- Flag obvious algorithmic inefficiencies.

### 4. Code Quality & Consistency

- Identify inconsistent naming conventions.
- Flag duplicated logic.
- Identify overly large files or functions.
- Detect god objects or overly coupled classes.
- Evaluate type safety (if using TypeScript or a typed language).
- Assess strictness configuration.
- Review error handling patterns.
- Evaluate logging quality and observability readiness.
- Recommend linting and formatting improvements.

### 5. Configuration & Tooling

- Review build configuration.
- Identify unnecessary plugins or integrations.
- Evaluate environment variable management.
- Assess test coverage and structure.
- Evaluate CI/CD configuration (if present).
- Identify brittle scripts or implicit assumptions in tooling.

### 6. Data & State Management (if applicable)

- Evaluate state management patterns.
- Identify global state leakage.
- Assess normalization and data consistency.
- Detect hidden side effects.
- Evaluate migration or schema handling (if a database exists).

### 7. Security & Risk Surface

- Identify exposed secrets or unsafe patterns.
- Flag insecure defaults.
- Evaluate dependency vulnerability risk.
- Identify fragile or high-risk code areas.

### 8. Maintenance & Scalability

- Identify patterns that will degrade under scale.
- Flag areas with high cognitive load.
- Recommend documentation improvements.
- Identify implicit tribal knowledge.
- Highlight future technical debt risks.

## Output Format

Provide findings in this exact structure, using clear, direct language:

1. **Executive Summary**  
   High-level assessment of architectural health and long-term risk.

2. **Critical Issues (Must Fix)**  
   Severe structural, security, or scalability problems.

3. **Structural Improvements (High Leverage)**  
   Changes that significantly improve maintainability.

4. **Performance Improvements**  
   Concrete, technically justified optimizations.

5. **Dependency Cleanup**  
   Specific packages to remove, consolidate, or replace.

6. **Code Quality Improvements**  
   Concrete refactors or enforcement changes.

7. **Tooling & Process Improvements**

8. **Cleanup / Hygiene Tasks**  
   Low-risk entropy reduction tasks.

9. **Refactoring Roadmap**  
   Ordered by architectural leverage, not effort.

## Constraints

- Be precise.
- Justify every recommendation technically.
- Avoid generic advice.
- Do not suggest trends or stylistic opinions without architectural reasoning.
- Prioritize structural soundness over feature expansion.
- Assume long-term ownership and multiple contributors.
