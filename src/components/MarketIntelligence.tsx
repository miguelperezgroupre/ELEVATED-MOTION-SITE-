// @ts-nocheck
// Market Intelligence (home). Oct 2026: the old sample dataset (medians, days on market, inventory, YoY and a 6-month
// trend that were not sourced) is replaced with verified median sale prices and $/sq ft, each with its source and period.
import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PRICE_SOURCES as P, DATA_DISCLAIMER } from '../neighborhoodData';

const rf = (area, path, median, ppsf, note) => ({ area, median, ppsf, src: 'Redfin', period: '3 months through Aug 2026', url: 'https://www.redfin.com' + path, note });
const CITIES = {
  miami: { label: 'Miami', rows: [P.brickell, P.edgewater, P.downtownMiami, P.coconutGrove, P.coralGables, P.southBeach] },
  ftl: { label: 'Fort Lauderdale', rows: [P.downtownFtl, P.victoriaPark, P.tarponRiver, P.lauderdaleBeach, P.galtMile, P.wiltonManors] },
  pb: { label: 'Palm Beach', rows: [P.palmBeach, rf('West Palm Beach (citywide)', '/city/19373/FL/West-Palm-Beach/housing-market', '$450K', '$300', 'Citywide figure includes western suburbs; downtown and historic districts differ.'), rf('Boca Raton', '/city/1903/FL/Boca-Raton/housing-market', '$854K', '$475'), rf('Delray Beach', '/city/4456/FL/Delray-Beach/housing-market', '$507K', '$377'), rf('Jupiter', '/city/9126/FL/Jupiter/housing-market', '$735K', '$386')] },
};

export default function MarketIntelligence({ onOpenContact }) {
  const [city, setCity] = useState('miami');
  const data = CITIES[city];
  return (
    <section id="market" className="sec sec--light" aria-label="Market intelligence">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow text-[16px]">Market Intelligence</span>
            <h2 className="h2 text-[72px] text-[#1a1e24]">The Data, <em className="it text-[#9a7629]">Decoded</em>.</h2>
          </div>
          <div className="flex items-center border border-[#d1d5db] p-1 bg-white shadow-sm" role="tablist" aria-label="Market">
            {Object.keys(CITIES).map((k) => (
              <button key={k} type="button" role="tab" aria-selected={city === k} onClick={() => setCity(k)} className={`px-4 sm:px-6 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${city === k ? 'bg-[#0e1416] text-[#deb65b] font-semibold shadow-sm' : 'text-[#4b5563] hover:text-[#1a1e24]'}`}>{CITIES[k].label}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="tabpanel" aria-label={`${data.label} verified medians`}>
          {data.rows.map((r) => (
            <div key={r.area} className="bg-white border border-[#e5e7eb] p-6 shadow-sm flex flex-col justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-normal text-[#1a1e24]">{r.area}{r.small ? '*' : ''}</h3>
                <div className="mt-3 flex items-end gap-6">
                  <div><span className="mono-label block text-[#4b5563]">Median sale price</span><b className="num text-2xl sm:text-3xl text-[#1a1e24] font-semibold">{r.median}</b></div>
                  <div><span className="mono-label block text-[#4b5563]">Median $/sq ft</span><b className="num text-2xl sm:text-3xl text-[#1a1e24] font-semibold">{r.ppsf}</b></div>
                </div>
                {r.note && <p className="mt-3 text-xs text-[#4b5563] leading-relaxed">{r.note}</p>}
              </div>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-[#4b5563] hover:text-[#1a1e24] inline-flex items-center gap-1 underline-offset-2 hover:underline">
                {r.src} · {r.period} <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-[#e5e7eb] flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-sans text-xs text-[#4b5563] max-w-2xl leading-relaxed">
            Median sale price and median $/sq ft, all home types, from Redfin public market pages (Galt Mile: Realtor.com median sold price). {DATA_DISCLAIMER} Medians describe what sold, not what any given home is worth.
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
