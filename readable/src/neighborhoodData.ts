// @ts-nocheck
/**
 * Neighborhood market data (October 2026).
 *
 * Every price figure below comes from the South Florida Buyer Map (MAP) data log,
 * /lead-magnets/map/sources.md, compiled October 7, 2026. Metric: median sale price, all home types,
 * plus median $/sq ft. No other neighborhood metrics are published on the site: Walk Scores,
 * days on market, months of inventory and pace labels were removed because they had no verified source.
 * To update: replace the figures, periods and URLs in PRICE_SOURCES and bump DATA_AS_OF.
 */

export const DATA_AS_OF = 'October 7, 2026';
export const DATA_DISCLAIMER = `Data as of ${DATA_AS_OF}; not guaranteed; verify independently.`;

const P3 = '3 months through Aug 2026'; // Redfin pages: "over the three months ending August 2026"
const PL = 'trailing 3 months, Sept 2026 update'; // Redfin pages: "over the last 3 months", updated September 2026
const RF = 'https://www.redfin.com';
const rf = (area, path, median, ppsf, period, extra = {}) => ({ area, median, ppsf, src: 'Redfin', period, url: RF + path, ...extra });

export const PRICE_SOURCES = {
  brickell: rf('Brickell', '/neighborhood/91805/FL/Miami/Brickell/housing-market', '$660K', '$585', PL),
  downtownMiami: rf('Downtown Miami', '/neighborhood/548892/FL/Miami/Downtown-Miami/housing-market', '$580K', '$589', P3),
  edgewater: rf('Edgewater', '/neighborhood/224218/FL/Miami/Edgewater/housing-market', '$548K', '$588', PL),
  southBeach: rf('South Beach (ZIP 33139)', '/zipcode/33139/housing-market', '$490K', '$897', P3, { proxy: true, note: 'Redfin ZIP-level figure; ZIP 33139 is used as a proxy for South Beach.' }),
  midBeach: rf('Mid-Beach', '/neighborhood/548893/FL/Miami-Beach/Mid-Beach/housing-market', '$795K', '$553', P3),
  northBeach: rf('North Beach', '/neighborhood/351930/FL/Miami-Beach/North-Beach/housing-market', '$405K', '$532', P3),
  coconutGrove: rf('Coconut Grove', '/neighborhood/219259/FL/Miami/Coconut-Grove/housing-market', '$1.87M', '$1.15K', PL),
  coralGables: rf('Coral Gables', '/city/3707/FL/Coral-Gables/housing-market', '$1.4M', '$819', P3),
  sunnyIsles: rf('Sunny Isles Beach', '/city/17786/FL/Sunny-Isles-Beach/housing-market', '$680K', '$433', P3),
  aventura: rf('Aventura', '/city/709/FL/Aventura/housing-market', '$450K', '$333', P3),
  downtownFtl: rf('Downtown Fort Lauderdale', '/neighborhood/56379/FL/Fort-Lauderdale/Downtown-Fort-Lauderdale/housing-market', '$645K', '$461', P3),
  lasOlasIsles: rf('Las Olas Isles', '/neighborhood/143693/FL/Fort-Lauderdale/Las-Olas-Isles/housing-market', '$5.2M', '$1.1K', P3, { small: true, note: 'Small sample: 11 homes sold in Aug 2026, so the median can swing month to month.' }),
  lauderdaleBeach: rf('Lauderdale Beach', '/neighborhood/142319/FL/Fort-Lauderdale/Lauderdale-Beach/housing-market', '$675K', '$472', P3),
  galtMile: { area: 'Galt Mile', median: '$651K', ppsf: '$433', src: 'Realtor.com', period: 'key indicators as of Sept 2026', url: 'https://www.realtor.com/local/market/florida/fort-lauderdale/galt-mile', note: 'Realtor.com median sold price.' },
  victoriaPark: rf('Victoria Park', '/neighborhood/55984/FL/Fort-Lauderdale/Victoria-Park/housing-market', '$915K', '$445', P3),
  tarponRiver: rf('Tarpon River', '/neighborhood/56348/FL/Fort-Lauderdale/Tarpon-River/housing-market', '$595K', '$341', P3),
  wiltonManors: rf('Wilton Manors', '/city/19676/FL/Wilton-Manors/housing-market', '$620K', '$368', P3),
  palmBeach: rf('Palm Beach', '/city/13989/FL/Palm-Beach/housing-market', '$2.8M', '$1.67K', P3),
};

