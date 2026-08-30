import { NavView } from './Navigation';

interface FooterProps {
  onNavigate: (view: NavView) => void;
  onOpenContact: (intent?: string, message?: string) => void;
}

export default function Footer({ onNavigate, onOpenContact }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNav = (view: NavView) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090d0e] text-[#f4efe2] pt-20 pb-12 border-t border-[rgba(244,239,226,0.08)]">
      <div className="wrap space-y-16">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-2xl tracking-tight text-[#f4efe2] font-normal leading-tight">
                South Florida <span className="italic font-serif">Elevated</span>
              </span>
              <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[#c9a24a] mt-0.5">
                Miguel Perez · Luxury Real Estate Advisor
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#f4efe2]/70 max-w-sm font-light leading-relaxed">
              Miguel Perez is the trusted advisor. South Florida Elevated is the platform. Navigating Miami, Fort Lauderdale, and Palm Beach with institutional clarity and local native authority.
            </p>
          </div>

          {/* Column 1: Client Solutions */}
          <div className="space-y-4">
            <h5 className="font-mono text-xs text-[#c9a24a] uppercase tracking-widest font-semibold">
              Advisory
            </h5>
            <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-[#f4efe2]/75 list-none p-0">
              <li>
                <button onClick={() => handleNav('buy')} className="hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0">
                  Buy Residences
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('sell')} className="hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0">
                  Sell & Positioning
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('relocate')} className="hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0">
                  Relocation Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('invest')} className="hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0">
                  Capital & Investment
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Markets & Research */}
          <div className="space-y-4">
            <h5 className="font-mono text-xs text-[#c9a24a] uppercase tracking-widest font-semibold">
              Platform
            </h5>
            <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-[#f4efe2]/75 list-none p-0">
              <li>
                <button onClick={() => handleNav('developments')} className="hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0">
                  New Developments
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('neighborhoods')} className="hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0">
                  Neighborhood Guides
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('insights')} className="hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0">
                  Market Insights & Data
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0">
                  About Miguel Perez
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Advisory */}
          <div className="space-y-4">
            <h5 className="font-mono text-xs text-[#c9a24a] uppercase tracking-widest font-semibold">
              Connect
            </h5>
            <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-[#f4efe2]/75 list-none p-0">
              <li>
                <button
                  onClick={() => onOpenContact('general', 'I would like to schedule a private advisory consultation with Miguel.')}
                  className="hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
                >
                  Book Private Consultation
                </button>
              </li>
              <li>
                <a href="tel:+17864601023" className="font-mono text-xs text-[#ffd9a0] hover:text-[#c9a24a] transition-colors">
                  (786) 460-1023
                </a>
              </li>
              <li className="font-mono text-[11px] text-[#f4efe2]/60">
                Miami · Fort Lauderdale · Palm Beach
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Disclaimer */}
        <div className="pt-8 border-t border-[rgba(244,239,226,0.08)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-[11px] text-[#f4efe2]/50">
          <div className="space-y-1">
            <p>© {currentYear} South Florida Elevated · Miguel Perez · FL Real Estate License #SL3515849 · Luxe Properties</p>
            <p className="text-[10px] text-[#f4efe2]/35 max-w-2xl font-sans">
              Equal Housing Opportunity. Designations: ABR®, SRS, PSA, SFR®. Content and valuations are strategic estimates for informational purposes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="hover:text-[#c9a24a] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#c9a24a] transition-colors">Terms of Representation</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
