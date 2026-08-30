import { Property, LifestyleItem, Community, Development, MarketCityData, Story, ParsedQuery, NeighborhoodDetail, CaseStudy, InsightArticle } from './types';

const U = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PROPERTIES: Property[] = [
  {
    id: "lagorce",
    name: "La Gorce Island Waterfront",
    city: "Miami Beach",
    area: "miami",
    badge: "Waterfront",
    price: 18500000,
    beds: 6,
    baths: 8,
    sqft: 12400,
    type: "house",
    grad: "g-dusk",
    img: U("photo-1613490493576-7fde63acd811", 1800),
    tags: ["Waterfront", "Private dock", "Pool", "New construction", "Luxury"],
    desc: "A guard-gated island address with 110 feet of protected frontage, a floating dock, and a glass volume built to hold the sunset from every principal room.",
    neighborhood: "Miami Beach",
    featured: true
  },
  {
    id: "palmbeach",
    name: "Palm Beach Oceanfront Estate",
    city: "Palm Beach",
    area: "pb",
    badge: "Oceanfront",
    price: 32750000,
    beds: 7,
    baths: 10,
    sqft: 16200,
    type: "house",
    grad: "g-sunset",
    img: U("photo-1600596542815-ffad4c1539a9", 1600),
    tags: ["Oceanfront", "Beach access", "Pool", "Guest house", "Luxury"],
    desc: "Mediterranean revival on a rare double lot, with direct beach access, a loggia built for entertaining, and a separate two-bedroom guest house.",
    neighborhood: "Palm Beach",
    featured: true
  },
  {
    id: "lasolas",
    name: "Las Olas Isles Modern",
    city: "Fort Lauderdale",
    area: "ftl",
    badge: "Deep water",
    price: 6950000,
    beds: 5,
    baths: 6,
    sqft: 6100,
    type: "house",
    grad: "g-ocean",
    img: U("photo-1512917774080-9991f1c4c750", 1600),
    tags: ["Waterfront", "Private dock", "Pool", "Boating", "Luxury"],
    desc: "Eighty-five feet of deep water minutes from the inlet — no fixed bridges, a full-service dock, and an indoor-outdoor plan built around the pool.",
    neighborhood: "Las Olas",
    featured: true
  },
  {
    id: "brickell",
    name: "Brickell Sky Residence",
    city: "Miami",
    area: "miami",
    badge: "Condo",
    price: 2350000,
    beds: 3,
    baths: 3,
    sqft: 2180,
    type: "condo",
    grad: "g-night",
    img: U("photo-1600607687939-ce8a6c25118c", 1400),
    tags: ["Ocean views", "Condo", "Walkable", "Brickell", "Investment"],
    desc: "A high-floor corner with bay and skyline exposure, walking distance to Brickell's restaurant row and the city's best-run building services.",
    neighborhood: "Brickell",
    featured: true
  },
  {
    id: "sunnyisles",
    name: "Sunny Isles Oceanfront Flat",
    city: "Sunny Isles Beach",
    area: "miami",
    badge: "Oceanfront",
    price: 2950000,
    beds: 3,
    baths: 4,
    sqft: 2640,
    type: "condo",
    grad: "g-ocean",
    img: U("photo-1600566753086-00f18fb6b3ea", 1400),
    tags: ["Oceanfront", "Ocean views", "Condo", "Beach access"],
    desc: "Direct ocean frontage with a wraparound terrace, private elevator entry, and beach service that runs from November through hurricane season.",
    neighborhood: "Sunny Isles Beach",
    featured: true
  },
  {
    id: "coconut",
    name: "Coconut Grove Garden House",
    city: "Coconut Grove",
    area: "miami",
    badge: "Village",
    price: 4150000,
    beds: 5,
    baths: 5,
    sqft: 4600,
    type: "house",
    grad: "g-interior",
    img: U("photo-1600585154340-be6161a56a0c", 1400),
    tags: ["Pool", "Walkable", "Garden", "Family"],
    desc: "Behind a hedge on a canopy street: a restored 1930s frame house with a modern rear volume, lap pool, and a mango tree older than the neighborhood.",
    neighborhood: "Coconut Grove"
  },
  {
    id: "golfpb",
    name: "Palm Beach Golf Residence",
    city: "Palm Beach Gardens",
    area: "pb",
    badge: "Golf",
    price: 3850000,
    beds: 4,
    baths: 5,
    sqft: 4900,
    type: "house",
    grad: "g-tower",
    img: U("photo-1587174486073-ae5e5cff23aa", 1400),
    tags: ["Golf", "Pool", "Club membership", "Gated"],
    desc: "Fairway frontage on a championship course, with membership eligibility, a summer kitchen, and a primary wing that reads as its own residence.",
    neighborhood: "Palm Beach Gardens"
  },
  {
    id: "island",
    name: "Private Island Compound",
    city: "Biscayne Bay",
    area: "miami",
    badge: "Private island",
    price: 24500000,
    beds: 6,
    baths: 7,
    sqft: 9800,
    type: "house",
    grad: "g-dusk",
    img: U("photo-1559128010-7c1ad6e1b6a5", 1600),
    tags: ["Private island", "Waterfront", "Private dock", "Boating"],
    desc: "Its own key in the bay: deep-water dockage for a 90-foot vessel, a helipad pad site, and 360 degrees of water with no neighbor in view.",
    neighborhood: "Miami Beach"
  },
  {
    id: "riverwalk",
    name: "Tarpon River Waterfront",
    city: "Fort Lauderdale",
    area: "ftl",
    badge: "Waterfront",
    price: 2790000,
    beds: 4,
    baths: 4,
    sqft: 3400,
    type: "house",
    grad: "g-night",
    img: U("photo-1600047509807-ba8f99d2cdde", 1400),
    tags: ["Waterfront", "Private dock", "Pool", "Walkable"],
    desc: "A quiet river address a short walk from Las Olas, with a new seawall, a covered dock, and a pool deck that faces west for the light.",
    neighborhood: "Tarpon River"
  },
  {
    id: "edgewater_loft",
    name: "Edgewater Bayfront Penthouse",
    city: "Miami",
    area: "miami",
    badge: "Condo",
    price: 1875000,
    beds: 2,
    baths: 3,
    sqft: 1950,
    type: "condo",
    grad: "g-ocean",
    img: U("photo-1512918728675-ed5a9ecdebfd", 1400),
    tags: ["Condo", "Waterfront", "Ocean views", "Investment"],
    desc: "Breathtaking double-height bay views directly across to Miami Beach. Seamless open terrace, private elevator, and strong rental yields.",
    neighborhood: "Edgewater"
  },
  {
    id: "victoria_manor",
    name: "Victoria Park Historic Villa",
    city: "Fort Lauderdale",
    area: "ftl",
    badge: "Historic",
    price: 2150000,
    beds: 4,
    baths: 4,
    sqft: 3600,
    type: "house",
    grad: "g-interior",
    img: U("photo-1576013551627-0cc20b96c2a7", 1400),
    tags: ["Walkable", "Pool", "Historic", "Family"],
    desc: "Meticulously restored coastal Mediterranean nestled under oak canopies in Victoria Park. 5-minute stroll to Las Olas dining and arts district.",
    neighborhood: "Victoria Park"
  }
];

