import { useState } from 'react';
import { Property } from '../types';
import ListingCard from '../components/ListingCard';
import { PROPERTIES } from '../data';

interface ListingsViewProps {
  onSelectProperty: (property: Property) => void;
  onOpenContact: (intent?: string, message?: string) => void;
}

const IDX_URL = "https://sef.mlsmatrix.com/Matrix/public/IDX.aspx?idx=4a851ff3";

export default function ListingsView({ onSelectProperty, onOpenContact }: ListingsViewProps) {
  const [viewMode, setViewMode] = useState<'idx' | 'featured'>('idx');
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight">
          MLS <span className="text-[#c8a96e]">Listings</span>
        </h1>
        <p className="text-[#f4efe2]/50 text-sm mt-2 max-w-2xl">
          Real-time South Florida property data from the Miami Association of REALTORS&reg; via SEF MLS Matrix.
        </p>
      </div>

      {/* View toggle */}
      <div className="flex gap-4 mb-8 border-b border-[#f4efe2]/10 pb-4">
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

      {viewMode === 'idx' ? (
        <div className="w-full">
          {/* Loading overlay */}
          {!iframeLoaded && (
            <div className="flex items-center justify-center bg-white/5 rounded-lg mb-4" style={{ height: '80vh', minHeight: '600px' }}>
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-[#c8a96e] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[#f4efe2]/50 text-sm">Loading MLS listings...</p>
              </div>
            </div>
          )}

          {/* IDX iframe with dark theme overlay styling */}
          <div
            className="rounded-lg overflow-hidden border border-[#f4efe2]/10"
            style={{ height: 'calc(100vh - 300px)', minHeight: '600px', display: iframeLoaded ? 'block' : 'none' }}
          >
            <iframe
              src={IDX_URL}
              className="w-full h-full"
              style={{
                border: 'none',
                background: '#0e1416',
              }}
              title="MLS Property Search"
              allow="geolocation"
              onLoad={() => setIframeLoaded(true)}
            />
          </div>

          <p className="text-[10px] text-[#f4efe2]/30 mt-3 text-center leading-relaxed">
            The multiple listing information is provided by the Miami Association of REALTORS&reg; from a copyrighted compilation of listings. 
            The compilation of listings and each individual are &copy;2026 Miami Association of REALTORS&reg;. All Rights Reserved.
            Information is deemed reliable but not guaranteed.
          </p>
        </div>
      ) : (
        <div>
          <p className="text-[12px] uppercase tracking-[0.12em] text-[#f4efe2]/40 mb-4">
            {PROPERTIES.length} featured properties
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROPERTIES.map((p) => (
              <ListingCard key={p.id} property={p} onClick={onSelectProperty} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => onOpenContact('buyer', "I'm interested in featured properties")}
              className="px-8 py-3 text-[11px] uppercase tracking-[0.15em] text-[#c8a96e] border border-[#c8a96e]/30 hover:bg-[#c8a96e]/10 transition-colors rounded"
            >
              Inquire About a Property
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
