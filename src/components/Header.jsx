export default function Header({ m, dark, onToggleTheme, cargo, onCargo }) {
  return (
    <>
      <div aria-hidden="true" style={{ display: 'flex', height: 4 }}>
        <div style={{ flex: 3, background: '#009c3b' }} />
        <div style={{ flex: 1, background: '#ffdf00' }} />
        <div style={{ flex: 1, background: '#002776' }} />
      </div>
      <header style={{ position: 'relative', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="hdr-inner" style={{ maxWidth: 1360, margin: '0 auto', padding: '14px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 28px' }}>
          <div className="row" style={{ gap: 12 }}>
            <svg aria-hidden="true" width="38" height="38" viewBox="0 0 38 38">
              <rect width="38" height="38" rx="10" fill="#009c3b" />
              <path d="M19 6 L33 19 L19 32 L5 19 Z" fill="#ffdf00" />
              <circle cx="19" cy="19" r="7.2" fill="#002776" />
              <path d="M12.2 17.6 Q19 15.4 25.8 20" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <div className="col">
              <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.01em' }}>Eleições 2026</span>
              <span className="muted" style={{ fontSize: 12 }}>Apuração em tempo real</span>
            </div>
          </div>

          <nav aria-label="Cargo" className="scroll-x" style={{ display: 'flex', gap: 4, background: 'var(--surface2)', padding: 4, borderRadius: 10 }}>
            {['Presidente', 'Governador'].map((c) => {
              const on = c === cargo;
              return (
              <button key={c} type="button" className="btn nowrap" aria-pressed={on} onClick={() => onCargo(c)}
                style={{ fontSize: 14, fontWeight: on ? 600 : 500, borderRadius: 7, padding: '8px 14px', minHeight: 36,
                  background: on ? 'var(--surface)' : 'transparent', color: on ? 'var(--text)' : 'var(--muted)',
                  boxShadow: on ? '0 1px 2px rgba(0,0,0,.12)' : 'none' }}>
                {c}
              </button>
              );
            })}
          </nav>

          <div className="row muted" style={{ gap: 8, fontSize: 13 }}>
            <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: m.statusDot }} />
            <span>{m.statusText}</span>
          </div>

          <div className="row" style={{ marginLeft: 'auto', gap: 10 }}>
            <span className="theme-lbl" style={{ fontSize: 13, fontWeight: 600, color: dark ? 'var(--muted)' : 'var(--text)' }}>Claro</span>
            <button type="button" role="switch" aria-checked={dark} aria-label="Tema escuro" onClick={onToggleTheme}
              className="btn" style={{ position: 'relative', width: 56, height: 32, borderRadius: 999, border: '1px solid var(--border)', background: 'var(--surface2)', padding: 0 }}>
              <span aria-hidden="true" style={{ position: 'absolute', top: 3, left: 3, width: 24, height: 24, borderRadius: '50%', background: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translateX(${dark ? 24 : 0}px)`, transition: 'transform .2s ease' }}>
                {dark ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--surface)' }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--surface)' }} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
                )}
              </span>
            </button>
            <span className="theme-lbl" style={{ fontSize: 13, fontWeight: 600, color: dark ? 'var(--text)' : 'var(--muted)' }}>Escuro</span>
          </div>
        </div>
        {cargo === 'Presidente' && <div className="hdr-prog" role="progressbar" aria-label="Seções apuradas" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(m.nat.apNum)}><div style={{ width: m.nat.apW }} /></div>}
      </header>
    </>
  );
}
