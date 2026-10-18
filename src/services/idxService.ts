import { Property, Development, MarketCityData } from '../types';

// ── Configuration ─────────────────────────────────────────────
// All MLS requests go through the server-side proxy at /api/idx (api/idx.js),
// which adds the Bridge access token from Vercel env vars. No token in client code.
const IDX_PROXY = '/api/idx';
const USE_ODATA = true; // production uses the miamire OData endpoint

// ── Data-quality guards ───────────────────────────────────────
// The miamire feed includes out-of-state/international and placeholder records
// (e.g. '1 Partizanske Avijacije', $500,000,000, 0 bd / 0 ba / 0 sqft).
// Anything above this cap is treated as a data-entry error.
export const MAX_SANE_LIST_PRICE = 250_000_000;

/** OData clauses that keep only complete, Florida residential-looking records. */
function qualityFilters(): string[] {
  return [
    `StateOrProvince eq 'FL'`,
    `ListPrice gt 0`,
    `ListPrice le ${MAX_SANE_LIST_PRICE}`,
    `BedroomsTotal gt 0`,
    `BathroomsTotalInteger gt 0`,
    `LivingArea gt 0`,
  ];
}

/** Client-side backstop, in case the API ignores a clause or a field is null. */
export function isDisplayableListing(p: Property): boolean {
  return (
    p.price > 0 &&
    p.price <= MAX_SANE_LIST_PRICE &&
    p.beds > 0 &&
    p.baths > 0 &&
    p.sqft > 0 &&
    !!p.city
  );
}

// ── Types ─────────────────────────────────────────────────────

interface BridgedataProperty {
  ListingKey?: string;
  ListingId?: string;
  ListPrice: number;
  BedroomsTotal: number;
  BathroomsTotalInteger: number;
  LivingArea: number;
  PropertyType: string;
  City: string;
  StateOrProvince: string;
  PostalCode: string;
  PublicRemarks: string;
  StandardStatus: string;
  WaterfrontYN?: boolean;
  NewConstructionYN?: boolean;
  PoolPrivateYN?: boolean;
  LotSizeSquareFeet?: number;
  YearBuilt?: number;
  StreetNumber?: string;
  StreetName?: string;
  StreetSuffix?: string;
  UnitNumber?: string;
  SubdivisionName?: string;
  PropertySubType?: string;
  UnparsedAddress?: string;
  PhotosCount?: number;
  Media?: { MediaURL?: string; MediaCategory?: string; MediaObjectID?: string; MediaKey?: string }[];
}

// ── Mock Fallback Data ────────────────────────────────────────
// Used when the API is unavailable or credentials are invalid

import { PROPERTIES } from '../data';

// ── Service ───────────────────────────────────────────────────

class IdxService {
  private isUsingMockData = false;

