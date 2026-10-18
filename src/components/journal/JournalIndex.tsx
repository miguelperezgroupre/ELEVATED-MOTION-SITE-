// @ts-nocheck
import {useState} from 'react';
import {ARTICLES, JOURNAL_CATEGORIES} from '../../journal';
import JournalCard from './JournalCard';
import NewsletterSignup from './NewsletterSignup';

export default function JournalIndex() {
  const [cat, setCat] = useState('All');
  const counts = Object.fromEntries(JOURNAL_CATEGORIES.map((c) => [c, ARTICLES.filter((a) => a.category === c).length]));
  const list = cat === 'All' ? ARTICLES : ARTICLES.filter((a) => a.category === cat);
  const [lead, ...rest] = list;
  return (
    <div className="j-page bg-[#0B0B0B] text-[#F4EFE2]">
      <header className="wrap pt-36 sm:pt-40 pb-10 sm:pb-14 border-b border-[rgba(244,239,226,0.1)]">
        <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#C9A24A] m-0">The Journal · South Florida Elevated</p>
        <h1 className="j-hero-title font-serif font-normal leading-[0.98] mt-4 mb-5">The Journal.</h1>
        <p className="j-hero-sub j-sans text-[#F4EFE2]/80 m-0">Sourced guides to South Florida neighborhoods, markets and moves.</p>
      </header>

      <div className="wrap pt-8 pb-4">
        <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-2">
          {['All', ...JOURNAL_CATEGORIES].map((c) => {
            const on = cat === c;
            const n = c === 'All' ? ARTICLES.length : counts[c];
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setCat(c)}
                className={`font-mono text-[11px] tracking-[0.14em] uppercase px-3.5 py-2 border transition-colors cursor-pointer ${on ? 'bg-[#C9A24A] text-[#0B0B0B] border-[#C9A24A]' : 'bg-transparent text-[#F4EFE2]/85 border-[rgba(244,239,226,0.25)] hover:border-[#C9A24A] hover:text-[#E7C878]'}`}
              >
                {c} <span className={on ? 'text-[#0B0B0B]/75' : 'text-[#F4EFE2]/60'}>({n})</span>
              </button>
            );
          })}
        </div>
      </div>

      <section aria-label={cat === 'All' ? 'Latest articles' : `${cat} articles`} className="sfe-ivory pt-12 pb-16 min-h-[420px]"><div className="wrap">
        {lead ? (
          <>
            <JournalCard a={lead} featured eager headingLevel={2} />
            {rest.length > 0 && (
              <>
                <h2 className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#C9A24A] mt-16 mb-8 pt-8 border-t border-[rgba(244,239,226,0.1)]">More from the Journal</h2>
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((a) => <JournalCard key={a.slug} a={a} />)}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="border border-[rgba(244,239,226,0.15)] p-10 max-w-2xl">
            <h2 className="font-serif font-normal text-[32px] leading-tight m-0">Nothing in {cat} yet.</h2>
            <p className="j-sans text-[#F4EFE2]/75 mt-3 mb-0">New {cat.toLowerCase()} pieces are on the way. Subscribe below and they’ll land in your inbox first.</p>
          </div>
        )}
      </div></section>

      <div className="wrap pb-24">
        <NewsletterSignup source="journal" />
      </div>
    </div>
  );
}
