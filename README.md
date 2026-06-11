# srkonok.github.io

Personal portfolio and blog — single-page app served on GitHub Pages.

## Blog workflow

Blog content lives in two places:

1. `js/portfolio.js` — the `blogs` array (slug, image, date, title, description, tags, faqs) that drives the blog cards in the SPA. The `faqs` entries become the visible FAQ section and FAQPage structured data on the static pages.
2. `partials/blog-posts/<slug>.html` — the article content loaded by the SPA at `#blog/<slug>`.

After adding or editing a post, regenerate the SEO artifacts:

```bash
node scripts/generate-blog-pages.mjs
```

This rebuilds the static, search-engine-indexable pages (`blog/<slug>/index.html`), the static blog index (`blog/index.html`), `sitemap.xml`, and `llms.txt` (the site guide for AI assistants and answer engines). The static pages carry the canonical URLs, Open Graph tags, BlogPosting + FAQPage structured data, and speakable markup; the SPA mirrors them via dynamic title/description/canonical updates in `js/app.js`. AI crawler access is governed by `robots.txt`.
