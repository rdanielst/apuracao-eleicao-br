import Avatar from './Avatar.jsx';
import { Count } from './anim.jsx';
import { fotoUrl, ELEICAO } from '../tse/api.js';
import { pct, int } from '../format.js';

const secao = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 18, display: 'flex', flexDirection: 'column' };
const grid = { display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) repeat(3, minmax(0, 1fr))', gap: 6 };
const barra = { flex: 1, display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', gap: 2 };

function Cand({ c, p, v, cor, soft }) {
  return (
    <div className="row" style={{ gap: 12 }}>
      <Avatar src={fotoUrl(ELEICAO[2], 'br', c.sq)} ini={c.ini} nome={c.nome} color={cor} soft={soft} size={46} />
      <div className="col" style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 700 }}>{c.nome}</span>
        <span className="muted" style={{ fontSize: 12 }}>{c.sg} · <Count v={v} fmt={int} /> votos</span>
      </div>
      <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em', color: cor }}><Count v={p} fmt={pct} /></span>
    </div>
  );
}

function Vencedor({ m }) {
  const cor = m.winSide === 'a' ? 'var(--a)' : 'var(--b)';
  return (
    <section aria-live="polite" style={{ ...secao, flexDirection: 'row', alignItems: 'center', gap: 14, border: `2px solid ${cor}`, padding: '16px 18px' }}>
      <div className="trophy" aria-hidden="true" style={{ width: 48, height: 48, flex: 'none', borderRadius: '50%', background: m.winSide === 'a' ? 'var(--aSoft)' : 'var(--bSoft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" /><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" /></svg>
      </div>
      <div className="col" style={{ gap: 2, flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--muted)' }}>Apuração concluída</span>
        <span style={{ fontSize: 16, fontWeight: 800 }}>{m.winTxt}</span>
      </div>
    </section>
  );
}

export default function MobileResumo({ m }) {
  const { nat, candA, candB } = m;
  const r = nat.raw;
  return (
    <>
      {m.final && m.started && <Vencedor m={m} />}

      <section aria-label="Resultado nacional" style={{ ...secao, gap: 16 }}>
        <Cand c={candA} p={r.pA} v={r.vA} cor="var(--a)" soft="var(--aSoft)" />
        <Cand c={candB} p={r.pB} v={r.vB} cor="var(--b)" soft="var(--bSoft)" />
        <div style={{ position: 'relative', paddingTop: 18 }}>
          <span style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', fontSize: 11, fontWeight: 600, color: 'var(--muted)', whiteSpace: 'nowrap' }}>50% + 1</span>
          <div role="img" aria-label={nat.aria} style={{ display: 'flex', height: 14, borderRadius: 7, overflow: 'hidden', gap: 2 }}>
            {nat.vazio ? <div style={{ flex: 1, background: 'var(--track)' }} /> : (
              <>
                <div className="fill live" style={{ width: nat.wA, background: 'var(--a)' }} />
                <div className="fill fill-r live" style={{ flex: 1, background: 'var(--b)' }} />
              </>
            )}
          </div>
          <div aria-hidden="true" style={{ position: 'absolute', top: 15, bottom: -3, left: '50%', width: 2, marginLeft: -1, background: 'var(--text)' }} />
        </div>
        <div className="col" style={{ gap: 6 }}>
          <div className="muted" style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 13 }}><span>Seções apuradas</span><strong style={{ color: 'var(--text)' }}><Count v={r.ap} fmt={pct} /></strong></div>
          <div style={{ height: 10, borderRadius: 5, background: 'var(--track)', overflow: 'hidden' }}><div className="fill stripes" style={{ height: '100%', width: nat.apW, backgroundColor: 'var(--live)', borderRadius: 5 }} /></div>
          <div className="muted" style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 13 }}><span>{nat.leadTxt}</span><span>Dif. <strong style={{ color: 'var(--text)' }}><Count v={r.diff} fmt={int} /></strong></span></div>
        </div>
      </section>

      <section aria-label="Comparação com o 1º turno" style={{ ...secao, gap: 12 }}>
        <div className="row" style={{ gap: 8 }}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--muted)' }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3" /></svg>
          <h2 className="h2" style={{ fontSize: 15 }}>Comparação com o 1º turno</h2>
        </div>
        <div className="muted" style={{ ...grid, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em', paddingBottom: 6, borderBottom: '1px solid var(--border)' }}>
          <span>Candidato</span><span style={{ textAlign: 'right' }}>1º</span><span style={{ textAlign: 'right' }}>2º</span><span style={{ textAlign: 'right' }}>Δ p.p.</span>
        </div>
        {nat.cmpRows.map((c) => (
          <div key={c.name} style={{ ...grid, alignItems: 'center', fontSize: 14 }}>
            <span className="row nowrap" style={{ gap: 7, fontWeight: 600, minWidth: 0 }}><span style={{ width: 9, height: 9, borderRadius: '50%', background: c.color, flex: 'none' }} />{c.name}</span>
            <span className="muted" style={{ textAlign: 'right' }}>{c.p1}</span>
            <span style={{ textAlign: 'right', fontWeight: 700 }}>{c.p2}</span>
            <span style={{ textAlign: 'right', fontWeight: 700, color: c.dInk }}>{c.d}</span>
          </div>
        ))}
        <div className="col" style={{ gap: 5, paddingTop: 4 }}>
          <div className="row" style={{ gap: 8 }}>
            <span className="muted" style={{ fontSize: 11, width: 18 }}>1º</span>
            <div style={barra}><div className="fill" style={{ width: nat.wA1, background: 'var(--a)', animationDelay: '.25s' }} /><div className="fill" style={{ width: nat.wO1, background: 'var(--o)', animationDelay: '.35s' }} /><div className="fill fill-r" style={{ flex: 1, background: 'var(--b)', animationDelay: '.25s' }} /></div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <span className="muted" style={{ fontSize: 11, width: 18 }}>2º</span>
            <div style={barra}><div className="fill" style={{ width: nat.wA, background: 'var(--a)', animationDelay: '.45s' }} /><div className="fill fill-r" style={{ flex: 1, background: 'var(--b)', animationDelay: '.45s' }} /></div>
          </div>
        </div>
        <p className="muted" style={{ margin: 0, fontSize: 13 }}>Vantagem: <strong style={{ color: 'var(--text)' }}>{nat.m1}</strong> no 1º → <strong style={{ color: 'var(--text)' }}>{nat.m2}</strong> no 2º turno.</p>
      </section>

      <section aria-label="Resultado por região" style={{ ...secao, gap: 14 }}>
        <h2 className="h2" style={{ fontSize: 15 }}>Por região</h2>
        {m.regions.map((g, i) => {
          const delay = (0.3 + i * 0.09).toFixed(2) + 's';
          return (
            <div key={g.name} className="col" style={{ gap: 5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ fontWeight: 600 }}>{g.name}</span>
                <span><strong style={{ color: 'var(--a)' }}>{g.pA}</strong> <span className="muted">×</span> <strong style={{ color: 'var(--b)' }}>{g.pB}</strong></span>
              </div>
              <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', gap: 2 }}>
                <div className="fill" style={{ width: g.wA, background: 'var(--a)', animationDelay: delay }} /><div className="fill fill-r" style={{ flex: 1, background: g.started ? 'var(--b)' : 'var(--track)', animationDelay: delay }} />
              </div>
              <span className="muted" style={{ fontSize: 12 }}>{g.sub}</span>
            </div>
          );
        })}
      </section>

      <Evolucao m={m} />

      <p className="muted" style={{ margin: 0, fontSize: 11, textAlign: 'center', padding: '0 8px' }}>Dados do TSE, atualizados a cada 30 s. Oficial: <a href="https://resultados.tse.jus.br">TSE</a>. Mapa: svg-maps/brazil, CC BY 4.0.</p>
    </>
  );
}

