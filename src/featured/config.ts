// @ts-nocheck
// South Florida Elevated: "Elevated Listings" section config (working name, see PR notes).
// Hubs are neighborhood listing pages driven by the live MLS feed through /api/idx.
// Nothing here is listing data. All listing facts come from the feed at request time.

export const SECTION = {
  name: 'Elevated Listings',
  tagline: 'New listings, price changes and sales across South Florida, curated by Miguel Perez.',
  // Instagram handle is a decision for Miguel. Not claimed yet, so it is not shown as a link anywhere.
  handleSuggestion: '@elevatedlistings',
};

// `filter` is an OData clause for the Bridge MLS feed (see api/idx.js for what the proxy allows).
export const HUBS = [
  {
    id: 'miami-beach', path: '/featured/miami-beach', city: 'Miami Beach', short: 'Miami Beach',
    filter: "City eq 'Miami Beach'",
    blurb: 'Oceanfront condos, Bay Road estates and the islands: what just listed, dropped or closed in Miami Beach.',
    guide: '/guides/miami', guideLabel: 'Miami Neighborhood Guide',
  },
  {
    id: 'brickell', path: '/featured/brickell', city: 'Brickell, Miami', short: 'Brickell',
    filter: "City eq 'Miami' and PostalCode eq '33131'",
    blurb: 'Brickell and the downtown waterfront: towers, bay views and walkable living, updated from the MLS.',
    guide: '/guides/miami', guideLabel: 'Miami Neighborhood Guide',
  },
  {
    id: 'coral-gables', path: '/featured/coral-gables', city: 'Coral Gables', short: 'Coral Gables',
    filter: "City eq 'Coral Gables'",
    blurb: 'The City Beautiful: Mediterranean estates, Gables Estates waterfront and condo living near Miracle Mile.',
    guide: '/guides/miami', guideLabel: 'Miami Neighborhood Guide',
  },
  {
    id: 'fort-lauderdale', path: '/featured/fort-lauderdale', city: 'Fort Lauderdale', short: 'Fort Lauderdale',
    filter: "City eq 'Fort Lauderdale'",
    blurb: 'Las Olas, the Isles and the Galt Mile: Fort Lauderdale listings and closings as they hit the MLS.',
    guide: '/guides/fort-lauderdale', guideLabel: 'Fort Lauderdale Neighborhood Guide',
  },
];

export const getHub = (id) => HUBS.find((h) => h.id === id) || null;

// The feed tabs. Each has its own query (see feed.ts).
export const KINDS = [
  {id: 'new', label: 'New Listings', badge: 'NEW LISTING', blurb: 'Entered the MLS in the last 21 days.'},
  {id: 'price', label: 'Price Changes', badge: 'PRICE CHANGE', blurb: 'Active homes with a list-price change in the last 21 days.'},
  {id: 'sold', label: 'Just Sold', badge: 'JUST SOLD', blurb: 'Closed in the last 60 days.'},
];

// What an agent can ask for. Prices are intentionally absent: Miguel has not set them yet.
export const FORMATS = [
  {id: 'listing-page', name: 'Listing feature page', desc: 'Your listing on southfloridaelevated.com with your photos, details and credit to you and your brokerage.'},
  {id: 'single', name: 'Single-image post', desc: 'One branded post with your best photo, address, price and status.'},
  {id: 'carousel', name: 'Carousel', desc: 'A swipeable set of your photos with the Elevated Listings panel on every slide.'},
  {id: 'story', name: 'Story + highlight', desc: 'Your listing in Stories, saved to a highlight on the profile.'},
  {id: 'reel', name: 'Reel', desc: 'A short video of the property as a Reel.'},
  {id: 'email', name: 'Weekly email', desc: 'Your listing in the weekly Elevated Listings email.'},
];

export const STATUSES = ['New listing', 'Coming soon', 'Price change', 'Open house', 'Back on market', 'Under contract', 'Just sold', 'For rent'];
