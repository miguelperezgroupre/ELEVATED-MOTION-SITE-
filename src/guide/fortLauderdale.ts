// @ts-nocheck
// South Florida Elevated: Fort Lauderdale Neighborhood Guide content.
// Every price is a median sale price (all home types) or a median price per square foot, taken from the
// Redfin market page named in `price.src`, which reported a three-month window ending September 2026.
// Nothing here is estimated: where a figure could not be sourced, the entry says so.
import {FTL_REDFIN_LABEL} from './fortLauderdaleSources';

export const FORT_LAUDERDALE = [
  {
    id: 'victoria-park',
    name: 'Victoria Park',
    kicker: 'The deepest house market in the city, walkable to Las Olas',
    rank: 1,
    intro:
      'Victoria Park is the neighborhood buyers land on when they want a house or a townhouse within walking distance of Las Olas and downtown without paying Las Olas Isles money. It is also the second-deepest market in this guide: 52 closings in three months, behind only Galt Mile\'s 67 and well ahead of every other owner-occupied neighborhood here. The housing runs from 1940s cottages to new townhouses on a compact grid just north of downtown.',
    bestFor: ['Buyers who want to walk to Las Olas and downtown', 'Families who want a 9/10 elementary inside the neighborhood', 'Buyers who want a resale market deep enough to price confidently'],
    housing:
      'Single-family houses from the early postwar decades on small lots, townhouses built since the 2000s, and a growing number of new-construction houses that replace teardowns. Condominiums are a minority of the stock.',
    price: {median: '$900K', ppsf: '$445', yoy: '−1.9%', ppsfYoy: '−2.3%', dom: '111 days', sold: '52', src: 'victoriaPark', note: 'The steadiest reading in this guide: both the median and the price per foot moved about 2% year over year on 52 closings, which is a large enough sample to trust.'},
    transit: 'Walk Score rates Victoria Park 75 ("Very Walkable"), with a Transit Score of 40 and a Bike Score of 59. It is the seventh most walkable neighborhood in the city on Walk Score\'s ranking, and downtown, Las Olas and the beach are all short drives.',
    schools: 'Redfin lists Virginia Shuman Young Elementary (PreK–5, GreatSchools 9/10) inside the neighborhood. The building is a Montessori magnet, so admission is not the same as a boundary assignment. Confirm the assigned school for the exact address with Broward County Public Schools.',
    flood: {label: 'Major', note: '94% of Victoria Park properties are projected to face severe flood risk over 30 years, and 100% carry an extreme wind rating. The city is rebuilding the drainage here: a project started January 5, 2026 that adds 43,000 feet of stormwater pipe, 360 drainage structures and a new pump station east of Northeast 20th Avenue and Northeast 7th Street, scheduled to finish in early 2028.'},
    tradeoffs: [
      'Homes averaged about 6% under list and 36% of listings in the window took a price cut, so the market rewards a patient, well-priced offer rather than a full-price rush.',
      'The stormwater construction means lane closures and full street closures through 2028 on the blocks being rebuilt. Ask which phase your street falls in before you buy.',
      'Lot sizes are small and many houses have been added onto over decades. Order the permit history, not just an inspection.',
    ],
    links: [{label: 'King Tides in Fort Lauderdale: what homeowners and buyers should know', href: '/journal/fort-lauderdale-king-tides-homeowners-buyers'}],
  },
  {
    id: 'las-olas-isles',
    name: 'Las Olas Isles',
    kicker: 'Finger islands, dock space and the highest price per foot',
    rank: 2,
    intro:
      'Las Olas Isles is the group of finger islands between Las Olas Boulevard and the New River, where much of the housing sits on a canal with dock space, which is why boat owners ask about it first. It is the most expensive address in this guide at $1.1K per square foot, and a thin sample: nine closings in three months. Read those nine sales as nine individual houses, not as a market.',
    bestFor: ['Buyers who need dockage behind the house', 'Buyers who want a deep-water address minutes from the inlet', 'Buyers who will renovate or build and can wait out a slow resale'],
    housing:
      'Detached single-family houses on the islands, ranging from older ranch houses to recent waterfront builds. Condominiums and townhouses are effectively absent, and the house you buy is generally the house you renovate.',
    price: {median: '$5.2M', ppsf: '$1.1K', yoy: '+203.3%', ppsfYoy: '+130.4%', dom: '100 days', sold: '9', src: 'lasOlasIsles', note: 'Nine sales, up from two in the same window last year. A 203% jump in the median and 130% in price per foot is what happens when the mix swings from older houses to new waterfront builds, not evidence that every house tripled.'},
    transit: 'Walk Score gives Las Olas Isles a 38 ("Car-Dependent"), a Transit Score of 26 and a Bike Score of 41 ("Somewhat Bikeable"). The islands are residential and the bridges funnel every trip onto Las Olas Boulevard or Sunrise Boulevard.',
    schools: 'Redfin\'s Las Olas Isles page publishes no elementary school inside the neighborhood boundary. School-age buyers should check the assigned school for the exact address with Broward County Public Schools before making an offer on a house.',
    flood: {label: 'Extreme', note: '99% of Las Olas Isles properties are projected to face severe flood risk over 30 years, the highest share in this guide, and 100% carry an extreme wind rating. On a finger island, flood elevation and dock height matter as much as the floor plan.'},
    tradeoffs: [
      'Nine closings is not a market. Ask for every sale on your island in the last twelve months before you accept the neighborhood median as a comparable.',
      'Homes averaged about 9% under list in the window, the second-widest discount in this guide behind Colee Hammock, and 21% of listings took a price cut. Asking prices on the isles run ahead of what buyers pay.',
      'Flood and wind coverage on an island property is the largest line item after the mortgage, and flood is always a separate policy.',
    ],
    links: [{label: 'The Boat Show is back: what FLIBS says about waterfront living', href: '/journal/fort-lauderdale-boat-show-waterfront-living'}],
  },
  {
    id: 'rio-vista',
    name: 'Rio Vista',
    kicker: 'Tree canopy, deep-water canals and a 13-sale sample',
    rank: 3,
    intro:
      'Rio Vista is the old waterfront neighborhood south of the New River, laid out around wide streets and a heavy tree canopy, with canals that reach deep-water dockage. It reads as the quieter, more residential counterpart to Las Olas Isles, and the houses are generally older and on larger lots. Thirteen closings in the window make the median a direction, not a target.',
    bestFor: ['Buyers who want a house with dockage and a mature canopy', 'Buyers who prefer a residential grid over a condo tower', 'Families who want to be close to downtown without living in it'],
    housing:
      'Single-family houses on generous lots, from older single-story homes to recent builds on cleared lots, with a small number of townhouses near the neighborhood edges. There is no meaningful condominium stock.',
    price: {median: '$2.3M', ppsf: '$744', yoy: '+19.1%', ppsfYoy: '+11.4%', dom: '112 days', sold: '13', src: 'rioVista', note: 'Thirteen sales, with the median up 19.1% and price per foot up 11.4% together. When both move the same direction, the increase is closer to real than a mix shift.'},
    transit: 'Walk Score rates Rio Vista 54 ("Somewhat Walkable"), with a Transit Score of 38 and a Bike Score of 58. The neighborhood is a short drive from downtown and the beach, and the riverfront parks are walkable from most of it.',
    schools: 'Redfin\'s Rio Vista page lists no elementary school inside the neighborhood boundary, so school-age buyers should confirm the assigned school for the exact address with Broward County Public Schools rather than assume a nearby campus applies.',
    flood: {label: 'Major', note: '77% of Rio Vista properties are projected to face severe flood risk over 30 years, the third-lowest share in this guide behind Colee Hammock and Galt Mile, though 100% carry an extreme wind rating.'},
    tradeoffs: [
      '47% of listings in the window took a price cut, the highest share in this guide. Sellers here are testing the market, and buyers have room to negotiate.',
      'Thirteen sales spread across houses of very different size and dockage. Two canal-front closings can move the median by six figures.',
      'Older houses on the canals carry real seawall, dock and pool-deck costs. Have the seawall inspected, not just the house.',
    ],
    links: [],
  },
  {
    id: 'coral-ridge',
    name: 'Coral Ridge',
    kicker: 'A 10/10 elementary, a country club grid and 40% price growth',
    rank: 4,
    intro:
      'Coral Ridge sits north of Sunrise Boulevard around the Coral Ridge Country Club, a grid of mid-century houses and newer builds a short ride from the beach. It posted the strongest price growth of any neighborhood here that also closed at least 30 homes, at 40.6% year over year, and it is home to the highest-rated elementary school in this guide. It is also the second-slowest market here after Downtown, at 127 days.',
    bestFor: ['Families prioritizing the highest public elementary rating in this guide', 'Buyers who want a house and a yard near the beach', 'Buyers who want a country club and golf nearby'],
    housing:
      'Single-family houses from the mid-century decades alongside newer construction on the interior streets, with a limited number of condominiums and townhouses along the commercial edges.',
    price: {median: '$2.0M', ppsf: '$754', yoy: '+40.6%', ppsfYoy: '+21.1%', dom: '127 days', sold: '33', src: 'coralRidge', note: 'Both the median and the price per foot rose sharply on 33 sales, so this is the one high-end neighborhood here where the increase is not obviously a mix effect.'},
    transit: 'Walk Score rates Coral Ridge 57 ("Somewhat Walkable"), with a Transit Score of 37 and a Bike Score of 50 ("Somewhat Bikeable"). The commercial strip on Federal Highway is walkable; the residential blocks mostly are not.',
    schools: 'Redfin lists Bayview Elementary (K–5, GreatSchools 10/10) inside the neighborhood, the highest rating published for any school in this guide. Enrollment still follows the boundary for the exact address, so confirm it with Broward County Public Schools.',
    flood: {label: 'Major', note: '92% of Coral Ridge properties are projected to face severe flood risk over 30 years, with 100% at extreme wind risk. Elevation and drainage vary block by block near the water, so check the FEMA map for the address. For scale on the wind half of that risk, the average Broward County homeowners policy including wind coverage ran $6,136 in the Florida Office of Insurance Regulation stability report published July 1, 2026, using data as of March 31, 2026.'},
    tradeoffs: [
      'Homes averaged about 7% under list and 30.8% of listings took a price cut, while no sale in the window closed above list. The 40% median increase is a seller\'s memory, not a buyer\'s reality at the negotiating table.',
      'At 127 days on market it is slower than every neighborhood here except Downtown. Price to sell, or plan on carrying it.',
      'Country club membership is separate from the address and is not part of any purchase price. Ask the club directly about dues and waitlists.',
    ],
    links: [],
  },
  {
    id: 'downtown-fort-lauderdale',
    name: 'Downtown Fort Lauderdale',
    kicker: 'The walkable condo core, and the slowest market here',
    rank: 5,
    intro:
      'Downtown Fort Lauderdale is the condo core around Las Olas Boulevard, the New River and the Brightline station. It carries the highest walk figure in this guide, a 90 on Redfin\'s page for the area, and the strongest bike score here at 83. It is also the slowest market in this guide: 162 median days on market, six days longer than a year earlier, on 23 closings. Buyers who want to walk to dinner and a train will like it. Sellers should plan for a long listing.',
    bestFor: ['Buyers who want to walk to restaurants, offices and the train', 'Commuter buyers who want Brightline without a car commute', 'Investors who want a deep rental pool downtown'],
    housing:
      'Almost entirely condominiums, in towers and in smaller buildings closer to the river, plus a small stock of lofts and townhouses. Detached houses are effectively absent inside the core.',
    price: {median: '$575K', ppsf: '$461', yoy: '+2.6%', ppsfYoy: '+11.2%', dom: '162 days', sold: '23', src: 'downtownFtl', note: 'Closings fell 26.7% year over year while price per foot rose 11.2%, which points to fewer, larger or newer units trading rather than a broad move up.'},
    transit: 'Redfin reports a Walk Score of 90 ("Very Walkable") for Downtown, a Transit Score of 56 and a Bike Score of 83 ("Very Bikeable"), the highest walk figure of the twelve areas in this guide. Walk Score\'s own Fort Lauderdale ranking lists Flagler Village first at 89 and does not publish a separate Downtown entry. Brightline\'s Fort Lauderdale station is at 101 NW 2nd Avenue, and the city lists Broward County Transit, Tri-Rail, Amtrak, the free LauderGO! Community Shuttle and the LauderGO! Water Trolley across the New River among the options here.',
    schools: 'Redfin publishes no elementary school inside the downtown boundary and lists only Broward County Acceleration Academies (grades 8–12, GreatSchools 2/10) for the middle and high grades. Families with young children should check the assigned school for the address before buying.',
    flood: {label: 'Major', note: '88% of Downtown properties are projected to face severe flood risk over 30 years, and 100% carry an extreme wind rating. Broward County condominium unit owners averaged $1,816 for a policy including wind coverage in the Florida Office of Insurance Regulation stability report published July 1, 2026.'},
    tradeoffs: [
      'At 162 median days and a Compete Score of 10 out of 100, this is among the least competitive markets in the guide, tied with Flagler Village on the score. Buyers should expect to negotiate and sellers should expect to wait.',
      '38.1% of listings took a price cut in the window, the second-highest share here. Initial asking prices are running ahead of closings.',
      'Tower supply is the long-term risk. Older buildings also carry milestone inspection and reserve requirements under Florida law, so read the association documents and the reserve study before you buy.',
    ],
    links: [{label: 'Waiting for mortgage rates to drop: what waiting actually costs', href: '/journal/waiting-for-mortgage-rates-cost-of-waiting'}],
  },
  {
    id: 'flagler-village',
    name: 'Flagler Village',
    kicker: 'Top of Walk Score\'s city ranking, on a 14-sale sample',
    rank: 6,
    intro:
      'Flagler Village is the arts-and-condo district north of downtown, and Walk Score ranks it first among Fort Lauderdale neighborhoods at 89, ahead of Colee Hammock and Victoria Park. Most of the stock is mid-rise and high-rise condominium buildings rather than houses or townhouses. Fourteen closings in the window make the median fragile.',
    bestFor: ['Buyers who want the top Walk Score ranking in the city', 'Buyers comparing price per foot against Downtown and Victoria Park', 'Buyers who want a newer building rather than a renovation project'],
    housing:
      'Condominiums in mid-rise and high-rise buildings, most of them recent construction, plus a small number of older single-family houses and duplexes on the western blocks.',
    price: {median: '$473K', ppsf: '$381', yoy: '+60.3%', ppsfYoy: '−17.4%', dom: '106 days', sold: '14', src: 'flaglerVillage', note: 'The median rose 60.3% while price per foot fell 17.4% on 14 sales. That divergence is a change in which units sold, not a neighborhood that got both more and less expensive.'},
    transit: 'Walk Score rates Flagler Village 89 ("Very Walkable") with a Transit Score of 56 ("Good Transit") and a Bike Score of 64. It holds first place in Walk Score\'s ranking of Fort Lauderdale neighborhoods, ahead of Colee Hammock at 86 and Victoria Park at 75.',
    schools: 'Redfin publishes no elementary school inside the Flagler Village boundary. Buyers with school-age children should confirm the assigned school for the exact address with Broward County Public Schools, which runs its own address lookup.',
    flood: {label: 'Moderate', note: '90% of Flagler Village properties are projected to face severe flood risk over 30 years, and 100% carry an extreme wind rating.'},
    tradeoffs: [
      'Fourteen closings. The 60% median jump and 17% per-foot drop are the same fact seen two ways, so compare price per foot in the specific building you are considering.',
      'At 106 days on market and a Compete Score of 10, listings sit. Ask how long your unit has been listed and what the seller has already turned down.',
      'New supply is the resale risk. A newer tower down the street resets what buyers will pay for an older one, and rental caps in a building change what you can do with the unit.',
    ],
    links: [],
  },
  {
    id: 'colee-hammock',
    name: 'Colee Hammock',
    kicker: 'Historic houses on the New River, 73-day sales',
    rank: 7,
    intro:
      'Colee Hammock is the small historic neighborhood on the north bank of the New River just east of downtown, a few blocks of Mediterranean Revival and Colonial Revival houses under old trees. It has the second-highest score on Walk Score\'s city ranking at 86 and the lowest flood exposure in this guide, and it sold faster than any neighborhood here at 73 median days. The catch is the sample: ten closings.',
    bestFor: ['Buyers who want a historic house walkable to Las Olas', 'Buyers prioritizing lower flood exposure than the islands', 'Buyers who value a small, quiet street grid downtown'],
    housing:
      'Detached single-family houses, many of them historic, plus a handful of small condominium buildings and townhouses along the neighborhood edges. Lots are small and mature trees dominate the streets.',
    price: {median: '$995K', ppsf: '$321', yoy: '+107.2%', ppsfYoy: '−30.3%', dom: '73 days', sold: '10', src: 'coleeHammock', note: 'Ten sales. The median doubled while price per foot fell 30.3%, which is what a shift toward larger houses on bigger lots looks like in a neighborhood this small.'},
    transit: 'Walk Score rates Colee Hammock 86 ("Very Walkable"), with a Transit Score of 41 and a Bike Score of 53. Las Olas Boulevard and the Riverwalk are within walking distance, and downtown is a short ride.',
    schools: 'Redfin publishes no elementary school inside the Colee Hammock boundary. School-age buyers should check the assigned school for the exact address with Broward County Public Schools; nearby Victoria Park is where Redfin lists a rated elementary.',
    flood: {label: 'Major', note: '56% of Colee Hammock properties are projected to face severe flood risk over 30 years, the lowest share of any neighborhood in this guide, though 100% still carry an extreme wind rating.'},
    tradeoffs: [
      'Homes averaged about 12% under list, the widest gap in this guide, and no sale closed above list. The headline median here is not a number sellers are getting.',
      'Ten closings on houses of very different size. A single restored riverfront house can carry the median for a quarter.',
      'Historic houses mean historic systems. Roof, electrical, plumbing and window condition drive both the inspection report and the insurance quote.',
    ],
    links: [],
  },
  {
    id: 'galt-mile',
    name: 'Galt Mile',
    kicker: 'Beachfront condos, 67 sales and the lowest median price',
    rank: 8,
    intro:
      'Galt Mile is the stretch of oceanfront and Intracoastal condominium towers along A1A at the northern end of the city. It is the deepest condo market in this guide with 67 closings and the lowest median price at $400K, because the low end of the tower stock is what clears here. Prices fell 17.5% year over year, as much as any neighborhood in this guide.',
    bestFor: ['Buyers who want an oceanfront building at the lowest entry price', 'Buyers who want the deepest condo resale market in the city', 'Seasonal owners who want a doorman building and a beach'],
    housing:
      'High-rise condominiums, many of them built decades ago and some newer, with the beach and the Intracoastal on either side of the strip. Each building sets its own rental and occupancy rules, so read the association documents before you compare two units.',
    price: {median: '$400K', ppsf: '$367', yoy: '−17.5%', ppsfYoy: '−6.9%', dom: '122 days', sold: '67', src: 'galtMile', note: 'Sixty-seven closings, the deepest sample in this guide, with the median down 17.5% and price per foot down 6.9%. On this volume the decline is real, not noise.'},
    transit: 'Walk Score rates Galt Mile 70 ("Very Walkable"), with a Transit Score of 40 and a Bike Score of 62. The beach, the shops along A1A and the restaurants on the strip are walkable; everything west of the Intracoastal needs a car.',
    schools: 'Redfin publishes no elementary school inside the Galt Mile boundary. Families should confirm the assigned school for the exact address with Broward County Public Schools, since attendance areas near the beach corridor do not follow neighborhood lines.',
    flood: {label: 'Moderate', note: '75% of Galt Mile properties are projected to face severe flood risk over 30 years, with 100% at extreme wind risk. Oceanfront buildings face the wind and salt exposure that come with the address.'},
    tradeoffs: [
      'Prices have been falling for a year in a market with 67 closings to prove it. That is leverage for a buyer and a real question for anyone buying on a short hold.',
      'Older oceanfront towers carry milestone inspection and structural reserve requirements under Florida law. The reserve study and any pending assessment matter more than the list price.',
      'The lowest median in this guide reflects the smallest and oldest units on the beach. Compare price per foot and the monthly maintenance before you compare headline prices.',
    ],
    links: [],
  },
  {
    id: 'sailboat-bend',
    name: 'Sailboat Bend',
    kicker: 'Historic cottages and townhouses on the New River',
    rank: 9,
    intro:
      'Sailboat Bend is the historic district on the south bank of the New River west of downtown, a mix of 1920s cottages and newer townhouses within walking distance of the Broward Center and the Riverwalk. It has the best transit score of any residential neighborhood here outside Flagler Village and downtown, at 51. Eight closings in three months make it the thinnest sample in this guide.',
    bestFor: ['Buyers who want a historic cottage near downtown', 'Buyers who want walkability without a high-rise', 'Buyers comparing a townhouse against a downtown condo'],
    housing:
      'Single-family cottages and bungalows alongside townhouse projects and newer infill houses, with building size and condition varying block to block.',
    price: {median: '$473K', ppsf: '$490', yoy: '+26.1%', ppsfYoy: '+18.6%', dom: '88 days', sold: '8', src: 'sailboatBend', note: 'Eight sales, down from 16 in the same window last year. Both the median and the price per foot rose, but on this volume either could move double digits from one atypical closing.'},
    transit: 'Walk Score rates Sailboat Bend 69 ("Somewhat Walkable") with a Transit Score of 51 ("Good Transit") and a Bike Score of 62. The Riverwalk and downtown are walkable, and the LauderGO! Water Trolley crosses the New River for free.',
    schools: 'Redfin publishes no elementary school inside the Sailboat Bend boundary. Buyers with children should confirm the assigned school for the exact address with Broward County Public Schools before writing an offer.',
    flood: {label: 'Moderate', note: '94% of Sailboat Bend properties are projected to face severe flood risk over 30 years, and 100% carry an extreme wind rating. The neighborhood fronts the New River, so drainage and elevation vary by block.'},
    tradeoffs: [
      'Eight closings is the smallest sample in this guide. Any neighborhood median from eight sales deserves six months of your own comparables.',
      'Historic cottages come with the permits that were and were not pulled. Order the permit history and expect roof, electrical and plumbing findings.',
      'Townhouses here compete directly with downtown condos on price. Compare the monthly association cost, not just the sale price.',
    ],
    links: [],
  },
  {
    id: 'tarpon-river',
    name: 'Tarpon River',
    kicker: 'Between downtown and the airport, and near the bottom price per foot',
    rank: 10,
    intro:
      'Tarpon River runs along the river south of downtown toward the airport, a mix of older houses, duplexes and newer townhouses. It has the second-lowest price per square foot in this guide at $341, behind only Colee Hammock, and it is a house market rather than a condo one. Prices also fell 17.5% year over year, and the sample is real at 30 closings.',
    bestFor: ['Buyers who want more house for the money near downtown', 'Buyers who want a house or townhouse rather than a condo', 'Buyers who value airport proximity'],
    housing:
      'Single-family houses, duplexes and small multifamily buildings, plus townhouse projects near the river. Condition ranges from fully renovated to original.',
    price: {median: '$615K', ppsf: '$341', yoy: '−17.5%', ppsfYoy: '−5.3%', dom: '107 days', sold: '30', src: 'tarponRiver', note: 'Thirty closings, with the median down 17.5% and price per foot down 5.3%. The bigger drop in the median than in the per-foot figure points to smaller units selling.'},
    transit: 'Walk Score rates Tarpon River 50 ("Somewhat Walkable"), with a Transit Score of 44 and a Bike Score of 62. Downtown is a short drive or ride, and Fort Lauderdale-Hollywood International Airport is minutes south.',
    schools: 'Redfin publishes no elementary school inside the Tarpon River boundary. Buyers with school-age children should confirm the assigned school for the exact address with Broward County Public Schools.',
    flood: {label: 'Moderate', note: '96% of Tarpon River properties are projected to face severe flood risk over 30 years, and 100% carry an extreme wind rating.'},
    tradeoffs: [
      'Prices fell 17.5% year over year on 30 sales. That is bargaining room for a buyer and a warning for anyone buying to resell in two years.',
      'Homes averaged about 4% under list with a 95.9% sale-to-list ratio, so sellers here are holding price. A low offer needs a reason beyond the neighborhood median.',
      'Flight paths and highway noise vary street by street with the airport this close. Visit at different times of day before you commit.',
    ],
    links: [],
  },
  {
    id: 'poinsettia-heights',
    name: 'Poinsettia Heights',
    kicker: 'Between the beach and Federal, 98% flood exposure',
    rank: 11,
    intro:
      'Poinsettia Heights is the grid of houses and small buildings east of Federal Highway and a few minutes inland from the beach, north of Sunrise Boulevard. The median is $717K for a detached house, and closings nearly tripled year over year from 11 to 30, so the market here is more active than it was a year ago. It also carries 98% projected severe flood exposure, which is the number to price before the house.',
    bestFor: ['Buyers who want a detached house near the beach', 'Buyers who want to be between the beach and downtown', 'Buyers who will price flood mitigation into the budget'],
    housing:
      'Single-family houses on small lots, with duplexes and a limited number of small condominium buildings on the commercial edges. Condition varies from renovated to original.',
    price: {median: '$717K', ppsf: '$482', yoy: '+5.8%', ppsfYoy: '−16.2%', dom: '88 days', sold: '30', src: 'poinsettiaHeights', note: 'Closings rose from 11 to 30 year over year while price per foot fell 16.2%. More, smaller or less renovated houses sold in this window than last year.'},
    transit: 'Walk Score rates Poinsettia Heights 58 ("Somewhat Walkable"), with a Transit Score of 34 and a Bike Score of 60. Federal Highway carries the buses; the beach is a short drive east.',
    schools: 'Redfin lists Bennett Elementary (PreK–5, GreatSchools 5/10) and Sunrise Middle (grades 6–8, 6/10) for the area. Buyers comparing schools usually cross-shop Coral Ridge, where Redfin lists Bayview Elementary at 10/10.',
    flood: {label: 'Moderate', note: '98% of Poinsettia Heights properties are projected to face severe flood risk over 30 years, the second-highest share in this guide behind Las Olas Isles, and 100% carry an extreme wind rating.'},
    tradeoffs: [
      'A 5/10 elementary and a 6/10 middle school are the published ratings. If school quality is the reason for the move, this is not the neighborhood that answers it.',
      '98% projected severe flood exposure means flood insurance is not optional and quotes vary by elevation and renovation. Get the quote before you make an offer, not after.',
      'Price per foot fell 16.2% while the median rose. Compare houses of similar size rather than trusting either figure alone.',
    ],
    links: [],
  },
  {
    id: 'croissant-park',
    name: 'Croissant Park',
    kicker: 'The established grid south of the New River',
    rank: 12,
    intro:
      'Croissant Park is the established residential neighborhood south of the New River, a compact grid of houses and duplexes with a city park and pool at its center. The median is $645K and the price per foot is $360, which is the third-lowest per-foot figure in this guide, and at 78 median days it sold faster than every neighborhood here except Colee Hammock. The elementary school inside it is rated 7/10.',
    bestFor: ['Buyers who want a detached house near the bottom of the price range', 'Buyers who want a rated elementary inside the neighborhood', 'Buyers who want to be close to downtown and the airport'],
    housing:
      'Single-family houses, duplexes and small apartment buildings, with new construction appearing on infill lots. Lot sizes are modest and the street grid is compact.',
    price: {median: '$645K', ppsf: '$360', yoy: '+12.9%', ppsfYoy: '−20.0%', dom: '78 days', sold: '15', src: 'croissantPark', note: 'Fifteen closings, with the median up 12.9% while price per foot fell 20.0%. The houses that sold in this window were larger or newer than last year\'s.'},
    transit: 'Walk Score rates Croissant Park 55 ("Somewhat Walkable"), with a Transit Score of 39 and a Bike Score of 64. Downtown is a short drive north across the river, and the airport is minutes south.',
    schools: 'Redfin lists Croissant Park Elementary (PreK–5, GreatSchools 7/10) inside the neighborhood. Confirm the assigned school for the exact address with Broward County Public Schools, since attendance areas do not follow neighborhood lines exactly.',
    flood: {label: 'Moderate', note: '93% of Croissant Park properties are projected to face severe flood risk over 30 years, and 100% carry an extreme wind rating.'},
    tradeoffs: [
      'Older houses mean roof, plumbing and electrical work, and additions that may or may not have been permitted. Order the permit history.',
      'Fifteen closings, so the median and the per-foot figure disagree by 33 points. Trust neither until you have your own comparables.',
      'Noise from the airport, the highway and the rail corridor is part of the address on the southern and western blocks.',
    ],
    links: [],
  },
];

export const getFortLauderdale = (id) => FORT_LAUDERDALE.find((n) => n.id === id) || null;

export const DATA_NOTE = `Every price and price per square foot on this page is a median for all home types from the Redfin market page for that neighborhood, taken from Redfin's October 2026 page, which reports a three-month window ending September 2026 (${FTL_REDFIN_LABEL}). The citywide Fort Lauderdale figure in the same window was a median of $605K, up 14.1% year over year, on 851 sales and 104 median days on market. Medians describe what sold in that window, not what a specific home is worth, and a neighborhood with eight or ten closings can move double digits on a single sale.`;
