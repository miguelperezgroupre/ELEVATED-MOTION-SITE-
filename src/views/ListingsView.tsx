import { useState, useEffect } from 'react';
import { idxService } from '../services/idxService';
import { Property } from '../types';
import ListingCard from '../components/ListingCard';
import PropertySearchFilters from '../components/PropertySearchFilters';

interface ListingsViewProps {
  onSelectProperty: (property: Property) => void;
  onOpenContact: (intent?: string, message?: string) => void;
}

export default function ListingsView({ onSelectProperty, onOpenContact }: ListingsViewProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    city: '',
    propertyType: 'all',
    minPrice: 0,
    maxPrice: 0,
    beds: 0,
    baths: 0,
    sort: 'ListPrice desc',
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await idxService.getProperties({
          limit: 48,
          sort: 'ListPrice desc',
        });
        setProperties(data);
        setFilteredProperties(data);
      } catch (err) {
        console.error('Failed to fetch MLS listings:', err);
        setError('Unable to load MLS listings. Please try again later.');

        // Fallback: import mock data
        try {
          const { PROPERTIES } = await import('../data');
          setProperties(PROPERTIES);
          setFilteredProperties(PROPERTIES);
        } catch {
          setProperties([]);
          setFilteredProperties([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Apply filters locally for instant response
  useEffect(() => {
    let result = [...properties];

    if (filters.city) {
      result = result.filter(
        (p) => p.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.propertyType !== 'all') {
      const typeMap: Record<string, 'house' | 'condo'> = {
        'Single Family Residence': 'house',
        'Condo': 'condo',
        'Condominium': 'condo',
      };
      const mappedType = typeMap[filters.propertyType];
      if (mappedType) {
        result = result.filter((p) => p.type === mappedType);
      }
    }

    if (filters.minPrice) {
      result = result.filter((p) => p.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= filters.maxPrice);
    }

    if (filters.beds) {
      result = result.filter((p) => p.beds >= filters.beds);
    }
    if (filters.baths) {
      result = result.filter((p) => p.baths >= filters.baths);
    }

    // Sort
    result.sort((a, b) => {
      switch (filters.sort) {
        case 'ListPrice asc': return a.price - b.price;
        case 'ListPrice desc': return b.price - a.price;
        case 'BedroomsTotal desc': return b.beds - a.beds;
        case 'LivingArea desc': return b.sqft - a.sqft;
        default: return b.price - a.price;
      }
    });

    // Text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.desc?.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.neighborhood?.toLowerCase().includes(q)
      );
    }

    setFilteredProperties(result);
  }, [filters, searchQuery, properties]);

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight">
          MLS <span className="text-[#c8a96e]">Listings</span>
        </h1>
        <p className="text-[#f4efe2]/50 text-sm mt-2 max-w-2xl">
          Real-time property data from the MiamiRE MLS via Bridge Interactive.
          Search, filter, and explore South Florida's finest offerings.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by address, city, neighborhood, or features..."
            className="w-full px-4 py-3 pl-12 bg-white/5 border border-white/10 rounded-lg text-sm text-[#f4efe2] focus:outline-none focus:border-[#c8a96e] transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f4efe2]/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Filters */}
      <PropertySearchFilters filters={filters} onFiltersChange={setFilters} />

      {/* Results */}
      <div className="mt-6">
        <p className="text-[12px] uppercase tracking-[0.12em] text-[#f4efe2]/40 mb-4">
          {loading ? 'Loading...' : `${filteredProperties.length} properties found`}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-white/5 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-[#f4efe2]/60 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 text-[11px] uppercase tracking-[0.15em] text-[#c8a96e] border border-[#c8a96e]/30 hover:bg-[#c8a96e]/10 transition-colors rounded"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProperties.map((property) => (
              <ListingCard
                key={property.id}
                property={property}
                onClick={(p) => {
                  onSelectProperty(p);
                }}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#f4efe2]/60 text-lg">No properties match your search.</p>
            <button
              onClick={() => {
                setFilters({
                  city: '',
                  propertyType: 'all',
                  minPrice: 0,
                  maxPrice: 0,
                  beds: 0,
                  baths: 0,
                  sort: 'ListPrice desc',
                });
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2 text-[11px] uppercase tracking-[0.15em] text-[#c8a96e] border border-[#c8a96e]/30 hover:bg-[#c8a96e]/10 transition-colors rounded"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