export const LIFESTYLE: LifestyleItem[] = [
  {
    name: "Waterfront Living",
    count: 48,
    grad: "g-dusk",
    img: U("photo-1613490493576-7fde63acd811", 1600),
    desc: "Deep-water frontage, private dockage, and sunsets that arrive on schedule."
  },
  {
    name: "Luxury Condos",
    count: 126,
    grad: "g-night",
    img: U("photo-1600607687939-ce8a6c25118c", 1600),
    desc: "Full-service buildings where the amenity deck matters as much as the floor plan."
  },
  {
    name: "Beachfront Estates",
    count: 22,
    grad: "g-sunset",
    img: U("photo-1507525428034-b723cf961d3e", 1600),
    desc: "Sand at the property line — the shortest supply on the entire coast."
  },
  {
    name: "Golf Communities",
    count: 37,
    grad: "g-tower",
    img: U("photo-1587174486073-ae5e5cff23aa", 1600),
    desc: "Fairway frontage and membership pathways, from Doral to the Gardens."
  },
  {
    name: "Private Islands",
    count: 6,
    grad: "g-ocean",
    img: U("photo-1559128010-7c1ad6e1b6a5", 1600),
    desc: "Guard-gated keys in Biscayne Bay, traded quietly and rarely listed twice."
  },
  {
    name: "Boating Lifestyle",
    count: 64,
    grad: "g-ocean",
    img: U("photo-1567899378494-47b22a2ae96a", 1600),
    desc: "No fixed bridges, ocean access measured in minutes, dockage measured in feet."
  }
];

