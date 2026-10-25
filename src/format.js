export const num = (x, d) => x.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
export const pct = (x) => num(x, 2) + '%';
export const pct1 = (x) => num(x, 1) + '%';
export const sgn = (x) => (x >= 0 ? '+' : '−') + num(Math.abs(x), 1);
export const int = (x) => Math.round(x).toLocaleString('pt-BR');
export const lead = (m, a = 'A', b = 'B') => (m >= 0 ? a : b) + ' +' + num(Math.abs(m), 1) + ' p.p.';
