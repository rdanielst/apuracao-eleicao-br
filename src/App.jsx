import { useEffect, useMemo, useState } from 'react';
import { buildModel } from './model.js';
import Header from './components/Header.jsx';
import NationalCard from './components/NationalCard.jsx';
import MapCard from './components/MapCard.jsx';
import StatePanel from './components/StatePanel.jsx';
import StateList from './components/StateList.jsx';
import RegionsCard from './components/RegionsCard.jsx';
import EvolutionChart from './components/EvolutionChart.jsx';
import Consolidado from './components/Consolidado.jsx';
import GovernorView from './components/GovernorView.jsx';
import MobileApp from './components/MobileApp.jsx';
import useIsMobile from './useIsMobile.js';
import { useApuracao } from './tse/useApuracao.js';
import { useGovernador } from './tse/useGovernador.js';
import { GOV } from './tse/api.js';

export default function App() {
  const [dark, setDark] = useState(false);
  const [cargo, setCargo] = useState('Presidente');
  const [govUf, setGovUf] = useState(GOV.ufs[0]);
  const [selUf, setSelUf] = useState('SP');
  const [q, setQ] = useState('');
  const [geo, setGeo] = useState([]);
  const isMobile = useIsMobile();
  const { r1, r2, hist, status } = useApuracao();
  const gov = useGovernador(govUf, cargo === 'Governador');

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'brazil-geo.json').then((r) => r.json()).then(setGeo).catch(() => {});
  }, []);

  const m = useMemo(() => (r1 && r2 ? buildModel({ dark, sel: selUf, q, dados: { r1, r2 }, hist, status }) : null), [dark, selUf, q, r1, r2, hist, status]);

  if (!m) {
    return (
      <div className={'app' + (dark ? ' dark' : '')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
        {status === 'erro' ? 'Não foi possível carregar os dados do TSE. Tentando novamente em instantes…' : 'Carregando apuração…'}
      </div>
    );
  }

  const toggleTheme = () => setDark((d) => !d);

  if (isMobile) {
    return (
      <MobileApp m={m} dark={dark} onToggleTheme={toggleTheme} cargo={cargo} onCargo={setCargo} geo={geo}
        selUf={selUf} onSelUf={setSelUf} q={q} onQ={setQ} gov={gov} govUf={govUf} onGovUf={setGovUf} />
    );
  }

  return (
    <div className={'app' + (dark ? ' dark' : '')}>
      <Header m={m} dark={dark} onToggleTheme={toggleTheme} cargo={cargo} onCargo={setCargo} />
      <main className="main" style={{ maxWidth: 1360, margin: '0 auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {cargo === 'Governador' ? (
          <GovernorView uf={govUf} onUf={setGovUf} gov={gov.gov} status={gov.status} />
        ) : (
          <>
            {m.aviso && <div role="status" className="card" style={{ padding: '10px 16px', fontSize: 14, color: 'var(--muted)' }}>{m.aviso}</div>}
            <p className="muted" style={{ margin: 0, fontSize: 14 }}>{m.modeHint}</p>
            <NationalCard m={m} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'stretch' }}>
              <MapCard m={m} geo={geo} isMobile={false} selUf={selUf} onPick={setSelUf} />
              <aside id="detalhe" aria-label="Detalhe do estado" style={{ flex: '1 1 360px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <StatePanel m={m} />
                <StateList m={m} q={q} onQ={setQ} onPick={setSelUf} />
              </aside>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start' }}>
              <RegionsCard m={m} />
              <div className="col" style={{ flex: '2 1 560px', minWidth: 0, gap: 20 }}>
                <Consolidado m={m} />
                {m.hist.length >= 2 && <EvolutionChart m={m} isMobile={false} />}
              </div>
            </div>
          </>
        )}
        <footer className="muted" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, fontSize: 12, padding: '4px 2px 12px' }}>
          <span>Dados do TSE, atualizados a cada 30 s. Resultados oficiais: <a href="https://resultados.tse.jus.br">TSE</a>.</span>
          <span>Mapa: svg-maps/brazil, CC BY 4.0.</span>
        </footer>
      </main>
    </div>
  );
}