export const COMMUNITIES: Community[] = [
  {
    name: "Palm Beach",
    county: "Palm Beach County",
    x: 54,
    y: 8,
    price: "$4.9M",
    dom: "64 days",
    inv: "5.8 mo",
    act: "Steady",
    note: "Low turnover",
    profile: "Old-guard oceanfront and estate-section privacy, transacted largely off-market.",
    tags: ["Oceanfront", "Estate section", "Club life"]
  },
  {
    name: "Victoria Park",
    county: "Broward",
    x: 45,
    y: 46,
    price: "$1.35M",
    dom: "41 days",
    inv: "3.2 mo",
    act: "Active",
    note: "Rising",
    profile: "Walkable, canopied, and steps from Las Olas — the city's most in-demand pocket.",
    tags: ["Walkable", "Historic", "Family"]
  },
  {
    name: "Las Olas",
    county: "Broward",
    x: 49,
    y: 50,
    price: "$2.6M",
    dom: "48 days",
    inv: "4.1 mo",
    act: "Active",
    note: "Balanced",
    profile: "Isles addresses with deep water and no fixed bridges to the inlet.",
    tags: ["Deep water", "Boating", "Dining"]
  },
  {
    name: "Tarpon River",
    county: "Broward",
    x: 44,
    y: 54,
    price: "$1.15M",
    dom: "38 days",
    inv: "2.9 mo",
    act: "Hot",
    note: "Under 40 days",
    profile: "Quiet river frontage with downtown at walking distance and value still on the table.",
    tags: ["Waterfront", "Value", "Walkable"]
  },
  {
    name: "Fort Lauderdale",
    county: "Broward",
    x: 49,
    y: 43,
    price: "$725K",
    dom: "44 days",
    inv: "3.7 mo",
    act: "Active",
    note: "Balanced",
    profile: "The broadest inventory on the coast, from beach condos to inland new build.",
    tags: ["Beach", "Condos", "New build"]
  },
  {
    name: "Aventura",
    county: "Miami-Dade",
    x: 43,
    y: 64,
    price: "$690K",
    dom: "52 days",
    inv: "5.1 mo",
    act: "Steady",
    note: "Buyer leverage",
    profile: "Condo-dominant and amenity-led, anchored by the mall and the marina.",
    tags: ["Condos", "Amenities", "Schools"]
  },
  {
    name: "Sunny Isles Beach",
    county: "Miami-Dade",
    x: 44,
    y: 69,
    price: "$1.42M",
    dom: "58 days",
    inv: "6.4 mo",
    act: "Softening",
    note: "Negotiable",
    profile: "Branded oceanfront towers — the deepest pre-construction pipeline in Florida.",
    tags: ["Oceanfront", "Branded", "Pre-construction"]
  },
  {
    name: "Miami Beach",
    county: "Miami-Dade",
    x: 42,
    y: 76,
    price: "$1.85M",
    dom: "55 days",
    inv: "5.5 mo",
    act: "Steady",
    note: "Selective",
    profile: "From La Gorce estates to Art Deco flats — pricing splits sharply by block.",
    tags: ["Waterfront", "Design", "Nightlife"]
  },
  {
    name: "Miami",
    county: "Miami-Dade",
    x: 30,
    y: 80,
    price: "$1.05M",
    dom: "42 days",
    inv: "3.8 mo",
    act: "Active",
    note: "Broad demand",
    profile: "Edgewater and downtown — the deepest new-tower pipeline and the widest price band in the county.",
    tags: ["Towers", "Waterfront", "Investment"]
  },
  {
    name: "Brickell",
    county: "Miami-Dade",
    x: 33,
    y: 86,
    price: "$1.05M",
    dom: "39 days",
    inv: "3.4 mo",
    act: "Hot",
    note: "Fastest pace",
    profile: "Vertical, walkable, and rented as readily as it is owned — the investor's market.",
    tags: ["Condos", "Walkable", "Investment"]
  },
  {
    name: "Coconut Grove",
    county: "Miami-Dade",
    x: 30,
    y: 91,
    price: "$2.15M",
    dom: "46 days",
    inv: "4.0 mo",
    act: "Active",
    note: "Tight supply",
    profile: "Canopy, sailing, and village scale — the closest thing Miami has to a small town.",
    tags: ["Village", "Sailing", "Canopy"]
  },
  {
    name: "Coral Gables",
    county: "Miami-Dade",
    x: 24,
    y: 88,
    price: "$1.95M",
    dom: "51 days",
    inv: "4.4 mo",
    act: "Steady",
    note: "Consistent",
    profile: "Mediterranean architecture under strict review boards — value holds through cycles.",
    tags: ["Historic", "Schools", "Golf"]
  }
];

