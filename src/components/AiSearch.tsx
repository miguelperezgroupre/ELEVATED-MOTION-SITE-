import { useState, useRef } from 'react';
import { Search, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { Property, ParsedQuery } from '../types';
import { PROPERTIES, AI_EXAMPLES, parseAiQuery, scoreProperty, getAiTags, money } from '../data';

interface AiSearchProps {
  onSelectProperty: (property: Property) => void;
}

export default function AiSearch({ onSelectProperty }: AiSearchProps) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<{
    queryInfo: ParsedQuery;
    properties: Property[];
    relaxed: boolean;
  } | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = (textToSearch?: string) => {
    const q = (textToSearch !== undefined ? textToSearch : query).trim();
    if (!q) {
      setStatus("Describe the home you're after");
      setTimeout(() => setStatus(''), 2500);
      return;
    }

    setIsSearching(true);
    setStatus('Analyzing your request...');
    setResults(null);

    setTimeout(() => {
      setStatus('Matching South Florida residences...');
    }, 500);

    setTimeout(() => {
      const parsed = parseAiQuery(q);
      const ranked = PROPERTIES.map((p) => ({
        property: p,
        ...scoreProperty(p, parsed)
      })).sort((a, b) => b.score - a.score);

      let hits = ranked.filter((r) => r.hard && r.score > 0).map((r) => r.property);
      let relaxed = false;

      if (!hits.length) {
        hits = ranked.slice(0, 3).map((r) => r.property);
        relaxed = true;
      }

      hits = hits.slice(0, 6);

      setResults({
        queryInfo: parsed,
        properties: hits,
        relaxed
      });

      setStatus(`${hits.length} ${hits.length === 1 ? 'match' : 'matches'} found`);
      setIsSearching(false);

      setTimeout(() => {
        setStatus('');
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 2000);
    }, 1100);
  };

  const handleChipClick = (example: string) => {
    setQuery(example);
    handleSearch(example);
  };

  return (
    <section id="ai" className="sec sec--dark border-t border-[rgba(244,239,226,0.08)]" aria-label="AI property search">
      <div className="wrap">
        {/* Head */}
        <div className="max-w-3xl mb-12">
          <span className="eyebrow eyebrow--dot mb-3">AI Property Search</span>
          <h2 className="h2 text-[#f4efe2]">
            Describe Your <em className="it text-[#ffd9a0]">Dream Home</em>
          </h2>
          <p className="lede mt-4 text-[#f4efe2]/80">
            Tell it what you're looking for the way you'd tell Miguel over the phone. Plain language in, matched South Florida residences out.
          </p>
        </div>

        {/* AI Form */}
        <form
          className="max-w-4xl"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          autoComplete="off"
        >
          <div className="relative flex flex-col sm:flex-row items-stretch border border-[rgba(201,162,74,0.35)] bg-[rgba(20,26,29,0.7)] backdrop-blur-md p-2 sm:p-3 gap-2 transition-all focus-within:border-[#c9a24a] focus-within:shadow-[0_0_25px_rgba(201,162,74,0.15)]">
            <div className="flex items-center flex-1 px-3 gap-3">
              <Sparkles className="w-5 h-5 text-[#c9a24a] flex-shrink-0" />
              <input
                id="aiInput"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="A waterfront home in Fort Lauderdale with 4 bedrooms, a dock, and a pool under $5M"
                aria-label="Describe the home you want"
                className="w-full bg-transparent text-[#f4efe2] placeholder:text-[#f4efe2]/35 text-sm sm:text-base outline-none py-2 font-sans"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="btn btn--gold btn--sm flex-shrink-0 justify-center"
            >
              <span>{isSearching ? 'Searching...' : 'Search'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Preset chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {AI_EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => handleChipClick(example)}
                className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 bg-[rgba(244,239,226,0.04)] hover:bg-[rgba(201,162,74,0.12)] border border-[rgba(244,239,226,0.1)] hover:border-[#c9a24a] text-[#f4efe2]/75 hover:text-[#c9a24a] transition-all cursor-pointer text-left"
              >
                {example}
              </button>
            ))}
          </div>

          {/* Status message */}
          {status && (
            <div className="mt-4 font-mono text-xs text-[#c9a24a] flex items-center gap-2" role="status" aria-live="polite">
              <span className="w-2 h-2 rounded-full bg-[#c9a24a] animate-ping" />
              {status}
            </div>
          )}
        </form>

        {/* Search Results */}
        <div ref={resultsRef} className="mt-12" aria-live="polite">
          {results && (
            <div className="space-y-8 animate-fadeIn">
              {/* Parsed criteria tags */}
              <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-[rgba(244,239,226,0.1)]">
                <span className="font-mono text-[11px] text-[#f4efe2]/50 uppercase tracking-wider mr-2">
                  Extracted Filters:
                </span>
                {getAiTags(results.queryInfo).map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              {results.relaxed && (
                <p className="text-sm text-[#f4efe2]/70 italic bg-[rgba(201,162,74,0.06)] border-l-2 border-[#c9a24a] p-4">
                  Nothing matched every single criterion. Here are the closest residences in the current portfolio — Miguel can open the off-market network for the rest.
                </p>
              )}

              {/* Matched Property Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.properties.map((p) => (
                  <article
                    key={p.id}
                    onClick={() => onSelectProperty(p)}
                    data-cursor="view"
                    className="group relative cursor-pointer border border-[rgba(244,239,226,0.1)] hover:border-[#c9a24a] bg-[#141a1d] transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    <div className={`relative h-60 w-full overflow-hidden ${p.grad}`}>
                      <img
                        src={p.img}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="card-badge absolute top-3 left-3">
                        {p.badge}
                      </span>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#c9a24a] uppercase tracking-wider mb-1.5">
                          <MapPin className="w-3 h-3" />
                          {p.city}, FL
                        </div>
                        <h4 className="font-serif text-xl font-normal text-[#f4efe2] group-hover:text-[#c9a24a] transition-colors leading-snug">
                          {p.name}
                        </h4>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[rgba(244,239,226,0.08)] flex items-end justify-between">
                        <div className="font-mono text-lg text-[#ffd9a0] font-semibold">
                          {money(p.price)}
                        </div>
                        <div className="flex items-center gap-3 font-mono text-[11px] text-[#f4efe2]/60">
                          <span>{p.beds} bd</span>
                          <span>·</span>
                          <span>{p.baths} ba</span>
                          <span>·</span>
                          <span>{p.sqft.toLocaleString()} sqft</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <p className="font-mono text-[11px] text-[#f4efe2]/40 text-center pt-4">
                Matched against a curated sample portfolio of {PROPERTIES.length} residences — not a live MLS feed. Connect an IDX provider to search the full market.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
