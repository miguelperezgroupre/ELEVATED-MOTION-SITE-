// Per-page <title> and meta description, applied on navigation (hash routes). Copy follows each page's hero promise.
export type PageMeta = { title: string; description: string };

const SITE = 'South Florida Elevated';

export const PAGE_META: Record<string, PageMeta> = {
  home: {
    title: `Beyond the Address | ${SITE} · Miguel Perez`,
    description: 'Real estate. Lifestyle. South Florida. Miguel Perez of Luxe Properties advises buyers, sellers and investors across Miami-Dade, Broward and Palm Beach.',
  },
  buy: {
    title: `Find Your Elevated Home | Buy · ${SITE}`,
    description: 'More than a property. A place that fits the way you want to live. Buyer representation in Miami, Fort Lauderdale and Palm Beach with Miguel Perez.',
  },
  sell: {
    title: `Make Your Next Move Count | Sell · ${SITE}`,
    description: 'Strategic positioning. Elevated presentation. Exceptional results. Seller representation across South Florida with Miguel Perez.',
  },
  relocate: {
    title: `Your Elevated Move Starts Here | Relocation · ${SITE}`,
    description: 'Move to South Florida with local expertise on your side. Relocation guidance across Miami-Dade, Broward and Palm Beach with Miguel Perez.',
  },
  invest: {
    title: `Invest Beyond the Address | Invest · ${SITE}`,
    description: 'Build a South Florida portfolio around location, lifestyle, and long-term opportunity. Investment advisory with Miguel Perez.',
  },
  developments: {
    title: `Own What's Next | Pre-Construction · ${SITE}`,
    description: "Discover South Florida's most compelling new developments before they become tomorrow's addresses. Pre-construction guidance with Miguel Perez.",
  },
  'south-florida': {
    title: `Live Beyond the Address | Lifestyle · ${SITE}`,
    description: 'Discover the neighborhoods, culture, places, and experiences that make South Florida extraordinary, from Miami-Dade to Broward and Palm Beach.',
  },
  neighborhoods: {
    title: `Find Where You Belong | Neighborhoods · ${SITE}`,
    description: 'Explore the communities that define South Florida living, from Miami Beach and Brickell to Coconut Grove and Las Olas.',
  },
  insights: {
    title: `The Market, Decoded | Insights · ${SITE}`,
    description: 'Data-driven analysis and editorial insight on the South Florida market: the trends, the neighborhoods, and the strategy behind the transaction.',
  },
  about: {
    title: `Local Knowledge. Elevated Perspective. | Miguel Perez · ${SITE}`,
    description: 'Helping clients navigate South Florida real estate with clarity, strategy, and confidence. Miguel Perez, Luxe Properties, FL license SL3515849.',
  },
  listings: {
    title: `On the Market | Listings · ${SITE}`,
    description: 'Active listings in Miami East and Las Olas East, from the Miami Association of REALTORS®, with Miguel Perez.',
  },
};

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

export function applyPageMeta(meta: PageMeta) {
  if (typeof document === 'undefined') return;
  document.title = meta.title;
  setMeta('name', 'title', meta.title);
  setMeta('name', 'description', meta.description);
  setMeta('property', 'og:title', meta.title);
  setMeta('property', 'og:description', meta.description);
  setMeta('name', 'twitter:title', meta.title);
  setMeta('name', 'twitter:description', meta.description);
}
