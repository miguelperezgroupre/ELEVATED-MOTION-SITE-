// @ts-nocheck
// South Florida Elevated: /guides (guide library) and /guides/miami and /guides/fort-lauderdale
// (gated download pages). A visitor submits name, email and phone, the lead goes through the
// existing /api/lead intake to GoHighLevel and Follow Up Boss, and the same screen hands them the
// PDF download link plus a copy in the browser's memory so they can save it.
import {useState} from 'react';
import {ArrowRight, Download, Phone, Mail, Check} from 'lucide-react';
import {leadService} from '../../services/leadService';
import {GUIDES} from '../../guide/guides';
import {src as photoSrc, srcSet as photoSrcSet} from '../../guide/media';

// Each guide wears the photo that matches its city.
const HERO = {miami: 'biscayne-bay-boat-bow-skyline', 'fort-lauderdale': 'aerial-sunset-coastal-skyline'};

const OTHER = (id) => GUIDES.filter((g) => g.id !== id);

function Cover({g}) {
  return (
    <div className="relative w-full aspect-[8.5/11] overflow-hidden border border-[rgba(201,162,74,0.35)] bg-[#052C3A] shadow-2xl">
      <img src={g.cover} alt={`Cover of ${g.title}`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
    </div>
  );
}

function LeadForm({g, onDelivered}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | error
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) { setState('error'); setMsg('Please add your name.'); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) { setState('error'); setMsg('That email address looks incomplete.'); return; }
    if (phone.replace(/\D/g, '').length < 10) { setState('error'); setMsg('Please add a phone number so Miguel can follow up.'); return; }
    setState('sending'); setMsg('');
    try {
      await leadService.submit({
        type: 'contact',
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        intent: g.intent,
        source: `southfloridaelevated.com/guides/${g.id}`,
        message: `Requested the ${g.title} download. Send the PDF and follow up on their neighborhood search.`,
        marketArea: g.marketArea,
      });
    } catch {
      /* leadService already falls back silently; the download still opens */
    }
    onDelivered({name: name.trim(), email: email.trim()});
  };

  return (
    <form className="space-y-4" onSubmit={submit} noValidate>
      <div>
        <label htmlFor="gd-name" className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[#C9A24A] mb-2">Your name</label>
        <input id="gd-name" type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="First and last name"
          className="w-full px-4 py-3 bg-black/40 border border-[#f4efe2]/15 focus:border-[#c9a24a] text-[#f4efe2] placeholder:text-[#f4efe2]/35 text-sm outline-none transition-colors" />
      </div>
      <div>
        <label htmlFor="gd-email" className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[#C9A24A] mb-2">Email</label>
        <input id="gd-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@email.com"
          className="w-full px-4 py-3 bg-black/40 border border-[#f4efe2]/15 focus:border-[#c9a24a] text-[#f4efe2] placeholder:text-[#f4efe2]/35 text-sm outline-none transition-colors" />
      </div>
      <div>
        <label htmlFor="gd-phone" className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[#C9A24A] mb-2">Phone</label>
        <input id="gd-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="(786) 000-0000"
          className="w-full px-4 py-3 bg-black/40 border border-[#f4efe2]/15 focus:border-[#c9a24a] text-[#f4efe2] placeholder:text-[#f4efe2]/35 text-sm outline-none transition-colors" />
      </div>
      {/* honeypot, same field name the API rejects */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      {state === 'error' && <p className="text-[12px] text-[#e0a36a] m-0">{msg}</p>}
      <button type="submit" disabled={state === 'sending'} className="btn btn--gold w-full justify-center">
        <span>{state === 'sending' ? 'Sending…' : `Get the ${g.city} guide`}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-[11px] text-[#f4efe2]/50 leading-relaxed m-0">
        No spam, and no obligation. Miguel may follow up about your search. By submitting you agree to the{' '}
        <a href="/privacy-policy" className="text-[#E7C878] underline underline-offset-2">Privacy Policy</a> and{' '}
        <a href="/terms-of-service" className="text-[#E7C878] underline underline-offset-2">Terms of Service</a>.
      </p>
    </form>
  );
}

function Delivered({g, lead}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 mx-auto border border-[#C9A24A] flex items-center justify-center">
        <Check className="w-6 h-6 text-[#C9A24A]" />
      </div>
      <h3 className="font-serif font-normal text-[30px] sm:text-[38px] leading-tight text-[#F4EFE2] mt-4 mb-2">
        {lead.name ? `${lead.name.split(' ')[0]}, your guide is ready.` : 'Your guide is ready.'}
      </h3>
      <p className="text-[15px] text-[#F4EFE2]/80 font-light leading-relaxed max-w-md mx-auto">
        {g.pages} pages, written for {g.city} buyers, with every number sourced. The link below opens the PDF so you can read it now and save it for later.
      </p>
      <a href={g.pdf} download={`${g.fileName}.pdf`} target="_blank" rel="noopener noreferrer" className="btn btn--gold w-full justify-center mt-6 no-underline">
        <Download className="w-4 h-4" />
        <span>Download the {g.city} guide</span>
      </a>
      <a href={g.pdf} target="_blank" rel="noopener noreferrer" className="block font-mono text-[11px] text-[#E7C878] underline underline-offset-2 mt-3 break-all">
        southfloridaelevated.com{g.pdf.replace(/^https?:\/\/[^/]+/, '')}
      </a>
      <div className="mt-7 pt-6 border-t border-[rgba(244,239,226,0.12)] text-left">
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#C9A24A] m-0">Want it narrowed down?</p>
        <p className="text-[14px] text-[#F4EFE2]/75 font-light mt-2">Tell Miguel which two or three neighborhoods you are weighing and he will send the building-by-building version.</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <a href="tel:+17864601023" className="btn btn--sm no-underline"><Phone className="w-3.5 h-3.5" /><span>Call or text 786-460-1023</span></a>
          <a href="mailto:miguelperez@southfloridaelevated.com" className="btn btn--sm no-underline"><Mail className="w-3.5 h-3.5" /><span>Email Miguel</span></a>
        </div>
      </div>
    </div>
  );
}

export default function GuideDownloadView({guideId = 'miami', onNavigate}) {
  const g = GUIDES.find((x) => x.id === guideId) || GUIDES[0];
  const [lead, setLead] = useState(null);
  const others = OTHER(g.id);

  return (
    <div className="animate-fadeIn">
      <section className="relative overflow-hidden bg-[#052C3A] text-[#F4EFE2] pt-28 sm:pt-36 pb-14 sm:pb-20">
        <img src={photoSrc(HERO[g.id])} srcSet={photoSrcSet(HERO[g.id])} sizes="100vw" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" style={{objectPosition: '50% 40%'}} decoding="async" />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{background: 'linear-gradient(180deg, rgba(5,44,58,0.94) 0%, rgba(5,44,58,0.86) 58%, rgba(5,44,58,0.95) 100%)'}} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{background: 'radial-gradient(ellipse 70% 60% at 22% 12%, rgba(201,162,74,0.22), transparent 65%)'}} />
        <div className="wrap relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 list-none m-0 p-0 font-mono text-[11px] tracking-[0.16em] uppercase text-[#F4EFE2]/65">
              <li><a href="/" className="hover:text-[#E7C878]">Home</a></li>
              <li aria-hidden="true">/</li>
              <li><a href="/guides" className="hover:text-[#E7C878]">Guides</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#C9A24A]">{g.city}</li>
            </ol>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#C9A24A] m-0">Free guide · {g.pages} pages · updated {g.updated}</p>
              <h1 className="font-serif font-normal text-[38px] sm:text-[58px] leading-[1.04] mt-3 mb-5 text-[#F4EFE2]">
                The {g.city} <em className="it text-[#CC9744]">Neighborhood Guide</em>.
              </h1>
              <p className="text-[16px] sm:text-[19px] leading-relaxed text-[#F4EFE2]/85 max-w-[36rem]" style={{fontFamily: "'Manrope', var(--sans)"}}>
                {g.blurb}
              </p>
              <ul className="mt-7 space-y-2 list-none p-0 m-0">
                {g.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[14px] text-[#F4EFE2]/75 font-light">
                    <span className="text-[#C9A24A] shrink-0">—</span><span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <Cover g={g} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-[#0e1416] border-y border-[rgba(244,239,226,0.1)]">
        <div className="wrap">
          <div className="max-w-xl mx-auto border border-[rgba(201,162,74,0.45)] bg-[#12110f] p-7 sm:p-10">
            {lead ? <Delivered g={g} lead={lead} /> : (
              <>
                <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#C9A24A] m-0">Get the download</p>
                <h2 className="font-serif font-normal text-[28px] sm:text-[34px] leading-tight text-[#F4EFE2] mt-2 mb-2">Where should I send it?</h2>
                <p className="text-[14px] text-[#F4EFE2]/70 font-light leading-relaxed mb-6">
                  Fill this in and the download link appears right here. No waiting on an email.
                </p>
                <LeadForm g={g} onDelivered={setLead} />
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-[#0B0B0B]">
        <div className="wrap">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#C9A24A] m-0">Also available</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 max-w-3xl">
            {others.map((o) => (
              <a key={o.id} href={`/guides/${o.id}`} className="block border border-[rgba(244,239,226,0.14)] hover:border-[#C9A24A] transition-colors p-5 no-underline">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#C9A24A] block">{o.pages} pages · free</span>
                <span className="font-serif text-[22px] text-[#F4EFE2] block mt-1 leading-snug">The {o.city} Neighborhood Guide</span>
                <span className="text-[13px] text-[#F4EFE2]/65 font-light block mt-1">{o.blurbShort}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
