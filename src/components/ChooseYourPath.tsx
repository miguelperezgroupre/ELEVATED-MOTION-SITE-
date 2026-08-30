import React from 'react';
import { ArrowRight, Compass, TrendingUp, Building2, Home, Key, Sparkles, Waves } from 'lucide-react';

interface ChooseYourPathProps {
  onNavigate: (view: 'buy' | 'sell' | 'relocate' | 'invest' | 'developments' | 'neighborhoods' | 'insights' | 'about') => void;
  onOpenContact: (intent?: string, message?: string) => void;
}

export default function ChooseYourPath({ onNavigate, onOpenContact }: ChooseYourPathProps) {
  const paths = [
    {
      id: 'buy' as const,
      icon: Home,
      eyebrow: 'Buyer Advisory',
      title: 'Find Your Next Property',
      desc: 'Not just a property. The right property. Access off-market inventory, dockage audits, and strategic fiduciary negotiation.',
      cta: 'Explore Buying Strategy',
      intent: 'buyer',
      bgImg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sell' as const,
      icon: TrendingUp,
      eyebrow: 'Seller Representation',
      title: 'Maximize Your Property Value',
      desc: 'Don\'t simply list your home. Position it with cinematic production, targeted New York / CA syndication, and contract defense.',
      cta: 'Get Property Strategy',
      intent: 'seller',
      bgImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'relocate' as const,
      icon: Compass,
      eyebrow: 'Relocation Intelligence',
      title: 'Moving to South Florida?',
      desc: 'Start with the neighborhood, not the house. Interactive lifestyle matching, school districts, and Florida tax domicile guidance.',
      cta: 'Plan My Move',
      intent: 'relocation',
      bgImg: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'invest' as const,
      icon: Key,
      eyebrow: 'Capital Advisory',
      title: 'Real Estate as an Asset',
      desc: 'Institutional underwriting, rental yield analysis, 1031 exchange guidance, and pre-construction deposit arbitrage.',
      cta: 'Explore Investment Framework',
      intent: 'investor',
      bgImg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'developments' as const,
      icon: Building2,
      eyebrow: 'Pre-Construction',
      title: 'South Florida Developments',
      desc: 'Explore the iconic towers reshaping the skyline. Tier-one early pricing, floor plans, and deposit schedule audits.',
      cta: 'View New Developments',
      intent: 'development',
      bgImg: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="py-20 border-b border-[rgba(244,239,226,0.08)] bg-[#101618]">
      <div className="wrap">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="mono-label text-[#c9a24a]">Strategic Starting Points</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe2] font-normal mt-2">
            Choose Your Advisory <em className="it text-[#ffd9a0]">Path</em>
          </h2>
          <p className="text-sm sm:text-base text-[#f4efe2]/70 font-light mt-3">
            Every real estate objective requires a distinct strategy. Select your focus to access tailored intelligence and advisory tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                onClick={() => {
                  onNavigate(p.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`group relative bg-[#141a1d] border border-[rgba(244,239,226,0.1)] hover:border-[#c9a24a] transition-all duration-300 cursor-pointer overflow-hidden p-8 flex flex-col justify-between ${
                  idx === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                {/* Background image tint on hover */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                  style={{ backgroundImage: `url(${p.bgImg})` }}
                />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#c9a24a] uppercase tracking-wider">
                      {p.eyebrow}
                    </span>
                    <Icon className="w-5 h-5 text-[#c9a24a]" />
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#f4efe2] group-hover:text-[#ffd9a0] transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#f4efe2]/75 font-light leading-relaxed max-w-xl">
                    {p.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-6 mt-4 border-t border-[rgba(244,239,226,0.08)] flex items-center justify-between">
                  <span className="font-mono text-xs text-[#ffd9a0] group-hover:text-[#c9a24a] transition-colors flex items-center gap-1.5">
                    {p.cta}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#0B0B0B] border border-[rgba(244,239,226,0.2)] group-hover:border-[#c9a24a] group-hover:bg-[#c9a24a] flex items-center justify-center transition-all">
                    <ArrowRight className="w-3.5 h-3.5 text-[#f4efe2] group-hover:text-[#0B0B0B] transition-colors" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
