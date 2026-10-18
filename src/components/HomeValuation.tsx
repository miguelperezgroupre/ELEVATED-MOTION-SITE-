// @ts-nocheck
// Home Valuation (home). Oct 2026: the unsourced market $/sq ft benchmarks (Miami 820, Fort Lauderdale 610, Palm Beach
// 1,450) and property-type multipliers are gone. The rough range now uses the selected neighborhood's verified median
// $/sq ft (source and period shown) and is clearly labeled as arithmetic, not an appraisal.
import { useState } from 'react';
import { ArrowRight, Calculator } from 'lucide-react';
import { shortMoney } from '../data';
import { PRICE_SOURCES as P, DATA_AS_OF } from '../neighborhoodData';
import { leadService } from '../services/leadService';

const AREAS = Object.values(P).concat([{ area: 'West Palm Beach (citywide)', ppsf: '$300', src: 'Redfin', period: '3 months through Aug 2026' }]);
const perFoot = (v) => { const m = String(v).match(/([\d.]+)\s*(K?)/); return m ? parseFloat(m[1]) * (m[2] ? 1000 : 1) : 0; };

export default function HomeValuation({ onOpenContact, source = 'southfloridaelevated.com' }) {
  const [address, setAddress] = useState('');
  const [type, setType] = useState('Single family');
  const [area, setArea] = useState(AREAS[0].area);
  const [sqft, setSqft] = useState('');
  const [beds, setBeds] = useState('4');
  const [baths, setBaths] = useState('3');
  const [err, setErr] = useState('');
  const [result, setResult] = useState(null);
  const row = AREAS.find((a) => a.area === area) || AREAS[0];

  const calc = (e) => {
    e.preventDefault();
    const s = parseFloat(sqft);
    if (!s || s < 300) { setErr('Enter a square footage of at least 300 to run the estimate.'); setResult(null); return; }
    setErr('');
    const mid = perFoot(row.ppsf) * s;
    setResult(`${shortMoney(Math.round((mid * 0.9) / 10000) * 10000)} — ${shortMoney(Math.round((mid * 1.1) / 10000) * 10000)}`);
  };

  return (
    <section id="valuation" className="sec bg-[#04343F] text-[#f4efe2]" aria-label="Home valuation">
      <div className="wrap">
        <div className="sec-head sec-head--center mb-16">
          <div>
            <span className="eyebrow eyebrow--dot text-[16px]">Home Valuation</span>
            <h2 className="h2 text-[72px] text-[#f4efe2] mt-4">What's Your Home <em className="it text-[#ffd9a0]">Worth</em>?</h2>
            <p className="lede text-[18px] text-[#f4efe2]/80 mt-3 mx-auto">Start with a rough range from your neighborhood's verified median price per square foot, then get a considered valuation from Miguel.</p>
          </div>
        </div>
        <form onSubmit={calc} className="max-w-4xl mx-auto border border-[rgba(244,239,226,0.12)] bg-[#131a1b] backdrop-blur-md p-6 sm:p-12 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="field"><label htmlFor="vAddr">Property address</label><input id="vAddr" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="1 Ocean Dr, Miami Beach" required /></div>
            <div className="field"><label htmlFor="vType">Property type</label><select id="vType" value={type} onChange={(e) => setType(e.target.value)}>{['Single family', 'Condominium', 'Townhome', 'Waterfront home'].map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
            <div className="field"><label htmlFor="vArea">Neighborhood</label><select id="vArea" value={area} onChange={(e) => setArea(e.target.value)}>{AREAS.map((a) => <option key={a.area} value={a.area}>{a.area}</option>)}</select></div>
            <div className="field"><label htmlFor="vSqft">Square feet</label><input id="vSqft" type="number" min="300" step="1" value={sqft} onChange={(e) => setSqft(e.target.value)} placeholder="3,500" required /></div>
            <div className="field"><label htmlFor="vBeds">Bedrooms</label><input id="vBeds" type="number" min="0" max="20" value={beds} onChange={(e) => setBeds(e.target.value)} placeholder="4" /></div>
            <div className="field"><label htmlFor="vBaths">Bathrooms</label><input id="vBaths" type="number" min="0" max="20" value={baths} onChange={(e) => setBaths(e.target.value)} placeholder="3" /></div>
          </div>
          {err && <p className="font-mono text-xs text-rose-300 bg-rose-950/40 p-3 border border-rose-800/50">{err}</p>}
          <div>
            <button type="submit" className="btn btn--gold w-full justify-center"><Calculator className="w-4 h-4" /><span>Get my rough range</span><ArrowRight className="w-4 h-4" /></button>
          </div>
          {result && (
            <div className="pt-8 border-t border-[rgba(244,239,226,0.12)] animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
                <div>
                  <span className="mono-label block text-[#c9a24a] mb-2">Rough range</span>
                  <div className="num text-3xl sm:text-5xl text-[#ffd9a0] font-bold">{result}</div>
                  <p className="text-xs text-[#f4efe2]/75 mt-3 max-w-xl leading-relaxed">Your square footage × the {row.area} median of {row.ppsf}/sq ft ({row.src}, {row.period}), ±10%. Data as of {DATA_AS_OF}.{row.small ? ' Small sample (fewer than 15 sales), so this median can swing month to month.' : ''} Arithmetic only: not an appraisal or a CMA, and medians describe what sold, not what your home is worth. Miguel will send a documented valuation with real comparables.</p>
                </div>
                <button type="button" onClick={() => { try { leadService.submit({ type: 'valuation', name: 'Valuation Request', email: '', intent: 'Home Valuation', source, sqft, beds, baths, propertyType: type, marketArea: area }); } catch (e) {} onOpenContact('Home Valuation', `I'd like a documented valuation for ${address || 'my property'} (${sqft} sqft, ${beds} bd/${baths} ba, ${type}, ${area}). Rough range: ${result}`); }} className="btn whitespace-nowrap">
                  <span>Request documented valuation</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
