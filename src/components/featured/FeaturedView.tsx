// @ts-nocheck
// /featured: Elevated Listings landing page. Neighborhood hubs, a live strip from the MLS feed,
// Insiders / Happenings / News (linked to the existing Guides and Journal), the agent pitch and the weekly email.
import {useEffect, useState} from 'react';
import {ArrowRight} from 'lucide-react';
import {HUBS, FORMATS, SECTION} from '../../featured/config';
import {fetchHubKind} from '../../featured/feed';
import {ARTICLES, formatDate} from '../../journal';
import {Eyebrow, ListingTile, IdxDisclaimer, FeaturedNewsletter} from './FeaturedBits';

const STEPS = [
  ['Send the listing', 'A short form: the property, your brokerage, and a link to your photos.'],
  ['Miguel reviews it', 'Every detail is checked against the MLS before anything is designed.'],
  ['We design the post', 'Your listing gets the Elevated Listings panel, credited to you and your brokerage.'],
  ['It goes live', 'On the neighborhood page, the Instagram feed and, if you choose, the weekly email.'],
];

function LiveStrip({onOpenContact}) {
  const [rows, setRows] = useState(null); // [{hub, items}]
  useEffect(() => {
    let alive = true;
    Promise.all(HUBS.map((h) => fetchHubKind(h, 'new', {limit: 2}).then((items) => ({hub: h, items})).catch(() => ({hub: h, items: []}))))
      .then((r) => { if (alive) setRows(r); });
    return () => { alive = false; };
  }, []);
  const ask = (c) => onOpenContact('buyer', `I saw ${c.street}, ${c.cityLine} (MLS# ${c.mls}) on Elevated Listings and would like more information.`, 'southfloridaelevated.com/featured');
  const all = rows ? rows.flatMap((r) => r.items) : [];
  return (
    <section className="bg-[#0e1416] py-14 sm:py-20 border-y border-[rgba(244,239,226,0.1)]">
      <div className="wrap">
        <Eyebrow>Just listed</Eyebrow>
        <h2 className="font-serif font-normal text-[34px] sm:text-[48px] leading-tight mt-3 mb-2">Fresh from the MLS.</h2>
        <p className="text-[14px] text-[#F4EFE2]/65 m-0 mb-8">The newest listings in each neighborhood, pulled live. Open a neighborhood for price changes and closed sales.</p>
        {rows === null && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" aria-busy="true">
            {Array.from({length: 4}).map((_, i) => <div key={i} className="aspect-[4/6] bg-[#0a1c24] animate-pulse" />)}
          </div>
        )}
        {rows !== null && all.length === 0 && <p className="text-[#F4EFE2]/65">The MLS feed is unavailable right now. Open a neighborhood below to try again shortly.</p>}
        {all.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {all.map((c) => <ListingTile key={c.key} c={c} onAsk={ask} />)}
          </div>
        )}
        <IdxDisclaimer />
      </div>
    </section>
  );
}