const P = PRICE_SOURCES;
const U = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Display label for a price row: small samples carry an asterisk. */
export const areaLabel = (row) => row.area + (row.small ? '*' : '');

/** Caption for a set of price rows, e.g. "Median sale price, all home types · Redfin, 3 months through Aug 2026". */
export function priceCaption(rows) {
  const groups = [];
  for (const r of rows) {
    const key = `${r.src}, ${r.period}`;
    const g = groups.find((x) => x.key === key);
    if (g) g.areas.push(areaLabel(r)); else groups.push({ key, areas: [areaLabel(r)] });
  }
  const body = groups.map((g) => (groups.length > 1 ? `${g.key} (${g.areas.join(', ')})` : g.key)).join('; ');
  return `Median sale price, all home types · ${body}`;
}

/** Notes (asterisk, proxy, source caveats) for a set of price rows. */
export const priceNotes = (rows) => rows.filter((r) => r.note).map((r) => `${r.small ? '* ' : ''}${r.area}: ${r.note}`);

export const NEIGHBORHOODS = [
  {
    id: 'miami-beach', name: 'Miami Beach', region: 'Miami-Dade',
    tagline: 'Iconic Coastline, Art Deco Grandeur & Private Islands',
    vibe: 'High-energy coastal sophistication, ultra-prime private island sanctuaries, and Michelin dining.',
    description: 'Miami Beach represents the pinnacle of global coastal real estate. From guarded island enclaves like Star, Palm, and La Gorce to historic South Beach and the ultra-luxurious Faena District, it delivers an unparalleled fusion of art, culture, and beachfront living.',
    keyHighlights: ['Star & La Gorce Islands', 'South of Fifth (SoFi)', 'Lincoln Road & Sunset Harbour', 'Direct Atlantic Ocean frontage'],
    bestFor: ['Second-home buyer who wants to walk to the ocean', 'Car-light beach lifestyle', 'Beach buyer who wants calm over nightlife (Mid-Beach and North Beach)'],
    lifestylePillars: ['beach', 'nightlife', 'waterfront', 'walkability'],
    prices: [P.southBeach, P.midBeach, P.northBeach],
    img: U('photo-1506953823976-52e1fdc0149a', 1600),
  },
  {
    id: 'brickell', name: 'Brickell', region: 'Miami-Dade',
    tagline: 'The Wall Street of the South & Vertical Luxury',
    vibe: 'Fast-paced and metropolitan: glass towers, sidewalk cafés and a financial district that spills into rooftop bars at dusk.',
    description: 'Brickell has transformed into the primary financial hub of the Southeast. Lined with soaring ultra-luxury residential towers, rooftop lounges, and Brickell City Centre, it is the undisputed leader for corporate relocations and high-yield condominium investments.',
    keyHighlights: ['Brickell City Centre', 'Financial District Corridors', 'Mary Brickell Village', 'High tenant demand and liquidity'],
    bestFor: ['Walk-to-everything urban buyer', 'Lock-and-leave owner', 'Investor who wants a deep renter pool'],
    lifestylePillars: ['city', 'nightlife', 'investment', 'walkability'],
    prices: [P.brickell],
    img: U('photo-1533105079780-92b9be482077', 1600),
  },
  {
    id: 'edgewater', name: 'Edgewater', region: 'Miami-Dade',
    tagline: 'Waterfront Towers, Arts District Proximity & Unobstructed Bay Views',
    vibe: 'Creative, modern, and centered around Margaret Pace Park.',
    description: "Perched directly on Biscayne Bay just north of Downtown, Edgewater is Miami's hottest corridor for new branded pre-construction towers. Residents enjoy front-row bay views, dog-friendly waterfront parks, and walking access to the Design District and Wynwood.",
    keyHighlights: ['Margaret Pace Bayfront Park', 'Minutes to Design District & Wynwood', 'Villa Miami & Missoni Baia', 'Direct Biscayne Bay vistas'],
    bestFor: ['Buyer who wants new construction on the bay', 'Culture-first urbanite', 'Pre-construction investor'],
    lifestylePillars: ['waterfront', 'city', 'investment', 'walkability'],
    prices: [P.edgewater],
    img: 'https://cdn.rets.ly/miamire/323432649/2.jpeg',
  },
  {
    id: 'sunny-isles', name: 'Sunny Isles Beach', region: 'Miami-Dade',
    tagline: "Florida's Riviera & World-Class Branded Towers",
    vibe: 'Refined oceanfront towers, beach service and a resort-like pace between the ocean and the Intracoastal.',
    description: "Known as Florida's Riviera, Sunny Isles Beach boasts the highest concentration of branded ultra-luxury oceanfront skyscrapers in North America, including Bentley Residences, Porsche Design Tower, and St. Regis. White sand beaches meet five-star resort amenities.",
    keyHighlights: ['Bentley & Porsche Towers', 'Pristine white sand shoreline', '24/7 private beach service', 'Proximity to Bal Harbour Shops'],
    bestFor: ['Lock-and-leave oceanfront buyer', 'Seasonal owner who wants amenities', 'Buyer who wants a beach routine over nightlife'],
    lifestylePillars: ['beach', 'waterfront', 'investment', 'quiet'],
    prices: [P.sunnyIsles],
    img: 'https://dvvjkgh94f2v6.cloudfront.net/523fa3e6/424112485/83dcefb7.jpeg',
  },
  {
    id: 'aventura', name: 'Aventura', region: 'Miami-Dade',
    tagline: 'Mall, Marinas & a Brightline Station',
    vibe: 'Convenient and polished: manicured golf courses, Aventura Mall and waterfront towers on the Intracoastal.',
    description: 'A planned city known for Turnberry Isle, Aventura Mall, Founders Park and the Don Soffer Exercise Trail, with a Brightline station for trains to Miami and Fort Lauderdale. Housing is mostly condos on the Intracoastal and canals, plus gated townhome and single-family pockets.',
    keyHighlights: ['Turnberry Isle Golf & Country Club', 'Aventura Mall & Brightline Station', 'Williams Island Marina', 'Don Soffer Exercise Trail & Founders Park'],
    bestFor: ['Buyer who wants errands, gym and dinner minutes away', 'Commuter to both Miami and Fort Lauderdale', 'Value-focused condo buyer'],
    lifestylePillars: ['parks', 'waterfront', 'quiet', 'investment'],
    prices: [P.aventura],
    img: U('photo-1587174486073-ae5e5cff23aa', 1600),
  },
  {
    id: 'fort-lauderdale', name: 'Fort Lauderdale', region: 'Broward',
    tagline: 'The Yachting Capital of the World & Modern Coastal Living',
    vibe: 'Relaxed coastal luxury, 300+ miles of navigable waterways, and a booming downtown core.',
    description: 'Fort Lauderdale blends maritime heritage with an explosive culinary and cultural renaissance. From the sparkling beaches of A1A to the vibrant Riverwalk and Las Olas boulevard, it provides supreme boating access with exceptional tax efficiency.',
    keyHighlights: ['Fort Lauderdale International Boat Show', 'Riverwalk Arts & Entertainment District', 'Direct ocean inlets with no fixed bridges', 'Rapidly expanding tech and finance corridor'],
    bestFor: ['Ocean-view condo buyer', 'Runner or cyclist on A1A', 'Seasonal owner'],
    lifestylePillars: ['waterfront', 'beach', 'city', 'investment'],
    prices: [P.lauderdaleBeach, P.galtMile],
    img: U('photo-1512917774080-9991f1c4c750', 1600),
  },
  {
    id: 'las-olas', name: 'Las Olas & The Isles', region: 'Broward',
    tagline: 'Boutique Boulevard Chic & Deep-Water Finger Islands',
    vibe: 'Tree-lined European-style promenade leading directly to custom waterfront mega-mansions.',
    description: 'The crown jewel of Broward County. Las Olas Boulevard offers high-end art galleries, sidewalk bistros, and high-fashion boutiques, while the adjoining finger isles accommodate mega-yachts with quick, deep-water ocean access.',
    keyHighlights: ['Las Olas Isles private docks', 'World-class dining and galleries', 'No fixed bridges to Port Everglades inlet', 'Walkable downtown waterfront lifestyle'],
    bestFor: ['Walk-to-dinner downtown buyer', 'Boater who wants deep water near downtown', 'Brightline commuter'],
    lifestylePillars: ['waterfront', 'walkability', 'nightlife', 'city'],
    prices: [P.lasOlasIsles, P.downtownFtl],
    img: U('photo-1545324418-cc1a3fa10c00', 1600),
  },
  {
    id: 'tarpon-river', name: 'Tarpon River', region: 'Broward',
    tagline: 'Historic Charm, Riverfront Calm & Exceptional Value',
    vibe: 'Authentic, leafy, riverfront tranquility just minutes from downtown Fort Lauderdale.',
    description: 'A secluded historic neighborhood set along the South Fork of the New River. Favored by yacht owners and architects seeking peaceful riverfront tranquility within walking distance of downtown law firms and Las Olas restaurants.',
    keyHighlights: ['Protected deep-water river dockage', 'Florence C. Hardy Park', 'Walkable to Broward Health & Downtown', 'Historic homes on the New River'],
    bestFor: ['Boater who wants to live close to downtown', 'Buyer who wants a historic house', 'Value seeker one bridge from Las Olas'],
    lifestylePillars: ['waterfront', 'quiet', 'walkability', 'investment'],
    prices: [P.tarponRiver],
    img: U('photo-1600047509807-ba8f99d2cdde', 1600),
  },
  {
    id: 'victoria-park', name: 'Victoria Park', region: 'Broward',
    tagline: 'Canopied Streets, Architectural Character & Urban Energy',
    vibe: 'Canopied streets where historic 1930s homes sit alongside cutting-edge modern townhouses.',
    description: 'Nestled between Downtown Fort Lauderdale and the Atlantic Ocean, Victoria Park features lush tropical banyan trees, eclectic architecture, and Holiday Park. Single-family homes and modern townhomes, with small condo buildings scattered throughout, sit minutes from downtown and the beach.',
    keyHighlights: ['Holiday Park & The Parker Playhouse', 'Minutes to Fort Lauderdale Beach', 'Lush tropical canopies and historic estates', 'Single-family homes & modern townhomes'],
    bestFor: ['Buyer who wants a house near downtown', 'Walker and cyclist', 'Fan of modern townhomes on established streets'],
    lifestylePillars: ['parks', 'walkability', 'quiet', 'city'],
    prices: [P.victoriaPark],
    img: U('photo-1576013551627-0cc20b96c2a7', 1600),
  },
  {
    id: 'wilton-manors', name: 'Wilton Manors', region: 'Broward',
    tagline: 'The Island City: A Walkable Main Street & the Middle River',
    vibe: 'A celebrated dining scene on Wilton Drive, river views and charming mid-century waterfront homes.',
    description: 'Completely surrounded by the Middle River, Wilton Manors is an energetic island city with a world-famous dining and entertainment district along Wilton Drive. Beautiful mid-century homes along the river offer kayak access and private pools.',
    keyHighlights: ['The Wilton Drive Arts & Entertainment District', 'Middle River kayaking & paddleboarding', 'Compact, walkable small-city layout', 'Mid-century, riverfront and renovated homes'],
    bestFor: ['Buyer who wants a walkable main street', 'Paddler and river lover', 'Mid-century home fan'],
    lifestylePillars: ['nightlife', 'walkability', 'city', 'investment'],
    prices: [P.wiltonManors],
    img: U('photo-1502005229762-cf1b2da7c5d6', 1600),
  },
  {
    id: 'coconut-grove', name: 'Coconut Grove', region: 'Miami-Dade',
    tagline: "Miami's Oldest Modern Enclave, Banyan Canopies & Regatta Bays",
    vibe: 'Artsy and leafy: subtropical tree canopy, sailing clubs and a walkable village center.',
    description: "Miami's most historic neighborhood is characterized by towering banyans, historic stone walls, and long-established sailing clubs. CocoWalk offers open-air dining, and the Dinner Key marinas put Biscayne Bay at the end of the street.",
    keyHighlights: ['Biscayne Bay Sailing Clubs & Regattas', 'Dinner Key marinas & Bayshore Drive', 'CocoWalk boutique lifestyle center', 'Gated bayside communities (The Moorings, Camp Biscayne)'],
    bestFor: ['Buyer who wants trees, the bay and a village center', 'Sailor or paddler', 'Remote worker who wants space near the city'],
    lifestylePillars: ['parks', 'waterfront', 'walkability', 'quiet'],
    prices: [P.coconutGrove],
    img: U('photo-1600585154340-be6161a56a0c', 1600),
  },
];

