// Generates static, crawlable SEO pages from the SPA blog content:
//   blog/<slug>/index.html  — full standalone page per post (meta, OG, JSON-LD)
//   blog/index.html         — static blog index
//   sitemap.xml             — root + blog pages
//
// Run after adding or editing a post:  node scripts/generate-blog-pages.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { blogs } from '../js/portfolio.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = 'https://srkonok.github.io';
const AUTHOR = 'Md Shahriar Rahman';
const SKIN = '#2196f3';

const MONTHS = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
                 Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };

// "15 Mar 2024" -> "2024-03-15"
function toISODate(d) {
  const [day, mon, year] = d.split(' ');
  return `${year}-${MONTHS[mon]}-${day.padStart(2, '0')}`;
}

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const PAGE_CSS = `
  :root { --skin: ${SKIN}; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Montserrat', sans-serif; font-size: 17px; line-height: 1.7;
         color: #302e4d; background: #f2f2fc; }
  .site-header { background: #fdf9ff; border-bottom: 1px solid #e8dfec; padding: 18px 20px; }
  .site-header .wrap { max-width: 760px; margin: auto; display: flex;
                       justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
  .site-header a.brand { font-family: 'Rubik', sans-serif; font-weight: 700; font-size: 22px;
                         color: #302e4d; text-decoration: none; }
  .site-header a.brand span { color: var(--skin); }
  .site-header nav a { color: #504e70; text-decoration: none; font-weight: 600;
                       font-size: 15px; margin-left: 18px; }
  .site-header nav a:hover { color: var(--skin); }
  main { max-width: 760px; margin: auto; padding: 50px 20px 70px; }
  h1 { font-family: 'Rubik', sans-serif; font-size: 34px; line-height: 1.25; margin-bottom: 12px; }
  .post-meta { color: #7c7a93; font-size: 15px; margin-bottom: 35px; }
  article h2 { font-family: 'Rubik', sans-serif; font-size: 24px; margin: 35px 0 14px; }
  article p { margin-bottom: 16px; color: #504e70; }
  article ul, article ol { margin: 0 0 16px 22px; color: #504e70; }
  article li { margin-bottom: 8px; }
  article strong { color: #302e4d; }
  article a { color: var(--skin); }
  article code { background: #e8e6f5; padding: 2px 6px; border-radius: 4px;
                 font-size: 0.9em; color: #302e4d; }
  article pre { background: #2b2b3a; color: #eaeaea; padding: 18px; border-radius: 8px;
                overflow-x: auto; margin-bottom: 16px; }
  article pre code { background: none; color: inherit; padding: 0; }
  .faq { margin-top: 45px; border-top: 1px solid #e8dfec; padding-top: 30px; }
  .faq h2 { font-family: 'Rubik', sans-serif; font-size: 24px; margin-bottom: 18px; }
  .faq details { background: #fdf9ff; border: 1px solid #e8dfec; border-radius: 8px;
                 padding: 14px 18px; margin-bottom: 12px; }
  .faq summary { font-weight: 600; cursor: pointer; color: #302e4d; }
  .faq details p { margin: 12px 0 0; color: #504e70; }
  .post-tags { margin-top: 35px; }
  .post-tags span { display: inline-block; background: #e8e6f5; color: #302e4d; font-size: 13px;
                    font-weight: 600; padding: 5px 12px; border-radius: 20px; margin: 0 6px 6px 0; }
  .back-link { display: inline-block; margin-top: 35px; color: var(--skin);
               text-decoration: none; font-weight: 600; }
  .post-list { list-style: none; }
  .post-list li { background: #fdf9ff; border: 1px solid #e8dfec; border-radius: 10px;
                  padding: 24px; margin-bottom: 20px; }
  .post-list h2 { font-family: 'Rubik', sans-serif; font-size: 22px; margin-bottom: 8px; }
  .post-list h2 a { color: #302e4d; text-decoration: none; }
  .post-list h2 a:hover { color: var(--skin); }
  .post-list .date { color: #7c7a93; font-size: 14px; margin-bottom: 10px; }
  .post-list p { color: #504e70; font-size: 15px; }
  footer { text-align: center; padding: 25px 20px 45px; color: #7c7a93; font-size: 14px; }
  footer a { color: var(--skin); text-decoration: none; }
`;

