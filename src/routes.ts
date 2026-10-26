// @ts-nocheck
// South Florida Elevated: route table. One source of truth for the History API router,
// the build-time prerender, and the sitemap. View ids match the existing views in App.tsx.
export const SITE_URL = 'https://www.southfloridaelevated.com';

export const PAGE_ROUTES = [
  {view: 'home', path: '/', label: 'Home'},
  {view: 'buy', path: '/buy', label: 'Buy'},
  {view: 'sell', path: '/sell', label: 'Sell'},
  {view: 'home-value', path: '/home-value', label: 'Home Value'},
  // Mailer QR landing page: prerendered, but noindex and kept out of the sitemap (hidden: true).
  {view: 'free-home-evaluation', path: '/free-home-evaluation', label: 'Free Home Evaluation', hidden: true},
  {view: 'relocate', path: '/relocation', label: 'Relocation'},
  {view: 'invest', path: '/invest', label: 'Invest'},
  {view: 'developments', path: '/pre-construction', label: 'Pre-Construction'},
  {view: 'south-florida', path: '/south-florida', label: 'South Florida'},
  {view: 'neighborhoods', path: '/neighborhoods', label: 'Neighborhoods'},
  {view: 'insights', path: '/insights', label: 'Insights'},
  {view: 'about', path: '/about', label: 'About'},
  {view: 'listings', path: '/listings', label: 'Listings'},
  {view: 'journal', path: '/journal', label: 'Journal'},
  {view: 'terms-of-service', path: '/terms-of-service', label: 'Terms of Service'},
  {view: 'privacy-policy', path: '/privacy-policy', label: 'Privacy Policy'},
];

const BY_VIEW = Object.fromEntries(PAGE_ROUTES.map((r) => [r.view, r]));
const BY_PATH = Object.fromEntries(PAGE_ROUTES.map((r) => [r.path, r]));

// Old #hash routes (and a few aliases people typed) -> view ids.
export const LEGACY_HASH = {
  buy: 'buy', sell: 'sell', relocate: 'relocate', relocation: 'relocate', invest: 'invest',
  developments: 'developments', 'pre-construction': 'developments', preconstruction: 'developments',
  'south-florida': 'south-florida', lifestyle: 'south-florida', neighborhoods: 'neighborhoods',
  insights: 'insights', about: 'about', listings: 'listings', journal: 'journal', blog: 'journal', news: 'journal',
};

export function normalizePath(p) {
  let path = (p || '/').split('?')[0].split('#')[0];
  if (!path.startsWith('/')) path = '/' + path;
  path = path.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  if (path.length > 1) path = path.replace(/\/+$/, '');
  return path.toLowerCase() || '/';
}

/** pathname -> {view, slug?}; unknown paths -> {view:'notfound'} */
export function routeFromPath(p) {
  const path = normalizePath(p);
  if (BY_PATH[path]) return {view: BY_PATH[path].view};
  const m = path.match(/^\/journal\/([a-z0-9-]+)$/);
  if (m) return {view: 'article', slug: m[1]};
  // Friendly aliases
  const alias = {'/home-valuation': 'home-value', '/relocate': 'relocate', '/developments': 'developments', '/lifestyle': 'south-florida', '/blog': 'journal', '/news': 'journal', '/terms': 'terms-of-service', '/terms-of-use': 'terms-of-service', '/privacy': 'privacy-policy'}[path];
  if (alias) return {view: alias, redirect: true};
  return {view: 'notfound'};
}

export function pathFor(view, slug) {
  if (view === 'article' && slug) return `/journal/${slug}`;
  return (BY_VIEW[view] || BY_VIEW.home).path;
}

export function legacyHashView(hash) {
  const raw = decodeURIComponent((hash || '').replace(/^#\/?/, '')).toLowerCase();
  return LEGACY_HASH[raw] || null;
}

export function absUrl(path) {
  return SITE_URL + (path === '/' ? '/' : path);
}
