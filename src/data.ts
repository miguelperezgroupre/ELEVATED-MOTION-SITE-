// @ts-nocheck
// South Florida Elevated: data.ts (Oct 2026). The original data module is kept unchanged as ./dataBase.ts; this
// wrapper re-exports it with the October 2026 updates:
//  - NEIGHBORHOODS and COMMUNITIES come from ./neighborhoodData (verified median sale prices with sources; unsourced
//    Walk Scores, days on market, inventory and pace labels removed; fair-housing wording review).
//  - Fair-housing wording: listing tag 'Family' -> 'Single-family'; two development lines that used 'exclusivity' /
//    'Exclusive'; one insight takeaway that said 'Top private schools'.
//  - Unverified figures (Oct 8): development "From $X" prices -> 'Pricing on request' (not developer-sourced);
//    promissory investment lines (cap rates, resale multiples, price stability) rewritten as neutral descriptions;
//    the sample PROPERTIES are labeled as examples (badge + name) because their prices are illustrative.
import * as Base from './dataBase';
export * from './dataBase';
export { NEIGHBORHOODS, COMMUNITIES } from './neighborhoodData';

const TEXT = {
  'Pre-construction pricing advantage with high resale multiple upon completion; no hotel component ensures pure residential exclusivity.':
    'Pre-construction pricing advantage with high resale multiple upon completion; no hotel component, so the building stays fully residential.',
  'Exclusive Cipriani resident dining & catering': 'Residents-only Cipriani dining & catering',
  'Top private schools in Broward and Miami-Dade with application calendars.':
    'Public and private school resources for Broward and Miami-Dade, with application calendars.',
};
const fix = (s) => (typeof s === 'string' && TEXT[s]) || s;

const ROI = {
  'bentley-residences': 'Branded oceanfront tower with in-unit car elevators; ask for the developer\'s current price sheet, deposit schedule and rental rules.',
  'st-regis-residences': 'Fully residential, with no hotel component; ask for the current price sheet and the condo documents before you reserve.',
  'villa-miami': 'Boutique bayfront building with full- and half-floor layouts; ask for the current price sheet and delivery timeline.',
  'cipriani-residences': 'Branded tower in central Brickell; confirm rental and leasing rules in the condo documents before buying as an investment.',
  'ombelle-residences': 'Riverfront tower close to downtown Fort Lauderdale; ask for the current price sheet and how it compares with recent resales nearby.',
  'aston-martin': 'Completed building where the Miami River meets Biscayne Bay; resale units are priced individually, so compare recent closed sales.',
};
export const PROPERTIES = Base.PROPERTIES.map((p) => ({ ...p, badge: 'Example listing', name: `${p.name} (Example)`, tags: p.tags && p.tags.map((t) => (t === 'Family' ? 'Single-family' : t)) }));
export const DEVELOPMENTS = Base.DEVELOPMENTS.map((d) => ({ ...d, from: 'Pricing on request', roiHighlights: ROI[d.id] || fix(d.roiHighlights), amenities: d.amenities && d.amenities.map(fix) }));
export const INSIGHT_ARTICLES = Base.INSIGHT_ARTICLES.map((a) => ({ ...a, keyTakeaways: a.keyTakeaways && a.keyTakeaways.map(fix) }));
