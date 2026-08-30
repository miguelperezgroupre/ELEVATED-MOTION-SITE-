import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, Sparkles, Shield, Camera, Users, Award, DollarSign } from 'lucide-react';
import { CASE_STUDIES } from '../../data';
import HomeValuation from '../HomeValuation';

interface SellViewProps {
  onOpenContact: (intent?: string, message?: string) => void;
}

export default function SellView({ onOpenContact }: SellViewProps) {
  const [selectedCase, setSelectedCase] = useState<number>(0);

  return (
    <div className="pt-24 pb-20 animate-fadeIn">
      {/* 1. Seller Hero */}
      <section className="relative py-16 sm:py-24 border-b border-[rgba(244,239,226,0.1)] bg-gradient-to-b from-[#0B0B0B] via-[#141a1d] to-[#0B0B0B]">
        <div className="wrap">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow--dot mb-3">Seller Representation · South Florida Elevated</span>
            <h1 className="font-serif text-4xl sm:text-6xl text-[#f4efe2] font-normal leading-[1.08] tracking-tight">
              Sell with <em className="it text-[#ffd9a0]">Strategy</em>.
            </h1>
            <p className="font-serif text-2xl sm:text-3xl text-[#c9a24a] italic mt-2">
              Don't simply list your property. Position it to maximize the opportunity.
            </p>
            <p className="text-base sm:text-lg text-[#f4efe2]/80 mt-6 font-light leading-relaxed">
              In South Florida's high-stakes luxury market, a listing is not a marketing strategy. Maximizing what you walk away with requires precision pricing, bespoke architectural production, targeted buyer syndication in New York and California, and relentless negotiation.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={() => onOpenContact('seller', 'I would like to request a custom Property Strategy for selling my home.')}
                className="btn btn--gold"
              >
                <span>Get My Property Strategy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#valuation-engine" className="btn">
                <span>Instant Valuation Model</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Problem with Generic Selling */}
      <section className="py-20 border-b border-[rgba(244,239,226,0.08)] bg-[#101618]">
        <div className="wrap">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="mono-label">The Advisory Difference</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe2] font-normal mt-2">
              Selling isn't just <em className="it text-[#ffd9a0]">Listing</em>.
            </h2>
            <p className="text-sm sm:text-base text-[#f4efe2]/70 font-light mt-4 leading-relaxed">
              Generic agents take standard photos and post to the MLS, waiting for buyers to appear. Miguel engineers an active campaign designed to create urgency and competition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                num: "01",
                title: "Pricing",
                desc: "Micro-level analysis of active absorption rates, square footage premiums, and seasonal buyer cycles."
              },
              {
                num: "02",
                title: "Positioning",
                desc: "Defining the unique narrative that separates your residence from every competing listing on the market."
              },
              {
                num: "03",
                title: "Presentation",
                desc: "Cinematic architectural cinematography, twilight drone captures, and editorial staging."
              },
              {
                num: "04",
                title: "Exposure",
                desc: "Direct private network syndication to high-net-worth buyers in New York, Chicago, LA, and Europe."
              },
              {
                num: "05",
                title: "Negotiation",
                desc: "Strategic contract defense preserving non-contingent cash terms, appraisal waivers, and record prices."
              }
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#141a1d] border border-[rgba(244,239,226,0.1)] hover:border-[#c9a24a] transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-[#c9a24a] font-bold block mb-3">{pillar.num}</span>
                  <h3 className="font-serif text-xl text-[#f4efe2]">{pillar.title}</h3>
                </div>
                <p className="text-xs text-[#f4efe2]/70 font-light mt-4 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The 5-Step Process */}
      <section className="py-20 border-b border-[rgba(244,239,226,0.08)] bg-[#0B0B0B]">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="eyebrow eyebrow--dot">The Advisory Framework</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe2] font-normal leading-tight">
                The 5-step roadmap to record <em className="it text-[#ffd9a0]">Outcomes</em>.
              </h2>
              <p className="text-sm sm:text-base text-[#f4efe2]/75 font-light leading-relaxed">
                From the first private walkthrough to the final wire transfer at closing, every step is executed with institutional rigor.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => onOpenContact('seller', 'I would like to discuss the 5-step selling process for my property.')}
                  className="btn btn--gold"
                >
                  <span>Request a Strategy Session</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  step: "01 — DISCOVER",
                  title: "Auditing Value & Strategic Objectives",
                  body: "We examine property condition, permitted improvements, recent comps, and evaluate what minor enhancements will yield maximum return on investment."
                },
                {
                  step: "02 — POSITION",
                  title: "Architectural Narrative & Media Production",
                  body: "Custom video production, curated twilight shoots, dedicated property websites, and luxury copywriting that showcases your home's design pedigree."
                },
                {
                  step: "03 — LAUNCH",
                  title: "Targeted Multi-Channel Rollout",
                  body: "Synchronized launch across exclusive broker networks, digital campaigns targeting relocated executives, and private VIP previews."
                },
                {
                  step: "04 — NEGOTIATE",
                  title: "Leverage Creation & Terms Protection",
                  body: "Managing competing buyer interest to secure favorable inspection periods, flexible closing timelines, and maximum bottom-line proceeds."
                },
                {
                  step: "05 — CLOSE",
                  title: "Frictionless Escrow & Transition",
                  body: "Seamless coordination with title attorneys, appraisers, and municipal departments to ensure zero closing delays."
                }
              ].map((stepItem, i) => (
                <div key={i} className="p-6 bg-[#141a1d] border border-[rgba(244,239,226,0.1)] flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#c9a24a]/20 border border-[#c9a24a] flex items-center justify-center text-xs font-mono text-[#ffd9a0] shrink-0 mt-1">
                    {i + 1}
                  </div>
                  <div>
                    <span className="font-mono text-xs text-[#c9a24a] tracking-wider uppercase block">{stepItem.step}</span>
                    <h3 className="font-serif text-xl text-[#f4efe2] mt-1">{stepItem.title}</h3>
                    <p className="text-xs sm:text-sm text-[#f4efe2]/75 font-light mt-2 leading-relaxed">{stepItem.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Results & Case Studies */}
      <section className="py-20 border-b border-[rgba(244,239,226,0.08)] bg-[#101618]">
        <div className="wrap">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="mono-label">Proven Track Record</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe2] font-normal mt-2">
                Recent Sales & Strategic <em className="it text-[#ffd9a0]">Outcomes</em>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#f4efe2]/60 font-mono mt-4 md:mt-0">
              Real results delivered through deliberate execution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CASE_STUDIES.map((cs, idx) => (
              <div
                key={cs.id}
                className="bg-[#141a1d] border border-[rgba(244,239,226,0.1)] overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={cs.img}
                    alt={cs.address}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B0B0B]/85 px-3 py-1 font-mono text-[10px] text-[#ffd9a0] border border-[rgba(244,239,226,0.2)]">
                    {cs.neighborhood}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#0B0B0B]/90 px-3 py-1 font-mono text-sm text-[#ffd9a0] font-bold border border-[#c9a24a]">
                    Sold for {cs.finalSalePrice}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-[#f4efe2]">{cs.address}</h3>
                    <div className="font-mono text-xs text-[#c9a24a] mt-1">{cs.propertyType}</div>

                    <div className="grid grid-cols-2 gap-2 my-4 py-3 border-y border-[rgba(244,239,226,0.08)] text-center text-xs font-mono">
                      <div>
                        <span className="text-[#f4efe2]/50 block text-[10px]">Initial Target</span>
                        <span className="text-[#f4efe2] font-bold">{cs.originalExpectation}</span>
                      </div>
                      <div>
                        <span className="text-[#f4efe2]/50 block text-[10px]">Days On Market</span>
                        <span className="text-[#c9a24a] font-bold">{cs.daysOnMarket} Days</span>
                      </div>
                    </div>

                    <div className="text-xs text-[#f4efe2]/80 space-y-2 font-light">
                      <div>
                        <b className="font-mono text-[#ffd9a0] uppercase text-[10px] block">Strategy:</b>
                        {cs.strategyUsed}
                      </div>
                      <div>
                        <b className="font-mono text-[#ffd9a0] uppercase text-[10px] block mt-2">Outcome:</b>
                        {cs.outcome}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[rgba(244,239,226,0.08)]">
                    <button
                      onClick={() => onOpenContact('seller', `Inquiry regarding sales strategy similar to ${cs.address}`)}
                      className="text-xs font-mono text-[#c9a24a] hover:underline flex items-center gap-1.5"
                    >
                      <span>Discuss a similar strategy for your property</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Embedded Valuation Engine */}
      <div id="valuation-engine">
        <HomeValuation onOpenContact={() => onOpenContact('seller', 'I ran the online valuation and would like a comprehensive comparative market analysis.')} />
      </div>

      {/* 6. Final Seller Conversion Point */}
      <section className="py-20 bg-[#0B0B0B] border-t border-[rgba(244,239,226,0.1)]">
        <div className="wrap text-center max-w-3xl mx-auto space-y-6">
          <span className="mono-label text-[#c9a24a]">Take the Next Step</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#f4efe2] font-normal">
            What could your property <em className="it text-[#ffd9a0]">Achieve</em>?
          </h2>
          <p className="text-sm sm:text-base text-[#f4efe2]/80 font-light leading-relaxed">
            Schedule a confidential property review. Miguel will walk through your residence, evaluate micro-market conditions, and provide a clear, evidence-based roadmap to achieve top dollar.
          </p>
          <div className="pt-4 flex justify-center">
            <button
              onClick={() => onOpenContact('seller', 'I would like to request a confidential Property Strategy review with Miguel.')}
              className="btn btn--gold px-10 py-4 text-sm"
            >
              <span>Request a Property Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
