const Stat = ({ label, value }) => (
  <div className="col" style={{ gap: 2 }}>
    <span className="muted" style={{ fontSize: 12 }}>{label}</span>
    <span style={{ fontSize: 15, fontWeight: 700 }}>{value}</span>
  </div>
);

const grid = { display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) repeat(3, minmax(0, 1fr))', gap: 8 };

export default function StatePanel({ m }) {
  const { sel } = m;
  return (
    <section className="card col" style={{ padding: 22, gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div className="col" style={{ gap: 4 }}>
          <span className="eyebrow">{sel.regionName}</span>
          <h2 className="h2" style={{ fontSize: 24, fontWeight: 800 }}>{sel.n}</h2>
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, padding: '6px 10px', borderRadius: 999, background: sel.chipBg, color: sel.chipInk, textAlign: 'right' }}>{sel.chip}</span>
      </div>

      <div className="col" style={{ gap: 16 }}>
          <div className="col" style={{ gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }} className="muted">
              <span>Seções apuradas</span><strong style={{ color: 'var(--text)' }}>{sel.apTxt}</strong>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: 'var(--track)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: sel.apW, background: 'var(--text)' }} />
            </div>
          </div>
          {sel.cands.map((c) => (
            <div key={c.name} className="col" style={{ gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                <span className="row" style={{ gap: 8, fontSize: 15, fontWeight: 600 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: c.color }} />{c.name}
                </span>
                <span style={{ fontSize: 22, fontWeight: 800, color: c.ink }}>{c.p}</span>
              </div>
              <div style={{ height: 10, borderRadius: 5, background: 'var(--track)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: c.w, background: c.color }} />
              </div>
              <span className="muted" style={{ fontSize: 13 }}>{c.v} votos</span>
            </div>
          ))}
      </div>

      <div className="col" style={{ gap: 12 }}>
          <div className="muted" style={{ ...grid, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', paddingBottom: 6, borderBottom: '1px solid var(--border)' }}>
            <span>Candidato</span><span style={{ textAlign: 'right' }}>1º turno</span><span style={{ textAlign: 'right' }}>2º turno</span><span style={{ textAlign: 'right' }}>Δ p.p.</span>
          </div>
          {sel.cmpRows.map((c) => (
            <div key={c.name} style={{ ...grid, alignItems: 'center', fontSize: 14 }}>
              <span className="row" style={{ gap: 8, fontWeight: 600, minWidth: 0 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: c.color, flex: 'none' }} />{c.name}
              </span>
              <span style={{ textAlign: 'right' }}>{c.p1}</span>
              <span style={{ textAlign: 'right', fontWeight: 700 }}>{c.p2}</span>
              <span style={{ textAlign: 'right', fontWeight: 700, color: c.dInk }}>{c.d}</span>
            </div>
          ))}
          <div className="col" style={{ gap: 8, paddingTop: 4 }}>
            <span className="muted" style={{ fontSize: 12 }}>Votos válidos, 1º → 2º turno</span>
            <div className="col" style={{ gap: 4 }}>
              <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', gap: 2 }}>
                <div style={{ width: sel.w1A, background: 'var(--a)' }} /><div style={{ width: sel.w1O, background: 'var(--o)' }} /><div style={{ flex: 1, background: 'var(--b)' }} />
              </div>
              <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', gap: 2 }}>
                <div style={{ width: sel.w2A, background: 'var(--a)' }} /><div style={{ flex: 1, background: 'var(--b)' }} />
              </div>
            </div>
            <span className="muted" style={{ fontSize: 13 }}>Vantagem de <strong style={{ color: 'var(--text)' }}>{sel.m1}</strong> no 1º turno para <strong style={{ color: 'var(--text)' }}>{sel.m2}</strong> no 2º.</span>
          </div>
        </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
        <Stat label="Eleitorado" value={sel.el} />
        <Stat label="Comparecimento" value={sel.compTxt} />
        <Stat label="Brancos e nulos" value={sel.bnTxt} />
        <Stat label="Abstenção" value={sel.abTxt} />
      </div>
    </section>
  );
}
