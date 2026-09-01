import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { STORIES } from '../data';

export default function ClientStories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + STORIES.length) % STORIES.length);
  };

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % STORIES.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextStory();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const current = STORIES[currentIndex];

  return (
    <section id="stories" className="sec sec--parchment" aria-label="Client stories">
      <div className="wrap">
        {/* Head */}
        <div className="sec-head sec-head--center mb-16">
          <div>
            <span className="eyebrow text-[16px]">Client Stories</span>
            <h2 className="h2 text-[72px] text-[#1a1e24] mt-4">In Their <em className="it text-[#9a7629]">Words</em></h2>
          </div>
        </div>

        {/* Testimonial Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-[#e5e7eb] shadow-xl overflow-hidden items-stretch">
          {/* Left Media Stage */}
          <div className="lg:col-span-5 relative h-72 lg:h-auto min-h-[320px] overflow-hidden">
            {STORIES.map((story, idx) => (
              <div
                key={story.who}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${story.grad} ${
                  idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={story.img}
                  alt={story.who}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            ))}
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 p-8 sm:p-14 flex flex-col justify-between">
            <div>
              <span className="font-serif text-6xl sm:text-7xl text-[#9a7629] leading-none block select-none mb-2">
                &ldquo;
              </span>

              <blockquote className="font-serif text-2xl sm:text-3xl text-[#1a1e24] font-normal leading-snug min-h-[120px]">
                {current.quote}
              </blockquote>

              <div className="w-16 h-0.5 bg-[#9a7629] my-8" />

              <div>
                <cite className="not-italic font-sans text-base sm:text-lg font-semibold text-[#1a1e24] block">
                  {current.who}
                </cite>
                <span className="mono-label text-[#6b7280] block mt-1">
                  {current.where}
                </span>
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-[#e5e7eb] mt-8">
              <div className="font-mono text-sm font-semibold text-[#1a1e24]">
                <span className="text-[#9a7629]">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="text-[#9ca3af] mx-1.5">/</span>
                <span className="text-[#6b7280]">{String(STORIES.length).padStart(2, '0')}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevStory}
                  aria-label="Previous story"
                  className="w-11 h-11 border border-[#d1d5db] hover:border-[#9a7629] hover:bg-[#9a7629]/10 text-[#1a1e24] flex items-center justify-center transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextStory}
                  aria-label="Next story"
                  className="w-11 h-11 border border-[#d1d5db] hover:border-[#9a7629] hover:bg-[#9a7629]/10 text-[#1a1e24] flex items-center justify-center transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
