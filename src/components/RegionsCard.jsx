export default function RegionsCard({ m }) {
  return (
    <section aria-label="Resultado por região" className="card col" style={{ flex: '1 1 420px', minWidth: 0, padding: 22, gap: 14 }}>
      <h2 className="h2" style={{ fontSize: 16 }}>Por região</h2>
      {m.regions.map((g) => (
        <div key={g.name} className="col" style={{ gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ fontWeight: 600 }}>{g.name}</span>
            <span><strong style={{ color: 'var(--a)' }}>{g.pA}</strong> <span className="muted">×</span> <strong style={{ color: 'var(--b)' }}>{g.pB}</strong></span>
          </div>
          <div style={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden', gap: 2 }}>
            <div style={{ width: g.wA, background: 'var(--a)' }} /><div style={{ width: g.wO, background: 'var(--o)' }} /><div style={{ flex: 1, background: g.started ? 'var(--b)' : 'var(--track)' }} />
          </div>
          <span className="muted" style={{ fontSize: 12 }}>{g.sub}</span>
        </div>
      ))}
    </section>
  );
}
