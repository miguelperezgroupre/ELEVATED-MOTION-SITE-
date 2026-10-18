// @ts-nocheck
// Newsletter signup used on /journal and inside every article.
// Submit path: reuses the site's existing lead pipeline (leadService.submit with type 'newsletter'),
// exactly like the homepage "Monthly Brief" form and the newsletter popup. No new keys or endpoints.
// TODO(Miguel): leadService posts to GoHighLevel from the browser using the build-time VITE_GHL_TOKEN.
// For a hardened setup, swap this for your GHL form embed (or a server-side /api route) and rotate that token.
import {useState, useId} from 'react';
import {leadService} from '../../services/leadService';

export default function NewsletterSignup({source = 'journal', compact = false}) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | done | error
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setState('error');
      setMsg('That email address looks incomplete.');
      return;
    }
    setState('sending');
    setMsg('');
    try {
      await leadService.submit({type: 'newsletter', name: 'Newsletter', email: email.trim(), intent: 'Newsletter', source: `southfloridaelevated.com/${source}`});
      setState('done');
      setMsg("You're on the list. The next Monthly Brief lands in your inbox.");
      setEmail('');
    } catch {
      setState('error');
      setMsg('Something went wrong. Call or text Miguel at 786-460-1023 and he’ll add you.');
    }
  };

  return (
    <section aria-labelledby={`${id}-h`} className={`j-news relative border border-[rgba(201,162,74,0.35)] bg-[#12110f] ${compact ? 'p-6 sm:p-8' : 'p-8 sm:p-12'} text-[#F4EFE2]`}>
      <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#C9A24A] m-0">The Monthly Brief</p>
      <h2 id={`${id}-h`} className={`font-serif font-normal leading-[1.05] mt-3 mb-3 ${compact ? 'text-[30px] sm:text-[36px]' : 'text-[36px] sm:text-[48px]'}`}>
        The market, <em className="text-[#E7C878]">in your inbox</em>.
      </h2>
      <p className="j-sans text-[15px] sm:text-base text-[#F4EFE2]/75 max-w-xl m-0">New Journal articles, neighborhood reads and the numbers behind them. Unsubscribe anytime.</p>
      <form onSubmit={submit} noValidate className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl">
        <label htmlFor={`${id}-email`} className="sr-only">Email address</label>
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="j-sans flex-1 min-w-0 bg-transparent border border-[rgba(244,239,226,0.35)] focus:border-[#C9A24A] outline-none px-4 py-3 text-[15px] text-[#F4EFE2] placeholder:text-[#F4EFE2]/55"
        />
        <button type="submit" disabled={state === 'sending'} className="btn btn--gold justify-center cursor-pointer whitespace-nowrap">
          <span>{state === 'sending' ? 'Subscribing…' : 'Subscribe'}</span>
        </button>
      </form>
      <p role="status" aria-live="polite" className={`j-sans text-sm mt-3 min-h-[1.25rem] m-0 ${state === 'error' ? 'text-[#ffb4a2]' : 'text-[#E7C878]'}`}>{msg}</p>
    </section>
  );
}
