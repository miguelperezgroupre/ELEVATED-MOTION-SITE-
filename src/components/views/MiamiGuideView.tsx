// @ts-nocheck
// South Florida Elevated: MiamiGuideView.tsx. The Miami Neighborhood Guide at /miami-neighborhood-guide.
// Copy and figures live in src/guide/neighborhoods.ts; every figure cites a page in src/guide/sources.ts.
import {jsx, jsxs} from 'react/jsx-runtime';
import {NEIGHBORHOODS, DATA_NOTE} from '../../guide/neighborhoods';
import {SOURCES, SOURCE_ORDER, GUIDE_UPDATED_LABEL, REDFIN_LABEL, sourceNumber} from '../../guide/sources';

// Walk Score: the number, what it describes, and the page it came from.
const WALK = {
  brickell: {score: '94', basis: 'Walk Score, 33131', src: 'walkscoreBrickell'},
  downtown: {score: '91', basis: 'Walk Score, Downtown', src: 'walkscoreMiami'},
  edgewater: {score: '87', basis: 'Wynwood-Edgewater district', src: 'walkscoreWynwood'},
  wynwood: {score: '87', basis: 'Wynwood-Edgewater district', src: 'walkscoreWynwood'},
  'coconut-grove': {score: '74', basis: 'NE Coconut Grove', src: 'walkscoreMiami'},
  'coral-gables': {score: '56', basis: 'Walk Score, city', src: 'gables'},
  'little-havana': {score: '87', basis: 'Walk Score, Little Havana', src: 'walkscoreMiami'},
  'south-beach': {score: '87', basis: 'Walk Score, ZIP 33139', src: 'southBeach'},
  'mid-beach': {score: '76', basis: 'Walk Score, Miami Beach', src: 'walkscoreBeach'},
  aventura: {score: '43', basis: 'Walk Score, city', src: 'aventura'},
  'key-biscayne': {score: '74', basis: 'Walk Score, 33149', src: 'walkscoreKey'},
  doral: {score: '39', basis: 'Walk Score, city', src: 'doral'},
  'coral-way': {score: '77', basis: 'Walk Score, Coral Way', src: 'walkscoreMiami'},
  'silver-bluff': {score: '77', basis: 'Walk Score, Coral Way district', src: 'walkscoreMiami'},
};

const EXTRA = {
  brickell: ['metromover'],
  downtown: ['metromover'],
  aventura: ['brightline', 'aventuraTrail'],
  'key-biscayne': ['crandon'],
};

const ppsfNumber = (v) => {
  const n = parseFloat(String(v).replace(/[$,\s]/g, ''));
  return /k$/i.test(String(v)) ? n * 1000 : n;
};

function Ref({id}) {
  const n = sourceNumber(id);
  if (!n) return null;
  return jsx('sup', {className: 'ml-0.5 font-mono text-[10px] text-[#C9A24A]', children: jsx('a', {href: '#sources', className: 'hover:text-[#ffd9a0]', children: n})});
}

function citesFor(n) {
  const ids = [n.price.src];
  const w = WALK[n.id];
  if (w && !ids.includes(w.src)) ids.push(w.src);
  (EXTRA[n.id] || []).forEach((id) => { if (!ids.includes(id)) ids.push(id); });
  return ids;
}

const Label = ({children}) => jsx('span', {className: 'font-mono text-[10px] tracking-[0.2em] uppercase text-[#C9A24A] block mb-1', children});
const P = ({children}) => jsx('p', {className: 'text-[15px] sm:text-base text-[#F4EFE2]/80 font-light leading-relaxed m-0 mt-3', children});
const Body = ({children}) => jsx('span', {className: 'text-[15px] text-[#F4EFE2]/80 font-light leading-relaxed', children});

function Stat({label, value, sub}) {
  return jsxs('div', {className: 'bg-[#141a1d] border border-[rgba(244,239,226,0.1)] px-4 py-3', children: [
    jsx('span', {className: 'font-mono text-[10px] tracking-[0.16em] uppercase text-[#F4EFE2]/55 block', children: label}, 'l'),
    jsx('b', {className: 'font-serif font-normal text-[26px] leading-tight text-[#F4EFE2] block mt-1', children: value}, 'v'),
    sub ? jsx('span', {className: 'font-mono text-[10px] text-[#C9A24A] block mt-0.5', children: sub}, 's') : null,
  ]});
}