export default function FeaturedView({onOpenContact}) {
  const latest = ARTICLES.slice(0, 3);
  return (
    <div className="animate-fadeIn">
      <section className="relative overflow-hidden bg-[#052C3A] text-[#F4EFE2] pt-28 sm:pt-40 pb-16 sm:pb-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{background: 'radial-gradient(ellipse 70% 60% at 22% 10%, rgba(201,162,74,0.25), transparent 65%)'}} />
        <div className="wrap relative">
          <Eyebrow>{SECTION.name} · by South Florida Elevated</Eyebrow>
          <h1 className="font-serif font-normal text-[44px] sm:text-[76px] leading-[1.02] mt-4 mb-6 max-w-4xl">
            What’s new in South Florida real estate, <em className="text-[#E7C878]">elevated</em>.
          </h1>
          <p className="text-[17px] sm:text-[20px] leading-relaxed text-[#F4EFE2]/85 max-w-[42rem] m-0">
            New listings, price changes and closed sales in Miami Beach, Brickell, Coral Gables and Fort Lauderdale, curated by Miguel Perez of Luxe Properties. Elevating South Florida Real Estate &amp; Lifestyle.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="#hubs" className="btn btn--gold no-underline"><span>Browse neighborhoods</span><ArrowRight className="w-4 h-4" /></a>
            <a href="/featured/submit" className="btn no-underline"><span>Agents: get featured</span></a>
          </div>
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#F4EFE2]/55 mt-10 m-0">Miguel Perez · REALTOR® · Luxe Properties · Serving South Florida since 2021</p>
        </div>
      </section>

      <section id="hubs" className="bg-[#000] py-14 sm:py-20">
        <div className="wrap">
          <Eyebrow>Neighborhoods</Eyebrow>
          <h2 className="font-serif font-normal text-[34px] sm:text-[48px] leading-tight mt-3 mb-8">Pick your corner of South Florida.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HUBS.map((h) => (
              <a key={h.id} href={h.path} className="group block border border-[rgba(201,162,74,0.35)] hover:border-[#C9A24A] bg-[#052C3A] p-6 no-underline transition-colors">
                <span className="font-serif text-[30px] text-[#F4EFE2] block leading-tight">{h.short}</span>
                <span className="text-[13px] text-[#F4EFE2]/70 block mt-3 leading-relaxed">{h.blurb}</span>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#C9A24A] mt-5 inline-flex items-center gap-2">New · Price changes · Sold <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <LiveStrip onOpenContact={onOpenContact} />

      <section className="bg-[#0B0B0B] py-14 sm:py-20">
        <div className="wrap">
          <Eyebrow>Insiders · Happenings · News</Eyebrow>
          <h2 className="font-serif font-normal text-[34px] sm:text-[48px] leading-tight mt-3 mb-8">Beyond the address.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <a href="/guides" className="block border border-[rgba(244,239,226,0.14)] hover:border-[#C9A24A] p-6 no-underline transition-colors">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C9A24A]">Insiders</span>
              <span className="font-serif text-[26px] text-[#F4EFE2] block mt-2 leading-snug">Free neighborhood guides</span>
              <span className="text-[14px] text-[#F4EFE2]/70 block mt-2 leading-relaxed">Sourced prices, walk scores and flood risk for Miami and Fort Lauderdale, in a downloadable PDF.</span>
            </a>
            <a href="/south-florida" className="block border border-[rgba(244,239,226,0.14)] hover:border-[#C9A24A] p-6 no-underline transition-colors">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C9A24A]">Happenings</span>
              <span className="font-serif text-[26px] text-[#F4EFE2] block mt-2 leading-snug">Living in South Florida</span>
              <span className="text-[14px] text-[#F4EFE2]/70 block mt-2 leading-relaxed">The places, culture and experiences behind the addresses. Open house dates are added when an agent shares them.</span>
            </a>
            <a href="/journal" className="block border border-[rgba(244,239,226,0.14)] hover:border-[#C9A24A] p-6 no-underline transition-colors">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C9A24A]">News</span>
              <span className="font-serif text-[26px] text-[#F4EFE2] block mt-2 leading-snug">The Journal</span>
              <span className="text-[14px] text-[#F4EFE2]/70 block mt-2 leading-relaxed">Market analysis, neighborhood comparisons and relocation checklists from Miguel.</span>
            </a>
          </div>
          {latest.length > 0 && (
            <ul className="list-none p-0 m-0 mt-8 divide-y divide-[rgba(244,239,226,0.1)] border-y border-[rgba(244,239,226,0.1)]">
              {latest.map((a) => (
                <li key={a.slug}><a href={`/journal/${a.slug}`} className="flex flex-wrap items-baseline justify-between gap-2 py-4 no-underline text-[#F4EFE2] hover:text-[#E7C878] transition-colors">
                  <span className="font-serif text-[20px]">{a.title}</span>
                  <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#F4EFE2]/50">{a.category} · {formatDate(a.date)}</span>
                </a></li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="bg-[#052C3A] py-14 sm:py-24 border-t border-[rgba(201,162,74,0.3)]">
        <div className="wrap">
          <Eyebrow>For real estate agents</Eyebrow>
          <h2 className="font-serif font-normal text-[36px] sm:text-[56px] leading-[1.05] mt-3 mb-4 max-w-3xl">Put your listing in front of South Florida, <em className="text-[#E7C878]">elevated</em>.</h2>
          <p className="text-[16px] sm:text-[18px] text-[#F4EFE2]/80 max-w-2xl m-0">Your listing, designed in the Elevated Listings style and credited to you and your brokerage. Paid placements are always labeled as paid.</p>
          <ol className="list-none p-0 m-0 mt-10 grid grid-cols-1 md:grid-cols-4 gap-5">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="border border-[rgba(201,162,74,0.35)] p-5 bg-black/20">
                <span className="font-serif text-[40px] text-[#C9A24A] leading-none">{i + 1}</span>
                <h3 className="font-serif font-normal text-[22px] text-[#F4EFE2] mt-3 mb-2">{t}</h3>
                <p className="text-[14px] text-[#F4EFE2]/70 leading-relaxed m-0">{d}</p>
              </li>
            ))}
          </ol>
          <h3 className="font-serif font-normal text-[26px] mt-12 mb-4">What you can ask for</h3>
          <ul className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FORMATS.map((f) => (
              <li key={f.id} className="border border-[rgba(244,239,226,0.15)] p-5">
                <span className="font-serif text-[20px] text-[#E7C878] block">{f.name}</span>
                <span className="text-[14px] text-[#F4EFE2]/70 block mt-1 leading-relaxed">{f.desc}</span>
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-[#F4EFE2]/60 mt-5 max-w-2xl">Pricing is set by Miguel and confirmed with you before anything is posted. Nothing is charged on this website.</p>
          <div className="mt-8"><a href="/featured/submit" className="btn btn--gold no-underline"><span>Submit a listing</span><ArrowRight className="w-4 h-4" /></a></div>
        </div>
      </section>

      <section className="bg-[#0e1416] py-14 sm:py-20">
        <div className="wrap max-w-4xl"><FeaturedNewsletter source="featured" /></div>
      </section>
    </div>
  );
}
