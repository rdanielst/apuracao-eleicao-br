import { useEffect, useState } from 'react';
import { buscarTudo, ELEICAO } from './api.js';
import { adaptar, assinatura } from './adapter.js';
import { registrar } from './historico.js';

const POLL_MS = 30000;
const VELHO_MS = 3 * 60 * 1000;

// status: carregando | ok | desatualizado | erro
export function useApuracao() {
  const [s, setS] = useState({ r1: null, r2: null, hist: [], status: 'carregando' });

  useEffect(() => {
    let ativo = true;
    let emVoo = false;
    let parou = false;
    let timer;
    let r1 = null;
    let sig = '';
    let ultimoOk = 0;

    const tick = async () => {
      if (!ativo || parou || emVoo || document.hidden) return;
      emVoo = true;
      clearTimeout(timer);
      try {
        if (!r1) r1 = adaptar(await buscarTudo(ELEICAO[1])); // 1º turno é final: uma vez só
        const raw2 = await buscarTudo(ELEICAO[2]);
        if (!ativo) return;
        ultimoOk = Date.now();
        const novaSig = assinatura(raw2);
        if (novaSig !== sig) {
          sig = novaSig;
          const r2 = adaptar(raw2);
          parou = r2.final;
          setS((e) => {
            return { r1, r2, hist: registrar(e.hist, r2.br), status: 'ok' };
          });
        } else {
          setS((e) => ({ ...e, status: 'ok' }));
        }
      } catch {
        if (ativo) setS((e) => ({ ...e, status: !e.r2 ? 'erro' : Date.now() - ultimoOk > VELHO_MS ? 'desatualizado' : e.status }));
      } finally {
        emVoo = false;
        if (ativo && !parou) timer = setTimeout(tick, POLL_MS);
      }
    };

    const voltou = () => tick();
    document.addEventListener('visibilitychange', voltou);
    tick();
    return () => { ativo = false; clearTimeout(timer); document.removeEventListener('visibilitychange', voltou); };
  }, []);

  return s;
}
