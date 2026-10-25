import { UF } from '../data.js';
import { CAND } from './api.js';

// O TSE manda números como texto; alguns zeros vêm com vírgula ("0,00").
const n = (x) => Number.parseFloat(String(x).replace(',', '.')) || 0;

const candidatos = (j) =>
  (j.carg?.[0]?.agr ?? []).flatMap((a) => a.par ?? []).flatMap((p) => (p.cand ?? []).map((c) => ({ ...c, sg: p.sg })));

// Uma abrangência (Brasil ou UF) em uma eleição.
function rodada(j) {
  const cs = candidatos(j);
  const votos = (num) => n(cs.find((c) => String(c.n) === num)?.vap);
  const vv = n(j.v.vv);
  const vA = votos(CAND.A);
  const vB = votos(CAND.B);
  const vO = Math.max(vv - vA - vB, 0);
  const pc = (x) => (vv ? (x / vv) * 100 : 0);
  return {
    vv, vA, vB, vO, a: pc(vA), b: pc(vB), o: pc(vO), m: pc(vA) - pc(vB),
    ap: n(j.s.pstn), st: n(j.s.st), ts: n(j.s.ts),
    el: n(j.e.te), bn: n(j.v.ptvnn), ab: n(j.e.pan),
    started: vv > 0
  };
}

const titulo = (s) => s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

function candidato(j, num, rotulo) {
  const c = candidatos(j).find((x) => String(x.n) === num);
  const nome = c ? titulo(c.nmu) : rotulo;
  const ini = nome.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return { n: num, nome, curto: nome.split(' ')[0], sg: c?.sg ?? '', ini, sq: c?.sqcand ?? '' };
}

// raw: { br, ac, al, ... } como devolvido por buscarTudo.
export function adaptar(raw) {
  const { br } = raw;
  return {
    final: br.tf === 's', idg: br.idg, dg: br.dg, hg: br.hg,
    br: rodada(br),
    ufs: Object.fromEntries(Object.keys(UF).map((uf) => [uf, rodada(raw[uf.toLowerCase()])])),
    cands: { A: candidato(br, CAND.A, 'Candidato A'), B: candidato(br, CAND.B, 'Candidato B') }
  };
}

// Muda quando o TSE publica uma nova geração de qualquer arquivo.
export const assinatura = (raw) => Object.values(raw).map((j) => j.idg).join(',');

// Governador de uma UF: candidatos do 2º turno, com o % do 1º turno de cada um para comparação.
export function adaptarGov([j1, j2]) {
  const vv1 = n(j1.v.vv);
  const vv2 = n(j2.v.vv);
  const v1 = Object.fromEntries(candidatos(j1).map((c) => [String(c.n), n(c.vap)]));
  const pc = (v, t) => (t ? (v / t) * 100 : 0);
  const cands = candidatos(j2)
    .sort((a, b) => n(a.seq) - n(b.seq))
    .map((c) => {
      const v = n(c.vap);
      const p1 = pc(v1[String(c.n)] ?? 0, vv1);
      const p2 = pc(v, vv2);
      return { n: c.n, sq: c.sqcand, nome: titulo(c.nmu), sg: c.sg, v, p2, p1, d: p2 - p1 };
    });
  return {
    final: j2.tf === 's', hg: j2.hg, started: vv2 > 0, ap: n(j2.s.pstn), vv: vv2,
    el: n(j2.e.te), bn: n(j2.v.ptvnn), ab: n(j2.e.pan), cands
  };
}
