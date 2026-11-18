// @ts-nocheck
// /featured/submit: "Agents: get featured". Same pattern as the guide download form:
// validate in the browser, then send through the existing /api/lead intake (GoHighLevel, Follow Up Boss fallback).
import {useState} from 'react';
import {ArrowRight, Check, Phone, Mail} from 'lucide-react';
import {leadService} from '../../services/leadService';
import {FORMATS, HUBS, STATUSES} from '../../featured/config';
import {Crumbs, Eyebrow} from './FeaturedBits';

const ROLES = ['Listing agent', "Buyer's agent sharing a closed sale (listing broker permission needed)", 'Owner of a property not listed with a broker', 'Architect or designer'];
const INPUT = 'w-full px-4 py-3 bg-black/40 border border-[#f4efe2]/15 focus:border-[#c9a24a] text-[#f4efe2] placeholder:text-[#f4efe2]/35 text-sm outline-none transition-colors';
const LABEL = 'block font-mono text-[10px] tracking-[0.18em] uppercase text-[#C9A24A] mb-2';

const clip = (s, n) => String(s || '').trim().slice(0, n);

function Field({id, label, children, hint}) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>{label}</label>
      {children}
      {hint && <p className="text-[11px] text-[#f4efe2]/45 m-0 mt-1.5">{hint}</p>}
    </div>
  );
}

