const TABS = [
  ['resumo', 'Resumo', 'M4 20V10M10 20V4M16 20v-7M22 20H2'],
  ['mapa', 'Mapa', 'M9 4L3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5L9 4zM9 4v13.5M15 6.5V20'],
  ['estados', 'Estados', 'M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01']
];

export default function BottomNav({ aba, onAba }) {
  const idx = Math.max(0, TABS.findIndex((t) => t[0] === aba));
  return (
    <nav aria-label="Navegação principal" className="bottom-nav">
      <div aria-hidden="true" className="pill-on" style={{ transform: `translateX(calc(${idx} * (100% + 6px)))` }} />
      {TABS.map(([id, label, d]) => {
        const on = id === aba;
        return (
          <button key={id} type="button" className="btn press" aria-current={on ? 'page' : undefined} onClick={() => onAba(id)}
            style={{ position: 'relative', borderRadius: 14, minHeight: 52, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
              background: 'transparent', color: on ? 'var(--tabOnInk)' : 'var(--muted)', transition: 'color .3s ease' }}>
            <span key={on ? 'on' : 'off'} className={on ? 'pop' : undefined} style={{ display: 'flex' }}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
            </span>
            <span style={{ fontSize: 12, fontWeight: on ? 700 : 500 }}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