export const NEIGHBORHOODS: NeighborhoodDetail[] = [
  {
    id: "miami-beach",
    name: "Miami Beach",
    region: "Miami-Dade",
    tagline: "Iconic Coastline, Art Deco Grandeur & Private Islands",
    vibe: "High-energy coastal sophistication, ultra-prime private island sanctuaries, and Michelin dining.",
    avgPriceSqft: 1480,
    medianPrice: "$1,850,000",
    walkScore: 88,
    lifestylePillars: ["beach", "nightlife", "waterfront", "walkability"],
    description: "Miami Beach represents the pinnacle of global coastal real estate. From guarded island enclaves like Star, Palm, and La Gorce to historic South Beach and the ultra-luxurious Faena District, it delivers an unparalleled fusion of art, culture, and beachfront living.",
    keyHighlights: ["Star & La Gorce Islands", "South of Fifth (SoFi)", "Lincoln Road & Sunset Harbour", "Direct Atlantic Ocean frontage"],
    img: U("photo-1506953823976-52e1fdc0149a", 1600)
  },
  {
    id: "brickell",
    name: "Brickell",
    region: "Miami-Dade",
    tagline: "The Wall Street of the South & Vertical Luxury",
    vibe: "Fast-paced, metropolitan, impeccably dressed, and bustling with top financial institutions.",
    avgPriceSqft: 980,
    medianPrice: "$1,050,000",
    walkScore: 96,
    lifestylePillars: ["city", "nightlife", "investment", "walkability"],
    description: "Brickell has transformed into the primary financial hub of the Southeast. Lined with soaring ultra-luxury residential towers, rooftop lounges, and Brickell City Centre, it is the undisputed leader for corporate relocations and high-yield condominium investments.",
    keyHighlights: ["Brickell City Centre", "Financial District Corridors", "Mary Brickell Village", "High tenant demand and liquidity"],
    img: U("photo-1533105079780-92b9be482077", 1600)
  },
  {
    id: "edgewater",
    name: "Edgewater",
    region: "Miami-Dade",
    tagline: "Waterfront Towers, Arts District Proximity & Unobstructed Bay Views",
    vibe: "Creative, modern, rapidly appreciating, and centered around Margaret Pace Park.",
    avgPriceSqft: 890,
    medianPrice: "$920,000",
    walkScore: 91,
    lifestylePillars: ["waterfront", "city", "investment", "walkability"],
    description: "Perched directly on Biscayne Bay just north of Downtown, Edgewater is Miami's hottest corridor for new branded pre-construction towers. Residents enjoy front-row bay views, dog-friendly waterfront parks, and walking access to the Design District and Wynwood.",
    keyHighlights: ["Margaret Pace Bayfront Park", "Minutes to Design District & Wynwood", "Villa Miami & Missoni Baia", "Direct Biscayne Bay vistas"],
    img: U("photo-1512918728675-ed5a9ecdebfd", 1600)
  },
  {
    id: "sunny-isles",
    name: "Sunny Isles Beach",
    region: "Miami-Dade",
    tagline: "Florida's Riviera & World-Class Branded Towers",
    vibe: "Refined, international oceanfront luxury, private beach clubs, and serene coastal living.",
    avgPriceSqft: 1250,
    medianPrice: "$1,420,000",
    walkScore: 74,
    lifestylePillars: ["beach", "waterfront", "investment", "quiet"],
    description: "Known as Florida's Riviera, Sunny Isles Beach boasts the highest concentration of branded ultra-luxury oceanfront skyscrapers in North America, including Bentley Residences, Porsche Design Tower, and St. Regis. White sand beaches meet five-star resort amenities.",
    keyHighlights: ["Bentley & Porsche Towers", "Pristine white sand shoreline", "24/7 private beach service", "Proximity to Bal Harbour Shops"],
    img: U("photo-1600566753086-00f18fb6b3ea", 1600)
  },
  {
    id: "aventura",
    name: "Aventura",
    region: "Miami-Dade",
    tagline: "Master-Planned Luxury, World-Class Marinas & Premier Schools",
    vibe: "Family-oriented, secure, manicured golf courses, and premier retail destinations.",
    avgPriceSqft: 680,
    medianPrice: "$690,000",
    walkScore: 78,
    lifestylePillars: ["family", "waterfront", "quiet", "investment"],
    description: "A meticulously planned enclave famous for Turnberry Isle resort, Aventura Mall, and top-rated public and private schools. Deep-water marinas and lush golf fairways create an effortless lifestyle for families and retirees alike.",
    keyHighlights: ["Turnberry Isle Golf & Country Club", "Aventura Mall & Brightline Station", "Williams Island Marina", "Top-tier school districts"],
    img: U("photo-1587174486073-ae5e5cff23aa", 1600)
  },
  {
    id: "fort-lauderdale",
    name: "Fort Lauderdale",
    region: "Broward",
    tagline: "The Yachting Capital of the World & Modern Coastal Living",
    vibe: "Relaxed coastal luxury, 300+ miles of navigable waterways, and a booming downtown core.",
    avgPriceSqft: 610,
    medianPrice: "$725,000",
    walkScore: 76,
    lifestylePillars: ["waterfront", "beach", "family", "investment"],
    description: "Fort Lauderdale blends maritime heritage with an explosive culinary and cultural renaissance. From the sparkling beaches of A1A to the vibrant Riverwalk and Las Olas boulevard, it provides supreme boating access with exceptional tax efficiency.",
    keyHighlights: ["Fort Lauderdale International Boat Show", "Riverwalk Arts & Entertainment District", "Direct ocean inlets with no fixed bridges", "Rapidly expanding tech and finance corridor"],
    img: U("photo-1512917774080-9991f1c4c750", 1600)
  },
  {
    id: "las-olas",
    name: "Las Olas & The Isles",
    region: "Broward",
    tagline: "Boutique Boulevard Chic & Deep-Water Finger Islands",
    vibe: "Tree-lined European-style promenade leading directly to custom waterfront mega-mansions.",
    avgPriceSqft: 1100,
    medianPrice: "$2,600,000",
    walkScore: 92,
    lifestylePillars: ["waterfront", "walkability", "nightlife", "city"],
    description: "The crown jewel of Broward County. Las Olas Boulevard offers high-end art galleries, sidewalk bistros, and high-fashion boutiques, while the adjoining finger isles accommodate mega-yachts with quick, deep-water ocean access.",
    keyHighlights: ["Las Olas Isles private docks", "World-class dining and galleries", "No fixed bridges to Port Everglades inlet", "Walkable downtown waterfront lifestyle"],
    img: U("photo-1545324418-cc1a3fa10c00", 1600)
  },
  {
    id: "tarpon-river",
    name: "Tarpon River",
    region: "Broward",
    tagline: "Historic Charm, Riverfront Calm & Exceptional Value",
    vibe: "Authentic, leafy, riverfront tranquility just minutes from downtown Fort Lauderdale.",
    avgPriceSqft: 540,
    medianPrice: "$1,150,000",
    walkScore: 82,
    lifestylePillars: ["waterfront", "quiet", "walkability", "investment"],
    description: "A secluded historic neighborhood set along the South Fork of the New River. Favored by yacht owners and architects seeking peaceful riverfront tranquility within walking distance of downtown law firms and Las Olas restaurants.",
    keyHighlights: ["Protected deep-water river dockage", "Florence C. Hardy Park", "Walkable to Broward Health & Downtown", "High price-appreciation potential"],
    img: U("photo-1600047509807-ba8f99d2cdde", 1600)
  },
  {
    id: "victoria-park",
    name: "Victoria Park",
    region: "Broward",
    tagline: "Canopied Streets, Architectural Character & Urban Energy",
    vibe: "Bohemian luxury, historic 1930s homes alongside cutting-edge modern townhouses.",
    avgPriceSqft: 650,
    medianPrice: "$1,350,000",
    walkScore: 86,
    lifestylePillars: ["family", "walkability", "quiet", "city"],
    description: "Nestled between Downtown Fort Lauderdale and the Atlantic Ocean, Victoria Park features lush tropical banyan trees, eclectic architecture, and Holiday Park. It remains one of the most sought-after neighborhoods for professionals and families.",
    keyHighlights: ["Holiday Park & The Parker Playhouse", "Minutes to Fort Lauderdale Beach", "Lush tropical canopies and historic estates", "Strong year-over-year value retention"],
    img: U("photo-1576013551627-0cc20b96c2a7", 1600)
  },
  {
    id: "wilton-manors",
    name: "Wilton Manors",
    region: "Broward",
    tagline: "Vibrant Island City, Inclusive Culture & Thriving Nightlife",
    vibe: "Progressive, welcoming, celebrated culinary scene, and charming mid-century waterfront homes.",
    avgPriceSqft: 520,
    medianPrice: "$825,000",
    walkScore: 89,
    lifestylePillars: ["nightlife", "walkability", "city", "investment"],
    description: "Completely surrounded by the Middle River, Wilton Manors is an energetic island city with a world-famous dining and entertainment district along Wilton Drive. Beautiful mid-century homes along the river offer kayak access and private pools.",
    keyHighlights: ["The Wilton Drive Arts & Entertainment District", "Middle River kayaking & paddleboarding", "Thriving community spirit and hospitality", "Strong short-term rental performance"],
    img: U("photo-1502005229762-cf1b2da7c5d6", 1600)
  },
  {
    id: "coconut-grove",
    name: "Coconut Grove",
    region: "Miami-Dade",
    tagline: "Miami's Oldest Modern Enclave, Banyan Canopies & Regatta Bays",
    vibe: "Artsy, upscale, lush subtropical tree cover, sailing clubs, and prestigious private schools.",
    avgPriceSqft: 1150,
    medianPrice: "$2,150,000",
    walkScore: 90,
    lifestylePillars: ["family", "waterfront", "walkability", "quiet"],
    description: "Miami's most historic neighborhood is characterized by towering banyans, historic stone walls, and elite sailing clubs. CocoWalk offers open-air dining, while Ransom Everglades and Carrollton make it the premier choice for families.",
    keyHighlights: ["Biscayne Bay Sailing Clubs & Regattas", "Ransom Everglades & St. Stephen's", "CocoWalk boutique lifestyle center", "Gated bayside communities (The Moorings, Camp Biscayne)"],
    img: U("photo-1600585154340-be6161a56a0c", 1600)
  }
];

