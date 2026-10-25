// Consolidado: em quantos estados (27 UFs, DF incluso) cada candidato lidera.
const Chips = ({ ufs, cor, soft }) => (
  <div className="wrap" style={{ gap: 4 }}>
    {ufs.map((u) => (
      <span key={u} style={{ fontSize: 11, fontWeight: 800, padding: '3px 6px', borderRadius: 6, background: soft, color: cor }}>{u}</span>
    ))}
  </div>
);

function Lado({ nome, n, ufs, cor, soft, direita }) {
  return (
    <div className="col" style={{ flex: '1 1 0', minWidth: 0, gap: 8, alignItems: direita ? 'flex-end' : 'flex-start', textAlign: direita ? 'right' : 'left' }}>
      <span style={{ fontSize: 13, fontWeight: 700 }}>{nome}</span>
      <span style={{ fontSize: 40, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em', color: cor }}>{n}</span>
      <span className="muted" style={{ fontSize: 12 }}>{n === 1 ? 'estado' : 'estados'}</span>
      <div style={{ display: 'flex', justifyContent: direita ? 'flex-end' : 'flex-start' }}><Chips ufs={ufs} cor={cor} soft={soft} /></div>
    </div>
  );
}

export default function Consolidado({ m, compact = false }) {
  const { lideres: l, candA, candB } = m;
  const total = l.A.length + l.B.length + l.sem.length;
  // um bloco por UF: A à esquerda, B à direita, sem apuração no meio
  const blocos = [...l.A.map(() => 'var(--a)'), ...l.sem.map(() => 'var(--track)'), ...l.B.map(() => 'var(--b)')];
  return (
    <section aria-label="Estados por candidato" className="card col" style={{ flex: compact ? undefined : '2 1 560px', minWidth: 0, padding: compact ? 18 : 22, gap: 14, borderRadius: compact ? 20 : undefined }}>
      <div className="wrap" style={{ justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
        <h2 className="h2" style={{ fontSize: compact ? 15 : 16 }}>Estados em que cada candidato lidera</h2>
        <span className="muted" style={{ fontSize: 12 }}>{total} unidades (26 estados + DF)</span>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <Lado nome={candA.curto} n={l.A.length} ufs={l.A} cor="var(--a)" soft="var(--aSoft)" />
        <Lado nome={candB.curto} n={l.B.length} ufs={l.B} cor="var(--b)" soft="var(--bSoft)" direita />
      </div>
      <div role="img" aria-label={`${candA.curto} lidera em ${l.A.length} estados, ${candB.curto} em ${l.B.length}, ${l.sem.length} sem votos apurados`}
        style={{ display: 'flex', gap: 2, height: 12 }}>
        {blocos.map((c, i) => <div key={i} style={{ flex: 1, background: c, borderRadius: 2 }} />)}
      </div>
      {l.sem.length > 0 && (
        <div className="col" style={{ gap: 6 }}>
          <span className="muted" style={{ fontSize: 12 }}>Sem votos apurados: <strong style={{ color: 'var(--text)' }}>{l.sem.length}</strong></span>
          <Chips ufs={l.sem} cor="var(--muted)" soft="var(--track)" />
        </div>
      )}
    </section>
  );
}
