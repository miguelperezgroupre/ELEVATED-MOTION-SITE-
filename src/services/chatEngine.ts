// @ts-nocheck
// SFE Knowledge: deterministic local answer engine (no API keys, no network). Grounded in Miguel's MAP guide
// (26 neighborhoods) and the verified median figures in sources.md (data as of Oct 7, 2026). Never invents numbers.
import { DEVELOPMENTS } from '../data';
const PHONE = '786-460-1023';
const HANDOFF = 'Miguel can answer that directly: ' + PHONE + ' or DM MAP.';
const ASOF = 'Data as of Oct 7, 2026. Medians describe what sold, not what any given home is worth.';
const SRC = { RS: 'Redfin, trailing 3 mo., Sept 2026 update', RA: 'Redfin, 3 mo. through Aug 2026', TG: 'Realtor.com, Sept 2026' };
// [id, name, county, tagline, best, vibe, housing, water, condo, invest, transit, drive mins (Brickell, Downtown FTL, MIA, FLL), peer]
const H = [
['brickell','Brickell','Miami-Dade','Miami’s vertical downtown, built for walking','Walk-to-everything urban buyer|Lock-and-leave owner|Investor who wants a deep renter pool','Glass towers, sidewalk cafés and a financial district that spills into rooftop bars at dusk. Brickell City Centre, Mary Brickell Village and the free Metromover keep daily life on foot.','Almost entirely condos, from 1980s mid-rises to new full-service and branded towers, with a few single-family streets toward The Roads.','Bayfront towers on Brickell Bay Drive and Brickell Key face Biscayne Bay. You pay for the view here; private dockage is rare.','Wide age spread. Older bayfront buildings fall under Florida’s milestone-inspection and reserve rules, and new towers carry full-service dues. Read the SIRS and budget before you write an offer.','Renter demand is tied to the office core. Many buildings set minimum lease terms or restrict short stays, so confirm each building’s rules before you model income.','Metromover and Metrorail (Brickell station)','0,40,25,36','edgewater'],
['downtown','Downtown & Edgewater','Miami-Dade','The bayfront arts corridor, still being built','Buyer who wants new construction on the bay|Culture-first urbanite|Pre-construction investor','Downtown has Bayfront Park, the Kaseya Center, PAMM and Frost Science. Edgewater, just north, swaps office energy for bayfront towers, Margaret Pace Park and a quick hop to the Design District.','Mostly condos. New and pre-construction towers line the bay in Edgewater, with older mid-rises and low-rise pockets west of Biscayne Boulevard.','Direct Biscayne Bay frontage along Edgewater and the downtown waterfront. The view is the waterfront asset; boat slips are limited.','Lots of brand-new inventory, which puts milestone deadlines years out. Still read the developer budget and reserve plan, and expect dues to settle after the developer hands over control.','The tower pipeline means resale and rental units compete with each other. Buy for the view, the floor plan and the building’s quality, not just the address.','Metromover, Metrorail and Brightline at MiamiCentral','7,39,23,34','brickell'],
['southbeach','South Beach','Miami-Dade','Art Deco, the ocean and a 24-hour city','Second-home buyer who wants to walk to the ocean|Car-light beach lifestyle|Design and architecture lover','Pastel Art Deco on Ocean Drive and Collins, the Lincoln Road pedestrian mall, South Pointe Park at the tip. The core is lively and full of visitors; the streets around Flamingo Park and South of Fifth are quieter.','Mostly condos: Deco-era walk-ups, mid-century buildings and full-service oceanfront towers in South of Fifth. Single-family homes are rare.','The Atlantic on the east and Biscayne Bay on the west. The waterfront homes are on the islands off the MacArthur and Venetian causeways.','Many buildings are decades old, so milestone inspections, reserve funding and special assessments are live issues. Lenders review building health too, so ask early.','Miami Beach restricts short-term rentals in many residential districts. Check the zoning and the condo documents before you count on nightly income.','','15,46,30,42','midnorth'],
['midnorth','Mid-Beach & North Beach','Miami-Dade','Miami Beach at a slower tempo','Beach buyer who wants calm over nightlife|Boater on Indian Creek or the bay|Value seeker on the barrier island','Mid-Beach mixes grand hotels on Collins Avenue with leafy streets along Indian Creek. North Beach is more local, with North Beach Oceanside Park, Normandy Isles and a growing café scene.','Oceanfront and creekside condos, mid-century buildings and plenty of single-family homes on the bay side and the islands.','The ocean on one side and Indian Creek and Biscayne Bay on the other. Bayfront homes with docks line North Bay Road, La Gorce and Normandy Isles.','A large stock of mid-century buildings. Expect close scrutiny of inspection reports and reserves; well-funded buildings stand out.','A lower entry point than South Beach on the same island. Miami Beach’s short-term rental limits apply here too, so verify the zoning.','','22,45,33,40','southbeach'],
['grove','Coconut Grove','Miami-Dade','Banyans, sailboats and Miami’s oldest neighborhood','Buyer who wants trees, the bay and a village center|Sailor or paddler|Remote worker who wants space near the city','Canopied streets, CocoWalk and the Dinner Key marinas. Joggers on Bayshore Drive and a village feel about ten minutes from Brickell.','A real mix: bayfront high-rises on South Bayshore Drive, townhomes, and single-family homes ranging from historic cottages to new modern builds on lush lots.','Biscayne Bay frontage, the Dinner Key marinas and sailing clubs. Some gated bayfront enclaves have private docks.','The bayfront towers span several decades. Compare reserve funding and recent assessments building by building.','Land is scarce, and city tree and neighborhood-conservation rules shape what gets built. Demand leans toward people buying to live here.','Metrorail (Coconut Grove station)','11,47,26,42','gables'],
['gables','Coral Gables','Miami-Dade','The City Beautiful, by design','Buyer who values architecture and order|Boater on the southern Gables canals|Professional near the university and medical corridors','Mediterranean Revival streets, banyan-lined boulevards, Miracle Mile, the Biltmore and the Venetian Pool. Strict design review keeps the look intact.','Mostly single-family, from 1920s originals to estates, with condos and new mid-rises around downtown Gables.','Southern communities such as Cocoplum and Gables Estates sit on canals with access to the bay.','Condos cluster downtown. Many are newer, but older mid-rises still need a milestone and SIRS review.','Steady demand from people buying to live here. Rental income works best in downtown condos near offices and the university.','Metrorail (Douglas Road and University stations)','12,47,20,42','grove'],
['key','Key Biscayne','Miami-Dade','An island village, one causeway from Brickell','Buyer who wants a quieter island routine|Beach-and-bike lifestyle|Boater and sailor','Crandon Park, Bill Baggs Cape Florida State Park and a small village center. Bikes and golf carts, with the ocean on one side and the bay on the other.','Oceanfront condos dominate the east side. Single-family homes fill the village interior and the bayfront streets.','Atlantic beach plus bayfront canals. The Rickenbacker Causeway is the only road to the mainland.','Much of the oceanfront stock dates from the 1960s to the 1980s. Inspection findings and reserve funding vary widely, so budget for them.','Supply is limited on a small island and buyers pay for that scarcity. Price out flood and wind insurance early.','','17,53,37,48','grove'],
['wynwood','Wynwood, Midtown & Design District','Miami-Dade','Murals, galleries and flagship stores, block by block','Creative-district buyer|Walk-and-dine urbanite|Buyer who wants a newer, smaller condo','Wynwood is street art, breweries and galleries. Midtown adds everyday shopping. The Design District brings flagship fashion, ICA Miami and public art.','Mostly newer condos and boutique mid-rises, plus historic homes and townhomes nearby in Buena Vista.','Inland, with no waterfront. The bay is a short drive east.','Most buildings are newer, so milestone deadlines are further off. Check the dues, the rental rules and any construction next door.','Some newer buildings here were planned with flexible rental policies. Confirm each building’s rules in writing; never assume.','','9,36,21,31','downtown'],
['sunny','Sunny Isles Beach','Miami-Dade','Oceanfront towers, full service','Lock-and-leave oceanfront buyer|Seasonal owner who wants amenities|Buyer who wants a beach routine over nightlife','A narrow strip of high-rises between the ocean and the Intracoastal, with beach service, Heritage Park and a resort-like pace.','Mostly condos: older buildings from the 1970s through the 1990s alongside ultra-tall branded towers. Most single-family homes are in Golden Shores.','Oceanfront on the east. Intracoastal-facing buildings and the Golden Shores homes are on the west.','Two markets in one: new towers with high dues and full amenities, and older buildings where reserve funding and assessments drive price.','There’s plenty of rental supply. Buy for building quality and rules; many towers set minimum lease terms.','','30,30,42,25','aventura'],
['aventura','Aventura','Miami-Dade','Mall, marinas and a train station','Buyer who wants errands, gym and dinner minutes away|Commuter to both Miami and Fort Lauderdale|Value-focused condo buyer','Aventura Mall, Founders Park, the Don Soffer Exercise Trail around Turnberry, and a Brightline station with trains to Miami and Fort Lauderdale.','Mostly condos on the Intracoastal and canals, many from the 1970s through the 1990s, plus gated townhome and single-family pockets.','Waterfront towers on the Intracoastal and Dumfoundling Bay. Williams Island has marina access.','Many buildings are on the same milestone and reserve timeline, so assessments come up often. Ask what’s approved and what’s pending.','The median sits below nearby beach markets, and Brightline widens the renter pool. Check each association’s lease rules.','Brightline Aventura station','29,24,40,20','sunny'],
['balharbour','Bal Harbour & Surfside','Miami-Dade','Small villages, big ocean','Buyer who wants the beach at village scale|Full-service condo buyer|Walk-to-the-beach homeowner','Bal Harbour has Bal Harbour Shops, a beach path along the dune and a gated residential section. Surfside, next door, keeps a low-rise main street on Harding Avenue.','Bal Harbour is mostly oceanfront condos plus a gated single-family section. Surfside mixes oceanfront condos with a grid of single-family homes.','Atlantic frontage, plus bayfront and canal homes on the bay side of both villages.','Florida’s condo-safety reforms began here, after the 2021 Champlain Towers South collapse in Surfside. Expect detailed due diligence on every building, old or new.','Scarce, low-density supply supports demand from people buying to live here. Rental rules vary by building and village.','','28,39,39,34','sunny'],
['pinecrest','Pinecrest','Miami-Dade','Big lots, big trees, quiet streets','Buyer who wants land, a pool and privacy|Remote worker who wants space|Gardener','A village of large, leafy lots and Pinecrest Gardens, close to US-1 shopping and Dadeland.','Mostly single-family, often on large lots, from mid-century ranches to new modern estates.','Mostly inland, with a limited number of canal-front homes.','Condos are scarce, so the condo-law questions rarely apply. Focus on roof age, insurance and flood zone instead.','A market of people buying to live here. The value is in land and renovation, not rental yield.','Metrorail at Dadeland','22,58,23,53','gables'],
['doral','Doral','Miami-Dade','Business, golf and newer communities next to MIA','Frequent flyer|Buyer who wants newer construction with amenities|Business owner near logistics and corporate offices','Corporate campuses, CityPlace Doral and Downtown Doral, golf at Trump National Doral, and the shortest drive to MIA in the MAP guide.','Newer townhomes, gated single-family communities and mid-rise condos, much of it built in recent decades.','Lakes inside the planned communities. No ocean or bay access.','Many associations are fairly new. Still check HOA budgets, special assessments and lease rules.','Steady demand from people who work nearby. Rental rules differ by HOA.','','26,50,16,44','weston'],
['lasolas','Las Olas & Downtown Fort Lauderdale','Broward','The boulevard, the river and the Isles','Walk-to-dinner downtown buyer|Boater who wants deep water near downtown|Brightline commuter','Las Olas Boulevard’s shops and restaurants, the Riverwalk along the New River, and Brightline’s Fort Lauderdale station steps from the downtown towers.','Downtown condos and new towers along the river. The Las Olas Isles are single-family waterfront homes on finger islands.','The Isles have deep-water canal frontage with ocean access. Downtown towers overlook the New River.','A mix of new towers and older mid-rises. Compare reserves and insurance costs closely.','Fort Lauderdale requires vacation rentals to register with the city. Check city rules and HOA limits before planning short stays.','Brightline Fort Lauderdale station','40,2,52,14','victoria'],
['ftlbeach','Fort Lauderdale Beach & Galt Ocean Mile','Broward','Oceanfront with a local pulse','Ocean-view condo buyer|Runner or cyclist on A1A|Seasonal owner','The A1A promenade near Las Olas Beach, then north to the quieter Galt Ocean Mile, a long row of oceanfront condos with its own neighborhood shops.','Mostly condos, from older oceanfront high-rises on the Galt to new full-service towers near the beach center, plus some homes and townhomes on the Intracoastal side.','Atlantic beachfront, with Intracoastal canals and dockage just west of A1A.','Much of the Galt’s oceanfront stock dates from the 1960s to the 1980s. Milestone reports and reserve-driven assessments are central to pricing.','Seasonal demand is real. City vacation-rental registration and building rules decide what’s possible.','','50,14,62,25','hollywood'],
['victoria','Victoria Park','Broward','Historic streets, minutes from everything','Buyer who wants a house near downtown|Walker and cyclist|Fan of modern townhomes on established streets','Tree-lined streets between downtown and the beach, close to Holiday Park and Las Olas, where older cottages sit next to new contemporary builds.','Single-family homes and modern townhomes, with small condo buildings scattered throughout.','Mostly inland, with some homes on canals and waterways at the edges.','Small, older condo buildings can mean big per-unit assessments. Get the reports.','Townhome demand holds up because downtown is so close. Check zoning before any redevelopment plan.','','43,5,54,17','lasolas'],
['riovista','Rio Vista & Tarpon River','Broward','River lots and old-Florida character','Boater who wants to live close to downtown|Buyer who wants a historic house|Value seeker one bridge from Las Olas','Rio Vista’s shaded streets and riverfront estates sit just south of Las Olas. Tarpon River, along the river of the same name, is quieter and more mixed.','Mostly single-family: large waterfront homes in Rio Vista, and smaller houses, duplexes and small condo buildings in Tarpon River.','New River, Tarpon River and Intracoastal frontage, with deep-water dockage on many Rio Vista lots.','Condos are limited. The bigger due-diligence items are seawalls, docks and flood zones.','Rio Vista is a waterfront market of people buying to live here. Tarpon River offers lower entry points near downtown.','','39,4,50,13','victoria'],
['wilton','Wilton Manors','Broward','The Island City','Buyer who wants a walkable main street|Paddler and river lover|Mid-century home fan','Wrapped by the Middle River, with Wilton Drive’s restaurants, bars and events as the social spine. It has a compact, walkable small-city layout.','Mostly single-family (mid-century ranches, renovated cottages and riverfront homes), plus townhomes and small condos.','Middle River frontage on many streets. Boaters should check bridge clearances.','Small, low-rise associations are common. Ask for the budget, reserve balance and insurance details.','Steady demand from buyers who want to be near Fort Lauderdale without downtown prices. Check city rental rules.','','46,10,57,21','victoria'],
['hollywood','Hollywood Beach','Broward','The Broadwalk life','Beach buyer who wants a relaxed, local scene|Cyclist and runner|Second-home buyer between two airports','The Broadwalk, a paved oceanfront promenade lined with cafés, sets the pace. Casual, active and easy.','Oceanfront condos and towers, older low-rise buildings, and single-family homes on the Intracoastal side and in Hollywood Lakes.','Atlantic beach, with the Intracoastal and North Lake on the west.','A mix of older buildings and new towers. Older buildings may be mid-cycle on inspections and assessments.','Easy reach to FLL keeps seasonal demand steady. Hollywood has its own vacation-rental rules, so check them.','','36,23,47,19','ftlbeach'],
['weston','Weston','Broward','Planned community at the edge of the Everglades','Buyer who wants space, parks and order|Remote worker who wants a home office|Cyclist on wide, planned roads','A master-planned city of lakes, landscaped boulevards and parks at Broward’s western edge, along the Everglades.','Single-family homes and townhomes in HOA communities. Some are gated, and many sit around lakes.','Lakes throughout. No ocean or bay access.','More HOA than condo. Read the HOA rules and fees, and check for a master-association layer.','A market of people buying to live here. Rentals work, but HOA leasing rules can be strict.','','52,38,43,34','parkland'],
['parkland','Parkland','Broward','Low density, large lots, north Broward','Buyer who wants a large lot and newer construction|Remote worker who wants space|Buyer who prefers quiet over nightlife','Low-density, park-filled and residential, a short drive from Boca Raton’s shopping and dining.','Mostly single-family, much of it newer construction in gated communities.','Lakes within communities. Inland.','Few condos. HOA due diligence and roof and insurance questions matter more.','A market of people buying to live here. Resale demand centers on newer homes and lot size.','','61,36,59,41','weston'],
['wpb','West Palm Beach','Palm Beach','A waterfront city with momentum','Downtown condo buyer|Brightline commuter to Boca, Fort Lauderdale or Miami|Buyer who wants a historic house near downtown','Clematis Street, The Square, the Kravis Center and the Norton Museum, with Flagler Drive’s waterfront path along the Intracoastal.','Downtown condos and new towers, historic single-family neighborhoods such as El Cid and Flamingo Park, and a wide range of suburban homes to the west.','Lake Worth Lagoon frontage along Flagler Drive, with bridges across to Palm Beach island.','Downtown mixes new towers with older buildings, and reserve funding varies widely.','Office growth and Brightline support downtown rental demand. Confirm each building’s lease rules.','Brightline West Palm Beach station','89,59,101,64','palmbeach'],
['palmbeach','Palm Beach','Palm Beach','The island, on its own terms','Estate buyer who wants privacy|Seasonal owner who wants a walkable town|Architecture collector','Worth Avenue, The Breakers, the Lake Trail along the Intracoastal, and Mizner-era architecture under strict town review.','Estates and single-family homes, with condos and co-ops concentrated in midtown and the south end of the island.','The ocean to the east and Lake Worth Lagoon to the west, with oceanfront and lakefront estates.','Many co-ops and older condos have board approval processes and financing limits. Plan time for the review.','Mostly a seasonal market of people buying to live here. Town and building rental rules are restrictive, so verify them before you buy.','','90,60,102,65','wpb'],
['boca','Boca Raton','Palm Beach','Polished, planned and close to everything','Buyer who wants a club lifestyle|Commuter by Brightline or I-95|Beach-and-downtown buyer','Mizner Park, a well-kept downtown, public beaches and parks along A1A, and country clubs to the west.','A bit of everything: beachfront and downtown condos, golf and country-club communities, and waterfront homes in the east.','Ocean beaches, the Intracoastal and Lake Boca Raton, with deep-water canal communities east of US-1.','Many condos are in older buildings and club communities. Read inspection, reserve and club-fee obligations together.','A broad buyer pool and a downtown Brightline station. Many clubs and HOAs limit leasing.','Brightline Boca Raton station','59,29,71,34','delray'],
['delray','Delray Beach','Palm Beach','A main street that runs to the sea','Walk-to-dinner beach buyer|Buyer who wants a small-town downtown|Golf and tennis player','Atlantic Avenue runs from downtown straight to the beach, with restaurants, galleries and an easy, social energy.','Single-family homes and townhomes near downtown, beachside condos, and large community developments to the west.','Ocean beach, with Intracoastal waterfront homes east of US-1.','A mix of new downtown buildings and older beachside and community associations. Compare reserves closely.','Downtown demand is strong. Check city rules before any short-term rental plan.','','67,37,78,42','boca'],
['jupiter','Jupiter','Palm Beach','Inlet, river and a boating town','Boater and angler|Buyer who wants beaches without a high-rise skyline|Golfer','The Jupiter Inlet Lighthouse, the Loxahatchee River, sandbars and beaches, plus spring training at Roger Dean Chevrolet Stadium.','Mostly single-family, from river and Intracoastal homes to golf communities, with condos and townhomes in between.','Inlet access to the ocean, the Loxahatchee River and the Intracoastal.','Many associations are low-rise. For buildings of three or more stories, ask for the milestone report and SIRS.','Seasonal demand, and HOA leasing rules vary.','','108,78,117,83','palmbeach'],
].map((a) => ({ id: a[0], name: a[1], county: a[2], tag: a[3], best: a[4].split('|'), vibe: a[5], homes: a[6], water: a[7], condo: a[8], invest: a[9], transit: a[10], drive: a[11].split(',').map(Number), peer: a[12] }));
const HOOD = Object.fromEntries(H.map((h) => [h.id, h]));
// Verified figures: [rowId, hoodId, area, median sale price, median $/sq ft, source code, note]
const R = [
['brickell','brickell','Brickell','$660K','$585','RS',''],
['dtmia','downtown','Downtown Miami','$580K','$589','RA',''],
['edgewater','downtown','Edgewater','$548K','$588','RS',''],
['sobe','southbeach','South Beach (ZIP 33139)','$490K','$897','RA','ZIP-level figure used as a proxy for South Beach'],
['midbeach','midnorth','Mid-Beach','$795K','$553','RA',''],
['northbeach','midnorth','North Beach','$405K','$532','RA',''],
['grove','grove','Coconut Grove','$1.87M','$1.15K','RS',''],
['gables','gables','Coral Gables','$1.4M','$819','RA',''],
['key','key','Key Biscayne','$1.5M','$958','RA',''],
['wynwood','wynwood','Wynwood','$676K','$591','RS',''],
['midtown','wynwood','Midtown Miami','$625K','$588','RA',''],
['sunny','sunny','Sunny Isles Beach','$680K','$433','RA',''],
['aventura','aventura','Aventura','$450K','$333','RA',''],
['balharbour','balharbour','Bal Harbour','$1.6M','$1.06K','RA',''],
['surfside','balharbour','Surfside','$1.4M','$975','RA',''],
['pinecrest','pinecrest','Pinecrest','$2.4M','$887','RA',''],
['doral','doral','Doral','$617K','$362','RA',''],
['dtftl','lasolas','Downtown Fort Lauderdale','$645K','$461','RA',''],
['olasisles','lasolas','Las Olas Isles','$5.2M','$1.1K','RA','small sample: 11 homes sold in Aug 2026'],
['ftlbeach','ftlbeach','Lauderdale Beach','$675K','$472','RA',''],
['galt','ftlbeach','Galt Mile','$651K','$433','TG','median sold price'],
['victoria','victoria','Victoria Park','$915K','$445','RA',''],
['riovista','riovista','Rio Vista','$2.2M','$744','RA','small sample: 14 homes sold in Aug 2026'],
['tarpon','riovista','Tarpon River','$595K','$341','RA',''],
['wilton','wilton','Wilton Manors','$620K','$368','RA',''],
['hollywood','hollywood','Hollywood Beach','$450K','$393','RA',''],
['weston','weston','Weston','$814K','$392','RA',''],
['parkland','parkland','Parkland','$1.2M','$357','RA',''],
['wpb','wpb','West Palm Beach (citywide)','$450K','$300','RA','citywide figure includes western suburbs; downtown and historic districts differ'],
['palmbeach','palmbeach','Palm Beach','$2.8M','$1.67K','RA',''],
['boca','boca','Boca Raton','$854K','$475','RA',''],
['delray','delray','Delray Beach','$507K','$377','RA',''],
['jupiter','jupiter','Jupiter','$735K','$386','RA',''],
].map((a) => ({ id: a[0], hood: a[1], area: a[2], median: a[3], ppsf: a[4], src: a[5], note: a[6] }));
const ROW = Object.fromEntries(R.map((r) => [r.id, r]));
const GROUPS = {
  miami: { name: 'Miami', rows: ['brickell', 'edgewater', 'dtmia', 'grove', 'gables'] },
  miamibeach: { name: 'Miami Beach', rows: ['sobe', 'midbeach', 'northbeach'] },
  ftl: { name: 'Fort Lauderdale', rows: ['dtftl', 'victoria', 'tarpon', 'ftlbeach', 'galt', 'wilton'] },
  pbc: { name: 'Palm Beach County', rows: ['palmbeach', 'wpb', 'boca', 'delray', 'jupiter'] },
  sofla: { name: 'South Florida', rows: ['brickell', 'edgewater', 'dtftl', 'ftlbeach', 'palmbeach', 'wpb'] },
};
// alias -> place. h: hood, r: row, g: group, x: known area we do not cover
const A = 'h:brickell=brickell|brickell key|the roads;r:dtmia=downtown miami|downtown|bayfront park;r:edgewater=edgewater|margaret pace;r:sobe=south beach|sobe|south of fifth|sofi|33139|ocean drive|lincoln road|star island|palm island|hibiscus island|venetian islands;r:midbeach=mid beach;r:northbeach=north beach|normandy isles;h:midnorth=la gorce|north bay road|indian creek;h:grove=coconut grove|coco grove|the grove|cocowalk;h:gables=coral gables|the gables|gables|miracle mile|cocoplum;h:key=key biscayne;r:wynwood=wynwood;r:midtown=midtown|midtown miami;h:wynwood=design district|buena vista;h:sunny=sunny isles|sunny isles beach|golden shores;h:aventura=aventura|turnberry|williams island;r:balharbour=bal harbour|bal harbor;r:surfside=surfside;h:pinecrest=pinecrest;h:doral=doral;r:dtftl=downtown fort lauderdale|downtown ft lauderdale|downtown ftl|downtown lauderdale|flagler village|riverwalk;h:lasolas=las olas|las olas boulevard|las olas blvd;r:olasisles=las olas isles|the isles;h:ftlbeach=fort lauderdale beach|ft lauderdale beach|lauderdale beach|ftl beach|las olas beach;r:galt=galt ocean mile|galt mile|galt;h:victoria=victoria park;r:riovista=rio vista;r:tarpon=tarpon river|tarpon;h:wilton=wilton manors|wilton drive|wilton|island city;h:hollywood=hollywood beach|hollywood|broadwalk;h:weston=weston;h:parkland=parkland;h:wpb=west palm beach|west palm|wpb|clematis;h:palmbeach=palm beach island|town of palm beach|palm beach|worth avenue;h:boca=boca raton|boca;h:delray=delray beach|delray;h:jupiter=jupiter;g:miami=miami|city of miami|miami dade;g:miamibeach=miami beach;g:ftl=fort lauderdale|ft lauderdale|ftl|lauderdale|broward;g:pbc=palm beach county|the palm beaches;g:sofla=south florida|sofla|tri county;x:other=kendall|homestead|hialeah|miami lakes|miami gardens|north miami|north miami beach|miami shores|little havana|little haiti|allapattah|overtown|palmetto bay|cutler bay|south miami|westchester|miami springs|fisher island|bay harbor islands|bay harbor|north bay village|golden beach|hallandale beach|hallandale|dania beach|pembroke pines|miramar|plantation|sunrise|davie|cooper city|coral springs|pompano beach|lighthouse point|deerfield beach|lauderdale by the sea|oakland park|lake worth|wellington|boynton beach|palm beach gardens|juno beach|tequesta|naples|orlando|tampa|key west|fort myers|sarasota';
const norm = (s) => (' ' + String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/single[\s-]?family/g, 'singlefamily').replace(/ft\./g, 'ft').replace(/[^a-z0-9$]+/g, ' ').replace(/\s+/g, ' ').trim() + ' ');
const sq = (s) => s.replace(/\s+/g, '');
const ALIASES = [];
A.split(';').forEach((part) => {
  const [k, list] = part.split('=');
  const [t, id] = k.split(':');
  list.split('|').forEach((al) => { const n = norm(al).trim(); ALIASES.push({ t, id, n, s: sq(n), w: n.split(' ').length, label: al }); });
});
function lev(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 9;
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
  }
  return d[a.length][b.length];
}
const STOP = new Set('the a an in on of and or vs to is it me about what whats how like for my best area areas live living near more tell compare between versus market'.split(' '));
function findPlaces(q) {
  const toks = q.trim().split(' ');
  const hits = [];
  for (let size = 4; size >= 1; size--) for (let i = 0; i + size <= toks.length; i++) {
    const win = toks.slice(i, i + size);
    if (size === 1 && STOP.has(win[0])) continue;
    const ws = win.join('');
    for (const al of ALIASES) {
      let score = -1;
      if (ws === al.s) score = 100;
      else if (al.s.length >= 6 && ws.length >= 5) { const e = lev(ws, al.s); if (e <= (al.s.length >= 9 ? 2 : 1)) score = 90 - e * 10; }
      if (score > 0) hits.push({ i, size, score: score + al.s.length / 100, al });
    }
  }
  hits.sort((a, b) => b.al.s.length - a.al.s.length || b.score - a.score);
  const used = new Set(), out = [];
  for (const h of hits) {
    let free = true;
    for (let k = h.i; k < h.i + h.size; k++) if (used.has(k)) free = false;
    if (!free) continue;
    for (let k = h.i; k < h.i + h.size; k++) used.add(k);
    const key = h.al.t + ':' + h.al.id;
    if (!out.some((o) => o.key === key)) out.push({ key, t: h.al.t, id: h.al.id, at: h.i, label: h.al.label });
  }
  return out.sort((a, b) => a.at - b.at);
}
const placeName = (p) => p.t === 'r' ? ROW[p.id].area.replace(' (citywide)', '').replace(' (ZIP 33139)', '') : p.t === 'h' ? short(HOOD[p.id]) : p.t === 'g' ? GROUPS[p.id].name : p.label.replace(/\b\w/g, (c) => c.toUpperCase());
const hoodOf = (p) => p.t === 'r' ? HOOD[ROW[p.id].hood] : p.t === 'h' ? HOOD[p.id] : null;
const rowsOf = (p) => p.t === 'r' ? [ROW[p.id]] : p.t === 'h' ? R.filter((r) => r.hood === p.id) : p.t === 'g' ? GROUPS[p.id].rows.map((id) => ROW[id]) : [];
const fig = (r) => `${r.area}: ${r.median} median sale · ${r.ppsf}/sq ft (${SRC[r.src]}${r.note ? '; ' + r.note : ''})`;
const first = (s) => (s.match(/^.*?[.!?](\s|$)/) || [s])[0].trim();
const num = (v) => { const m = String(v).match(/([\d.]+)\s*([KM]?)/); if (!m) return 0; return parseFloat(m[1]) * (m[2] === 'M' ? 1e6 : m[2] === 'K' ? 1e3 : 1); };
const has = (q, re) => re.test(q);
const say = (text, chips = []) => ({ text, chips: chips.slice(0, 4) });
const SUGGESTED = ['Tell me about Tarpon River', 'What is Las Olas like?', 'Compare Brickell vs Edgewater', 'What is the Miami market doing?'];
const short = (h) => h.id === 'downtown' ? 'Downtown Miami' : h.name.split(/ & |, /)[0];
const peerName = (h) => HOOD[h.peer] ? short(HOOD[h.peer]) : 'Brickell';
const homes = (h) => h.homes.length > 170 ? first(h.homes) : h.homes;

