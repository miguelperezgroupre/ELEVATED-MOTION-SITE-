// @ts-nocheck
// Custom cursor (CLS-safe). Positioned only with transform: translate3d (no top/left), sized with scale() instead of
// width/height changes, isolated with will-change + contain, and fixed/out of flow. It is not rendered at all on touch or
// coarse pointers, or when the visitor prefers reduced motion. The native cursor is never hidden, so nothing depends on it.
import { useEffect, useRef, useState } from 'react';

const SEL = 'a, button, input, select, textarea, [data-cursor], [data-open], .card, .life-item, .dev-item, .pin button';
const LAYER = { position: 'fixed', left: 0, top: 0, pointerEvents: 'none', zIndex: 100, willChange: 'transform', contain: 'layout style', transform: 'translate3d(-200px,-200px,0)' };

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [type, setType] = useState('default');
  const [shown, setShown] = useState(false);
  const dot = useRef(null), ring = useRef(null);

  useEffect(() => {
    if (!window.matchMedia) return;
    const fine = window.matchMedia('(pointer: fine)'), calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(fine.matches && !calm.matches);
    sync();
    fine.addEventListener && fine.addEventListener('change', sync);
    calm.addEventListener && calm.addEventListener('change', sync);
    return () => { fine.removeEventListener && fine.removeEventListener('change', sync); calm.removeEventListener && calm.removeEventListener('change', sync); };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let mx = -200, my = -200, rx = -200, ry = -200, raf = 0;
    const tick = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = Math.abs(mx - rx) + Math.abs(my - ry) > 0.2 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px,${my}px,0)`;
      if (rx === -200) { rx = mx; ry = my; }
      setShown(true);
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const over = (e) => {
      const t = e.target && e.target.closest ? e.target.closest(SEL) : null;
      if (!t) return;
      const a = t.getAttribute('data-cursor');
      setType(a === 'view' || t.classList.contains('card') ? 'view' : a === 'explore' || t.closest('.life-stage, .dev-stage') ? 'explore' : 'sm');
    };
    const out = (e) => { const r = e.relatedTarget; if (!r || !r.closest || !r.closest(SEL)) setType('default'); };
    const leave = () => setShown(false);
    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      document.documentElement.removeEventListener('mouseleave', leave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  const big = type === 'view' || type === 'explore';
  // Ring is drawn at its largest size (80px) and scaled down: 0.4 = 32px, 0.55 = 44px, 1 = 80px.
  const ringScale = big ? 1 : type === 'sm' ? 0.55 : 0.4;
  const dotScale = big ? 0 : type === 'sm' ? 0.67 : 1;
  return (
    <>
      <div ref={dot} aria-hidden="true" style={{ ...LAYER, opacity: shown ? 1 : 0 }}>
        <div className="w-1.5 h-1.5 rounded-full bg-[#c9a24a] transition-[transform,opacity] duration-300" style={{ transform: `translate(-50%,-50%) scale(${dotScale})`, opacity: type === 'sm' ? 0.5 : 0.9 }} />
      </div>
      <div ref={ring} aria-hidden="true" style={{ ...LAYER, opacity: shown ? 1 : 0 }}>
        <div className={`w-20 h-20 rounded-full flex items-center justify-center border-[2.5px] transition-[transform,background-color,border-color] duration-300 ease-out ${big ? 'border-[#c9a24a] bg-[#c9a24a] text-[#0e1416] font-mono text-[10px] uppercase font-bold tracking-widest shadow-xl' : type === 'sm' ? 'border-[rgba(201,162,74,0.7)] bg-[rgba(201,162,74,0.06)]' : 'border-[rgba(201,162,74,0.4)] bg-transparent'}`} style={{ transform: `translate(-50%,-50%) scale(${ringScale})` }}>
          {type === 'view' && <span>View</span>}
          {type === 'explore' && <span>Explore</span>}
        </div>
      </div>
    </>
  );
}
