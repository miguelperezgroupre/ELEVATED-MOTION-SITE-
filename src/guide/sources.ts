// @ts-nocheck
// South Florida Elevated: sources for the Miami Neighborhood Guide.
// Every figure on /miami-neighborhood-guide points at one of these pages, opened and read on November 3, 2026.
export const GUIDE_PUBLISHED = '2026-11-03';
export const GUIDE_UPDATED = '2026-11-03';
export const GUIDE_UPDATED_LABEL = 'November 3, 2026';
// Redfin publishes a rolling "last 3 months" window; on the October 2026 page that window ends in September 2026.
export const REDFIN_PERIOD = 'three months ending September 2026';
export const REDFIN_LABEL = 'Redfin, 3 months ending Sept 2026';

const RF = 'https://www.redfin.com';

export const SOURCES = {
  brickell: {label: 'Redfin, Brickell (Miami) housing market', short: 'Redfin · Brickell', url: `${RF}/neighborhood/91805/FL/Miami/Brickell/housing-market`},
  downtown: {label: 'Redfin, Downtown Miami housing market', short: 'Redfin · Downtown Miami', url: `${RF}/neighborhood/548892/FL/Miami/Downtown-Miami/housing-market`},
  edgewater: {label: 'Redfin, Edgewater (Miami) housing market', short: 'Redfin · Edgewater', url: `${RF}/neighborhood/224218/FL/Miami/Edgewater/housing-market`},
  wynwood: {label: 'Redfin, Wynwood (Miami) housing market', short: 'Redfin · Wynwood', url: `${RF}/neighborhood/224219/FL/Miami/Wynwood/housing-market`},
  grove: {label: 'Redfin, Coconut Grove (Miami) housing market', short: 'Redfin · Coconut Grove', url: `${RF}/neighborhood/219259/FL/Miami/Coconut-Grove/housing-market`},
  gables: {label: 'Redfin, Coral Gables housing market', short: 'Redfin · Coral Gables', url: `${RF}/city/3707/FL/Coral-Gables/housing-market`},
  littleHavana: {label: 'Redfin, Little Havana (Miami) housing market', short: 'Redfin · Little Havana', url: `${RF}/neighborhood/55670/FL/Miami/Little-Havana/housing-market`},
  southBeach: {label: 'Redfin, ZIP 33139 housing market (South Beach proxy)', short: 'Redfin · ZIP 33139', url: `${RF}/zipcode/33139/housing-market`},
  midBeach: {label: 'Redfin, Mid-Beach (Miami Beach) housing market', short: 'Redfin · Mid-Beach', url: `${RF}/neighborhood/548893/FL/Miami-Beach/Mid-Beach/housing-market`},
  aventura: {label: 'Redfin, Aventura housing market', short: 'Redfin · Aventura', url: `${RF}/city/709/FL/Aventura/housing-market`},
  keyBiscayne: {label: 'Redfin, Key Biscayne housing market', short: 'Redfin · Key Biscayne', url: `${RF}/city/9243/FL/Key-Biscayne/housing-market`},
  doral: {label: 'Redfin, Doral housing market', short: 'Redfin · Doral', url: `${RF}/city/4639/FL/Doral/housing-market`},
  coralWay: {label: 'Redfin, Coral Way (Miami) housing market', short: 'Redfin · Coral Way', url: `${RF}/neighborhood/135263/FL/Miami/Coral-Way/housing-market`},
  silverBluff: {label: 'Redfin, Silver Bluff (Miami) housing market', short: 'Redfin · Silver Bluff', url: `${RF}/neighborhood/352246/FL/Miami/Silver-Bluff/housing-market`},
  oir: {label: 'Florida Office of Insurance Regulation, Property Insurance Stability Report, July 1, 2026 (county premium data as of March 31, 2026)', short: 'Florida OIR · July 2026 stability report', url: 'https://floir.gov/docs-sf/default-source/property-and-casualty/stability-unit-reports/july-2026-isu-report.pdf'},
  metromover: {label: 'Miami-Dade County Department of Transportation and Public Works, Metromover', short: 'Miami-Dade DTPW · Metromover', url: 'https://www.miamidade.gov/global/transportation/metromover.page'},
  walkscoreMiami: {label: 'Walk Score, Miami neighborhood rankings (Walk, Transit and Bike Scores)', short: 'Walk Score · Miami', url: 'https://www.walkscore.com/FL/Miami/Brickell'},
  walkscoreWynwood: {label: 'Walk Score, Wynwood-Edgewater, Miami', short: 'Walk Score · Wynwood-Edgewater', url: 'https://www.walkscore.com/FL/Miami/Wynwood-Edgewater'},
  walkscoreBeach: {label: 'Walk Score, Miami Beach neighborhoods', short: 'Walk Score · Miami Beach', url: 'https://www.walkscore.com/FL/Miami_Beach'},
  walkscoreBrickell: {label: 'Walk Score, Brickell (Miami 33131)', short: 'Walk Score · Brickell 33131', url: 'https://www.walkscore.com/score/brickell-miami-fl-us'},
  walkscoreKey: {label: 'Walk Score, Key Biscayne FL 33149', short: 'Walk Score · Key Biscayne', url: 'https://www.walkscore.com/score/key-biscayne-fl'},
  crandon: {label: 'Miami-Dade County Parks, Crandon Park (Key Biscayne)', short: 'Miami-Dade Parks · Crandon Park', url: 'https://www.miamidade.gov/parks/crandon.asp'},
  brightline: {label: 'WSVN 7News, "Grand opening held for new Brightline station in Aventura," December 24, 2022', short: 'WSVN · Brightline Aventura', url: 'https://wsvn.com/news/local/miami-dade/grand-opening-held-for-new-brightline-station-in-aventura/'},
  aventuraTrail: {label: 'City of Aventura, Don Soffer Exercise Trail (3.1-mile paved loop, open 24 hours)', short: 'City of Aventura · Don Soffer Exercise Trail', url: 'https://www.cityofaventura.com/facilities/facility/details/Don-Soffer-Exercise-Trail-3'},
};

export const SOURCE_ORDER = [
  'brickell', 'downtown', 'edgewater', 'wynwood', 'grove', 'gables', 'littleHavana',
  'southBeach', 'midBeach', 'aventura', 'keyBiscayne', 'doral', 'coralWay', 'silverBluff',
  'oir', 'metromover', 'walkscoreMiami', 'walkscoreWynwood', 'walkscoreBeach', 'walkscoreBrickell',
  'walkscoreKey', 'crandon', 'brightline', 'aventuraTrail',
];

export const sourceNumber = (id) => SOURCE_ORDER.indexOf(id) + 1;
