# Tablesmit

> A minimalist table builder for analytical writing.

Build clean, structured tables with full control over headers, formatting, and export.
No account. No bloat. Free and open source.

**[→ tablesmit.com](https://tablesmit.com)**

![Tests](https://img.shields.io/badge/tests-403%20passing-4ade80?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-60a5fa?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-f59e0b?style=flat-square)
![Made in Nigeria](https://img.shields.io/badge/made%20in-Nigeria-1e40af?style=flat-square)

---

## What is Tablesmit?

Tablesmit is a browser-based table editor built for writers, analysts, and researchers who need clean, structured tables — not a spreadsheet.

**Tablesmit is not** a spreadsheet, a database, or a Notion competitor.
It is a structured writing tool. You build a table, format it, and export it.

---

## Features

### Layout and structure
- Drag-to-resize columns and rows (smooth, 60fps)
- Auto-fit column width on double-click
- Merge and unmerge cells — any rectangular range
- Freeze first row and/or first column
- Table caption with left, center, right alignment

### Formatting
- 6 table themes: Default, Minimal, Dark Header, Striped, Academic, Monochrome
- Custom header colours and content colours
- Column types: Text, Number, Currency, Percentage, Date
- Auto-sum and auto-numbering for numeric columns
- Word-style border picker: all borders, inside, outside, dashed, dotted, double
- Dark mode with system preference detection

### Data and editing
- Smart clipboard paste — Ctrl+V reads Excel, Word, and CSV clipboard content automatically
- Import: CSV and Excel files
- Column sorting — numeric-aware, empty cells to bottom
- Right-click context menu on cells and columns
- Find and replace across all cells (Ctrl+F / Ctrl+H)
- Undo stack — Ctrl+Z with depth indicator

### Export
- PDF — table only, no browser chrome
- Excel (.xlsx) — native format with merged cells preserved
- PNG and JPEG — high-resolution image
- CSV — clean, sanitised output
- Copy as image or Excel data (TSV) to clipboard

### Other
- Keyboard shortcuts (press `?` or `Ctrl+/` to see all)
- AI features scaffolding (coming soon)
- Works offline — PWA with service worker
- No account required. No data leaves your browser.

---

## Getting started

```bash
git clone https://github.com/Olayiwola72/tablesmit.git
cd tablesmit
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Prerequisites

- Node 18+
- npm 9+

---

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · Vitest · Playwright

---

## Project status

```
Tests:     403 passing — 42 test files
Lint:      0 warnings — TypeScript strict
Build:     clean — no errors
Coverage:  lines 75%+ · functions 65%+ · branches 60%+
PWA:       offline-capable with auto-updating service worker
```

---

## Configuration

All product decisions — brand name, routes, nav links, export formats, colour palettes, and presets — are in one file:

```
src/config/siteConfig.ts
```

Check there first before changing component logic. Agents reading this repo: `siteConfig.ts` is the single source of truth for anything brand or route related.

---

## Writing a blog post

The blog system is file-driven. Creating a post requires one action: add a `.ts` file to `src/content/blog/`.

No code change. No registry update. The post appears automatically on the next build.

### File format

```ts
// src/content/blog/your-post-slug.ts
import type { BlogPost } from '../../types/blog.types'

const post: BlogPost = {
  slug:        'your-post-slug',
  title:       'Your Post Title',
  date:        '2025-11-01',
  description: 'One or two sentences. Used for SEO and card text. Max 160 chars.',
  author:      'Your Name',
  tags:        ['tag-one', 'tag-two'],
  readTime:    4,
  featured:    false,
  content:     `## First heading

Your Markdown content here. Standard Markdown — headings, lists, code blocks, tables.

Link to the app like this: [build your table](/).`,
}

export default post
```

### Rules

- Filename = URL slug. Use the target keyword in kebab-case.
- `content` is standard Markdown as a template literal string.
- Start content with `## Heading 2` — the post title is already the H1.
- Link to `/` at least once per post for internal SEO.
- `featured: true` pins the post to the top of the blog list.
- `readTime` — rough guide: 200 words per minute.

### Quick workflow

```bash
# Write your post in Markdown first (easier than writing in a template literal)
# Then commit the .ts file
git add src/content/blog/your-post.ts
git commit -m "content: add blog post — your post title"
git push
# GitHub Actions builds and deploys to Netlify. Post is live in minutes.
```

---

## Adding a feature page

Feature pages live in `src/content/features/`. Each page is a `.json` file.
Adding a page = creating one JSON file. No code change.

```json
{
  "slug":            "your-feature",
  "metaTitle":       "Feature Title — Tablesmit",
  "metaDescription": "One sentence. Max 160 chars.",
  "heroHeadline":    "One strong sentence.",
  "heroSubtext":     "Supporting sentence expanding the headline.",
  "icon":            "LucideIconName",
  "benefits": [
    { "icon": "LucideIconName", "heading": "Benefit", "body": "One or two sentences." }
  ],
  "steps": [
    { "number": 1, "heading": "Step one", "body": "What the user does." }
  ],
  "useCases":        ["Use case one", "Use case two"],
  "relatedFeatures": ["other-feature-slug"],
  "relatedPost":     "blog-post-slug"
}
```

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

Quick summary:
- Open an issue before starting large changes
- Run `npm test` — all tests must pass
- Run `npm run lint` — zero warnings
- No `console.log` in production code
- Write tests for new features

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run lint
npm run lint

# Build
npm run build
```

---

## Environment variables

Copy `.env.example` and fill in your values:

```bash
cp .env.example .env
```

See `.env.example` for all available variables. Never commit `.env`.

---

## Deployment

Tablesmit deploys to Netlify via GitHub Actions on push to `main`.
The pipeline runs lint, tests, and build before deploying.

Required Netlify environment variables:
- `VITE_GA4_MEASUREMENT_ID`
- `VITE_SENTRY_DSN`
- `VITE_APP_URL`

---

## License

MIT — see [LICENSE](LICENSE)

---

Built with care in Nigeria. Sponsored by the community.
[Support this project →](https://tablesmit.com/open-source) · [Blog](https://tablesmit.com/blog) · [GitHub](https://github.com/Olayiwola72/tablesmit)
