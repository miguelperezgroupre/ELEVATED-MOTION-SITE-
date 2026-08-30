import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LIFESTYLE } from '../data';

interface LifestyleCollectionsProps {
  onOpenContact: () => void;
}

export default function LifestyleCollections({ onOpenContact }: LifestyleCollectionsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = LIFESTYLE[activeIndex];

  return (
    <section id="lifestyle" className="sec sec--dark" aria-label="Lifestyle collections">
      <div className="wrap">
        {/* Head */}
        <div className="sec-head sec-head--center mb-16">
          <div>
            <span className="eyebrow eyebrow--dot">Lifestyle Collections</span>
            <h2 className="h2 text-[#f4efe2] mt-4">
              Live By <em className="it text-[#ffd9a0]">Design</em>
            </h2>
          </div>
        </div>

        {/* Stage + Interactive List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Stage Container with Image Crossfade */}
          <div
            onClick={onOpenContact}
            data-cursor="explore"
            className="lg:col-span-7 relative h-[420px] sm:h-[540px] rounded-none overflow-hidden cursor-pointer border border-[rgba(244,239,226,0.12)] group"
          >
            {LIFESTYLE.map((item, idx) => (
              <div
                key={item.name}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${item.grad} ${
                  idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1416] via-[#0e1416]/40 to-transparent" />
              </div>
            ))}

            {/* Stage Floating Caption */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-10 flex items-end justify-between gap-6">
              <div>
                <div className="mono-label text-[#c9a24a] mb-2 font-mono text-xs">
                  {current.count} listings
                </div>
                <h3 className="font-serif text-2xl sm:text-4xl text-[#f4efe2] font-normal mb-2 leading-tight">
                  {current.name}
                </h3>
                <p className="text-sm sm:text-base text-[#f4efe2]/80 max-w-md font-light leading-relaxed">
                  {current.desc}
                </p>
              </div>

              <button
                type="button"
                aria-label="Explore this collection"
                className="w-12 h-12 rounded-full bg-[#c9a24a] text-[#0e1416] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[#deb65b] transition-all shadow-lg"
              >
                <ArrowUpRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right Interactive Selection List */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-2">
            {LIFESTYLE.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.name}
                  type="button"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  onClick={onOpenContact}
                  className={`w-full text-left p-5 sm:p-6 transition-all duration-300 border flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-[rgba(201,162,74,0.1)] border-[#c9a24a] text-[#f4efe2]'
                      : 'bg-transparent border-[rgba(244,239,226,0.06)] hover:border-[rgba(201,162,74,0.4)] text-[#f4efe2]/70 hover:text-[#f4efe2]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#c9a24a]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-light group-hover:text-[#c9a24a] transition-colors">
                      {item.name}
                    </h4>
                  </div>

                  <span className="font-mono text-xs text-[#f4efe2]/50 tracking-wider">
                    {item.count} items
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
