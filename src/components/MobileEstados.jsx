export default function MobileEstados({ m, q, onQ, onPick }) {
  return (
    <>
      <label className="row" style={{ position: 'relative', gap: 8, border: '1px solid var(--border)', borderRadius: 14, padding: '0 14px', background: 'var(--surface)', minHeight: 48 }}>
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--muted)' }} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
        <span className="sr-only">Buscar estado</span>
        <input type="search" value={q} onChange={(e) => onQ(e.target.value)} placeholder="Buscar estado…"
          style={{ flex: 1, minWidth: 0, border: 0, background: 'transparent', font: 'inherit', fontSize: 15, color: 'var(--text)', outline: 'none' }} />
      </label>
      <div className="muted" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '0 4px' }}>
        <span>Por tamanho do eleitorado</span><span>vantagem 2º · 1º turno</span>
      </div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {m.rows.map((r, i) => {
          const delay = Math.min(i * 0.035, 0.6).toFixed(3) + 's';
          return (
            <button key={r.uf} type="button" className="btn uf-row-m" onClick={() => onPick(r.uf)} aria-label={r.aria}
              style={{ color: 'inherit', textAlign: 'left', borderTop: i === 0 ? 0 : '1px solid var(--border)', background: 'transparent', padding: '12px 14px', minHeight: 60,
                display: 'grid', gridTemplateColumns: '36px minmax(0, 1fr) auto 14px', alignItems: 'center', gap: 10, animation: 'rise .5s cubic-bezier(.2,.9,.3,1.15) both', animationDelay: delay }}>
              <span style={{ fontSize: 12, fontWeight: 800, textAlign: 'center', padding: '4px 0', borderRadius: 6, background: r.fill, color: r.ink }}>{r.uf}</span>
              <span className="col" style={{ gap: 6, minWidth: 0 }}>
                <span style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.n}</span>
                <span style={{ display: 'flex', height: 5, borderRadius: 3, overflow: 'hidden', gap: 2 }}>
                  <span className="fill" style={{ width: r.wA, background: 'var(--a)', animationDelay: delay }} />
                  <span className="fill fill-r" style={{ flex: 1, background: r.started ? 'var(--b)' : 'var(--track)', animationDelay: delay }} />
                </span>
              </span>
              <span className="col" style={{ alignItems: 'flex-end', gap: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: r.leadColor }}>{r.lead}</span>
                <span className="muted" style={{ fontSize: 11 }}>{r.sub}</span>
              </span>
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--muted)' }} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          );
        })}
      </div>
    </>
  );
}
