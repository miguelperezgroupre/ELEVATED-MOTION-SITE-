import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { PAGE_HEROES, type HeroCta } from './pageHeroContent';

/**
 * PageHero — the inner-page version of the homepage "hero-experience".
 * Same system as the home hero: sticky full-screen stage, scroll-scrubbed photo layers
 * (scale + drift + crossfade), identical overlay stack, mono eyebrow with pulsing gold dot,
 * Instrument Serif italic headline, gold supporting line, gold CTA (+ optional outline CTA), mono data bar,
 * scroll indicator and the right-side phase navigator. Three phases instead of five:
 * 01 Intro → 02 Statement → 03 Next step (keyword CTA).
 */

type Props = {
  page: string;
  onOpenContact?: (intent?: string, message?: string) => void;
};

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const lerp = (p: number, a: number, b: number, from: number, to: number) =>
  p <= a ? from : p >= b ? to : from + ((p - a) / (b - a)) * (to - from);

const PHASES = [
  { phase: 1, label: '01 / INTRO', at: 0 },
  { phase: 2, label: '02 / POSITION', at: 0.47 },
  { phase: 3, label: '03 / NEXT STEP', at: 0.9 },
];

function Arrow({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function PageHero({ page, onOpenContact }: Props) {
  const c = PAGE_HEROES[page];
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const v = travel <= 0 ? 0 : clamp(-r.top / travel, 0, 1);
      setP(v);
      setActive(v < 0.3 ? 1 : v < 0.64 ? 2 : 3);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    measure();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const jump = useCallback((phase: number) => {
    if (!ref.current) return;
    const travel = ref.current.offsetHeight - window.innerHeight;
    const at = PHASES.find((x) => x.phase === phase)?.at ?? 0;
    window.scrollTo({ top: ref.current.offsetTop + at * travel, behavior: 'smooth' });
  }, []);

  const toContent = useCallback(() => {
    if (!ref.current) return;
    window.scrollTo({ top: ref.current.offsetTop + ref.current.offsetHeight - 72, behavior: 'smooth' });
  }, []);

  const run = useCallback(
    (cta: HeroCta) => (e: MouseEvent) => {
      if (cta.href && cta.href.startsWith('#')) {
        e.preventDefault();
        const el = document.getElementById(cta.href.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else toContent();
        return;
      }
      if (cta.href) return; // tel:, mailto:, external
      e.preventDefault();
      if (cta.scroll) return toContent();
      onOpenContact?.(cta.intent ?? 'general', cta.message ?? '');
    },
    [onOpenContact, toContent],
  );

  if (!c) return null;

  // Phase curves (same easing family as the homepage hero)
  const intro = reduced ? (p < 0.3 ? 1 : 0) : clamp(lerp(p, 0.06, 0.27, 1, 0), 0, 1);
  const introY = reduced ? 0 : lerp(p, 0, 0.27, 0, -60);
  const introS = reduced ? 1 : lerp(p, 0, 0.27, 1, 1.08);
  const stmt = reduced
    ? p >= 0.3 && p < 0.64 ? 1 : 0
    : clamp(p < 0.46 ? lerp(p, 0.25, 0.36, 0, 1) : lerp(p, 0.56, 0.66, 1, 0), 0, 1);
  const stmtY = reduced ? 0 : lerp(p, 0.25, 0.66, 40, -40);
  const stmtS = reduced ? 1 : lerp(p, 0.25, 0.66, 1.04, 1.12);
  const next = reduced ? (p >= 0.64 ? 1 : 0) : clamp(lerp(p, 0.64, 0.76, 0, 1), 0, 1);
  const nextY = reduced ? 0 : lerp(p, 0.64, 1, 40, 0);
  const bgS = reduced ? 1 : lerp(p, 0, 1, 1, 1.25);
  const bgY = reduced ? 0 : lerp(p, 0, 1, 0, -60);

  const three = c.photos.length === 3;
  const op0 = clamp(lerp(p, 0, 0.55, 0.85, three ? 0.12 : 0.22), 0, 0.85);
  const op1 = three
    ? clamp(p < 0.6 ? lerp(p, 0.22, 0.45, 0, 0.62) : lerp(p, 0.62, 0.85, 0.62, 0.08), 0, 0.62)
    : clamp(lerp(p, 0.22, 0.7, 0, 0.6), 0, 0.6);
  const op2 = three ? clamp(lerp(p, 0.6, 0.86, 0, 0.62), 0, 0.62) : 0;
  const ops = [op0, op1, op2];

  const word = c.next.word;
  const wordSize = `clamp(40px, ${Math.min(14, 92 / word.length).toFixed(2)}vw, 132px)`;

  return (
    <div
      id={`hero-${page}`}
      data-sfe-hero={page}
      ref={ref}
      className="relative w-full bg-[#0B0B0B] h-[260vh] md:h-[300vh]"
    >
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden flex flex-col justify-between select-none">
        {/* Imagery */}
        <div
          className="absolute inset-0 z-0 origin-center will-change-transform pointer-events-none"
          style={{ transform: `scale(${bgS.toFixed(4)}) translateY(${bgY.toFixed(2)}px)` }}
        >
          <div className="absolute inset-0 bg-[#0B0B0B]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#081014] via-[#132730]/60 to-[#0B0B0B]" />
            <div
              className="absolute inset-0 opacity-40 mix-blend-screen"
              style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,162,74,0.25), transparent 70%)' }}
            />
          </div>
          {c.photos.map((ph, i) => (
            <img
              key={ph.src}
              src={ph.src}
              srcSet={ph.srcSet}
              sizes="(orientation: portrait) 210vh, 100vw"
              alt={i === 0 ? ph.alt : ''}
              aria-hidden={i === 0 ? undefined : true}
              decoding="async"
              fetchPriority={i === 0 ? 'high' : 'low'}
              className={`absolute inset-0 w-full h-full object-cover ${i === 0 ? '' : 'mix-blend-luminosity'}`}
              style={{ objectPosition: ph.position ?? 'center', opacity: ops[i] }}
            />
          ))}
          <div className="absolute inset-0 bg-radial from-transparent via-[#0B0B0B]/50 to-[#0B0B0B]/95 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/80 via-transparent to-[#0B0B0B] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/70 via-[#0B0B0B]/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[#1F6970]/10 mix-blend-color pointer-events-none" />
        </div>

        {/* Phase navigator */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-3 font-mono text-[10px] tracking-widest text-[#f4efe2]/40">
          {PHASES.map((ph) => (
            <button
              key={ph.phase}
              type="button"
              onClick={() => jump(ph.phase)}
              className={`group flex items-center gap-3 transition-all duration-300 cursor-pointer bg-transparent border-none p-1 ${active === ph.phase ? 'text-[#c9a24a] font-bold' : 'hover:text-[#f4efe2]'}`}
              aria-label={`Jump to ${ph.label}`}
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">{ph.label}</span>
              <span className={`w-2 h-2 rounded-full border transition-all ${active === ph.phase ? 'bg-[#c9a24a] border-[#c9a24a] scale-125' : 'border-[#f4efe2]/30 bg-transparent group-hover:border-[#c9a24a]'}`} />
            </button>
          ))}
        </div>

        {/* 01 — Intro */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full pointer-events-none will-change-transform"
          style={{
            opacity: intro,
            transform: `translateY(${introY}px) scale(${introS})`,
            visibility: intro <= 0.01 ? 'hidden' : 'visible',
            pointerEvents: intro > 0.4 ? 'auto' : 'none',
          }}
        >
          <div className="flex items-center gap-3 animate-fadeIn">
            <span className="w-2 h-2 shrink-0 rounded-full bg-[#c9a24a] animate-pulse" />
            <span className="font-mono text-[12px] sm:text-[15px] lg:text-[18px] tracking-[0.22em] uppercase text-[#ffd9a0] font-semibold">
              {c.eyebrow}
            </span>
          </div>

          <div className={c.portrait ? 'grid grid-cols-1 lg:grid-cols-12 gap-10 items-center' : ''}>
            <div className={`max-w-4xl space-y-5 sm:space-y-6 ${c.portrait ? 'lg:col-span-8' : ''}`}>
              {c.portrait && (
                <div className="lg:hidden w-20 h-24 overflow-hidden border border-[#c9a24a]/40 shadow-2xl">
                  <img src={c.portrait} alt="Miguel Perez" className="w-full h-full object-cover object-top" />
                </div>
              )}
              <h1 className="font-serif text-[clamp(46px,7.4vw,100px)] text-[#f4efe2] font-normal leading-[0.98] tracking-tight italic">
                {c.title}
              </h1>
              <p className="font-serif text-[#ffd9a0] text-[clamp(21px,2.5vw,36px)] leading-[1.18] max-w-3xl">{c.support}</p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                <a href={c.primary.href ?? '#'} onClick={run(c.primary)} className="btn btn--gold cursor-pointer inline-flex items-center gap-2">
                  <span>{c.primary.label}</span>
                  <Arrow />
                </a>
                {c.secondary && (
                  <a
                    href={c.secondary.href ?? '#'}
                    onClick={run(c.secondary)}
                    className="btn btn--sm cursor-pointer inline-flex items-center gap-2 border border-[#f4efe2]/20 hover:border-[#ffd9a0]"
                  >
                    <span>{c.secondary.label}</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
            {c.portrait && (
              <div className="hidden lg:block lg:col-span-4">
                <div className="relative aspect-[4/5] max-h-[56vh] ml-auto overflow-hidden border border-[#c9a24a]/30 shadow-2xl">
                  <img src={c.portrait} alt="Miguel Perez, South Florida real estate advisor" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#ffd9a0]">
                    <span>FL LIC #SL3515849</span>
                    <span>LUXE PROPERTIES</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-end justify-between border-t border-[rgba(244,239,226,0.12)] pt-5 sm:pt-6">
            <div className="hidden sm:flex items-center gap-8 font-mono text-[11px] text-[#f4efe2]/60 uppercase tracking-widest">
              {c.stats.map((s) => (
                <div key={s.label + s.value}>
                  <span className="text-[#c9a24a] block font-bold">{s.value}</span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <div onClick={() => jump(2)} className="flex items-center gap-3 cursor-pointer group ml-auto">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#f4efe2]/80 group-hover:text-[#ffd9a0] transition-colors">
                SCROLL TO EXPLORE
              </span>
              <div className="relative w-5 h-10 border border-[#f4efe2]/30 rounded-full flex justify-center p-1 group-hover:border-[#c9a24a] transition-colors">
                <div className="w-1 bg-[#c9a24a] rounded-full will-change-transform" style={{ height: `${Math.max(6, Math.min(24, p * 100))}px` }} />
              </div>
            </div>
          </div>
        </div>

        {/* 02 — Statement */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center px-6 sm:px-12 md:px-20 max-w-6xl mx-auto w-full pointer-events-none will-change-transform"
          style={{
            opacity: stmt,
            transform: `translateY(${stmtY}px) scale(${stmtS})`,
            visibility: stmt <= 0.01 ? 'hidden' : 'visible',
            pointerEvents: stmt > 0.4 ? 'auto' : 'none',
          }}
        >
          <div className="text-center space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-[#1F6970] bg-[#141a1d]/80 px-4 py-1.5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a24a]" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#ffd9a0]">{c.statement.badge}</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#f4efe2] font-normal leading-[1.08]">
              {c.statement.pre}
              <em className="it text-[#ffd9a0]">{c.statement.em}</em>
              {c.statement.post}
            </h2>
            <p className="font-sans text-base sm:text-xl text-[#f4efe2]/85 font-light leading-relaxed max-w-2xl mx-auto">{c.statement.body}</p>
            <div className="pt-4 flex justify-center gap-4">
              <button type="button" onClick={() => jump(3)} className="btn btn--sm border border-[#c9a24a] text-[#ffd9a0] cursor-pointer inline-flex items-center gap-2">
                <span>CONTINUE</span>
                <Arrow className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 03 — Next step */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center px-6 sm:px-12 w-full pointer-events-none will-change-transform"
          style={{
            opacity: next,
            transform: `translateY(${nextY}px)`,
            visibility: next <= 0.01 ? 'hidden' : 'visible',
            pointerEvents: next > 0.4 ? 'auto' : 'none',
          }}
        >
          <div className="relative w-full max-w-5xl text-center flex flex-col items-center">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#c9a24a] mb-4">{c.next.label}</span>
            <h2 className="font-serif text-[#f4efe2] font-normal tracking-tight leading-none" style={{ fontSize: wordSize }}>
              <em className="it text-[#ffd9a0]">{word}</em>.
            </h2>
            <p className="font-sans text-sm sm:text-lg text-[#f4efe2]/80 font-light mt-6 max-w-xl">{c.next.body}</p>
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 pt-8">
              <a href={c.next.cta.href ?? '#'} onClick={run(c.next.cta)} className="btn btn--gold cursor-pointer inline-flex items-center gap-2">
                <span>{c.next.cta.label}</span>
                <Arrow />
              </a>
              <button
                type="button"
                onClick={toContent}
                className="btn btn--sm cursor-pointer inline-flex items-center gap-2 border border-[#f4efe2]/20 hover:border-[#ffd9a0]"
              >
                <span>CONTINUE TO PAGE</span>
                <Arrow className="w-3.5 h-3.5 rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