function profile(p) {
  if (p.t === 'g') return groupMarket(p);
  const h = hoodOf(p), nm = placeName(p);
  const lines = [`**${p.t === 'h' ? h.name : nm}** · ${h.county}${p.t === 'r' && h.name !== nm ? ` (part of the ${h.name} profile)` : ''}`, `${h.tag}. ${h.vibe}`, `• Homes: ${h.homes}`, `• Water: ${first(h.water)}`];
  rowsOf(p).forEach((r) => lines.push('• ' + fig(r)));
  lines.push(`• Best for: ${h.best.join('; ')}`);
  lines.push(ASOF);
  return say(lines.join('\n'), [`Condo notes for ${nm}`, `Commute from ${nm}`, `Compare ${nm} vs ${p.id === 'tarpon' ? 'Victoria Park' : p.id === 'riovista' ? 'Tarpon River' : peerName(h)}`, `Investing in ${nm}`]);
}
function groupMarket(p) {
  const g = GROUPS[p.id];
  const rows = g.rows.map((id) => ROW[id]);
  const lines = [`**${g.name}: what the verified data shows**`, 'I don’t make price forecasts or publish one blended citywide number. Here are recent sold medians for core neighborhoods:'];
  rows.forEach((r) => lines.push('• ' + fig(r)));
  if (p.id === 'miami') lines.push('The condo-heavy core (Brickell, Downtown, Edgewater) sits in a tight $585–$589/sq ft band; Coconut Grove and Coral Gables trade far higher per foot.');
  lines.push('For live condo activity, see the Condo Market Dashboard on the Insights page (Miami REALTORS® MLS via Bridge Interactive).');
  lines.push(ASOF);
  const chips = p.id === 'miami' ? ['Compare Brickell vs Edgewater', 'Tell me about Coconut Grove', 'Fort Lauderdale market update', 'Condo rules in Florida'] : p.id === 'ftl' ? ['Tell me about Tarpon River', 'What is Las Olas like?', 'Compare Victoria Park vs Tarpon River', 'What is the Miami market doing?'] : ['What is the Miami market doing?', 'Fort Lauderdale market update', 'Tell me about Palm Beach', 'Get the MAP guide'];
  return say(lines.join('\n'), chips);
}
function compare(a, b) {
  if (a.t === 'g' || b.t === 'g') {
    const lines = [`**${placeName(a)} vs ${placeName(b)}**`, 'I don’t publish blended citywide medians, so here are verified neighborhood figures side by side:'];
    [a, b].forEach((p) => rowsOf(p).slice(0, 3).forEach((r) => lines.push('• ' + fig(r))));
    lines.push(ASOF);
    return say(lines.join('\n'), [`Tell me about ${placeName(a)}`, `Tell me about ${placeName(b)}`, 'Get the MAP guide']);
  }
  const ha = hoodOf(a), hb = hoodOf(b), na = placeName(a), nb = placeName(b);
  const ra = rowsOf(a), rb = rowsOf(b);
  const lines = [`**${na} vs ${nb}**`];
  ra.forEach((r) => lines.push('• ' + fig(r)));
  rb.forEach((r) => lines.push('• ' + fig(r)));
  if (ra.length === 1 && rb.length === 1) {
    const [x, y] = [ra[0], rb[0]];
    const mx = num(x.median), my = num(y.median), px = num(x.ppsf), py = num(y.ppsf);
    const cheaper = mx < my ? x : y, pricier = mx < my ? y : x;
    let s = `${cheaper.area.replace(' (citywide)', '')} has the lower median sale price (${cheaper.median} vs ${pricier.median})`;
    s += Math.abs(px - py) / Math.max(px, py) < 0.03 ? `, while median $/sq ft is nearly identical (${x.ppsf} vs ${y.ppsf}).` : `; median $/sq ft is ${x.ppsf} vs ${y.ppsf}.`;
    lines.push(s);
  }
  if (ha.id !== hb.id) {
    lines.push(`• Feel: ${na}: ${ha.tag}. ${nb}: ${hb.tag}.`);
    lines.push(`• Homes: ${na}: ${homes(ha)} ${nb}: ${homes(hb)}`);
    lines.push(`• Best for: ${na}: ${ha.best[0]}. ${nb}: ${hb.best[0]}.`);
  } else {
    lines.push(`Both sit in the MAP guide’s ${ha.name} profile: ${ha.vibe}`);
  }
  lines.push(ASOF);
  return say(lines.join('\n'), [`Tell me about ${na}`, `Tell me about ${nb}`, `Condo notes for ${na}`, 'Get the MAP guide']);
}
function aspect(p, kind) {
  if (p.t === 'g') return groupMarket(p);
  const h = hoodOf(p), nm = placeName(p);
  if (kind === 'condo') return say(`**Condo notes: ${nm}**\n${h.condo}\nGeneral information, not legal advice. Have a Florida real estate attorney review the condo documents.`, ['Condo rules in Florida', `Tell me about ${nm}`, `Investing in ${nm}`]);
  if (kind === 'invest') return say(`**Investing in ${nm}**\n${h.invest}\n${rowsOf(p).map((r) => '• ' + fig(r)).join('\n')}\nI don’t quote yields or projected returns; rents and rules vary building by building.`, [`Condo notes for ${nm}`, 'How should I think about investing?', 'Talk to Miguel']);
  if (kind === 'water') return say(`**Waterfront in ${nm}**\n${h.water}\n${rowsOf(p).map((r) => '• ' + fig(r)).join('\n')}`, [`Tell me about ${nm}`, 'Flood insurance basics', `Compare ${nm} vs ${peerName(h)}`]);
  if (kind === 'commute') {
    const d = h.drive;
    const m = (x) => x < 5 ? 'under 5 min' : `~${Math.round(x / 5) * 5} min`;
    return say(`**Drive times from ${nm}** (free-flow estimates, no traffic; OSRM, Oct 7, 2026)\n• Brickell: ${m(d[0])}\n• Downtown Fort Lauderdale: ${m(d[1])}\n• MIA: ${m(d[2])} · FLL: ${m(d[3])}${h.transit ? '\n• Transit: ' + h.transit : ''}\nRush hour can easily double these.`, [`Tell me about ${nm}`, 'Relocating to South Florida', `Compare ${nm} vs ${peerName(h)}`]);
  }
  if (kind === 'market') {
    return say(`**${nm}: verified figures**\n${rowsOf(p).map((r) => '• ' + fig(r)).join('\n')}\nI don’t forecast prices. For live condo activity, see the dashboard on the Insights page (Miami REALTORS® MLS via Bridge Interactive).\n${ASOF}`, [`Tell me about ${nm}`, `Compare ${nm} vs ${peerName(h)}`, 'What is the Miami market doing?']);
  }
  return profile(p);
}
const T = {
  fair: /\b(school|schools|school district|safe|safest|safety|crime|crimes|criminal|dangerous|sketchy|demographic|demographics|diverse|diversity|ethnic|race|racial|hispanic|latino|latin|jewish|black|asian|white people|religion|religious|church|synagogue|mosque|lgbt|lgbtq|gay|who lives|kind of people|type of people|family friendly|kid friendly|families|family|kids|children|retirees|seniors|young professionals|singles)\b/,
  condo: /\b(condo|condos|condominium|hoa|association|milestone|sirs|reserve|reserves|special assessment|assessments|assessment|40 year|recertification|surfside law|co op|coop|condo docs|bylaws)\b/,
  invest: /\b(invest|investing|investment|investor|rental|rentals|rent out|airbnb|short term|str|yield|roi|cap rate|cash flow|cashflow|1031|return|returns|vacation rental)\b/,
  water: /\b(waterfront|water front|boat|boating|dock|docks|dockage|marina|ocean access|deep water|canal|bayfront|oceanfront)\b/,
  commute: /\b(commute|commuting|drive|driving|traffic|airport|mia|fll|pbi|brightline|metrorail|metromover|transit|train|how far|distance)\b/,
  market: /\b(market|markets|price|prices|pricing|median|medians|cost|expensive|cheap|affordable|value|values|trend|trends|doing|update|stats|statistics|data|ppsf|per square|sq ft|sqft|appreciation|forecast|predict|prediction|crash|bubble|going up|go up|go down|hot|cooling|inventory|days on market)\b/,
  forecast: /\b(forecast|predict|prediction|crash|bubble|going up|go up|go down|will prices|next year|in 2027|future prices)\b/,
  precon: /\b(pre construction|preconstruction|precon|pre con|new development|new developments|development|developments|new construction|branded|deposit|deposits|reservation|developer|towers coming|launch)\b/,
  buy: /\b(buy|buying|buyer|buyers|purchase|purchasing|first time|offer|pre approval|preapproval|pre approved|mortgage|down payment|home search)\b/,
  sell: /\b(sell|selling|seller|sellers|list my|listing my|worth|valuation|home value|appraise|cma|put my home)\b/,
  relocate: /\b(relocate|relocating|relocation|moving to|move to|moving from|moving down|new to|where should i live|which neighborhood|which area|neighborhood for me|transfer)\b/,
  insurance: /\b(insurance|flood|flood zone|hurricane|wind mitigation|elevation certificate|storm)\b/,
  tax: /\b(tax|taxes|homestead|property tax|income tax|save our homes)\b/,
  rates: /\b(interest rate|interest rates|rates|mortgage rate|mortgage rates|apr)\b/,
  closing: /\b(closing cost|closing costs|title insurance|doc stamps|closing fees)\b/,
  listings: /\b(listing|listings|for sale|homes available|show me homes|show me condos|available homes|mls search|active listings)\b/,
  contact: /\b(contact|call|phone|number|email|reach|talk to|speak to|speak with|schedule|appointment|meet|consultation|agent|realtor|text)\b/,
  map: /\b(map guide|the map|buyer map|guide|pdf|download|dm map|lead magnet|playbook)\b/,
  who: /\b(who is miguel|about miguel|miguel perez|who are you|what are you|what can you do|help|how does this work|bot|assistant)\b/,
  cover: /\b(which neighborhoods|what neighborhoods|what areas|which areas|list of neighborhoods|areas do you cover|neighborhoods do you cover|all neighborhoods|26 neighborhoods)\b/,
  greet: /^\s*(hi|hello|hey|hola|good morning|good afternoon|good evening|yo|howdy|greetings)\b/,
  thanks: /\b(thanks|thank you|thx|ty|gracias|appreciate it|appreciated|perfect|great|awesome|cool)\b/,
  about: /\b(tell me about|what is .+ like|whats .+ like|how is .+ to live|living in|life in|vibe|overview)\b/,
  off: /\b(weather|forecast for tomorrow|rain|sports|game|score|recipe|cook|movie|music|song|joke|stock|stocks|bitcoin|crypto|politics|election|president|news|translate|homework|math)\b/,
  vs: /\b(vs|versus|compare|comparison|compared|difference|differences|better|or)\b/,
  there: /\b(there|it|that area|this area|that neighborhood|this neighborhood|same area)\b/,
  realestate: /\b(home|homes|house|houses|property|properties|real estate|condo|apartment|townhome|rent|lease|closing|inspection|appraisal|escrow|title|hoa|agent|realtor|mortgage|neighborhood)\b/,
};
const FH = 'I don’t rank neighborhoods by schools, safety or who lives there; fair housing rules keep me to facts about homes and places. For schools, go to the source: Miami-Dade County Public Schools (dadeschools.net), Broward County Public Schools (browardschools.com) or the School District of Palm Beach County (palmbeachschools.org), plus Florida Department of Education school grades (fldoe.org). For crime data, use the crime map published by the city police department or county sheriff. Happy to tell you about the homes, prices and commute anywhere on the map.';
const TOPIC = {
  buy: () => say('**Buying in South Florida, the short version**\n• Get pre-approved (or line up proof of funds) first. For condos, financing also depends on the building’s health.\n• Narrow to two or three neighborhoods by lifestyle and commute, then tour.\n• Make the offer contingent on inspection and, for condos, on your review of the association documents.\n• Price out wind and flood insurance before you’re under contract.\nMiguel can walk you through it: ' + PHONE + ' or DM MAP.', ['Condo rules in Florida', 'Flood insurance basics', 'Relocating to South Florida', 'Get the MAP guide']),
  sell: () => say('**Selling: how Miguel approaches it**\n• Price from real comparables, not an online estimate. The valuation tool on the home page gives a rough range from a neighborhood’s median $/sq ft; Miguel follows with a documented valuation.\n• Prep and presentation: repairs, staging, photography and video.\n• For condos, have the association documents ready early; buyers and lenders will ask.\n• Then marketing, negotiation and closing.\nWant a documented valuation? ' + PHONE + ' or DM MAP.', ['What is the Miami market doing?', 'Fort Lauderdale market update', 'Talk to Miguel']),
  precon: (p) => {
    const nm = p && p.t !== 'x' ? placeName(p) : '';
    const list = (DEVELOPMENTS || []).filter((d) => !nm || norm(d.loc + ' ' + d.name).includes(norm(nm).trim()) || (p && p.t === 'g' && p.id === 'miami' && /miami|brickell|edgewater/i.test(d.loc)));
    const names = list.slice(0, 6).map((d) => `• ${d.name} (${d.loc})`).join('\n');
    const head = nm ? `**Pre-construction in ${nm}**\n` + (names ? `Towers tracked on this site:\n${names}\nPricing on request; release prices and delivery dates come from each developer.` : `No ${nm} towers are tracked on this site right now. Miguel follows launches across South Florida.`) : `**Pre-construction, plainly**\n• You reserve, sign a developer contract, then pay deposits in stages tied to milestones. Schedules differ by tower.\n• Florida gives buyers 15 days after signing a developer contract to cancel, so read the documents in that window.\n• Ask how deposits are held in escrow and what happens if delivery slips.` + (names ? `\nTracked on this site:\n${names}\nPricing on request.` : '');
    return say(head + '\n' + HANDOFF.replace('that directly', 'about current releases'), nm ? [`Tell me about ${nm}`, 'Pre-construction basics', 'Condo rules in Florida', 'Talk to Miguel'] : ['Tell me about new developments in Brickell', 'Condo rules in Florida', 'Investing in Edgewater', 'Talk to Miguel']);
  },
  condo: () => say('**Florida condo rules: what to check** (general information, not legal advice)\n• Milestone inspections: required for condo buildings three stories and up as they age. Ask for the report.\n• SIRS: the structural integrity reserve study. Reserves for structural items can no longer be waived.\n• The budget, reserve schedule, board minutes and any approved or pending special assessments.\n• Rules on leasing minimums, pets and renovations.\nFlorida also gives buyers a window to cancel after receiving the documents (15 days on developer sales, 3 business days on most resales). Have a Florida real estate attorney review them.', ['Condo notes for Brickell', 'Condo notes for Sunny Isles Beach', 'Pre-construction basics', 'Talk to Miguel']),
  invest: () => say('**Investing: how to think about it**\nI don’t quote yields or projected returns; they depend on the building, the price and the rules.\n• Check the building’s leasing rules first: minimum terms, approvals, caps.\n• Cities set short-term rental rules too. Miami Beach restricts them in many residential districts, and Fort Lauderdale requires vacation rentals to register.\n• Budget dues, insurance and possible special assessments before you model income.\nWhere renter demand comes from, per the MAP guide: Brickell’s office core, Aventura and West Palm Beach near Brightline, and downtown Fort Lauderdale.', ['Investing in Brickell', 'Investing in Aventura', 'Condo rules in Florida', 'Talk to Miguel']),
  insurance: () => say('**Insurance and flood, before you commit**\n• Get wind and flood quotes before you’re under contract; they vary with roof age, elevation and construction.\n• Check the FEMA Flood Map Service Center (msc.fema.gov) and ask for an elevation certificate and the seller’s flood history.\n• For condos, ask what the master policy covers and what the deductible is.\n' + HANDOFF, ['Condo rules in Florida', 'Buying in South Florida', 'Tell me about Rio Vista']),
  tax: () => say('**Florida taxes, briefly**\nFlorida has no state personal income tax. If the home is your primary residence, apply for the homestead exemption with your county property appraiser by March 1; it lowers taxable value and caps yearly increases in assessed value. General information, not tax advice; confirm with a CPA.', ['Relocating to South Florida', 'Buying in South Florida', 'Talk to Miguel']),
  rates: () => say('I don’t quote mortgage rates; they move daily and depend on your profile. Freddie Mac’s weekly Primary Mortgage Market Survey (freddiemac.com/pmms) is a good public benchmark, and a lender can quote you directly. Miguel can connect you with local lenders: ' + PHONE + '.', ['Buying in South Florida', 'What is the Miami market doing?']),
  closing: () => say('Closing costs depend on the price, the county, the loan and who pays for title, so I won’t guess a number. Expect lender fees, title insurance, inspections, and prepaid insurance and taxes. ' + HANDOFF, ['Buying in South Florida', 'Florida taxes', 'Talk to Miguel']),
  listings: () => say('For homes on the market right now, use the Listings page; it pulls live from the Miami REALTORS® MLS. I can’t search listings in this chat, but I can tell you about any neighborhood and its verified prices.', ['Tell me about Brickell', 'What is Las Olas like?', 'Talk to Miguel']),
  relocate: () => say('**Relocating: where to start**\nStart with commute and lifestyle, then budget. Some starting points from the MAP guide:\n• Walk-to-everything city: Brickell, Downtown & Edgewater, Las Olas\n• Beach routine at a slower pace: Mid-Beach & North Beach, Fort Lauderdale Beach, Hollywood Beach\n• Space and newer homes: Pinecrest, Weston, Parkland\n• Boating: Las Olas Isles, Rio Vista, Jupiter\nThe MAP guide covers all 26 neighborhoods with drive times; DM MAP to get it.', ['Commute from Brickell', 'Florida taxes', 'Compare Brickell vs Edgewater', 'Get the MAP guide']),
  contact: () => say('Call Miguel Perez at ' + PHONE + ', email miguelperez@luxeknows.com, or DM MAP. You can also use the contact button on any page.', ['Get the MAP guide', 'Buying in South Florida', 'Selling my home']),
  map: () => say('**The South Florida Buyer MAP**\nMiguel’s guide to 26 neighborhoods across Miami-Dade, Broward and Palm Beach: vibe, housing, waterfront, drive times, condo notes and the investment angle, with verified median prices and their sources. DM MAP to get it, or call ' + PHONE + '.', ['Which neighborhoods do you cover?', 'Tell me about Tarpon River', 'Compare Brickell vs Edgewater']),
  who: () => say('I’m the South Florida Elevated knowledge assistant. I answer questions about 26 neighborhoods from Miami-Dade to Jupiter, compare any two, and explain buying, selling, pre-construction, relocation and Florida condo rules, using Miguel’s MAP guide and verified data. Miguel Perez (Luxe Properties) has helped 30+ families buy and sell here; reach him at ' + PHONE + '.', SUGGESTED),
  cover: () => say('**Neighborhoods I cover (from the MAP guide)**\n• Miami-Dade: ' + H.filter((h) => h.county === 'Miami-Dade').map((h) => h.name).join(', ') + '\n• Broward: ' + H.filter((h) => h.county === 'Broward').map((h) => h.name).join(', ') + '\n• Palm Beach: ' + H.filter((h) => h.county === 'Palm Beach').map((h) => h.name).join(', '), ['Tell me about Coconut Grove', 'Tell me about Delray Beach', 'Compare Weston vs Parkland']),
  market: () => {
    const lines = ['**South Florida: what the verified data shows**', 'I don’t forecast prices. Recent sold medians across the three counties:'];
    GROUPS.sofla.rows.forEach((id) => lines.push('• ' + fig(ROW[id])));
    lines.push('For live condo activity, see the dashboard on the Insights page (Miami REALTORS® MLS via Bridge Interactive).');
    lines.push(ASOF);
    return say(lines.join('\n'), ['What is the Miami market doing?', 'Fort Lauderdale market update', 'Palm Beach County market', 'Compare Brickell vs Edgewater']);
  },
};
export const SUGGESTED_PROMPTS = SUGGESTED;
export const WELCOME = 'Ask me about South Florida neighborhoods, prices, buying, selling, pre-construction or relocation. Answers come from Miguel’s MAP guide and verified public data.';
export function answer(input, ctx = {}) {
  const q = norm(input);
  if (!q.trim()) return say('Ask me anything about South Florida real estate.', SUGGESTED);
  let places = findPlaces(q);
  const known = places.filter((p) => p.t !== 'x');
  const unknown = places.filter((p) => p.t === 'x');
  const is = (k) => has(q, T[k]);
  if (!known.length && ctx.last && ctx.last.length && is('there')) places = ctx.last; else if (known.length) ctx.last = known;
  const kp = places.filter((p) => p.t !== 'x');
  const fairQ = is('fair') && !(/\b(safe|safety)\b/.test(q) && !/school|crime|famil|kid|child|neighborhood|area|street/.test(q) && ['precon', 'condo', 'buy', 'invest'].some((k) => is(k)));
  if (fairQ) return say(FH, kp.length ? [`Tell me about ${placeName(kp[0])}`, `Commute from ${placeName(kp[0])}`] : ['Which neighborhoods do you cover?', 'Relocating to South Florida']);
  const kw = ['precon', 'condo', 'invest', 'commute', 'water', 'insurance', 'sell', 'buy', 'relocate', 'tax'];
  if (kp.length >= 2 && (is('vs') || !kw.some((k) => is(k)))) return compare(kp[0], kp[1]);
  if (kp.length) {
    const p = kp[0];
    if (is('precon')) return TOPIC.precon(p);
    if (p.t === 'g') for (const k of ['buy', 'sell', 'relocate', 'condo', 'invest', 'insurance', 'tax', 'listings', 'contact']) if (is(k)) return TOPIC[k]();
    if (is('sell')) { const r = TOPIC.sell(); return say(r.text.replace('\nWant', `\nFor context, ${rowsOf(p).map(fig).join('; ')}.\nWant`), [`Tell me about ${placeName(p)}`, 'Talk to Miguel']); }
    if (is('insurance')) { const r = TOPIC.insurance(); return say(r.text, [`Tell me about ${placeName(p)}`, `Condo notes for ${placeName(p)}`, 'Talk to Miguel']); }
    if (is('invest')) return aspect(p, 'invest');
    if (is('condo')) return aspect(p, 'condo');
    if (is('commute')) return aspect(p, 'commute');
    if (is('water') && !is('about')) return aspect(p, 'water');
    if (is('fair')) return say(FH);
    if (is('market')) return p.t === 'g' ? groupMarket(p) : aspect(p, 'market');
    return profile(p);
  }
  if (unknown.length && !kw.concat(['closing', 'rates', 'contact', 'map']).some((k) => is(k))) return say(`I don’t have a verified profile for ${placeName(unknown[0])} yet, and I won’t guess. I cover 26 neighborhoods from Miami-Dade to Jupiter. ` + HANDOFF, ['Which neighborhoods do you cover?', 'Get the MAP guide']);
  if (is('off')) return say('That’s outside what I cover here; I stick to South Florida real estate. ' + HANDOFF, SUGGESTED);
  for (const k of ['cover', 'map', 'who', 'contact', 'precon', 'condo', 'invest', 'insurance', 'tax', 'closing', 'rates', 'listings', 'relocate', 'sell', 'buy', 'market']) if (is(k)) return TOPIC[k]();
  if (is('thanks')) return say('Anytime. If you want to talk it through with a person, Miguel is at ' + PHONE + '.', SUGGESTED);
  if (is('greet')) return say('Hi! Ask me about any South Florida neighborhood, a side-by-side comparison, or how buying, selling or pre-construction works here.', SUGGESTED);
  if (is('about')) return say('I don’t have a verified answer for that area, and I won’t guess. I cover 26 neighborhoods from Miami-Dade to Jupiter. ' + HANDOFF, ['Which neighborhoods do you cover?', 'Get the MAP guide']);
  if (is('realestate')) return say('I don’t have a verified answer for that one, and I won’t guess. ' + HANDOFF, SUGGESTED);
  return say('That’s outside what I cover here; I stick to South Florida real estate. ' + HANDOFF, SUGGESTED);
}
