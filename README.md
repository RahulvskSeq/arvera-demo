# ARVÉRA — Materials That Define Spaces

**Live demo: https://rahulvskseq.github.io/arvera-demo/**

A premium client-presentation demo for a fictional Indian interior-materials
brand: laminates, plywood, MDF, hardware, and kitchen & wardrobe fittings.

Front-end only. No backend, no auth, no payment gateway — cart and wishlist
persist in `localStorage`.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5180

```bash
npm run build && npm run preview
```

## Deploying

The site is hosted on GitHub Pages from the `gh-pages` branch. To publish an
update after changing anything:

```bash
npm run deploy
```

That rebuilds and force-pushes `dist/` to `gh-pages`; the live URL refreshes
within a minute or two.

Because Pages serves the demo from a project sub-path, `vite.config.js` sets
`base` to `/arvera-demo/` for production builds, the router reads its
`basename` from `import.meta.env.BASE_URL`, and `scripts/postbuild.mjs`
prerenders a real directory for every route so deep links return a genuine
HTTP 200 rather than falling back to `404.html`. To host it somewhere else,
change `base` in `vite.config.js` — nothing else needs touching.

## Stack

React 18 · Vite 5 · React Router 6 · Tailwind CSS 3 · Framer Motion 11 · Lucide

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — hero, materials, collections, bestsellers, brand story, stats, catalogue, projects, journal |
| `/shop` | Listing with search, category chips, eight filter groups and four sorts |
| `/product/:id` | Gallery, buy box, spec tabs, room visualiser (laminates), related |
| `/projects` · `/projects/:id` | Architecture portfolio, filterable by sector |
| `/inspiration` · `/journal/:id` | Editorial journal |
| `/about` · `/contact` · `/catalogue` | Brand, enquiry form, catalogue |
| `/cart` · `/wishlist` | Persisted via `localStorage` |

The shop keeps `q`, `category` and `sort` in the query string, so any filtered
view is a shareable link.

## Structure

```
src/
  components/   Header, Footer, Hero, CategoryCard, ProductCard, ProductGrid,
                QuickView, CartDrawer, WishlistButton, CollectionSection,
                ProjectCard, JournalCard, RoomVisualiser, Button, …
  pages/        Home, Shop, ProductDetails, Projects, ProjectDetails,
                Inspiration, Article, About, Contact, Cart, Wishlist,
                Catalogue, NotFound
  data/         products.js, categories.js, collections.js, projects.js,
                journal.js, rooms.js, images.js
  services/     api.js — promise-based read layer over the data files
  context/      StoreContext.jsx — cart + wishlist + overlay state
  hooks/        useScrollLock, useMediaQuery, useDocumentTitle
```

`services/api.js` is the seam: it exposes `getProducts`, `queryProducts`,
`searchProducts`, `submitEnquiry` and friends as promises, so swapping the
local data files for a live catalogue API is a change in that one file.

## Catalogue PDF

`public/arvera-catalogue.pdf` is a four-page branded placeholder. Both
catalogue buttons read `CATALOGUE_URL` in `components/CatalogueSection.jsx` —
point it at a real file or CDN URL to go live.

## Imagery

Photography is hot-linked from the Unsplash CDN through `data/images.js`,
which is the single registry of image ids. Every id there has been fetched
and visually checked against the name it carries. `img(id, width)` builds the
sized, cropped URL, so pages request only the pixels they show.

## Content

Product codes, prices (₹), specifications, projects and journal articles are
plausible fiction written for the demo. The contact form resolves locally with
a reference number and posts nothing.
