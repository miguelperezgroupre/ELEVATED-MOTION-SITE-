import { Property, Development, MarketCityData } from '../types';

// ── Configuration ─────────────────────────────────────────────
// These are set via Vite environment variables (.env file)
// VITE_BRIDGEDATA_SERVER_TOKEN = your server token from Bridgedata
// VITE_BRIDGEDATA_BROWSER_TOKEN = your browser token from Bridgedata
// VITE_BRIDGEDATA_DATASET = e.g. 'miamire' or 'test' (for testing)
// VITE_BRIDGEDATA_USE_ODATA = 'true' for OData endpoint, 'false' for REST

const SERVER_TOKEN = import.meta.env.VITE_BRIDGEDATA_SERVER_TOKEN || '';
const BROWSER_TOKEN = import.meta.env.VITE_BRIDGEDATA_BROWSER_TOKEN || '';
const DATASET = import.meta.env.VITE_BRIDGEDATA_DATASET || 'miamire';
const USE_ODATA = import.meta.env.VITE_BRIDGEDATA_USE_ODATA === 'true';

// The token to use — prefer server token, fall back to browser token
const ACCESS_TOKEN = SERVER_TOKEN || BROWSER_TOKEN || '';

// Base URL depends on whether we're using OData or REST
const BASE_URL = USE_ODATA
  ? `https://api.bridgedataoutput.com/api/v2/OData/${DATASET}`
  : `https://api.bridgedataoutput.com/api/v2/pub`;

// ── Types ─────────────────────────────────────────────────────

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
  StreetNumber?: string;
  StreetName?: string;
  StreetSuffix?: string;
  UnitNumber?: string;
  Neighborhood?: string;
  PropertySubType?: string;
  StandardStatus?: string;
  MlsId?: string;
  Media?: { MediaURL?: string; MediaCategory?: string }[];
}

// ── Mock Fallback Data ────────────────────────────────────────
// Used when the API is unavailable or credentials are invalid

import { PROPERTIES } from '../data';

// ── Service ───────────────────────────────────────────────────

class IdxService {
  private isUsingMockData = false;

  private async fetchWithToken(endpoint: string, params: Record<string, string> = {}): Promise<any> {
    if (!ACCESS_TOKEN) {
      throw new Error('No Bridgedata API token configured. Set VITE_BRIDGEDATA_SERVER_TOKEN in .env');
    }

    const queryString = new URLSearchParams({
      ...params,
      access_token: ACCESS_TOKEN,
    }).toString();

    const url = `${BASE_URL}/${endpoint}?${queryString}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        const msg = errBody?.bundle?.message || errBody?.error?.message || `HTTP ${response.status}`;
        throw new Error(msg);
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
  } = {}): Promise<Property[]> {
    // Try the real API first
    try {
      const data = await this.fetchFromApi(params);
      this.isUsingMockData = false;
      return data;
    } catch (error) {
      console.warn('[IdxService] API failed, falling back to mock data:', error);
      this.isUsingMockData = true;
      return this.getMockProperties(params);
    }
  }

  private async fetchFromApi(params: {
    city?: string; propertyType?: string; minPrice?: number; maxPrice?: number;
    beds?: number; baths?: number; limit?: number; offset?: number;
    status?: string; sort?: string;
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
    status?: string; sort?: string;
  }): Promise<Property[]> {
    const filters: string[] = [];

    if (params.status) {
      filters.push(`StandardStatus eq '${params.status}'`);
    } else {
      filters.push(`StandardStatus eq 'Active'`);
    }
    if (params.city) filters.push(`City eq '${params.city}'`);
    if (params.minPrice) filters.push(`ListPrice ge ${params.minPrice}`);
    if (params.maxPrice) filters.push(`ListPrice le ${params.maxPrice}`);
    if (params.beds) filters.push(`BedroomsTotal ge ${params.beds}`);
    if (params.baths) filters.push(`BathroomsTotalInteger ge ${params.baths}`);
    if (params.propertyType && params.propertyType !== 'all') {
      filters.push(`PropertyType eq '${params.propertyType}'`);
    }

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
    status?: string; sort?: string;
  }): Promise<Property[]> {
    const filters: string[] = [];
    if (params.status) {
      filters.push(`StandardStatus eq '${params.status}'`);
    } else {
      filters.push(`StandardStatus eq 'Active'`);
    }
    if (params.city) filters.push(`City eq '${params.city}'`);
    if (params.minPrice) filters.push(`ListPrice ge ${params.minPrice}`);
    if (params.maxPrice) filters.push(`ListPrice le ${params.maxPrice}`);
    if (params.beds) filters.push(`BedroomsTotal ge ${params.beds}`);
    if (params.baths) filters.push(`BathroomsTotalInteger ge ${params.baths}`);
    if (params.propertyType && params.propertyType !== 'all') {
      filters.push(`PropertyType eq '${params.propertyType}'`);
    }

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
        const data = await this.fetchWithToken(`Property(${id})`);
        const listing: BridgedataProperty = data;
        if (!listing?.ResourceId) return null;
        return this.mapListing(listing, 0);
      } else {
        const data = await this.fetchWithToken(`listings/${id}`);
        const listing: BridgedataProperty = data.value || data;
        if (!listing?.ResourceId) return null;
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
    if (l.Photos?.[0]?.Uri) {
      img = l.Photos[0].Uri;
    } else if (l.Media?.[0]?.MediaURL) {
      img = l.Media[0].MediaURL;
    }

    return {
      id: l.ResourceId || `prop-${i}`,
      name: `${l.StreetNumber || ''} ${l.StreetName || ''} ${l.StreetSuffix || ''}`.trim() || `Property #${i + 1}`,
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
      tags: this.extractTags(l),
      desc: l.PublicRemarks || '',
      neighborhood: l.Neighborhood || l.City,
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
    if (l.WaterFront) return 'Waterfront';
    if (l.NewConstruction) return 'New Construction';
    if (l.PropertyType?.toLowerCase().includes('condo')) return 'Condo';
    if (l.Pool) return 'Pool';
    return 'Listed';
  }

  private getPropertyType(l: BridgedataProperty): 'house' | 'condo' {
    const t = (l.PropertyType || '').toLowerCase();
    return t.includes('single family') || t.includes('townhouse') || t.includes('house') || t.includes('residential') ? 'house' : 'condo';
  }

  private extractTags(l: BridgedataProperty): string[] {
    const tags: string[] = [];
    if (l.WaterFront) tags.push('Waterfront');
    if (l.NewConstruction) tags.push('New construction');
    if (l.Pool) tags.push('Pool');
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