export const DEVELOPMENTS: Development[] = [
  {
    id: "bentley-residences",
    name: "Bentley Residences",
    loc: "Sunny Isles Beach",
    area: "sunnyisles",
    from: "From $4.2M",
    dev: "Dezer Development",
    architect: "Sieger Suarez Architects",
    year: "2028",
    status: "Reservations open",
    grad: "g-sunset",
    img: U("photo-1545324418-cc1a3fa10c00", 1600),
    residences: 216,
    depositStructure: "10% at Contract, 10% Groundbreaking, 10% Top-off, Balance at Closing",
    amenities: ["Patented 'Dezervator' in-unit car elevator", "Private heated swimming pool on every terrace", "Private restaurant curated by celebrity chef", "Full-service wellness spa & oceanfront cabanas"],
    roiHighlights: "Iconic brand equity driving substantial international capital inflows; high rental demand from global collectors.",
    desc: "The world's first Bentley-branded luxury residential tower, rising 62 stories over Sunny Isles Beach with proprietary in-unit car lifts and private balcony plunge pools."
  },
  {
    id: "st-regis-residences",
    name: "St. Regis Residences",
    loc: "Sunny Isles Beach",
    area: "sunnyisles",
    from: "From $5.1M",
    dev: "Fortune International & Château Group",
    architect: "Arquitectonica / Patricia Anastassiadis",
    year: "2027",
    status: "Under construction",
    grad: "g-tower",
    img: U("photo-1486406146926-c627a92ad1ab", 1600),
    residences: 175,
    depositStructure: "20% Contract, 10% Groundbreaking, 10% Top-Off, 60% Closing",
    amenities: ["Legendary St. Regis Butler Service", "70,000+ sq ft of private oceanfront amenities", "Private beach club & oceanfront dining", "Sunset and sunrise dual-facing infinity pools"],
    roiHighlights: "Pre-construction pricing advantage with high resale multiple upon completion; no hotel component ensures pure residential exclusivity.",
    desc: "Two grand towers dedicated entirely to private residential owners, offering pure oceanfront grandeur without transient hotel guests."
  },
  {
    id: "villa-miami",
    name: "Villa Miami",
    loc: "Edgewater, Miami",
    area: "edgewater",
    from: "From $3.6M",
    dev: "Terra & One Thousand Museum Developers",
    architect: "ODD (Office for Design & Architecture)",
    year: "2027",
    status: "Reservations open",
    grad: "g-night",
    img: U("photo-1470071459604-3b5ec3a7fe05", 1600),
    residences: 72,
    depositStructure: "10% Reservation, 10% Contract, 20% Construction milestones, 60% Closing",
    amenities: ["Private rooftop helipad for residents", "Bespoke hospitality by Major Food Group (Carbone)", "Private dock slips on Biscayne Bay", "Estate-sized full-floor and half-floor layouts"],
    roiHighlights: "Ultra-low unit count (only 72 residences) creates high scarcity value and superior price stability.",
    desc: "A boutique jewel in Edgewater delivering full-floor and half-floor residences with hospitality curated by Major Food Group."
  },
  {
    id: "cipriani-residences",
    name: "Cipriani Residences",
    loc: "Brickell, Miami",
    area: "brickell",
    from: "From $1.9M",
    dev: "Mast Capital",
    architect: "Arquitectonica / 1508 London",
    year: "2028",
    status: "Under construction",
    grad: "g-dusk",
    img: U("photo-1600607687939-ce8a6c25118c", 1600),
    residences: 397,
    depositStructure: "20% Contract, 10% Groundbreaking, 10% 40th Floor, 60% Closing",
    amenities: ["Exclusive Cipriani resident dining & catering", "Private speakeasy lounge & cigar room", "Resort-style pool deck with private cabanas", "24/7 dedicated concierge and valet services"],
    roiHighlights: "Prime central Brickell location with proven global hospitality brand power and supreme executive lease demand.",
    desc: "Italian timeless elegance meets Brickell's financial district. Uncompromising service with private resident-only Cipriani restaurant."
  },
  {
    id: "ombelle-residences",
    name: "Ombelle Residences",
    loc: "Fort Lauderdale",
    area: "ftl",
    from: "From $2.9M",
    dev: "Dolce Living & Merrimac Ventures",
    architect: "OBMI Architects",
    year: "2028",
    status: "Now selling",
    grad: "g-dusk",
    img: U("photo-1449034446853-66c86144b0ad", 1600),
    residences: 110,
    depositStructure: "10% Contract, 10% Groundbreaking, 10% Structure, 70% Closing",
    amenities: ["Private riverfront boardwalk and marina", "Rooftop wellness spa with cold plunge & infrared sauna", "Private wine cellar and tasting salon", "Co-working executive suites and screening room"],
    roiHighlights: "Fort Lauderdale's premier boutique luxury tower priced favorably compared to equivalent Miami waterfront.",
    desc: "A stunning modern landmark in Fort Lauderdale combining deep-water canal views with downtown proximity and refined architectural finishes."
  },
  {
    id: "aston-martin",
    name: "Aston Martin Residences",
    loc: "Downtown Miami",
    area: "miami",
    from: "From $2.4M",
    dev: "G&G Business Developments",
    architect: "Revuelta Architecture & Bodas Mian Anger",
    year: "Delivered",
    status: "Move-in ready",
    grad: "g-ocean",
    img: U("photo-1502005229762-cf1b2da7c5d6", 1600),
    residences: 391,
    depositStructure: "Immediate closing / Financing available",
    amenities: ["4-level 'Sky Amenities' on floors 52-55", "Infinity pool with panoramic bay and ocean views", "Superyacht marina slip access directly on Miami River", "Curated British automotive art gallery and cinema"],
    roiHighlights: "Move-in ready brand flagship on the mouth of the Miami River; high immediate cap rate for prime luxury leasing.",
    desc: "The iconic sail-shaped skyscraper where the Miami River meets Biscayne Bay. Completed, delivered, and defining the city skyline."
  }
];

