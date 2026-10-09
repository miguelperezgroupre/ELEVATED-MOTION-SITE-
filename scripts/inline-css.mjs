// Post-build: inline the emitted stylesheet(s) into index.html so the app CSS is
// no longer a render-blocking network request (removes a ~170ms critical-path delay
// and avoids any flash of unstyled content).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const htmlPath = join(dist, 'index.html');

if (!existsSync(htmlPath)) {
  console.error('[inline-css] dist/index.html not found — run `vite build` first.');
  process.exit(1);
}

let html = readFileSync(htmlPath, 'utf8');
const inlined = [];

html = html.replace(
  /<link\b[^>]*\brel=["']stylesheet["'][^>]*>/gi,
  (tag) => {
    const hrefMatch = tag.match(/\bhref=["']([^"']+)["']/i);
    if (!hrefMatch) return tag;
    const href = hrefMatch[1];
    if (!href.startsWith('/assets/') || !href.endsWith('.css')) return tag;

    const file = join(dist, href.replace(/^\//, ''));
    if (!existsSync(file)) return tag;

    const css = readFileSync(file, 'utf8');
    inlined.push(`${href} (${(css.length / 1024).toFixed(1)} kB)`);
    return `<style>${css}</style>`;
  },
);

writeFileSync(htmlPath, html);
console.log(
  inlined.length
    ? `[inline-css] inlined: ${inlined.join(', ')}`
    : '[inline-css] no local stylesheet links found (nothing to inline).',
);
