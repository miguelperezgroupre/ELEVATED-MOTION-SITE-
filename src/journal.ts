// @ts-nocheck
// South Florida Elevated: Journal content loader.
// Articles live in src/content/journal/*.md (frontmatter + Markdown). See JOURNAL-README.md.
// Everything here is pure (no DOM), so it runs the same in the browser, the prerender and the sitemap/RSS build.

export const JOURNAL_CATEGORIES = ['Market', 'Neighborhoods', 'Buying', 'Selling', 'Relocation', 'Pre-Construction', 'Lifestyle', 'Newsletter'];

const RAW = import.meta.glob('./content/journal/*.md', {query: '?raw', import: 'default', eager: true});

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const slugify = (s) => String(s).toLowerCase().replace(/[’']/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

function parseFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error('Journal article is missing its --- frontmatter block');
  const data = {sources: []};
  let inSources = false;
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    if (inSources && /^\s*-\s+/.test(line)) {
      const body = line.replace(/^\s*-\s+/, '');
      const cut = body.lastIndexOf(' | ');
      data.sources.push(cut > -1 ? {label: body.slice(0, cut).trim(), url: body.slice(cut + 3).trim()} : {label: body.trim(), url: ''});
      continue;
    }
    const kv = line.match(/^([A-Za-z][\w-]*):\s?(.*)$/);
    if (!kv) continue;
    inSources = kv[1] === 'sources';
    if (!inSources) data[kv[1]] = kv[2].trim();
  }
  return {data, body: m[2]};
}

function inline(text) {
  let s = esc(text);
  s = s.replace(/\[\^(\d+)\]/g, (_, n) => `<sup class="j-ref"><a href="#source-${n}" aria-label="Source ${n}">${n}</a></sup>`);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
    const ext = /^https?:\/\//.test(url) && !url.includes('southfloridaelevated.com');
    return `<a href="${url}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  return s;
}

function renderMarkdown(md) {
  const lines = md.replace(/\r/g, '').split('\n');
  const out = [];
  const toc = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    let h;
    if ((h = line.match(/^(#{2,3})\s+(.*)$/))) {
      const level = h[1].length;
      const text = h[2].trim();
      const id = slugify(text);
      if (level === 2) toc.push({id, text});
      out.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
      i++; continue;
    }
    if (/^\|/.test(line)) {
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) { rows.push(lines[i]); i++; }
      const cells = (r) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const head = cells(rows[0]);
      const body = rows.slice(2).map(cells);
      out.push(`<div class="j-table" role="region" aria-label="Data table" tabindex="0"><table><thead><tr>${head.map((c) => `<th scope="col">${inline(c)}</th>`).join('')}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c, k) => (k === 0 ? `<th scope="row">${inline(c)}</th>` : `<td>${inline(c)}</td>`)).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line);
      const items = [];
      while (i < lines.length && (ordered ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/).test(lines[i])) {
        items.push(lines[i].replace(ordered ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/, ''));
        i++;
      }
      const tag = ordered ? 'ol' : 'ul';
      out.push(`<${tag}>${items.map((it) => `<li>${inline(it)}</li>`).join('')}</${tag}>`);
      continue;
    }
    if (/^>\s?/.test(line)) {
      const q = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { q.push(lines[i].replace(/^>\s?/, '')); i++; }
      out.push(`<blockquote><p>${inline(q.join(' '))}</p></blockquote>`);
      continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3}\s|\||>|\s*[-*]\s+|\s*\d+\.\s+)/.test(lines[i])) { para.push(lines[i].trim()); i++; }
    out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return {html: out.join('\n'), toc};
}

function wordCount(md) {
  return (md.replace(/\[\^\d+\]/g, '').replace(/[|#*>-]/g, ' ').match(/[A-Za-z0-9$][\w'’$.,%]*/g) || []).length;
}

function build(file, src) {
  const {data, body} = parseFrontmatter(src);
  const slug = data.slug || file.split('/').pop().replace(/\.md$/, '');
  const {html, toc} = renderMarkdown(body);
  const words = wordCount(body);
  return {
    slug,
    title: data.title,
    seoTitle: data.seoTitle || data.title,
    description: data.description,
    dek: data.dek || '',
    date: data.date,
    updated: data.updated || data.date,
    category: data.category || 'Market',
    tags: (data.tags || '').split(',').map((t) => t.trim()).filter(Boolean),
    cover: data.cover || '',
    coverOg: data.coverOg || data.cover || '',
    coverAlt: data.coverAlt || '',
    coverCredit: data.coverCredit || '',
    cta: (data.cta || 'MAP').toUpperCase(),
    draft: data.draft === 'true',
    sources: data.sources,
    html,
    toc,
    words,
    readingMinutes: Math.max(1, Math.round(words / 230)),
  };
}

export const ARTICLES = Object.entries(RAW)
  .map(([file, src]) => build(file, src))
  .filter((a) => !a.draft)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));

export const getArticle = (slug) => ARTICLES.find((a) => a.slug === slug) || null;

export function relatedArticles(article, n = 3) {
  const score = (b) => (b.category === article.category ? 2 : 0) + b.tags.filter((t) => article.tags.includes(t)).length;
  return ARTICLES.filter((b) => b.slug !== article.slug).sort((x, y) => score(y) - score(x)).slice(0, n);
}

export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[m - 1]} ${d}, ${y}`;
}
