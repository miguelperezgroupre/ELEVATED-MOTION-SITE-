// Home "About Miguel" section. Rebuilt from the deployed bundle (Oct 2026) because the original source file could not
// be retrieved; markup and classes match the deployed component. Oct 8 2026: tenure claims corrected (in real estate
// since 2021).
import { Award, TrendingUp, Users } from 'lucide-react';

const TIMELINE_DOT = (
  <div className="w-px h-12 bg-[#c9a24a]/30 relative flex-shrink-0">
    <div className="w-2 h-2 rounded-full bg-[#c9a24a] absolute -left-[3px] top-1.5" />
  </div>
);
const YEAR = 'font-mono text-sm text-[#c9a24a] font-bold w-12 flex-shrink-0 pt-0.5';
const BODY = 'text-xs sm:text-sm text-[#f4efe2]/75 leading-relaxed';

export default function AboutSection() {
  return (
    <section id="about" className="sec sec--dark" aria-label="About Miguel Perez">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full bg-[#1b2024] border border-[rgba(201,162,74,0.3)] overflow-hidden shadow-2xl">
              <img loading="lazy" decoding="async" src="/assets/miguel-perez-headshot.jpg" alt="Miguel Perez - South Florida Real Estate Advisor" referrerPolicy="no-referrer" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1416]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-4 border border-[rgba(201,162,74,0.25)] pointer-events-none" />
            </div>
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#141a1d] border border-[#c9a24a] p-4 sm:p-5 shadow-2xl">
              <div className="mono-label text-[10px] text-[#c9a24a] mb-1">Zillow · Client rating</div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-[#ffd9a0] flex items-center gap-2">
                <span>5.0</span>
                <span className="text-[#c9a24a] text-lg">★</span>
                <span className="font-mono text-xs font-normal text-[#f4efe2]/50 tracking-wider">/ 6 reviews</span>
              </div>
              <a href="https://www.zillow.com/profile/miguelperezflorida" target="_blank" rel="noopener noreferrer" className="mt-3 block">
                <img loading="lazy" decoding="async" src="/assets/brand/zillow-5star-premier.png" alt="Zillow 5-Star Premier Agent" className="h-10 object-contain" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-10">
            <div>
              <span className="eyebrow text-[16px]">About Miguel</span>
              <h2 className="h2 text-[72px] text-[#f4efe2] mt-3">
                The Key to the <em className="it text-[#ffd9a0]">Coast.</em>
              </h2>
              <p className="lede text-[#f4efe2]/85 mt-6 text-[19px] leading-relaxed">
                Miguel Perez advises buyers, sellers, and relocating professionals across Miami-Dade, Broward, and Palm Beach — with a practice built on waterfront, branded residences, and pre-construction. In South Florida real estate since 2021 and based at Luxe Properties, he holds the ABR®, SRS, PSA, and SFR® designations, and is recognized as a Zillow 5-Star Premier Agent with 19 total sales and a 5.0★ client rating. He works a deliberately small book so every transaction gets the same level of care: research before the first showing, representation through closing, and a relationship well after it.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[rgba(244,239,226,0.1)]">
              <div className="space-y-1">
                <Award className="w-5 h-5 text-[#c9a24a] mb-2" />
                <b className="block font-mono text-sm sm:text-base text-[#ffd9a0] font-semibold">SL3515849</b>
                <span className="mono-label block text-[10px]">Florida license</span>
              </div>
              <div className="space-y-1">
                <img loading="lazy" decoding="async" src="/assets/brand/luxe-properties-logo.png" alt="Luxe Properties" className="h-6 mb-2 object-contain" />
                <b className="block text-sm sm:text-base text-[#f4efe2] font-medium">Luxe Properties</b>
                <span className="mono-label block text-[10px]">Brokerage</span>
              </div>
              <div className="space-y-1">
                <TrendingUp className="w-5 h-5 text-[#c9a24a] mb-2" />
                <b className="block font-mono text-sm sm:text-base text-[#ffd9a0] font-semibold">Since 2021</b>
                <span className="mono-label block text-[10px]">In South Florida real estate</span>
              </div>
              <div className="space-y-1">
                <Users className="w-5 h-5 text-[#c9a24a] mb-2" />
                <b className="block font-mono text-xs sm:text-sm text-[#f4efe2]">ABR® · SRS</b>
                <span className="mono-label block text-[10px]">PSA · SFR®</span>
              </div>
            </div>

            <div className="space-y-6 pt-2">
              <div className="flex gap-6 items-start">
                <div className={YEAR}>Sept<br />2021</div>
                {TIMELINE_DOT}
                <p className={BODY}>Passed the real estate course and state exam on the <strong className="text-[#f4efe2]">first attempt</strong>. Licensed in Florida (SL3515849).</p>
              </div>
              <div className="flex gap-6 items-start">
                <div className={YEAR}>2022</div>
                {TIMELINE_DOT}
                <p className={BODY}>First year in the business — sold <strong className="text-[#f4efe2]">3 pre-construction condos</strong> at The Crosby in Miami World Center to my investors. Earned the <strong className="text-[#ffd9a0]">Rising Star Achievement Award</strong>.</p>
              </div>
              <div className="flex gap-6 items-start">
                <div className={YEAR}>2023</div>
                {TIMELINE_DOT}
                <p className={BODY}>Ready to expand skills and expertise with an elevated brokerage — <strong className="text-[#f4efe2]">joined Luxe Properties</strong>.</p>
              </div>
              <div className="flex gap-6 items-start">
                <div className={YEAR}>2024</div>
                {TIMELINE_DOT}
                <p className={BODY}>Helped <strong className="text-[#f4efe2]">30+ families</strong> achieve their real estate goals across South Florida.</p>
              </div>
              <div className="flex gap-6 items-start">
                <div className={YEAR}>2026</div>
                {TIMELINE_DOT}
                <p className={BODY}>Created <strong className="text-[#ffd9a0]">South Florida Elevated</strong> — a platform empowering realtors and clients with elevated resources, market intelligence, and premium representation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
