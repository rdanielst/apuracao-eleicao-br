import { GOV, fotoUrl } from '../tse/api.js';
import Avatar from './Avatar.jsx';
import { UF } from '../data.js';
import { pct, pct1, int, sgn } from '../format.js';

const COR = ['var(--g1)', 'var(--g2)'];

export default function GovernorView({ uf, onUf, gov, status }) {
  const stats = gov && [
    ['Eleitorado', int(gov.el)],
    ['Comparecimento', gov.started ? pct1(100 - gov.ab) : '—'],
    ['Brancos e nulos', gov.started ? pct1(gov.bn) : '—'],
    ['Abstenção', gov.started ? pct1(gov.ab) : '—']
  ];
  return (
    <>
      <nav aria-label="Estado do governador" className="scroll-x" style={{ display: 'flex', gap: 4, background: 'var(--surface)', border: '1px solid var(--border)', padding: 4, borderRadius: 12, alignSelf: 'flex-start' }}>
        {GOV.ufs.map((u) => (
          <button key={u} type="button" className="btn nowrap" aria-pressed={u === uf} onClick={() => onUf(u)} title={UF[u][0]}
            style={{ fontSize: 14, fontWeight: 600, borderRadius: 9, padding: '10px 16px', minHeight: 44,
              background: u === uf ? 'var(--text)' : 'transparent', color: u === uf ? 'var(--surface)' : 'var(--muted)' }}>{u}</button>
        ))}
      </nav>

      <section aria-label={'Governador de ' + UF[uf][0]} className="card col" style={{ padding: '24px 28px', gap: 20 }}>
        <div className="wrap" style={{ justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <div className="col" style={{ gap: 4 }}>
            <span className="eyebrow">Governador · 2º turno</span>
            <h2 className="h2" style={{ fontSize: 24, fontWeight: 800 }}>{UF[uf][0]}</h2>
          </div>
          {gov && (
            <span className="muted" style={{ fontSize: 13 }}>
              {gov.started
                ? pct(gov.ap) + ' das seções apuradas' + (gov.final ? ' · apuração encerrada' : ' · atualizado às ' + gov.hg)
                : 'Aguardando o início da apuração do 2º turno.'}
            </span>
          )}
        </div>

        {!gov && <p className="muted" style={{ margin: 0 }}>{status === 'erro' ? 'Não foi possível carregar os dados do TSE. Tentando novamente…' : 'Carregando…'}</p>}

        {gov && (
          <div className="wrap" style={{ gap: 20 }}>
            {gov.cands.map((c, i) => (
              <div key={c.n} className="col" style={{ flex: '1 1 300px', gap: 8, padding: 18, borderRadius: 12, background: 'var(--surface2)' }}>
                <div className="row" style={{ gap: 12 }}>
                  <Avatar src={fotoUrl(GOV.ele2, uf.toLowerCase(), c.sq)} ini={c.nome.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()} nome={c.nome} color={COR[i % 2]} soft="var(--surface)" size={56} />
                  <div className="col" style={{ gap: 2 }}>
                    <span style={{ fontSize: 18, fontWeight: 700 }}>{c.nome}</span>
                    <span className="muted" style={{ fontSize: 13 }}>{c.sg} · nº {c.n}</span>
                  </div>
                </div>
                <span style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.05, color: COR[i % 2], letterSpacing: '-0.02em' }}>{gov.started ? pct(c.p2) : '—'}</span>
                <div style={{ height: 10, borderRadius: 5, background: 'var(--track)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: c.p2 + '%', background: COR[i % 2] }} />
                </div>
                <span className="muted" style={{ fontSize: 14 }}>{int(c.v)} votos</span>
                <span className="muted" style={{ fontSize: 13 }}>
                  1º turno: <strong style={{ color: 'var(--text)' }}>{pct(c.p1)}</strong>
                  {gov.started && <> · <strong style={{ color: COR[i % 2] }}>{sgn(c.d)} p.p.</strong></>}
                </span>
              </div>
            ))}
          </div>
        )}

        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
            {stats.map(([l, v]) => (
              <div key={l} className="col" style={{ gap: 2 }}>
                <span className="muted" style={{ fontSize: 12 }}>{l}</span>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
