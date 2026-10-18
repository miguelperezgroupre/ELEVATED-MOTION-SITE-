// @ts-nocheck
import {useState} from 'react';
import {getArticle, relatedArticles, formatDate} from '../../journal';
import {SITE_URL} from '../../routes';
import JournalCard from './JournalCard';
import NewsletterSignup from './NewsletterSignup';

const CTA = {
  MAP: {
    word: 'MAP',
    title: 'Want the building-by-building version?',
    body: 'DM me MAP on Instagram for The South Florida Buyer Map: neighborhood profiles, sourced prices, drive times and the condo checklist in one guide.',
    intent: 'buyer',
    message: "MAP: I'd like the South Florida buyer map and to talk through my search.",
  },
  MOVE: {
    word: 'MOVE',
    title: 'Planning the move?',
    body: 'DM me MOVE on Instagram and I’ll send the relocation short list: neighborhoods, timing and what to line up before you arrive.',
    intent: 'relocation',
    message: "MOVE: I'm relocating to South Florida and would like the relocation short list.",
  },
};

function Share({url, title}) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    {label: 'Share on X', short: 'X', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`},
    {label: 'Share on Facebook', short: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`},
    {label: 'Share on LinkedIn', short: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`},
    {label: 'Share by email', short: 'Email', href: `mailto:?subject=${t}&body=${u}`},
  ];
  const cls = 'font-mono text-[11px] tracking-[0.14em] uppercase px-3 py-2 border border-[rgba(244,239,226,0.25)] text-[#F4EFE2]/85 hover:border-[#C9A24A] hover:text-[#E7C878] transition-colors bg-transparent cursor-pointer';
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share this article" role="group">
      <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#F4EFE2]/65 mr-1">Share</span>
      {links.map((l) => (
        <a key={l.short} href={l.href} aria-label={l.label} className={cls} {...(l.short === 'Email' ? {} : {target: '_blank', rel: 'noopener noreferrer'})}>{l.short}</a>
      ))}
      <button type="button" className={cls} onClick={() => { navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); }); }}>
        {copied ? 'Link copied' : 'Copy link'}
      </button>
    </div>
  );
}

export default function JournalArticle({slug, onOpenContact}) {
  const a = getArticle(slug);
  if (!a) return null;
  const url = `${SITE_URL}/journal/${a.slug}`;
  const cta = CTA[a.cta] || CTA.MAP;
  const related = relatedArticles(a, 3);
  const toc = (
    <ol className="j-toc list-none m-0 p-0 space-y-2.5">
      {a.toc.map((h) => (
        <li key={h.id}><a href={`#${h.id}`} className="j-sans text-[14px] leading-snug text-[#F4EFE2]/80 hover:text-[#E7C878] transition-colors">{h.text}</a></li>
      ))}
      <li><a href="#sources" className="j-sans text-[14px] leading-snug text-[#F4EFE2]/80 hover:text-[#E7C878] transition-colors">Sources</a></li>
    </ol>
  );
  return (
    <div className="j-page bg-[#0B0B0B] text-[#F4EFE2]">
      <article>
        <header className="wrap pt-32 sm:pt-40 pb-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 list-none m-0 p-0 font-mono text-[11px] tracking-[0.16em] uppercase text-[#F4EFE2]/65">
              <li><a href="/" className="hover:text-[#E7C878]">Home</a></li>
              <li aria-hidden="true">/</li>
              <li><a href="/journal" className="hover:text-[#E7C878]">Journal</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#C9A24A]">{a.category}</li>
            </ol>
          </nav>
          <h1 className="j-article-title font-serif font-normal leading-[1.04] m-0 max-w-[22ch]">{a.title}</h1>
          <p className="j-dek j-sans text-[#F4EFE2]/80 mt-5 mb-0 max-w-3xl">{a.dek || a.description}</p>
          <p className="j-sans text-[13px] text-[#F4EFE2]/70 mt-6 m-0 flex flex-wrap gap-x-3 gap-y-1">
            <span>By <a href="/about" className="text-[#E7C878] underline underline-offset-[3px] decoration-[#C9A24A]/60 hover:text-[#ffd9a0]">Miguel Perez</a></span>
            <span aria-hidden="true">·</span>
            <time dateTime={a.date}>{formatDate(a.date)}</time>
            {a.updated !== a.date && (<><span aria-hidden="true">·</span><span>Updated <time dateTime={a.updated}>{formatDate(a.updated)}</time></span></>)}
            <span aria-hidden="true">·</span>
            <span>{a.readingMinutes} min read</span>
          </p>
        </header>

        <figure className="wrap m-0 mb-12">
          <img src={a.cover} alt={a.coverAlt} width={1600} height={900} fetchPriority="high" decoding="async" className="block w-full aspect-[16/9] object-cover bg-[#1a1815]" />
          {a.coverCredit && <figcaption className="j-sans text-[12px] text-[#F4EFE2]/65 mt-2">{a.coverCredit}</figcaption>}
        </figure>

        <div className="sfe-ivory py-14 sm:py-20"><div className="wrap grid lg:grid-cols-12 gap-10 lg:gap-14">
          <aside className="lg:col-span-3 lg:order-1" aria-labelledby="toc-h">
            <div className="lg:sticky lg:top-28 border-t border-[rgba(201,162,74,0.4)] pt-5">
              <h2 id="toc-h" className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#C9A24A] mt-0 mb-4">In this article</h2>
              {toc}
            </div>
          </aside>

          <div className="lg:col-span-8 lg:order-2 min-w-0">
            <div className="j-prose" dangerouslySetInnerHTML={{__html: a.html}} />

            <aside aria-labelledby="cta-h" className="sfe-dark mt-14 border border-[rgba(201,162,74,0.45)] bg-[#12110f] text-[#F4EFE2] p-7 sm:p-10">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#C9A24A] m-0">Your next step · Keyword {cta.word}</p>
              <h2 id="cta-h" className="font-serif font-normal text-[32px] sm:text-[40px] leading-[1.05] mt-3 mb-3">{cta.title}</h2>
              <p className="j-sans text-[16px] text-[#F4EFE2]/80 m-0 max-w-2xl">{cta.body}</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a href="https://www.instagram.com/miguelperezflorida" target="_blank" rel="noopener noreferrer" className="btn btn--gold inline-flex items-center gap-2"><span>DM {cta.word} on Instagram</span></a>
                <a href="tel:+17864601023" className="btn inline-flex items-center gap-2"><span>Call 786-460-1023</span></a>
                {onOpenContact && (
                  <button type="button" className="btn inline-flex items-center gap-2 cursor-pointer" onClick={() => onOpenContact(cta.intent, cta.message)}><span>Send a message</span></button>
                )}
              </div>
            </aside>

            <div className="mt-10"><Share url={url} title={a.title} /></div>

            <section aria-labelledby="author-h" className="mt-12 flex flex-col sm:flex-row gap-6 border-t border-b border-[rgba(244,239,226,0.12)] py-8">
              <img src="/assets/miguel-perez-headshot.jpg" alt="Miguel Perez, REALTOR®" width={96} height={96} loading="lazy" decoding="async" className="w-24 h-24 object-cover rounded-full shrink-0" />
              <div>
                <h2 id="author-h" className="font-serif font-normal text-[28px] leading-tight m-0">Miguel Perez, REALTOR®</h2>
                <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#C9A24A] mt-2 mb-3">Luxe Properties · In South Florida real estate since 2021</p>
                <p className="j-sans text-[15px] text-[#F4EFE2]/80 m-0 leading-relaxed">I help buyers, sellers, investors and people relocating across Miami-Dade, Broward and Palm Beach make decisions with the data in front of them. ABR®, SRS, PSA, SFR®. FL license SL3515849. <a href="/about" className="text-[#E7C878] underline underline-offset-[3px] decoration-[#C9A24A]/60 hover:text-[#ffd9a0]">More about me</a> or call <a href="tel:+17864601023" className="text-[#E7C878] underline underline-offset-[3px] decoration-[#C9A24A]/60 hover:text-[#ffd9a0]">786-460-1023</a>.</p>
              </div>
            </section>

            <section id="sources" aria-labelledby="sources-h" className="mt-12 scroll-mt-28">
              <h2 id="sources-h" className="font-serif font-normal text-[30px] leading-tight m-0">Sources</h2>
              <ol className="j-sources j-sans mt-5 space-y-3 pl-5 text-[14px] text-[#F4EFE2]/80">
                {a.sources.map((s, i) => (
                  <li key={i} id={`source-${i + 1}`} className="scroll-mt-28">
                    {s.label}{' '}
                    {s.url && <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#E7C878] underline underline-offset-[3px] decoration-[#C9A24A]/60 hover:text-[#ffd9a0] break-all">{s.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a>}
                  </li>
                ))}
              </ol>
              <p className="j-sans text-[12px] text-[#F4EFE2]/65 mt-6 leading-relaxed">Market figures are medians from third-party public sources for the periods shown and do not represent the value of any specific property. Information is deemed reliable but not guaranteed and may change. This article is general information, not legal, tax or insurance advice. Equal Housing Opportunity.</p>
            </section>

            <div className="mt-14"><NewsletterSignup source={`journal/${a.slug}`} compact /></div>
          </div>
        </div></div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-h" className="wrap pb-24 pt-4 border-t border-[rgba(244,239,226,0.1)]">
          <h2 id="related-h" className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#C9A24A] mt-12 mb-8">Keep reading</h2>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <JournalCard key={r.slug} a={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
