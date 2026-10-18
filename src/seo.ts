// @ts-nocheck
// South Florida Elevated: per-route <head> data, JSON-LD, and helpers used by both the
// build-time prerender (renderHeadHtml) and client-side navigation (applyHead).
import {SITE_URL, PAGE_ROUTES, absUrl, pathFor} from './routes';
import {ARTICLES, getArticle} from './journal';
import {FAQS} from './faq';

export const SITE_NAME = 'South Florida Elevated';
export const DEFAULT_OG = `${SITE_URL}/assets/brand/og-image-v5-2026-10-18.png`;
const OG_ALT = 'South Florida Elevated logo. Beyond the Address. Real Estate Services Powered by Luxe Properties.';
const LOGO = `${SITE_URL}/apple-touch-icon.png`;
const HEADSHOT = `${SITE_URL}/assets/miguel-perez-headshot.jpg`;

// Titles ~50-60 chars, descriptions ~150-160 chars, in Miguel's voice, built on the hero copy.
export const PAGE_META = {
  home: {title: 'Miguel Perez | South Florida Real Estate, Beyond the Address', description: 'Beyond the Address: real estate and lifestyle in South Florida. Miguel Perez of Luxe Properties guides buyers and sellers in Miami-Dade, Broward and Palm Beach.'},
  buy: {title: 'Buy in Miami & Fort Lauderdale | Find Your Elevated Home', description: 'Find a place that fits the way you want to live. Buyer representation in Miami, Fort Lauderdale and Palm Beach, with flood zone and HOA checks before you offer.'},
  sell: {title: 'Sell Your South Florida Home | Make Your Next Move Count', description: 'Make your next move count: strategic positioning, elevated presentation and evidence-based pricing for South Florida sellers with Miguel Perez, Luxe Properties.'},
  relocate: {title: 'Relocating to South Florida | Your Elevated Move Starts Here', description: 'Move to South Florida with local expertise on your side. Neighborhoods, flood zones, insurance and timing, mapped with Miguel Perez before you pick an address.'},
  invest: {title: 'South Florida Investing | Invest Beyond the Address', description: 'Build a South Florida portfolio around location, lifestyle and long-term opportunity, with carrying costs, insurance and rental rules modeled before you buy.'},
  developments: {title: "South Florida Pre-Construction Condos | Own What's Next", description: "Own what's next. Discover South Florida's most compelling new developments before they become tomorrow's addresses, with deposit terms and developer records."},
  'south-florida': {title: 'South Florida Lifestyle Guide | Live Beyond the Address', description: 'Discover the neighborhoods, culture, places and experiences that make South Florida extraordinary, from Miami-Dade to Broward and Palm Beach, with Miguel Perez.'},
  neighborhoods: {title: 'South Florida Neighborhood Guide | Find Where You Belong', description: 'Find where you belong. Explore the communities that define South Florida living, from Brickell and Coconut Grove to Las Olas and Wilton Manors, with real data.'},
  insights: {title: 'South Florida Market Insights | The Market, Decoded', description: 'The market, decoded. Data-driven analysis of the South Florida real estate market: the trends, the neighborhoods and the strategy behind every transaction.'},
  about: {title: 'About Miguel Perez, REALTOR® | Luxe Properties South Florida', description: 'Local knowledge, elevated perspective. Miguel Perez, REALTOR® with Luxe Properties since 2021, helps clients navigate South Florida real estate with clarity.'},
  listings: {title: 'South Florida Homes for Sale | On the Market | Miguel Perez', description: 'Active South Florida listings with Miguel Perez of Luxe Properties. Before you tour, get the flood zone, HOA and building details the listing itself leaves out.'},
  journal: {title: 'The Journal | South Florida Real Estate Guides & Market News', description: 'Neighborhood guides, market analysis, relocation checklists and newsletters from South Florida Elevated for buyers and sellers in Miami and Fort Lauderdale.'},
  'home-value': {title: "What's My Home Worth? Free Home Evaluation | Miguel Perez", description: 'Get a free, personalized home evaluation from Miguel Perez of Luxe Properties, informed by relevant local sales and your home\'s features. Fort Lauderdale to Miami.'},
  'free-home-evaluation': {title: 'Free Home Evaluation | Miguel Perez, Luxe Properties', description: 'Thanks for scanning. Get a free, personalized home evaluation from Miguel Perez of Luxe Properties, informed by relevant local sales and your home\'s features.'},
  notfound: {title: 'Page Not Found | South Florida Elevated', description: 'That page has moved or no longer exists. Explore South Florida real estate, neighborhoods and the Journal with Miguel Perez of Luxe Properties.'},
};

