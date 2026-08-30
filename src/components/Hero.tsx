import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, ChevronDown, Compass, Home, TrendingUp, Key, Building2, Phone, Sparkles, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { NavView } from './Navigation';

interface HeroProps {
  onOpenContact: (intent?: string, message?: string) => void;
  onNavigate?: (view: NavView) => void;
}

export default function Hero({ onOpenContact, onNavigate }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activePhase, setActivePhase] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Continuous smooth scroll calculation via requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    
    // Cache the viewport height to avoid glitches when mobile URL bars show/hide
    let cachedViewportHeight = window.innerHeight;
    let cachedViewportWidth = window.innerWidth;

    const updateScrollProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableHeight = rect.height - cachedViewportHeight;
      
      if (totalScrollableHeight <= 0) {
        setProgress(0);
        return;
      }

      // Calculate how far we've scrolled inside the container
      const currentScroll = -rect.top;
      const rawProgress = Math.min(Math.max(currentScroll / totalScrollableHeight, 0), 1);
      
      setProgress(rawProgress);

      // Determine active phase based on normalized progress
      if (rawProgress < 0.22) setActivePhase(1);
      else if (rawProgress < 0.44) setActivePhase(2);
      else if (rawProgress < 0.68) setActivePhase(3);
      else if (rawProgress < 0.88) setActivePhase(4);
      else setActivePhase(5);
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateScrollProgress);
    };

    const handleResize = () => {
      // Only recalculate height if width changes significantly (e.g., orientation change)
      // This prevents the "URL bar collapsing" jitter on mobile
      if (Math.abs(window.innerWidth - cachedViewportWidth) > 50) {
        cachedViewportWidth = window.innerWidth;
        cachedViewportHeight = window.innerHeight;
      }
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Jump smoothly to a specific phase
  const scrollToPhase = useCallback((targetPhase: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    
    // Target fractions for each phase
    const targets: Record<number, number> = {
      1: 0.0,
      2: 0.28,
      3: 0.54,
      4: 0.76,
      5: 0.96,
    };

    const targetOffset = containerTop + (targets[targetPhase] ?? 0) * totalHeight;
    window.scrollTo({
      top: targetOffset,
      behavior: 'smooth'
    });
  }, []);

  // Interpolation helper
  const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);
  const mapRange = (val: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    if (val <= inMin) return outMin;
    if (val >= inMax) return outMax;
    return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
  };

  // Phase Transforms & Opacities
  // Phase 1 (0.00 -> 0.22)
  const phase1Opacity = reducedMotion ? (progress < 0.22 ? 1 : 0) : clamp(mapRange(progress, 0.0, 0.18, 1, 0), 0, 1);
  const phase1Y = reducedMotion ? 0 : mapRange(progress, 0.0, 0.22, 0, -60);
  const phase1Scale = reducedMotion ? 1 : mapRange(progress, 0.0, 0.22, 1.0, 1.08);

  // Phase 2 (0.22 -> 0.44): The City Transforms
  const phase2Opacity = reducedMotion 
    ? (progress >= 0.22 && progress < 0.44 ? 1 : 0)
    : clamp(
        progress < 0.32
          ? mapRange(progress, 0.18, 0.28, 0, 1)
          : mapRange(progress, 0.38, 0.46, 1, 0),
        0,
        1
      );
  const phase2Y = reducedMotion ? 0 : mapRange(progress, 0.20, 0.44, 40, -40);
  const phase2Scale = reducedMotion ? 1 : mapRange(progress, 0.20, 0.44, 1.04, 1.18);

  // Phase 3 (0.44 -> 0.68): Typographic Statements
  const phase3ContainerOpacity = reducedMotion
    ? (progress >= 0.44 && progress < 0.68 ? 1 : 0)
    : clamp(
        progress < 0.54
          ? mapRange(progress, 0.40, 0.48, 0, 1)
          : mapRange(progress, 0.64, 0.70, 1, 0),
        0,
        1
      );

  // Phase 3 statement 1: REAL ESTATE (0.44 -> 0.52)
  const stmt1Opacity = clamp(
    progress < 0.48
      ? mapRange(progress, 0.42, 0.47, 0, 1)
      : mapRange(progress, 0.49, 0.53, 1, 0),
    0,
    1
  );
  const stmt1Scale = mapRange(progress, 0.42, 0.53, 0.94, 1.04);

  // Phase 3 statement 2: STRATEGY (0.51 -> 0.59)
  const stmt2Opacity = clamp(
    progress < 0.55
      ? mapRange(progress, 0.50, 0.54, 0, 1)
      : mapRange(progress, 0.57, 0.61, 1, 0),
    0,
    1
  );
  const stmt2Scale = mapRange(progress, 0.50, 0.61, 0.94, 1.04);

  // Phase 3 statement 3: LOCAL INTELLIGENCE (0.58 -> 0.67)
  const stmt3Opacity = clamp(
    progress < 0.63
      ? mapRange(progress, 0.58, 0.62, 0, 1)
      : mapRange(progress, 0.65, 0.69, 1, 0),
    0,
    1
  );
  const stmt3Scale = mapRange(progress, 0.58, 0.69, 0.94, 1.04);

  // Phase 4 (0.66 -> 0.88): Miguel Perez
  const phase4Opacity = reducedMotion
    ? (progress >= 0.68 && progress < 0.88 ? 1 : 0)
    : clamp(
        progress < 0.78
          ? mapRange(progress, 0.66, 0.74, 0, 1)
          : mapRange(progress, 0.84, 0.90, 1, 0),
        0,
        1
      );
  const phase4Y = reducedMotion ? 0 : mapRange(progress, 0.66, 0.88, 50, -30);
  const phase4Scale = reducedMotion ? 1 : mapRange(progress, 0.66, 0.88, 0.96, 1.03);

  // Phase 5 (0.86 -> 1.00): Transition to Pathways / Website
  const phase5Opacity = reducedMotion
    ? (progress >= 0.88 ? 1 : 0)
    : clamp(mapRange(progress, 0.86, 0.94, 0, 1), 0, 1);
  const phase5Y = reducedMotion ? 0 : mapRange(progress, 0.86, 1.0, 40, 0);

  // Camera continuous zoom and pan for underlying cinematic canvas
  const cameraScale = reducedMotion ? 1 : mapRange(progress, 0, 1, 1.0, 1.35);
  const cameraTranslateY = reducedMotion ? 0 : mapRange(progress, 0, 1, 0, -80);

  return (
    <div
      id="hero-experience"
      ref={containerRef}
      className="relative w-full bg-[#0B0B0B]"
      style={{ height: '480vh' }}
    >
      {/* Sticky Fullscreen Cinematic Viewport (100vh) */}
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden flex flex-col justify-between select-none">
        
        {/* Layer 1: Continuous Camera Cinematic Canvas (Aerial to Architecture to Waterfront) */}
        <div
          className="absolute inset-0 z-0 origin-center will-change-transform pointer-events-none"
          style={{
            transform: `scale(${cameraScale.toFixed(4)}) translateY(${cameraTranslateY.toFixed(2)}px)`
          }}
        >
          {/* Visual Layer A: Deep Atmospheric Gradient & Sky Mesh */}
          <div className="absolute inset-0 bg-[#0B0B0B]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#081014] via-[#132730]/60 to-[#0B0B0B]" />
            <div
              className="absolute inset-0 opacity-40 mix-blend-screen"
              style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,162,74,0.25), transparent 70%)'
              }}
            />
          </div>

          {/* Visual Layer B: High-Definition Panoramic Aerial Imagery */}
          <img
            src="https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=2400&q=85"
            alt="South Florida Coastal Aerial Perspective"
            className="absolute inset-0 w-full h-full object-cover object-center  mix-blend-screen"
            style={{
              opacity: clamp(mapRange(progress, 0.0, 0.45, 0.75, 0.15), 0, 0.75)
            }}
          />

          {/* Visual Layer C: Modern Architecture & Luxury Waterfront Residence */}
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85"
            alt="Modern South Florida Luxury Architecture"
            className="absolute inset-0 w-full h-full object-cover object-center  mix-blend-luminosity"
            style={{
              opacity: clamp(mapRange(progress, 0.25, 0.75, 0, 0.55), 0, 0.55)
            }}
          />

          {/* Layer D: Atmospheric Cinematic Haze, Vignette & Depth Gradients */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#0B0B0B]/50 to-[#0B0B0B]/95 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/80 via-transparent to-[#0B0B0B] pointer-events-none" />
          <div className="absolute inset-0 bg-[#1F6970]/10 mix-blend-color pointer-events-none" />
        </div>

        {/* Phase Indicator / Scrubber HUD (Right Margin) */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-3 font-mono text-[10px] tracking-widest text-[#f4efe2]/40">
          {[
            { phase: 1, label: '01 / AERIAL' },
            { phase: 2, label: '02 / CITY' },
            { phase: 3, label: '03 / STATEMENT' },
            { phase: 4, label: '04 / ADVISOR' },
            { phase: 5, label: '05 / PATHWAYS' },
          ].map((item) => (
            <button
              key={item.phase}
              onClick={() => scrollToPhase(item.phase)}
              className={`group flex items-center gap-3 transition-all duration-300 cursor-pointer bg-transparent border-none p-1 ${
                activePhase === item.phase
                  ? 'text-[#c9a24a] font-bold'
                  : 'hover:text-[#f4efe2]'
              }`}
              aria-label={`Jump to ${item.label}`}
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                {item.label}
              </span>
              <span
                className={`w-2 h-2 rounded-full border transition-all ${
                  activePhase === item.phase
                    ? 'bg-[#c9a24a] border-[#c9a24a] scale-125'
                    : 'border-[#f4efe2]/30 bg-transparent group-hover:border-[#c9a24a]'
                }`}
              />
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* PHASE 1: SOUTH FLORIDA AERIAL & HERO OPENING (0.00 -> 0.22)               */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full pointer-events-none will-change-transform"
          style={{
            opacity: phase1Opacity,
            transform: `translateY(${phase1Y}px) scale(${phase1Scale})`,
            visibility: phase1Opacity <= 0.01 ? 'hidden' : 'visible',
            pointerEvents: phase1Opacity > 0.4 ? 'auto' : 'none'
          }}
        >
          {/* Top Editorial Label */}
          <div className="flex items-center gap-3 animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-[#c9a24a] animate-pulse" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-[#ffd9a0] font-semibold">
              MIAMI • FORT LAUDERDALE • SOUTH FLORIDA
            </span>
          </div>

          {/* Center Main Display Typography */}
          <div className="max-w-4xl space-y-6">
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#f4efe2] font-normal leading-[0.98] tracking-tight">
              South Florida,{' '}
              <em className="it text-[#ffd9a0] block sm:inline">
                Understood Differently
              </em>.
            </h1>

            <p className="font-sans text-base sm:text-xl md:text-2xl text-[#f4efe2]/85 font-light max-w-2xl leading-relaxed">
              Where market expertise meets elevated representation across Miami, Fort Lauderdale, and Palm Beach.
            </p>

            {/* Editorial CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => scrollToPhase(2)}
                className="btn btn--gold cursor-pointer inline-flex items-center gap-2"
                id="hero-explore-btn"
              >
                <span>EXPLORE SOUTH FLORIDA</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenContact('general', "Let's connect to discuss my South Florida real estate objectives.")}
                className="btn btn--sm cursor-pointer inline-flex items-center gap-2 border border-[#f4efe2]/20 hover:border-[#ffd9a0]"
                id="hero-talk-btn"
              >
                <span>LET'S TALK</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Telemetry & Scroll Indicator */}
          <div className="flex items-end justify-between border-t border-[rgba(244,239,226,0.12)] pt-6">
            <div className="hidden sm:flex items-center gap-8 font-mono text-[11px] text-[#f4efe2]/60 uppercase tracking-widest">
              <div>
                <span className="text-[#c9a24a] block font-bold">25.7617° N</span>
                <span>LATITUDE</span>
              </div>
              <div>
                <span className="text-[#c9a24a] block font-bold">80.1918° W</span>
                <span>LONGITUDE</span>
              </div>
              <div>
                <span className="text-[#c9a24a] block font-bold">EST. 2026</span>
                <span>DATA VERIFIED</span>
              </div>
            </div>

            {/* Scroll Indicator with Dynamic Extending Line */}
            <div
              onClick={() => scrollToPhase(2)}
              className="flex items-center gap-3 cursor-pointer group ml-auto"
            >
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#f4efe2]/80 group-hover:text-[#ffd9a0] transition-colors">
                SCROLL TO EXPLORE
              </span>
              <div className="relative w-5 h-10 border border-[#f4efe2]/30 rounded-full flex justify-center p-1 group-hover:border-[#c9a24a] transition-colors">
                <div
                  className="w-1 bg-[#c9a24a] rounded-full will-change-transform"
                  style={{
                    height: `${Math.max(6, Math.min(24, progress * 100))}px`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHASE 2: THE CITY TRANSFORMS (0.22 -> 0.44)                               */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center px-6 sm:px-12 md:px-20 max-w-6xl mx-auto w-full pointer-events-none will-change-transform"
          style={{
            opacity: phase2Opacity,
            transform: `translateY(${phase2Y}px) scale(${phase2Scale})`,
            visibility: phase2Opacity <= 0.01 ? 'hidden' : 'visible',
            pointerEvents: phase2Opacity > 0.4 ? 'auto' : 'none'
          }}
        >
          <div className="text-center space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-[#1F6970] bg-[#141a1d]/80 px-4 py-1.5 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-[#ffd9a0]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ffd9a0]">
                GEOGRAPHIC CONVERGENCE · ARCHITECTURAL SCALE
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#f4efe2] font-normal leading-[1.08]">
              The City <em className="it text-[#ffd9a0]">Transforms</em>.
            </h2>

            <p className="font-sans text-base sm:text-xl text-[#f4efe2]/85 font-light leading-relaxed max-w-2xl mx-auto">
              From Biscayne Bay deep-water dockage to skyline penthouses, South Florida real estate is defined by micro-climates, structural reserves, and architectural heritage.
            </p>

            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={() => scrollToPhase(3)}
                className="btn btn--sm border border-[#c9a24a] text-[#ffd9a0] cursor-pointer inline-flex items-center gap-2"
              >
                <span>CONTINUE SEQUENCE</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHASE 3: TYPOGRAPHIC STATEMENTS (0.44 -> 0.68)                            */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center px-6 sm:px-12 w-full pointer-events-none will-change-transform"
          style={{
            opacity: phase3ContainerOpacity,
            visibility: phase3ContainerOpacity <= 0.01 ? 'hidden' : 'visible'
          }}
        >
          <div className="relative w-full max-w-5xl text-center">
            
            {/* Phrase 1: REAL ESTATE */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
              style={{
                opacity: stmt1Opacity,
                transform: `scale(${stmt1Scale}) translateY(${stmt1Opacity > 0 ? 0 : 20}px)`,
                visibility: stmt1Opacity <= 0.01 ? 'hidden' : 'visible'
              }}
            >
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#c9a24a] mb-4">
                PILLAR 01
              </span>
              <h2 className="font-serif text-6xl sm:text-8xl md:text-9xl text-[#f4efe2] font-normal tracking-tight leading-none">
                REAL <em className="it text-[#ffd9a0]">ESTATE</em>.
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#f4efe2]/70 font-light mt-6 max-w-md">
                More than square footage — tangible waterfront capital and generational wealth.
              </p>
            </div>

            {/* Phrase 2: STRATEGY */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
              style={{
                opacity: stmt2Opacity,
                transform: `scale(${stmt2Scale}) translateY(${stmt2Opacity > 0 ? 0 : 20}px)`,
                visibility: stmt2Opacity <= 0.01 ? 'hidden' : 'visible'
              }}
            >
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#c9a24a] mb-4">
                PILLAR 02
              </span>
              <h2 className="font-serif text-6xl sm:text-8xl md:text-9xl text-[#f4efe2] font-normal tracking-tight leading-none">
                <em className="it text-[#ffd9a0]">STRATEGY</em>.
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#f4efe2]/70 font-light mt-6 max-w-md">
                Disciplined negotiation, contract defense, and institutional valuation modeling.
              </p>
            </div>

            {/* Phrase 3: LOCAL INTELLIGENCE */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
              style={{
                opacity: stmt3Opacity,
                transform: `scale(${stmt3Scale}) translateY(${stmt3Opacity > 0 ? 0 : 20}px)`,
                visibility: stmt3Opacity <= 0.01 ? 'hidden' : 'visible'
              }}
            >
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#c9a24a] mb-4">
                PILLAR 03
              </span>
              <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl text-[#f4efe2] font-normal tracking-tight leading-none">
                LOCAL <em className="it text-[#ffd9a0]">INTELLIGENCE</em>.
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#f4efe2]/70 font-light mt-6 max-w-md">
                Deep ground-truth insight into municipal codes, bridge clearances, and micro-markets.
              </p>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHASE 4: MIGUEL PEREZ (0.66 -> 0.88)                                      */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center px-6 sm:px-12 md:px-20 max-w-6xl mx-auto w-full pointer-events-none will-change-transform"
          style={{
            opacity: phase4Opacity,
            transform: `translateY(${phase4Y}px) scale(${phase4Scale})`,
            visibility: phase4Opacity <= 0.01 ? 'hidden' : 'visible',
            pointerEvents: phase4Opacity > 0.4 ? 'auto' : 'none'
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center bg-[#141a1d]/90 border border-[#c9a24a]/40 p-6 sm:p-10 md:p-12 shadow-2xl backdrop-blur-md">
            
            {/* Advisor Portrait Image */}
            <div className="lg:col-span-5 relative group">
              <div className="relative aspect-[4/5] overflow-hidden border border-[#c9a24a]/30 shadow-2xl">
                <img
                  src={localStorage.getItem('mp_custom_headshot') || "https://6a9240c9923dbf1a1a861ed6.imgix.net/sandbox/MP%20NEW%20HEADHSOT.png"}
                  alt="Miguel Perez - South Florida Real Estate Advisor"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
                />
                {/* Upload / Replace Headshot Overlay button for seamless local file loading */}
                <label className="absolute top-3 right-3 z-30 bg-[#0B0B0B]/80 hover:bg-[#c9a24a] hover:text-[#0B0B0B] text-[#ffd9a0] border border-[#c9a24a]/50 px-2.5 py-1 text-[10px] font-mono tracking-wider cursor-pointer transition-all duration-200 backdrop-blur-sm flex items-center gap-1.5 opacity-0 group-hover:opacity-100 shadow-lg">
                  <span>UPDATE PHOTO</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const result = event.target?.result as string;
                          if (result) {
                            localStorage.setItem('mp_custom_headshot', result);
                            window.dispatchEvent(new Event('storage'));
                            // Trigger re-render
                            const imgs = document.querySelectorAll('img[alt*="Miguel Perez"]');
                            imgs.forEach((img) => {
                              (img as HTMLImageElement).src = result;
                            });
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#ffd9a0]">
                  <span>FL LIC #SL3515849</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#c9a24a]" /> VERIFIED ADVISOR
                  </span>
                </div>
              </div>
            </div>

            {/* Advisor Narrative & Credentials */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-mono text-xs text-[#c9a24a] uppercase tracking-[0.2em] font-semibold block mb-2">
                  THE FIDUCIARY ADVOCATE
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#f4efe2] font-normal leading-tight">
                  Miguel <em className="it text-[#ffd9a0]">Perez</em>
                </h2>
                <p className="font-mono text-sm sm:text-base text-[#c9a24a] uppercase tracking-wider mt-1">
                  SOUTH FLORIDA REAL ESTATE ADVISOR
                </p>
              </div>

              <blockquote className="font-serif text-xl sm:text-2xl text-[#f4efe2] italic font-light border-l-2 border-[#c9a24a] pl-4 leading-relaxed">
                "Local perspective. Strategic guidance. A higher standard of representation."
              </blockquote>

              <p className="font-sans text-sm sm:text-base text-[#f4efe2]/80 font-light leading-relaxed">
                Serving buyers, sellers, and capital allocators across Miami-Dade, Broward, and Palm Beach with transparent underwriting and white-glove discretion.
              </p>

              {/* Designations badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['ABR® (Buyer Representative)', 'SRS (Seller Specialist)', 'PSA (Pricing Strategy)', 'SFR® (Resource)'].map((badge) => (
                  <span
                    key={badge}
                    className="font-mono text-[10px] sm:text-[11px] px-2.5 py-1 bg-[#0B0B0B] border border-[rgba(244,239,226,0.15)] text-[#f4efe2]/90"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => onOpenContact('advisor', "I'd like to schedule a private advisory consultation with Miguel Perez.")}
                  className="btn btn--gold cursor-pointer inline-flex items-center gap-2"
                >
                  <span>CONNECT WITH MIGUEL</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:+17864601023"
                  className="font-mono text-xs sm:text-sm text-[#ffd9a0] hover:text-[#c9a24a] flex items-center gap-2 p-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c9a24a]" />
                  <span>(786) 460-1023</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHASE 5: THE TRANSITION TO THE WEBSITE / WHERE ARE YOU HEADED? (0.86-1.00)*/}
        {/* ========================================================================= */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full pointer-events-none will-change-transform"
          style={{
            opacity: phase5Opacity,
            transform: `translateY(${phase5Y}px)`,
            visibility: phase5Opacity <= 0.01 ? 'hidden' : 'visible',
            pointerEvents: phase5Opacity > 0.4 ? 'auto' : 'none'
          }}
        >
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span className="font-mono text-xs tracking-[0.25em] text-[#c9a24a] uppercase font-semibold">
              START YOUR JOURNEY
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#f4efe2] font-normal mt-2 leading-tight">
              Where Are You <em className="it text-[#ffd9a0]">Headed</em>?
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#f4efe2]/80 font-light mt-3 max-w-xl mx-auto">
              Select your strategic objective below to access tailored market intelligence, off-market inventory, and institutional valuation tools.
            </p>
          </div>

          {/* 5 Pathways Staggered Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {[
              {
                id: 'buy' as const,
                title: 'BUY',
                icon: Home,
                desc: 'Acquisition advisory & curated off-market homes',
                intent: 'buyer'
              },
              {
                id: 'sell' as const,
                title: 'SELL',
                icon: TrendingUp,
                desc: 'Cinematic positioning & maximum value capture',
                intent: 'seller'
              },
              {
                id: 'invest' as const,
                title: 'INVEST',
                icon: Key,
                desc: 'Yield modeling & 1031 tax exchange execution',
                intent: 'investor'
              },
              {
                id: 'relocate' as const,
                title: 'RELOCATE',
                icon: Compass,
                desc: 'Lifestyle mapping & Florida domicile structuring',
                intent: 'relocation'
              },
              {
                id: 'developments' as const,
                title: 'PRE-CONSTRUCTION',
                icon: Building2,
                desc: 'Branded skyline towers & early-tier pricing',
                intent: 'development'
              },
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate(p.id);
                    }
                  }}
                  className="group bg-[#141a1d] hover:bg-[#1f272b] border border-[rgba(244,239,226,0.12)] hover:border-[#c9a24a] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1"
                >
                  <div>
                    <div className="w-10 h-10 rounded border border-[#c9a24a]/40 bg-[#0B0B0B] flex items-center justify-center text-[#ffd9a0] group-hover:bg-[#c9a24a] group-hover:text-[#0B0B0B] transition-colors mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe2] group-hover:text-[#ffd9a0] transition-colors">
                      {p.title}
                    </h3>
                    <p className="font-sans text-xs text-[#f4efe2]/70 font-light mt-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between text-xs font-mono text-[#c9a24a] group-hover:text-[#ffd9a0]">
                    <span>EXPLORE PATH</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
