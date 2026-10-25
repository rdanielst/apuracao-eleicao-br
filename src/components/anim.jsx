import { useEffect, useRef, useState } from 'react';

const reduz = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Número que "conta" até o valor (easing quártico, 1,1 s), partindo do que já estava na tela.
function useTween(v, dur = 1100) {
  const [x, setX] = useState(reduz() ? v : 0);
  const de = useRef(reduz() ? v : 0);
  useEffect(() => {
    if (reduz()) { setX(v); de.current = v; return undefined; }
    const f = de.current;
    const t0 = performance.now();
    let raf;
    const passo = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const cur = f + (v - f) * (1 - Math.pow(1 - p, 4));
      de.current = cur;
      setX(cur);
      if (p < 1) raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [v, dur]);
  return x;
}

// <Count v={51.2} fmt={pct} />: anima 0 → v na montagem e dá um "pulo" verde quando o valor muda depois.
export function Count({ v, fmt }) {
  const x = useTween(v);
  const [n, setN] = useState(0);
  const antes = useRef(v);
  useEffect(() => {
    if (antes.current !== v) { antes.current = v; setN((k) => k + 1); }
  }, [v]);
  return <span key={n} className={n ? 'bump' : undefined}>{fmt(x)}</span>;
}

const CORES = ['#009c3b', '#ffdf00', '#002776', '#ffffff', '#c62828', '#16a34a', '#ffd000'];
const CONFETE = (() => {
  let seed = 7;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  return Array.from({ length: 46 }, (_, i) => ({
    x: (rnd() * 100).toFixed(1) + '%', c: CORES[i % CORES.length], d: (rnd() * 0.9).toFixed(2) + 's',
    cls: ['f1', 'f2', 'f3'][i % 3], w: (6 + rnd() * 6).toFixed(0) + 'px', r: rnd() > 0.6 ? '50%' : '2px'
  }));
})();

export function Confetti() {
  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 5 }}>
      {CONFETE.map((c, i) => (
        <span key={i} className={'cf ' + c.cls} style={{ left: c.x, background: c.c, animationDelay: c.d, width: c.w, borderRadius: c.r }} />
      ))}
    </div>
  );
}
