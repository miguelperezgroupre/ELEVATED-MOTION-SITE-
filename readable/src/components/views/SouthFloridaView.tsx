import type { MouseEvent } from 'react';
import PageHero from '../PageHero';

/**
 * South Florida — lifestyle page (#south-florida). Hero: "Live Beyond the Address."
 * Editorial only: no invented stats, events, prices or listings. Photos: Unsplash / Pexels (free licenses),
 * hotlinked from their CDNs at responsive widths. Credits: CREDITS-HEROES.md
 */

type Props = {
  onOpenContact?: (intent?: string, message?: string) => void;
  onNavigate?: (view: any) => void;
};

const INSTAGRAM = 'https://www.instagram.com/southfloridaelevated';

const W = [480, 800, 1200];
const photo = (kind: 'us' | 'px', id: string) =>
  kind === 'us'
    ? { src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=65`, srcSet: W.map((w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=65 ${w}w`).join(', ') }
    : { src: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fm=webp&w=800`, srcSet: W.map((w) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fm=webp&w=${w} ${w}w`).join(', ') };

const COUNTIES = [
  {
    name: 'Miami-Dade',
    places: 'Miami · Miami Beach · Brickell · Coconut Grove · Coral Gables · Key Biscayne',
    body: 'Bay and ocean, skyline and Art Deco. The murals of Wynwood, the cafecito windows of Little Havana and the banyan-shaded streets of the Grove.',
  },
  {
    name: 'Broward',
    places: 'Fort Lauderdale · Las Olas · Victoria Park · Wilton Manors · Hollywood',
    body: 'A city laced with canals and the Intracoastal. Dinner on Las Olas, a boat at the end of the street and a beach-town pace close to the action.',
  },
  {
    name: 'Palm Beach',
    places: 'Palm Beach · West Palm Beach · Delray Beach · Boca Raton',
    body: 'Worth Avenue, the Norton Museum of Art and a quieter stretch of Atlantic coast, from the island to downtown West Palm and south to Boca.',
  },
];

type Pillar = {
  key: string;
  label: string;
  title: string;
  body: string;
  img: { src: string; srcSet: string };
  alt: string;
  position?: string;
  link: { label: string; view?: string; href?: string };
  span: string;
};

const PILLARS: Pillar[] = [
  {
    key: 'waterfront',
    label: '01 · WATERFRONT',
    title: 'Life on the Water',
    body: 'Biscayne Bay, the Intracoastal, the canals of Fort Lauderdale and miles of Atlantic beach. Here, the water sets the rhythm of the day.',
    img: photo('us', 'photo-1740486027088-d957f6dd76d2'),
    alt: 'Boats anchored on Biscayne Bay off Miami Beach',
    link: { label: 'New waterfront developments', view: 'developments' },
    span: 'lg:col-span-3',
  },
  {
    key: 'culture',
    label: '02 · CULTURE & ARTS',
    title: 'Culture on Every Corner',
    body: "Wynwood's open-air murals, the Pérez Art Museum Miami on the bay, Art Deco Miami Beach and the Norton in West Palm Beach.",
    img: photo('us', 'photo-1529326353831-df2fd0f44a9e'),
    alt: 'A fire hydrant in front of a mural in Wynwood, Miami',
    link: { label: 'Explore the neighborhoods', view: 'neighborhoods' },
    span: 'lg:col-span-3',
  },
  {
    key: 'dining',
    label: '03 · DINING',
    title: 'A Table Outside',
    body: 'Cafecito at a Little Havana window, long lunches on Lincoln Road, dinner on Las Olas. Much of the best of it happens outdoors.',
    img: photo('us', 'photo-1695266433270-ea3c0e367317'),
    alt: 'Palm trees and outdoor restaurants along Lincoln Road in Miami Beach',
    link: { label: "This week's picks on Instagram", href: INSTAGRAM },
    span: 'lg:col-span-2',
  },
  {
    key: 'outdoors',
    label: '04 · WELLNESS & OUTDOORS',
    title: 'Outside, Year-Round',
    body: 'Morning runs on the beach, paddling the bay, cycling to the Cape Florida Lighthouse on Key Biscayne, and the Everglades at the edge of the city.',
    img: photo('us', 'photo-1681604052824-bfd145234813'),
    alt: 'Cape Florida Lighthouse and palm tree on Key Biscayne',
    position: 'center 35%',
    link: { label: 'Plan your move', view: 'relocate' },
    span: 'lg:col-span-2',
  },
  {
    key: 'neighborhoods',
    label: '05 · NEIGHBORHOODS',
    title: 'A Collection of Places',
    body: "From Brickell's towers to Palm Beach's palm-lined streets, every neighborhood has its own pace. Finding yours is the first decision.",
    img: photo('px', '10408472'),
    alt: 'Palm-lined street leading to Worth Avenue in Palm Beach at sunrise',
    link: { label: 'Find where you belong', view: 'neighborhoods' },
    span: 'lg:col-span-2',
  },
];

