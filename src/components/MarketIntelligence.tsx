import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { MARKET, MONTHS } from '../data';

interface MarketIntelligenceProps {
  onOpenContact: () => void;
}

export default function MarketIntelligence({ onOpenContact }: MarketIntelligenceProps) {
  const [activeCity, setActiveCity] = useState<'miami' | 'ftl' | 'pb'>('miami');
  const data = MARKET[activeCity];

  // Chart coordinate calculations
  const W = 700;
  const H = 320;
  const pl = 64;
  const pr = 20;
  const pt = 24;
  const pb = 40;

  const maxVal = Math.max(...data.series) * 1.08;
  const minVal = Math.min(...data.series) * 0.86;

  const getX = (i: number) => pl + (W - pl - pr) * (i / (data.series.length - 1));
  const getY = (v: number) => pt + (H - pt - pb) * (1 - (v - minVal) / (maxVal - minVal));

  const points = data.series.map((v, i) => [getX(i), getY(v)]);
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L ${getX(data.series.length - 1).toFixed(1)} ${H - pb} L ${pl} ${H - pb} Z`;

  const gridSteps = [0, 0.25, 0.5, 0.75, 1];

  return (
    <section id="market" className="sec sec--light" aria-label="Market intelligence">
      <div className="wrap">
        {/* Head with City Switcher Tabs */}
        <div className="sec-head">
          <div>
            <span className="eyebrow text-[16px]">Market Intelligence</span>
            <h2 className="h2 text-[72px] text-[#1a1e24]">The Data, <em className="it text-[#9a7629]">Decoded</em>.</h2>
          </div>

          <div className="flex items-center border border-[#d1d5db] p-1 bg-white shadow-sm">
            {(['miami', 'ftl', 'pb'] as const).map((cityKey) => {
              const isActive = activeCity === cityKey;
              return (
                <button
                  key={cityKey}
                  type="button"
                  onClick={() => setActiveCity(cityKey)}
                  className={`px-4 sm:px-6 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0e1416] text-[#deb65b] font-semibold shadow-sm'
                      : 'text-[#4b5563] hover:text-[#1a1e24]'
                  }`}
                >
                  {MARKET[cityKey].label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Grid: Metrics & Animated Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Metrics Cards */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            <div className="bg-white border border-[#e5e7eb] p-6 shadow-sm flex items-center justify-between">
              <div>
                <span className="mono-label block text-[#6b7280]">Median sale price</span>
                <b className="num text-2xl sm:text-3xl text-[#1a1e24] font-semibold">{data.price}</b>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                {data.dPrice}
              </span>
            </div>

            <div className="bg-white border border-[#e5e7eb] p-6 shadow-sm flex items-center justify-between">
              <div>
                <span className="mono-label block text-[#6b7280]">Days on market</span>
                <b className="num text-2xl sm:text-3xl text-[#1a1e24] font-semibold">{data.dom}</b>
              </div>
              <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 border border-amber-200">
                {data.dDom}
              </span>
            </div>

            <div className="bg-white border border-[#e5e7eb] p-6 shadow-sm flex items-center justify-between">
              <div>
                <span className="mono-label block text-[#6b7280]">Months of inventory</span>
                <b className="num text-2xl sm:text-3xl text-[#1a1e24] font-semibold">{data.inv}</b>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                {data.dInv}
              </span>
            </div>

            <div className="bg-white border border-[#e5e7eb] p-6 shadow-sm flex items-center justify-between">
              <div>
                <span className="mono-label block text-[#6b7280]">Luxury sales YoY</span>
                <b className="num text-2xl sm:text-3xl text-[#1a1e24] font-semibold">{data.lux}</b>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                {data.dLux}
              </span>
            </div>
          </div>

          {/* Right SVG Chart Container */}
          <div className="lg:col-span-8 bg-white border border-[#e5e7eb] p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between pb-6 border-b border-[#e5e7eb]">
              <div>
                <span className="mono-label text-[#6b7280]">Median price trend · 6 months</span>
                <h4 className="font-serif text-2xl font-normal text-[#1a1e24] mt-1">{data.label}</h4>
              </div>
              <button
                type="button"
                onClick={onOpenContact}
                className="link-gold text-[#9a7629] font-mono text-xs flex items-center gap-1 hover:underline"
              >
                <span>Full report</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* SVG Line & Area Chart */}
            <div className="my-6 w-full overflow-x-auto">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[540px]">
                <defs>
                  <linearGradient id="goldFade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9A24A" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#C9A24A" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Background Grid Lines */}
                <g className="chart-grid">
                  {gridSteps.map((f, idx) => {
                    const y = pt + (H - pt - pb) * f;
                    const v = Math.round((maxVal - (maxVal - minVal) * f) / 1000);
                    return (
                      <g key={idx}>
                        <line x1={pl} y1={y} x2={W - pr} y2={y} stroke="#e5e7eb" strokeDasharray="3 3" />
                        <text x={pl - 12} y={y + 4} textAnchor="end" className="chart-txt fill-[#6b7280]">
                          ${v}k
                        </text>
                      </g>
                    );
                  })}
                </g>

                {/* Area Gradient */}
                <path d={areaPath} fill="url(#goldFade)" />

                {/* Line Stroke */}
                <path
                  d={linePath}
                  fill="none"
                  stroke="#C9A24A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points */}
                {points.map((p, idx) => (
                  <circle
                    key={idx}
                    cx={p[0]}
                    cy={p[1]}
                    r="4.5"
                    fill="#C9A24A"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                ))}

                {/* X-Axis Month Labels */}
                {MONTHS.map((month, idx) => (
                  <text
                    key={month}
                    x={getX(idx)}
                    y={H - 12}
                    textAnchor="middle"
                    className="chart-txt fill-[#6b7280] font-mono text-[11px]"
                  >
                    {month}
                  </text>
                ))}
              </svg>
            </div>

            <p className="font-mono text-[11px] text-[#9ca3af] text-right">
              Historical sample dataset for {data.label}
            </p>
          </div>
        </div>

        {/* Section Foot */}
        <div className="mt-12 pt-8 border-t border-[#e5e7eb] flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-sans text-xs text-[#6b7280] max-w-xl">
            Figures shown are sample values for demonstration. Connect a market data provider or MLS feed to publish live, sourced statistics.
          </p>
          <button className="btn btn--gold btn--sm" onClick={onOpenContact}>
            <span>Get my neighborhood report</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
