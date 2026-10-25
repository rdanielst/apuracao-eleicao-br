// uf: [nome, região]. Os números vêm do TSE (ver src/tse).
export const UF = {
  AC: ['Acre', 'N'],
  AL: ['Alagoas', 'NE'],
  AP: ['Amapá', 'N'],
  AM: ['Amazonas', 'N'],
  BA: ['Bahia', 'NE'],
  CE: ['Ceará', 'NE'],
  DF: ['Distrito Federal', 'CO'],
  ES: ['Espírito Santo', 'SE'],
  GO: ['Goiás', 'CO'],
  MA: ['Maranhão', 'NE'],
  MT: ['Mato Grosso', 'CO'],
  MS: ['Mato Grosso do Sul', 'CO'],
  MG: ['Minas Gerais', 'SE'],
  PA: ['Pará', 'N'],
  PB: ['Paraíba', 'NE'],
  PR: ['Paraná', 'S'],
  PE: ['Pernambuco', 'NE'],
  PI: ['Piauí', 'NE'],
  RJ: ['Rio de Janeiro', 'SE'],
  RN: ['Rio Grande do Norte', 'NE'],
  RS: ['Rio Grande do Sul', 'S'],
  RO: ['Rondônia', 'N'],
  RR: ['Roraima', 'N'],
  SC: ['Santa Catarina', 'S'],
  SP: ['São Paulo', 'SE'],
  SE: ['Sergipe', 'NE'],
  TO: ['Tocantins', 'N']
};

export const REGIONS = [
  ['N', 'Norte'], ['NE', 'Nordeste'], ['CO', 'Centro-Oeste'], ['SE', 'Sudeste'], ['S', 'Sul']
];

export const THEMES = {
  light: {
    a: '#c62828', b: '#1d4ed8', surface: '#ffffff', stroke: '#ffffff', sel: '#0f1720', muted: '#556070', none: '#d5d9df', text: '#0f1720',
    sA: ['#fde0e0', '#f4a3a3', '#e25555', '#b71c1c'],
    sB: ['#dbe6fd', '#93b4f8', '#4a7ff0', '#1d4ed8'],
    ink: ['#0f1720', '#0f1720', '#0f1720', '#ffffff'],
    rowSel: '#eef0f3', segOn: '#0f1720', segOnInk: '#ffffff'
  },
  dark: {
    a: '#ff6b6b', b: '#5b9bff', surface: '#161b22', stroke: '#0d1117', sel: '#ffffff', muted: '#9aa5b3', none: '#2a323d', text: '#e8edf3',
    sA: ['#4a2529', '#842f33', '#b83a3a', '#ff8a8a'],
    sB: ['#22324f', '#2b4f8f', '#3366c2', '#7cb0ff'],
    ink: ['#ffffff', '#ffffff', '#ffffff', '#0d1117'],
    rowSel: '#1d242e', segOn: '#e8edf3', segOnInk: '#0d1117'
  }
};

export const LEG_M = ['até 3', '3–8', '8–15', '15+'];
export const LEG_S = ['até 1', '1–3', '3–5', '5+'];
