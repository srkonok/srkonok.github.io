// Single source of truth for site identity, shared by the SPA (js/app.js)
// and the static-page generator (scripts/generate-blog-pages.mjs).

export const SITE_URL = 'https://srkonok.github.io';
export const SITE_NAME = 'Md Shahriar Rahman';
export const SKIN_COLOR = '#2196f3';
export const GITHUB_URL = 'https://github.com/srkonok';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/shah-konok';

export const BLOG_TAGLINE =
  'Articles on backend development, AWS cloud, DevOps, CI/CD, and system design';

export function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
