import React, { useState } from 'react';
import { ArrowRight, Calculator } from 'lucide-react';
import { PPSF, shortMoney } from '../data';

interface HomeValuationProps {
  onOpenContact: () => void;
}

export default function HomeValuation({ onOpenContact }: HomeValuationProps) {
  const [address, setAddress] = useState('');
  const [propertyType, setPropertyType] = useState('Single family');
  const [marketArea, setMarketArea] = useState<'miami' | 'ftl' | 'pb'>('miami');
  const [sqft, setSqft] = useState('');
  const [beds, setBeds] = useState('4');
  const [baths, setBaths] = useState('3');
  const [errorMsg, setErrorMsg] = useState('');
  const [valuationResult, setValuationResult] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const sqftNum = parseFloat(sqft);
    if (!sqftNum || sqftNum < 300) {
      setErrorMsg('Enter a square footage of at least 300 to run the estimate.');
      setValuationResult(null);
      return;
    }
    setErrorMsg('');

    const basePPSF = PPSF[marketArea];
    const multiplier =
      propertyType === 'Waterfront estate'
        ? 1.45
        : propertyType === 'Condominium'
        ? 0.94
        : propertyType === 'Townhome'
        ? 0.88
        : 1.0;

    const midEstimate = basePPSF * sqftNum * multiplier;
    const lowEstimate = Math.round((midEstimate * 0.92) / 10000) * 10000;
    const highEstimate = Math.round((midEstimate * 1.08) / 10000) * 10000;

    setValuationResult(`${shortMoney(lowEstimate)} — ${shortMoney(highEstimate)}`);
  };

  return (
    <section id="valuation" className="sec sec--dark" aria-label="Home valuation">
      <div className="wrap">
        {/* Head */}
        <div className="sec-head sec-head--center mb-16">
          <div>
            <span className="eyebrow eyebrow--dot">Home Valuation</span>
            <h2 className="h2 text-[#f4efe2] mt-4">
              What's Your Home <em className="it text-[#ffd9a0]">Worth</em>?
            </h2>
            <p className="lede text-[#f4efe2]/80 mt-3 mx-auto">
              Start with an instant range based on comparable South Florida price-per-foot, then get a considered valuation from Miguel.
            </p>
          </div>
        </div>

        {/* Valuation Form Card */}
        <form
          onSubmit={handleCalculate}
          className="max-w-4xl mx-auto border border-[rgba(244,239,226,0.12)] bg-[#141a1d]/60 backdrop-blur-md p-6 sm:p-12 shadow-2xl space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="field">
              <label htmlFor="vAddr">Property address</label>
              <input
                id="vAddr"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="1 Ocean Dr, Miami Beach"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="vType">Property type</label>
              <select
                id="vType"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="Single family">Single family</option>
                <option value="Condominium">Condominium</option>
                <option value="Townhome">Townhome</option>
                <option value="Waterfront estate">Waterfront estate</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="vArea">Market</label>
              <select
                id="vArea"
                value={marketArea}
                onChange={(e) => setMarketArea(e.target.value as 'miami' | 'ftl' | 'pb')}
              >
                <option value="miami">Miami / Miami Beach</option>
                <option value="ftl">Fort Lauderdale</option>
                <option value="pb">Palm Beach</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="vSqft">Square feet</label>
              <input
                id="vSqft"
                type="number"
                min="300"
                step="50"
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
                placeholder="3,500"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="vBeds">Bedrooms</label>
              <input
                id="vBeds"
                type="number"
                min="0"
                max="20"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                placeholder="4"
              />
            </div>

            <div className="field">
              <label htmlFor="vBaths">Bathrooms</label>
              <input
                id="vBaths"
                type="number"
                min="0"
                max="20"
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                placeholder="3"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="font-mono text-xs text-rose-400 bg-rose-950/40 p-3 border border-rose-800/50">
              {errorMsg}
            </p>
          )}

          <div>
            <button type="submit" className="btn btn--gold w-full justify-center">
              <Calculator className="w-4 h-4" />
              <span>Get my value range</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Result Output Card */}
          {valuationResult && (
            <div className="pt-8 border-t border-[rgba(244,239,226,0.12)] animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
                <div>
                  <span className="mono-label block text-[#c9a24a] mb-2">Indicative range</span>
                  <div className="num text-3xl sm:text-5xl text-[#ffd9a0] font-bold">
                    {valuationResult}
                  </div>
                  <p className="text-xs text-[#f4efe2]/50 mt-3 max-w-xl leading-relaxed">
                    An arithmetic estimate from sample price-per-foot benchmarks — not an appraisal, a CMA, or live market data. Miguel will send a documented valuation with real comparables.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenContact}
                  className="btn whitespace-nowrap"
                >
                  <span>Request documented valuation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
