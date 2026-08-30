import { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';

export type NavView = 'home' | 'buy' | 'sell' | 'relocate' | 'invest' | 'developments' | 'neighborhoods' | 'insights' | 'about';

interface NavigationProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  onOpenContact: (intent?: string, message?: string) => void;
}

export default function Navigation({ currentView, onNavigate, onOpenContact }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: NavView; label: string }[] = [
    { id: 'buy', label: 'Buy' },
    { id: 'sell', label: 'Sell' },
    { id: 'relocate', label: 'Relocate' },
    { id: 'invest', label: 'Invest' },
    { id: 'developments', label: 'Developments' },
    { id: 'neighborhoods', label: 'Neighborhoods' },
    { id: 'insights', label: 'Insights' },
    { id: 'about', label: 'About' },
  ];

  const handleLinkClick = (view: NavView) => {
    setMobileMenuOpen(false);
    document.documentElement.style.overflow = '';
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMobileMenu = () => {
    const nextState = !mobileMenuOpen;
    setMobileMenuOpen(nextState);
    document.documentElement.style.overflow = nextState ? 'hidden' : '';
  };

  return (
    <>
      <header
        id="nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[rgba(244,239,226,0.08)] py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#0B0B0B]/90 via-[#0B0B0B]/60 to-transparent py-5'
        }`}
      >
        <div className="wrap flex items-center justify-between">
          {/* Brand Monogram & Title */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer border-none bg-transparent p-0"
            aria-label="South Florida Elevated — Home"
          >
            <div className="w-8 h-8 rounded border border-[#c9a24a] bg-[#141a1d] flex items-center justify-center text-xs font-mono font-bold text-[#ffd9a0] group-hover:bg-[#c9a24a] group-hover:text-[#0B0B0B] transition-colors">
              MP
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl text-[#f4efe2] font-normal leading-tight group-hover:text-[#c9a24a] transition-colors">
                South Florida <span className="italic">Elevated</span>
              </span>
              <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#c9a24a]">
                By Miguel Perez
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-5 2xl:gap-7 list-none m-0 p-0">
              {navLinks.map((link) => {
                const isActive = currentView === link.id;
                return (
                  <li key={link.id}>
                    <button
                      onClick={() => handleLinkClick(link.id)}
                      className={`text-[11px] font-mono tracking-[0.12em] uppercase transition-all duration-200 cursor-pointer bg-transparent border-none p-1 ${
                        isActive
                          ? 'text-[#c9a24a] font-bold border-b border-[#c9a24a]'
                          : 'text-[#f4efe2]/80 hover:text-[#ffd9a0]'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            <a
              className="hidden lg:inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-[#f4efe2]/85 hover:text-[#c9a24a] transition-colors"
              href="tel:+17864601023"
            >
              <Phone className="w-3.5 h-3.5 text-[#c9a24a]" />
              <span>(786) 460-1023</span>
            </a>

            <button
              className="btn btn--sm hidden sm:inline-flex"
              onClick={() => onOpenContact('general', "Let's connect to discuss my South Florida real estate objectives.")}
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            {/* Hamburger for Mobile & Tablet */}
            <button
              className="xl:hidden text-[#f4efe2] p-2 hover:text-[#c9a24a] transition-colors cursor-pointer"
              onClick={toggleMobileMenu}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B0B0B]/98 backdrop-blur-xl flex flex-col justify-between pt-24 pb-10 px-8 animate-fadeIn xl:hidden">
          <div className="space-y-6">
            <div className="font-mono text-xs text-[#c9a24a] tracking-widest uppercase">
              Navigation Menu
            </div>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleLinkClick('home')}
                className={`text-left font-serif text-2xl tracking-wide transition-colors ${
                  currentView === 'home' ? 'text-[#c9a24a]' : 'text-[#f4efe2]'
                }`}
              >
                Home
              </button>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left font-serif text-2xl tracking-wide transition-colors ${
                    currentView === link.id ? 'text-[#c9a24a]' : 'text-[#f4efe2]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-[rgba(244,239,226,0.1)]">
            <a
              href="tel:+17864601023"
              className="flex items-center gap-2 font-mono text-sm text-[#ffd9a0]"
            >
              <Phone className="w-4 h-4 text-[#c9a24a]" />
              <span>(786) 460-1023</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                document.documentElement.style.overflow = '';
                onOpenContact('general', "Let's connect to discuss my South Florida real estate objectives.");
              }}
              className="btn btn--gold w-full justify-center"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
