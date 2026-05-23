import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['main.js'], // Archivos específicos a evaluar
      all: true // Fuerza a incluir archivos aunque no tengan tests
    },
    setupFiles: './Test/setup.js',
    globals: true,
  },
});