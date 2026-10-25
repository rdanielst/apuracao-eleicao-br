const GRID = [[12, '60%'], [52, '55%'], [92, '50%'], [132, '45%'], [172, '40%']];

export default function EvolutionChart({ m, isMobile }) {
  const { t, chart, chart1, candA, candB } = m;
  const fs = isMobile ? 17 : 11;
  return (
    <section aria-label="Evolução da apuração" className="card col" style={{ flex: '2 1 560px', minWidth: 0, padding: 22, gap: 12 }}>
      <div className="wrap" style={{ justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
        <h2 className="h2" style={{ fontSize: 16 }}>{m.chartTitle}</h2>
        <div className="wrap" style={{ gap: 14, fontSize: 13 }}>
          <span className="row" style={{ gap: 6 }}><span style={{ width: 14, height: 3, borderRadius: 2, background: 'var(--a)' }} />{candA.nome}</span>
          <span className="row" style={{ gap: 6 }}><span style={{ width: 14, height: 3, borderRadius: 2, background: 'var(--b)' }} />{candB.nome}</span>
          <span className="row muted" style={{ gap: 6 }}>
              <svg aria-hidden="true" width="16" height="4"><line x1="0" y1="2" x2="16" y2="2" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" /></svg>1º turno
            </span>
        </div>
      </div>
      <svg role="img" aria-label="Percentual de votos válidos conforme as seções são apuradas" viewBox={isMobile ? '-6 0 646 214' : '0 0 640 210'} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <g fontSize={fs} fontFamily="Archivo, system-ui, sans-serif">
          {GRID.map(([y, label]) => (
            <g key={y}>
              <line x1="40" x2="624" y1={y} y2={y} style={{ stroke: y === 92 ? 'var(--text)' : 'var(--border)' }} strokeDasharray={y === 92 ? '3 3' : undefined} strokeOpacity={y === 92 ? 0.5 : 1} />
              <text x="32" y={y + 4} textAnchor="end" style={{ fill: 'var(--muted)' }}>{label}</text>
            </g>
          ))}
          <text x="40" y="196" textAnchor="start" style={{ fill: 'var(--muted)' }}>0%</text>
          <text x="186" y="196" textAnchor="middle" style={{ fill: 'var(--muted)' }}>25%</text>
          <text x="332" y="196" textAnchor="middle" style={{ fill: 'var(--muted)' }}>50%</text>
          <text x="478" y="196" textAnchor="middle" style={{ fill: 'var(--muted)' }}>75%</text>
          <text x="624" y="196" textAnchor="end" style={{ fill: 'var(--muted)' }}>{isMobile ? '100%' : '100% das seções'}</text>
        </g>
        <>
            <polyline points={chart1.a} fill="none" stroke={t.a} strokeWidth="1.8" strokeDasharray="4 4" strokeOpacity="0.75" />
            <polyline points={chart1.b} fill="none" stroke={t.b} strokeWidth="1.8" strokeDasharray="4 4" strokeOpacity="0.75" />
        </>
        <polyline points={chart.a} fill="none" stroke={t.a} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        <polyline points={chart.b} fill="none" stroke={t.b} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={chart.x} cy={chart.ya} r="4.5" fill={t.a} stroke={t.surface} strokeWidth="2" />
        <circle cx={chart.x} cy={chart.yb} r="4.5" fill={t.b} stroke={t.surface} strokeWidth="2" />
      </svg>
      <p className="muted" style={{ margin: 0, fontSize: 12 }}>{m.chartNote}</p>
    </section>
  );
}
