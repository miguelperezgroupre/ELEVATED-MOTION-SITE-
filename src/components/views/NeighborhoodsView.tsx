import React, { useState, useMemo } from 'react';
import { ArrowRight, MapPin, Sparkles, Compass, Check, DollarSign, Trees, Waves, Building2 } from 'lucide-react';
import { NEIGHBORHOODS } from '../../data';
import { NeighborhoodDetail } from '../../types';

interface NeighborhoodsViewProps {
  onOpenContact: (intent?: string, message?: string) => void;
  onSelectNeighborhood?: (n: NeighborhoodDetail) => void;
}

export default function NeighborhoodsView({ onOpenContact }: NeighborhoodsViewProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [activeNeighborhood, setActiveNeighborhood] = useState<NeighborhoodDetail>(NEIGHBORHOODS[0]);

  const filteredNeighborhoods = useMemo(() => {
    if (selectedRegion === 'all') return NEIGHBORHOODS;
    return NEIGHBORHOODS.filter(n => n.region.toLowerCase().includes(selectedRegion.toLowerCase()));
  }, [selectedRegion]);

  return (
    <div className="pt-24 pb-20 animate-fadeIn">
      {/* 1. Neighborhoods Hero */}
      <section className="relative py-16 sm:py-24 border-b border-[rgba(244,239,226,0.1)] bg-gradient-to-b from-[#0B0B0B] via-[#141a1d] to-[#0B0B0B]">
        <div className="wrap">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow--dot mb-3">Geographic Authority · South Florida Elevated</span>
            <h1 className="font-serif text-4xl sm:text-6xl text-[#f4efe2] font-normal leading-[1.08] tracking-tight">
              Where do you <em className="it text-[#ffd9a0]">Belong</em>?
            </h1>
            <p className="font-serif text-2xl sm:text-3xl text-[#c9a24a] italic mt-2">
              South Florida isn't one market. It's a collection of lifestyles.
            </p>
            <p className="text-base sm:text-lg text-[#f4efe2]/80 mt-6 font-light leading-relaxed">
              From the deep-water finger canals of Las Olas to the historic banyan canopies of Coconut Grove and the vertical luxury of Brickell, discover the distinct character, price trends, and daily rhythms of South Florida's premier enclaves.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Regional Filter Tabs */}
      <section className="py-6 border-b border-[rgba(244,239,226,0.08)] bg-[#101618] sticky top-16 z-30 backdrop-blur-md bg-[#101618]/95">
        <div className="wrap">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'All Communities' },
              { id: 'miami-dade', label: 'Miami-Dade County' },
              { id: 'broward', label: 'Broward / Fort Lauderdale' },
              { id: 'palm beach', label: 'Palm Beach' },
            ].map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider whitespace-nowrap border transition-all cursor-pointer ${
                  selectedRegion === reg.id
                    ? 'border-[#c9a24a] bg-[#c9a24a]/20 text-[#ffd9a0]'
                    : 'border-[rgba(244,239,226,0.1)] text-[#f4efe2]/70 hover:text-[#f4efe2] hover:border-[#f4efe2]/30'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Editorial Spotlight Section */}
      <section className="py-16 border-b border-[rgba(244,239,226,0.08)] bg-[#0B0B0B]">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#141a1d] border border-[rgba(201,162,74,0.3)] p-6 sm:p-10 shadow-2xl">
            <div className="lg:col-span-6 relative aspect-[16/11] overflow-hidden">
              <img
                src={activeNeighborhood.img}
                alt={activeNeighborhood.name}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#0B0B0B]/85 px-3 py-1 font-mono text-xs text-[#ffd9a0] border border-[rgba(244,239,226,0.2)]">
                {activeNeighborhood.region}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="mono-label text-[#c9a24a]">Featured Neighborhood Profile</span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe2] font-normal leading-tight mt-1">
                  {activeNeighborhood.name}
                </h2>
                <p className="font-serif text-lg text-[#ffd9a0] italic mt-1">{activeNeighborhood.tagline}</p>
              </div>

              <p className="text-sm text-[#f4efe2]/80 font-light leading-relaxed">
                {activeNeighborhood.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 py-4 border-y border-[rgba(244,239,226,0.1)] text-center font-mono">
                <div>
                  <span className="text-[#f4efe2]/50 text-[10px] block">Avg $/Sq Ft</span>
                  <b className="text-base sm:text-lg text-[#ffd9a0]">${activeNeighborhood.avgPriceSqft}</b>
                </div>
                <div>
                  <span className="text-[#f4efe2]/50 text-[10px] block">Median Price</span>
                  <b className="text-base sm:text-lg text-[#f4efe2]">{activeNeighborhood.medianPrice}</b>
                </div>
                <div>
                  <span className="text-[#f4efe2]/50 text-[10px] block">Walk Score</span>
                  <b className="text-base sm:text-lg text-[#c9a24a]">{activeNeighborhood.walkScore}/100</b>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5">
                <span className="mono-label text-[#ffd9a0] block text-[10px]">Key Enclave Highlights:</span>
                {activeNeighborhood.keyHighlights.map((hl, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#f4efe2]/80 font-light">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c9a24a]" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenContact('general', `I would like to explore property opportunities in ${activeNeighborhood.name}.`)}
                  className="btn btn--gold w-full sm:w-auto"
                >
                  <span>Explore Properties in {activeNeighborhood.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Complete Neighborhoods Grid */}
      <section className="py-20 bg-[#101618]">
        <div className="wrap">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="mono-label">Editorial Directory</span>
              <h3 className="font-serif text-3xl text-[#f4efe2]">
                All Featured <em className="it text-[#ffd9a0]">Communities</em>
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNeighborhoods.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  setActiveNeighborhood(n);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className={`bg-[#141a1d] border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between group ${
                  activeNeighborhood.id === n.id ? 'border-[#c9a24a]' : 'border-[rgba(244,239,226,0.1)] hover:border-[#f4efe2]/40'
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={n.img}
                    alt={n.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B0B0B]/85 px-3 py-1 font-mono text-[10px] text-[#ffd9a0] border border-[rgba(244,239,226,0.2)]">
                    {n.region}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#0B0B0B]/90 px-3 py-1 font-mono text-xs text-[#ffd9a0] font-bold border border-[#c9a24a]">
                    ${n.avgPriceSqft} / sqft
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-serif text-2xl text-[#f4efe2] group-hover:text-[#ffd9a0] transition-colors">
                      {n.name}
                    </h4>
                    <p className="font-serif text-xs text-[#ffd9a0] italic mt-0.5">{n.tagline}</p>
                    <p className="text-xs text-[#f4efe2]/75 font-light mt-3 leading-relaxed line-clamp-2">
                      {n.vibe}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[rgba(244,239,226,0.08)] flex items-center justify-between">
                    <span className="font-mono text-xs text-[#c9a24a]">Walk Score: {n.walkScore}</span>
                    <span className="text-xs font-mono text-[#f4efe2]/70 group-hover:text-[#f4efe2] flex items-center gap-1">
                      View Profile →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
