import { useEffect, useState } from 'react';
import { buscarGovernador } from './api.js';
import { adaptarGov } from './adapter.js';

const POLL_MS = 30000;

// Só consulta enquanto `ativo` (aba Governador aberta). status: carregando | ok | erro
export function useGovernador(uf, ativo) {
  const [s, setS] = useState({ uf: null, gov: null, status: 'carregando' });

  useEffect(() => {
    if (!ativo) return undefined;
    let vivo = true;
    let timer;
    const tick = async () => {
      try {
        const gov = adaptarGov(await buscarGovernador(uf));
        if (!vivo) return;
        setS({ uf, gov, status: 'ok' });
        if (!gov.final) timer = setTimeout(tick, POLL_MS);
      } catch {
        if (!vivo) return;
        setS((e) => (e.uf === uf && e.gov ? e : { uf, gov: null, status: 'erro' }));
        timer = setTimeout(tick, POLL_MS);
      }
    };
    tick();
    return () => { vivo = false; clearTimeout(timer); };
  }, [uf, ativo]);

  return s.uf === uf ? s : { uf, gov: null, status: 'carregando' };
}
