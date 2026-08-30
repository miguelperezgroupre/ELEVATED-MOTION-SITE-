import React, { useState, useMemo } from 'react';
import { ArrowRight, FileText, CheckCircle2, TrendingUp, Sparkles, BookOpen, Clock, Download } from 'lucide-react';
import { INSIGHT_ARTICLES, MARKET, MONTHS } from '../../data';
import { InsightArticle } from '../../types';

interface InsightsViewProps {
  onOpenContact: (intent?: string, message?: string) => void;
}

export default function InsightsView({ onOpenContact }: InsightsViewProps) {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);
  const [activeMarketCity, setActiveMarketCity] = useState<'miami' | 'ftl' | 'pb'>('miami');

  // Lead Magnet State
  const [reportEmail, setReportEmail] = useState('');
  const [reportName, setReportName] = useState('');
  const [reportDownloaded, setReportDownloaded] = useState(false);

  const categories = [
    'all',
    'Market Update',
    'Real Estate Strategy',
    'Developments',
    'Neighborhoods',
    'South Florida Lifestyle'
  ];

  const filteredArticles = useMemo(() => {
    if (selectedCat === 'all') return INSIGHT_ARTICLES;
    return INSIGHT_ARTICLES.filter(a => a.category === selectedCat);
  }, [selectedCat]);

  const handleReportDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportEmail.trim()) return;
    setReportDownloaded(true);
  };

  const currentCityData = MARKET[activeMarketCity];

  return (
    <div className="pt-24 pb-20 animate-fadeIn">
      {/* 1. Insights Hero */}
      <section className="relative py-16 sm:py-24 border-b border-[rgba(244,239,226,0.1)] bg-gradient-to-b from-[#0B0B0B] via-[#141a1d] to-[#0B0B0B]">
        <div className="wrap">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow--dot mb-3">Research & Advisory · South Florida Elevated</span>
            <h1 className="font-serif text-4xl sm:text-6xl text-[#f4efe2] font-normal leading-[1.08] tracking-tight">
              South Florida <em className="it text-[#ffd9a0]">Intelligence</em>.
            </h1>
            <p className="font-serif text-2xl sm:text-3xl text-[#c9a24a] italic mt-2">
              What's happening beneath the headlines.
            </p>
            <p className="text-base sm:text-lg text-[#f4efe2]/80 mt-6 font-light leading-relaxed">
              We decode real data, capital migrations, building structural reserve audits, and waterfront supply constraints so you can navigate South Florida real estate with uncompromised clarity.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a href="#market-report-lead" className="btn btn--gold">
                <span>Download Q3 Market Report</span>
                <Download className="w-4 h-4" />
              </a>
              <button
                onClick={() => onOpenContact('report', 'I would like to receive Miguel Perez monthly private market intelligence briefings.')}
                className="btn"
              >
                <span>Subscribe to Monthly Brief</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Market Benchmark Chart Section */}
      <section className="py-16 border-b border-[rgba(244,239,226,0.08)] bg-[#101618]">
        <div className="wrap">
          <div className="max-w-5xl mx-auto bg-[#141a1d] border border-[rgba(201,162,74,0.3)] p-6 sm:p-10 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="mono-label text-[#c9a24a]">Live Market Benchmarks (2026)</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#f4efe2]">
                  Price-Pacing & Inventory <em className="it text-[#ffd9a0]">Velocity</em>
                </h3>
              </div>

              {/* City Switcher */}
              <div className="flex bg-[#0B0B0B] p-1 border border-[rgba(244,239,226,0.15)]">
                {(['miami', 'ftl', 'pb'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveMarketCity(c)}
                    className={`px-4 py-2 font-mono text-xs uppercase transition-colors cursor-pointer ${
                      activeMarketCity === c
                        ? 'bg-[#c9a24a] text-[#0B0B0B] font-bold'
                        : 'text-[#f4efe2]/70 hover:text-[#f4efe2]'
                    }`}
                  >
                    {c === 'miami' ? 'Miami-Dade' : c === 'ftl' ? 'Broward' : 'Palm Beach'}
                  </button>
                ))}
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[rgba(244,239,226,0.1)] text-center font-mono">
              <div>
                <span className="text-[#f4efe2]/50 text-[10px] block">Median Single Family</span>
                <b className="text-xl sm:text-2xl text-[#ffd9a0]">{currentCityData.price}</b>
                <span className="text-emerald-400 text-xs block mt-1">{currentCityData.dPrice} YoY</span>
              </div>
              <div>
                <span className="text-[#f4efe2]/50 text-[10px] block">Days on Market</span>
                <b className="text-xl sm:text-2xl text-[#f4efe2]">{currentCityData.dom}</b>
                <span className="text-[#f4efe2]/60 text-xs block mt-1">{currentCityData.dDom} vs last mo</span>
              </div>
              <div>
                <span className="text-[#f4efe2]/50 text-[10px] block">Months of Supply</span>
                <b className="text-xl sm:text-2xl text-[#c9a24a]">{currentCityData.inv}</b>
                <span className="text-[#f4efe2]/60 text-xs block mt-1">Sellers market</span>
              </div>
              <div>
                <span className="text-[#f4efe2]/50 text-[10px] block">Luxury Appreciation</span>
                <b className="text-xl sm:text-2xl text-[#ffd9a0]">{currentCityData.lux}</b>
                <span className="text-emerald-400 text-xs block mt-1">Annual Alpha</span>
              </div>
            </div>

            {/* Price Trend Visualization */}
            <div className="mt-8">
              <span className="mono-label text-xs block mb-4">6-Month Median Price Velocity ($ Thousands)</span>
              <div className="h-32 flex items-end justify-between gap-3 pt-4 border-b border-[rgba(244,239,226,0.15)]">
                {currentCityData.series.map((val, idx) => {
                  const min = Math.min(...currentCityData.series) * 0.95;
                  const max = Math.max(...currentCityData.series) * 1.05;
                  const heightPct = Math.round(((val - min) / (max - min)) * 100);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                      <span className="font-mono text-[10px] text-[#ffd9a0] opacity-0 group-hover:opacity-100 transition-opacity">
                        ${val}k
                      </span>
                      <div
                        style={{ height: `${Math.max(20, heightPct)}%` }}
                        className="w-full bg-gradient-to-t from-[#c9a24a]/30 to-[#c9a24a] border border-[#c9a24a] transition-all duration-500"
                      />
                      <span className="font-mono text-[11px] text-[#f4efe2]/60">{MONTHS[idx]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Filter Tabs */}
      <section className="py-6 border-b border-[rgba(244,239,226,0.08)] bg-[#0B0B0B] sticky top-16 z-30 backdrop-blur-md bg-[#0B0B0B]/95">
        <div className="wrap">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider whitespace-nowrap border transition-all cursor-pointer ${
                  selectedCat === cat
                    ? 'border-[#c9a24a] bg-[#c9a24a]/20 text-[#ffd9a0]'
                    : 'border-[rgba(244,239,226,0.1)] text-[#f4efe2]/70 hover:text-[#f4efe2]'
                }`}
              >
                {cat === 'all' ? 'All Intelligence' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Articles Grid */}
      <section className="py-16 bg-[#0B0B0B]">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="bg-[#141a1d] border border-[rgba(244,239,226,0.1)] hover:border-[#c9a24a] transition-all cursor-pointer overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={art.img}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B0B0B]/85 px-3 py-1 font-mono text-[10px] text-[#ffd9a0] border border-[rgba(244,239,226,0.2)]">
                    {art.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 font-mono text-[11px] text-[#c9a24a] mb-2">
                      <span>{art.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {art.readTime}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#f4efe2] group-hover:text-[#ffd9a0] transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-[#f4efe2]/75 font-light mt-3 line-clamp-3 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[rgba(244,239,226,0.08)] flex items-center justify-between">
                    <span className="font-mono text-xs text-[#f4efe2]/60">By {art.author}</span>
                    <span className="text-xs font-mono text-[#c9a24a] group-hover:underline flex items-center gap-1">
                      Read Analysis →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Lead Magnet: Download Market Report */}
      <section id="market-report-lead" className="py-20 border-t border-[rgba(244,239,226,0.1)] bg-[#101618]">
        <div className="wrap">
          <div className="max-w-4xl mx-auto bg-[#141a1d] border border-[#c9a24a] p-8 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <span className="mono-label text-[#c9a24a]">Lead Intelligence Document</span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#f4efe2] font-normal">
                  The 2026 South Florida Luxury Market <em className="it text-[#ffd9a0]">Report</em>
                </h3>
                <p className="text-xs sm:text-sm text-[#f4efe2]/80 font-light leading-relaxed">
                  A 36-page deep dive into price per linear foot of waterfront dockage, condo milestone reserve impact audits, developer deliverability timelines, and tax domicile structuring.
                </p>

                <div className="space-y-1.5 pt-2">
                  {[
                    "Detailed neighborhood-by-neighborhood absorption rates",
                    "Pre-construction tower delivery & stack pricing analysis",
                    "Waterfront dockage & fixed-bridge navigation metrics",
                    "FL Homestead Exemption & wealth domicile guide"
                  ].map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#f4efe2]/80 font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a24a] shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5 bg-[#0B0B0B] p-6 border border-[rgba(244,239,226,0.1)]">
                {reportDownloaded ? (
                  <div className="text-center py-6 space-y-3 animate-fadeIn">
                    <CheckCircle2 className="w-12 h-12 text-[#c9a24a] mx-auto" />
                    <h4 className="font-serif text-2xl text-[#ffd9a0]">Report Sent.</h4>
                    <p className="text-xs text-[#f4efe2]/80 font-light">
                      Check your inbox for your copy of the 2026 South Florida Luxury Market Report.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleReportDownload} className="space-y-4">
                    <div className="field">
                      <label>Your Name</label>
                      <input
                        type="text"
                        required
                        value={reportName}
                        onChange={(e) => setReportName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="field">
                      <label>Email Address</label>
                      <input
                        type="email"
                        required
                        value={reportEmail}
                        onChange={(e) => setReportEmail(e.target.value)}
                        placeholder="you@email.com"
                      />
                    </div>

                    <button type="submit" className="btn btn--gold w-full justify-center text-xs">
                      <span>Get Market Intelligence Report</span>
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <p className="font-mono text-[9px] text-[#f4efe2]/40 text-center">
                      Zero spam. Strict privacy protected.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="fixed inset-0" onClick={() => setSelectedArticle(null)} />
          <div className="relative w-full max-w-3xl bg-[#141a1d] border border-[#c9a24a] shadow-2xl p-6 sm:p-10 z-10 my-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 text-[#f4efe2]/60 hover:text-[#c9a24a] p-1 cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-6">
              <div>
                <span className="mono-label text-[#c9a24a]">{selectedArticle.category} · {selectedArticle.date}</span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#f4efe2] font-normal mt-2 leading-snug">
                  {selectedArticle.title}
                </h3>
                <div className="font-mono text-xs text-[#ffd9a0] mt-2">
                  By {selectedArticle.author} · {selectedArticle.readTime}
                </div>
              </div>

              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={selectedArticle.img}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-sm text-[#f4efe2]/85 font-light leading-relaxed">
                {selectedArticle.summary}
              </p>

              <div className="p-6 bg-[#0B0B0B] border border-[rgba(244,239,226,0.1)] space-y-3">
                <span className="mono-label text-[#c9a24a]">Key Strategic Takeaways</span>
                <div className="space-y-2">
                  {selectedArticle.keyTakeaways.map((takeaway, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#f4efe2]/80 font-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c9a24a] mt-1.5 shrink-0" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(244,239,226,0.1)] flex justify-between items-center">
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    onOpenContact('general', `Inquiry regarding analysis: ${selectedArticle.title}`);
                  }}
                  className="btn btn--gold text-xs"
                >
                  <span>Discuss This Strategy with Miguel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-xs font-mono text-[#f4efe2]/60 hover:text-[#f4efe2]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
