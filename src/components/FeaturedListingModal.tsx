import { X, Phone, ArrowRight, CalendarClock, MapPin } from 'lucide-react';
import { FeaturedListing } from '../types';
import { money } from '../data';

interface FeaturedListingModalProps {
  listing: FeaturedListing | null;
  onClose: () => void;
  onOpenContact: (intent?: string, message?: string) => void;
}

export default function FeaturedListingModal({ listing, onClose, onOpenContact }: FeaturedListingModalProps) {
  if (!listing) return null;

  const l = listing;
  const fullAddress = `${l.address}, ${l.city}, ${l.state} ${l.zip}`;
  const baths = l.halfBaths ? `${l.baths} full · ${l.halfBaths} half` : `${l.baths}`;

  const specs: { label: string; value: string }[] = [
    { label: 'Bedrooms', value: String(l.beds) },
    { label: 'Bathrooms', value: baths },
    { label: 'Living area', value: l.sqft ? `${l.sqft.toLocaleString()} sq ft` : '—' },
    { label: 'Year built', value: l.yearBuilt ? String(l.yearBuilt) : '—' },
    { label: 'Lot size', value: l.lotSize ?? '—' },
    { label: 'Type', value: l.propertyType ?? '—' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={`${l.address} — listing detail`}
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#141a1d] border border-[rgba(201,162,74,0.3)] shadow-2xl overflow-hidden z-10 my-auto">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-[#f4efe2] hover:text-[#c9a24a] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero photo */}
        <div className={`relative h-[260px] sm:h-[360px] w-full overflow-hidden ${l.grad}`}>
          <img
            src={l.img}
            alt={fullAddress}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141a1d] via-transparent to-transparent" />
          {l.openHouse ? (
            <span className="card-badge absolute top-4 left-4 bg-[#9a7629] text-white border-[#9a7629] flex items-center gap-1.5">
              <CalendarClock className="w-3.5 h-3.5" />
              Open House · {l.openHouse.label}
            </span>
          ) : (
            <span className="card-badge absolute top-4 left-4 bg-black/80 text-[#deb65b] border-[#deb65b]/40">
              {l.status}
            </span>
          )}
        </div>

        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-[#c9a24a] uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5" />
                {l.city}, {l.state}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#f4efe2] font-normal leading-snug">
                {l.address}
              </h3>
              <p className="font-mono text-[11px] text-[#f4efe2]/45 mt-1">{fullAddress}</p>
            </div>
            <div className="font-mono text-2xl sm:text-3xl text-[#ffd9a0] font-bold">
              {money(l.price)}
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4 my-5 border-y border-[rgba(244,239,226,0.1)]">
            {specs.map((s) => (
              <div key={s.label}>
                <b className="font-mono text-sm sm:text-base text-[#f4efe2] block leading-tight">{s.value}</b>
                <span className="mono-label text-[9px]">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          {l.description && (
            <p className="text-xs sm:text-sm text-[#f4efe2]/80 font-light leading-relaxed mb-5">
              {l.description}
            </p>
          )}

          {/* Features */}
          {l.features && l.features.length > 0 && (
            <div className="mb-6">
              <span className="mono-label text-[#c9a24a] block mb-2">Highlights</span>
              <div className="flex flex-wrap gap-1.5">
                {l.features.map((f) => (
                  <span key={f} className="tag text-[9px]">{f}</span>
                ))}
              </div>
            </div>
          )}

          {l.mlsNumber && (
            <p className="font-mono text-[10px] text-[#f4efe2]/40 mb-5">MLS #{l.mlsNumber}</p>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <button
              className="btn btn--gold w-full justify-between"
              onClick={() => {
                onClose();
                onOpenContact('buyer', `I'd like to request a private showing of ${l.address}, ${l.city} (${money(l.price)}).`);
              }}
            >
              <span>Request a private showing</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a className="btn w-full justify-center" href="tel:+17864601023">
              <Phone className="w-3.5 h-3.5" />
              <span>Call Miguel (786) 460-1023</span>
            </a>

            <p className="mono-label text-[9px] text-[#f4efe2]/40 text-center pt-1 leading-relaxed">
              Presented by Miguel Perez · South Florida Elevated. Listing information via the
              Miami Association of REALTORS&reg; MLS — deemed reliable but not guaranteed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
