import React, { useState, useMemo } from 'react';
import { ArrowRight, Building2, Calendar, MapPin, Sparkles, CheckCircle2, Shield, DollarSign, X, Layers } from 'lucide-react';
import { DEVELOPMENTS } from '../../data';
import { Development } from '../../types';

interface DevelopmentsViewProps {
  onOpenContact: (intent?: string, message?: string) => void;
}

export default function DevelopmentsView({ onOpenContact }: DevelopmentsViewProps) {
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Development | null>(null);

  const filteredDevelopments = useMemo(() => {
    if (selectedArea === 'all') return DEVELOPMENTS;
    return DEVELOPMENTS.filter(d => d.area === selectedArea);
  }, [selectedArea]);

  const areas = [
    { id: 'all', label: 'All Developments' },
    { id: 'sunnyisles', label: 'Sunny Isles Beach' },
    { id: 'edgewater', label: 'Edgewater' },
    { id: 'brickell', label: 'Brickell' },
    { id: 'miami', label: 'Downtown Miami' },
    { id: 'ftl', label: 'Fort Lauderdale' },
  ];

  return (
    <div className="pt-24 pb-20 animate-fadeIn">
      {/* 1. Developments Hero */}
      <section className="relative py-16 sm:py-24 border-b border-[rgba(244,239,226,0.1)] bg-gradient-to-b from-[#0B0B0B] via-[#141a1d] to-[#0B0B0B]">
        <div className="wrap">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow--dot mb-3">Pre-Construction Intelligence · South Florida Elevated</span>
            <h1 className="font-serif text-4xl sm:text-6xl text-[#f4efe2] font-normal leading-[1.08] tracking-tight">
              South Florida <em className="it text-[#ffd9a0]">Developments</em>.
            </h1>
            <p className="font-serif text-2xl sm:text-3xl text-[#c9a24a] italic mt-2">
              Explore the projects reshaping the region.
            </p>
            <p className="text-base sm:text-lg text-[#f4efe2]/80 mt-6 font-light leading-relaxed">
              We provide direct developer access, early reservation tier pricing, floor plan audits, and deposit schedule analysis across South Florida's most iconic branded residential towers.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={() => onOpenContact('development', 'I would like to request current pre-construction pricing and availability across South Florida towers.')}
                className="btn btn--gold"
              >
                <span>Request Project Availability</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filter Bar */}
      <section className="py-8 border-b border-[rgba(244,239,226,0.08)] bg-[#101618] sticky top-16 z-30 backdrop-blur-md bg-[#101618]/95">
        <div className="wrap">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {areas.map((area) => (
              <button
                key={area.id}
                onClick={() => setSelectedArea(area.id)}
                className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider whitespace-nowrap border transition-all cursor-pointer ${
                  selectedArea === area.id
                    ? 'border-[#c9a24a] bg-[#c9a24a]/20 text-[#ffd9a0]'
                    : 'border-[rgba(244,239,226,0.1)] text-[#f4efe2]/70 hover:text-[#f4efe2] hover:border-[#f4efe2]/30'
                }`}
              >
                {area.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Developments Grid */}
      <section className="py-16 bg-[#0B0B0B]">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDevelopments.map((dev) => (
              <div
                key={dev.id}
                onClick={() => setSelectedProject(dev)}
                className="group bg-[#141a1d] border border-[rgba(244,239,226,0.1)] hover:border-[#c9a24a] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={dev.img}
                    alt={dev.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B0B0B]/85 px-3 py-1 font-mono text-[10px] text-[#ffd9a0] border border-[rgba(244,239,226,0.2)]">
                    {dev.status}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#0B0B0B]/90 px-3 py-1 font-mono text-sm text-[#ffd9a0] font-bold border border-[#c9a24a]">
                    {dev.from}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="font-mono text-xs text-[#c9a24a] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{dev.loc}</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#f4efe2] group-hover:text-[#ffd9a0] transition-colors">
                      {dev.name}
                    </h3>
                    <p className="text-xs text-[#f4efe2]/70 font-light mt-2 line-clamp-2 leading-relaxed">
                      {dev.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[rgba(244,239,226,0.08)] space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-[#f4efe2]/70">
                      <span>Developer:</span>
                      <span className="text-[#f4efe2]">{dev.dev}</span>
                    </div>
                    <div className="flex justify-between text-[#f4efe2]/70">
                      <span>Completion:</span>
                      <span className="text-[#c9a24a]">{dev.year}</span>
                    </div>
                  </div>

                  <button className="btn w-full justify-between py-2.5 text-xs">
                    <span>View Project Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pre-Construction Advisory Benefits */}
      <section className="py-20 border-t border-[rgba(244,239,226,0.1)] bg-[#101618]">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="eyebrow eyebrow--dot">Direct Developer Representation</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe2] font-normal leading-tight mt-3">
                Why navigate pre-construction with <em className="it text-[#ffd9a0]">Miguel</em>?
              </h2>
              <p className="text-base text-[#f4efe2]/80 font-light mt-6 leading-relaxed">
                Developer sales galleries work exclusively for the developer. Miguel serves as your independent fiduciary advocate — negotiating contract modifications, floor plan combinations, parking allocations, and deposit incentives at zero cost to the buyer.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { title: "Tier 1 Friends & Family Pricing", desc: "Access early reservation rounds before public marketing increases prices across stack tiers." },
                { title: "Deposit Structure Analysis", desc: "Comprehensive review of developer milestone escrow accounts, financing contingencies, and assignment clauses." },
                { title: "Floor Plan & View Corridor Audits", desc: "Using architectural models and municipal zoning maps to confirm no future adjacent towers will obstruct your view." }
              ].map((item, idx) => (
                <div key={idx} className="p-5 bg-[#141a1d] border border-[rgba(244,239,226,0.1)]">
                  <h4 className="font-serif text-lg text-[#ffd9a0]">{item.title}</h4>
                  <p className="text-xs text-[#f4efe2]/75 font-light mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Project Detail Dialog Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="fixed inset-0" onClick={() => setSelectedProject(null)} />
          <div className="relative w-full max-w-4xl bg-[#141a1d] border border-[#c9a24a] shadow-2xl p-6 sm:p-10 z-10 my-auto overflow-hidden">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-[#f4efe2]/60 hover:text-[#c9a24a] p-1 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={selectedProject.img}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-[#0B0B0B] border border-[rgba(244,239,226,0.1)]">
                  <span className="mono-label text-[#c9a24a]">Deposit Milestones</span>
                  <p className="text-xs text-[#f4efe2]/80 font-mono mt-1">
                    {selectedProject.depositStructure || "10% Contract, 10% Groundbreaking, 10% Top-Off, 70% Closing"}
                  </p>
                </div>
              </div>

              <div className="space-y-6 flex flex-col justify-between">
                <div>
                  <span className="mono-label text-[#c9a24a]">{selectedProject.loc}</span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#f4efe2] font-normal leading-snug">
                    {selectedProject.name}
                  </h3>
                  <div className="font-mono text-2xl text-[#ffd9a0] font-bold mt-1">
                    {selectedProject.from}
                  </div>

                  <p className="text-xs sm:text-sm text-[#f4efe2]/80 font-light mt-4 leading-relaxed">
                    {selectedProject.desc}
                  </p>

                  {selectedProject.amenities && (
                    <div className="mt-6">
                      <span className="mono-label text-[#ffd9a0] block mb-2">Signature Amenities</span>
                      <div className="space-y-1.5">
                        {selectedProject.amenities.map((am, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#f4efe2]/80 font-light">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a24a] shrink-0" />
                            <span>{am}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject.roiHighlights && (
                    <div className="mt-4 p-3 bg-[#0B0B0B] border border-[#c9a24a]/30">
                      <span className="mono-label text-[#ffd9a0] block text-[10px]">Investment & ROI Analysis:</span>
                      <p className="text-xs text-[#f4efe2]/80 font-light mt-1">
                        {selectedProject.roiHighlights}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => {
                      const name = selectedProject.name;
                      setSelectedProject(null);
                      onOpenContact('development', `I would like to request floor plans and pricing availability for ${name}.`);
                    }}
                    className="btn btn--gold w-full justify-center text-xs"
                  >
                    <span>Request Floor Plans & Availability</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
