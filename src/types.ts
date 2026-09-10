export type ViewType = 
  | 'home' 
  | 'buy' 
  | 'sell' 
  | 'relocate' 
  | 'invest' 
  | 'developments' 
  | 'neighborhoods' 
  | 'insights' 
  | 'about';

export type IntentType = 
  | 'seller' 
  | 'buyer' 
  | 'relocation' 
  | 'investor' 
  | 'development' 
  | 'general' 
  | 'report';

export interface Property {
  id: string;
  name: string;
  city: string;
  area: 'miami' | 'ftl' | 'pb';
  badge: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: 'house' | 'condo';
  grad: string;
  img: string;
  tags: string[];
  desc: string;
  neighborhood?: string;
  featured?: boolean;
}

export interface FeaturedListing {
  id: string;
  /** Street line, e.g. "176 S Hibiscus Drive" */
  address: string;
  city: string;
  state: string;
  zip: string;
  status: 'For Sale' | 'For Rent' | 'Pending' | 'Sold';
  price: number;
  beds: number;
  baths: number;
  /** Null when the MLS record has no living-area figure. */
  sqft: number | null;
  mlsNumber?: string;
  /** Hero photo URL (brokerage MLS CDN). */
  img: string;
  /** Outbound link to the full listing page on the brokerage site. */
  href: string;
  /** Placeholder gradient class shown behind the photo while it loads. */
  grad: string;
  openHouse?: {
    start: string;
    end: string;
    label: string;
  } | null;
}

export interface LifestyleItem {
  name: string;
  count: number;
  grad: string;
  img: string;
  desc: string;
}

export interface Community {
  name: string;
  county: string;
  x: number;
  y: number;
  price: string;
  dom: string;
  inv: string;
  act: string;
  note: string;
  profile: string;
  tags: string[];
}

export interface Development {
  id: string;
  name: string;
  loc: string;
  area: 'miami' | 'brickell' | 'edgewater' | 'sunnyisles' | 'aventura' | 'ftl';
  from: string;
  dev: string;
  architect?: string;
  year: string;
  status: string;
  grad: string;
  img: string;
  residences?: number;
  depositStructure?: string;
  amenities?: string[];
  roiHighlights?: string;
  desc?: string;
}

export interface NeighborhoodDetail {
  id: string;
  name: string;
  region: 'Miami-Dade' | 'Broward' | 'Palm Beach';
  tagline: string;
  vibe: string;
  avgPriceSqft: number;
  medianPrice: string;
  walkScore: number;
  lifestylePillars: ('beach' | 'city' | 'family' | 'nightlife' | 'waterfront' | 'investment' | 'quiet' | 'walkability')[];
  description: string;
  keyHighlights: string[];
  img: string;
}

export interface MarketCityData {
  label: string;
  price: string;
  dPrice: string;
  dom: string;
  dDom: string;
  inv: string;
  dInv: string;
  lux: string;
  dLux: string;
  series: number[];
}

export interface Story {
  quote: string;
  who: string;
  where: string;
  grad: string;
  img: string;
}

export interface CaseStudy {
  id: string;
  address: string;
  neighborhood: string;
  propertyType: string;
  originalExpectation: string;
  finalSalePrice: string;
  daysOnMarket: number;
  strategyUsed: string;
  outcome: string;
  img: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  category: 'Market Update' | 'Neighborhoods' | 'Developments' | 'Real Estate Strategy' | 'South Florida Lifestyle';
  date: string;
  readTime: string;
  summary: string;
  keyTakeaways: string[];
  author: string;
  img: string;
}

export interface ParsedQuery {
  raw: string;
  city: string | null;
  area: string | null;
  beds: number | null;
  maxPrice: number | null;
  type: 'house' | 'condo' | null;
  features: string[];
}