export const MARKET: Record<string, MarketCityData> = {
  miami: {
    label: "Miami",
    price: "$1,420,000",
    dPrice: "+12%",
    dom: "38 days",
    dDom: "-4",
    inv: "2.1 mo",
    dInv: "-0.3",
    lux: "+12%",
    dLux: "YoY",
    series: [1180, 1215, 1240, 1298, 1355, 1420]
  },
  ftl: {
    label: "Fort Lauderdale",
    price: "$965,000",
    dPrice: "+7%",
    dom: "44 days",
    dDom: "-2",
    inv: "3.4 mo",
    dInv: "+0.2",
    lux: "+9%",
    dLux: "YoY",
    series: [880, 895, 912, 930, 948, 965]
  },
  pb: {
    label: "Palm Beach",
    price: "$4,900,000",
    dPrice: "+15%",
    dom: "64 days",
    dDom: "+6",
    inv: "5.8 mo",
    dInv: "+0.6",
    lux: "+15%",
    dLux: "YoY",
    series: [4150, 4260, 4380, 4520, 4710, 4900]
  }
};

export const MONTHS = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"];

export const PPSF: Record<string, number> = {
  miami: 820,
  ftl: 610,
  pb: 1450
};

export const STORIES: Story[] = [
  {
    quote: "Miguel delivered an outcome I didn't think was possible. His strategic positioning and negotiation earned us a record sale in the building.",
    who: "Jonathan & Elena R.",
    where: "Sold in Coconut Grove",
    grad: "g-night",
    img: U("photo-1600607687939-ce8a6c25118c", 1400)
  },
  {
    quote: "We relocated from Chicago sight unseen. He toured eleven homes on video, gave us the unvarnished truth on each, and negotiated $180k below asking.",
    who: "The Marchetti Family",
    where: "Purchased in Las Olas",
    grad: "g-ocean",
    img: U("photo-1600566753086-00f18fb6b3ea", 1400)
  },
  {
    quote: "He priced our building floor by floor, analyzing view corridors and HOA reserves. That single analytical decision made all the difference.",
    who: "D. Alvarez",
    where: "Sold in Brickell",
    grad: "g-dusk",
    img: U("photo-1600585154340-be6161a56a0c", 1400)
  },
  {
    quote: "Two years before we were ready, he was already sending bespoke market notes. When the right deep-water dock came up, we moved in 24 hours.",
    who: "Peter & Yolanda K.",
    where: "Purchased in Sunny Isles Beach",
    grad: "g-interior",
    img: U("photo-1600607687920-4e2a09cf159d", 1400)
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-1",
    address: "3540 Main Highway",
    neighborhood: "Coconut Grove",
    propertyType: "Modern Gated Estate",
    originalExpectation: "$5,200,000",
    finalSalePrice: "$5,650,000",
    daysOnMarket: 14,
    strategyUsed: "Off-Market Preview & Architectural Twilight Video Strategy",
    outcome: "+$450,000 over initial valuation with 3 competing all-cash offers within 14 days.",
    img: U("photo-1600585154340-be6161a56a0c", 1200)
  },
  {
    id: "cs-2",
    address: "1421 Brickell Avenue, Penthouse 4801",
    neighborhood: "Brickell",
    propertyType: "Corner High-Floor Residence",
    originalExpectation: "$2,200,000",
    finalSalePrice: "$2,410,000",
    daysOnMarket: 21,
    strategyUsed: "View-Corridor Pricing Optimization & Targeted NY Buyer Outreach",
    outcome: "Set the highest price-per-square-foot record in the building for 2025/2026.",
    img: U("photo-1600607687939-ce8a6c25118c", 1200)
  },
  {
    id: "cs-3",
    address: "728 Isle of Palms",
    neighborhood: "Las Olas Isles, Fort Lauderdale",
    propertyType: "Deep-Water Waterfront Home",
    originalExpectation: "$4,400,000",
    finalSalePrice: "$4,750,000",
    daysOnMarket: 28,
    strategyUsed: "Superyacht Dockage Certification & Turnkey Staging",
    outcome: "Secured a non-contingent cash buyer from the Northeast relocating their yacht.",
    img: U("photo-1512917774080-9991f1c4c750", 1200)
  }
];

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: "art-1",
    title: "The 2026 South Florida Luxury Migration: Capital Inflows from NY, CA & IL",
    category: "Market Update",
    date: "August 2026",
    readTime: "6 min read",
    summary: "How high-earner corporate migrations and state-level tax incentives continue to drive sustained demand for ultra-luxury residential assets across Miami-Dade and Broward.",
    keyTakeaways: [
      "Wealth migration from the Northeast and California shows zero signs of deceleration.",
      "Waterfront and guard-gated properties remain supply-inelastic, supporting floor prices.",
      "Corporate office absorption in Brickell and Downtown Fort Lauderdale reached record highs."
    ],
    author: "Miguel Perez",
    img: U("photo-1506953823976-52e1fdc0149a", 1200)
  },
  {
    id: "art-2",
    title: "The Reality Behind Florida's Milestone Condo Inspections & Milestone Reserve Laws",
    category: "Real Estate Strategy",
    date: "July 2026",
    readTime: "8 min read",
    summary: "An essential advisory for condo buyers and sellers: navigating SB 4-D reserve studies, special assessment risks, and identifying which buildings are financially fortified.",
    keyTakeaways: [
      "Older coastal towers face major structural reserve requirements that differentiate healthy HOAs.",
      "Pre-construction and newer construction (post-2015) enjoy significant pricing premiums.",
      "How to audit building financials before putting down a non-refundable deposit."
    ],
    author: "Miguel Perez",
    img: U("photo-1486406146926-c627a92ad1ab", 1200)
  },
  {
    id: "art-3",
    title: "Pre-Construction vs. Resale: Strategic ROI Modeling in Sunny Isles & Edgewater",
    category: "Developments",
    date: "June 2026",
    readTime: "7 min read",
    summary: "Breaking down deposit schedules, developer reputations, construction milestones, and appreciation pacing for investors allocating capital into new South Florida towers.",
    keyTakeaways: [
      "Staggered 10-20% deposit schedules offer built-in financial leverage against inflation.",
      "Branded residences command 22-35% higher average daily rental rates.",
      "Key milestones where contracts can be assigned or refinanced."
    ],
    author: "Miguel Perez",
    img: U("photo-1545324418-cc1a3fa10c00", 1200)
  },
  {
    id: "art-4",
    title: "The Ultimate Neighborhood Guide: Miami Beach vs. Fort Lauderdale for Boaters",
    category: "Neighborhoods",
    date: "May 2026",
    readTime: "5 min read",
    summary: "Comparing bridge clearance, canal depths, ocean inlet accessibility, and price per linear foot of waterfront between Las Olas and Miami Beach islands.",
    keyTakeaways: [
      "Las Olas offers more linear dockage per dollar than Biscayne Bay island properties.",
      "Miami Beach offers faster access to government cut and offshore open Atlantic cruising.",
      "Understanding fixed bridges (17th St Causeway, Venetian, MacArthur) is critical for vessel clearance."
    ],
    author: "Miguel Perez",
    img: U("photo-1567899378494-47b22a2ae96a", 1200)
  },
  {
    id: "art-5",
    title: "Living in Fort Lauderdale: The Complete Relocation Playbook",
    category: "South Florida Lifestyle",
    date: "April 2026",
    readTime: "9 min read",
    summary: "From school districts and private yacht clubs to tax residency establishment and neighborhood vibes: everything new residents need to navigate their move.",
    keyTakeaways: [
      "Establishing Florida domicile: statutory residency rules and Homestead exemption.",
      "Top private schools in Broward and Miami-Dade with application calendars.",
      "The best micro-neighborhoods for walkability vs. quiet privacy."
    ],
    author: "Miguel Perez",
    img: U("photo-1512917774080-9991f1c4c750", 1200)
  }
];

