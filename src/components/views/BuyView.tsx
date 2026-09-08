import { Property } from '../../types';
import { PROPERTIES } from '../../data';
import ListingCard from '../ListingCard';

interface BuyViewProps {
  onSelectProperty: (property: Property) => void;
  onOpenContact: (intent?: string, message?: string) => void;
  onNavigateToNeighborhoods: () => void;
}

export default function BuyView({
  onSelectProperty,
  onOpenContact,
}: BuyViewProps) {
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
              Explore a curated selection of featured properties represented by Miguel Perez.
            </p>
          </div>
        </div>
      </section>

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
    </div>
  );
}
