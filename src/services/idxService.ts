import { Property, Development, MarketCityData } from '../types';

const BASE_URL = import.meta.env.VITE_BRIDGEDATA_BASE_URL || 'https://api.bridgedataoutput.com/api/v2/miamire';
const SERVER_TOKEN = import.meta.env.VITE_BRIDGEDATA_SERVER_TOKEN || 'DEMO_TOKEN';

// Map Bridgedata's RESO fields to your Property interface
interface BridgedataProperty {
  ResourceId: string;
  ListPrice: number;
  BedroomsTotal: number;
  BathroomsTotalInteger: number;
  LivingArea: number;
  PropertyType: string;
  City: string;
  StateOrProvince: string;
  PostalCode: string;
  PublicRemarks: string;
  ListingStatus: string;
  WaterFront?: boolean;
  NewConstruction?: boolean;
  Pool?: boolean;
  LotSizeSquareFeet?: number;
  YearBuilt?: number;
  Photos?: { Uri: string; Order: number }[];
  UnitNumber?: string;
  StreetNumber?: string;
  StreetName?: string;
  StreetSuffix?: string;
  ListOfficeName?: string;
  StandardStatus?: string;
  Neighborhood?: string;
  PropertySubType?: string;
}

class IdxService {
  private async fetchWithToken(endpoint: string, params: Record<string, string> = {}): Promise<any> {
    const queryString = new URLSearchParams({
      ...params,
      access_token: SERVER_TOKEN,
    }).toString();

    const url = `${BASE_URL}/${endpoint}?${queryString}`;
    console.log(`[IdxService] Fetching: ${url.substring(0, 100)}...`);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`[IdxService] Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  // ── Property Listings ──────────────────────────────────────

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
  } = {}): Promise<Property[]> {
    // Build OData $filter
    const filters: string[] = [];

    // Default to active listings
    if (params.status) {
      filters.push(`StandardStatus eq '${params.status}'`);
    } else {
      filters.push(`StandardStatus eq 'Active'`);
    }

    if (params.city) {
      filters.push(`City eq '${params.city}'`);
    }

    if (params.minPrice) {
      filters.push(`ListPrice ge ${params.minPrice}`);
    }

    if (params.maxPrice) {
      filters.push(`ListPrice le ${params.maxPrice}`);
    }

    if (params.beds) {
      filters.push(`BedroomsTotal ge ${params.beds}`);
    }

    if (params.baths) {
      filters.push(`BathroomsTotalInteger ge ${params.baths}`);
    }

    if (params.propertyType && params.propertyType !== 'all') {
      filters.push(`PropertyType eq '${params.propertyType}'`);
    }

    // MiamiRE MLS specific filter
    filters.push(`MlsId eq 'MiamiRE'`);

    const queryParams: Record<string, string> = {
      $filter: filters.join(' and '),
      $top: String(params.limit || 24),
      $skip: String(params.offset || 0),
      $orderby: params.sort || 'ListPrice desc',
      $count: 'true',
    };

    const data = await this.fetchWithToken('listings', queryParams);

    // Transform Bridgedata response to your Property interface
    const properties: Property[] = (data.value || data.bundle || []).map(
      (listing: BridgedataProperty) => ({
        id: listing.ResourceId,
        name: `${listing.StreetNumber || ''} ${listing.StreetName || ''} ${listing.StreetSuffix || ''}`.trim(),
        city: listing.City || '',
        area: this.mapCityToArea(listing.City),
        badge: this.getBadge(listing),
        price: listing.ListPrice || 0,
        beds: listing.BedroomsTotal || 0,
        baths: listing.BathroomsTotalInteger || 0,
        sqft: listing.LivingArea || 0,
        type: listing.PropertyType?.includes('Single Family') ? 'house' : 'condo',
        grad: this.getGradient(),
        img: listing.Photos?.[0]?.Uri || '/placeholder.jpg',
        tags: this.extractTags(listing),
        desc: listing.PublicRemarks || '',
        neighborhood: listing.Neighborhood,
        featured: false,
      })
    );

    return properties;
  }

  // ── Single Property Detail ────────────────────────────────

  async getPropertyById(id: string): Promise<Property | null> {
    const data = await this.fetchWithToken(`listings/${id}`);

    const listing: BridgedataProperty = data.value || data;

    if (!listing || !listing.ResourceId) return null;

    return {
      id: listing.ResourceId,
      name: `${listing.StreetNumber || ''} ${listing.StreetName || ''} ${listing.StreetSuffix || ''}`.trim(),
      city: listing.City || '',
      area: this.mapCityToArea(listing.City),
      badge: this.getBadge(listing),
      price: listing.ListPrice || 0,
      beds: listing.BedroomsTotal || 0,
      baths: listing.BathroomsTotalInteger || 0,
      sqft: listing.LivingArea || 0,
      type: listing.PropertyType?.includes('Single Family') ? 'house' : 'condo',
      grad: this.getGradient(),
      img: listing.Photos?.[0]?.Uri || '/placeholder.jpg',
      tags: this.extractTags(listing),
      desc: listing.PublicRemarks || '',
      neighborhood: listing.Neighborhood,
      featured: false,
    };
  }

  // ── Market Statistics ─────────────────────────────────────

  async getMarketStats(city?: string): Promise<any> {
    const params: Record<string, string> = {
      $apply: `groupby((City))aggregate(ListPrice with average as AvgPrice, ListPrice with max as MaxPrice, ListPrice with min as MinPrice, ListPrice with count as TotalListings)`,
    };

    if (city) {
      params.$filter = `City eq '${city}'`;
    }

    return await this.fetchWithToken('listings', params);
  }

  // ── New Developments / Pre-construction (via custom fields) ──

  async getNewDevelopments(): Promise<Development[]> {
    const data = await this.getProperties({
      status: 'Active',
      limit: 50,
      sort: 'ListPrice desc',
    });

    // Filter for new construction — exact field depends on MLS
    // MiamiRE may use PropertySubType = 'New Construction'
    const filtered = data.filter((p) => p.tags.includes('New construction'));

    // Map to Development interface
    return filtered.slice(0, 6).map((p) => ({
      id: `dev-${p.id}`,
      name: p.name,
      loc: p.city,
      area: this.mapCityToDevArea(p.city),
      from: `From $${(p.price / 2).toLocaleString()}`,
      dev: 'MLS Listing',
      year: new Date().getFullYear().toString(),
      status: 'Active',
      grad: p.grad,
      img: p.img,
      residences: 0,
      desc: p.desc,
    }));
  }

  // ── Helpers ─────────────────────────────────────────────

  private mapCityToArea(city: string): 'miami' | 'ftl' | 'pb' {
    const c = city?.toLowerCase() || '';
    if (c.includes('miami') || c.includes('sunny') || c.includes('coconut') || c.includes('brickell') || c.includes('edgewater') || c.includes('aventura') || c.includes('beach')) {
      return 'miami';
    }
    if (c.includes('fort lauderdale') || c.includes('lauderdale') || c.includes('las olas') || c.includes('tarpon') || c.includes('victoria park') || c.includes('wilton') || c.includes('broward')) {
      return 'ftl';
    }
    if (c.includes('palm beach') || c.includes('boca') || c.includes('delray')) {
      return 'pb';
    }
    return 'miami';
  }

  private mapCityToDevArea(city: string): Development['area'] {
    const c = city?.toLowerCase() || '';
    if (c.includes('sunny')) return 'sunnyisles';
    if (c.includes('edgewater')) return 'edgewater';
    if (c.includes('brickell') || c.includes('downtown miami')) return 'brickell';
    if (c.includes('aventura')) return 'aventura';
    if (c.includes('fort lauderdale') || c.includes('lauderdale')) return 'ftl';
    return 'miami';
  }

  private getBadge(listing: BridgedataProperty): string {
    if (listing.WaterFront) return 'Waterfront';
    if (listing.NewConstruction) return 'New Construction';
    if (listing.PropertyType === 'Condo' || listing.PropertyType === 'Condominium') return 'Condo';
    if (listing.Pool) return 'Pool';
    return 'Active';
  }

  private extractTags(listing: BridgedataProperty): string[] {
    const tags: string[] = [];
    if (listing.WaterFront) tags.push('Waterfront');
    if (listing.NewConstruction) tags.push('New construction');
    if (listing.Pool) tags.push('Pool');
    if (listing.LotSizeSquareFeet && listing.LotSizeSquareFeet > 10000) tags.push('Large lot');
    if (listing.YearBuilt && listing.YearBuilt >= 2020) tags.push('Newer construction');
    if (listing.PropertyType === 'Condo' || listing.PropertyType === 'Condominium') tags.push('Condo');
    if (listing.PropertyType?.includes('Single Family')) tags.push('House');
    tags.push('Luxury');
    return tags;
  }

  private gradients = ['g-dusk', 'g-sunset', 'g-ocean', 'g-night', 'g-interior', 'g-tower'];
  private gradIndex = 0;

  private getGradient(): string {
    const g = this.gradients[this.gradIndex % this.gradients.length];
    this.gradIndex++;
    return g;
  }
}

export const idxService = new IdxService();
