import { Property } from '../types';
import { money } from '../data';

interface ListingCardProps {
  property: Property;
  onClick?: (property: Property) => void;
}

export default function ListingCard({ property, onClick }: ListingCardProps) {
  return (
    <div
      className={`relative group overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] ${property.grad}`}
      onClick={() => onClick?.(property)}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={property.img}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            // Fallback if image doesn't load
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badge */}
        {property.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-medium bg-white/10 backdrop-blur-md text-[#f4efe2] rounded-full border border-white/10">
            {property.badge}
          </span>
        )}

        {/* Price & Details */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-lg font-semibold text-white">{money(property.price)}</p>
          <p className="text-[11px] uppercase tracking-[0.12em] text-white/60 truncate">
            {property.name}
          </p>
          <div className="flex items-center gap-4 mt-1 text-[12px] text-white/70">
            <span>{property.beds} bed{property.beds !== 1 ? 's' : ''}</span>
            <span>{property.baths} bath{property.baths !== 1 ? 's' : ''}</span>
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
          <p className="text-[11px] text-white/50 mt-1 line-clamp-2">{property.desc}</p>
        </div>
      </div>
    </div>
  );
}
