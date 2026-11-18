// @ts-nocheck
// South Florida Elevated: listing feed for the Elevated Listings hubs.
// Everything is read from the existing /api/idx proxy, which strips confidential MLS fields
// server-side. We only ask for the fields below and never show agent names or contact details,
// only the listing brokerage ("Listing courtesy of").
import {KINDS} from './config';

const SELECT = [
  'ListingKey', 'ListingId', 'UnparsedAddress', 'City', 'PostalCode', 'StateOrProvince',
  'ListPrice', 'PreviousListPrice', 'ClosePrice', 'CloseDate', 'StandardStatus',
  'BedroomsTotal', 'BathroomsTotalInteger', 'LivingArea', 'LotSizeAcres', 'LotSizeSquareFeet', 'PropertySubType',
  'OriginalEntryTimestamp', 'MajorChangeType', 'MajorChangeTimestamp', 'ListOfficeName', 'PhotosCount', 'Media',
].join(',');

const DAY = 86400000;
const iso = (d) => new Date(d).toISOString().slice(0, 10);

function clauseFor(kind, now = Date.now()) {
  const base = "PropertyType eq 'Residential' and InternetAddressDisplayYN eq true and InternetEntireListingDisplayYN eq true and ListPrice gt 0 and ListPrice le 250000000";
  if (kind === 'new') return {where: `StandardStatus eq 'Active' and ${base} and OriginalEntryTimestamp ge ${iso(now - 21 * DAY)}T00:00:00Z`, order: 'OriginalEntryTimestamp desc'};
  if (kind === 'price') return {where: `StandardStatus eq 'Active' and ${base} and MajorChangeType eq 'Price Decrease' and MajorChangeTimestamp ge ${iso(now - 21 * DAY)}T00:00:00Z`, order: 'MajorChangeTimestamp desc'};
  if (kind === 'sold') return {where: `StandardStatus eq 'Closed' and ${base} and ClosePrice gt 0 and CloseDate ge ${iso(now - 60 * DAY)} and CloseDate le ${iso(now)}`, order: 'CloseDate desc'};
  throw new Error('Unknown kind');
}

export const money = (n) => (typeof n === 'number' && isFinite(n) ? '$' + Math.round(n).toLocaleString('en-US') : '');

/** Raw MLS record -> the small card model. Returns null when the record is not displayable. */
export function toCard(r, kind) {
  if (!r || !r.UnparsedAddress || !(r.ListPrice > 0)) return null;
  const photos = (Array.isArray(r.Media) ? r.Media : [])
    .filter((m) => m && m.MediaURL && (!m.MediaCategory || m.MediaCategory === 'Photo'))
    .sort((a, b) => (a.Order || 0) - (b.Order || 0));
  const comma = r.UnparsedAddress.indexOf(',');
  const street = (comma > -1 ? r.UnparsedAddress.slice(0, comma) : r.UnparsedAddress).replace(/\s+#\s*/, ' #').trim();
  const rest = comma > -1 ? r.UnparsedAddress.slice(comma + 1).trim() : [r.City, r.StateOrProvince, r.PostalCode].filter(Boolean).join(' ');
  const price = kind === 'sold' ? r.ClosePrice : r.ListPrice;
  const reduced = kind === 'price' && r.PreviousListPrice > r.ListPrice;
  const acres = r.LotSizeAcres > 0 ? r.LotSizeAcres : r.LotSizeSquareFeet > 0 ? r.LotSizeSquareFeet / 43560 : 0;
  return {
    key: r.ListingKey || r.ListingId,
    mls: r.ListingId,
    street, cityLine: rest,
    price, listPrice: r.ListPrice, previousPrice: reduced ? r.PreviousListPrice : 0,
    kind, badge: kind === 'new' ? 'NEW LISTING' : kind === 'sold' ? 'JUST SOLD' : 'PRICE REDUCED',
    beds: r.BedroomsTotal || 0, baths: r.BathroomsTotalInteger || 0, sqft: r.LivingArea || 0, acres,
    type: r.PropertySubType || '',
    closeDate: r.CloseDate || '',
    changed: r.MajorChangeTimestamp || '',
    photo: photos[0] ? photos[0].MediaURL : '',
    photoCount: r.PhotosCount || photos.length || 0,
    office: r.ListOfficeName || '',
  };
}

/** Fetch one tab of one hub. `limit` is how many cards to return after filtering. */
export async function fetchHubKind(hub, kind, {limit = 12, signal} = {}) {
  const {where, order} = clauseFor(kind);
  const qs = new URLSearchParams({
    resource: 'Property',
    $filter: `${hub.filter} and ${where}`,
    $orderby: order,
    $top: String(Math.min(limit * 2, 40)), // headroom for records without a photo
    $select: SELECT,
  });
  const res = await fetch(`/api/idx?${qs}`, {headers: {Accept: 'application/json'}, signal});
  if (!res.ok) throw new Error(`Feed ${res.status}`);
  const json = await res.json();
  const cards = (json.value || []).map((r) => toCard(r, kind)).filter((c) => c && c.photo);
  return cards.slice(0, limit);
}

export const kindMeta = (id) => KINDS.find((k) => k.id === id) || KINDS[0];
