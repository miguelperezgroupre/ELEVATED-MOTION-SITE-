// Per-page content for <PageHero />. Copy rules: no invented stats, listings, prices or testimonials.
// Hero copy system (Oct 2026): "Beyond the Address" is the brand philosophy; each page makes one distinct promise.
// Eyebrow / headline / supporting copy / CTA are Miguel's approved copy. "Elevated" is brand vocabulary, not a prefix.
// Photos are hotlinked from the Unsplash / Pexels CDNs (free licenses), served as AVIF/WebP at responsive widths.
// Credits: CREDITS-HEROES.md

export type HeroPhoto = { src: string; srcSet: string; alt: string; position?: string };
export type HeroCta = { label: string; intent?: string; message?: string; href?: string; scroll?: string };
export type HeroStat = { value: string; label: string };
export type PageHeroContent = {
  eyebrow: string;
  /** Headline (h1) */
  title: string;
  /** Supporting copy, shown as the gold sub-line under the headline */
  support: string;
  primary: HeroCta;
  secondary?: HeroCta;
  stats: HeroStat[];
  photos: [HeroPhoto, HeroPhoto] | [HeroPhoto, HeroPhoto, HeroPhoto];
  statement: { badge: string; pre: string; em: string; post?: string; body: string };
  next: { label: string; word: string; body: string; cta: HeroCta };
  portrait?: string;
};

const W = [640, 1080, 1600, 2200];
const us = (id: string, alt: string, position = 'center') : HeroPhoto => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=65`,
  srcSet: W.map((w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=65 ${w}w`).join(', '),
  alt,
  position,
});
const px = (id: string, alt: string, position = 'center') : HeroPhoto => ({
  src: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fm=webp&w=1600`,
  srcSet: W.map((w) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fm=webp&w=${w} ${w}w`).join(', '),
  alt,
  position,
});

const COVERAGE: HeroStat = { value: 'MIAMI-DADE · BROWARD · PALM BEACH', label: 'COVERAGE' };
const MAP_CTA: HeroCta = { label: 'SEND ME THE MAP', intent: 'buyer', message: "MAP: I'd like the South Florida buyer map and to talk through my search." };
const MAP_NEXT = {
  label: 'YOUR NEXT STEP',
  word: 'MAP',
  body: 'Ask for the MAP: a neighborhood-by-neighborhood starting point for finding your home in Miami and Fort Lauderdale.',
  cta: MAP_CTA,
};
const DEV_NEXT = {
  label: 'YOUR NEXT STEP',
  word: 'DEVELOPMENT',
  body: 'Ask for DEVELOPMENT and get the pre-construction projects worth a closer look right now, with the deposit terms side by side.',
  cta: { label: 'SEND ME DEVELOPMENT', intent: 'development', message: "DEVELOPMENT: I'd like the current pre-construction short list and deposit terms." },
};