export const AI_EXAMPLES = [
  "Waterfront home in Fort Lauderdale with a dock under $8M",
  "Oceanfront condo in Sunny Isles under $3M",
  "Private island property near Miami with deep water",
  "Luxury condo walkable to Brickell restaurants"
];

const CITY_MAP: [RegExp, string, 'miami' | 'ftl' | 'pb'][] = [
  [/fort lauderdale|ft lauderdale|las olas|tarpon/i, "Fort Lauderdale", "ftl"],
  [/palm beach gardens/i, "Palm Beach Gardens", "pb"],
  [/palm beach/i, "Palm Beach", "pb"],
  [/miami beach|la gorce/i, "Miami Beach", "miami"],
  [/sunny isles/i, "Sunny Isles Beach", "miami"],
  [/coconut grove/i, "Coconut Grove", "miami"],
  [/brickell|downtown miami/i, "Brickell", "miami"],
  [/edgewater/i, "Miami", "miami"],
  [/miami/i, "Miami", "miami"]
];

const FEATURES_REGEX: [RegExp, string][] = [
  [/waterfront|water front|on the water/i, "Waterfront"],
  [/ocean ?front|beach ?front/i, "Oceanfront"],
  [/dock|boat|yacht|no fixed bridge/i, "Private dock"],
  [/pool/i, "Pool"],
  [/ocean view|water view|views?/i, "Ocean views"],
  [/golf/i, "Golf"],
  [/island|key/i, "Private island"],
  [/walk|restaurant|dining|nightlife/i, "Walkable"],
  [/new construction|newly built|brand new/i, "New construction"],
  [/beach access/i, "Beach access"],
  [/luxury/i, "Luxury"],
  [/investment/i, "Investment"]
];

