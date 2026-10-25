import { useEffect, useRef, useState } from 'react';
import MobileHeader from './MobileHeader.jsx';
import MobileResumo from './MobileResumo.jsx';
import MobileMapa from './MobileMapa.jsx';
import MobileEstados from './MobileEstados.jsx';
import BottomNav from './BottomNav.jsx';
import GovernorView from './GovernorView.jsx';
import { Confetti } from './anim.jsx';

// Layout da prancha "Mobile · 2º turno": cabeçalho com progresso, abas Resumo / Mapa / Estados, cards em coluna.
export default function MobileApp({ m, dark, onToggleTheme, cargo, onCargo, geo, selUf, onSelUf, q, onQ, gov, govUf, onGovUf }) {
  const [aba, setAba] = useState('resumo');
  const [swap, setSwap] = useState(0);
  const [confete, setConfete] = useState(false);
  const pres = cargo === 'Presidente';
  const jaFinal = useRef(m.final);

  // confete só quando a apuração termina com a página aberta (não ao abrir um resultado já final)
  useEffect(() => {
    if (!m.final || !m.started) return undefined;
    if (jaFinal.current) return undefined;
    setConfete(true);
    const id = setTimeout(() => setConfete(false), 4000);
    return () => clearTimeout(id);
  }, [m.final, m.started]);

  const ir = (x) => { setAba(x); window.scrollTo({ top: 0 }); };
  const pick = (uf) => { if (uf !== selUf) { onSelUf(uf); setSwap((n) => n + 1); } };
  const pickDaLista = (uf) => { onSelUf(uf); setSwap((n) => n + 1); ir('mapa'); };

  return (
    <div className={'app m' + (dark ? ' dark' : '') + (m.final ? ' done' : '')}>
      <MobileHeader m={m} dark={dark} onToggleTheme={onToggleTheme} cargo={cargo} onCargo={onCargo} />
      <main style={{ padding: '14px 14px 96px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {m.aviso && <div role="status" className="card" style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)' }}>{m.aviso}</div>}
        {!pres ? (
          <GovernorView uf={govUf} onUf={onGovUf} gov={gov.gov} status={gov.status} />
        ) : (
          <div key={aba} className="screen" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {aba === 'resumo' && <MobileResumo m={m} />}
            {aba === 'mapa' && <MobileMapa m={m} geo={geo} selUf={selUf} onPick={pick} swap={swap} />}
            {aba === 'estados' && <MobileEstados m={m} q={q} onQ={onQ} onPick={pickDaLista} />}
          </div>
        )}
      </main>
      {pres && <BottomNav aba={aba} onAba={ir} />}
      {confete && <Confetti />}
    </div>
  );
}
