import React, { useState } from 'react';
import { ArrowRight, TrendingUp, DollarSign, Calculator, ShieldCheck, PieChart, Layers, Building2, Anchor } from 'lucide-react';
import { money } from '../../data';

interface InvestViewProps {
  onOpenContact: (intent?: string, message?: string) => void;
  onNavigateToDevelopments: () => void;
}

export default function InvestView({ onOpenContact, onNavigateToDevelopments }: InvestViewProps) {
  const [purchasePrice, setPurchasePrice] = useState<number>(2500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(35);
  const [expectedRentMonthly, setExpectedRentMonthly] = useState<number>(14000);
  const [annualAppreciation, setAnnualAppreciation] = useState<number>(6.5);

  // Calculations
  const downPayment = (purchasePrice * downPaymentPercent) / 100;
  const loanAmount = purchasePrice - downPayment;
  const annualGrossRent = expectedRentMonthly * 12;
  const grossYield = ((annualGrossRent / purchasePrice) * 100).toFixed(2);
  const estimatedAppreciation5Yr = Math.round(purchasePrice * (Math.pow(1 + annualAppreciation / 100, 5) - 1));
  const estimated5YrPortfolioValue = purchasePrice + estimatedAppreciation5Yr;

  return (
    <div className="pt-24 pb-20 animate-fadeIn">
      {/* 1. Invest Hero */}
      <section className="relative py-16 sm:py-24 border-b border-[rgba(244,239,226,0.1)] bg-gradient-to-b from-[#0B0B0B] via-[#141a1d] to-[#0B0B0B]">
        <div className="wrap">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow--dot mb-3">Capital Advisory · South Florida Elevated</span>
            <h1 className="font-serif text-4xl sm:text-6xl text-[#f4efe2] font-normal leading-[1.08] tracking-tight">
              Real estate as an <em className="it text-[#ffd9a0]">Asset</em>.
            </h1>
            <p className="font-serif text-2xl sm:text-3xl text-[#c9a24a] italic mt-2">
              South Florida isn't simply a place to live. It's a market to understand.
            </p>
            <p className="text-base sm:text-lg text-[#f4efe2]/80 mt-6 font-light leading-relaxed">
              From pre-construction deposit arbitrage in Sunny Isles and Edgewater to irreplaceable deep-water dockage in Las Olas, we help family offices and private investors evaluate South Florida property with institutional financial discipline.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={() => onOpenContact('investor', 'I would like to explore South Florida investment opportunities with Miguel.')}
                className="btn btn--gold"
              >
                <span>Explore Investment Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#investment-calculator" className="btn">
                <span>Run Returns Model</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The 6-Step Investment Framework */}
      <section className="py-20 border-b border-[rgba(244,239,226,0.08)] bg-[#101618]">
        <div className="wrap">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="mono-label text-[#c9a24a]">Institutional Rigor</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe2] font-normal mt-2">
              The 6-Step Investment <em className="it text-[#ffd9a0]">Framework</em>
            </h2>
            <p className="text-sm sm:text-base text-[#f4efe2]/70 font-light mt-3">
              We eliminate emotional speculation by applying a rigorous quantitative funnel to every acquisition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
            {[
              { step: "01", name: "MARKET", desc: "Analyzing macro capital inflows, state tax migrations, and regional absorption velocity." },
              { step: "02", name: "LOCATION", desc: "Selecting zoning corridors, school districts, and micro-locations with protected view corridors." },
              { step: "03", name: "PROPERTY", desc: "Auditing architectural pedigree, HOA reserve funds (SB 4-D), and deferred capital expenditures." },
              { step: "04", name: "NUMBERS", desc: "Underwriting pro-forma cap rates, debt service coverage, and sensitivity analysis across cycles." },
              { step: "05", name: "STRATEGY", desc: "Structuring 1031 exchanges, pre-construction assignment rights, or luxury rental syndication." },
              { step: "06", name: "EXECUTION", desc: "Securing favorable contract milestones, off-market pricing, and institutional closing oversight." },
            ].map((f, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#141a1d] border border-[rgba(244,239,226,0.1)] hover:border-[#c9a24a] transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-[#c9a24a] font-bold block mb-2">{f.step}</span>
                  <h3 className="font-serif text-lg text-[#f4efe2]">{f.name}</h3>
                </div>
                <p className="text-xs text-[#f4efe2]/70 font-light mt-3 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Primary Investment Verticals */}
      <section className="py-20 border-b border-[rgba(244,239,226,0.08)] bg-[#0B0B0B]">
        <div className="wrap">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="mono-label">Asset Allocation</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe2] font-normal mt-2">
                Four Pillars of South Florida <em className="it text-[#ffd9a0]">Value</em>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#f4efe2]/60 font-mono mt-4 md:mt-0">
              Targeted strategies tailored to your liquidity and holding horizon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Building2,
                title: "Pre-Construction Deposit Arbitrage",
                desc: "Securing tier-one pricing in branded towers (Bentley, St. Regis, Villa Miami) with staggered 10-20% deposit schedules, capturing substantial capital appreciation prior to completion.",
                metric: "25% - 40% Projected ROI by Delivery",
                action: "Explore Developments"
              },
              {
                icon: Anchor,
                title: "Waterfront & Dockage Scarcity",
                desc: "Land in South Florida is finite; navigable deep water with no fixed bridges is even scarcer. Waterfront homes consistently outperform inland residential assets across every market cycle.",
                metric: "Historical +8.4% Annual Alpha",
                action: "View Waterfront Assets"
              },
              {
                icon: PieChart,
                title: "High-Yield Executive Condominium Portfolios",
                desc: "Targeting modern Brickell and Edgewater towers with flexible leasing guidelines to serve relocated Wall Street executives and tech professionals.",
                metric: "6.5% - 8.5% Gross Rental Yield",
                action: "Explore Condos"
              },
              {
                icon: TrendingUp,
                title: "Downtown Fort Lauderdale Growth Corridors",
                desc: "Capitalizing on the rapid transformation of the New River and Las Olas corridors, priced at a significant discount per square foot compared to equivalent Miami waterfront.",
                metric: "High Value-Add Upside",
                action: "Explore Broward Growth"
              }
            ].map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="p-8 bg-[#141a1d] border border-[rgba(244,239,226,0.1)] hover:border-[#c9a24a] transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3">
                    <Icon className="w-8 h-8 text-[#c9a24a]" />
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#f4efe2]">{v.title}</h3>
                    <p className="text-xs sm:text-sm text-[#f4efe2]/75 font-light leading-relaxed">{v.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-[rgba(244,239,226,0.08)] flex items-center justify-between">
                    <span className="font-mono text-xs text-[#ffd9a0] font-bold">{v.metric}</span>
                    <button
                      onClick={() => onOpenContact('investor', `Inquiry regarding ${v.title}`)}
                      className="text-xs font-mono text-[#c9a24a] hover:underline flex items-center gap-1"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Interactive Investment Calculator */}
      <section id="investment-calculator" className="py-20 border-b border-[rgba(244,239,226,0.08)] bg-[#101618]">
        <div className="wrap">
          <div className="max-w-4xl mx-auto bg-[#141a1d] border border-[rgba(201,162,74,0.4)] p-8 sm:p-12 shadow-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-5 h-5 text-[#c9a24a]" />
              <span className="mono-label text-[#c9a24a]">Yield & Appreciation Modeling</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#f4efe2] font-normal mb-8">
              South Florida Investment Return <em className="it text-[#ffd9a0]">Estimator</em>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: Input Controls */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="mono-label">Acquisition Price</label>
                    <span className="font-mono text-sm text-[#ffd9a0] font-bold">{money(purchasePrice)}</span>
                  </div>
                  <input
                    type="range"
                    min={500000}
                    max={15000000}
                    step={100000}
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="w-full accent-[#c9a24a] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="mono-label">Equity Down Payment (%)</label>
                    <span className="font-mono text-sm text-[#ffd9a0] font-bold">{downPaymentPercent}% ({money(downPayment)})</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={100}
                    step={5}
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-[#c9a24a] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="mono-label">Estimated Monthly Gross Rent</label>
                    <span className="font-mono text-sm text-[#ffd9a0] font-bold">{money(expectedRentMonthly)} / mo</span>
                  </div>
                  <input
                    type="range"
                    min={3000}
                    max={60000}
                    step={500}
                    value={expectedRentMonthly}
                    onChange={(e) => setExpectedRentMonthly(Number(e.target.value))}
                    className="w-full accent-[#c9a24a] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="mono-label">Forecasted Annual Appreciation</label>
                    <span className="font-mono text-sm text-[#ffd9a0] font-bold">{annualAppreciation}% / yr</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={12}
                    step={0.5}
                    value={annualAppreciation}
                    onChange={(e) => setAnnualAppreciation(Number(e.target.value))}
                    className="w-full accent-[#c9a24a] cursor-pointer"
                  />
                </div>
              </div>

              {/* Right: Output Summary Cards */}
              <div className="bg-[#0B0B0B] p-6 border border-[rgba(244,239,226,0.1)] flex flex-col justify-between space-y-6">
                <div>
                  <span className="mono-label text-[#c9a24a]">Projected 5-Year Return Profile</span>
                  <div className="mt-4 space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-[rgba(244,239,226,0.08)]">
                      <span className="text-xs text-[#f4efe2]/70">Gross Annual Rental Yield:</span>
                      <span className="font-mono text-lg text-[#ffd9a0] font-bold">{grossYield}%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[rgba(244,239,226,0.08)]">
                      <span className="text-xs text-[#f4efe2]/70">Annual Gross Income:</span>
                      <span className="font-mono text-base text-[#f4efe2]">{money(annualGrossRent)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[rgba(244,239,226,0.08)]">
                      <span className="text-xs text-[#f4efe2]/70">5-Year Equity Growth:</span>
                      <span className="font-mono text-base text-[#c9a24a] font-bold">+{money(estimatedAppreciation5Yr)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xs text-[#f4efe2]/70">Est. 5-Yr Asset Value:</span>
                      <span className="font-mono text-xl text-[#ffd9a0] font-bold">{money(estimated5YrPortfolioValue)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenContact('investor', `I ran the investment model for a ${money(purchasePrice)} property and would like an underwriting review.`)}
                  className="btn btn--gold w-full justify-center text-xs"
                >
                  <span>Build My Investment Strategy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Final Consultation CTA */}
      <section className="py-20 bg-[#0B0B0B]">
        <div className="wrap text-center max-w-3xl mx-auto space-y-6">
          <span className="mono-label text-[#c9a24a]">Direct Advisory</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#f4efe2] font-normal">
            Ready to deploy <em className="it text-[#ffd9a0]">Capital</em> into South Florida?
          </h2>
          <p className="text-sm sm:text-base text-[#f4efe2]/80 font-light leading-relaxed">
            Whether allocating into pre-construction towers, 1031 exchanges, or long-term waterfront generational assets, connect directly with Miguel for confidential underwriting.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => onOpenContact('investor', 'I am ready to consult on deploying capital into South Florida real estate.')}
              className="btn btn--gold px-10 py-4 text-sm"
            >
              <span>Explore Investment Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