  private async fetchWithToken(endpoint: string, params: Record<string, string> = {}): Promise<any> {
    const queryString = new URLSearchParams({
      ...params,
      resource: endpoint,
      ...(USE_ODATA ? {} : { api: 'pub' }),
    }).toString();

    const url = `${IDX_PROXY}?${queryString}`;

    try {
      const response = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody?.error || `HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`[IdxService] Fetch error:`, error);
      throw error;
    }
  }

  async getProperties(params: {
    city?: string;
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    beds?: number;
    baths?: number;
    limit?: number;
    offset?: number;
    status?: string;
    sort?: string;
    farmAreas?: boolean;
    /** Drop incomplete/out-of-state/placeholder records (default true). */
    requireComplete?: boolean;
  } = {}): Promise<Property[]> {
    // Try the real API first
    try {
      const data = await this.fetchFromApi(params);
      this.isUsingMockData = false;
      return params.requireComplete === false ? data : data.filter(isDisplayableListing);
    } catch (error) {
      console.warn('[IdxService] API failed, falling back to mock data:', error);
      this.isUsingMockData = true;
      return this.getMockProperties(params);
    }
  }

  private async fetchFromApi(params: {
    city?: string; propertyType?: string; minPrice?: number; maxPrice?: number;
    beds?: number; baths?: number; limit?: number; offset?: number;
    status?: string; sort?: string; farmAreas?: boolean; requireComplete?: boolean;
  }): Promise<Property[]> {
    if (USE_ODATA) {
      return this.fetchODataProperties(params);
    } else {
      return this.fetchRestProperties(params);
    }
  }

  private async fetchODataProperties(params: {
    city?: string; propertyType?: string; minPrice?: number; maxPrice?: number;
    beds?: number; baths?: number; limit?: number; offset?: number;
    status?: string; sort?: string; farmAreas?: boolean; requireComplete?: boolean;
  }): Promise<Property[]> {
    const filters: string[] = [];

    if (params.status) {
      filters.push(`StandardStatus eq '${params.status}'`);
    } else {
      filters.push(`StandardStatus eq 'Active'`);
    }
    if (params.city) filters.push(`City eq '${params.city}'`);
    if (params.farmAreas) {
      // Miguel's farming areas — South Florida Elevated local authority wedge:
      //   Miami East (Brickell/Downtown/Edgewater/Upper East Side) = areas 11,12,40,41,42,43
      //   Las Olas East (Las Olas Isles/SE Fort Lauderdale)       = areas 3280,3600,3800
      filters.push(
        `((City eq 'Miami' and MIAMIRE_Area in ('11','12','40','41','42','43')) ` +
        `or (City eq 'Fort Lauderdale' and MIAMIRE_Area in ('3280','3600','3800')))`
      );
    }
    if (params.minPrice) filters.push(`ListPrice ge ${params.minPrice}`);
    if (params.maxPrice) filters.push(`ListPrice le ${params.maxPrice}`);
    if (params.beds) filters.push(`BedroomsTotal ge ${params.beds}`);
    if (params.baths) filters.push(`BathroomsTotalInteger ge ${params.baths}`);
    if (params.propertyType && params.propertyType !== 'all') {
      filters.push(`PropertyType eq '${params.propertyType}'`);
    }
    if (params.requireComplete !== false) filters.push(...qualityFilters());

    const queryParams: Record<string, string> = {
      $filter: filters.join(' and '),
      $top: String(params.limit || 24),
      $skip: String(params.offset || 0),
      $orderby: params.sort || 'ListPrice desc',
      $count: 'true',
    };

    const data = await this.fetchWithToken('Property', queryParams);
    return (data.value || []).map((l: BridgedataProperty, i: number) => this.mapListing(l, i));
  }

  private async fetchRestProperties(params: {
    city?: string; propertyType?: string; minPrice?: number; maxPrice?: number;
    beds?: number; baths?: number; limit?: number; offset?: number;
    status?: string; sort?: string; farmAreas?: boolean; requireComplete?: boolean;
  }): Promise<Property[]> {
    const filters: string[] = [];
    if (params.status) {
      filters.push(`StandardStatus eq '${params.status}'`);
    } else {
      filters.push(`StandardStatus eq 'Active'`);
    }
    if (params.city) filters.push(`City eq '${params.city}'`);
    if (params.farmAreas) {
      filters.push(
        `((City eq 'Miami' and MIAMIRE_Area in ('11','12','40','41','42','43')) ` +
        `or (City eq 'Fort Lauderdale' and MIAMIRE_Area in ('3280','3600','3800')))`
      );
    }
    if (params.minPrice) filters.push(`ListPrice ge ${params.minPrice}`);
    if (params.maxPrice) filters.push(`ListPrice le ${params.maxPrice}`);
    if (params.beds) filters.push(`BedroomsTotal ge ${params.beds}`);
    if (params.baths) filters.push(`BathroomsTotalInteger ge ${params.baths}`);
    if (params.propertyType && params.propertyType !== 'all') {
      filters.push(`PropertyType eq '${params.propertyType}'`);
    }
    if (params.requireComplete !== false) filters.push(...qualityFilters());

    const queryParams: Record<string, string> = {
      $filter: filters.join(' and '),
      $top: String(params.limit || 24),
      $skip: String(params.offset || 0),
      $orderby: params.sort || 'ListPrice desc',
      $count: 'true',
    };

    const data = await this.fetchWithToken('listings', queryParams);
    return (data.value || data.bundle || []).map((l: BridgedataProperty, i: number) => this.mapListing(l, i));
  }

  async getPropertyById(id: string): Promise<Property | null> {
    try {
      if (USE_ODATA) {
        const data = await this.fetchWithToken(`Property('${id}')`);
        const listing: BridgedataProperty = data;
        if (!listing?.ListingKey && !listing?.ListingId) return null;
        return this.mapListing(listing, 0);
      } else {
        const data = await this.fetchWithToken(`listings/${id}`);
        const listing: BridgedataProperty = data.value || data;
        if (!listing?.ListingKey && !listing?.ListingId) return null;
        return this.mapListing(listing, 0);
      }
    } catch {
      // Fallback to mock
      return PROPERTIES.find(p => p.id === id) || null;
    }
  }

  async isApiWorking(): Promise<boolean> {
    try {
      await this.fetchWithToken('Property', { $top: '1' });
      return true;
    } catch {
      return false;
    }
  }

  // ── Mock Data Fallback ────────────────────────────────────

  private getMockProperties(params: {
    city?: string; propertyType?: string; minPrice?: number; maxPrice?: number;
    beds?: number; baths?: number; limit?: number; offset?: number; sort?: string;
  }): Property[] {
    let result = [...PROPERTIES];

    if (params.city) {
      result = result.filter(p => p.city.toLowerCase().includes(params.city!.toLowerCase()));
    }
    if (params.propertyType && params.propertyType !== 'all') {
      const isHouse = params.propertyType.toLowerCase().includes('single family') || params.propertyType.toLowerCase().includes('townhouse');
      result = result.filter(p => p.type === (isHouse ? 'house' : 'condo'));
    }
    if (params.minPrice) result = result.filter(p => p.price >= params.minPrice!);
    if (params.maxPrice) result = result.filter(p => p.price <= params.maxPrice!);
    if (params.beds) result = result.filter(p => p.beds >= params.beds!);
    if (params.baths) result = result.filter(p => p.baths >= params.baths!);

    result.sort((a, b) => {
      switch (params.sort) {
        case 'ListPrice asc': return a.price - b.price;
        case 'BedroomsTotal desc': return b.beds - a.beds;
        case 'LivingArea desc': return b.sqft - a.sqft;
        default: return b.price - a.price;
      }
    });

    return result.slice(0, params.limit || 24);
  }

  // ── Mapping ─────────────────────────────────────────────

  private mapListing(l: BridgedataProperty, i: number): Property {
    // Get photo URL - handle both OData (Media) and REST (Photos) formats
    let img = '/placeholder.jpg';
    if (l.Media?.[0]?.MediaURL) {
      img = l.Media[0].MediaURL;
    } else if (l.Photos?.[0]?.Uri) {
      img = l.Photos[0].Uri;
    } else if (l.Photos?.[0]?.Uri800) {
      img = l.Photos[0].Uri800;
    }

    // Collect ALL photos (full-res originals from the MLS CDN)
    const photos: string[] = [];
    if (l.Media && l.Media.length > 0) {
      l.Media.forEach((m) => {
        if (m.MediaURL && m.MediaCategory !== 'Floor Plan' && m.MediaCategory !== 'Map') {
          photos.push(m.MediaURL);
        }
      });
    } else if (l.Photos) {
      l.Photos.forEach((p) => {
        if (p.Uri) photos.push(p.Uri);
      });
    }

    return {
      id: l.ListingKey || l.ListingId || `prop-${i}`,
      name: l.UnparsedAddress || `${l.StreetNumber || ''} ${l.StreetName || ''} ${l.StreetSuffix || ''}`.trim() || `Property #${i + 1}`,
      city: l.City || '',
      area: this.mapCityToArea(l.City),
      badge: this.getBadge(l),
      price: l.ListPrice || 0,
      beds: l.BedroomsTotal || 0,
      baths: l.BathroomsTotalInteger || 0,
      sqft: l.LivingArea || 0,
      type: this.getPropertyType(l),
      grad: this.gradients[i % this.gradients.length],
      img,
      photos: photos.length > 0 ? photos : undefined,
      tags: this.extractTags(l),
      desc: l.PublicRemarks || '',
      neighborhood: l.SubdivisionName || l.City,
      featured: false,
    };
  }

