import { Count } from './anim.jsx';
import { pct, int } from '../format.js';

const secao = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, display: 'flex', flexDirection: 'column' };

export default function MobileMapa({ m, geo, selUf, onPick, swap }) {
  const { t, sel } = m;
  const selGeo = geo.filter((g) => g.uf === selUf);
  const legenda = [3, 2, 1, 0].map((k) => t.sA[k]).concat([0, 1, 2, 3].map((k) => t.sB[k]));
  return (
    <>
      <section aria-label="Mapa por estado" style={{ ...secao, padding: '14px 10px 12px', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 6px' }}>
          <h2 className="h2" style={{ fontSize: 15 }}>Resultado por estado</h2>
          <span className="muted" style={{ fontSize: 12 }}>Toque num estado</span>
        </div>
        <div style={{ position: 'relative' }}>
          <svg role="img" aria-label="Mapa do Brasil com quem lidera em cada estado no 2º turno" viewBox="0 -8 684 656" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
            {geo.map((g) => {
              const cx = g.ext ? g.ax : g.lx;
              return <path key={g.uf} className="uf-path-m" d={g.d} fill={(m.fillByUf[g.uf] || { fill: t.none }).fill} stroke={t.stroke} strokeWidth="1.2" strokeLinejoin="round"
                onClick={() => onPick(g.uf)} style={{ cursor: 'pointer', animationDelay: ((cx / 680) * 0.55).toFixed(2) + 's' }} />;
            })}
            {selGeo.map((g) => (
              <g key={'s' + g.uf} style={{ pointerEvents: 'none' }}>
                <path className="glow" d={g.d} fill="none" stroke={t.sel} strokeWidth="10" strokeLinejoin="round" />
                <path className="ants" d={g.d} fill="none" stroke={t.sel} strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" />
              </g>
            ))}
            {geo.map((g) => (
              <g key={'l' + g.uf} className="uf-label">
                {g.ext && (
                  <>
                    <line x1={g.ax} y1={g.ay} x2={g.ex} y2={g.ey} stroke={t.muted} strokeWidth="1.2" />
                    <circle cx={g.ax} cy={g.ay} r="2.4" fill={t.muted} />
                  </>
                )}
                <text x={g.lx} y={g.ext ? g.ly + 2 : g.ly + 3} textAnchor={g.ext ? 'start' : 'middle'} fill={g.ext ? t.text : (m.fillByUf[g.uf] || { ink: t.text }).ink}
                  fontSize={g.ext ? 17 : 18} fontWeight="800" fontFamily="Archivo, system-ui, sans-serif" onClick={() => onPick(g.uf)} style={{ cursor: 'pointer' }}>{g.uf}</text>
              </g>
            ))}
          </svg>
          {geo.length === 0 && <div className="muted" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>Carregando mapa…</div>}
        </div>
        <div className="col" style={{ gap: 4, padding: '0 6px' }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {legenda.map((c, i) => <div key={i} className="fill" style={{ flex: 1, height: 10, background: c, borderRadius: 2, animationDelay: (i * 0.05) + 's' }} />)}
          </div>
          <div className="muted" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
            <span><strong style={{ color: 'var(--a)' }}>{m.candA.curto}</strong> +15</span><span>+8</span><span>+3</span><span>0</span><span>+3</span><span>+8</span><span>+15 <strong style={{ color: 'var(--b)' }}>{m.candB.curto}</strong></span>
          </div>
        </div>
      </section>

      <aside id="detalhe" aria-label="Detalhe do estado" aria-live="polite" key={swap} className={swap ? 'swap' : undefined} style={{ ...secao, padding: 18, gap: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
          <div className="col" style={{ gap: 2, minWidth: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>{sel.regionName}</span>
            <h2 className="h2" style={{ fontSize: 22, fontWeight: 800 }}>{sel.n}</h2>
          </div>
          <span style={{ flex: 'none', fontSize: 12, fontWeight: 700, padding: '6px 10px', borderRadius: 999, background: sel.chipBg, color: sel.chipInk, transition: 'background-color .35s ease', textAlign: 'right' }}>{sel.chip}</span>
        </div>

        <div className="col" style={{ gap: 5 }}>
          <div className="muted" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}><span>Seções apuradas</span><strong style={{ color: 'var(--text)' }}>{sel.apTxt}</strong></div>
          <div style={{ height: 6, borderRadius: 3, background: 'var(--track)', overflow: 'hidden' }}><div className="fill stripes" style={{ height: '100%', width: sel.apW, backgroundColor: 'var(--live)', borderRadius: 3 }} /></div>
        </div>

        {sel.cands.map((c) => (
          <div key={c.name} className="col" style={{ gap: 5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
              <span className="row" style={{ gap: 8, fontSize: 14, fontWeight: 600 }}><span style={{ width: 9, height: 9, borderRadius: '50%', background: c.color }} />{c.name}</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: c.color }}><Count v={c.rp} fmt={pct} /></span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: 'var(--track)', overflow: 'hidden' }}><div className="fill live" style={{ height: '100%', width: c.w, background: c.color, borderRadius: 4 }} /></div>
            <span className="muted" style={{ fontSize: 12 }}><Count v={c.rv} fmt={int} /> votos</span>
          </div>
        ))}

        <div className="col" style={{ gap: 10, background: 'var(--surface2)', borderRadius: 14, padding: 14 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--muted)' }}>Comparado ao 1º turno</span>
          {sel.cmpRows.map((c) => (
            <div key={c.name} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) repeat(3, minmax(0, 1fr))', gap: 6, alignItems: 'center', fontSize: 13 }}>
              <span className="row nowrap" style={{ gap: 7, fontWeight: 600, minWidth: 0 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, flex: 'none' }} />{c.name.split(' ')[0]}</span>
              <span className="muted" style={{ textAlign: 'right' }}>{c.p1}</span>
              <span style={{ textAlign: 'right', fontWeight: 700 }}>{c.p2}</span>
              <span style={{ textAlign: 'right', fontWeight: 700, color: c.dInk }}>{c.d}</span>
            </div>
          ))}
          <p className="muted" style={{ margin: 0, fontSize: 12 }}>Vantagem: <strong style={{ color: 'var(--text)' }}>{sel.m1}</strong> → <strong style={{ color: 'var(--text)' }}>{sel.m2}</strong> · <strong style={{ color: sel.swingInk }}>{sel.swingTxt}</strong></p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px 12px' }}>
          {[['Eleitorado', sel.el], ['Comparecimento', sel.compTxt], ['Brancos e nulos', sel.bnTxt], ['Abstenção', sel.abTxt]].map(([l, v]) => (
            <div key={l} className="col"><span className="muted" style={{ fontSize: 11 }}>{l}</span><span style={{ fontSize: 14, fontWeight: 700 }}>{v}</span></div>
          ))}
        </div>
      </aside>
    </>
  );
}