export const PAGE_HEROES: Record<string, PageHeroContent> = {
  buy: {
    eyebrow: 'BUY',
    title: 'Find Your Elevated Home.',
    support: 'More than a property. A place that fits the way you want to live.',
    primary: { label: 'Find Your Home', scroll: 'content' },
    stats: [COVERAGE, { value: 'ABR®', label: 'BUYER REPRESENTATIVE' }, { value: 'MAP', label: 'KEYWORD' }],
    photos: [
      px('15334538', 'Waterfront homes and boats along a Fort Lauderdale canal', 'center 60%'),
      px('8293654', 'House keys handed over at closing', 'center 40%'),
    ],
    statement: {
      badge: 'THE WAY YOU LIVE · THEN THE ADDRESS',
      pre: 'Start With How You ', em: 'Live', post: '.',
      body: 'Commute, schools, the water, the pace of the street. We start there, then check flood zone, insurance and HOA reserves before you write an offer.',
    },
    next: MAP_NEXT,
  },
  sell: {
    eyebrow: 'SELL',
    title: 'Make Your Next Move Count.',
    support: 'Strategic positioning. Elevated presentation. Exceptional results.',
    primary: { label: 'Sell With Strategy', intent: 'seller', message: 'I would like to request a custom Property Strategy for selling my home.' },
    stats: [{ value: 'SRS', label: 'SELLER REPRESENTATIVE' }, { value: 'PSA', label: 'PRICING STRATEGY' }, { value: 'ELEVATED', label: 'KEYWORD' }],
    photos: [
      px('10161222', 'Staged modern living room with floor-to-ceiling windows', 'center 55%'),
      us('photo-1756659193663-fe01fe666bbe', 'Living room with an ocean view at sunset', 'center'),
    ],
    statement: {
      badge: 'POSITIONING · PRESENTATION · NEGOTIATION',
      pre: 'Positioned to ', em: 'Compete', post: '.',
      body: 'Price it with evidence, stage and film it like a launch, and put it in front of the buyers most likely to pay for it. Then negotiate every term, not just the number.',
    },
    next: {
      label: 'YOUR NEXT STEP',
      word: 'ELEVATED',
      body: 'Ask for ELEVATED: the seller playbook for pricing, presentation and launch in South Florida.',
      cta: { label: 'SEND ME ELEVATED', intent: 'seller', message: "ELEVATED: I'd like the seller guide and a strategy for my property." },
    },
  },
  relocate: {
    eyebrow: 'RELOCATION',
    title: 'Your Elevated Move Starts Here.',
    support: 'Move to South Florida with local expertise on your side.',
    primary: { label: 'Plan Your Move', intent: 'relocation', message: 'I am planning a relocation to South Florida and would like advisory assistance.' },
    stats: [COVERAGE, { value: 'LOCAL EXPERTISE', label: 'ON YOUR SIDE' }, { value: 'MOVE', label: 'KEYWORD' }],
    photos: [
      us('photo-1695776333029-d47e3f0f4e63', 'Aerial view of Miami towers along Biscayne Bay', 'center 45%'),
      us('photo-1751207912905-b018fcb679a8', 'Palm-lined street on a sunny day in Miami Beach', 'center 60%'),
    ],
    statement: {
      badge: 'LOCAL EXPERTISE ON YOUR SIDE',
      pre: 'Know the Ground Before ', em: 'Day One', post: '.',
      body: 'Schools, commute, bridges, flood zones and the daily rhythm of each neighborhood. We map your life here before you choose an address.',
    },
    next: {
      label: 'YOUR NEXT STEP',
      word: 'MOVE',
      body: 'Ask for MOVE: a relocation starting point covering neighborhoods, timing and what to line up before you arrive.',
      cta: { label: 'SEND ME MOVE', intent: 'relocation', message: "MOVE: I'm relocating to South Florida and would like the relocation guide." },
    },
  },
  invest: {
    eyebrow: 'INVEST',
    title: 'Invest Beyond the Address.',
    support: 'Build a South Florida portfolio around location, lifestyle, and long-term opportunity.',
    primary: { label: 'Explore Opportunities', scroll: 'content' },
    stats: [{ value: 'LOCATION · LIFESTYLE · LONG TERM', label: 'APPROACH' }, { value: 'PRE-CONSTRUCTION · RESALE', label: 'FOCUS' }, { value: 'DEVELOPMENT', label: 'KEYWORD' }],
    photos: [
      us('photo-1741023705528-2953cb652705', 'Miami towers by the water on a sunny day', 'center 40%'),
      us('photo-1748381837363-c2a124057d8f', 'Miami skyline and PortMiami cranes seen from the water', 'center'),
    ],
    statement: {
      badge: 'BUILT FOR THE LONG TERM',
      pre: 'Numbers ', em: 'First', post: '.',
      body: 'Carrying costs, insurance, HOA reserves, rental rules and exit liquidity decide the return. We model them before you commit capital.',
    },
    next: DEV_NEXT,
  },
  developments: {
    eyebrow: 'PRE-CONSTRUCTION',
    title: "Own What's Next.",
    support: "Discover South Florida's most compelling new developments before they become tomorrow's addresses.",
    primary: { label: 'Explore Developments', scroll: 'content' },
    stats: [{ value: 'DEPOSIT SCHEDULES', label: 'REVIEWED' }, { value: 'FLOOR PLANS', label: 'AUDITED' }, { value: 'DEVELOPMENT', label: 'KEYWORD' }],
    photos: [
      us('photo-1506966953602-c20cc11f75e3', 'Aerial view of Brickell towers and Biscayne Bay', 'center 40%'),
      us('photo-1748380868702-892bcee1f9fa', 'Brickell Key glass towers seen from street level', 'center 30%'),
    ],
    statement: {
      badge: 'BEFORE THE CRANES COME DOWN',
      pre: 'Buy the ', em: 'Plan', post: ', Not the Rendering.',
      body: "Renderings sell. Deposit structure, delivery timeline, the developer's track record and the building's rental policy decide whether it was a good buy.",
    },
    next: DEV_NEXT,
  },
  'south-florida': {
    eyebrow: 'SOUTH FLORIDA',
    title: 'Live Beyond the Address.',
    support: 'Discover the neighborhoods, culture, places, and experiences that make South Florida extraordinary.',
    primary: { label: 'Explore South Florida', href: '#sf-intro' },
    stats: [
      { value: 'MIAMI-DADE · BROWARD · PALM BEACH', label: 'THREE COUNTIES' },
      { value: 'BEACH · CULTURE · DINING', label: 'LIFESTYLE' },
      { value: '@SOUTHFLORIDAELEVATED', label: 'THIS WEEK' },
    ],
    photos: [
      us('photo-1721930498106-1b325feb99fc', 'Lifeguard tower on the beach in Miami', 'center 55%'),
      us('photo-1762595830821-087503de6103', 'Murals at the Wynwood Walls in Miami', 'center 40%'),
    ],
    statement: {
      badge: 'BEACH · CULTURE · DINING · OUTDOORS',
      pre: 'The Reasons People ', em: 'Stay', post: '.',
      body: 'The beach before work, a gallery on Saturday, dinner on the water. The reasons people fall for South Florida rarely fit on a listing sheet.',
    },
    next: {
      label: 'MAKE IT HOME',
      word: 'MOVE',
      body: 'Ask for MOVE: a relocation starting point covering neighborhoods, timing and what to line up before you arrive.',
      cta: { label: 'SEND ME MOVE', intent: 'relocation', message: "MOVE: I'm thinking about moving to South Florida and would like the relocation guide." },
    },
  },
  neighborhoods: {
    eyebrow: 'NEIGHBORHOODS',
    title: 'Find Where You Belong.',
    support: 'Explore the communities that define South Florida living.',
    primary: { label: 'Explore Neighborhoods', scroll: 'content' },
    stats: [
      { value: '25.7907° N · 80.1300° W', label: 'MIAMI BEACH' },
      { value: '25.7617° N · 80.1918° W', label: 'MIAMI' },
      { value: '26.1224° N · 80.1373° W', label: 'FORT LAUDERDALE' },
    ],
    photos: [
      us('photo-1752014613771-7afd0d131b9c', 'Art Deco architecture in Miami Beach', 'center 45%'),
      us('photo-1734229176065-215643949a38', 'Aerial view of South Beach and the Atlantic', 'center'),
      us('photo-1484199383121-dfa3c30608cd', 'Aerial view of the Fort Lauderdale beachfront', 'center'),
    ],
    statement: {
      badge: 'MICRO-MARKETS, NOT ZIP CODES',
      pre: 'Every Block Has a ', em: 'Story', post: '.',
      body: 'Deep-water canals in Las Olas, banyan canopies in Coconut Grove, vertical living in Brickell. Price, pace and lifestyle change street by street.',
    },
    next: {
      label: 'YOUR NEXT STEP',
      word: 'MAP',
      body: 'Ask for the MAP: a neighborhood-by-neighborhood starting point for choosing where you belong in Miami and Fort Lauderdale.',
      cta: MAP_CTA,
    },
  },
  insights: {
    eyebrow: 'INSIGHTS',
    title: 'The Market, Decoded.',
    support: 'Data-driven analysis and editorial insight on the South Florida market: the trends, the neighborhoods, and the strategy behind the transaction.',
    primary: { label: 'Read the Latest', scroll: 'content' },
    stats: [{ value: 'MIAMI · FORT LAUDERDALE · PALM BEACH', label: 'COVERAGE' }, { value: 'ANALYSIS, NOT HEADLINES', label: 'APPROACH' }, { value: 'MONTHLY', label: 'BRIEF' }],
    photos: [
      us('photo-1704080864842-2577d94ebb1c', 'Brickell skyline seen from Biscayne Bay', 'center 55%'),
      us('photo-1690398388394-6a57f7f4fff1', 'Miami skyline lit up at night', 'center 60%'),
    ],
    statement: {
      badge: 'BENEATH THE HEADLINES',
      pre: 'Signal Over ', em: 'Noise', post: '.',
      body: "Inventory, pricing, insurance, condo reserves and new supply: what's actually moving the market, explained in plain language.",
    },
    next: {
      label: 'STAY AHEAD',
      word: 'BRIEF',
      body: 'One email a month with the South Florida market in plain language. No noise, no hype.',
      cta: { label: 'SUBSCRIBE TO THE BRIEF', intent: 'report', message: 'I would like to receive Miguel Perez monthly private market intelligence briefings.' },
    },
  },
  about: {
    eyebrow: 'MIGUEL PEREZ',
    title: 'Local Knowledge. Elevated Perspective.',
    support: 'Helping clients navigate South Florida real estate with clarity, strategy, and confidence.',
    primary: { label: 'Meet Miguel', scroll: 'content' },
    stats: [{ value: 'FL LIC SL3515849', label: 'LICENSE' }, { value: 'ABR® · SRS · PSA · SFR®', label: 'DESIGNATIONS' }, COVERAGE],
    photos: [
      us('photo-1774238357104-dbe2b5ad0209', 'South Beach shoreline at dusk', 'center 60%'),
      us('photo-1704080864842-2577d94ebb1c', 'Brickell skyline seen from Biscayne Bay', 'center 55%'),
    ],
    portrait: '/assets/miguel-perez-headshot.jpg',
    statement: {
      badge: 'CLARITY · STRATEGY · CONFIDENCE',
      pre: 'Advice You Can ', em: 'Act On', post: '.',
      body: 'I represent buyers, sellers and investors across Miami-Dade, Broward and Palm Beach, research first, with a direct line to me from first call to closing.',
    },
    next: {
      label: 'WORK WITH MIGUEL',
      word: "LET'S TALK",
      body: 'Buying, selling, investing or relocating. Start with a conversation.',
      cta: { label: 'SCHEDULE A CONSULTATION', intent: 'advisor', message: "I'd like to schedule a private advisory consultation with Miguel Perez." },
    },
  },
  listings: {
    eyebrow: 'LISTINGS',
    title: 'On the Market.',
    support: 'Active listings in Miami East and Las Olas East, from the Miami Association of REALTORS®.',
    primary: { label: 'View Listings', scroll: 'content' },
    stats: [{ value: 'MIAMI EAST', label: 'FARM AREA' }, { value: 'LAS OLAS EAST', label: 'FARM AREA' }, { value: 'MAP', label: 'KEYWORD' }],
    photos: [
      us('photo-1503198383638-2199ff0637a3', 'Aerial view of boats docked at a Fort Lauderdale marina', 'center'),
      us('photo-1727891193773-55479179b2bb', 'Beachfront townhomes and palms in Fort Lauderdale', 'center 55%'),
    ],
    statement: {
      badge: "WHAT THE PHOTOS DON'T SHOW",
      pre: 'Every Listing Gets a ', em: 'Second Look', post: '.',
      body: "Before you tour, ask about flood zone, insurance, HOA reserves, assessments and rental rules. I'll pull what the listing leaves out.",
    },
    next: MAP_NEXT,
  },
};
