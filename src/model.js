import { UF, REGIONS, THEMES, LEG_M } from './data.js';
import { DATA_TURNO } from './tse/api.js';
import { num, pct, pct1, sgn, int, lead } from './format.js';

const bucketM = (m) => { const a = Math.abs(m); return a < 3 ? 0 : a < 8 ? 1 : a < 15 ? 2 : 3; };

// Junta os dois turnos por UF (dados vêm de src/tse/adapter.js).
export function buildStateData({ r1, r2 }) {
  const data = {};
  Object.keys(UF).forEach((uf) => {
    const [n, r] = UF[uf];
    const x1 = r1.ufs[uf];
    const x2 = r2.ufs[uf];
    data[uf] = { uf, n, r, el: x2.el, r1: x1, r2: x2 };
  });
  return data;
}

const fromRodada = (x) => ({ vA: x.vA, vB: x.vB, vO: x.vO, pA: x.a, pB: x.b, pO: x.o, ap: x.ap, started: x.started });

export function buildModel({ dark, sel: selUf, q, dados, hist, status }) {
  const { r1, r2 } = dados;
  const t = dark ? THEMES.dark : THEMES.light;
  const cur = (d) => d.r2;
  const nm = r2.cands;
  const ld = (m) => lead(m, nm.A.curto, nm.B.curto);
  const DATA = buildStateData(dados);

  const colorOf = (d) => {
    if (!cur(d).started) return { fill: t.none, ink: t.text, k: 0 };
    const m = cur(d).m; const k = bucketM(m);
    return { fill: m >= 0 ? t.sA[k] : t.sB[k], ink: t.ink[k], k };
  };

  // regiões: soma de votos e seções das UFs
  const agg = (list, key) => {
    let a = 0, b = 0, o = 0, st = 0, ts = 0;
    list.forEach((d) => { const x = d[key]; a += x.vA; b += x.vB; o += x.vO; st += x.st; ts += x.ts; });
    const tot = a + b + o;
    const p = (v) => (tot ? (v / tot) * 100 : 0);
    return { vA: a, vB: b, vO: o, pA: p(a), pB: p(b), pO: p(o), ap: ts ? (st / ts) * 100 : 0, started: tot > 0 };
  };

  const all = Object.values(DATA);
  const N1 = fromRodada(r1.br); // nacional vem do arquivo do Brasil (inclui exterior)
  const N2 = fromRodada(r2.br);
  const N = N2;
  const nat = {
    pA: pct(N.pA), pB: pct(N.pB), pO: pct1(N.pO), vA: int(N.vA), vB: int(N.vB),
    diff: int(Math.abs(N.vA - N.vB)), ap: pct(N.ap), apW: N.ap + '%', wA: N.pA + '%', wO: N.pO + '%',
    pA1: pct(N1.pA), pB1: pct(N1.pB), wA1: N1.pA + '%', wO1: N1.pO + '%',
    dA: N2.started ? sgn(N2.pA - N1.pA) + ' p.p.' : '—', dB: N2.started ? sgn(N2.pB - N1.pB) + ' p.p.' : '—',
    m1: ld(N1.pA - N1.pB), m2: N2.started ? ld(N2.pA - N2.pB) : '—',
    vazio: !N.started, apNum: N.ap,
    leadTxt: N2.started ? (N2.pA >= N2.pB ? nm.A.curto : nm.B.curto) + ' lidera por ' + num(Math.abs(N2.pA - N2.pB), 1) + ' p.p.' : 'Aguardando a apuração',
    raw: { pA: N.pA, pB: N.pB, vA: N.vA, vB: N.vB, diff: Math.abs(N.vA - N.vB), ap: N.ap },
    cmpRows: [
      { name: nm.A.curto, color: t.a, p1: pct1(N1.pA), p2: N2.started ? pct1(N2.pA) : '—', d: N2.started ? sgn(N2.pA - N1.pA) : '—', dInk: t.a },
      { name: nm.B.curto, color: t.b, p1: pct1(N1.pB), p2: N2.started ? pct1(N2.pB) : '—', d: N2.started ? sgn(N2.pB - N1.pB) : '—', dInk: t.b },
      { name: 'Outros', color: 'var(--o)', p1: pct1(N1.pO), p2: '—', d: N2.started ? sgn(-N1.pO) : '—', dInk: t.muted }
    ],
    aria: nm.A.nome + ' ' + pct(N.pA) + ', ' + nm.B.nome + ' ' + pct(N.pB)
  };

  // estado selecionado
  const s = DATA[selUf];
  const sc = cur(s);
  const cc = colorOf(s);
  const kChip = Math.max(1, cc.k);
  const chipPos = sc.m >= 0;
  const cands = [
    { name: nm.A.nome, color: t.a, ink: t.a, p: pct(sc.a), w: sc.a + '%', v: int(sc.vA), rp: sc.a, rv: sc.vA },
    { name: nm.B.nome, color: t.b, ink: t.b, p: pct(sc.b), w: sc.b + '%', v: int(sc.vB), rp: sc.b, rv: sc.vB }
  ];
  const dash = (ok, v) => (ok ? v : '—');
  const m1two = s.r1.a + s.r1.b ? ((s.r1.a - s.r1.b) / (s.r1.a + s.r1.b)) * 100 : 0; // vantagem do 1º turno só entre A e B
  const swing = s.r2.started ? s.r2.m - m1two : 0;
  const sel = {
    n: s.n,
    regionName: 'Região ' + (REGIONS.find((x) => x[0] === s.r) || [])[1],
    chip: !sc.started
      ? 'Sem votos apurados'
      : (sc.m >= 0 ? nm.A.curto : nm.B.curto) + ' lidera por ' + num(Math.abs(sc.m), 1) + ' p.p.',
    chipBg: sc.started ? (chipPos ? t.sA[kChip] : t.sB[kChip]) : t.none,
    chipInk: sc.started ? t.ink[kChip] : t.text,
    apTxt: pct(sc.ap), apW: sc.ap + '%', cands,
    cmpRows: [
      { name: nm.A.nome, color: t.a, p1: pct1(s.r1.a), p2: dash(s.r2.started, pct1(s.r2.a)), d: dash(s.r2.started, sgn(s.r2.a - s.r1.a)), dInk: t.a },
      { name: nm.B.nome, color: t.b, p1: pct1(s.r1.b), p2: dash(s.r2.started, pct1(s.r2.b)), d: dash(s.r2.started, sgn(s.r2.b - s.r1.b)), dInk: t.b },
      { name: 'Outros', color: 'var(--o)', p1: pct1(s.r1.o), p2: '—', d: dash(s.r2.started, sgn(-s.r1.o)), dInk: t.muted }
    ],
    w1A: s.r1.a + '%', w1O: s.r1.o + '%', w2A: s.r2.a + '%',
    m1: ld(s.r1.m), m2: dash(s.r2.started, ld(s.r2.m)),
    swingTxt: s.r2.started ? (swing >= 0 ? nm.A.curto : nm.B.curto) + ' ganhou ' + num(Math.abs(swing), 1) + ' p.p.' : '—',
    swingInk: swing >= 0 ? t.a : t.b,
    el: int(s.el),
    compTxt: dash(sc.started, pct1(100 - sc.ab)), bnTxt: dash(sc.started, pct1(sc.bn)), abTxt: dash(sc.started, pct1(sc.ab))
  };

  // lista
  const qq = (q || '').trim().toLowerCase();
  const rows = all
    .filter((d) => !qq || d.n.toLowerCase().includes(qq) || d.uf.toLowerCase().includes(qq))
    .sort((x, y) => y.el - x.el)
    .map((d) => {
      const x = cur(d); const c = colorOf(d);
      const pos = x.m >= 0;
      return {
        uf: d.uf, n: d.n, fill: c.fill, ink: c.ink, wA: x.a + '%', wO: x.o + '%', started: x.started,
        lead: !x.started ? '—' : ld(x.m).replace(' p.p.', ''),
        sub: '1º: ' + ld(d.r1.m).replace(' p.p.', ''),
        aria: d.n + ': ' + (x.started ? ld(x.m) + ' no 2º turno' : 'sem votos apurados') + '; ver no mapa',
        hasSub: true, leadColor: !x.started ? t.muted : pos ? t.a : t.b,
        bg: d.uf === selUf ? t.rowSel : 'transparent', selected: d.uf === selUf
      };
    });

  // regiões
  const regions = REGIONS.map(([id, name]) => {
    const list = all.filter((d) => d.r === id);
    const R1 = agg(list, 'r1'); const R2 = agg(list, 'r2');
    const R = R2;
    const sub = '1º turno: ' + nm.A.curto + ' ' + pct1(R1.pA) + ' × ' + nm.B.curto + ' ' + pct1(R1.pB) + ' · ' + pct1(R.ap) + ' apurado';
    return { name, pA: pct1(R.pA), pB: pct1(R.pB), wA: R.pA + '%', wO: R.pO + '%', sub, started: R.started };
  });

  // evolução da apuração: o TSE só publica o placar atual, a série é a que este navegador registrou
  const X = (p) => (40 + (p / 100) * 584).toFixed(1);
  const Y = (v) => (12 + ((60 - Math.max(40, Math.min(60, v))) / 20) * 160).toFixed(1);
  const linha = (lista, k) => lista.map((p) => X(p.ap) + ',' + Y(p[k])).join(' ');
  const pontos = N2.started ? hist : [];
  const fim = pontos[pontos.length - 1];
  const chart = {
    a: linha(pontos, 'pA'), b: linha(pontos, 'pB'),
    vazio: !fim, x: fim ? X(fim.ap) : '0', ya: fim ? Y(fim.pA) : '0', yb: fim ? Y(fim.pB) : '0'
  };
  const chart1 = { a: X(0) + ',' + Y(N1.pA) + ' ' + X(100) + ',' + Y(N1.pA), b: X(0) + ',' + Y(N1.pB) + ' ' + X(100) + ',' + Y(N1.pB) };
  const chartNote = !N2.started
      ? 'Aguardando o início da apuração do 2º turno.'
      : 'O TSE só publica o placar atual: o gráfico mostra o que esta sessão registrou desde ' + pct1(pontos[0].ap) + ' das seções apuradas.';

  // mapa: cor por UF
  const fillByUf = {};
  Object.values(DATA).forEach((d) => { fillByUf[d.uf] = colorOf(d); });

  const dot = status === 'erro' ? '#dc2626' : status === 'desatualizado' ? '#d97706' : N2.started && !r2.final ? '#16a34a' : t.muted;
  return {
    t, nat, sel, rows, regions, chart, chart1, chartNote, fillByUf,
    candA: nm.A, candB: nm.B,
    final: r2.final, started: N2.started, hist: pontos, n1: { pA: N1.pA, pB: N1.pB },
    statusLead: r2.final ? 'Apuração concluída' : N2.started ? 'Em apuração' : 'Aguardando início',
    winSide: N2.pA >= N2.pB ? 'a' : 'b',
    winTxt: (N2.pA >= N2.pB ? nm.A.nome + ' vence com ' + pct(N2.pA) : nm.B.nome + ' vence com ' + pct(N2.pB)),
    aviso: status === 'desatualizado' ? 'Sem resposta do TSE há alguns minutos. Exibindo o último resultado recebido.' : '',
    statusDot: dot,
    statusText: !N2.started
        ? '2º turno · ' + DATA_TURNO[2] + ' · aguardando início da apuração'
        : '2º turno · ' + DATA_TURNO[2] + ' · ' + (r2.final ? 'apuração encerrada' : 'atualizado às ' + r2.hg),
    modeHint: !N2.started ? 'Aguardando o início da apuração do 2º turno.' : r2.final ? 'Resultado final do 2º turno, comparado ao 1º turno.' : 'Apuração do 2º turno em andamento, comparada ao resultado final do 1º turno.',
    centerLabel: 'Seções totalizadas · 2º turno',
    mapTitle: 'Resultado por estado · 2º turno',
    mapSub: 'A cor mostra quem lidera e a vantagem em pontos percentuais. Clique num estado.',
    legLeft: nm.A.nome,
    legRight: nm.B.nome,
    legUnit: 'vantagem em p.p.',
    listUnit: 'vantagem em p.p. · 1º turno',
    chartTitle: 'Evolução da apuração · 2º turno',
    legendA: [3, 2, 1, 0].map((k) => ({ c: t.sA[k], label: LEG_M[k] })),
    legendB: [0, 1, 2, 3].map((k) => ({ c: t.sB[k], label: LEG_M[k] }))
  };
}
