import { Bed, Bath, Maximize2, CalendarClock } from 'lucide-react';
import { FeaturedListing } from '../types';
import { FEATURED_LISTINGS, money } from '../data';

interface ListingsViewProps {
  onSelectListing: (listing: FeaturedListing) => void;
  onOpenContact: (intent?: string, message?: string) => void;
}

export default function ListingsView({ onSelectListing, onOpenContact }: ListingsViewProps) {
  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight">
          Featured <span className="text-[#c8a96e]">Listings</span>
        </h1>
        <p className="text-[#f4efe2]/50 text-sm mt-2 max-w-2xl">
          A curated selection of South Florida residences presented by Miguel Perez. Select a
          property for full details — everything is viewed and arranged directly through this site.
        </p>
      </div>

      <p className="text-[12px] uppercase tracking-[0.12em] text-[#f4efe2]/40 mb-4">
        {FEATURED_LISTINGS.length} listings
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_LISTINGS.map((l) => (
          <button
            key={l.id}
            onClick={() => onSelectListing(l)}
            className="group text-left bg-[#141a1d] border border-[rgba(244,239,226,0.1)] hover:border-[#c8a96e] transition-all duration-300 overflow-hidden flex flex-col"
          >
            <div className={`relative h-56 w-full overflow-hidden ${l.grad}`}>
              <img
                src={l.img}
                alt={`${l.address}, ${l.city}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {l.openHouse ? (
                <span className="card-badge absolute top-3 left-3 bg-[#9a7629] text-white border-[#9a7629] flex items-center gap-1">
                  <CalendarClock className="w-3 h-3" />
                  Open House
                </span>
              ) : (
                <span className="card-badge absolute top-3 left-3 bg-black/80 text-[#deb65b] border-[#deb65b]/40">
                  {l.status}
                </span>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="font-mono text-[11px] text-[#c8a96e] uppercase tracking-wider mb-1">
                  {l.city}, {l.state}
                </div>
                <h3 className="font-serif text-xl text-[#f4efe2] group-hover:text-[#ffd9a0] transition-colors leading-snug">
                  {l.address}
                </h3>
                {l.propertyType && (
                  <p className="text-[11px] text-[#f4efe2]/45 mt-1">{l.propertyType}</p>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-[rgba(244,239,226,0.1)] flex items-end justify-between gap-3">
                <div className="font-mono text-lg font-semibold text-[#f4efe2]">{money(l.price)}</div>
                <div className="flex items-center gap-3 font-mono text-[11px] text-[#f4efe2]/60">
                  <span className="flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5 text-[#c8a96e]" />
                    {l.beds}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3.5 h-3.5 text-[#c8a96e]" />
                    {l.halfBaths ? `${l.baths}.5` : l.baths}
                  </span>
                  {l.sqft && (
                    <span className="flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5 text-[#c8a96e]" />
                      {l.sqft.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => onOpenContact('buyer', "I'm interested in the featured listings.")}
          className="px-8 py-3 text-[11px] uppercase tracking-[0.15em] text-[#c8a96e] border border-[#c8a96e]/30 hover:bg-[#c8a96e]/10 transition-colors rounded"
        >
          Inquire About a Property
        </button>
      </div>

      <p className="text-[10px] text-[#f4efe2]/30 mt-10 text-center leading-relaxed max-w-3xl mx-auto">
        Listing information is provided courtesy of the Miami Association of REALTORS&reg; MLS and is
        deemed reliable but not guaranteed. Properties are presented by Miguel Perez · South Florida Elevated.
      </p>
    </div>
  );
}
