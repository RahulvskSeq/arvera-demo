import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

import { products } from '../src/data/products.js'
import { projects } from '../src/data/projects.js'
import { journal } from '../src/data/journal.js'

/**
 * GitHub Pages has no rewrite rules, so a client-routed deep link would
 * normally have to fall back to 404.html — which works, but answers every
 * shared link with an HTTP 404 and a console error.
 *
 * Instead we write the SPA shell into a real directory for every route the
 * app can produce, so each canonical URL is served as a genuine 200.
 * 404.html stays as the catch-all for anything unexpected.
 */
const STATIC_ROUTES = [
  'shop',
  'projects',
  'inspiration',
  'about',
  'contact',
  'cart',
  'wishlist',
  'catalogue',
]

const routes = [
  ...STATIC_ROUTES,
  ...products.map((p) => `product/${p.id}`),
  ...projects.map((p) => `projects/${p.id}`),
  ...journal.map((a) => `journal/${a.id}`),
]

const shell = 'dist/index.html'
for (const route of routes) {
  const out = `dist/${route}/index.html`
  mkdirSync(dirname(out), { recursive: true })
  copyFileSync(shell, out)
}

copyFileSync(shell, 'dist/404.html')
writeFileSync('dist/.nojekyll', '')

console.log(`postbuild: prerendered ${routes.length} route shells + 404.html + .nojekyll`)
