// Structured Data (JSON-LD) Injection Service
// Injects LocalBusiness, RealEstateAgent, and city-specific schemas
// for maximum local SEO impact across South Florida

export interface SchemaConfig {
  pageType: 'home' | 'buy' | 'sell' | 'relocate' | 'invest' | 'developments' | 'neighborhoods' | 'insights' | 'about';
  city?: string;
}

const BASE_URL = 'https://www.southfloridaelevated.com';

class SchemaService {
  private schemas: Record<string, object> = {};

  build(config: SchemaConfig): object[] {
    const schemas: object[] = [];

    // 1. Always: RealEstateAgent (Organization)
    schemas.push(this.getOrganizationSchema());

    // 2. Always: LocalBusiness
    schemas.push(this.getLocalBusinessSchema());

    // 3. Always: WebSite search action
    schemas.push(this.getWebSiteSchema());

    // 4. Page-specific
    if (config.pageType === 'neighborhoods' && config.city) {
      schemas.push(this.getCitySchema(config.city));
    }

    if (config.pageType === 'home') {
      schemas.push(this.getServiceSchema());
    }

    return schemas;
  }

  private getOrganizationSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      'name': 'South Florida Elevated',
      'alternateName': 'Miguel Perez - Luxe Properties',
      'url': BASE_URL,
      'logo': `${BASE_URL}/assets/brand/mp-symbol.png`,
      'image': `${BASE_URL}/assets/brand/elevated-horizontal-dark.png`,
      'description': 'Luxury real estate advisory serving Miami, Fort Lauderdale, and Palm Beach. Research-first practice pairing market intelligence with private-brokerage representation.',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Aventura',
        'addressRegion': 'FL',
        'addressCountry': 'US',
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 25.9527,
        'longitude': -80.1434,
      },
      'telephone': '+17864601023',
      'email': 'miguelperez@luxeknows.com',
      'priceRange': '$$$',
      'areaServed': [
        { '@type': 'City', 'name': 'Miami' },
        { '@type': 'City', 'name': 'Fort Lauderdale' },
        { '@type': 'City', 'name': 'Miami Beach' },
        { '@type': 'City', 'name': 'Brickell' },
        { '@type': 'City', 'name': 'Edgewater' },
        { '@type': 'City', 'name': 'Sunny Isles Beach' },
        { '@type': 'City', 'name': 'Aventura' },
        { '@type': 'City', 'name': 'Coral Gables' },
        { '@type': 'City', 'name': 'Coconut Grove' },
        { '@type': 'City', 'name': 'Palm Beach' },
        { '@type': 'City', 'name': 'Las Olas' },
        { '@type': 'City', 'name': 'Victoria Park' },
        { '@type': 'City', 'name': 'Tarpon River' },
        { '@type': 'City', 'name': 'Wilton Manors' },
      ],
      'parentOrganization': {
        '@type': 'RealEstateAgent',
        'name': 'Luxe Properties',
        'url': 'https://www.luxeproperties.com',
      },
    };
  }

  private getLocalBusinessSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'South Florida Elevated',
      'image': `${BASE_URL}/assets/brand/elevated-horizontal-dark.png`,
      '@id': `${BASE_URL}/#localbusiness`,
      'url': BASE_URL,
      'telephone': '+17864601023',
      'priceRange': '$$$',
      'description': 'South Florida luxury real estate advisor specializing in waterfront, pre-construction, and premium representation.',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Aventura',
        'addressRegion': 'FL',
        'addressCountry': 'US',
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 25.9527,
        'longitude': -80.1434,
      },
      'openingHours': 'Mo-Su 09:00-20:00',
      'sameAs': [
        'https://www.instagram.com/miguelperezflorida',
        'https://www.facebook.com/southfloridaelevated',
        'https://www.zillow.com/profile/miguelperez/',
      ],
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '5.0',
        'reviewCount': '35',
        'bestRating': '5',
        'worstRating': '1',
      },
    };
  }

  private getWebSiteSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'url': BASE_URL,
      'name': 'South Florida Elevated',
      'description': 'South Florida luxury real estate advisory by Miguel Perez',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${BASE_URL}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    };
  }

  private getCitySchema(city: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      'name': `South Florida Elevated - ${city}`,
      'url': `${BASE_URL}/#neighborhoods`,
      'areaServed': { '@type': 'City', 'name': city },
      'parentOrganization': { '@id': `${BASE_URL}/#localbusiness` },
    };
  }

  private getServiceSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'serviceType': 'Luxury Real Estate Advisory',
      'provider': { '@type': 'RealEstateAgent', 'name': 'Miguel Perez' },
      'areaServed': [
        { '@type': 'City', 'name': 'Miami' },
        { '@type': 'City', 'name': 'Fort Lauderdale' },
        { '@type': 'City', 'name': 'Palm Beach' },
      ],
      'description': 'Full-service real estate advisory including buyer representation, seller strategy, investment analysis, relocation, and pre-construction consulting.',
    };
  }

  inject(config: SchemaConfig): void {
    // Remove any existing SFE schemas first
    document.querySelectorAll('script[data-sfe-schema]').forEach(el => el.remove());

    const schemas = this.build(config);
    schemas.forEach((schema, i) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-sfe-schema', `true`);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }
}

export const schemaService = new SchemaService();