function pageShell({ title, description, canonical, ogType, extraHead, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeAttr(title)}</title>
  <meta name="description" content="${escapeAttr(description)}">
  <meta name="author" content="${AUTHOR}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/favicon.ico">
  <meta property="og:title" content="${escapeAttr(title)}">
  <meta property="og:description" content="${escapeAttr(description)}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="${AUTHOR}">
${extraHead}
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,600,700|Rubik:500,700&display=swap" rel="stylesheet">
  <style>${PAGE_CSS}</style>
</head>
<body>
  <header class="site-header">
    <div class="wrap">
      <a class="brand" href="/">Shahriar<span>.</span></a>
      <nav>
        <a href="/">Home</a>
        <a href="/blog/">Blog</a>
        <a href="/#contact">Contact</a>
      </nav>
    </div>
  </header>
  <main>
${body}
  </main>
  <footer>&copy; ${new Date().getFullYear()} ${AUTHOR} &middot; <a href="/">srkonok.github.io</a></footer>
</body>
</html>
`;
}

// --- Per-post pages ---

for (const blog of blogs) {
  const partial = readFileSync(join(ROOT, 'partials', 'blog-posts', `${blog.slug}.html`), 'utf8');
  const match = partial.match(/<article>([\s\S]*?)<\/article>/);
  if (!match) {
    console.error(`SKIP ${blog.slug}: no <article> found`);
    continue;
  }
  const canonical = `${SITE_URL}/blog/${blog.slug}/`;
  const isoDate = toISODate(blog.date);
  const image = `${SITE_URL}/${blog.image}`;

  const graph = [{
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.description,
    image,
    datePublished: isoDate,
    dateModified: isoDate,
    keywords: blog.tags.join(', '),
    author: { '@type': 'Person', name: AUTHOR, url: `${SITE_URL}/`, '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['article h1', 'article > p:first-of-type']
    }
  }];

  if (blog.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: blog.faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    });
  }

  const jsonLd = { '@context': 'https://schema.org', '@graph': graph };

  const extraHead = `  <meta property="og:image" content="${image}">
  <meta property="article:published_time" content="${isoDate}">
  <meta property="article:author" content="${AUTHOR}">
${blog.tags.map(t => `  <meta property="article:tag" content="${escapeAttr(t)}">`).join('\n')}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(blog.title)}">
  <meta name="twitter:description" content="${escapeAttr(blog.description)}">
  <meta name="twitter:image" content="${image}">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;

  const faqSection = blog.faqs?.length ? `
    <section class="faq" aria-label="Frequently asked questions">
      <h2>Frequently asked questions</h2>
${blog.faqs.map(f => `      <details open>
        <summary>${escapeAttr(f.q)}</summary>
        <p>${escapeAttr(f.a)}</p>
      </details>`).join('\n')}
    </section>` : '';

  // The article markup already contains the h1 header; add date + tags around it.
  const body = `    <article>
${match[1].replace(/class="blog-post-meta">/, `class="post-meta">${blog.date} &middot; `)}
      <p class="post-tags">${blog.tags.map(t => `<span>${escapeAttr(t)}</span>`).join(' ')}</p>
    </article>${faqSection}
    <a class="back-link" href="/blog/">&larr; All posts</a>`;

  const dir = join(ROOT, 'blog', blog.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), pageShell({
    title: `${blog.title} — ${AUTHOR}`,
    description: blog.description,
    canonical,
    ogType: 'article',
    extraHead,
    body
  }));
  console.log(`wrote blog/${blog.slug}/index.html`);
}

// --- Blog index page ---

const newestFirst = [...blogs].reverse();

const indexJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE_URL}/blog/#blog`,
  url: `${SITE_URL}/blog/`,
  name: `Blog — ${AUTHOR}`,
  description: 'Articles on backend development, AWS cloud, DevOps, CI/CD, and system design.',
  author: { '@type': 'Person', name: AUTHOR, url: `${SITE_URL}/`, '@id': `${SITE_URL}/#person` },
  blogPost: newestFirst.map(b => ({
    '@type': 'BlogPosting',
    headline: b.title,
    url: `${SITE_URL}/blog/${b.slug}/`,
    datePublished: toISODate(b.date)
  }))
};

const indexBody = `    <h1>Blog</h1>
    <p class="post-meta">Articles on backend development, AWS cloud, DevOps, CI/CD, and system design.</p>
    <ul class="post-list">
${newestFirst.map(b => `      <li>
        <h2><a href="/blog/${b.slug}/">${escapeAttr(b.title)}</a></h2>
        <p class="date">${b.date} &middot; ${b.tags.map(escapeAttr).join(' &middot; ')}</p>
        <p>${escapeAttr(b.description)}</p>
      </li>`).join('\n')}
    </ul>`;

writeFileSync(join(ROOT, 'blog', 'index.html'), pageShell({
  title: `Blog — ${AUTHOR} | Backend, Cloud & DevOps Articles`,
  description: 'Articles on backend development, AWS cloud, DevOps, CI/CD, and system design by Md Shahriar Rahman, Software Engineer and AWS Certified Cloud Practitioner.',
  canonical: `${SITE_URL}/blog/`,
  ogType: 'website',
  extraHead: `  <script type="application/ld+json">${JSON.stringify(indexJsonLd)}</script>`,
  body: indexBody
}));
console.log('wrote blog/index.html');

// --- Sitemap ---

const today = new Date().toISOString().slice(0, 10);
const latestPost = blogs.map(b => toISODate(b.date)).sort().pop();

const urls = [
  { loc: `${SITE_URL}/`, lastmod: today, priority: '1.0' },
  { loc: `${SITE_URL}/blog/`, lastmod: latestPost, priority: '0.8' },
  ...blogs.map(b => ({ loc: `${SITE_URL}/blog/${b.slug}/`, lastmod: toISODate(b.date), priority: '0.7' }))
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

writeFileSync(join(ROOT, 'sitemap.xml'), sitemap);
console.log(`wrote sitemap.xml (${urls.length} URLs)`);

// --- llms.txt (https://llmstxt.org): site guide for AI assistants and answer engines ---

const llmsTxt = `# Md Shahriar Rahman — Software Engineer

> Personal site and technical blog of ${AUTHOR}, a software engineer in Dhaka, Bangladesh
> with 3+ years of experience in backend APIs, ERP systems, AWS cloud, and CI/CD.
> AWS Certified Cloud Practitioner. Writes about cloud architecture, DevOps, and system design.

Each blog post below is a standalone HTML page with the full article text and a
frequently-asked-questions section summarising its key answers.

## Blog posts

${newestFirst.map(b => `- [${b.title}](${SITE_URL}/blog/${b.slug}/): ${b.description}`).join('\n')}

## Site

- [Homepage](${SITE_URL}/): profile, skills, portfolio, services, and contact details
- [Blog index](${SITE_URL}/blog/): all posts
- [Resume (PDF)](${SITE_URL}/Shahriar_Rahman_Resume.pdf)
- [GitHub](https://github.com/srkonok)
- [LinkedIn](https://www.linkedin.com/in/shah-konok)
`;

writeFileSync(join(ROOT, 'llms.txt'), llmsTxt);
console.log('wrote llms.txt');
