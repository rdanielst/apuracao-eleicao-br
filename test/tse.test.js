import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { UF } from '../src/data.js';
import { adaptar, adaptarGov, assinatura, tsArquivo } from '../src/tse/adapter.js';
import { registrar } from '../src/tse/historico.js';
import { buildModel } from '../src/model.js';

const ler = (f) => JSON.parse(readFileSync(new URL('./fixtures/' + f, import.meta.url), 'utf8'));
// todas as UFs usam o arquivo de SP; o importante aqui é o formato
const completo = (br, uf) => ({ br, ...Object.fromEntries(Object.keys(UF).map((u) => [u.toLowerCase(), uf])) });

const turno1 = adaptar(completo(ler('br-1t.json'), ler('sp-1t.json')));
const turno2zerado = adaptar(completo(ler('br-2t-zerado.json'), ler('br-2t-zerado.json')));

test('1º turno final: percentuais fecham e candidatos vêm do arquivo', () => {
  const { br } = turno1;
  assert.equal(turno1.final, true);
  assert.equal(br.started, true);
  assert.equal(br.ap, 100);
  assert.ok(Math.abs(br.a + br.b + br.o - 100) < 1e-9);
  assert.equal(br.vA + br.vB + br.vO, br.vv);
  assert.equal(turno1.cands.A.n, '13');
  assert.equal(turno1.cands.B.n, '22');
  assert.ok(turno1.cands.A.nome && turno1.cands.A.sg);
});

test('2º turno ainda zerado: sem votos e sem NaN', () => {
  const { br } = turno2zerado;
  assert.equal(turno2zerado.final, false);
  assert.equal(br.started, false);
  for (const v of Object.values(br)) assert.ok(Number.isFinite(Number(v)), String(v));
});

test('assinatura muda quando uma geração muda', () => {
  const a = completo(ler('br-1t.json'), ler('sp-1t.json'));
  const b = structuredClone(a);
  assert.equal(assinatura(a), assinatura(b));
  b.sp.idg = '999';
  assert.notEqual(assinatura(a), assinatura(b));
});

test('histórico: só cresce, não duplica e ignora apuração sem votos', () => {
  const ponto = (ap) => ({ started: true, ap, a: 50, b: 50 });
  let h = [];
  h = registrar(h, ponto(10));
  h = registrar(h, ponto(20));
  h = registrar(h, ponto(20));
  assert.deepEqual(h.map((p) => p.ap), [10, 20]);
  h = registrar(h, ponto(15)); // retificação: descarta o que vier depois
  assert.deepEqual(h.map((p) => p.ap), [10, 15]);
  assert.equal(registrar(h, { started: false, ap: 0 }), h);
});

const semLixo = (m) => {
  const achados = [];
  const andar = (v, caminho) => {
    if (typeof v === 'string' && /NaN|Infinity|undefined/.test(v)) achados.push(caminho + ' = ' + v);
    else if (typeof v === 'number' && !Number.isFinite(v)) achados.push(caminho + ' = ' + v);
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) andar(x, caminho + '.' + k);
  };
  andar(m, 'm');
  return achados;
};

{
  const round = '2';
  test(`modelo com 2º turno zerado: sem NaN`, () => {
    const m = buildModel({ dark: false, sel: 'SP', q: '', dados: { r1: turno1, r2: turno2zerado }, hist: [], status: 'ok' });
    assert.deepEqual(semLixo(m), []);
  });
  test(`modelo com 2º turno em andamento: sem NaN e gráfico com pontos`, () => {
    const hist = registrar(registrar([], { started: true, ap: 30, a: 52, b: 48 }), { started: true, ap: 60, a: 51, b: 49 });
    const m = buildModel({ dark: true, sel: 'BA', q: 'ba', dados: { r1: turno1, r2: { ...turno1, final: false } }, hist, status: 'desatualizado' });
    assert.deepEqual(semLixo(m), []);
    assert.equal(m.chart.a.split(' ').length, 2);
    assert.ok(m.aviso);
  });
}

test('governador: candidatos do 2º turno com % do 1º e sem NaN', () => {
  const cand = (n, nmu, vap, seq) => ({ n, nmu, vap, seq });
  const j = (vv, cs) => ({ tf: 'n', hg: '12:00:00', v: { vv, ptvnn: '4,00' }, s: { pstn: '50,00' }, e: { te: '1000', pan: '20,00' }, carg: [{ cd: '3', agr: [{ par: [{ sg: 'X', cand: cs }] }] }] });
  const g = adaptarGov([j('100', [cand('10', 'ANA SILVA', '60', '1'), cand('20', 'BETO', '30', '2')]), j('0,00', [cand('10', 'ANA SILVA', '0', '1'), cand('20', 'BETO', '0', '2')])]);
  assert.equal(g.started, false);
  assert.equal(g.cands[0].nome, 'Ana Silva');
  assert.equal(g.cands[0].p1, 60);
  assert.deepEqual(semLixo(g), []);
});

test('hora do arquivo do TSE: dg/hg em Brasília viram o instante UTC certo', () => {
  assert.equal(new Date(tsArquivo('25/10/2026', '17:06:31')).toISOString(), '2026-10-25T20:06:31.000Z');
  assert.equal(tsArquivo('', ''), null);
});