export const COMMUNITIES = [
  { name: 'Palm Beach', county: 'Palm Beach County', x: 54, y: 8, price: P.palmBeach, profile: 'Oceanfront and lakefront estates, Worth Avenue and Mizner-era architecture under strict town review.', tags: ['Oceanfront', 'Estate section', 'Club life'] },
  { name: 'Victoria Park', county: 'Broward', x: 45, y: 46, price: P.victoriaPark, profile: 'Walkable, canopied streets steps from Las Olas, with historic homes next to new townhomes.', tags: ['Walkable', 'Historic', 'Townhomes'] },
  { name: 'Las Olas', county: 'Broward', x: 49, y: 50, price: P.lasOlasIsles, profile: 'Isles addresses with deep water and no fixed bridges to the inlet.', tags: ['Deep water', 'Boating', 'Dining'] },
  { name: 'Tarpon River', county: 'Broward', x: 44, y: 54, price: P.tarponRiver, profile: 'Quiet river frontage with downtown at walking distance and value still on the table.', tags: ['Waterfront', 'Value', 'Walkable'] },
  { name: 'Fort Lauderdale', county: 'Broward', x: 49, y: 43, price: P.lauderdaleBeach, profile: 'Beach condos along A1A and the Galt Ocean Mile, Intracoastal homes, and new builds inland.', tags: ['Beach', 'Condos', 'New build'] },
  { name: 'Aventura', county: 'Miami-Dade', x: 43, y: 64, price: P.aventura, profile: 'Condo-dominant and amenity-led, anchored by the mall and the marina.', tags: ['Condos', 'Amenities', 'Brightline'] },
  { name: 'Sunny Isles Beach', county: 'Miami-Dade', x: 44, y: 69, price: P.sunnyIsles, profile: 'Branded oceanfront towers and a deep pre-construction pipeline.', tags: ['Oceanfront', 'Branded', 'Pre-construction'] },
  { name: 'Miami Beach', county: 'Miami-Dade', x: 42, y: 76, price: P.southBeach, profile: 'From La Gorce estates to Art Deco flats — pricing splits sharply by block.', tags: ['Waterfront', 'Design', 'Nightlife'] },
  { name: 'Miami', county: 'Miami-Dade', x: 30, y: 80, price: P.downtownMiami, profile: 'Edgewater and downtown: new towers on the bay and a wide range of price points.', tags: ['Towers', 'Waterfront', 'Investment'] },
  { name: 'Brickell', county: 'Miami-Dade', x: 33, y: 86, price: P.brickell, profile: "Vertical, walkable, and rented as readily as it is owned — the investor's market.", tags: ['Condos', 'Walkable', 'Investment'] },
  { name: 'Coconut Grove', county: 'Miami-Dade', x: 30, y: 91, price: P.coconutGrove, profile: 'Canopy, sailing, and village scale — the closest thing Miami has to a small town.', tags: ['Village', 'Sailing', 'Canopy'] },
  { name: 'Coral Gables', county: 'Miami-Dade', x: 24, y: 88, price: P.coralGables, profile: 'Mediterranean architecture under strict review boards, from 1920s originals to waterfront estates.', tags: ['Historic', 'Architecture', 'Golf'] },
];