const LABELS = Object.fromEntries(PAGE_ROUTES.map((r) => [r.view, r.label]));

const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: 'en-US',
  publisher: {'@id': `${SITE_URL}/#agent`},
};

const LUXE = {'@type': 'RealEstateOrganization', '@id': `${SITE_URL}/#brokerage`, name: 'Luxe Properties'};
const KNOWS = ['Luxury real estate', 'Residential real estate', 'Condominiums', 'Waterfront homes', 'New developments', 'Pre-construction condos', 'Relocation to South Florida', 'Real estate investment', 'Buyer representation', 'Seller representation', 'Home valuation'];
const AREAS = [
  ...['Miami-Dade County', 'Broward County', 'Palm Beach County'].map((name) => ({'@type': 'AdministrativeArea', name: `${name}, FL`})),
  ...['Miami', 'Fort Lauderdale'].map((name) => ({'@type': 'City', name: `${name}, FL`})),
];
const CREDS = [
  {'@type': 'EducationalOccupationalCredential', credentialCategory: 'license', name: 'Florida real estate sales associate license SL3515849', recognizedBy: {'@type': 'GovernmentOrganization', name: 'Florida Department of Business and Professional Regulation'}},
  ...[["ABR®", "Accredited Buyer's Representative"], ['SRS', 'Seller Representative Specialist'], ['PSA', 'Pricing Strategy Advisor'], ['SFR®', 'Short Sales and Foreclosure Resource']].map(([abbr, name]) => ({'@type': 'EducationalOccupationalCredential', credentialCategory: 'professional designation', name: `${name} (${abbr})`})),
];
const SAME_AS = ['https://www.instagram.com/miguelperezflorida', 'https://www.zillow.com/profile/miguelperezflorida'];

const PERSON = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#miguel`,
  name: 'Miguel Perez',
  jobTitle: 'REALTOR®',
  description: 'South Florida REALTOR® with Luxe Properties, in real estate since 2021, serving Miami-Dade, Broward and Palm Beach counties with a focus on Miami and Fort Lauderdale.',
  url: `${SITE_URL}/about`,
  image: HEADSHOT,
  telephone: '+1-786-460-1023',
  email: 'miguel@southfloridaelevated.com',
  worksFor: LUXE,
  knowsAbout: KNOWS,
  hasCredential: CREDS,
  sameAs: SAME_AS,
};

const AGENT = {
  '@type': 'RealEstateAgent',
  '@id': `${SITE_URL}/#agent`,
  name: 'Miguel Perez, REALTOR® | South Florida Elevated',
  alternateName: [SITE_NAME, 'Miguel Perez, Luxe Properties'],
  slogan: 'Beyond the Address.',
  url: `${SITE_URL}/`,
  image: HEADSHOT,
  logo: LOGO,
  telephone: '+1-786-460-1023',
  email: 'miguel@southfloridaelevated.com',
  description: 'Miguel Perez, REALTOR® with Luxe Properties (FL license SL3515849), advises buyers, sellers, investors and relocating clients across Miami-Dade, Broward and Palm Beach counties, focused on Miami and Fort Lauderdale: luxury, condos, waterfront, new developments and pre-construction.',
  identifier: {'@type': 'PropertyValue', propertyID: 'Florida real estate license', value: 'SL3515849'},
  areaServed: AREAS,
  knowsAbout: KNOWS,
  hasCredential: CREDS,
  parentOrganization: LUXE,
  employee: {'@id': `${SITE_URL}/#miguel`},
  sameAs: SAME_AS,
};

function breadcrumb(items) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absUrl(items[items.length - 1].path)}#breadcrumb`,
    itemListElement: items.map((it, i) => ({'@type': 'ListItem', position: i + 1, name: it.name, item: absUrl(it.path)})),
  };
}

const iso = (d) => `${d}T09:00:00-04:00`;

