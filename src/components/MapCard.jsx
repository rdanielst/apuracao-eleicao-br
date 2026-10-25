export default function MapCard({ m, geo, selUf, onPick, isMobile }) {
  const { t } = m;
  const selGeo = geo.filter((g) => g.uf === selUf);
  return (
    <section aria-label="Mapa por estado" className="card col" style={{ flex: '999 1 620px', minWidth: 0, padding: 24, gap: 16 }}>
      <div className="wrap" style={{ justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
        <div className="col" style={{ gap: 4 }}>
          <h2 className="h2" style={{ fontSize: 20 }}>{m.mapTitle}</h2>
          <p className="muted" style={{ margin: 0, fontSize: 14 }}>{m.mapSub}</p>
        </div>
        <div className="row muted" style={{ gap: 6, fontSize: 13 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: t.none }} />Sem apuração
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <svg role="img" aria-label={m.mapTitle} viewBox="0 -4 680 648" style={{ width: '100%', height: 'auto', maxHeight: 680, display: 'block' }}>
          {geo.map((g) => {
            const c = m.fillByUf[g.uf] || { fill: t.none };
            return <path key={g.uf} className="uf-path" d={g.d} fill={c.fill} stroke={t.stroke} strokeWidth="0.9" strokeLinejoin="round" onClick={() => onPick(g.uf)} />;
          })}
          {selGeo.map((g) => (
            <path key={'sel' + g.uf} d={g.d} fill="none" stroke={t.sel} strokeWidth="2.2" strokeLinejoin="round" style={{ pointerEvents: 'none' }} />
          ))}
          {geo.map((g) => {
            const c = m.fillByUf[g.uf] || { ink: t.text };
            return (
              <g key={'l' + g.uf}>
                {g.ext && (
                  <>
                    <line x1={g.ax} y1={g.ay} x2={g.ex} y2={g.ey} stroke={t.muted} strokeWidth="0.8" />
                    <circle cx={g.ax} cy={g.ay} r="1.6" fill={t.muted} />
                  </>
                )}
                <text x={g.lx} y={g.ly} textAnchor={g.ext ? 'start' : 'middle'} fill={g.ext ? t.text : c.ink} fontSize={isMobile ? 17 : 11} fontWeight="700"
                  fontFamily="Archivo, system-ui, sans-serif" onClick={() => onPick(g.uf)} style={{ cursor: 'pointer' }}>{g.uf}</text>
              </g>
            );
          })}
        </svg>
        {geo.length === 0 && (
          <div className="muted" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>Carregando mapa…</div>
        )}
      </div>

      <div className="wrap" style={{ alignItems: 'center', gap: '12px 16px' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--a)' }}>{m.legLeft}</span>
        <Legend items={m.legendA} />
        <Legend items={m.legendB} />
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--b)' }}>{m.legRight}</span>
        <span className="muted" style={{ fontSize: 12, marginLeft: 'auto' }}>{m.legUnit}</span>
      </div>
    </section>
  );
}

function Legend({ items }) {
  return (
    <div className="legend" style={{ display: 'flex', gap: 2 }}>
      {items.map((l, i) => (
        <div key={i} className="col legend-item" style={{ alignItems: 'center', gap: 4, width: 58 }}>
          <div style={{ width: '100%', height: 12, background: l.c, borderRadius: 2 }} />
          <span className="muted" style={{ fontSize: 11 }}>{l.label}</span>
        </div>
      ))}
    </div>
  );
}
