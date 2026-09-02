import React, { useState } from 'react';
import { Property } from '../../types';
import { PROPERTIES, money } from '../../data';
import ListingCard from '../ListingCard';

interface BuyViewProps {
  onSelectProperty: (property: Property) => void;
  onOpenContact: (intent?: string, message?: string) => void;
  onNavigateToNeighborhoods: () => void;
}

const IDX_URL = "https://sef.mlsmatrix.com/Matrix/public/IDX.aspx?idx=4a851ff3";

export default function BuyView({
  onSelectProperty,
  onOpenContact,
  onNavigateToNeighborhoods
}: BuyViewProps) {
  const [viewMode, setViewMode] = useState<'idx' | 'featured'>('idx');
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className="relative min-h-screen pt-28 pb-20">
      {/* Hero Banner */}
      <section className="bg-[#0e1416] border-b border-[rgba(244,239,226,0.08)]">
        <div className="wrap py-16">
          <div className="max-w-3xl">
            <span className="eyebrow text-[#c9a24a]">Buy</span>
            <h1 className="h2 text-[#f4efe2] mt-3">
              Find Your <em className="it text-[#ffd9a0]">Place</em> in South Florida
            </h1>
            <p className="lede text-[#f4efe2]/70 mt-4">
              Browse the full MiamiRE MLS below or explore our curated featured properties.
            </p>
          </div>
        </div>
      </section>

      {/* View Toggle */}
      <section className="bg-[#0e1416]">
        <div className="wrap pb-6">
          <div className="flex gap-4 border-b border-[#f4efe2]/10 pb-4">
            <button
              className={`px-6 py-2 text-[11px] uppercase tracking-[0.15em] rounded transition-colors ${
                viewMode === 'idx'
                  ? 'bg-[#c8a96e] text-black'
                  : 'border border-[#c8a96e]/30 text-[#c8a96e] hover:bg-[#c8a96e]/10'
              }`}
              onClick={() => setViewMode('idx')}
            >
              Full MLS Search
            </button>
            <button
              className={`px-6 py-2 text-[11px] uppercase tracking-[0.15em] rounded transition-colors ${
                viewMode === 'featured'
                  ? 'bg-[#c8a96e] text-black'
                  : 'border border-[#c8a96e]/30 text-[#c8a96e] hover:bg-[#c8a96e]/10'
              }`}
              onClick={() => setViewMode('featured')}
            >
              Featured Properties
            </button>
          </div>
        </div>
      </section>

      {viewMode === 'idx' ? (
        <section className="bg-[#0e1416]">
          <div className="wrap">
            {!iframeLoaded && (
              <div className="flex items-center justify-center bg-white/5 rounded-lg" style={{ height: '70vh', minHeight: '500px' }}>
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-[#c8a96e] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-[#f4efe2]/50 text-sm">Loading MLS listings...</p>
                </div>
              </div>
            )}
            <div
              className="rounded-lg overflow-hidden border border-[#f4efe2]/10"
              style={{ height: 'calc(100vh - 350px)', minHeight: '600px', display: iframeLoaded ? 'block' : 'none' }}
            >
              <iframe
                src={IDX_URL}
                className="w-full h-full"
                style={{ border: 'none', background: '#0e1416' }}
                title="MLS Property Search"
                allow="geolocation"
                onLoad={() => setIframeLoaded(true)}
              />
            </div>
            <p className="text-[10px] text-[#f4efe2]/30 mt-3 text-center leading-relaxed">
              The multiple listing information is provided by the Miami Association of REALTORS&reg; from a copyrighted compilation of listings. 
              The compilation of listings and each individual are &copy;2026 Miami Association of REALTORS&reg;. All Rights Reserved.
            </p>
          </div>
        </section>
      ) : (
        <section className="bg-[#0e1416]">
          <div className="wrap py-12">
            <p className="text-[12px] uppercase tracking-[0.12em] text-[#f4efe2]/40 mb-6">
              {PROPERTIES.length} featured properties
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROPERTIES.map((p) => (
                <ListingCard key={p.id} property={p} onClick={onSelectProperty} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={() => onOpenContact('buyer', "I'm interested in a property")}
                className="px-8 py-3 text-[11px] uppercase tracking-[0.15em] text-[#c8a96e] border border-[#c8a96e]/30 hover:bg-[#c8a96e]/10 transition-colors rounded"
              >
                Inquire About a Property
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