// Gráfico compacto da prancha (viewBox 340×190); a linha de 1º turno é tracejada.
function Evolucao({ m }) {
  const { t, candA, candB } = m;
  const X = (p) => (34 + (p / 100) * 300).toFixed(1);
  const Y = (v) => (10 + ((60 - Math.max(40, Math.min(60, v))) / 20) * 150).toFixed(1);
  const pts = (h, k) => h.map((p) => X(p.ap) + ',' + Y(p[k])).join(' ');
  const hist = m.hist;
  const fim = hist[hist.length - 1];
  return (
    <section aria-label="Evolução da apuração" style={{ ...secao, gap: 10 }}>
      <h2 className="h2" style={{ fontSize: 15 }}>Evolução da apuração</h2>
      <div className="wrap muted" style={{ gap: '6px 14px', fontSize: 12 }}>
        <span className="row" style={{ gap: 6, color: 'var(--text)' }}><span style={{ width: 14, height: 3, borderRadius: 2, background: 'var(--a)' }} />{candA.curto}</span>
        <span className="row" style={{ gap: 6, color: 'var(--text)' }}><span style={{ width: 14, height: 3, borderRadius: 2, background: 'var(--b)' }} />{candB.curto}</span>
        <span className="row" style={{ gap: 6 }}><svg aria-hidden="true" width="16" height="4"><line x1="0" y1="2" x2="16" y2="2" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" /></svg>1º turno</span>
      </div>
      <svg role="img" aria-label="Percentual de votos válidos conforme as seções são apuradas, 2º turno comparado ao 1º" viewBox="0 0 340 190" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <g fontSize="11" fontFamily="Archivo, system-ui, sans-serif">
          {[[10, '60%'], [47.5, ''], [85, '50%'], [122.5, ''], [160, '40%']].map(([y, l]) => (
            <g key={y}>
              <line x1="34" x2="334" y1={y} y2={y} style={{ stroke: y === 85 ? 'var(--text)' : 'var(--border)' }} strokeDasharray={y === 85 ? '3 3' : undefined} strokeOpacity={y === 85 ? 0.5 : 1} />
              {l && <text x="28" y={y + 4} textAnchor="end" style={{ fill: 'var(--muted)' }}>{l}</text>}
            </g>
          ))}
          <text x="34" y="180" textAnchor="start" style={{ fill: 'var(--muted)' }}>0%</text>
          <text x="184" y="180" textAnchor="middle" style={{ fill: 'var(--muted)' }}>50%</text>
          <text x="334" y="180" textAnchor="end" style={{ fill: 'var(--muted)' }}>100%</text>
        </g>
        <polyline points={X(0) + ',' + Y(m.n1.pA) + ' ' + X(100) + ',' + Y(m.n1.pA)} fill="none" stroke={t.a} strokeWidth="1.6" strokeDasharray="4 4" strokeOpacity="0.7" />
        <polyline points={X(0) + ',' + Y(m.n1.pB) + ' ' + X(100) + ',' + Y(m.n1.pB)} fill="none" stroke={t.b} strokeWidth="1.6" strokeDasharray="4 4" strokeOpacity="0.7" />
        {hist.length > 0 && (
          <>
            <polyline points={pts(hist, 'pA')} fill="none" stroke={t.a} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            <polyline points={pts(hist, 'pB')} fill="none" stroke={t.b} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            <circle cx={X(fim.ap)} cy={Y(fim.pA)} r="9" fill={t.a} fillOpacity="0.2" className={m.final ? undefined : 'ping'} />
            <circle cx={X(fim.ap)} cy={Y(fim.pB)} r="9" fill={t.b} fillOpacity="0.2" />
            <circle cx={X(fim.ap)} cy={Y(fim.pA)} r="4" fill={t.a} stroke={t.surface} strokeWidth="2" style={{ transition: 'cx .9s ease, cy .9s ease' }} />
            <circle cx={X(fim.ap)} cy={Y(fim.pB)} r="4" fill={t.b} stroke={t.surface} strokeWidth="2" style={{ transition: 'cx .9s ease, cy .9s ease' }} />
          </>
        )}
      </svg>
      <p className="muted" style={{ margin: 0, fontSize: 12 }}>{m.chartNote}</p>
    </section>
  );
}