  private mapCityToArea(city: string | undefined): 'miami' | 'ftl' | 'pb' {
    const c = city?.toLowerCase() || '';
    if (/miami|sunny|grove|gables|brickell|edgewater|aventura|beach/.test(c)) return 'miami';
    if (/fort lauderdale|lauderdale|las olas|tarpon|victoria park|wilton|broward/.test(c)) return 'ftl';
    if (/palm beach|boca|delray|jupiter/.test(c)) return 'pb';
    return 'miami';
  }

  private getBadge(l: BridgedataProperty): string {
    if (l.WaterfrontYN) return 'Waterfront';
    if (l.NewConstructionYN) return 'New Construction';
    if (l.PropertyType?.toLowerCase().includes('condo')) return 'Condo';
    if (l.PoolPrivateYN) return 'Pool';
    return 'Listed';
  }

  private getPropertyType(l: BridgedataProperty): 'house' | 'condo' {
    const t = (l.PropertyType || '').toLowerCase();
    return t.includes('single family') || t.includes('townhouse') || t.includes('house') || t.includes('residential') ? 'house' : 'condo';
  }

  private extractTags(l: BridgedataProperty): string[] {
    const tags: string[] = [];
    if (l.WaterfrontYN) tags.push('Waterfront');
    if (l.NewConstructionYN) tags.push('New construction');
    if (l.PoolPrivateYN) tags.push('Pool');
    if ((l.LotSizeSquareFeet || 0) > 10000) tags.push('Large lot');
    if ((l.YearBuilt || 0) >= 2020) tags.push('Newer construction');
    if (l.PropertyType?.toLowerCase().includes('condo')) tags.push('Condo');
    if (this.getPropertyType(l) === 'house') tags.push('House');
    tags.push('Luxury');
    return tags;
  }

  private gradients = ['g-dusk', 'g-sunset', 'g-ocean', 'g-night', 'g-interior', 'g-tower'];
}

export const idxService = new IdxService();
