import { Award, Building2, TrendingUp, Users } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="sec sec--dark" aria-label="About Miguel Perez">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Portrait Frame & Rating Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full bg-[#1b2024] border border-[rgba(201,162,74,0.3)] overflow-hidden shadow-2xl">
              <img
                src={localStorage.getItem('mp_custom_headshot') || "https://6a9240c9923dbf1a1a861ed6.imgix.net/sandbox/MP%20NEW%20HEADHSOT.png"}
                alt="Miguel Perez - South Florida Real Estate Advisor"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1416]/80 via-transparent to-transparent pointer-events-none" />
              {/* Decorative inner hairline border */}
              <div className="absolute inset-4 border border-[rgba(201,162,74,0.25)] pointer-events-none" />
            </div>

            {/* Client rating badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#141a1d] border border-[#c9a24a] p-4 sm:p-5 shadow-2xl">
              <div className="mono-label text-[10px] text-[#c9a24a] mb-1">Client rating</div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-[#ffd9a0] flex items-center gap-2">
                <span>4.9</span>
                <span className="text-[#c9a24a] text-lg">★</span>
                <span className="font-mono text-xs font-normal text-[#f4efe2]/50 tracking-wider">
                  / 19 reviews
                </span>
              </div>
            </div>
          </div>

          {/* Right: Biography, Credentials & Timeline */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <span className="eyebrow text-[16px]">About Miguel</span>
              <h2 className="h2 text-[72px] text-[#f4efe2] mt-3">
                The Key to the <em className="it text-[#ffd9a0]">Coast.</em>
              </h2>
              <p className="lede text-[#f4efe2]/85 mt-6 text-[19px] leading-relaxed">
                Miguel Perez advises buyers, sellers, and relocating professionals across Miami-Dade, Broward, and Palm Beach — with a practice built on waterfront, branded residences, and pre-construction. Licensed in Florida since 2012 and based at Luxe Properties, he holds the ABR®, SRS, PSA, and SFR® designations, and works a deliberately small book so every transaction gets the same white-glove standard: research before the first showing, representation through closing, and a relationship well after it.
              </p>
            </div>

            {/* 4 Credentials Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[rgba(244,239,226,0.1)]">
              <div className="space-y-1">
                <Award className="w-5 h-5 text-[#c9a24a] mb-2" />
                <b className="block font-mono text-sm sm:text-base text-[#ffd9a0] font-semibold">SL3515849</b>
                <span className="mono-label block text-[10px]">Florida license</span>
              </div>

              <div className="space-y-1">
                <Building2 className="w-5 h-5 text-[#c9a24a] mb-2" />
                <b className="block text-sm sm:text-base text-[#f4efe2] font-medium">Luxe Properties</b>
                <span className="mono-label block text-[10px]">Brokerage</span>
              </div>

              <div className="space-y-1">
                <TrendingUp className="w-5 h-5 text-[#c9a24a] mb-2" />
                <b className="block font-mono text-sm sm:text-base text-[#ffd9a0] font-semibold">14 yrs</b>
                <span className="mono-label block text-[10px]">Advising since 2012</span>
              </div>

              <div className="space-y-1">
                <Users className="w-5 h-5 text-[#c9a24a] mb-2" />
                <b className="block font-mono text-xs sm:text-sm text-[#f4efe2]">ABR® · SRS</b>
                <span className="mono-label block text-[10px]">PSA · SFR®</span>
              </div>
            </div>

            {/* Career Timeline */}
            <div className="space-y-6 pt-2">
              <div className="flex gap-6 items-start">
                <div className="font-mono text-sm text-[#c9a24a] font-bold w-12 flex-shrink-0 pt-0.5">
                  2012
                </div>
                <div className="w-px h-12 bg-[#c9a24a]/30 relative flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#c9a24a] absolute -left-[3px] top-1.5" />
                </div>
                <p className="text-xs sm:text-sm text-[#f4efe2]/75 leading-relaxed">
                  Licensed in Florida (SL3515849) and begins working waterfront and new-construction inventory across Miami-Dade.
                </p>
              </div>

              <div className="flex gap-6 items-start">
                <div className="font-mono text-sm text-[#c9a24a] font-bold w-12 flex-shrink-0 pt-0.5">
                  2022
                </div>
                <div className="w-px h-12 bg-[#c9a24a]/30 relative flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#c9a24a] absolute -left-[3px] top-1.5" />
                </div>
                <p className="text-xs sm:text-sm text-[#f4efe2]/75 leading-relaxed">
                  Earns the ABR® and SRS designations; joins Luxe Properties in Coral Gables, expanding coverage to Aventura and Sunny Isles.
                </p>
              </div>

              <div className="flex gap-6 items-start">
                <div className="font-mono text-sm text-[#c9a24a] font-bold w-12 flex-shrink-0 pt-0.5">
                  2023
                </div>
                <div className="w-px h-12 bg-[#c9a24a]/30 relative flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#c9a24a] absolute -left-[3px] top-1.5" />
                </div>
                <p className="text-xs sm:text-sm text-[#f4efe2]/75 leading-relaxed">
                  Recognized as a rising advisor for foreign buyers and relocating professionals across South Florida.
                </p>
              </div>

              <div className="flex gap-6 items-start">
                <div className="font-mono text-sm text-[#c9a24a] font-bold w-12 flex-shrink-0 pt-0.5">
                  2026
                </div>
                <div className="w-px h-12 bg-[#c9a24a]/30 relative flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#c9a24a] absolute -left-[3px] top-1.5" />
                </div>
                <p className="text-xs sm:text-sm text-[#f4efe2]/75 leading-relaxed">
                  Launches South Florida Elevated — a research-first practice pairing market intelligence with private-brokerage representation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
