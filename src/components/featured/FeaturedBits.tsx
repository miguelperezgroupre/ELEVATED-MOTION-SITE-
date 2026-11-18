// @ts-nocheck
// Shared pieces for the Elevated Listings section: listing card, section header, newsletter signup.
import {useState, useId} from 'react';
import {ArrowRight} from 'lucide-react';
import {leadService} from '../../services/leadService';
import {money} from '../../featured/feed';
import {HUBS} from '../../featured/config';

export function Eyebrow({children, className = ''}) {
  return <p className={`font-mono text-[11px] tracking-[0.22em] uppercase text-[#C9A24A] m-0 ${className}`}>{children}</p>;
}

export function Crumbs({items}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 list-none m-0 p-0 font-mono text-[11px] tracking-[0.16em] uppercase text-[#F4EFE2]/65">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {c.href ? <a href={c.href} className="hover:text-[#E7C878]">{c.label}</a> : <span aria-current="page" className="text-[#C9A24A]">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

const fmtDate = (d) => {
  if (!d) return '';
  const t = new Date(/^\d{4}-\d{2}-\d{2}$/.test(d) ? d + 'T12:00:00' : d);
  return isNaN(t) ? '' : t.toLocaleDateString('en-US', {month: 'short', day: 'numeric', timeZone: 'America/New_York'});
};

/** One MLS listing card. `c` comes from featured/feed.ts toCard(). */
export function ListingTile({c, onAsk}) {
  const specs = [
    c.beds ? `${c.beds} bd` : '',
    c.baths ? `${c.baths} ba` : '',
    c.sqft ? `${c.sqft.toLocaleString('en-US')} sf` : '',
    c.acres >= 0.1 ? `${c.acres.toFixed(2)} ac` : '',
  ].filter(Boolean);
  const dateNote = c.kind === 'sold' ? `Closed ${fmtDate(c.closeDate)}` : c.kind === 'price' ? `Changed ${fmtDate(c.changed)}` : '';
  return (
    <article className="group flex flex-col bg-[#0a1c24] border border-[rgba(201,162,74,0.28)] hover:border-[#C9A24A] transition-colors">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#052C3A]">
        <img src={c.photo} alt={`${c.street}, ${c.cityLine}`} loading="lazy" decoding="async" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        <span className="absolute top-3 left-3 bg-[#C9A24A] text-black font-mono text-[10px] tracking-[0.18em] px-2.5 py-1.5">{c.badge}</span>
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <p className="font-serif text-[28px] leading-none text-[#F4EFE2] m-0">
          {money(c.price)}
          {c.previousPrice > 0 && <span className="ml-2 text-[15px] text-[#F4EFE2]/50 line-through">{money(c.previousPrice)}</span>}
        </p>
        <h3 className="font-serif font-normal text-[20px] leading-snug text-[#F4EFE2] mt-3 mb-0">{c.street}</h3>
        <p className="text-[13px] text-[#F4EFE2]/65 m-0 mt-0.5">{c.cityLine}</p>
        {specs.length > 0 && <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#C9A24A] m-0 mt-3">{specs.join(' · ')}</p>}
        {dateNote && <p className="text-[12px] text-[#F4EFE2]/60 m-0 mt-1">{dateNote}</p>}
        <div className="mt-auto pt-4">
          {onAsk && (
            <button type="button" onClick={() => onAsk(c)} className="inline-flex items-center gap-2 text-[12px] font-mono tracking-[0.14em] uppercase text-[#E7C878] hover:text-[#F4EFE2] bg-transparent border-0 p-0 cursor-pointer">
              Ask Miguel about this home <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
          <p className="text-[11px] text-[#F4EFE2]/50 leading-snug m-0 mt-3">
            {c.office ? `Listing courtesy of ${c.office}. ` : ''}MLS# {c.mls}. Selected automatically from the MLS, not a paid placement.
          </p>
        </div>
      </div>
    </article>
  );
}

export function IdxDisclaimer() {
  return (
    <p className="text-[11px] text-[#F4EFE2]/45 mt-10 leading-relaxed max-w-4xl m-0">
      The multiple listing information is provided by the Miami Association of REALTORS® from a copyrighted compilation of listings. The compilation of listings and each individual listing are ©2026 Miami Association of REALTORS®. All Rights Reserved. Information is deemed reliable but not guaranteed. Miguel Perez is a REALTOR® with Luxe Properties, Florida license SL3515849. Elevated Listings is a South Florida Elevated feature. Equal Housing Opportunity.
    </p>
  );
}

/** Weekly email signup. Uses the same /api/lead intake as the Journal newsletter. */
export function FeaturedNewsletter({source = 'featured'}) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [picked, setPicked] = useState(() => new Set(HUBS.map((h) => h.id)));
  const [state, setState] = useState('idle');
  const [msg, setMsg] = useState('');
  const toggle = (hid) => setPicked((s) => { const n = new Set(s); n.has(hid) ? n.delete(hid) : n.add(hid); return n; });

  const submit = async (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) { setState('error'); setMsg('That email address looks incomplete.'); return; }
    setState('sending'); setMsg('');
    const markets = HUBS.filter((h) => picked.has(h.id)).map((h) => h.short).join(', ') || 'All markets';
    try {
      await leadService.submit({
        type: 'newsletter', name: 'Newsletter', email: email.trim(),
        intent: 'Elevated Listings Weekly',
        source: `southfloridaelevated.com/${source}`,
        message: `Weekly Elevated Listings email. Markets: ${markets}.`,
      });
      setState('done'); setMsg("You're on the list. The next weekly email lands in your inbox."); setEmail('');
    } catch {
      setState('error'); setMsg('Something went wrong. Call or text Miguel at 786-460-1023 and he’ll add you.');
    }
  };

  return (
    <section aria-labelledby={`${id}-h`} className="border border-[rgba(201,162,74,0.4)] bg-[#052C3A] p-7 sm:p-10 text-[#F4EFE2]">
      <Eyebrow>The weekly email</Eyebrow>
      <h2 id={`${id}-h`} className="font-serif font-normal text-[34px] sm:text-[44px] leading-[1.05] mt-3 mb-3">What listed, dropped and closed, <em className="text-[#E7C878]">once a week</em>.</h2>
      <p className="text-[15px] text-[#F4EFE2]/75 max-w-xl m-0">Pick your neighborhoods. One short email, unsubscribe anytime.</p>
      <form onSubmit={submit} noValidate className="mt-6 max-w-xl">
        <fieldset className="border-0 p-0 m-0 mb-4">
          <legend className="sr-only">Neighborhoods</legend>
          <div className="flex flex-wrap gap-2">
            {HUBS.map((h) => (
              <label key={h.id} className={`cursor-pointer px-3 py-1.5 border text-[12px] font-mono tracking-[0.1em] uppercase ${picked.has(h.id) ? 'border-[#C9A24A] text-[#C9A24A] bg-black/30' : 'border-[#F4EFE2]/25 text-[#F4EFE2]/60'}`}>
                <input type="checkbox" className="sr-only" checked={picked.has(h.id)} onChange={() => toggle(h.id)} />{h.short}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="flex flex-col sm:flex-row gap-3">
          <label htmlFor={`${id}-email`} className="sr-only">Email address</label>
          <input id={`${id}-email`} type="email" name="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
            className="flex-1 min-w-0 bg-transparent border border-[rgba(244,239,226,0.35)] focus:border-[#C9A24A] outline-none px-4 py-3 text-[15px] text-[#F4EFE2] placeholder:text-[#F4EFE2]/55" />
          <button type="submit" disabled={state === 'sending'} className="btn btn--gold justify-center cursor-pointer whitespace-nowrap"><span>{state === 'sending' ? 'Subscribing…' : 'Subscribe'}</span></button>
        </div>
      </form>
      <p role="status" aria-live="polite" className={`text-sm mt-3 min-h-[1.25rem] m-0 ${state === 'error' ? 'text-[#ffb4a2]' : 'text-[#E7C878]'}`}>{msg}</p>
    </section>
  );
}
