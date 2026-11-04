// @ts-nocheck
// South Florida Elevated: sources for the Fort Lauderdale Neighborhood Guide.
// Every figure on /fort-lauderdale-neighborhood-guide points at one of these pages, opened and read on November 3, 2026.
export const FTL_GUIDE_PUBLISHED = '2026-11-03';
export const FTL_GUIDE_UPDATED = '2026-11-03';
export const FTL_GUIDE_UPDATED_LABEL = 'November 3, 2026';
// Redfin publishes a rolling "last 3 months" window; on the October 2026 page that window ends in September 2026.
export const FTL_REDFIN_PERIOD = 'three months ending September 2026';
export const FTL_REDFIN_LABEL = 'Redfin, 3 months ending Sept 2026';

const RF = 'https://www.redfin.com';

export const FTL_SOURCES = {
  victoriaPark: {label: 'Redfin, Victoria Park (Fort Lauderdale) housing market', short: 'Redfin · Victoria Park', url: `${RF}/neighborhood/55984/FL/Fort-Lauderdale/Victoria-Park/housing-market`},
  lasOlasIsles: {label: 'Redfin, Las Olas Isles (Fort Lauderdale) housing market', short: 'Redfin · Las Olas Isles', url: `${RF}/neighborhood/143693/FL/Fort-Lauderdale/Las-Olas-Isles/housing-market`},
  rioVista: {label: 'Redfin, Rio Vista (Fort Lauderdale) housing market', short: 'Redfin · Rio Vista', url: `${RF}/neighborhood/55875/FL/Fort-Lauderdale/Rio-Vista/housing-market`},
  coralRidge: {label: 'Redfin, Coral Ridge (Fort Lauderdale) housing market', short: 'Redfin · Coral Ridge', url: `${RF}/neighborhood/56181/FL/Fort-Lauderdale/Coral-Ridge/housing-market`},
  downtownFtl: {label: 'Redfin, Downtown Fort Lauderdale housing market', short: 'Redfin · Downtown Fort Lauderdale', url: `${RF}/neighborhood/56379/FL/Fort-Lauderdale/Downtown-Fort-Lauderdale/housing-market`},
  flaglerVillage: {label: 'Redfin, Flagler Village (Fort Lauderdale) housing market', short: 'Redfin · Flagler Village', url: `${RF}/neighborhood/135500/FL/Fort-Lauderdale/Flagler-Village/housing-market`},
  coleeHammock: {label: 'Redfin, Colee Hammock (Fort Lauderdale) housing market', short: 'Redfin · Colee Hammock', url: `${RF}/neighborhood/55634/FL/Fort-Lauderdale/Colee-Hammock/housing-market`},
  galtMile: {label: 'Redfin, Galt Mile (Fort Lauderdale) housing market', short: 'Redfin · Galt Mile', url: `${RF}/neighborhood/55948/FL/Fort-Lauderdale/Galt-Mile/housing-market`},
  sailboatBend: {label: 'Redfin, Sailboat Bend (Fort Lauderdale) housing market', short: 'Redfin · Sailboat Bend', url: `${RF}/neighborhood/56172/FL/Fort-Lauderdale/Sailboat-Bend/housing-market`},
  tarponRiver: {label: 'Redfin, Tarpon River (Fort Lauderdale) housing market', short: 'Redfin · Tarpon River', url: `${RF}/neighborhood/56348/FL/Fort-Lauderdale/Tarpon-River/housing-market`},
  poinsettiaHeights: {label: 'Redfin, Poinsettia Heights (Fort Lauderdale) housing market', short: 'Redfin · Poinsettia Heights', url: `${RF}/neighborhood/56287/FL/Fort-Lauderdale/Poinsettia-Heights/housing-market`},
  croissantPark: {label: 'Redfin, Croissant Park (Fort Lauderdale) housing market', short: 'Redfin · Croissant Park', url: `${RF}/neighborhood/56336/FL/Fort-Lauderdale/Croissant-Park/housing-market`},
  ftlCity: {label: 'Redfin, Fort Lauderdale housing market (citywide median, sales and days on market)', short: 'Redfin · Fort Lauderdale', url: `${RF}/city/6173/FL/Fort-Lauderdale/housing-market`},
  oir: {label: 'Florida Office of Insurance Regulation, Property Insurance Stability Report, July 1, 2026 (county premium data as of March 31, 2026)', short: 'Florida OIR · July 2026 stability report', url: 'https://floir.gov/docs-sf/default-source/property-and-casualty/stability-unit-reports/july-2026-isu-report.pdf'},
  walkscoreFtl: {label: 'Walk Score, Fort Lauderdale neighborhood ranking (Walk, Transit and Bike Scores and each neighborhood\'s rank in the city)', short: 'Walk Score · Fort Lauderdale', url: 'https://www.walkscore.com/FL/Fort_Lauderdale'},
  walkscoreFlagler: {label: 'Walk Score, Flagler Village, Fort Lauderdale', short: 'Walk Score · Flagler Village', url: 'https://www.walkscore.com/FL/Fort_Lauderdale/Flagler_Village'},
  walkscoreVictoria: {label: 'Walk Score, Victoria Park, Fort Lauderdale', short: 'Walk Score · Victoria Park', url: 'https://www.walkscore.com/FL/Fort_Lauderdale/Victoria_Park'},
  walkscoreColee: {label: 'Walk Score, Colee Hammock, Fort Lauderdale', short: 'Walk Score · Colee Hammock', url: 'https://www.walkscore.com/FL/Fort_Lauderdale/Colee_Hammock'},
  walkscoreSailboat: {label: 'Walk Score, Sailboat Bend, Fort Lauderdale', short: 'Walk Score · Sailboat Bend', url: 'https://www.walkscore.com/FL/Fort_Lauderdale/Sailboat_Bend'},
  walkscoreLasOlas: {label: 'Walk Score, Las Olas Isles, Fort Lauderdale', short: 'Walk Score · Las Olas Isles', url: 'https://www.walkscore.com/FL/Fort_Lauderdale/Las_Olas_Isles'},
  bcps: {label: 'Broward County Public Schools, Find My School (address-based boundary lookup)', short: 'Broward County Public Schools', url: 'https://www.browardschools.com/bcps-departments/strategy-innovation/demographics-enrollment-planning/find-my-school'},
  vsy: {label: 'Virginia Shuman Young Montessori, Broward County Public Schools (public Montessori magnet, PreK-5, 101 NE 11th Avenue)', short: 'BCPS · Virginia Shuman Young Montessori', url: 'https://virginiayoung.browardschools.com/academics/learning-at-our-school/magnet-program'},
  brightline: {label: 'Brightline, About our Fort Lauderdale Station (101 NW 2nd Avenue, Fort Lauderdale, FL 33311)', short: 'Brightline · Fort Lauderdale station', url: 'https://brightlinesupport.zendesk.com/hc/en-us/articles/17371736089883-About-our-Fort-Lauderdale-Station'},
  ftlTransit: {label: 'City of Fort Lauderdale, Public Transportation (Brightline, Broward County Transit, Tri-Rail, Amtrak, LauderGO! Shuttle and Water Trolley, Water Taxi)', short: 'City of Fort Lauderdale · Public Transportation', url: 'https://www.fortlauderdale.gov/Government/Departments/Transportation-and-Mobility/Transportation-Division/Public-Transportation'},
  fortify: {label: 'City of Fort Lauderdale, Fortify Lauderdale stormwater and flood-mitigation program', short: 'City of Fort Lauderdale · Fortify Lauderdale', url: 'https://www.fortlauderdale.gov/Government/Departments/Public-Works/Engineering-Division/Fortify-Lauderdale'},
  victoriaDrainage: {label: 'City of Fort Lauderdale, Victoria Park Neighborhood Stormwater Improvements Project (43,000 feet of pipe, 360 drainage structures, new pump station, January 2026 to early 2028)', short: 'City of Fort Lauderdale · Victoria Park stormwater', url: 'https://www.fortlauderdale.gov/Residents/City-News/Victoria-Park-Neighborhood-Stormwater-Improvements-Project'},
};

export const FTL_SOURCE_ORDER = [
  'victoriaPark', 'lasOlasIsles', 'rioVista', 'coralRidge', 'downtownFtl', 'flaglerVillage',
  'coleeHammock', 'galtMile', 'sailboatBend', 'tarponRiver', 'poinsettiaHeights', 'croissantPark',
  'ftlCity', 'oir', 'walkscoreFtl', 'walkscoreFlagler', 'walkscoreVictoria', 'walkscoreColee',
  'walkscoreSailboat', 'walkscoreLasOlas', 'bcps', 'vsy', 'brightline', 'ftlTransit', 'fortify',
  'victoriaDrainage',
];

export const ftlSourceNumber = (id) => FTL_SOURCE_ORDER.indexOf(id) + 1;
