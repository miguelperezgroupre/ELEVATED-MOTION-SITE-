import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DEVELOPMENTS } from '../data';

interface NewDevelopmentsProps {
  onOpenContact: () => void;
}

export default function NewDevelopments({ onOpenContact }: NewDevelopmentsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = DEVELOPMENTS[activeIndex];

  return (
    <section id="developments" className="sec sec--parchment" aria-label="New developments">
      <div className="wrap">
        {/* Head */}
        <div className="sec-head">
          <div>
            <span className="eyebrow">New Developments</span>
            <h2 className="h2 text-[#1a1e24]">
              Rising <em className="it text-[#9a7629]">Icons</em>
            </h2>
          </div>
          <p className="lede text-[#4b5563]">
            The future of South Florida luxury — branded residences and landmark towers, tracked from reservation through closing.
          </p>
        </div>

        {/* Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Stage Image Display */}
          <div
            onClick={onOpenContact}
            data-cursor="explore"
            className="lg:col-span-7 relative h-[420px] sm:h-[540px] rounded-none overflow-hidden cursor-pointer border border-[#d1d5db] group shadow-lg"
          >
            {DEVELOPMENTS.map((dev, idx) => (
              <div
                key={dev.name}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${dev.grad} ${
                  idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={dev.img}
                  alt={dev.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>
            ))}

            {/* Stage Status Badge */}
            <div className="absolute top-6 left-6 z-20">
              <span className="card-badge bg-[#0e1416] text-[#ffd9a0] border-[#c9a24a]">
                {current.status}
              </span>
            </div>

            {/* Stage Bottom Caption */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-10 text-white">
              <div className="font-mono text-xs text-[#deb65b] uppercase tracking-wider mb-1">
                {current.loc}
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-4 leading-tight">
                {current.name}
              </h3>
              <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-white/80 pt-4 border-t border-white/20">
                <span>Developer: <strong className="text-white font-medium">{current.dev}</strong></span>
                <span>Delivery: <strong className="text-white font-medium">{current.year}</strong></span>
                <b className="text-lg text-[#deb65b] font-semibold">{current.from}</b>
              </div>
            </div>
          </div>

          {/* Interactive List */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-3">
            {DEVELOPMENTS.map((dev, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={dev.name}
                  type="button"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  onClick={onOpenContact}
                  className={`w-full text-left p-5 sm:p-6 transition-all duration-300 border flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#9a7629] shadow-md'
                      : 'bg-white/60 border-[#e5e7eb] hover:bg-white hover:border-[#9a7629]/50'
                  }`}
                >
                  <div>
                    <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#1a1e24] group-hover:text-[#9a7629] transition-colors">
                      {dev.name}
                    </h4>
                    <p className="font-mono text-xs text-[#6b7280] mt-1">
                      {dev.loc} · {dev.from}
                    </p>
                  </div>

                  <ArrowUpRight
                    className={`w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      isSelected ? 'text-[#9a7629]' : 'text-[#9ca3af]'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
