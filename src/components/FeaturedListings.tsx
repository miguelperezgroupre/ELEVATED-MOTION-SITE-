import React, { useState } from 'react';
import { Heart, Bed, Bath, Maximize2, ArrowRight, CalendarClock } from 'lucide-react';
import { FEATURED_LISTINGS, money } from '../data';
import { FeaturedListing, Property } from '../types';

interface FeaturedListingsProps {
  /** Retained for API compatibility with the home view; unused now that
   *  cards link straight to the brokerage listing pages. */
  onSelectProperty?: (property: Property) => void;
  onOpenContact?: () => void;
}

const BROKERAGE_ALL_LISTINGS = 'https://luxeknows.com/properties/sale';

function specLine(l: FeaturedListing): string {
  return [
    `${l.beds} bd`,
    `${l.baths} ba`,
    l.sqft ? `${l.sqft.toLocaleString()} sqft` : null,
  ]
    .filter(Boolean)
    .join('  ·  ');
}

export default function FeaturedListings({ onOpenContact }: FeaturedListingsProps) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const [hero, tall, ...rest] = FEATURED_LISTINGS;

  return (
    <section id="collection" className="sec sec--light" aria-label="Featured listings">
      <div className="wrap">
        {/* Head */}
        <div className="sec-head">
          <div>
            <span className="eyebrow">The Collection</span>
            <h2 className="h2 text-[#1a1e24]">Featured <em className="it text-[#9a7629]">Listings</em></h2>
          </div>
          <p className="lede text-[#4b5563]">
            A curated selection of South Florida's most extraordinary residences — each represented
            with editorial precision and white-glove discretion.
          </p>
        </div>

        {/* Top Split Grid: Hero Card + Secondary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Main Large Card */}
          <a
            href={hero.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="view"
            className="group lg:col-span-8 relative bg-white border border-[#e5e7eb] hover:border-[#9a7629] transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-xl"
          >
            <div className={`relative h-[360px] sm:h-[480px] w-full overflow-hidden ${hero.grad}`}>
              <img
                src={hero.img}
                alt={`${hero.address}, ${hero.city}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                }}
              />
              {hero.openHouse ? (
                <span className="card-badge absolute top-4 left-4 bg-[#9a7629] text-white border-[#9a7629] flex items-center gap-1.5">
                  <CalendarClock className="w-3.5 h-3.5" />
                  Open House · {hero.openHouse.label}
                </span>
              ) : (
                <span className="card-badge absolute top-4 left-4 bg-black/80 text-[#deb65b] border-[#deb65b]/40">
                  {hero.status}
                </span>
              )}
              <button
                type="button"
                onClick={(e) => toggleFavorite(e, hero.id)}
                aria-label="Save"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:text-[#e0ae6d] transition-colors"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    favorites[hero.id] ? 'fill-[#e0ae6d] text-[#e0ae6d]' : 'text-white'
                  }`}
                />
              </button>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs text-[#9a7629] uppercase tracking-wider mb-2">
                  {hero.city}, {hero.state}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1a1e24] group-hover:text-[#9a7629] transition-colors leading-tight">
                  {hero.address}
                </h3>
              </div>

              <div className="mt-8 pt-6 border-t border-[#e5e7eb] flex flex-wrap items-end justify-between gap-4">
                <div className="font-mono text-2xl sm:text-3xl text-[#1a1e24] font-semibold">
                  {money(hero.price)}
                </div>
                <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm text-[#4b5563]">
                  <span className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-[#9a7629]" />
                    {hero.beds} Beds
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4 text-[#9a7629]" />
                    {hero.baths} Baths
                  </span>
                  {hero.sqft && (
                    <span className="flex items-center gap-1.5">
                      <Maximize2 className="w-4 h-4 text-[#9a7629]" />
                      {hero.sqft.toLocaleString()} Sq Ft
                    </span>
                  )}
                </div>
              </div>
            </div>
          </a>

          {/* Secondary Tall Card */}
          <a
            href={tall.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="view"
            className="group lg:col-span-4 relative bg-white border border-[#e5e7eb] hover:border-[#9a7629] transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-xl"
          >
            <div className={`relative h-[280px] lg:h-[480px] w-full overflow-hidden ${tall.grad}`}>
              <img
                src={tall.img}
                alt={`${tall.address}, ${tall.city}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                }}
              />
              {tall.openHouse ? (
                <span className="card-badge absolute top-4 left-4 bg-[#9a7629] text-white border-[#9a7629] flex items-center gap-1.5">
                  <CalendarClock className="w-3.5 h-3.5" />
                  Open House · {tall.openHouse.label}
                </span>
              ) : (
                <span className="card-badge absolute top-4 left-4 bg-black/80 text-[#deb65b] border-[#deb65b]/40">
                  {tall.status}
                </span>
              )}
              <button
                type="button"
                onClick={(e) => toggleFavorite(e, tall.id)}
                aria-label="Save"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:text-[#e0ae6d] transition-colors"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    favorites[tall.id] ? 'fill-[#e0ae6d] text-[#e0ae6d]' : 'text-white'
                  }`}
                />
              </button>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs text-[#9a7629] uppercase tracking-wider mb-2">
                  {tall.city}, {tall.state}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1a1e24] group-hover:text-[#9a7629] transition-colors leading-tight">
                  {tall.address}
                </h3>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e5e7eb] flex flex-wrap items-end justify-between gap-4">
                <div className="font-mono text-xl sm:text-2xl text-[#1a1e24] font-semibold">
                  {money(tall.price)}
                </div>
                <div className="font-mono text-xs text-[#4b5563]">{specLine(tall)}</div>
              </div>
            </div>
          </a>
        </div>

        {/* Remaining listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rest.map((l) => (
            <a
              key={l.id}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="view"
              className="group relative bg-white border border-[#e5e7eb] hover:border-[#9a7629] transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-xl"
            >
              <div className={`relative h-64 w-full overflow-hidden ${l.grad}`}>
                <img
                  src={l.img}
                  alt={`${l.address}, ${l.city}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                  }}
                />
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
                <button
                  type="button"
                  onClick={(e) => toggleFavorite(e, l.id)}
                  aria-label="Save"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:text-[#e0ae6d] transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      favorites[l.id] ? 'fill-[#e0ae6d] text-[#e0ae6d]' : 'text-white'
                    }`}
                  />
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-[#9a7629] uppercase tracking-wider mb-2">
                    {l.city}, {l.state}
                  </div>
                  <h4 className="font-serif text-xl font-normal text-[#1a1e24] group-hover:text-[#9a7629] transition-colors leading-snug">
                    {l.address}
                  </h4>
                </div>

                <div className="mt-6 pt-4 border-t border-[#e5e7eb] flex items-end justify-between gap-3">
                  <div className="font-mono text-lg font-semibold text-[#1a1e24]">{money(l.price)}</div>
                  <div className="font-mono text-xs text-[#4b5563] text-right">{specLine(l)}</div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Section Foot */}
        <div className="mt-14 pt-8 border-t border-[#e5e7eb] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <p className="font-mono text-xs text-[#6b7280]">
            Inventory represented by Miguel Perez · Luxe Properties. Listing data via the MLS.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {onOpenContact && (
              <button className="btn" onClick={onOpenContact}>
                <span>Request a private showing</span>
              </button>
            )}
            <a className="btn btn--gold" href={BROKERAGE_ALL_LISTINGS} target="_blank" rel="noopener noreferrer">
              <span>View all listings</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
