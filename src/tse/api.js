import { UF } from '../data.js';

// Presidente, ciclo ele2026. O 2º turno é outra eleição no TSE (cdt2 em comum/config/ele-c.json).
const BASE = 'https://resultados.tse.jus.br/oficial/ele2026';
export const ELEICAO = { 1: '6257', 2: '6258' };
export const DATA_TURNO = { 1: '04/10/2026', 2: '25/10/2026' };
// Candidatos do 2º turno (número na urna): A = 13 (vermelho, à esquerda), B = 22 (azul, à direita). Nomes vêm do arquivo.
export const CAND = { A: '13', B: '22' };

const url = (ele, uf) => `${BASE}/${ele}/dados/${uf}/${uf}-c0001-e${ele.padStart(6, '0')}-u.json`;

async function buscar(ele, uf) {
  const r = await fetch(url(ele, uf), { cache: 'no-cache' });
  if (!r.ok) throw new Error(`TSE ${uf}: HTTP ${r.status}`);
  const j = await r.json();
  if (j.ele !== ele || j.carg?.[0]?.cd !== '1' || !j.s || !j.e || !j.v) throw new Error(`TSE ${uf}: formato inesperado`);
  return j;
}

// Nacional + 27 UFs. Se qualquer arquivo falhar, lança: o chamador mantém o último dado bom.
export async function buscarTudo(ele) {
  const chaves = ['br', ...Object.keys(UF).map((u) => u.toLowerCase())];
  const arquivos = await Promise.all(chaves.map((k) => buscar(ele, k)));
  return Object.fromEntries(chaves.map((k, i) => [k, arquivos[i]]));
}

// Governador (cargo 3): eleição estadual 6259 (1º turno) / 6260 (2º turno). Só há 2º turno em alguns estados.
export const GOV = { ele1: '6259', ele2: '6260', ufs: ['AC', 'AM', 'DF', 'ES', 'RN', 'TO'] };

async function buscarGov(ele, uf) {
  const k = uf.toLowerCase();
  const r = await fetch(`${BASE}/${ele}/dados/${k}/${k}-c0003-e${ele.padStart(6, '0')}-u.json`, { cache: 'no-cache' });
  if (!r.ok) throw new Error(`TSE gov ${uf}: HTTP ${r.status}`);
  const j = await r.json();
  if (j.carg?.[0]?.cd !== '3' || !j.s || !j.e || !j.v) throw new Error(`TSE gov ${uf}: formato inesperado`);
  return j;
}

export const buscarGovernador = (uf) => Promise.all([buscarGov(GOV.ele1, uf), buscarGov(GOV.ele2, uf)]);

// Foto do candidato (não vem no JSON de resultados): abr = 'br' ou a UF em minúsculas.
export const fotoUrl = (ele, abr, sq) => (sq ? `${BASE}/${ele}/fotos/${abr}/${sq}.jpeg` : '');
