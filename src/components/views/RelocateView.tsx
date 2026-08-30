import React, { useState, useMemo } from 'react';
import { Compass, Check, ArrowRight, MapPin, Sparkles, Sun, DollarSign, Waves, Building2, Trees, ShieldCheck } from 'lucide-react';
import { NEIGHBORHOODS } from '../../data';
import { NeighborhoodDetail } from '../../types';

interface RelocateViewProps {
  onOpenContact: (intent?: string, message?: string) => void;
  onSelectNeighborhood?: (n: NeighborhoodDetail) => void;
}

type LifestylePillar = 'beach' | 'city' | 'family' | 'nightlife' | 'waterfront' | 'investment' | 'quiet' | 'walkability';

export default function RelocateView({ onOpenContact, onSelectNeighborhood }: RelocateViewProps) {
  const [selectedPillars, setSelectedPillars] = useState<LifestylePillar[]>(['waterfront', 'walkability']);
  const [originCity, setOriginCity] = useState<string>('New York');

  const togglePillar = (pillar: LifestylePillar) => {
    setSelectedPillars(prev =>
      prev.includes(pillar)
        ? prev.filter(p => p !== pillar)
        : [...prev, pillar]
    );
  };

  const rankedNeighborhoods = useMemo(() => {
    return NEIGHBORHOODS.map(n => {
      let matchCount = 0;
      selectedPillars.forEach(p => {
        if (n.lifestylePillars.includes(p)) matchCount++;
      });
      const matchScore = selectedPillars.length > 0
        ? Math.round((matchCount / selectedPillars.length) * 100)
        : 75;

      return {
        ...n,
        matchScore
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [selectedPillars]);

  const pillarsList: { id: LifestylePillar; label: string; icon: any }[] = [
    { id: 'beach', label: 'Beach Access', icon: Waves },
    { id: 'city', label: 'Metropolitan / Skyline', icon: Building2 },
    { id: 'family', label: 'Top Schools & Family', icon: ShieldCheck },
    { id: 'nightlife', label: 'Michelin Dining & Nightlife', icon: Sparkles },
    { id: 'waterfront', label: 'Deep-Water & Boating', icon: Compass },
    { id: 'investment', label: 'Capital Appreciation', icon: DollarSign },
    { id: 'quiet', label: 'Tranquil & Gated Privacy', icon: Trees },
    { id: 'walkability', label: 'High Walk Score', icon: Sun },
  ];

  return (
    <div className="pt-24 pb-20 animate-fadeIn">
      {/* 1. Relocation Hero */}
      <section className="relative py-16 sm:py-24 border-b border-[rgba(244,239,226,0.1)] bg-gradient-to-b from-[#0B0B0B] via-[#141a1d] to-[#0B0B0B]">
        <div className="wrap">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow--dot mb-3">Relocation Intelligence · South Florida Elevated</span>
            <h1 className="font-serif text-4xl sm:text-6xl text-[#f4efe2] font-normal leading-[1.08] tracking-tight">
              Moving to South <em className="it text-[#ffd9a0]">Florida</em>?
            </h1>
            <p className="font-serif text-2xl sm:text-3xl text-[#c9a24a] italic mt-2">
              Start with the neighborhood — not the house.
            </p>
            <p className="text-base sm:text-lg text-[#f4efe2]/80 mt-6 font-light leading-relaxed">
              South Florida is not a single market; it is a tapestry of distinct micro-cultures, bridge heights, tax nuances, and lifestyle rhythms. Miguel guides individuals and families relocating from New York, Chicago, California, and across the globe to discover where they actually belong.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a href="#lifestyle-quiz" className="btn btn--gold">
                <span>Take the Lifestyle Match Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => onOpenContact('relocation', `I am planning a relocation from ${originCity} to South Florida and would like advisory assistance.`)}
                className="btn"
              >
                <span>Plan My Move</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Lifestyle Decision Engine */}
      <section id="lifestyle-quiz" className="py-16 border-b border-[rgba(244,239,226,0.08)] bg-[#101618]">
        <div className="wrap">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="mono-label text-[#c9a24a]">Interactive Decision Path</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f4efe2] font-normal mt-2">
              What matters <em className="it text-[#ffd9a0]">Most</em> to you?
            </h2>
            <p className="text-xs sm:text-sm text-[#f4efe2]/70 font-light mt-2">
              Select your essential lifestyle pillars. Our algorithm will dynamically evaluate and rank South Florida's premier neighborhoods for your profile.
            </p>
          </div>

          {/* Interactive Pillars Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 max-w-5xl mx-auto">
            {pillarsList.map((p) => {
              const isSelected = selectedPillars.includes(p.id);
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => togglePillar(p.id)}
                  className={`p-3.5 flex flex-col items-center justify-center text-center border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#c9a24a] bg-[#c9a24a]/20 text-[#ffd9a0] shadow-lg'
                      : 'border-[rgba(244,239,226,0.1)] bg-[#141a1d] text-[#f4efe2]/60 hover:text-[#f4efe2] hover:border-[#f4efe2]/30'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-[#ffd9a0]' : 'text-[#c9a24a]'}`} />
                  <span className="font-mono text-[11px] uppercase tracking-wider font-medium">{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Match Results */}
          <div className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="mono-label">Matched Enclaves</span>
                <h3 className="font-serif text-2xl text-[#f4efe2]">
                  Top Recommended <em className="it text-[#ffd9a0]">Enclaves</em>
                </h3>
              </div>
              <span className="font-mono text-xs text-[#c9a24a]">
                Showing top matches for ({selectedPillars.length}) active priorities
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rankedNeighborhoods.slice(0, 6).map((n) => (
                <div
                  key={n.id}
                  className="bg-[#141a1d] border border-[rgba(244,239,226,0.1)] hover:border-[#c9a24a] transition-all overflow-hidden flex flex-col justify-between group"
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
                      {n.matchScore}% Match
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="font-mono text-xs text-[#c9a24a] uppercase tracking-wider mb-1">
                        Walk Score: {n.walkScore}/100
                      </div>
                      <h4 className="font-serif text-2xl text-[#f4efe2]">{n.name}</h4>
                      <p className="font-serif text-xs text-[#ffd9a0] italic mt-0.5">{n.tagline}</p>
                      <p className="text-xs text-[#f4efe2]/75 font-light mt-3 leading-relaxed">
                        {n.vibe}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[rgba(244,239,226,0.08)]">
                      <div className="flex justify-between items-center text-xs font-mono text-[#f4efe2]/70 mb-3">
                        <span>Avg Price / Sq Ft:</span>
                        <span className="text-[#ffd9a0] font-bold">${n.avgPriceSqft}</span>
                      </div>
                      <button
                        onClick={() => onOpenContact('relocation', `I am interested in relocating to ${n.name} based on the Lifestyle Match.`)}
                        className="w-full btn btn--gold justify-center py-2.5 text-xs"
                      >
                        <span>Explore Homes in {n.name}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Florida Relocation Playbook */}
      <section className="py-20 border-b border-[rgba(244,239,226,0.08)] bg-[#0B0B0B]">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="eyebrow eyebrow--dot">Seamless Transition</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe2] font-normal leading-tight mt-3">
                The Relocation Playbook: Navigating the move with zero <em className="it text-[#ffd9a0]">Friction</em>.
              </h2>
              <p className="text-base text-[#f4efe2]/80 font-light mt-6 leading-relaxed">
                Relocating across state lines involves intricate timing: selling your current residence, coordinating school admission deadlines, leasing temporary quarters, and structuring your Florida tax domicile.
              </p>

              <div className="space-y-4 mt-8">
                {[
                  {
                    title: "01. Tax & Domicile Structuring",
                    body: "Establishing Florida statutory residency to take full advantage of 0% state income tax, 0% capital gains tax, and the Florida Homestead Exemption."
                  },
                  {
                    title: "02. School & Family Alignment",
                    body: "Strategic location selection aligned with top private and public institutions (Ransom Everglades, Pine Crest, Gulliver, Carrollton)."
                  },
                  {
                    title: "03. Yacht & Waterfront Access",
                    body: "Assessing canal depths, bridge heights (fixed vs. bascule), dockage permits, and proximity to Atlantic ocean inlets."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#141a1d] border border-[rgba(244,239,226,0.1)]">
                    <h4 className="font-serif text-lg text-[#ffd9a0]">{item.title}</h4>
                    <p className="text-xs text-[#f4efe2]/75 font-light mt-1 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Relocation Plan Request Form Card */}
            <div className="bg-[#141a1d] border border-[#c9a24a] p-8 sm:p-12 shadow-2xl space-y-6">
              <span className="mono-label text-[#c9a24a]">Personalized Roadmap</span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#f4efe2] font-normal">
                Plan Your Move With <em className="it text-[#ffd9a0]">Miguel</em>
              </h3>
              <p className="text-xs sm:text-sm text-[#f4efe2]/80 font-light leading-relaxed">
                Receive a bespoke relocation dossier outlining tailored neighborhood options, school districts, commute calculations, and property candidates.
              </p>

              <div className="space-y-4 pt-2">
                <div className="field">
                  <label>Relocating From (City / State)</label>
                  <input
                    type="text"
                    value={originCity}
                    onChange={(e) => setOriginCity(e.target.value)}
                    placeholder="E.g., New York, Chicago, Los Angeles, London"
                  />
                </div>

                <button
                  onClick={() => onOpenContact('relocation', `I am relocating from ${originCity} to South Florida and would like Miguel's Relocation Dossier.`)}
                  className="btn btn--gold w-full justify-center"
                >
                  <span>Plan My Move</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
