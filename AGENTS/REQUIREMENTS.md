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