function Arrow({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function SouthFloridaView({ onOpenContact, onNavigate }: Props) {
  const go = (view: string) => (e: MouseEvent) => {
    e.preventDefault();
    onNavigate?.(view);
  };

  return (
    <div className="bg-[#0e1416] text-[#f4efe2]">
      <PageHero page="south-florida" onOpenContact={onOpenContact} />

      {/* Three counties */}
      <section id="sf-intro" className="scroll-mt-20 border-b border-[rgba(244,239,226,0.08)]">
        <div className="wrap py-20 sm:py-28">
          <div className="max-w-3xl">
            <span className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-[#c9a24a]">Three Counties · One Coastline</span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal leading-[1.05] mt-4">
              From Palm Beach to the <em className="it text-[#ffd9a0]">Bay</em>.
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#f4efe2]/75 font-light leading-relaxed mt-6">
              South Florida is three counties along one stretch of Atlantic coast, and each has its own character. Start with the
              one that fits the way you want to live.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px mt-14 bg-[rgba(244,239,226,0.1)] border border-[rgba(244,239,226,0.1)]">
            {COUNTIES.map((c, i) => (
              <article key={c.name} className="bg-[#0e1416] p-7 sm:p-9 flex flex-col">
                <span className="font-mono text-[11px] tracking-[0.2em] text-[#c9a24a]">0{i + 1} · COUNTY</span>
                <h3 className="font-serif text-3xl sm:text-4xl font-normal mt-3">{c.name}</h3>
                <p className="font-mono text-[11px] leading-relaxed tracking-wider uppercase text-[#ffd9a0]/80 mt-4">{c.places}</p>
                <p className="font-sans text-sm sm:text-base text-[#f4efe2]/70 font-light leading-relaxed mt-4 flex-1">{c.body}</p>
                <a
                  href="#neighborhoods"
                  onClick={go('neighborhoods')}
                  className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a24a] hover:text-[#ffd9a0] transition-colors"
                >
                  Neighborhood guides <Arrow />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle pillars */}
      <section id="sf-lifestyle" className="bg-[#0B0B0B] border-b border-[rgba(244,239,226,0.08)]">
        <div className="wrap py-20 sm:py-28">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-[#c9a24a]">The Lifestyle</span>
              <h2 className="font-serif text-4xl sm:text-6xl font-normal leading-[1.05] mt-4">
                The Life Around the <em className="it text-[#ffd9a0]">Address</em>.
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-[#f4efe2]/70 font-light leading-relaxed max-w-md">
              Water, culture, food, the outdoors and the neighborhoods that hold it all together.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 mt-14">
            {PILLARS.map((p) => {
              const external = !!p.link.href;
              return (
                <article
                  key={p.key}
                  id={`sf-${p.key}`}
                  className={`group relative overflow-hidden border border-[rgba(244,239,226,0.1)] bg-[#0e1416] min-h-[420px] sm:min-h-[460px] flex flex-col justify-end ${p.span} ${p.key === 'neighborhoods' ? 'md:col-span-2 lg:col-span-2' : ''}`}
                >
                  <img
                    src={p.img.src}
                    srcSet={p.img.srcSet}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: p.position ?? 'center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/70 to-[#0B0B0B]/10 pointer-events-none" />
                  <div className="absolute inset-0 bg-[#1F6970]/10 mix-blend-color pointer-events-none" />
                  <div className="relative p-6 sm:p-8">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-[#c9a24a]">{p.label}</span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-normal mt-3 italic">{p.title}</h3>
                    <p className="font-sans text-sm sm:text-base text-[#f4efe2]/80 font-light leading-relaxed mt-3 max-w-lg">{p.body}</p>
                    <a
                      href={external ? p.link.href : `#${p.link.view}`}
                      onClick={external ? undefined : go(p.link.view as string)}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-[#ffd9a0] hover:text-[#c9a24a] transition-colors"
                    >
                      {p.link.label} <Arrow />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* This Week in South Florida */}
      <section id="sf-this-week" className="border-b border-[rgba(244,239,226,0.08)]">
        <div className="wrap py-20 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border border-[#c9a24a]/30 bg-[#04343F]/60 p-8 sm:p-12">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase text-[#c9a24a]">
                <span className="w-2 h-2 rounded-full bg-[#c9a24a] animate-pulse" /> Every Week on Instagram
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal leading-[1.05] mt-4">
                This Week in <em className="it text-[#ffd9a0]">South Florida</em>.
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#f4efe2]/75 font-light leading-relaxed mt-5 max-w-2xl">
                New openings, things to do and the places worth your weekend across Miami-Dade, Broward and Palm Beach, shared
                each week on Instagram.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4">
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="btn btn--gold cursor-pointer inline-flex items-center gap-2">
                <span>Follow @southfloridaelevated</span>
                <Arrow className="w-4 h-4" />
              </a>
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#f4efe2]/50">@southfloridaelevated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA (same pattern as the site's contact section) */}
      <section id="sf-contact" className="relative overflow-hidden" aria-label="Contact">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(201,162,74,0.16), transparent 70%)' }} />
        <div className="wrap relative py-24 sm:py-32 text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-[#c9a24a]">Your Next Chapter</span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.05] mt-4">
            Make It <em className="it text-[#ffd9a0]">Home</em>.
          </h2>
          <p className="font-sans text-base sm:text-xl text-[#f4efe2]/80 font-light leading-relaxed mt-6">
            Buying, selling, investing or relocating. Start with a conversation about the life you want here.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10">
            <button
              type="button"
              onClick={() => onOpenContact?.('general', "I'm exploring South Florida and would like to talk with Miguel.")}
              className="btn btn--gold cursor-pointer inline-flex items-center gap-2"
            >
              <span>Work With Miguel</span>
              <Arrow className="w-4 h-4" />
            </button>
            <a href="#relocate" onClick={go('relocate')} className="btn cursor-pointer inline-flex items-center gap-2">
              <span>Plan Your Move</span>
              <Arrow />
            </a>
          </div>
          <div className="pt-8 mt-14 border-t border-[rgba(244,239,226,0.12)] flex flex-wrap items-center justify-center gap-6 sm:gap-10 font-mono text-xs sm:text-sm">
            <a href="tel:+17864601023" className="text-[#ffd9a0] hover:text-[#c9a24a] transition-colors">(786) 460-1023</a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-[#f4efe2]/70 hover:text-[#c9a24a] transition-colors">@southfloridaelevated</a>
          </div>
        </div>
      </section>
    </div>
  );
}