/** route {view, slug?} -> head data (title, description, canonical, og, json-ld) */
export function headFor(route) {
  const view = route.view;
  if (view === 'article') {
    const a = getArticle(route.slug);
    if (!a) return headFor({view: 'notfound'});
    const url = absUrl(pathFor('article', a.slug));
    const crumbs = [{name: 'Home', path: '/'}, {name: 'Journal', path: '/journal'}, {name: a.title, path: pathFor('article', a.slug)}];
    return {
      title: a.seoTitle,
      description: a.description,
      canonical: url,
      ogType: 'article',
      ogImage: a.coverOg || DEFAULT_OG,
      ogImageAlt: a.coverAlt || OG_ALT,
      article: a,
      jsonld: [
        WEBSITE,
        {'@type': 'WebPage', '@id': `${url}#webpage`, url, name: a.seoTitle, description: a.description, isPartOf: {'@id': `${SITE_URL}/#website`}, breadcrumb: {'@id': `${url}#breadcrumb`}, inLanguage: 'en-US'},
        breadcrumb(crumbs),
        {
          '@type': 'BlogPosting',
          '@id': `${url}#article`,
          headline: a.title.length > 110 ? a.seoTitle : a.title,
          description: a.description,
          image: [a.coverOg || DEFAULT_OG],
          datePublished: iso(a.date),
          dateModified: iso(a.updated),
          author: {'@type': 'Person', '@id': `${SITE_URL}/#miguel`, name: 'Miguel Perez', url: `${SITE_URL}/about`},
          publisher: {'@type': 'Organization', '@id': `${SITE_URL}/#publisher`, name: SITE_NAME, logo: {'@type': 'ImageObject', url: LOGO}},
          mainEntityOfPage: {'@id': `${url}#webpage`},
          isPartOf: {'@id': `${SITE_URL}/journal#blog`},
          articleSection: a.category,
          keywords: a.tags.join(', '),
          wordCount: a.words,
          inLanguage: 'en-US',
          citation: a.sources.filter((s) => s.url).map((s) => s.url),
        },
        PERSON,
      ],
    };
  }
  const meta = PAGE_META[view] || PAGE_META.home;
  const path = view === 'notfound' ? null : pathFor(view);
  const url = path ? absUrl(path) : null;
  const graph = [WEBSITE];
  if (view !== 'notfound') graph.push(AGENT, PERSON);
  if (FAQS[view]) graph.push({'@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: FAQS[view].map((f) => ({'@type': 'Question', name: f.q, acceptedAnswer: {'@type': 'Answer', text: f.a}}))});
  if (url) {
    const pageType = view === 'about' ? 'AboutPage' : view === 'journal' || view === 'listings' || view === 'neighborhoods' ? 'CollectionPage' : 'WebPage';
    const page = {'@type': pageType, '@id': `${url}#webpage`, url, name: meta.title, description: meta.description, isPartOf: {'@id': `${SITE_URL}/#website`}, inLanguage: 'en-US'};
    if (view === 'home' || view === 'about') page.about = {'@id': `${SITE_URL}/#agent`};
    if (view !== 'home') {
      page.breadcrumb = {'@id': `${url}#breadcrumb`};
      graph.push(page, breadcrumb([{name: 'Home', path: '/'}, {name: LABELS[view] || meta.title, path}]));
    } else graph.push(page);
  }
  if (view === 'journal') {
    graph.push({
      '@type': 'Blog',
      '@id': `${SITE_URL}/journal#blog`,
      url: absUrl('/journal'),
      name: 'The Journal by South Florida Elevated',
      description: meta.description,
      publisher: {'@id': `${SITE_URL}/#agent`},
      inLanguage: 'en-US',
      blogPost: ARTICLES.map((a) => ({'@type': 'BlogPosting', headline: a.title, url: absUrl(pathFor('article', a.slug)), datePublished: iso(a.date), author: {'@id': `${SITE_URL}/#miguel`}})),
    });
  }
  return {
    title: meta.title,
    description: meta.description,
    canonical: url,
    robots: view === 'notfound' || PAGE_ROUTES.some((r) => r.view === view && r.hidden) ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    ogType: 'website',
    ogImage: DEFAULT_OG,
    ogImageAlt: OG_ALT,
    jsonld: graph,
  };
}

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const jsonLdString = (graph) => JSON.stringify({'@context': 'https://schema.org', '@graph': graph}).replace(/</g, '\\u003c');

/** Build-time: the full set of per-route head tags as an HTML string. */
export function renderHeadHtml(h) {
  const t = [];
  t.push(`<title>${attr(h.title)}</title>`);
  t.push(`<meta name="description" content="${attr(h.description)}" />`);
  t.push(`<meta name="robots" content="${attr(h.robots || 'index, follow, max-image-preview:large')}" />`);
  if (h.canonical) t.push(`<link rel="canonical" href="${attr(h.canonical)}" />`);
  t.push(`<meta property="og:type" content="${h.ogType}" />`);
  if (h.canonical) t.push(`<meta property="og:url" content="${attr(h.canonical)}" />`);
  t.push(`<meta property="og:title" content="${attr(h.title)}" />`);
  t.push(`<meta property="og:description" content="${attr(h.description)}" />`);
  t.push(`<meta property="og:image" content="${attr(h.ogImage)}" />`);
  t.push(`<meta property="og:image:alt" content="${attr(h.ogImageAlt)}" />`);
  t.push(`<meta property="og:image:width" content="1200" />`, `<meta property="og:image:height" content="630" />`);
  t.push(`<meta property="og:site_name" content="${SITE_NAME}" />`, `<meta property="og:locale" content="en_US" />`);
  if (h.article) {
    t.push(`<meta property="article:published_time" content="${iso(h.article.date)}" />`);
    t.push(`<meta property="article:modified_time" content="${iso(h.article.updated)}" />`);
    t.push(`<meta property="article:author" content="${SITE_URL}/about" />`);
    t.push(`<meta property="article:section" content="${attr(h.article.category)}" />`);
    h.article.tags.forEach((tag) => t.push(`<meta property="article:tag" content="${attr(tag)}" />`));
  }
  t.push(`<meta name="twitter:card" content="summary_large_image" />`);
  t.push(`<meta name="twitter:title" content="${attr(h.title)}" />`);
  t.push(`<meta name="twitter:description" content="${attr(h.description)}" />`);
  t.push(`<meta name="twitter:image" content="${attr(h.ogImage)}" />`);
  t.push(`<meta name="twitter:image:alt" content="${attr(h.ogImageAlt)}" />`);
  t.push(`<link rel="alternate" type="application/rss+xml" title="The Journal by South Florida Elevated" href="${SITE_URL}/journal/rss.xml" />`);
  t.push(`<script type="application/ld+json" data-sfe-ld>${jsonLdString(h.jsonld)}</script>`);
  return t.join('\n');
}

/** Client: keep <head> in sync during History API navigation. */
export function applyHead(h) {
  if (typeof document === 'undefined') return;
  document.title = h.title;
  const set = (sel, make, val) => {
    let el = document.head.querySelector(sel);
    if (val == null) { el?.remove(); return; }
    if (!el) { el = make(); document.head.appendChild(el); }
    el.setAttribute(el.tagName === 'LINK' ? 'href' : 'content', val);
  };
  const meta = (k, v) => () => { const m = document.createElement('meta'); m.setAttribute(k, v); return m; };
  set('meta[name="description"]', meta('name', 'description'), h.description);
  set('meta[name="robots"]', meta('name', 'robots'), h.robots || 'index, follow, max-image-preview:large');
  set('link[rel="canonical"]', () => { const l = document.createElement('link'); l.rel = 'canonical'; return l; }, h.canonical);
  set('meta[property="og:type"]', meta('property', 'og:type'), h.ogType);
  set('meta[property="og:url"]', meta('property', 'og:url'), h.canonical);
  set('meta[property="og:title"]', meta('property', 'og:title'), h.title);
  set('meta[property="og:description"]', meta('property', 'og:description'), h.description);
  set('meta[property="og:image"]', meta('property', 'og:image'), h.ogImage);
  set('meta[property="og:image:alt"]', meta('property', 'og:image:alt'), h.ogImageAlt);
  set('meta[name="twitter:title"]', meta('name', 'twitter:title'), h.title);
  set('meta[name="twitter:description"]', meta('name', 'twitter:description'), h.description);
  set('meta[name="twitter:image"]', meta('name', 'twitter:image'), h.ogImage);
  document.head.querySelectorAll('meta[property^="article:"]').forEach((el) => el.remove());
  document.head.querySelectorAll('script[data-sfe-ld], script[data-sfe-schema]').forEach((el) => el.remove());
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.setAttribute('data-sfe-ld', '');
  s.textContent = jsonLdString(h.jsonld);
  document.head.appendChild(s);
}
