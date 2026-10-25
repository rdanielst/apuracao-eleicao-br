export default function StateList({ m, q, onQ, onPick }) {
  return (
    <section className="card card-flush col" style={{ flex: 1, padding: '18px 0 8px', gap: 10, minHeight: 0 }}>
      <div className="col" style={{ padding: '0 18px', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <h2 className="h2" style={{ fontSize: 16 }}>Todos os estados</h2>
          <span className="muted" style={{ fontSize: 12 }}>{m.listUnit}</span>
        </div>
        <label className="row" style={{ position: 'relative', gap: 8, border: '1px solid var(--border)', borderRadius: 10, padding: '0 12px', background: 'var(--surface2)', minHeight: 44 }}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--muted)' }} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <span className="sr-only">Buscar estado</span>
          <input type="search" value={q} onChange={(e) => onQ(e.target.value)} placeholder="Buscar estado…"
            style={{ flex: 1, minWidth: 0, border: 0, background: 'transparent', font: 'inherit', fontSize: 14, color: 'var(--text)', outline: 'none' }} />
        </label>
      </div>
      <div className="col state-scroll" style={{ maxHeight: 420, overflowY: 'auto' }}>
        {m.rows.map((r) => (
          <button key={r.uf} type="button" className="btn uf-row" onClick={() => onPick(r.uf)} aria-pressed={r.selected}
            style={{ color: 'inherit', textAlign: 'left', borderTop: '1px solid var(--border)', background: r.bg, padding: '10px 18px', minHeight: 52,
              display: 'grid', gridTemplateColumns: '36px minmax(0, 1fr) 92px', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 800, textAlign: 'center', padding: '4px 0', borderRadius: 6, background: r.fill, color: r.ink }}>{r.uf}</span>
            <span className="col" style={{ gap: 5, minWidth: 0 }}>
              <span style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.n}</span>
              <span style={{ display: 'flex', height: 5, borderRadius: 3, overflow: 'hidden', gap: 2 }}>
                <span style={{ width: r.wA, background: 'var(--a)' }} /><span style={{ width: r.wO, background: 'var(--o)' }} /><span style={{ flex: 1, background: r.started ? 'var(--b)' : 'var(--track)' }} />
              </span>
            </span>
            <span className="col" style={{ alignItems: 'flex-end', gap: 2 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: r.leadColor }}>{r.lead}</span>
              {r.hasSub && <span className="muted" style={{ fontSize: 11 }}>{r.sub}</span>}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
