import { useState } from 'react';

interface FiltersState {
  city: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  beds: number;
  baths: number;
  sort: string;
}

interface PropertySearchFiltersProps {
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
}

const CITIES = [
  'All Cities',
  'Miami',
  'Miami Beach',
  'Brickell',
  'Edgewater',
  'Coconut Grove',
  'Coral Gables',
  'Sunny Isles Beach',
  'Aventura',
  'Fort Lauderdale',
  'Las Olas',
  'Palm Beach',
  'Palm Beach Gardens',
];

const PRICE_RANGES = [
  { label: 'Any Price', min: 0, max: 0 },
  { label: 'Under $500K', min: 0, max: 500000 },
  { label: '$500K - $1M', min: 500000, max: 1000000 },
  { label: '$1M - $2M', min: 1000000, max: 2000000 },
  { label: '$2M - $5M', min: 2000000, max: 5000000 },
  { label: '$5M - $10M', min: 5000000, max: 10000000 },
  { label: '$10M+', min: 10000000, max: 50000000 },
];

export default function PropertySearchFilters({
  filters,
  onFiltersChange,
}: PropertySearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key: keyof FiltersState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="mb-8">
      {/* Mobile toggle */}
      <button
        className="lg:hidden w-full px-4 py-3 text-left bg-white/5 border border-white/10 rounded-lg text-sm text-[#f4efe2]/70"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide Filters ▲' : 'Show Filters ▼'}
      </button>

      <div className={`${isOpen ? 'block' : 'hidden'} lg:block mt-4`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* City */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.12em] text-[#f4efe2]/50 mb-1">
              City
            </label>
            <select
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-[#f4efe2] focus:outline-none focus:border-[#c8a96e] transition-colors appearance-none cursor-pointer"
              value={filters.city}
              onChange={(e) => handleChange('city', e.target.value)}
            >
              {CITIES.map((city) => (
                <option key={city} value={city === 'All Cities' ? '' : city} className="bg-[#1a2022]">
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.12em] text-[#f4efe2]/50 mb-1">
              Type
            </label>
            <select
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-[#f4efe2] focus:outline-none focus:border-[#c8a96e] transition-colors appearance-none cursor-pointer"
              value={filters.propertyType}
              onChange={(e) => handleChange('propertyType', e.target.value)}
            >
              <option value="all" className="bg-[#1a2022]">All Types</option>
              <option value="Single Family Residence" className="bg-[#1a2022]">Houses</option>
              <option value="Condo" className="bg-[#1a2022]">Condos</option>
              <option value="Townhouse" className="bg-[#1a2022]">Townhouses</option>
              <option value="Multi-Family" className="bg-[#1a2022]">Multi-Family</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.12em] text-[#f4efe2]/50 mb-1">
              Price Range
            </label>
            <select
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-[#f4efe2] focus:outline-none focus:border-[#c8a96e] transition-colors appearance-none cursor-pointer"
              value={`${filters.minPrice}-${filters.maxPrice}`}
              onChange={(e) => {
                const [min, max] = e.target.value.split('-').map(Number);
                handleChange('minPrice', min);
                handleChange('maxPrice', max);
              }}
            >
              {PRICE_RANGES.map((range) => (
                <option key={range.label} value={`${range.min}-${range.max}`} className="bg-[#1a2022]">
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Beds */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.12em] text-[#f4efe2]/50 mb-1">
              Min. Beds
            </label>
            <select
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-[#f4efe2] focus:outline-none focus:border-[#c8a96e] transition-colors appearance-none cursor-pointer"
              value={filters.beds}
              onChange={(e) => handleChange('beds', Number(e.target.value))}
            >
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n} className="bg-[#1a2022]">
                  {n === 0 ? 'Any' : `${n}+`}
                </option>
              ))}
            </select>
          </div>

          {/* Baths */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.12em] text-[#f4efe2]/50 mb-1">
              Min. Baths
            </label>
            <select
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-[#f4efe2] focus:outline-none focus:border-[#c8a96e] transition-colors appearance-none cursor-pointer"
              value={filters.baths}
              onChange={(e) => handleChange('baths', Number(e.target.value))}
            >
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n} className="bg-[#1a2022]">
                  {n === 0 ? 'Any' : `${n}+`}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.12em] text-[#f4efe2]/50 mb-1">
              Sort By
            </label>
            <select
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-[#f4efe2] focus:outline-none focus:border-[#c8a96e] transition-colors appearance-none cursor-pointer"
              value={filters.sort}
              onChange={(e) => handleChange('sort', e.target.value)}
            >
              <option value="ListPrice desc" className="bg-[#1a2022]">Price (High→Low)</option>
              <option value="ListPrice asc" className="bg-[#1a2022]">Price (Low→High)</option>
              <option value="BedroomsTotal desc" className="bg-[#1a2022]">Bedrooms (High→Low)</option>
              <option value="LivingArea desc" className="bg-[#1a2022]">Size (High→Low)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
