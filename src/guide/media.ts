// @ts-nocheck
// South Florida Elevated: the photo library in /public/media.
// Every file is a web-optimized render of a photograph Miguel supplied. Slugs are stable:
// <slug>-700/-1100/-1600/-2200.webp for pages (only the widths that exist for that original),
// <slug>-1600.jpg for email, and <slug>-og.jpg (1200x630) for Open Graph and social shares.
// Keep the slug when a source photo is replaced so links and covers do not break.
export const PHOTOS = [
  {slug: 'palm-lined-shopping-promenade', alt: 'A palm-lined sidewalk outside glass-fronted shops and galleries on a bright South Florida afternoon', tags: ["lifestyle", "shopping"], width: 738, height: 1234},
  {slug: 'biscayne-bay-boat-bow-skyline', alt: 'The bow of a boat on turquoise Biscayne Bay with the Miami skyline on the horizon', tags: ["miami", "water", "boating"], width: 862, height: 1164},
  {slug: 'waterfront-promenade-palms', alt: 'A palm-lined waterfront promenade and seawall leading toward a high-rise skyline', tags: ["miami", "waterfront", "walkability"], width: 734, height: 1090},
  {slug: 'aerial-sunset-coastal-skyline', alt: 'An aerial view of a coastal city skyline at sunset with a causeway bridge and a strip of beach', tags: ["miami", "aerial", "sunset"], width: 904, height: 1244},
  {slug: 'beachfront-towers-dusk', alt: 'A line of beachfront high-rise towers above the Atlantic at dusk', tags: ["beachfront", "condos", "sunset"], width: 2716, height: 1668},
  {slug: 'downtown-miami-aerial-biscayne-bay', alt: 'An aerial view over downtown Miami high-rises toward Biscayne Bay and PortMiami', tags: ["miami", "aerial", "downtown"], width: 700, height: 1242},
  {slug: 'high-rise-cluster-ocean-slice', alt: 'A dense cluster of modern high-rise buildings with a slice of turquoise ocean between them', tags: ["condos", "architecture", "ocean"], width: 2716, height: 1668},
  {slug: 'twin-towers-beach-amenities', alt: 'Twin white beachfront towers with pools, tennis courts and the ocean behind them', tags: ["condos", "amenities", "beachfront"], width: 2716, height: 1668},
  {slug: 'florida-peninsula-satellite', alt: 'A satellite view of the southern Florida peninsula, the Keys and the shallow turquoise shelf', tags: ["south-florida", "map", "regional"], width: 1254, height: 1254},
  {slug: 'florida-keys-satellite-square', alt: 'A square satellite view of South Florida, the Florida Keys and the Bahamas to the east', tags: ["south-florida", "map"], width: 1254, height: 1254},
  {slug: 'florida-keys-bahamas-satellite', alt: 'A vertical satellite view of South Florida with the Keys curving southwest into turquoise water', tags: ["south-florida", "map", "vertical"], width: 1145, height: 1374},
];

export const getPhoto = (slug) => PHOTOS.find((p) => p.slug === slug) || PHOTOS[0];

const WIDTHS = [700, 1100, 1600, 2200];
const widthsFor = (p) => {
  const w = WIDTHS.filter((x) => x <= p.width);
  return w.length ? w : [700];
};

/** srcset for a photo slug, built from the widths that actually exist for that file. */
export const srcSet = (slug) => {
  const p = getPhoto(slug);
  return widthsFor(p).map((w) => `/media/${slug}-${w}.webp ${w}w`).join(', ');
};
/** Largest available webp. */
export const src = (slug) => {
  const p = getPhoto(slug);
  const w = widthsFor(p);
  return `/media/${slug}-${w[w.length - 1]}.webp`;
};
export const og = (slug) => `/media/${slug}-og.jpg`;
export const email = (slug) => `/media/${slug}-1600.jpg`;
