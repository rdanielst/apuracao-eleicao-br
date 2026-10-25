import { useState } from 'react';

// Foto do candidato; se faltar ou não carregar, mostra as iniciais.
export default function Avatar({ src, ini, nome, color, soft, size = 72, hideMobile = false }) {
  const [erro, setErro] = useState(false);
  const cls = hideMobile ? 'nat-avatar' : undefined;
  const caixa = { width: size, height: size, borderRadius: '50%', border: `3px solid ${color}`, flex: 'none', overflow: 'hidden', background: soft };
  if (src && !erro) {
    return <img className={cls} src={src} alt={nome} onError={() => setErro(true)} style={{ ...caixa, objectFit: 'cover' }} />;
  }
  return (
    <div aria-hidden="true" className={cls} style={{ ...caixa, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.3, fontWeight: 800, color }}>{ini}</div>
  );
}
