// @ts-nocheck
// /featured/<hub>: a neighborhood hub. Three tabs (New Listings, Price Changes, Just Sold), all live from the MLS feed.
import {useEffect, useState} from 'react';
import {ArrowRight} from 'lucide-react';
import {getHub, HUBS, KINDS} from '../../featured/config';
import {fetchHubKind} from '../../featured/feed';
import {Crumbs, Eyebrow, ListingTile, IdxDisclaimer, FeaturedNewsletter} from './FeaturedBits';

export default function FeaturedHubView({hubId, onOpenContact}) {
  const hub = getHub(hubId) || HUBS[0];
  const [kind, setKind] = useState('new');
  const [state, setState] = useState({status: 'loading', items: []}); // loading | ready | error

  useEffect(() => {
    const ctl = new AbortController();
    setState({status: 'loading', items: []});
    fetchHubKind(hub, kind, {limit: 12, signal: ctl.signal})
      .then((items) => setState({status: 'ready', items}))
      .catch((e) => { if (e.name !== 'AbortError') setState({status: 'error', items: []}); });
    return () => ctl.abort();
  }, [hub.id, kind]);

  const ask = (c) => onOpenContact && onOpenContact('buyer', `I saw ${c.street}, ${c.cityLine} (MLS# ${c.mls}) on Elevated Listings and would like more information.`, `southfloridaelevated.com/featured/${hub.id}`);
  const k = KINDS.find((x) => x.id === kind);

  return (
    <div className="animate-fadeIn">
      <section className="relative overflow-hidden bg-[#052C3A] text-[#F4EFE2] pt-28 sm:pt-36 pb-12 sm:pb-16">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{background: 'radial-gradient(ellipse 70% 60% at 20% 10%, rgba(201,162,74,0.22), transparent 65%)'}} />
        <div className="wrap relative">
          <Crumbs items={[{label: 'Home', href: '/'}, {label: 'Elevated Listings', href: '/featured'}, {label: hub.short}]} />
          <Eyebrow>Elevated Listings · {hub.city}</Eyebrow>
          <h1 className="font-serif font-normal text-[40px] sm:text-[64px] leading-[1.03] mt-3 mb-5">
            {hub.short} listings, <em className="text-[#E7C878]">as they happen</em>.
          </h1>
          <p className="text-[16px] sm:text-[19px] leading-relaxed text-[#F4EFE2]/85 max-w-[40rem] m-0">{hub.blurb}</p>
          <div className="flex flex-wrap gap-3 mt-7">
            <a href={hub.guide} className="btn btn--gold no-underline"><span>Free {hub.guideLabel}</span><ArrowRight className="w-4 h-4" /></a>
            <a href="/featured/submit" className="btn no-underline"><span>Agents: get featured</span></a>
          </div>
        </div>
      </section>

      <section className="bg-[#0e1416] py-12 sm:py-16 border-y border-[rgba(244,239,226,0.1)]">
        <div className="wrap">
          <div role="tablist" aria-label={`${hub.short} listing feeds`} className="flex flex-wrap gap-2 mb-3">
            {KINDS.map((x) => (
              <button key={x.id} role="tab" aria-selected={kind === x.id} onClick={() => setKind(x.id)}
                className={`px-4 py-2.5 font-mono text-[11px] tracking-[0.16em] uppercase border cursor-pointer transition-colors ${kind === x.id ? 'bg-[#C9A24A] text-black border-[#C9A24A]' : 'bg-transparent text-[#F4EFE2]/75 border-[#F4EFE2]/25 hover:border-[#C9A24A]'}`}>
                {x.label}
              </button>
            ))}
          </div>
          <p className="text-[13px] text-[#F4EFE2]/60 m-0 mb-8">{k.blurb} Live from the MLS, newest first.</p>

          {state.status === 'loading' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" aria-busy="true" aria-label="Loading listings">
              {Array.from({length: 4}).map((_, i) => <div key={i} className="aspect-[4/6] bg-[#0a1c24] border border-[rgba(244,239,226,0.08)] animate-pulse" />)}
            </div>
          )}
          {state.status === 'error' && (
            <div className="border border-[rgba(244,239,226,0.15)] p-10 text-center">
              <p className="font-serif text-[24px] m-0">The MLS feed is unavailable right now.</p>
              <p className="text-[14px] text-[#F4EFE2]/65 mt-2 mb-0">Nothing is shown in its place. Please check back shortly, or call Miguel at 786-460-1023.</p>
            </div>
          )}
          {state.status === 'ready' && state.items.length === 0 && (
            <div className="border border-[rgba(244,239,226,0.15)] p-10 text-center">
              <p className="font-serif text-[24px] m-0">Nothing in this feed for {hub.short} right now.</p>
              <p className="text-[14px] text-[#F4EFE2]/65 mt-2 mb-0">Try another tab. New records arrive from the MLS throughout the day.</p>
            </div>
          )}
          {state.status === 'ready' && state.items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {state.items.map((c) => <ListingTile key={c.key} c={c} onAsk={ask} />)}
            </div>
          )}
          <IdxDisclaimer />
        </div>
      </section>

      <section className="bg-[#0B0B0B] py-14 sm:py-20">
        <div className="wrap">
          <Eyebrow>More neighborhoods</Eyebrow>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-5 max-w-3xl">
            {HUBS.filter((h) => h.id !== hub.id).map((h) => (
              <a key={h.id} href={h.path} className="block border border-[rgba(244,239,226,0.14)] hover:border-[#C9A24A] p-5 no-underline transition-colors">
                <span className="font-serif text-[24px] text-[#F4EFE2] block leading-tight">{h.short}</span>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#C9A24A] mt-2 block">See listings →</span>
              </a>
            ))}
          </div>
          <div className="mt-14 max-w-3xl"><FeaturedNewsletter source={`featured/${hub.id}`} /></div>
        </div>
      </section>
    </div>
  );
}
