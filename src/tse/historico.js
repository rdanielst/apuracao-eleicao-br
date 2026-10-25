// Série do gráfico de evolução: o TSE só publica o placar atual, então a série é a desta sessão (sem armazenamento).
// Um ponto por % de seções apuradas; um ponto novo descarta os de apuração igual ou maior (reset/retificação).
export function registrar(hist, br) {
  if (!br.started) return hist;
  return [...hist.filter((p) => p.ap < br.ap), { ap: br.ap, pA: br.a, pB: br.b }].slice(-2000);
}
