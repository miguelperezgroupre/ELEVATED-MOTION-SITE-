import React, { useState, useMemo } from 'react';
import { Search, Sparkles, SlidersHorizontal, ArrowRight, ShieldCheck, MapPin, Bed, Bath, Maximize2, Compass } from 'lucide-react';
import { Property, ParsedQuery } from '../../types';
import { PROPERTIES, AI_EXAMPLES, parseAiQuery, scoreProperty, getAiTags, money } from '../../data';

interface BuyViewProps {
  onSelectProperty: (property: Property) => void;
  onOpenContact: (intent?: string, message?: string) => void;
  onNavigateToNeighborhoods: () => void;
}

export default function BuyView({
  onSelectProperty,
  onOpenContact,
  onNavigateToNeighborhoods
}: BuyViewProps) {
  const [activePath, setActivePath] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState<'all' | 'miami' | 'ftl' | 'pb'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'house' | 'condo'>('all');
  const [priceMax, setPriceMax] = useState<number>(35000000);

  const parsedQuery: ParsedQuery = useMemo(() => {
    return parseAiQuery(query);
  }, [query]);

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((p) => {
      // Path filter
      if (activePath === 'luxury' && p.price < 5000000) return false;
      if (activePath === 'waterfront' && !p.tags.some(t => /waterfront|deep water|oceanfront|dock/i.test(t))) return false;
      if (activePath === 'condos' && p.type !== 'condo') return false;
      if (activePath === 'homes' && p.type !== 'house') return false;
      if (activePath === 'investment' && !p.tags.some(t => /investment|condo|brickell/i.test(t))) return false;

      // Area filter
      if (selectedArea !== 'all' && p.area !== selectedArea) return false;

      // Type filter
      if (selectedType !== 'all' && p.type !== selectedType) return false;

      // Max price
      if (p.price > priceMax) return false;

      // Query matching
      if (query.trim()) {
        const { score, hard } = scoreProperty(p, parsedQuery);
        if (!hard && score <= 0) return false;
      }

      return true;
    });
  }, [activePath, selectedArea, selectedType, priceMax, query, parsedQuery]);

  const activeTags = useMemo(() => {
    if (!query.trim()) return [];
    return getAiTags(parsedQuery);
  }, [query, parsedQuery]);

  return (
    <div className="pt-24 pb-20 animate-fadeIn">
      {/* 1. Buy Hero */}
      <section className="relative py-16 sm:py-24 border-b border-[rgba(244,239,226,0.1)] bg-gradient-to-b from-[#0B0B0B] via-[#141a1d] to-[#0B0B0B]">
        <div className="wrap">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow--dot mb-3">Buyer Advisory · South Florida Elevated</span>
            <h1 className="font-serif text-4xl sm:text-6xl text-[#f4efe2] font-normal leading-[1.08] tracking-tight">
              Find the <em className="it text-[#ffd9a0]">Right</em> Property.
            </h1>
            <p className="font-serif text-2xl sm:text-3xl text-[#c9a24a] italic mt-2">
              Not just a property. The right property for your goals.
            </p>
            <p className="text-base sm:text-lg text-[#f4efe2]/80 mt-6 font-light leading-relaxed">
              Navigating South Florida's luxury market requires more than browsing listings. Miguel provides access to off-market inventory, evaluates view corridors, audits HOA reserve funds, and negotiates with strategic leverage.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#property-search"
                className="btn btn--gold"
              >
                <span>Search Properties</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => onOpenContact('buyer', 'I would like to schedule a private Buyer Strategy consultation.')}
                className="btn"
              >
                <span>Build My Buying Strategy</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Buying Paths */}
      <section className="py-12 border-b border-[rgba(244,239,226,0.08)] bg-[#101618]">
        <div className="wrap">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="mono-label">Curated Portfolios</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#f4efe2]">
                Choose Your Buying <em className="it text-[#ffd9a0]">Path</em>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { id: 'all', label: 'All Listings', count: PROPERTIES.length },
              { id: 'luxury', label: 'Ultra Luxury ($5M+)', count: PROPERTIES.filter(p => p.price >= 5000000).length },
              { id: 'waterfront', label: 'Waterfront & Dock', count: PROPERTIES.filter(p => p.tags.some(t => /waterfront|deep water|oceanfront/i.test(t))).length },
              { id: 'condos', label: 'Luxury Condos', count: PROPERTIES.filter(p => p.type === 'condo').length },
              { id: 'homes', label: 'Single Family', count: PROPERTIES.filter(p => p.type === 'house').length },
              { id: 'investment', label: 'Investment Assets', count: PROPERTIES.filter(p => p.tags.some(t => /investment|condo|brickell/i.test(t))).length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePath(tab.id)}
                className={`p-4 text-left border transition-all cursor-pointer ${
                  activePath === tab.id
                    ? 'border-[#c9a24a] bg-[#c9a24a]/10 text-[#ffd9a0]'
                    : 'border-[rgba(244,239,226,0.1)] bg-[#141a1d] text-[#f4efe2]/70 hover:border-[#f4efe2]/30 hover:text-[#f4efe2]'
                }`}
              >
                <div className="font-mono text-xs text-[#c9a24a] uppercase">{tab.count} Residences</div>
                <div className="font-serif text-lg text-[#f4efe2] mt-1">{tab.label}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AI Natural Language Search & Filters */}
      <section id="property-search" className="py-12 border-b border-[rgba(244,239,226,0.08)] bg-[#0B0B0B]">
        <div className="wrap">
          <div className="p-6 sm:p-8 bg-[#141a1d] border border-[rgba(201,162,74,0.3)] shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#c9a24a]" />
              <span className="mono-label text-[#c9a24a]">AI Natural Language Property Intelligence</span>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#f4efe2]/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="E.g., Deep water waterfront home in Las Olas under $8M with dock"
                className="w-full pl-12 pr-4 py-4 bg-[#0B0B0B] border border-[rgba(244,239,226,0.15)] text-[#f4efe2] placeholder:text-[#f4efe2]/40 text-base sm:text-lg focus:outline-none focus:border-[#c9a24a] transition-colors"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#f4efe2]/50 hover:text-[#f4efe2]"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* AI Prompt Examples */}
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-[rgba(244,239,226,0.08)]">
              <span className="font-mono text-xs text-[#f4efe2]/50">Try searching:</span>
              {AI_EXAMPLES.map((eg, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(eg)}
                  className="text-xs font-mono text-[#c9a24a] hover:underline bg-[#0B0B0B] px-2.5 py-1 border border-[rgba(201,162,74,0.2)]"
                >
                  "{eg}"
                </button>
              ))}
            </div>

            {/* Active AI Parsed Filter Chips */}
            {activeTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-[rgba(244,239,226,0.08)]">
                <span className="mono-label self-center mr-2">Parsed Criteria:</span>
                {activeTags.map((tag, i) => (
                  <span key={i} className="tag bg-[#c9a24a]/15 text-[#ffd9a0] border border-[#c9a24a]/30">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Manual Controls Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[rgba(244,239,226,0.1)]">
              <div>
                <label className="mono-label block mb-2">Region</label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value as any)}
                  className="w-full p-2.5 bg-[#0B0B0B] border border-[rgba(244,239,226,0.15)] text-[#f4efe2] text-sm focus:outline-none focus:border-[#c9a24a]"
                >
                  <option value="all">All South Florida</option>
                  <option value="miami">Miami-Dade</option>
                  <option value="ftl">Fort Lauderdale / Broward</option>
                  <option value="pb">Palm Beach County</option>
                </select>
              </div>

              <div>
                <label className="mono-label block mb-2">Property Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="w-full p-2.5 bg-[#0B0B0B] border border-[rgba(244,239,226,0.15)] text-[#f4efe2] text-sm focus:outline-none focus:border-[#c9a24a]"
                >
                  <option value="all">All Residential Types</option>
                  <option value="house">Single Family Estate</option>
                  <option value="condo">Condominium</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="mono-label">Max Budget</label>
                  <span className="font-mono text-xs text-[#c9a24a]">{money(priceMax)}</span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={35000000}
                  step={500000}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#c9a24a] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Results Grid */}
      <section className="py-16 bg-[#0B0B0B]">
        <div className="wrap">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="mono-label">Available Properties</span>
              <h2 className="font-serif text-3xl text-[#f4efe2]">
                Showing {filteredProperties.length} <em className="it text-[#ffd9a0]">{filteredProperties.length === 1 ? 'Opportunity' : 'Opportunities'}</em>
              </h2>
            </div>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="text-center py-20 bg-[#141a1d] border border-[rgba(244,239,226,0.1)] p-8">
              <Compass className="w-12 h-12 text-[#c9a24a] mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-[#f4efe2]">No exact matches in the current sample portfolio</h3>
              <p className="text-sm text-[#f4efe2]/70 max-w-md mx-auto mt-2 font-light">
                Miguel actively sources off-market and unlisted properties throughout South Florida. Let him know your exact requirements.
              </p>
              <button
                onClick={() => onOpenContact('buyer', 'I am looking for specific property requirements not shown in public inventory.')}
                className="btn btn--gold mt-6"
              >
                <span>Request Private Off-Market Search</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectProperty(p)}
                  className="group bg-[#141a1d] border border-[rgba(244,239,226,0.1)] hover:border-[#c9a24a] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B0B0B]/80 backdrop-blur-md px-2.5 py-1 border border-[rgba(244,239,226,0.2)] font-mono text-[10px] text-[#ffd9a0] uppercase tracking-wider">
                      {p.badge}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[#0B0B0B]/90 backdrop-blur-md px-3 py-1 font-mono text-sm text-[#ffd9a0] font-bold border border-[#c9a24a]/40">
                      {money(p.price)}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="font-mono text-xs text-[#c9a24a] uppercase tracking-wider mb-1">
                        {p.city}, Florida
                      </div>
                      <h3 className="font-serif text-2xl text-[#f4efe2] group-hover:text-[#ffd9a0] transition-colors leading-tight">
                        {p.name}
                      </h3>
                      <p className="text-xs text-[#f4efe2]/70 font-light mt-3 line-clamp-2 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-[rgba(244,239,226,0.08)] flex items-center justify-between text-[#f4efe2]/80 text-xs font-mono">
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-[#c9a24a]" />
                        <span>{p.beds} Beds</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-3.5 h-3.5 text-[#c9a24a]" />
                        <span>{p.baths} Baths</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-[#c9a24a]" />
                        <span>{p.sqft.toLocaleString()} Sq Ft</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. The Buyer Advisory Advantage */}
      <section className="py-20 border-t border-[rgba(244,239,226,0.1)] bg-[#101618]">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="eyebrow eyebrow--dot">Why Miguel Perez</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe2] font-normal leading-tight mt-3">
                Representation that protects your <em className="it text-[#ffd9a0]">Capital</em>.
              </h2>
              <p className="text-base text-[#f4efe2]/80 font-light mt-6 leading-relaxed">
                Purchasing property in South Florida is fundamentally different from other markets. Micro-climates, fixed bridge heights, seawall conditions, and condo structural reserve legislation (SB 4-D) all directly dictate asset longevity.
              </p>

              <div className="space-y-4 mt-8">
                {[
                  {
                    title: "Off-Market Access",
                    desc: "A substantial volume of South Florida's top waterfront and private island trades happen off-market through local relationships."
                  },
                  {
                    title: "HOA Reserve Auditing",
                    desc: "We scrutinize building financials, milestone engineering reports, and upcoming special assessments before you make an offer."
                  },
                  {
                    title: "Waterfront Diligence",
                    desc: "Verification of canal depths at mean low tide, bridge clearances, dock permits, and turning basins for your vessel."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#141a1d] border border-[rgba(244,239,226,0.1)]">
                    <h4 className="font-serif text-lg text-[#ffd9a0]">{item.title}</h4>
                    <p className="text-xs text-[#f4efe2]/75 font-light mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategy Call Card */}
            <div className="bg-[#141a1d] border border-[#c9a24a] p-8 sm:p-12 shadow-2xl text-center space-y-6">
              <span className="mono-label text-[#c9a24a]">Private Consultation</span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#f4efe2] font-normal">
                Build Your Buying <em className="it text-[#ffd9a0]">Strategy</em>
              </h3>
              <p className="text-sm text-[#f4efe2]/80 font-light leading-relaxed">
                Connect directly with Miguel to define target neighborhoods, evaluate current price trends, and access bespoke inventory.
              </p>
              <button
                onClick={() => onOpenContact('buyer', 'I am ready to build my South Florida buying strategy with Miguel.')}
                className="btn btn--gold w-full justify-center"
              >
                <span>Find My Property</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="pt-2">
                <button
                  onClick={onNavigateToNeighborhoods}
                  className="text-xs font-mono text-[#c9a24a] hover:underline"
                >
                  Or explore our South Florida Neighborhood Guides →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
