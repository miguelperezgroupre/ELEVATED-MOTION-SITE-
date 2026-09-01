import { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { COMMUNITIES } from '../data';

interface SouthFloridaMapProps {
  onOpenContact: () => void;
}

export default function SouthFloridaMap({ onOpenContact }: SouthFloridaMapProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(7); // Default to Miami Beach
  const selected = selectedIndex !== null ? COMMUNITIES[selectedIndex] : null;

  return (
    <section id="communities" className="sec bg-[#04343F] text-[#f4efe2]" aria-label="South Florida communities">
      <div className="wrap">
        {/* Head */}
        <div className="sec-head sec-head--center mb-16">
          <div>
            <span className="eyebrow text-[18px]">The Cartographer</span>
            <h2 className="h2 text-[72px] text-[#f4efe2] mt-4">
              South Florida, <em className="it text-[#ffd9a0]">Mapped</em>
            </h2>
            <p className="lede text-[18px] font-normal text-[#f4efe2]/80 mt-3 mx-auto">
              Twelve communities, one coastline. Select a marker to read its market profile.
            </p>
          </div>
        </div>

        {/* Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Stage SVG & Interactive Pins */}
          <div className="lg:col-span-7 relative bg-[#0e1a1d] border border-[rgba(201,162,74,0.25)] min-h-[460px] sm:min-h-[580px] p-6 flex items-center justify-center overflow-hidden">
            <svg
              className="w-full h-full max-h-[540px]"
              viewBox="0 0 600 610"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#16262a" />
                  <stop offset="100%" stopColor="#0e1a1d" />
                </linearGradient>
              </defs>
              {/* Latitude / Longitude background grid lines */}
              <g stroke="rgba(244,239,226,0.06)" strokeWidth="1">
                <path d="M0 60H600M0 120H600M0 180H600M0 240H600M0 300H600M0 360H600M0 420H600M0 480H600M0 540H600" />
                <path d="M60 0V610M120 0V610M180 0V610M240 0V610M300 0V610M360 0V610M420 0V610M480 0V610M540 0V610" />
              </g>

              {/* Coastline landmass polygon */}
              <path
                d="M0 0 H352 C368 70 360 132 344 190 C330 246 322 300 310 352 C296 412 268 468 232 516 C196 562 152 592 120 610 H0 Z"
                fill="url(#land)"
              />
              <path
                d="M352 0 C368 70 360 132 344 190 C330 246 322 300 310 352 C296 412 268 468 232 516 C196 562 152 592 120 610"
                fill="none"
                stroke="rgba(201,162,74,0.35)"
                strokeWidth="1.5"
              />
              <path
                d="M300 424 C286 448 268 470 246 488"
                fill="none"
                stroke="rgba(201,162,74,0.2)"
                strokeWidth="1"
              />

              <text x="460" y="300" className="chart-txt font-mono text-[11px] uppercase tracking-widest fill-[#c9a24a]/40" textAnchor="middle">
                Atlantic Ocean
              </text>
              <text x="100" y="140" className="chart-txt font-mono text-[11px] uppercase tracking-widest fill-[#f4efe2]/25">
                Everglades
              </text>
            </svg>

            {/* Interactive Pins Overlay */}
            <div className="absolute inset-0 pointer-events-auto">
              {COMMUNITIES.map((c, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={c.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${c.x}%`, top: `${c.y}%` }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      aria-label={c.name}
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#c9a24a] ring-4 ring-[#c9a24a]/30 scale-125'
                          : 'bg-[#141a1d] border-2 border-[#c9a24a] hover:scale-125 hover:bg-[#c9a24a]'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#0e1416]' : 'bg-[#c9a24a]'}`} />
                    </button>
                    <span
                      className={`absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 pointer-events-none transition-all ${
                        isSelected
                          ? 'text-[#ffd9a0] font-bold bg-[#0e1416]/90 border border-[#c9a24a]/50'
                          : 'text-[#f4efe2]/60 group-hover:text-[#f4efe2]'
                      }`}
                    >
                      {c.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Detail Panel */}
          <div className="lg:col-span-5 bg-[#141a1d] border border-[rgba(244,239,226,0.12)] p-6 sm:p-10 flex flex-col justify-between">
            {selected ? (
              <div className="space-y-6">
                <div>
                  <span className="eyebrow text-[#c9a24a] mb-2">{selected.county}</span>
                  <h4 className="font-serif text-3xl sm:text-4xl text-[#f4efe2] font-normal">
                    {selected.name}
                  </h4>
                  <p className="text-sm text-[#f4efe2]/80 mt-3 leading-relaxed font-light">
                    {selected.profile}
                  </p>
                </div>

                {/* 4-Stat Grid */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-[rgba(244,239,226,0.1)]">
                  <div>
                    <span className="mono-label block text-[10px]">Median price</span>
                    <b className="num text-xl sm:text-2xl text-[#ffd9a0] font-semibold">{selected.price}</b>
                  </div>
                  <div>
                    <span className="mono-label block text-[10px]">Days on market</span>
                    <b className="num text-xl sm:text-2xl text-[#f4efe2]">{selected.dom}</b>
                  </div>
                  <div>
                    <span className="mono-label block text-[10px]">Inventory</span>
                    <b className="num text-xl sm:text-2xl text-[#f4efe2]">{selected.inv}</b>
                  </div>
                  <div>
                    <span className="mono-label block text-[10px]">Activity</span>
                    <div className="flex items-center gap-2">
                      <b className="num text-xl sm:text-2xl text-[#c9a24a]">{selected.act}</b>
                      <span className="text-[11px] text-[#f4efe2]/50 italic">({selected.note})</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <button className="btn btn--gold w-full justify-between" onClick={onOpenContact}>
                    <span>Request the full report</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <MapPin className="w-12 h-12 text-[#c9a24a] mb-4 opacity-50" />
                <h4 className="font-serif text-2xl text-[#f4efe2] mb-2">Select a community</h4>
                <p className="text-sm text-[#f4efe2]/60 max-w-xs">
                  Tap a marker on the map to reveal pricing, pace, and inventory for that pocket of the coast.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="font-mono text-xs text-[#f4efe2]/40 text-center mt-8">
          Community figures are sample values — connect a market data provider to publish live statistics
        </p>
      </div>
    </section>
  );
}
