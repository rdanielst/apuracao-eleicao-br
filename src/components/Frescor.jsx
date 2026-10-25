import { useEffect, useState } from 'react';

const STALE_MS = 5 * 60 * 1000; // o TSE costuma regerar o arquivo a cada poucos minutos durante a apuração

function useNow(ms = 15000) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return now;
}

const atras = (ms) => {
  const min = Math.max(0, Math.floor(ms / 60000));
  if (min < 1) return 'agora há pouco';
  if (min < 60) return `há ${min} min`;
  const h = Math.floor(min / 60);
  return min < 1440 ? `há ${h} h ${min % 60} min` : `há ${Math.floor(h / 24)} d`;
};

// Quando o TSE gerou o arquivo (dg/hg do JSON), não quando o app consultou. Fica âmbar se parou de atualizar.
export default function Frescor({ arq, final }) {
  const now = useNow();
  if (!arq?.hg) return null;
  const idade = arq.ts ? now - arq.ts : null;
  const parado = !final && idade != null && idade > STALE_MS;
  return (
    <span title="Data e hora em que o TSE gerou o arquivo de resultados (não é o horário da consulta)" style={{ color: parado ? 'var(--warn)' : undefined, fontWeight: parado ? 600 : undefined }}>
      Arquivo do TSE: {arq.dg.slice(0, 5)} às {arq.hg}{idade != null ? ` · ${atras(idade)}` : ''}{parado ? ' · sem novos dados' : ''}
    </span>
  );
}
