import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base = nome do repositório no GitHub Pages (rdanielst.github.io/apuracao-eleicao-br/)
export default defineConfig({ base: '/apuracao-eleicao-br/', plugins: [react()] });
