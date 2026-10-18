// @ts-nocheck
// South Florida Elevated: /home-value (Oct 2026). Standalone landing page for the free home evaluation,
// built for QR traffic from printed mailers (e.g. ?utm_source=mailer&utm_campaign=tarpon-river-just-sold).
// Reuses the existing HomeValuation component and the same contact modal / leadService path as /sell.
import {useEffect, useState} from 'react';
import {ArrowRight, Phone} from 'lucide-react';
import HomeValuation from '../HomeValuation';

const clean = (v) => String(v || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 60);

function readUtm() {
  if (typeof window === 'undefined') return {};
  const q = new URLSearchParams(window.location.search);
  return {source: clean(q.get('utm_source')), medium: clean(q.get('utm_medium')), campaign: clean(q.get('utm_campaign'))};
}

const STEPS = [
  {n: '01', t: 'Share the basics', d: 'Address, property type, size and layout. It takes about a minute.'},
  {n: '02', t: 'See a rough range', d: 'An instant starting point based on a verified neighborhood median, clearly labeled as arithmetic.'},
  {n: '03', t: 'Get a personal valuation', d: 'Miguel reviews relevant local sales and your home\u2019s unique features, then sends a documented valuation.'},
];

export default function HomeValueView({onOpenContact, variant = 'general'}) {
  const isMailer = variant === 'mailer';
  const [utm, setUtm] = useState({});
  useEffect(() => { setUtm(readUtm()); }, []);
  const tag = utm.source ? ` [via ${utm.source}]` : '';
  const utmStr = utm.source ? `utm_source=${utm.source}${utm.campaign ? '&utm_campaign=' + utm.campaign : ''}` : '';
  // Mailer page leads carry their own source label so they can be filtered in GoHighLevel / Follow Up Boss.
  const leadSource = isMailer ? 'mailer-home-evaluation' + (utmStr ? ` | ${utmStr}` : '') : 'southfloridaelevated.com/home-value' + (utmStr ? `?${utmStr}` : '');
  const toForm = (e) => { e.preventDefault(); document.getElementById('valuation')?.scrollIntoView({behavior: 'smooth', block: 'start'}); };

  return (
    <div className="animate-fadeIn">
      <section className="hv-hero relative overflow-hidden bg-[#04343F] text-[#F4EFE2] pt-32 sm:pt-40 pb-16 sm:pb-24" aria-labelledby="hv-title">
        <picture className="absolute inset-x-0 top-0 h-[100svh] lg:h-auto lg:inset-0 pointer-events-none" aria-hidden="true">
          <source media="(max-width: 1023px)" type="image/webp" srcSet="/assets/heroes/home-value-interior-mobile-480.webp 480w, /assets/heroes/home-value-interior-mobile-828.webp 828w" sizes="100vw" />
          <source media="(min-width: 1024px)" type="image/webp" srcSet="/assets/heroes/home-value-interior-1080.webp 1080w, /assets/heroes/home-value-interior-1600.webp 1600w, /assets/heroes/home-value-interior-2200.webp 2200w" sizes="100vw" />
          <img src="/assets/heroes/home-value-interior-1600.webp" alt="" width="2600" height="1733" fetchPriority="high" decoding="async" className="w-full h-full object-cover object-[50%_60%] lg:object-[78%_center]" />
        </picture>
        <div className="hidden lg:block absolute inset-0 pointer-events-none" aria-hidden="true" style={{background: 'linear-gradient(90deg, rgba(2,20,25,0.900) 0%, rgba(2,20,25,0.873) 12%, rgba(2,20,25,0.810) 24%, rgba(2,20,25,0.702) 36%, rgba(2,20,25,0.540) 48%, rgba(2,20,25,0.360) 58%, rgba(2,20,25,0.198) 68%, rgba(2,20,25,0.072) 78%, rgba(2,20,25,0.000) 88%)'}} />
        <div className="lg:hidden absolute inset-0 pointer-events-none" aria-hidden="true" style={{background: 'linear-gradient(180deg, rgba(2,20,25,0.5) 0%, rgba(2,20,25,0.62) 22%, rgba(2,20,25,0.74) 45%, rgba(2,20,25,0.82) 70%, rgba(2,20,25,0.86) 100%)'}} />
        <div className="lg:hidden absolute inset-x-0 top-[calc(100svh-12rem)] h-48 pointer-events-none" aria-hidden="true" style={{background: 'linear-gradient(180deg, rgba(4,52,63,0) 0%, rgba(4,52,63,0.4) 35%, rgba(4,52,63,0.85) 75%, #04343F 100%)'}} />
        <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none" aria-hidden="true" style={{background: 'linear-gradient(180deg, rgba(4,52,63,0) 0%, rgba(4,52,63,0.35) 40%, rgba(4,52,63,0.8) 75%, #04343F 100%)'}} />
        <div className="wrap relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              {isMailer && <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#D4A862] mb-4">Thanks for scanning</p>}
              <span className="eyebrow eyebrow--dot text-[#D4A862]">Free Home Evaluation</span>
              <h1 id="hv-title" className="font-serif font-normal text-[46px] sm:text-[72px] lg:text-[84px] leading-[1.02] mt-4 text-[#F4EFE2]">What's your home <em className="it text-[#CC9744]">worth</em> today?</h1>
              <p className="text-[16px] sm:text-[19px] leading-relaxed text-[#F4EFE2]/85 mt-6 max-w-[38rem]" style={{fontFamily: "'Manrope', var(--sans)"}}>Your home deserves more than an online estimate. Start with a quick range, then get a personalized valuation informed by relevant local sales and your property's unique characteristics.</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <a href="#valuation" onClick={toForm} className="btn btn--gold"><span>Get your free home evaluation</span><ArrowRight className="w-4 h-4" /></a>
                <a href="tel:+17864601023" className="btn"><Phone className="w-4 h-4" /><span>786-460-1023</span></a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <ol className="space-y-3 list-none p-0 m-0">
                {STEPS.map((s) => (
                  <li key={s.n} className="flex gap-4 p-5 border border-[rgba(204,151,68,0.35)] bg-[rgba(2,20,25,0.62)] backdrop-blur-sm">
                    <span className="font-mono text-xs text-[#D4A862] font-bold pt-1">{s.n}</span>
                    <div>
                      <h2 className="font-serif text-[22px] font-normal text-[#F4EFE2] m-0">{s.t}</h2>
                      <p className="text-[14px] text-[#F4EFE2]/75 mt-1 mb-0 leading-relaxed" style={{fontFamily: "'Manrope', var(--sans)"}}>{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-[#CC9744]/60 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.14em] uppercase text-[#F4EFE2]/70">
            <span>Miguel Perez, REALTOR®</span><span>Luxe Properties</span><span>In real estate since 2021</span><span>FL Lic. SL3515849</span>
          </div>
        </div>
      </section>

      <HomeValuation
        source={leadSource}
        onOpenContact={(_intent, msg) => onOpenContact('seller', (msg || 'I would like a free, personalized home evaluation.') + tag, leadSource)}
      />

      <section className="sfe-ivory py-16 sm:py-20 bg-[#F4EFE2]">
        <div className="wrap max-w-3xl mx-auto text-center">
          <span className="mono-label">No obligation</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal mt-2">Prefer to talk it <em className="it">through</em>?</h2>
          <p className="text-[15px] sm:text-base leading-relaxed mt-4 opacity-80" style={{fontFamily: "'Manrope', var(--sans)"}}>Whether you're planning a move in the next few months or simply want to know where you stand, Miguel will walk you through how your home compares with relevant nearby sales. A valuation is an opinion of market value, not an appraisal.</p>
          <div className="pt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => onOpenContact('seller', 'I would like a free, personalized home evaluation.' + tag, leadSource)} className="btn btn--gold"><span>Request my evaluation</span><ArrowRight className="w-4 h-4" /></button>
            <a href="/sell" className="btn"><span>How Miguel sells homes</span></a>
          </div>
        </div>
      </section>
    </div>
  );
}
