import React, { useState } from 'react';
import { Heart, Bed, Bath, Maximize2, ArrowRight } from 'lucide-react';
import { Property } from '../types';
import { PROPERTIES, money } from '../data';

interface FeaturedListingsProps {
  onSelectProperty: (property: Property) => void;
  onOpenContact: () => void;
}

export default function FeaturedListings({ onSelectProperty, onOpenContact }: FeaturedListingsProps) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const p0 = PROPERTIES[0]; // La Gorce (Hero card)
  const p1 = PROPERTIES[1]; // Palm Beach
  const moreListings = [PROPERTIES[2], PROPERTIES[3], PROPERTIES[7]]; // Las Olas, Brickell, Island

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
            A curated selection of South Florida's most extraordinary residences — each represented with editorial precision and white-glove discretion.
          </p>
        </div>

        {/* Top Split Grid: Hero Card + Secondary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Main Large Card */}
          <div
            onClick={() => onSelectProperty(p0)}
            data-cursor="view"
            className="group lg:col-span-8 relative cursor-pointer bg-white border border-[#e5e7eb] hover:border-[#9a7629] transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-xl"
          >
            <div className={`relative h-[360px] sm:h-[480px] w-full overflow-hidden ${p0.grad}`}>
              <img
                src={p0.img}
                alt={p0.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <span className="card-badge absolute top-4 left-4 bg-black/80 text-[#deb65b] border-[#deb65b]/40">
                {p0.badge}
              </span>
              <button
                type="button"
                onClick={(e) => toggleFavorite(e, p0.id)}
                aria-label="Save"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:text-[#e0ae6d] transition-colors"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    favorites[p0.id] ? 'fill-[#e0ae6d] text-[#e0ae6d]' : 'text-white'
                  }`}
                />
              </button>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs text-[#9a7629] uppercase tracking-wider mb-2">
                  {p0.city}, FL
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1a1e24] group-hover:text-[#9a7629] transition-colors leading-tight">
                  {p0.name}
                </h3>
              </div>

              <div className="mt-8 pt-6 border-t border-[#e5e7eb] flex flex-wrap items-end justify-between gap-4">
                <div className="font-mono text-2xl sm:text-3xl text-[#1a1e24] font-semibold">
                  {money(p0.price)}
                </div>
                <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm text-[#4b5563]">
                  <span className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-[#9a7629]" />
                    {p0.beds} Beds
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4 text-[#9a7629]" />
                    {p0.baths} Baths
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Maximize2 className="w-4 h-4 text-[#9a7629]" />
                    {p0.sqft.toLocaleString()} Sq Ft
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Tall Card */}
          <div
            onClick={() => onSelectProperty(p1)}
            data-cursor="view"
            className="group lg:col-span-4 relative cursor-pointer bg-white border border-[#e5e7eb] hover:border-[#9a7629] transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-xl"
          >
            <div className={`relative h-[280px] lg:h-[480px] w-full overflow-hidden ${p1.grad}`}>
              <img
                src={p1.img}
                alt={p1.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <span className="card-badge absolute top-4 left-4 bg-black/80 text-[#deb65b] border-[#deb65b]/40">
                {p1.badge}
              </span>
              <button
                type="button"
                onClick={(e) => toggleFavorite(e, p1.id)}
                aria-label="Save"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:text-[#e0ae6d] transition-colors"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    favorites[p1.id] ? 'fill-[#e0ae6d] text-[#e0ae6d]' : 'text-white'
                  }`}
                />
              </button>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs text-[#9a7629] uppercase tracking-wider mb-2">
                  {p1.city}, FL
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1a1e24] group-hover:text-[#9a7629] transition-colors leading-tight">
                  {p1.name}
                </h3>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e5e7eb] flex flex-wrap items-end justify-between gap-4">
                <div className="font-mono text-xl sm:text-2xl text-[#1a1e24] font-semibold">
                  {money(p1.price)}
                </div>
                <div className="flex items-center gap-3 font-mono text-xs text-[#4b5563]">
                  <span>{p1.beds} bd</span>
                  <span>·</span>
                  <span>{p1.baths} ba</span>
                  <span>·</span>
                  <span>{p1.sqft.toLocaleString()} sqft</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Secondary Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {moreListings.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectProperty(p)}
              data-cursor="view"
              className="group relative cursor-pointer bg-white border border-[#e5e7eb] hover:border-[#9a7629] transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-xl"
            >
              <div className={`relative h-64 w-full overflow-hidden ${p.grad}`}>
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="card-badge absolute top-3 left-3 bg-black/80 text-[#deb65b] border-[#deb65b]/40">
                  {p.badge}
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleFavorite(e, p.id)}
                  aria-label="Save"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:text-[#e0ae6d] transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      favorites[p.id] ? 'fill-[#e0ae6d] text-[#e0ae6d]' : 'text-white'
                    }`}
                  />
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-[#9a7629] uppercase tracking-wider mb-2">
                    {p.city}, FL
                  </div>
                  <h4 className="font-serif text-xl font-normal text-[#1a1e24] group-hover:text-[#9a7629] transition-colors leading-snug">
                    {p.name}
                  </h4>
                </div>

                <div className="mt-6 pt-4 border-t border-[#e5e7eb] flex items-end justify-between">
                  <div className="font-mono text-lg font-semibold text-[#1a1e24]">
                    {money(p.price)}
                  </div>
                  <div className="flex items-center gap-2.5 font-mono text-xs text-[#4b5563]">
                    <span>{p.beds} bd</span>
                    <span>·</span>
                    <span>{p.baths} ba</span>
                    <span>·</span>
                    <span>{p.sqft.toLocaleString()} sqft</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Foot */}
        <div className="mt-14 pt-8 border-t border-[#e5e7eb] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <p className="font-mono text-xs text-[#6b7280]">
            Sample inventory shown — connect an MLS/IDX feed for live listings
          </p>
          <button className="btn btn--ink" onClick={onOpenContact}>
            <span>View the full portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
