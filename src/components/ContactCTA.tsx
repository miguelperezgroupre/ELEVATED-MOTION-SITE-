import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

interface ContactCTAProps {
  onOpenContact: () => void;
}

export default function ContactCTA({ onOpenContact }: ContactCTAProps) {
  return (
    <section id="contact" className="relative py-28 sm:py-36 overflow-hidden bg-[#0e1416] text-[#f4efe2]" aria-label="Contact">
      {/* High-res ocean background with atmospheric shading */}
      <div className="absolute inset-0 z-0">
        <img
          alt="South Florida Coastline"
          aria-hidden="true"
          className="w-full h-full object-cover opacity-25 scale-105"
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1416] via-[#0e1416]/70 to-[#0e1416]" />
      </div>

      <div className="wrap relative z-10 text-center max-w-3xl mx-auto">
        <span className="eyebrow eyebrow--dot mb-4">Your Next Chapter</span>

        <h2 className="display text-4xl sm:text-6xl md:text-7xl font-normal text-[#f4efe2] mt-2 mb-6">
          Starts <em className="it text-[#ffd9a0]">Here</em>.
        </h2>

        <p className="lede text-[#f4efe2]/85 text-base sm:text-xl font-light mx-auto mb-10 leading-relaxed">
          Buying, selling, investing, or relocating — begin a confidential conversation and let's make the move strategic.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-14">
          <button className="btn btn--gold" onClick={onOpenContact}>
            <span>Schedule a private consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            className="btn"
            href="#collection"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#collection');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore properties
          </a>
        </div>

        {/* Contact Links */}
        <div className="pt-8 border-t border-[rgba(244,239,226,0.12)] flex flex-wrap items-center justify-center gap-6 sm:gap-10 font-mono text-xs sm:text-sm">
          <a
            href="tel:+17864601023"
            className="flex items-center gap-2 text-[#ffd9a0] hover:text-[#c9a24a] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            +1 786 460 1023
          </a>

          <a
            href="mailto:miguel@southfloridaelevated.com"
            className="flex items-center gap-2 text-[#f4efe2]/80 hover:text-[#c9a24a] transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            miguel@southfloridaelevated.com
          </a>

          <span className="flex items-center gap-1.5 text-[#f4efe2]/50">
            <MapPin className="w-3.5 h-3.5 text-[#c9a24a]" />
            Miami · Fort Lauderdale · Palm Beach
          </span>
        </div>
      </div>
    </section>
  );
}