export default function FeaturedSubmitView() {
  const [f, setF] = useState({name: '', email: '', phone: '', brokerage: '', handle: '', role: ROLES[0], mls: '', address: '', market: HUBS[0].short, status: STATUSES[0], price: '', beds: '', baths: '', sqft: '', openHouse: '', photos: '', note: '', authorized: false, ack: false});
  const [picked, setPicked] = useState(() => new Set(['listing-page', 'single']));
  const [state, setState] = useState('idle'); // idle | sending | error | done
  const [msg, setMsg] = useState('');
  const set = (k) => (e) => setF((s) => ({...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value}));
  const toggle = (id) => setPicked((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const submit = async (e) => {
    e.preventDefault();
    const bad = (m) => { setState('error'); setMsg(m); };
    if (!f.name.trim()) return bad('Please add your name.');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.trim())) return bad('That email address looks incomplete.');
    if (f.phone.replace(/\D/g, '').length < 10) return bad('Please add a phone number so Miguel can reach you.');
    if (!f.brokerage.trim()) return bad('Please add your brokerage.');
    if (!f.mls.trim() && !f.address.trim()) return bad('Add the MLS number or the property address.');
    if (!f.authorized) return bad('Please confirm you are authorized to share this listing and its photos.');
    if (!f.ack) return bad('Please acknowledge how placements and pricing work.');
    setState('sending'); setMsg('');
    const formats = FORMATS.filter((x) => picked.has(x.id)).map((x) => x.name).join(', ') || 'Not specified';
    const message = [
      'ELEVATED LISTINGS: AGENT FEATURE REQUEST',
      `Role: ${f.role}`,
      `Brokerage: ${clip(f.brokerage, 80)}${f.handle.trim() ? ` | Instagram: ${clip(f.handle, 40)}` : ''}`,
      `Property: ${clip(f.address, 120) || 'n/a'}${f.mls.trim() ? ` | MLS#: ${clip(f.mls, 20)}` : ''} | Market: ${f.market}`,
      `Status to feature: ${f.status}${f.price.trim() ? ` | Price: ${clip(f.price, 20)}` : ''}${f.openHouse.trim() ? ` | Open house: ${clip(f.openHouse, 60)}` : ''}`,
      `Formats: ${formats}`,
      `Photos: ${clip(f.photos, 300) || 'Will send on request'}`,
      f.note.trim() ? `Note: ${clip(f.note, 600)}` : '',
      'Agent confirmed authorization to share the listing and photos, and that pricing is confirmed before any charge.',
    ].filter(Boolean).join('\n').slice(0, 1990);
    try {
      await leadService.submit({
        type: 'contact',
        name: clip(f.name, 100), email: clip(f.email, 254), phone: clip(f.phone, 30),
        intent: 'Elevated Listings: Agent Feature Request',
        source: 'southfloridaelevated.com/featured/submit',
        message,
        marketArea: clip(f.market, 80),
        ...(f.beds.trim() ? {beds: clip(f.beds, 10)} : {}),
        ...(f.baths.trim() ? {baths: clip(f.baths, 10)} : {}),
        ...(f.sqft.trim() ? {sqft: clip(f.sqft, 20)} : {}),
      });
      setState('done');
      if (typeof window !== 'undefined') window.scrollTo({top: 0, behavior: 'smooth'});
    } catch {
      setState('error'); setMsg('Something went wrong. Call or text Miguel at 786-460-1023 and he will take your listing directly.');
    }
  };

  return (
    <div className="animate-fadeIn">
      <section className="relative overflow-hidden bg-[#052C3A] text-[#F4EFE2] pt-28 sm:pt-36 pb-10 sm:pb-14">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{background: 'radial-gradient(ellipse 70% 60% at 20% 10%, rgba(201,162,74,0.22), transparent 65%)'}} />
        <div className="wrap relative">
          <Crumbs items={[{label: 'Home', href: '/'}, {label: 'Elevated Listings', href: '/featured'}, {label: 'Get featured'}]} />
          <Eyebrow>For real estate agents</Eyebrow>
          <h1 className="font-serif font-normal text-[40px] sm:text-[64px] leading-[1.03] mt-3 mb-5">Agents: <em className="text-[#E7C878]">get featured</em>.</h1>
          <p className="text-[16px] sm:text-[19px] leading-relaxed text-[#F4EFE2]/85 max-w-[40rem] m-0">Tell Miguel about the listing, sale or open house you want featured. It takes a few minutes. Nothing is posted or charged until he confirms the details and pricing with you.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-[#0e1416] border-y border-[rgba(244,239,226,0.1)]">
        <div className="wrap">
          <div className="max-w-2xl mx-auto border border-[rgba(201,162,74,0.45)] bg-[#12110f] p-6 sm:p-10">
            {state === 'done' ? (
              <div className="text-center" role="status">
                <div className="w-12 h-12 mx-auto border border-[#C9A24A] flex items-center justify-center"><Check className="w-6 h-6 text-[#C9A24A]" /></div>
                <h2 className="font-serif font-normal text-[30px] sm:text-[38px] leading-tight text-[#F4EFE2] mt-4 mb-2">{f.name.split(' ')[0]}, your request is in.</h2>
                <p className="text-[15px] text-[#F4EFE2]/80 leading-relaxed max-w-md mx-auto">Miguel will review it and reply to {f.email} to confirm details, photos and pricing. Nothing posts until you both agree.</p>
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  <a href="tel:+17864601023" className="btn btn--sm no-underline"><Phone className="w-3.5 h-3.5" /><span>Call or text 786-460-1023</span></a>
                  <a href="mailto:miguelperez@southfloridaelevated.com" className="btn btn--sm no-underline"><Mail className="w-3.5 h-3.5" /><span>Email Miguel</span></a>
                </div>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={submit} noValidate>
                <Eyebrow>About you</Eyebrow>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field id="fs-name" label="Your name"><input id="fs-name" className={INPUT} value={f.name} onChange={set('name')} autoComplete="name" placeholder="First and last name" /></Field>
                  <Field id="fs-brokerage" label="Brokerage"><input id="fs-brokerage" className={INPUT} value={f.brokerage} onChange={set('brokerage')} autoComplete="organization" placeholder="Your brokerage" /></Field>
                  <Field id="fs-email" label="Email"><input id="fs-email" type="email" className={INPUT} value={f.email} onChange={set('email')} autoComplete="email" placeholder="you@email.com" /></Field>
                  <Field id="fs-phone" label="Phone"><input id="fs-phone" type="tel" className={INPUT} value={f.phone} onChange={set('phone')} autoComplete="tel" placeholder="(786) 000-0000" /></Field>
                  <Field id="fs-handle" label="Your Instagram (optional)"><input id="fs-handle" className={INPUT} value={f.handle} onChange={set('handle')} placeholder="@yourhandle" /></Field>
                  <Field id="fs-role" label="You are the"><select id="fs-role" className={INPUT} value={f.role} onChange={set('role')}>{ROLES.map((r) => <option key={r} value={r}>{r}</option>)}</select></Field>
                </div>

                <Eyebrow className="pt-4">The property</Eyebrow>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field id="fs-address" label="Address"><input id="fs-address" className={INPUT} value={f.address} onChange={set('address')} placeholder="Street, unit, city" /></Field>
                  <Field id="fs-mls" label="MLS number"><input id="fs-mls" className={INPUT} value={f.mls} onChange={set('mls')} placeholder="A1234567" /></Field>
                  <Field id="fs-market" label="Neighborhood"><select id="fs-market" className={INPUT} value={f.market} onChange={set('market')}>{[...HUBS.map((h) => h.short), 'Other South Florida'].map((m) => <option key={m} value={m}>{m}</option>)}</select></Field>
                  <Field id="fs-status" label="What to feature"><select id="fs-status" className={INPUT} value={f.status} onChange={set('status')}>{STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}</select></Field>
                  <Field id="fs-price" label="Price"><input id="fs-price" className={INPUT} value={f.price} onChange={set('price')} placeholder="$0" inputMode="numeric" /></Field>
                  <Field id="fs-oh" label="Open house date (optional)"><input id="fs-oh" className={INPUT} value={f.openHouse} onChange={set('openHouse')} placeholder="Sat, Dec 6, 1 to 4 PM" /></Field>
                  <Field id="fs-beds" label="Beds"><input id="fs-beds" className={INPUT} value={f.beds} onChange={set('beds')} inputMode="numeric" /></Field>
                  <Field id="fs-baths" label="Baths"><input id="fs-baths" className={INPUT} value={f.baths} onChange={set('baths')} inputMode="decimal" /></Field>
                  <Field id="fs-sqft" label="Square feet"><input id="fs-sqft" className={INPUT} value={f.sqft} onChange={set('sqft')} inputMode="numeric" /></Field>
                </div>
                <Field id="fs-photos" label="Link to photos" hint="A Dropbox, Google Drive or MLS tour link. Three or more sharp photos work best."><input id="fs-photos" type="url" className={INPUT} value={f.photos} onChange={set('photos')} placeholder="https://" /></Field>

                <Eyebrow className="pt-4">What you would like</Eyebrow>
                <fieldset className="border-0 p-0 m-0">
                  <legend className="sr-only">Formats</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {FORMATS.map((x) => (
                      <label key={x.id} className="flex items-start gap-3 border border-[#f4efe2]/15 p-3 cursor-pointer text-[13px] text-[#F4EFE2]/85">
                        <input type="checkbox" checked={picked.has(x.id)} onChange={() => toggle(x.id)} className="mt-0.5 accent-[#C9A24A]" /><span>{x.name}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <Field id="fs-note" label="Anything else (optional)"><textarea id="fs-note" rows={3} className={INPUT} value={f.note} onChange={set('note')} placeholder="Timing, what makes the property special, who to credit" maxLength={600} /></Field>

                {/* honeypot, same field name the API rejects */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                <label className="flex items-start gap-3 text-[13px] text-[#F4EFE2]/80 cursor-pointer"><input type="checkbox" checked={f.authorized} onChange={set('authorized')} className="mt-0.5 accent-[#C9A24A]" /><span>I am authorized to share this listing and its photos, and the listing broker has agreed where that is required.</span></label>
                <label className="flex items-start gap-3 text-[13px] text-[#F4EFE2]/80 cursor-pointer"><input type="checkbox" checked={f.ack} onChange={set('ack')} className="mt-0.5 accent-[#C9A24A]" /><span>I understand paid placements are labeled as paid, and that Miguel confirms pricing with me before anything is posted or charged.</span></label>

                {state === 'error' && <p role="alert" className="text-[13px] text-[#e0a36a] m-0">{msg}</p>}
                <button type="submit" disabled={state === 'sending'} className="btn btn--gold w-full justify-center"><span>{state === 'sending' ? 'Sending…' : 'Send my listing'}</span><ArrowRight className="w-4 h-4" /></button>
                <p className="text-[11px] text-[#f4efe2]/50 leading-relaxed m-0">
                  Miguel may follow up about your listing. By submitting you agree to the <a href="/privacy-policy" className="text-[#E7C878] underline underline-offset-2">Privacy Policy</a> and <a href="/terms-of-service" className="text-[#E7C878] underline underline-offset-2">Terms of Service</a>. Elevated Listings is a South Florida Elevated feature, run by Miguel Perez, REALTOR® with Luxe Properties.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