function Row({label, children}) {
  return jsxs('p', {className: 'm-0 pt-4', children: [jsx(Label, {children: label}), jsx(Body, {children})]});
}

function Neighborhood({n}) {
  const refs = citesFor(n);
  return jsxs('article', {
    id: n.id,
    className: 'scroll-mt-28 border-t border-[rgba(244,239,226,0.14)] pt-10 mt-12 first:border-0 first:pt-0 first:mt-0',
    children: [
      jsxs('div', {className: 'flex items-start gap-3', children: [
        jsx('span', {className: 'font-mono text-[11px] text-[#C9A24A] pt-2 shrink-0', children: String(n.rank).padStart(2, '0')}, 'r'),
        jsxs('div', {children: [
          jsx('h3', {className: 'font-serif font-normal text-[30px] sm:text-[38px] leading-[1.08] text-[#F4EFE2] m-0', children: n.name}, 'h'),
          jsx('p', {className: 'font-serif italic text-[#ffd9a0] text-[16px] mt-1 m-0', children: n.kicker}, 'k'),
        ]}),
      ]}),
      jsx(P, {children: n.intro}),

      jsxs('div', {className: 'grid grid-cols-2 sm:grid-cols-3 gap-2 mt-6', children: [
        jsx(Stat, {label: 'Median sale price', value: n.price.median, sub: n.price.yoy + ' YoY'}, 'm'),
        jsx(Stat, {label: 'Median $/sq ft', value: n.price.ppsf, sub: n.price.ppsfYoy + ' YoY'}, 'p'),
        jsx(Stat, {label: 'Days on market', value: n.price.dom, sub: n.price.sold + ' sales'}, 'd'),
      ]}),
      jsxs('p', {className: 'font-mono text-[11px] leading-relaxed text-[#F4EFE2]/60 mt-2 m-0', children: [
        'All home types, ', REDFIN_LABEL, '. ', n.price.note, ' ', jsx(Ref, {id: n.price.src}, 'ref'),
      ]}),

      jsx('div', {className: 'mt-5 flex flex-wrap gap-2', children: n.bestFor.map((b) => jsx('span', {className: 'font-mono text-[10px] tracking-[0.1em] uppercase text-[#ffd9a0] border border-[rgba(201,162,74,0.45)] px-2.5 py-1', children: b}, b))}),

      jsxs('div', {className: 'mt-6 space-y-1', children: [
        jsxs('p', {className: 'm-0', children: [jsx(Label, {children: 'Housing'}), jsx(Body, {children: n.housing})]}, 'housing'),
        jsxs('p', {className: 'm-0 pt-4', children: [
          jsx(Label, {children: WALK[n.id] ? 'Getting around · Walk Score ' + WALK[n.id].score + ' (' + WALK[n.id].basis + ')' : 'Getting around'}),
          jsx(Body, {children: n.transit}),
        ]}, 'transit'),
        jsxs('p', {className: 'm-0 pt-4', children: [jsx(Label, {children: 'Schools and parks'}), jsx(Body, {children: n.schools})]}, 'schools'),
        jsxs('p', {className: 'm-0 pt-4', children: [
          jsx(Label, {children: 'Flood risk · ' + n.flood.label}),
          jsx(Body, {children: n.flood.note}),
        ]}, 'flood'),
      ]}),

      jsxs('div', {className: 'mt-5 border-l-2 border-[#C9A24A] pl-4', children: [
        jsx(Label, {children: 'Honest trade-offs'}),
        jsx('ul', {className: 'm-0 p-0 list-none space-y-2', children: n.tradeoffs.map((t, i) => jsxs('li', {className: 'text-[15px] text-[#F4EFE2]/80 font-light leading-relaxed flex gap-2', children: [
          jsx('span', {className: 'text-[#C9A24A] shrink-0', children: '—'}, 'd'), jsx('span', {children: t}, 't'),
        ]}, 'trade' + i))}),
      ]}),

      n.links.length ? jsx('div', {className: 'mt-5 space-y-1', children: n.links.map((l) => jsxs('a', {href: l.href, className: 'block text-[14px] text-[#E7C878] hover:text-[#ffd9a0] underline underline-offset-[3px] decoration-[#C9A24A]/60', children: ['Read next: ', l.label, ' →']}, l.href))}) : null,

      jsxs('p', {className: 'font-mono text-[10px] text-[#F4EFE2]/45 mt-4 m-0', children: ['Sources: ', refs.map((id) => sourceNumber(id)).filter(Boolean).join(', ')]}),
    ],
  });
}

