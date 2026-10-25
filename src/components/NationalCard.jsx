import Avatar from './Avatar.jsx';
import { fotoUrl, ELEICAO } from '../tse/api.js';

export default function NationalCard({ m }) {
  const { nat, candA, candB } = m;
  return (
    <section aria-label="Resultado nacional" className="card col nat-card" style={{ padding: '24px 28px', gap: 20 }}>
      <div className="wrap nat-top" style={{ alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div className="row nat-a" style={{ gap: 16, flex: '1 1 280px' }}>
          <Avatar hideMobile src={fotoUrl(ELEICAO[2], 'br', candA.sq)} ini={candA.ini} nome={candA.nome} color="var(--a)" soft="var(--aSoft)" />
          <div className="col" style={{ gap: 2 }}>
            <span style={{ fontSize: 18, fontWeight: 700 }}>{candA.nome}</span>
            <span className="muted" style={{ fontSize: 13 }}>{candA.sg} · nº {candA.n}</span>
            <span className="nat-pct" style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.05, color: 'var(--a)', letterSpacing: '-0.02em' }}>{nat.pA}</span>
            <span className="muted" style={{ fontSize: 14 }}>{nat.vA} votos</span>
            <span className="muted" style={{ fontSize: 13 }}>1º turno: <strong style={{ color: 'var(--text)' }}>{nat.pA1}</strong> · <strong style={{ color: 'var(--a)' }}>{nat.dA}</strong></span>
          </div>
        </div>

        <div className="col nat-mid" style={{ alignItems: 'center', gap: 8, flex: '1 1 240px', textAlign: 'center' }}>
          <span className="eyebrow">{m.centerLabel}</span>
          <span style={{ fontSize: 30, fontWeight: 800 }}>{nat.ap}</span>
          <div style={{ width: '100%', maxWidth: 240, height: 6, borderRadius: 3, background: 'var(--track)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: nat.apW, background: 'var(--text)' }} />
          </div>
          <span className="muted" style={{ fontSize: 13 }}>Diferença de <strong style={{ color: 'var(--text)' }}>{nat.diff}</strong> votos</span>
          <span className="muted" style={{ fontSize: 13 }}>Vantagem: {nat.m1} no 1º → <strong style={{ color: 'var(--text)' }}>{nat.m2}</strong> no 2º</span>
        </div>

        <div className="row nat-b" style={{ justifyContent: 'flex-end', gap: 16, flex: '1 1 280px', textAlign: 'right' }}>
          <div className="col" style={{ gap: 2, alignItems: 'flex-end' }}>
            <span style={{ fontSize: 18, fontWeight: 700 }}>{candB.nome}</span>
            <span className="muted" style={{ fontSize: 13 }}>{candB.sg} · nº {candB.n}</span>
            <span className="nat-pct" style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.05, color: 'var(--b)', letterSpacing: '-0.02em' }}>{nat.pB}</span>
            <span className="muted" style={{ fontSize: 14 }}>{nat.vB} votos</span>
            <span className="muted" style={{ fontSize: 13 }}>1º turno: <strong style={{ color: 'var(--text)' }}>{nat.pB1}</strong> · <strong style={{ color: 'var(--b)' }}>{nat.dB}</strong></span>
          </div>
          <Avatar hideMobile src={fotoUrl(ELEICAO[2], 'br', candB.sq)} ini={candB.ini} nome={candB.nome} color="var(--b)" soft="var(--bSoft)" />
        </div>
      </div>

      <div style={{ position: 'relative', paddingTop: 22 }}>
        <span style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', fontSize: 12, fontWeight: 600, color: 'var(--muted)', whiteSpace: 'nowrap' }}>50% + 1 dos votos válidos</span>
        <div role="img" aria-label={nat.aria} style={{ display: 'flex', height: 40, borderRadius: 10, minWidth: 0, overflow: 'hidden', gap: 3 }}>
          {nat.vazio && <div style={{ flex: 1, background: 'var(--track)' }} />}
          <div style={{ width: nat.wA, background: 'var(--a)', display: 'flex', alignItems: 'center', padding: '0 14px', color: '#fff', fontWeight: 700, fontSize: 15 }}>{nat.pA}</div>
                    <div style={{ flex: nat.vazio ? 0 : 1, background: 'var(--b)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 14px', color: '#fff', fontWeight: 700, fontSize: 15 }}>{nat.pB}</div>
        </div>
        <div aria-hidden="true" style={{ position: 'absolute', top: 18, bottom: -4, left: '50%', width: 2, marginLeft: -1, background: 'var(--text)' }} />
      </div>

    </section>
  );
}
