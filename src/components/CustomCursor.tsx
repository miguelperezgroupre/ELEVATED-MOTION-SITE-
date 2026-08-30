import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'sm' | 'view' | 'explore'>('default');
  const [isPointer, setIsPointer] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsPointer(false);
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPos({ x: e.clientX, y: e.clientY });
    };

    let animationFrameId: number;
    const updateRing = () => {
      currentX += (mouseX - currentX) * 0.16;
      currentY += (mouseY - currentY) * 0.16;
      setRingPos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updateRing);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(updateRing);

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'a, button, input, select, textarea, [data-cursor], [data-open], .card, .life-item, .dev-item, .pin button'
      );
      if (!target) return;

      const cursorAttr = target.getAttribute('data-cursor');
      if (cursorAttr === 'view' || target.classList.contains('card')) {
        setCursorType('view');
      } else if (cursorAttr === 'explore' || target.closest('.life-stage, .dev-stage')) {
        setCursorType('explore');
      } else if (cursorAttr === 'sm') {
        setCursorType('sm');
      } else {
        setCursorType('sm');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement;
      if (
        !related ||
        !related.closest(
          'a, button, input, select, textarea, [data-cursor], [data-open], .card, .life-item, .dev-item, .pin button'
        )
      ) {
        setCursorType('default');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (!isPointer) return null;

  return (
    <>
      {/* Center dot */}
      <div
        className={`fixed pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 ${
          cursorType === 'default'
            ? 'w-1.5 h-1.5 bg-[#c9a24a] opacity-90'
            : cursorType === 'sm'
            ? 'w-1 h-1 bg-[#c9a24a] opacity-50'
            : 'w-0 h-0 opacity-0'
        }`}
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
        aria-hidden="true"
      />

      {/* Ring / interactive bubble */}
      <div
        className={`fixed pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 ease-out border ${
          cursorType === 'default'
            ? 'w-8 h-8 border-[rgba(201,162,74,0.4)] bg-transparent'
            : cursorType === 'sm'
            ? 'w-11 h-11 border-[rgba(201,162,74,0.7)] bg-[rgba(201,162,74,0.06)]'
            : 'w-20 h-20 border-[#c9a24a] bg-[#c9a24a] text-[#0e1416] font-mono text-[10px] uppercase font-bold tracking-widest shadow-xl scale-100'
        }`}
        style={{ left: `${ringPos.x}px`, top: `${ringPos.y}px` }}
        aria-hidden="true"
      >
        {cursorType === 'view' && <span>View</span>}
        {cursorType === 'explore' && <span>Explore</span>}
      </div>
    </>
  );
}
