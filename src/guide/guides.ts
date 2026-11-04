// @ts-nocheck
// South Florida Elevated: the downloadable guide library.
// Each entry is one PDF in /public/guides, its gated landing page at /guides/<id>,
// and the intent + market area recorded on the lead when someone submits the form.
export const GUIDES = [
  {
    id: 'miami',
    city: 'Miami',
    title: 'The Miami Neighborhood Guide',
    marketArea: 'Miami',
    intent: 'Miami Neighborhood Guide Download',
    pages: 20,
    updated: 'November 2026',
    pdf: '/guides/sfe-miami-neighborhood-guide.pdf',
    fileName: 'South-Florida-Elevated-Miami-Neighborhood-Guide',
    cover: '/guides/covers/miami-cover.webp',
    blurb: 'Fourteen Miami neighborhoods, each with a sourced median price, a walk score, the school ratings buyers ask about, and the flood exposure that decides your insurance bill. Brickell, Edgewater, Wynwood, Coconut Grove, Coral Gables, Little Havana, Miami Beach, Aventura, Key Biscayne, Doral and more.',
    blurbShort: 'Fourteen neighborhoods, sourced medians, walk scores and flood risk.',
    bullets: [
      'Median sale price and price per square foot for all 14 neighborhoods',
      'Walk Score, the assigned-school picture and flood exposure for each',
      'The honest trade-offs, including what a falling median actually means',
      'Every figure numbered to the source page in the back of the guide',
    ],
  },
  {
    id: 'fort-lauderdale',
    city: 'Fort Lauderdale',
    title: 'The Fort Lauderdale Neighborhood Guide',
    marketArea: 'Fort Lauderdale',
    intent: 'Fort Lauderdale Neighborhood Guide Download',
    pages: 19,
    updated: 'November 2026',
    pdf: '/guides/sfe-fort-lauderdale-neighborhood-guide.pdf',
    fileName: 'South-Florida-Elevated-Fort-Lauderdale-Neighborhood-Guide',
    cover: '/guides/covers/fort-lauderdale-cover.webp',
    blurb: 'Fort Lauderdale neighborhood by neighborhood, from Las Olas and Victoria Park to Flagler Village and the Galt Mile, with sourced median prices, walk scores and the flood exposure that decides your insurance bill.',
    blurbShort: 'Las Olas to the Galt Mile, with sourced medians and flood risk.',
    bullets: [
      'Median sale price and price per square foot for all 12 neighborhoods',
      'Walk Score and the commuting picture for each area',
      'Flood exposure, because it decides your insurance bill',
      'Every figure numbered to the source page in the back of the guide',
    ],
  },
];

export const getGuide = (id) => GUIDES.find((g) => g.id === id) || null;
