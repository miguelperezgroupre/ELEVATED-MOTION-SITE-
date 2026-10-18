// @ts-nocheck
// South Florida Elevated: data.ts (Oct 2026). The original data module is kept unchanged as ./dataBase.ts; this
// wrapper re-exports it with the October 2026 updates:
//  - NEIGHBORHOODS and COMMUNITIES come from ./neighborhoodData (verified median sale prices with sources; unsourced
//    Walk Scores, days on market, inventory and pace labels removed; fair-housing wording review).
//  - Fair-housing wording: listing tag 'Family' -> 'Single-family'; two development lines that used 'exclusivity' /
//    'Exclusive'; one insight takeaway that said 'Top private schools'.
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

export const PROPERTIES = Base.PROPERTIES.map((p) => ({ ...p, tags: p.tags && p.tags.map((t) => (t === 'Family' ? 'Single-family' : t)) }));
export const DEVELOPMENTS = Base.DEVELOPMENTS.map((d) => ({ ...d, roiHighlights: fix(d.roiHighlights), amenities: d.amenities && d.amenities.map(fix) }));
export const INSIGHT_ARTICLES = Base.INSIGHT_ARTICLES.map((a) => ({ ...a, keyTakeaways: a.keyTakeaways && a.keyTakeaways.map(fix) }));
