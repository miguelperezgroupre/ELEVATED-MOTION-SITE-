# The Journal: how to publish

Articles live in `src/content/journal/<slug>.md`. The file name is the URL: `/journal/<slug>`.

## Frontmatter
```
---
title: Short on-page H1 (≈45 chars so it stays ≤2 lines on mobile)
seoTitle: <title> tag, 50–60 chars
description: Meta description, 150–160 chars
dek: One-line subhead under the H1 (≤75 chars)
date: 2026-10-09
updated: 2026-10-09        # optional
category: Market | Neighborhoods | Buying | Selling | Relocation | Pre-Construction | Lifestyle | Newsletter
cta: MAP | MOVE
cover: https://… (CDN image)  coverOg: 1200×630 variant  coverAlt: …  coverCredit: …
sources:
- Label | https://source-url
---
```
Body is Markdown: `##`/`###` headings build the table of contents, tables, lists, quotes, and `[^1]` cites source 1.

## Publishing
`npm run build` prerenders every article to static HTML, and adds it to `sitemap-journal.xml` and `/journal/rss.xml`. Reading time, related posts, share links, the author box and the newsletter block are added automatically.

Rules: cite every number, invent nothing (no listings, prices or testimonials), and keep language fair-housing safe (describe places, never people).

Newsletter: reuses `leadService.submit` (type `newsletter`). TODO: move to a GHL form embed or server route and rotate the client-side GHL token.
