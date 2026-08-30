import React from 'react';
import { ArrowRight, ShieldCheck, Award, MapPin, Compass, CheckCircle2, Phone, Mail } from 'lucide-react';

interface AboutViewProps {
  onOpenContact: (intent?: string, message?: string) => void;
}

export default function AboutView({ onOpenContact }: AboutViewProps) {
  return (
    <div className="pt-24 pb-20 animate-fadeIn">
      {/* 1. About Hero */}
      <section className="relative py-16 sm:py-24 border-b border-[rgba(244,239,226,0.1)] bg-gradient-to-b from-[#0B0B0B] via-[#141a1d] to-[#0B0B0B]">
        <div className="wrap">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow--dot mb-3">The Trusted Advisor · South Florida Elevated</span>
            <h1 className="font-serif text-4xl sm:text-6xl text-[#f4efe2] font-normal leading-[1.08] tracking-tight">
              More than a <em className="it text-[#ffd9a0]">Realtor</em>.
            </h1>
            <p className="font-serif text-2xl sm:text-3xl text-[#c9a24a] italic mt-2">
              Your South Florida Advisor.
            </p>
            <p className="text-base sm:text-lg text-[#f4efe2]/80 mt-6 font-light leading-relaxed">
              "I've watched South Florida transform from a seasonal vacation haven into one of the world's most dynamic capital markets. Now I help people make smarter, more confident decisions within it."
            </p>
          </div>
        </div>
      </section>

      {/* 2. Miguel's Story & Background */}
      <section className="py-20 border-b border-[rgba(244,239,226,0.08)] bg-[#101618]">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Authentic Portrait Stage */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] border border-[rgba(201,162,74,0.4)] overflow-hidden shadow-2xl relative">
                <img
                  src={localStorage.getItem('mp_custom_headshot') || "https://6a9240c9923dbf1a1a861ed6.imgix.net/sandbox/MP%20NEW%20HEADHSOT.png"}
                  alt="Miguel Perez - South Florida Real Estate Advisor"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-4 bg-[#141a1d] border border-[rgba(244,239,226,0.1)] mt-4">
                <span className="font-serif text-xl text-[#f4efe2] block">Miguel Perez</span>
                <span className="mono-label text-[#c9a24a] text-[10px]">South Florida Real Estate Advisor</span>
                <div className="text-[10px] font-mono text-[#f4efe2]/50 mt-1">
                  ABR® · SRS · PSA · SFR® · FL License #SL3515849
                </div>
              </div>
            </div>

            {/* Right: The Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <span className="mono-label text-[#c9a24a]">The Perspective</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe2] font-normal leading-tight">
                Miami shaped my <em className="it text-[#ffd9a0]">Perspective</em>.
              </h2>
              <p className="text-sm sm:text-base text-[#f4efe2]/85 font-light leading-relaxed">
                Growing up in South Florida, I didn't learn real estate from a textbook or a weekend seminar. I watched Brickell rise into a global financial powerhouse, witnessed the canal neighborhoods of Fort Lauderdale evolve into yachting epicenters, and tracked how infrastructure decisions alter neighborhood values for decades.
              </p>
              <p className="text-sm sm:text-base text-[#f4efe2]/85 font-light leading-relaxed">
                When clients work with me, they don't get sales pitches or generic MLS printouts. They get candid, unvarnished advice. If a view corridor is at risk of being blocked by a future tower, I tell them. If an HOA reserve fund is undercapitalized, we walk away. If a waterfront home is overpriced for its bridge clearance, we negotiate accordingly.
              </p>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-[#141a1d] border border-[rgba(244,239,226,0.1)]">
                  <span className="font-serif text-lg text-[#ffd9a0] block">Local Native Authority</span>
                  <p className="text-xs text-[#f4efe2]/75 font-light mt-1">
                    Firsthand knowledge of canal depths, micro-neighborhoods, and historical cycle trends.
                  </p>
                </div>
                <div className="p-4 bg-[#141a1d] border border-[rgba(244,239,226,0.1)]">
                  <span className="font-serif text-lg text-[#ffd9a0] block">Institutional Advisory</span>
                  <p className="text-xs text-[#f4efe2]/75 font-light mt-1">
                    Rigorous financial underwriting, HOA auditing, and contract negotiation protecting client capital.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => onOpenContact('general', 'I would like to schedule a private advisory consultation with Miguel.')}
                  className="btn btn--gold"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a href="tel:+17864601023" className="btn">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Miguel (786) 460-1023</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Credentials & Affiliations */}
      <section className="py-16 border-b border-[rgba(244,239,226,0.08)] bg-[#0B0B0B]">
        <div className="wrap">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="mono-label text-[#c9a24a]">Certifications & Industry Designations</span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f4efe2] mt-1">
              Qualified at the <em className="it text-[#ffd9a0]">Highest</em> Level
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { code: "ABR®", title: "Accredited Buyer's Representative", desc: "Specialized fiduciary negotiation training for high-value acquisitions." },
              { code: "SRS", title: "Seller Representative Specialist", desc: "Advanced marketing, positioning, and contract defense for sellers." },
              { code: "PSA", title: "Pricing Strategy Advisor", desc: "Micro-market valuation, comparative market analysis, and appraisal compliance." },
              { code: "SFR®", title: "Short Sales & Foreclosure Resource", desc: "Distressed asset, bank negotiations, and specialized workouts." },
            ].map((c, i) => (
              <div key={i} className="p-5 bg-[#141a1d] border border-[rgba(244,239,226,0.1)] text-center">
                <span className="font-mono text-base text-[#c9a24a] font-bold block mb-1">{c.code}</span>
                <span className="font-serif text-sm text-[#f4efe2] block font-medium">{c.title}</span>
                <p className="text-[11px] text-[#f4efe2]/60 font-light mt-2">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
