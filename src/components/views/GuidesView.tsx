// @ts-nocheck
// South Florida Elevated: /guides, the library of downloadable neighborhood guides.
// Each card links to its gated page at /guides/<id>.
import {GUIDES} from '../../guide/guides';
import {src, srcSet} from '../../guide/media';

export default function GuidesView() {
  return (
    <div className="animate-fadeIn">
      <section className="relative overflow-hidden bg-[#052C3A] text-[#F4EFE2] pt-28 sm:pt-36 pb-14 sm:pb-20">
        <img src={src('aerial-sunset-coastal-skyline')} srcSet={srcSet('aerial-sunset-coastal-skyline')} sizes="100vw" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" style={{objectPosition: '50% 42%'}} loading="eager" decoding="async" />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{background: 'linear-gradient(180deg, rgba(5,44,58,0.93) 0%, rgba(5,44,58,0.87) 55%, rgba(5,44,58,0.95) 100%)'}} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{background: 'radial-gradient(ellipse 70% 60% at 25% 10%, rgba(201,162,74,0.22), transparent 65%)'}} />
        <div className="wrap relative max-w-4xl">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#C9A24A] m-0">Free downloads</p>
          <h1 className="font-serif font-normal text-[40px] sm:text-[62px] leading-[1.03] mt-3 mb-5 text-[#F4EFE2]">
            The <em className="it text-[#CC9744]">neighborhood guides</em>.
          </h1>
          <p className="text-[16px] sm:text-[19px] leading-relaxed text-[#F4EFE2]/85 max-w-[38rem]" style={{fontFamily: "'Manrope', var(--sans)"}}>
            Take one with you. Each guide covers the neighborhoods buyers ask about most, with sourced median prices, walk scores, the school picture and the flood exposure that decides your insurance bill.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-[#0B0B0B]">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
            {GUIDES.map((g) => (
              <a key={g.id} href={`/guides/${g.id}`} className="group block border border-[rgba(244,239,226,0.14)] hover:border-[#C9A24A] transition-colors no-underline overflow-hidden">
                <span className="block aspect-[8.5/11] overflow-hidden bg-[#052C3A]">
                  <img src={g.cover} alt={`Cover of ${g.title}`} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </span>
                <span className="block p-6">
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#C9A24A] block">{g.pages} pages · free · updated {g.updated}</span>
                  <span className="font-serif text-[26px] text-[#F4EFE2] block mt-1 leading-snug">The {g.city} Neighborhood Guide</span>
                  <span className="text-[14px] text-[#F4EFE2]/70 font-light block mt-2 leading-relaxed">{g.blurbShort}</span>
                  <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#E7C878] block mt-4">Get the guide →</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
