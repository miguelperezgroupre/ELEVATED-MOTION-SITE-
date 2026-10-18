import { useState, useEffect } from 'react';
import { TrendingUp, Building2, ArrowRight, Activity, Loader2 } from 'lucide-react';
import { getNeighborhoodStats, getClosingData, NeighborhoodStats, ClosingData } from '../services/marketService';

interface MarketDashboardProps {
  onOpenContact: (intent?: string, message?: string) => void;
}

const fmt = (n: number) => n >= 1_000_000 ? `$${(n/1_000_000).toFixed(2)}M`
  : n >= 1000 ? `$${(n/1000).toFixed(0)}K` : n ? `$${n.toLocaleString()}` : '—';
const fmtPct = (n: number) => n === 0 ? '—' : `${n > 0 ? '+' : ''}${n}%`;

export default function MarketDashboard({ onOpenContact }: MarketDashboardProps) {
  const [stats, setStats] = useState<NeighborhoodStats[] | null>(null);
  const [closing, setClosing] = useState<ClosingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    Promise.all([getNeighborhoodStats(), getClosingData('Miami')])
      .then(([s, c]) => {
        if (cancelled) return;
        setStats(s);
        setClosing(c);
      })
      .catch(() => {
        if (!cancelled) setError('Live feed unavailable — showing what we have.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-[#0e1416]" aria-label="Market dashboard">
        <div className="wrap flex flex-col items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-[#c9a24a] animate-spin mb-4" />
          <p className="font-mono text-xs text-[#f4efe2]/50 tracking-wider">Compiling live Miami MLS market data…</p>
        </div>
      </section>
    );
  }

  const maxYear = Math.max(1, ...(closing?.byYear.map(b => b.count) || [1]));
  const maxBldg = Math.max(1, ...(closing?.buildings.map(b => b.closePpsf) || [1]));

  return (
    <section id="market-dashboard" className="py-20 bg-[#0e1416] border-t border-[rgba(244,239,226,0.08)]" aria-label="Condo market dashboard">
      <div className="wrap">
        {/* Head */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="eyebrow eyebrow--dot mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#c9a24a]" /> Market Intelligence · Live
            </span>
            <h2 className="h2 text-[#f4efe2]">
              Condo Market <em className="it text-[#ffd9a0]">Dashboard</em>
            </h2>
            <p className="lede text-[#f4efe2]/60 mt-3 max-w-xl">
              90-day sales statistics across South Florida neighborhoods — compiled live from the Miami Association of REALTORS&reg; MLS.
            </p>
          </div>
          <button
            onClick={() => onOpenContact('report', 'I would like the full market report behind this dashboard.')}
            className="btn btn--gold whitespace-nowrap"
          >
            <span>Get the full report</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* KPI Cards */}
        {closing && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {[
              { label: 'Closed Listings (90d)', value: closing.closedCount.toLocaleString(), sub: 'sample window' },
              { label: 'Avg $ / Sq Ft', value: fmt(closing.avgPpsf), sub: 'Miami closed sales' },
              { label: 'Discount vs List', value: `${closing.discountPct}%`, sub: 'list → close' },
              { label: 'Avg Close Price', value: fmt(closing.avgClosePrice), sub: '90-day closed' },
              { label: 'Avg List Price', value: fmt(closing.avgListPrice), sub: '90-day listings' },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-[#141a1d] border border-[rgba(201,162,74,0.25)] p-5 text-center">
                <div className="font-mono text-2xl sm:text-[26px] font-bold text-[#ffd9a0]">{kpi.value}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#f4efe2]/60 mt-1.5">{kpi.label}</div>
                <div className="text-[10px] text-[#f4efe2]/35 mt-0.5">{kpi.sub}</div>
              </div>
            ))}
          </div>
        )}

        {/* Neighborhood Stats Table */}
        {stats && stats.length > 0 && (
          <>
            <div className="mb-6 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#c9a24a]" />
              <h3 className="font-serif text-2xl text-[#f4efe2]">Neighborhood <em className="it text-[#ffd9a0]">Snapshot</em> — 90-Day Condo Sales</h3>
            </div>

            <div className="overflow-x-auto scrollbar-none pb-2">
              <div className="min-w-[980px] border border-[rgba(244,239,226,0.1)]">
                {/* Header */}
                <div className="grid grid-cols-[190px_repeat(6,1fr)_110px] bg-[#141a1d] border-b border-[rgba(244,239,226,0.1)] font-mono text-[10px] uppercase tracking-wider text-[#f4efe2]/50">
                  <div className="px-4 py-3">Neighborhood</div>
                  <div className="px-3 py-3 text-center">Months of Inventory</div>
                  <div className="px-3 py-3 text-center">Avg $/SqFt</div>
                  <div className="px-3 py-3 text-center">List→Close</div>
                  <div className="px-3 py-3 text-center">Days on Market</div>
                  <div className="px-3 py-3 text-center">Sold (90d)</div>
                  <div className="px-3 py-3 text-center">Active Listings</div>
                  <div className="px-3 py-3 text-center">Value Δ YoY</div>
                </div>

                {stats.map((row, i) => (
                  <div
                    key={row.name}
                    className={`grid grid-cols-[190px_repeat(6,1fr)_110px] items-center border-b border-[rgba(244,239,226,0.06)] transition-colors hover:bg-[rgba(201,162,74,0.05)] ${
                      i % 2 === 0 ? 'bg-[#101618]' : 'bg-[#0e1416]'
                    }`}
                  >
                    <div className="px-4 py-4">
                      <div className="font-serif text-lg text-[#f4efe2]">{row.name}</div>
                      <div className="font-mono text-[9px] text-[#f4efe2]/35 mt-0.5">Miami MLS · condo</div>
                    </div>
                    <div className="px-3 py-4 text-center">
                      <div className={`font-mono text-lg font-bold ${row.buyers ? 'text-[#e06c6c]' : 'text-[#7ee0a6]'}`}>
                        {row.monthsInventory || '—'}
                      </div>
                      <div className={`font-mono text-[9px] uppercase tracking-wider ${row.buyers ? 'text-[#e06c6c]/70' : 'text-[#7ee0a6]/70'}`}>
                        {row.buyers ? 'Buyers' : 'Sellers'} mkt
                      </div>
                    </div>
                    <div className="px-3 py-4 text-center">
                      <div className="font-mono text-lg text-[#ffd9a0] font-bold">{row.avgPpsf ? fmt(row.avgPpsf) : '—'}</div>
                      <div className="font-mono text-[9px] text-[#f4efe2]/35">avg sale</div>
                    </div>
                    <div className="px-3 py-4 text-center">
                      <div className={`font-mono text-lg font-bold ${row.listClosePct < 0 ? 'text-[#e06c6c]' : 'text-[#7ee0a6]'}`}>
                        {row.listClosePct || '—'}%
                      </div>
                      <div className="font-mono text-[9px] text-[#f4efe2]/35">vs list</div>
                    </div>
                    <div className="px-3 py-4 text-center">
                      <div className="font-mono text-lg text-[#f4efe2] font-bold">{row.dom || '—'}</div>
                      <div className="font-mono text-[9px] text-[#f4efe2]/35">avg days</div>
                    </div>
                    <div className="px-3 py-4 text-center">
                      <div className="font-mono text-lg text-[#f4efe2] font-bold">{row.sold90 || '—'}</div>
                      <div className={`font-mono text-[9px] ${row.soldYoY > row.sold90 ? 'text-[#e06c6c]' : 'text-[#7ee0a6]'}`}>
                        {row.soldYoY ? `${row.soldYoY} prior yr` : ''}
                      </div>
                    </div>
                    <div className="px-3 py-4 text-center">
                      <div className="font-mono text-lg text-[#f4efe2] font-bold">{row.active ? row.active.toLocaleString() : '—'}</div>
                      <div className="font-mono text-[9px] text-[#f4efe2]/35">current</div>
                    </div>
                    <div className="px-3 py-4 text-center">
                      <div className={`font-mono text-lg font-bold ${row.valueIncreasePct < 0 ? 'text-[#e06c6c]' : 'text-[#7ee0a6]'}`}>
                        {fmtPct(row.valueIncreasePct)}
                      </div>
                      <div className="font-mono text-[9px] text-[#f4efe2]/35">$/sqft</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="font-mono text-[10px] text-[#f4efe2]/30 mt-3 leading-relaxed">
              Months of inventory = active listings ÷ 90-day sales pace. Buyers market above 6 months. Data: Miami REALTORS&reg; MLS via Bridge Interactive, shuffled 90-day window. Information deemed reliable but not guaranteed.
            </p>
          </>
        )}

        {/* Charts row */}
        {closing && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14">
            {/* Closings by year */}
            <div className="bg-[#141a1d] border border-[rgba(244,239,226,0.1)] p-6 sm:p-8">
              <h4 className="font-serif text-xl text-[#f4efe2] mb-1">Closings by Year</h4>
              <p className="font-mono text-[10px] text-[#f4efe2]/40 mb-6">Miami condo sample · {closing.closedCount.toLocaleString()} closed (90d)</p>
              <div className="flex items-end gap-2 h-44">
                {closing.byYear.map((b) => (
                  <div key={b.year} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="font-mono text-[9px] text-[#ffd9a0] opacity-0 group-hover:opacity-100">{b.count}</span>
                    <div
                      className="w-full bg-gradient-to-t from-[#1F6970]/40 to-[#1F6970] border border-[#1F6970]/60 transition-all duration-500 group-hover:from-[#c9a24a]/50 group-hover:to-[#c9a24a]"
                      style={{ height: `${Math.max(6, Math.round((b.count / maxYear) * 100))}%` }}
                    />
                    <span className="font-mono text-[9px] text-[#f4efe2]/40">{b.year % 100}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price per sqft by building */}
            <div className="bg-[#141a1d] border border-[rgba(244,239,226,0.1)] p-6 sm:p-8">
              <h4 className="font-serif text-xl text-[#f4efe2] mb-1">Avg List / Close $ per Sq Ft</h4>
              <p className="font-mono text-[10px] text-[#f4efe2]/40 mb-6">Top Miami condo buildings (90-day sample)</p>
              <div className="space-y-2.5">
                {closing.buildings.slice(0, 8).map((b) => (
                  <div key={b.name} className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-[#f4efe2]/70 w-40 truncate text-right">{b.name}</span>
                    <div className="flex-1 flex items-center gap-1">
                      <div
                        className="h-4 bg-[#1F6970] transition-all duration-500"
                        style={{ width: `${Math.max(2, Math.round((b.closePpsf / maxBldg) * 100))}%` }}
                        title={`Close $${b.closePpsf.toLocaleString()}`}
                      />
                      <div
                        className="h-4 bg-[#c9a24a]/70 transition-all duration-500"
                        style={{ width: `${Math.max(2, Math.round((b.listPpsf / maxBldg) * 100))}%` }}
                        title={`List $${b.listPpsf.toLocaleString()}`}
                      />
                    </div>
                    <span className="font-mono text-[9px] text-[#f4efe2]/50 w-16">${Math.round(b.closePpsf/100)/10}K</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-5 font-mono text-[10px] text-[#f4efe2]/50">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#1F6970]" /> Avg Closed $/sqft</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#c9a24a]/70" /> Avg List $/sqft</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="font-mono text-[11px] text-[#e0a36a] mt-8 text-center">{error}</p>
        )}
      </div>
    </section>
  );
}
