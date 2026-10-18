// South Florida Elevated: build-time prerender + sitemaps + robots + RSS.
// Runs after `vite build` (client) and `vite build --ssr src/entry-server.tsx` (server entry).
// For every route it writes static HTML with the page's own <title>, meta, canonical, Open Graph,
// JSON-LD and fully rendered body, so crawlers get real content without running JavaScript.
// Adding a Markdown file to src/content/journal/ adds its page, sitemap entry and RSS item automatically.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const DIST = path.resolve('dist');
const ssr = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);
const {PAGE_ROUTES, ARTICLES, SITE_URL, render, headFor, renderHeadHtml, routeFromPath, absUrl} = ssr;

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
if (!template.includes('<!--sfe-head-->') || !template.includes('<!--sfe-ssr-->')) throw new Error('index.html is missing the <!--sfe-head--> / <!--sfe-ssr--> placeholders');

const buildDate = new Date().toISOString().slice(0, 10);
const xml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

function writePage(urlPath, file) {
  const route = routeFromPath(urlPath);
  const body = render(urlPath);
  const head = renderHeadHtml(headFor(route));
  const html = template.replace('<!--sfe-head-->', head).replace('<!--sfe-ssr-->', body);
  const out = path.join(DIST, file);
  fs.mkdirSync(path.dirname(out), {recursive: true});
  fs.writeFileSync(out, html);
  const h1 = (body.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) console.warn(`[prerender] ${urlPath}: expected 1 <h1>, found ${h1}`);
  return {urlPath, file, bytes: html.length, h1};
}

const pages = [];
for (const r of PAGE_ROUTES) pages.push(writePage(r.path, r.path === '/' ? 'index.html' : `${r.path.slice(1)}.html`));
for (const a of ARTICLES) pages.push(writePage(`/journal/${a.slug}`, `journal/${a.slug}.html`));
pages.push(writePage('/404', '404.html'));

// ---- Sitemaps (index -> pages + journal) ----
const urlset = (entries) => `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries.join('\n')}\n</urlset>\n`;
const pageEntries = PAGE_ROUTES.filter((r) => !r.hidden).map((r) => `  <url>\n    <loc>${xml(absUrl(r.path))}</loc>\n    <lastmod>${buildDate}</lastmod>\n  </url>`);
const journalEntries = ARTICLES.map((a) => `  <url>\n    <loc>${xml(absUrl(`/journal/${a.slug}`))}</loc>\n    <lastmod>${a.updated}</lastmod>${a.coverOg ? `\n    <image:image><image:loc>${xml(a.coverOg)}</image:loc></image:image>` : ''}\n  </url>`);
fs.writeFileSync(path.join(DIST, 'sitemap-pages.xml'), urlset(pageEntries));
fs.writeFileSync(path.join(DIST, 'sitemap-journal.xml'), urlset(journalEntries));
const latestArticle = ARTICLES.reduce((m, a) => (a.updated > m ? a.updated : m), '0000-00-00');
fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${SITE_URL}/sitemap-pages.xml</loc>\n    <lastmod>${buildDate}</lastmod>\n  </sitemap>\n  <sitemap>\n    <loc>${SITE_URL}/sitemap-journal.xml</loc>\n    <lastmod>${ARTICLES.length ? latestArticle : buildDate}</lastmod>\n  </sitemap>\n</sitemapindex>\n`,
);

// ---- robots.txt ----
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

// ---- RSS ----
const rfc822 = (d) => new Date(`${d}T09:00:00-04:00`).toUTCString();
const items = ARTICLES.map((a) => {
  const link = absUrl(`/journal/${a.slug}`);
  return `    <item>\n      <title>${xml(a.title)}</title>\n      <link>${xml(link)}</link>\n      <guid isPermaLink="true">${xml(link)}</guid>\n      <pubDate>${rfc822(a.date)}</pubDate>\n      <category>${xml(a.category)}</category>\n      <dc:creator>Miguel Perez</dc:creator>\n      <description>${xml(a.description)}</description>\n    </item>`;
});
fs.mkdirSync(path.join(DIST, 'journal'), {recursive: true});
fs.writeFileSync(
  path.join(DIST, 'journal', 'rss.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">\n  <channel>\n    <title>The Journal by South Florida Elevated</title>\n    <link>${SITE_URL}/journal</link>\n    <description>Neighborhood guides, market analysis and relocation checklists for South Florida, by Miguel Perez, REALTOR® with Luxe Properties.</description>\n    <language>en-us</language>\n    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n    <atom:link href="${SITE_URL}/journal/rss.xml" rel="self" type="application/rss+xml" />\n${items.join('\n')}\n  </channel>\n</rss>\n`,
);

console.log(`[prerender] wrote ${pages.length} pages, sitemap.xml (+pages ${PAGE_ROUTES.length}, journal ${ARTICLES.length}), robots.txt, journal/rss.xml`);
for (const p of pages) console.log(`  ${p.urlPath.padEnd(48)} -> ${p.file} (${Math.round(p.bytes / 1024)} KB, h1=${p.h1})`);
