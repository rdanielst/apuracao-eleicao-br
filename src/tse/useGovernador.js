import { useEffect, useState } from 'react';
import { buscarGovernador } from './api.js';
import { adaptarGov } from './adapter.js';

const POLL_MS = 30000;

// Só consulta enquanto `ativo` (aba Governador aberta) e a página está visível; ao voltar, consulta na hora.
// status: carregando | ok | erro
export function useGovernador(uf, ativo) {
  const [s, setS] = useState({ uf: null, gov: null, status: 'carregando' });

  useEffect(() => {
    if (!ativo) return undefined;
    let vivo = true;
    let emVoo = false;
    let parou = false;
    let timer;
    const tick = async () => {
      if (!vivo || parou || emVoo || document.hidden) return;
      emVoo = true;
      clearTimeout(timer);
      try {
        const gov = adaptarGov(await buscarGovernador(uf));
        if (!vivo) return;
        parou = gov.final;
        setS({ uf, gov, status: 'ok' });
      } catch {
        if (vivo) setS((e) => (e.uf === uf && e.gov ? e : { uf, gov: null, status: 'erro' }));
      } finally {
        emVoo = false;
        if (vivo && !parou) timer = setTimeout(tick, POLL_MS);
      }
    };
    document.addEventListener('visibilitychange', tick);
    tick();
    return () => { vivo = false; clearTimeout(timer); document.removeEventListener('visibilitychange', tick); };
  }, [uf, ativo]);

  return s.uf === uf ? s : { uf, gov: null, status: 'carregando' };
}