export function parseAiQuery(q: string): ParsedQuery {
  const f: ParsedQuery = {
    raw: q,
    city: null,
    area: null,
    beds: null,
    maxPrice: null,
    type: null,
    features: []
  };

  for (const [re, city, area] of CITY_MAP) {
    if (re.test(q)) {
      f.city = city;
      f.area = area;
      break;
    }
  }

  const bedsMatch = q.match(/(\d+)\s*(?:\+)?\s*(?:bed|bd|br|bedroom)/i);
  if (bedsMatch) {
    f.beds = parseInt(bedsMatch[1], 10);
  }

  let m = q.match(/(?:under|below|up to|max(?:imum)?|less than)?\s*\$?\s*(\d+(?:\.\d+)?)\s*(m|mm|million)\b/i);
  if (m) {
    f.maxPrice = parseFloat(m[1]) * 1e6;
  }
  if (!m) {
    m = q.match(/(?:under|below|up to|max(?:imum)?|less than)\s*\$?\s*(\d[\d,]{2,})\s*(k|thousand)?/i);
    if (m) {
      f.maxPrice = parseFloat(m[1].replace(/,/g, "")) * (m[2] ? 1e3 : 1);
    }
  }

  if (/\bcondo|apartment|flat|residence tower\b/i.test(q)) {
    f.type = "condo";
  }
  if (/\bhouse|home|estate|villa|single ?family\b/i.test(q) && !/condo/i.test(q)) {
    f.type = f.type || "house";
  }

  FEATURES_REGEX.forEach(([re, label]) => {
    if (re.test(q) && !f.features.includes(label)) {
      f.features.push(label);
    }
  });

  return f;
}

export function scoreProperty(p: Property, f: ParsedQuery): { score: number; hard: boolean } {
  let score = 0;
  let hard = true;

  if (f.city) {
    if (p.city === f.city) {
      score += 5;
    } else if (p.area === f.area) {
      score += 2;
    } else {
      hard = false;
    }
  }

  if (f.beds != null) {
    if (p.beds >= f.beds) {
      score += 3;
    } else {
      hard = false;
    }
  }

  if (f.maxPrice != null) {
    if (p.price <= f.maxPrice) {
      score += 3;
    } else {
      hard = false;
    }
  }

  if (f.type) {
    if (p.type === f.type) {
      score += 2;
    } else {
      score -= 1;
    }
  }

  f.features.forEach((tag) => {
    if (p.tags.includes(tag)) {
      score += 2;
    }
  });

  return { score, hard };
}

export function getAiTags(f: ParsedQuery): string[] {
  const tags: string[] = [];
  if (f.city) tags.push(f.city);
  if (f.beds != null) tags.push(`${f.beds}+ bed`);
  if (f.maxPrice != null) tags.push(`Under ${shortMoney(f.maxPrice)}`);
  if (f.type) tags.push(f.type === "condo" ? "Condominium" : "House");
  f.features.forEach((x) => tags.push(x));
  return tags.length ? tags : ["All South Florida"];
}

export function money(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

export function shortMoney(n: number): string {
  if (n >= 1e6) {
    const val = n / 1e6;
    return "$" + (val % 1 === 0 ? val.toFixed(0) : val.toFixed(2)).replace(/\.00$/, "") + "M";
  }
  return "$" + Math.round(n / 1e3) + "K";
}