const READING = [
  {href: '/journal/what-750k-buys-miami-condos-brickell-edgewater-aventura', t: 'What $750K buys in a Brickell, Edgewater and Aventura condo right now', d: 'Three neighborhoods, three very different square footages.'},
  {href: '/journal/waiting-for-mortgage-rates-cost-of-waiting', t: 'Should you wait for mortgage rates to drop?', d: 'What waiting actually costs, and when waiting is the right call.'},
  {href: '/journal/what-outsiders-misunderstand-about-living-in-miami', t: '3 things outsiders misunderstand about Miami', d: 'Neighborhood differences, true cost of ownership and storm planning.'},
];

export default function MiamiGuideView({onOpenContact}) {
  const words = NEIGHBORHOODS.reduce((a, n) => a + [n.intro, n.housing, n.transit, n.schools, n.flood.note, ...n.tradeoffs].join(' ').split(/\s+/).length, 0) + 950;
  const minutes = Math.max(8, Math.round(words / 220));
  return jsxs('div', {className: 'pb-24 bg-[#0B0B0B] animate-fadeIn', children: [

    jsx('section', {'aria-hidden': 'true', className: 'relative w-full h-[38vh] sm:h-[46vh] min-h-[240px] overflow-hidden bg-[#052C3A]', children: [
      jsx('img', {src: '/media/waterfront-promenade-palms-700.webp', alt: '', className: 'absolute inset-0 w-full h-full object-cover', style: {objectPosition: '50% 45%'}, loading: 'eager', decoding: 'async'}, 'img'),
      jsx('div', {className: 'absolute inset-0', style: {background: 'linear-gradient(180deg, rgba(11,11,11,0.55) 0%, rgba(11,11,11,0.15) 45%, rgba(11,11,11,0.95) 100%)'}}, 'scrim'),
    ]}, 'photo-hero'),
    jsx('header', {className: 'relative -mt-16 sm:-mt-20 pt-0 pb-10 border-b border-[rgba(244,239,226,0.08)]', children: jsxs('div', {className: 'wrap max-w-4xl', children: [
      jsx('nav', {'aria-label': 'Breadcrumb', className: 'mb-6', children: jsxs('ol', {className: 'flex flex-wrap items-center gap-2 list-none m-0 p-0 font-mono text-[11px] tracking-[0.16em] uppercase text-[#F4EFE2]/65', children: [
        jsx('li', {children: jsx('a', {href: '/', className: 'hover:text-[#E7C878]', children: 'Home'})}, 'c1'),
        jsx('li', {'aria-hidden': 'true', children: '/'}, 'c2'),
        jsx('li', {children: jsx('a', {href: '/neighborhoods', className: 'hover:text-[#E7C878]', children: 'Neighborhoods'})}, 'c3'),
        jsx('li', {'aria-hidden': 'true', children: '/'}, 'c4'),
        jsx('li', {'aria-current': 'page', className: 'text-[#C9A24A]', children: 'Miami Neighborhood Guide'}, 'c5'),
      ]})}, 'bc'),
      jsx('p', {className: 'font-mono text-[11px] tracking-[0.22em] uppercase text-[#C9A24A] m-0', children: 'Miami, block by block · 14 neighborhoods · updated November 2026'}, 'kicker'),
      jsx('h1', {className: 'font-serif font-normal leading-[1.03] text-[#F4EFE2] mt-3 mb-5 text-[38px] sm:text-[62px]', children: 'The Miami Neighborhood Guide: Prices, Walkability and Flood Risk'}, 'h1'),
      jsx('p', {className: 'font-serif text-[19px] sm:text-[24px] leading-[1.35] text-[#ffd9a0] m-0 max-w-3xl', children: 'Fourteen Miami neighborhoods, each with a sourced median price, a walk score, the school ratings buyers ask about and the flood exposure that decides your insurance bill.'}, 'dek'),
      jsxs('p', {className: 'font-mono text-[11px] text-[#F4EFE2]/55 mt-6 m-0 flex flex-wrap gap-x-3 gap-y-1', children: [
        jsx('span', {children: ['By ', jsx('a', {href: '/about', className: 'text-[#E7C878] underline underline-offset-2', children: 'Miguel Perez, REALTOR®'}, 'a')]}, 'by'),
        jsx('span', {'aria-hidden': 'true', children: '·'}, 'd1'),
        jsx('span', {children: 'Updated ' + GUIDE_UPDATED_LABEL}, 'upd'),
        jsx('span', {'aria-hidden': 'true', children: '·'}, 'd2'),
        jsx('span', {children: minutes + ' min read'}, 'read'),
      ]}, 'meta'),
    ]})}, 'header'),

    jsx('section', {className: 'bg-[#12110f] border-b border-[rgba(201,162,74,0.35)]', children: jsx('div', {className: 'wrap max-w-4xl py-4', children: jsxs('div', {className: 'flex flex-col sm:flex-row sm:items-center justify-between gap-3', children: [
        jsx('p', {className: 'text-[13px] sm:text-[14px] text-[#F4EFE2]/85 font-light m-0', children: jsxs('span', {children: [jsx('span', {className: 'font-mono text-[10px] tracking-[0.18em] uppercase text-[#C9A24A] mr-2', children: 'PDF'}, 'lbl'), 'Take this guide with you: the full 20-page version, free.']})}, 'p'),
      jsx('a', {href: '/guides/miami', className: 'btn btn--gold btn--sm whitespace-nowrap no-underline', children: jsx('span', {children: 'Download the PDF'})}, 'a'),
    ]})})}, 'download-banner'),

    jsx('section', {className: 'py-12 sm:py-16 bg-[#0e1416] border-b border-[rgba(244,239,226,0.08)]', children: jsxs('div', {className: 'wrap max-w-4xl', children: [
      jsx('h2', {className: 'font-mono text-[11px] tracking-[0.22em] uppercase text-[#C9A24A] m-0 mb-4', children: 'The short answer'}, 'h'),
      jsxs('p', {className: 'text-[17px] sm:text-[19px] leading-[1.65] text-[#F4EFE2]/90 font-light m-0', children: [
        'For most Miami buyers the decision comes down to four things: whether you want to walk to work, whether you need a specific school assignment, how much space your budget actually buys, and how much flood and wind insurance you are willing to carry. ',
        jsx('strong', {className: 'text-[#F4EFE2] font-semibold', children: 'Brickell and Downtown Miami'}, 's1'),
        ' are the only genuinely car-optional places in the county, with medians of $685K and $580K. ',
        jsx('strong', {className: 'text-[#F4EFE2] font-semibold', children: 'Aventura and Doral'}, 's2'),
        ' buy the most square footage per dollar, at $324 and $367 per square foot, and Doral carries the lowest projected flood exposure here at 14%. ',
        jsx('strong', {className: 'text-[#F4EFE2] font-semibold', children: 'Coconut Grove and Coral Gables'}, 's3'),
        ' are where families pay for trees, houses and the highest-rated elementary schools, at medians of $1.89M and $1.4M. ',
        'Every figure below is a median sale price for all home types from the Redfin market page for that area, in a window ending September 2026, and each one is cited so you can check it yourself.',
      ]}, 'answer'),
      jsxs('div', {className: 'mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2', children: [
        jsx(Stat, {label: 'Neighborhoods', value: '14', sub: 'all sourced'}, 'a'),
        jsx(Stat, {label: 'Cheapest $/sq ft', value: '$324', sub: 'Aventura'}, 'b'),
        jsx(Stat, {label: 'Highest $/sq ft', value: '$1.44K', sub: 'Key Biscayne'}, 'c'),
        jsx(Stat, {label: 'Lowest flood risk', value: '14%', sub: 'Doral'}, 'd'),
      ]}, 'stats'),
      jsxs('nav', {'aria-label': 'Jump to a neighborhood', className: 'mt-10 border-t border-[rgba(244,239,226,0.12)] pt-6', children: [
        jsx('p', {className: 'font-mono text-[10px] tracking-[0.2em] uppercase text-[#F4EFE2]/55 m-0 mb-3', children: 'Jump to'}, 'lbl'),
        jsx('ul', {className: 'flex flex-wrap gap-x-5 gap-y-2 list-none m-0 p-0', children: NEIGHBORHOODS.map((n) => jsx('li', {children: jsxs('a', {href: '#' + n.id, className: 'text-[14px] text-[#F4EFE2]/80 hover:text-[#E7C878] underline underline-offset-[3px] decoration-[rgba(201,162,74,0.4)]', children: [n.name, ' ', jsx('span', {className: 'font-mono text-[10px] text-[#C9A24A]', children: n.price.median}, 'p')]})}, n.id))}, 'list'),
      ]}, 'jump'),
    ]})}, 'summary'),

    jsx('section', {id: 'comparison', className: 'py-12 sm:py-16 bg-[#101618] border-b border-[rgba(244,239,226,0.08)] scroll-mt-24', children: jsxs('div', {className: 'wrap max-w-5xl', children: [
      jsx('h2', {className: 'font-serif font-normal text-[30px] sm:text-[40px] leading-tight text-[#F4EFE2] m-0', children: 'Miami neighborhoods at a glance'}, 'h'),
      jsx('p', {className: 'text-[15px] text-[#F4EFE2]/75 font-light leading-relaxed mt-3 mb-6 max-w-3xl', children: 'Median sale price and median price per square foot, all home types, ' + REDFIN_LABEL + '. Sorted by price per square foot, lowest first, because that is the number that tells you how much space your budget actually buys.'}, 'p'),
      jsx('div', {className: 'j-table', tabIndex: 0, children: jsxs('table', {children: [
        jsx('caption', {className: 'sr-only', children: 'Miami neighborhoods compared by median sale price, median price per square foot, walk score and flood risk, from Redfin market data for the three months ending September 2026'}, 'cap'),
        jsx('thead', {children: jsxs('tr', {children: [
          jsx('th', {scope: 'col', children: 'Neighborhood'}, '1'),
          jsx('th', {scope: 'col', children: 'Median price'}, '2'),
          jsx('th', {scope: 'col', children: 'Median $/sq ft'}, '3'),
          jsx('th', {scope: 'col', children: 'Walk'}, '4'),
          jsx('th', {scope: 'col', children: 'Flood risk'}, '5'),
          jsx('th', {scope: 'col', children: 'Best for'}, '6'),
        ]})}, 'hr'),
        jsx('tbody', {children: NEIGHBORHOODS.slice().sort((a, b) => ppsfNumber(a.price.ppsf) - ppsfNumber(b.price.ppsf)).map((n) => jsxs('tr', {children: [
          jsx('th', {scope: 'row', children: jsx('a', {href: '#' + n.id, className: 'text-[#F4EFE2] hover:text-[#ffd9a0] underline underline-offset-2 decoration-[rgba(201,162,74,0.4)]', children: n.name})}, 'n'),
          jsx('td', {className: 'whitespace-nowrap', children: n.price.median}, 'm'),
          jsx('td', {className: 'whitespace-nowrap text-[#ffd9a0]', children: n.price.ppsf}, 'p'),
          jsx('td', {className: 'whitespace-nowrap', children: WALK[n.id] ? WALK[n.id].score : '—'}, 'w'),
          jsx('td', {className: 'whitespace-nowrap', children: n.flood.label}, 'f'),
          jsx('td', {children: n.bestFor[0]}, 'b'),
        ]}, n.id))}, 'body'),
      ]})}, 'table'),
      jsxs('p', {className: 'font-mono text-[10px] leading-relaxed text-[#F4EFE2]/50 mt-4 m-0', children: [
        'Walk scores use Walk Score\'s 100-point scale: 90 and above is a "Walker\'s Paradise", 70–89 "Very Walkable", 50–69 "Somewhat Walkable". The basis for each figure (city, ZIP, district or address) is printed in the "Getting around" line of each neighborhood below. Flood risk is the First Street share of properties projected to face severe flood risk over 30 years, as published on each Redfin page. ',
        jsx('a', {href: '#sources', className: 'text-[#C9A24A] hover:text-[#ffd9a0] underline underline-offset-2', children: 'Sources ↓'}, 'a'),
      ]}, 'note'),
    ]})}, 'comparison'),

    jsx('section', {className: 'py-12 sm:py-16 bg-[#0e1416] border-b border-[rgba(244,239,226,0.08)]', children: jsxs('div', {className: 'wrap max-w-3xl', children: [
      jsx('h2', {className: 'font-serif font-normal text-[30px] sm:text-[40px] leading-tight text-[#F4EFE2] m-0', children: 'How to read these numbers'}, 'h'),
      jsxs('div', {className: 'mt-6 space-y-6', children: [
        jsxs('div', {children: [
          jsx('h3', {className: 'font-serif font-normal text-[24px] text-[#ffd9a0] m-0', children: 'A median describes what sold, not what a home is worth'}, 'h'),
          jsx('p', {className: 'text-[15px] text-[#F4EFE2]/80 font-light leading-relaxed mt-2 m-0', children: 'Every figure here is the median of the homes that actually closed in a three-month window. When a neighborhood sells six homes in a quarter, as Wynwood did, a single atypical closing moves the median by double digits. That is why the sales count sits next to every price in this guide, and why you should still ask for six months of closed comparables in the specific building or block before you make an offer.'}, 'p'),
        ]}, 'a'),
        jsxs('div', {children: [
          jsx('h3', {className: 'font-serif font-normal text-[24px] text-[#ffd9a0] m-0', children: 'Insurance is not in the price, and in Miami it decides the payment'}, 'h'),
          jsxs('p', {className: 'text-[15px] text-[#F4EFE2]/80 font-light leading-relaxed mt-2 m-0', children: [
            'Florida\'s Office of Insurance Regulation puts the average Miami-Dade homeowners premium at $5,975 a year with wind coverage and $3,779 without it, on policy data as of March 31, 2026. ',
            jsx(Ref, {id: 'oir'}, 'ref'),
            ' That is an average across every insured home in the county, and it excludes flood, which is always a separate policy. Two similar houses a mile apart can carry very different premiums because of roof age, opening protection and elevation.',
          ]}, 'p'),
        ]}, 'b'),
        jsxs('div', {children: [
          jsx('h3', {className: 'font-serif font-normal text-[24px] text-[#ffd9a0] m-0', children: 'HOA dues are the number this guide will not invent'}, 'h'),
          jsx('p', {className: 'text-[15px] text-[#F4EFE2]/80 font-light leading-relaxed mt-2 m-0', children: 'There is no reliable published range of condo dues by Miami neighborhood, so this page does not quote one. Instead, ask each association for its current budget, its reserve study or structural integrity reserve study, any pending special assessment, and its insurance line. In an older building those four documents explain the monthly cost better than the list price does.'}, 'p'),
        ]}, 'c'),
      ]}, 'rows'),
    ]})}, 'how'),

    jsx('section', {className: 'py-12 sm:py-16 bg-[#0B0B0B]', children: jsxs('div', {className: 'wrap max-w-3xl', children: [
      jsx('h2', {className: 'font-serif font-normal text-[30px] sm:text-[44px] leading-tight text-[#F4EFE2] m-0', children: 'The 14 Miami neighborhoods, one by one'}, 'h'),
      jsx('p', {className: 'text-[15px] text-[#F4EFE2]/75 font-light leading-relaxed mt-3 mb-4 max-w-2xl', children: 'Ordered by how often buyers ask about them, not by price. Each entry covers who it suits, the housing stock, how you get around, the schools and parks, the flood picture and the trade-offs worth knowing before you fall for a listing.'}, 'p'),
      jsx('div', {children: NEIGHBORHOODS.map((n) => jsx(Neighborhood, {n}, n.id))}, 'list'),
    ]})}, 'hoods'),

    jsx('section', {className: 'py-12 sm:py-16 bg-[#101618] border-t border-[rgba(244,239,226,0.08)]', children: jsxs('div', {className: 'wrap max-w-3xl', children: [
      jsx('h2', {className: 'font-serif font-normal text-[30px] sm:text-[40px] leading-tight text-[#F4EFE2] m-0', children: 'How to choose between them'}, 'h'),
      jsxs('div', {className: 'mt-6 space-y-6', children: [
        jsxs('div', {children: [
          jsx('h3', {className: 'font-serif font-normal text-[24px] text-[#ffd9a0] m-0', children: 'Start with the commute, then the school, then the building'}, 'h'),
          jsx('p', {className: 'text-[15px] text-[#F4EFE2]/80 font-light leading-relaxed mt-2 m-0', children: 'The commute eliminates more neighborhoods than the budget does. If you work in Brickell or Downtown and want to stop driving, Metromover is fare-free and runs 5:30 a.m. to 10 p.m. daily across 21 stations. If you work in Coral Gables or the Grove, a car is realistic, and Doral and Coral Way open up. School assignment follows the exact address, so confirm it with Miami-Dade County Public Schools before you write an offer, not after.'}, 'p'),
        ]}, 'a'),
        jsxs('div', {children: [
          jsx('h3', {className: 'font-serif font-normal text-[24px] text-[#ffd9a0] m-0', children: 'Then price the insurance, not just the mortgage'}, 'h'),
          jsx('p', {className: 'text-[15px] text-[#F4EFE2]/80 font-light leading-relaxed mt-2 m-0', children: 'A $600K condo on the beach and a $600K condo in Doral are not the same purchase. Get a wind and flood quote on the exact address before you remove your inspection contingency, and ask the association what its master policy covers and what your HO-6 has to pick up. The gap regularly runs into four figures a year.'}, 'p'),
        ]}, 'b'),
        jsxs('div', {children: [
          jsx('h3', {className: 'font-serif font-normal text-[24px] text-[#ffd9a0] m-0', children: 'And read the building documents before the listing photos'}, 'h'),
          jsx('p', {className: 'text-[15px] text-[#F4EFE2]/80 font-light leading-relaxed mt-2 m-0', children: 'Since Florida tightened its milestone inspection and reserve requirements, older buildings carry a real risk of special assessments. The budget, the reserve study and the minutes of the last two board meetings tell you more about your next five years of ownership than any staging does.'}, 'p'),
        ]}, 'c'),
      ]}, 'rows'),
      jsxs('div', {className: 'mt-8 flex flex-wrap gap-3', children: [
        jsx('a', {href: '/neighborhoods', className: 'btn', children: jsx('span', {children: 'Browse all South Florida neighborhoods'})}, 'b1'),
        jsx('a', {href: '/home-value', className: 'btn', children: jsx('span', {children: 'What\'s my home worth?'})}, 'b2'),
        jsx('a', {href: '/journal', className: 'btn', children: jsx('span', {children: 'Read the Journal'})}, 'b3'),
      ]}, 'cta'),
    ]})}, 'choose'),

    jsx('section', {className: 'py-12 sm:py-16 bg-[#0B0B0B] border-t border-[rgba(244,239,226,0.08)]', children: jsxs('div', {className: 'wrap max-w-3xl', children: [
      jsx('h2', {className: 'font-serif font-normal text-[30px] sm:text-[38px] leading-tight text-[#F4EFE2] m-0', children: 'Keep reading'}, 'h'),
      jsx('ul', {className: 'mt-5 list-none m-0 p-0 space-y-3', children: READING.map((l) => jsx('li', {children: jsxs('a', {href: l.href, className: 'block border border-[rgba(244,239,226,0.12)] hover:border-[#C9A24A] transition-colors p-5', children: [
        jsx('span', {className: 'font-serif text-[20px] text-[#F4EFE2] block leading-snug', children: l.t}, 't'),
        jsx('span', {className: 'font-mono text-[11px] text-[#F4EFE2]/55 block mt-1', children: l.d}, 'd'),
      ]})}, l.href))}, 'list'),
    ]})}, 'reading'),

    jsx('section', {className: 'py-12 sm:py-16 bg-[#0e1416] border-t border-[rgba(244,239,226,0.08)]', children: jsx('div', {className: 'wrap max-w-3xl', children: jsxs('aside', {className: 'border border-[rgba(201,162,74,0.45)] bg-[#12110f] p-7 sm:p-10', children: [
      jsx('p', {className: 'font-mono text-[11px] tracking-[0.22em] uppercase text-[#C9A24A] m-0', children: 'Your next step · Keyword MAP'}, 'k'),
      jsx('h2', {className: 'font-serif font-normal text-[30px] sm:text-[38px] leading-[1.08] text-[#F4EFE2] mt-3 mb-3', children: 'Want the building-by-building version?'}, 'h'),
      jsx('p', {className: 'text-[16px] text-[#F4EFE2]/80 font-light leading-relaxed m-0 max-w-2xl', children: 'This page compares neighborhoods. The Buyer Map goes inside them: specific buildings, drive times, the condo documents to request and the questions to ask before an offer. Tell me which two or three neighborhoods here you are weighing and I will send it.'}, 'p'),
      jsxs('div', {className: 'flex flex-wrap gap-3 mt-6', children: [
        jsx('a', {href: 'https://www.instagram.com/miguelperezflorida', target: '_blank', rel: 'noopener noreferrer', className: 'btn btn--gold inline-flex items-center gap-2', children: jsx('span', {children: 'DM MAP on Instagram'})}, 'ig'),
        jsx('a', {href: 'tel:+17864601023', className: 'btn inline-flex items-center gap-2', children: jsx('span', {children: 'Call 786-460-1023'})}, 'tel'),
        onOpenContact ? jsx('button', {type: 'button', onClick: () => onOpenContact('buyer', "MAP: I'd like the South Florida buyer map and to talk through my search."), className: 'btn inline-flex items-center gap-2 cursor-pointer', children: jsx('span', {children: 'Send a message'})}, 'msg') : null,
      ]}, 'buttons'),
    ]})})}, 'cta'),

    jsx('section', {id: 'sources', className: 'py-12 sm:py-16 bg-[#0B0B0B] border-t border-[rgba(244,239,226,0.12)] scroll-mt-24', children: jsxs('div', {className: 'wrap max-w-3xl', children: [
      jsx('h2', {className: 'font-serif font-normal text-[30px] sm:text-[38px] leading-tight text-[#F4EFE2] m-0', children: 'Sources'}, 'h'),
      jsx('p', {className: 'text-[14px] text-[#F4EFE2]/70 font-light leading-relaxed mt-3 m-0', children: 'Every number on this page comes from one of the pages below, all opened and read on ' + GUIDE_UPDATED_LABEL + '. Where a figure was not published, the entry says so instead of estimating.'}, 'p'),
      jsx('ol', {className: 'mt-6 space-y-3 pl-5 list-decimal font-mono text-[12px] leading-relaxed text-[#F4EFE2]/80', children: SOURCE_ORDER.map((id) => jsxs('li', {id: 'src-' + id, className: 'scroll-mt-28', children: [
        SOURCES[id].label + ' ',
        jsx('a', {href: SOURCES[id].url, target: '_blank', rel: 'noopener noreferrer', className: 'text-[#E7C878] hover:text-[#ffd9a0] underline underline-offset-2 break-all', children: SOURCES[id].url.replace(/^https?:\/\//, '')}, 'a'),
      ]}, id))}, 'list'),
      jsx('p', {className: 'text-[13px] text-[#F4EFE2]/65 font-light leading-relaxed mt-8 m-0', children: DATA_NOTE}, 'note'),
      jsx('p', {className: 'text-[13px] text-[#F4EFE2]/65 font-light leading-relaxed mt-4 m-0', children: 'School ratings are GreatSchools ratings as published on the Redfin page for each area and describe the school, not the assignment. Confirm the assigned school for an exact address with Miami-Dade County Public Schools. Flood percentages are First Street projections over 30 years, not FEMA zone designations, so check the FEMA flood map for the address as well. Market figures are medians from third-party public sources for the periods shown and do not represent the value of any specific property. Information is deemed reliable but not guaranteed. This page is general information, not legal, tax or insurance advice. Miguel Perez is a REALTOR® with Luxe Properties, Florida license SL3515849. Equal Housing Opportunity.'}, 'disc'),
      jsxs('p', {className: 'text-[13px] text-[#F4EFE2]/65 font-light leading-relaxed mt-4 m-0', children: [
        'Compare this guide with the fuller directory of South Florida communities on the ',
        jsx('a', {href: '/neighborhoods', className: 'text-[#E7C878] underline underline-offset-2', children: 'neighborhoods page'}, 'a1'),
        ', or start with ',
        jsx('a', {href: '/buy', className: 'text-[#E7C878] underline underline-offset-2', children: 'buying in Miami'}, 'a2'),
        ' and ',
        jsx('a', {href: '/relocate', className: 'text-[#E7C878] underline underline-offset-2', children: 'relocating to South Florida'}, 'a3'),
        '.',
      ]}, 'more'),
    ]})}, 'sources'),
  ]});
}
