import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * The production build is served from a project sub-path on GitHub Pages
 * (/arvera-demo/), while local dev runs at the root. Everything downstream
 * reads the sub-path from `import.meta.env.BASE_URL`, so changing it here is
 * the only edit needed to host the demo somewhere else.
 */
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/arvera-demo/' : '/',
  server: { port: 5180, host: true },
  build: { outDir: 'dist', assetsDir: 'assets' },
}))
