import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react'

import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import ProductGrid from '../components/ProductGrid'
import FilterPanel from '../components/FilterPanel'
import Button from '../components/Button'
import { Reveal } from '../components/Reveal'
import { useScrollLock } from '../hooks/useScrollLock'
import { useMediaQuery } from '../hooks/useMediaQuery'

import { queryProducts, SORTS, facets, priceBounds, searchProducts } from '../services/api'
import { products } from '../data/products'
import { categories } from '../data/categories'

const FILTER_KEYS = ['category', 'brand', 'finish', 'color', 'material', 'thickness', 'availability']
const EASE = [0.16, 1, 0.3, 1]

const emptyFilters = () => Object.fromEntries(FILTER_KEYS.map((k) => [k, []]))

export default function Shop() {
  useDocumentTitle('Shop All Materials')
  const [params, setParams] = useSearchParams()

  const [query, setQuery] = useState(params.get('q') ?? '')
  const [sort, setSort] = useState(params.get('sort') ?? 'featured')
  const [maxPrice, setMaxPrice] = useState(priceBounds.max)
  const [filters, setFilters] = useState(() => {
    const f = emptyFilters()
    const c = params.get('category')
    if (c && facets.category.includes(c)) f.category = [c]
    return f
  })
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  /* The drawer is lg:hidden. Without this, resizing past the breakpoint while
     it is open would hide it and leave the page scroll-locked with no way out. */
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  useEffect(() => {
    if (isDesktop) setDrawerOpen(false)
  }, [isDesktop])

  useScrollLock(drawerOpen && !isDesktop)

  /* Keep the URL in step with the visible state so links stay shareable. */
  useEffect(() => {
    const next = new URLSearchParams()
    if (query.trim()) next.set('q', query.trim())
    if (filters.category.length === 1) next.set('category', filters.category[0])
    if (sort !== 'featured') next.set('sort', sort)
    setParams(next, { replace: true })
  }, [query, filters.category, sort, setParams])

  /* Respond to nav links that change the query string from outside. */
  useEffect(() => {
    const c = params.get('category')
    const q = params.get('q') ?? ''
    setFilters((f) =>
      c && facets.category.includes(c) && !f.category.includes(c) ? { ...f, category: [c] } : f
    )
    setQuery((prev) => (q !== prev && params.get('q') !== null ? q : prev))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get('category'), params.get('q')])

  const results = useMemo(
    () => queryProducts({ query, ...filters, maxPrice, sort }),
    [query, filters, maxPrice, sort]
  )

  /* Facet counts reflect the current text search so numbers stay honest. */
  const counts = useMemo(() => {
    const pool = searchProducts(query, products)
    const out = {}
    for (const key of FILTER_KEYS) {
      out[key] = {}
      for (const v of facets[key]) out[key][v] = pool.filter((p) => p[key] === v).length
    }
    return out
  }, [query])

  const activeCount =
    FILTER_KEYS.reduce((n, k) => n + filters[k].length, 0) + (maxPrice < priceBounds.max ? 1 : 0)

  const toggle = (key, value) =>
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }))

  const reset = () => {
    setFilters(emptyFilters())
    setMaxPrice(priceBounds.max)
    setQuery('')
  }

  const panel = (
    <FilterPanel
      filters={filters}
      onToggle={toggle}
      maxPrice={maxPrice}
      onPrice={setMaxPrice}
      counts={counts}
    />
  )

  return (
    <PageTransition>
      {/* ---------------- Masthead ---------------- */}
      <section className="bg-paper pb-10 pt-32 md:pb-14 md:pt-44">
        <div className="shell">
          <Reveal y={16}>
            <p className="eyebrow mb-6">
              {products.length} references · Laminates, plywood, MDF & hardware
            </p>
          </Reveal>
          <h1 className="h-xl text-char">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '106%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: EASE }}
              >
                Shop all materials
              </motion.span>
            </span>
          </h1>

          {/* Search */}
          <Reveal delay={0.12}>
            <div className="mt-10 flex items-center gap-4 border-b border-char/20 pb-4 focus-within:border-char md:mt-14 md:max-w-2xl">
              <Search size={19} strokeWidth={1.1} className="shrink-0 text-stone" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, code, finish or colour"
                aria-label="Search products"
                className="w-full bg-transparent font-sans text-[15px] font-light text-char outline-none placeholder:text-sand md:text-lg"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="shrink-0 text-stone transition-colors hover:text-char"
                >
                  <X size={16} strokeWidth={1.3} />
                </button>
              )}
            </div>
          </Reveal>

          {/* Category chips */}
          <Reveal delay={0.18}>
            <div className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
              <Chip
                active={filters.category.length === 0}
                onClick={() => setFilters((f) => ({ ...f, category: [] }))}
              >
                All
              </Chip>
              {facets.category.map((c) => (
                <Chip key={c} active={filters.category.includes(c)} onClick={() => toggle('category', c)}>
                  {c}
                </Chip>
              ))}
              {categories
                .filter((c) => ['kitchen', 'wardrobe'].includes(c.id))
                .map((c) => (
                  <Chip
                    key={c.id}
                    active={query.toLowerCase() === c.id}
                    onClick={() => setQuery(query.toLowerCase() === c.id ? '' : c.id)}
                  >
                    {c.name}
                  </Chip>
                ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Toolbar ---------------- */}
      <div className="sticky top-[72px] z-[60] border-y border-char/10 bg-paper/95 backdrop-blur-xl md:top-[76px]">
        <div className="shell flex items-center justify-between gap-4 py-3.5">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2.5 font-sans text-[10px] font-medium uppercase tracking-ultra text-char lg:hidden"
            >
              <SlidersHorizontal size={14} strokeWidth={1.3} />
              Filters
              {activeCount > 0 && (
                <span className="grid h-4 min-w-4 place-items-center rounded-full bg-bronze px-1 text-[9px] leading-none text-white">
                  {activeCount}
                </span>
              )}
            </button>
            <p className="hidden font-sans text-[11px] font-light tracking-wide text-stone lg:block">
              {results.length} {results.length === 1 ? 'product' : 'products'}
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="ml-4 uppercase tracking-ultra text-char underline-offset-4 hover:underline"
                >
                  Clear all
                </button>
              )}
            </p>
            <p className="font-sans text-[11px] font-light tracking-wide text-stone lg:hidden">
              {results.length} items
            </p>
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSortOpen((o) => !o)}
              aria-expanded={sortOpen}
              className="flex items-center gap-2.5 font-sans text-[10px] font-medium uppercase tracking-ultra text-char"
            >
              <span className="hidden sm:inline text-stone">Sort:</span>
              {SORTS.find((s) => s.id === sort)?.label}
              <ChevronDown
                size={14}
                strokeWidth={1.3}
                className={`transition-transform duration-400 ${sortOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {sortOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close sort menu"
                    onClick={() => setSortOpen(false)}
                    className="fixed inset-0 z-10 cursor-default"
                  />
                  <motion.ul
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="absolute right-0 top-full z-20 mt-3 w-56 border border-char/10 bg-paper py-2 shadow-[0_24px_60px_-30px_rgba(16,15,14,0.5)]"
                  >
                    {SORTS.map((s) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setSort(s.id)
                            setSortOpen(false)
                          }}
                          className="flex w-full items-center justify-between px-5 py-2.5 text-left font-sans text-[12px] font-light text-graphite transition-colors duration-200 hover:bg-ivory hover:text-char"
                        >
                          {s.label}
                          {sort === s.id && <Check size={13} strokeWidth={1.6} className="text-bronze" />}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ---------------- Grid + sidebar ---------------- */}
      <section className="bg-paper py-12 md:py-16">
        <div className="shell">
          <div className="flex gap-12 xl:gap-16">
            <aside className="hidden w-64 shrink-0 lg:block xl:w-72">
              <div className="sticky top-[140px] max-h-[calc(100svh-180px)] overflow-y-auto pr-2">
                <div className="mb-5 flex items-baseline justify-between">
                  <p className="font-sans text-[10px] font-medium uppercase tracking-ultra text-char">
                    Refine
                  </p>
                  {activeCount > 0 && (
                    <button
                      type="button"
                      onClick={reset}
                      className="font-sans text-[10px] uppercase tracking-wider2 text-stone transition-colors hover:text-char"
                    >
                      Reset
                    </button>
                  )}
                </div>
                {panel}
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              {results.length === 0 ? (
                <div className="flex flex-col items-start gap-6 py-20">
                  <p className="h-md text-char">No materials match those filters.</p>
                  <p className="body-lg max-w-md">
                    Try a wider price range, or clear the filters to see the whole catalogue.
                  </p>
                  <Button variant="solid" size="sm" onClick={reset}>
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <ProductGrid products={results} columns="wide" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Mobile filter drawer ---------------- */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div className="fixed inset-0 z-[92] lg:hidden" initial="hidden" animate="visible" exit="hidden">
            <motion.button
              type="button"
              aria-label="Close filters"
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-ink/50"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={{ duration: 0.35 }}
            />
            <motion.div
              className="absolute inset-x-0 bottom-0 flex max-h-[88svh] flex-col bg-paper"
              variants={{ hidden: { y: '100%' }, visible: { y: 0 } }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <div className="flex items-center justify-between border-b border-char/10 px-5 py-5">
                <p className="font-display text-2xl font-light">Filters</p>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close filters"
                  className="grid h-10 w-10 place-items-center border border-char/15"
                >
                  <X size={17} strokeWidth={1.2} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-4">{panel}</div>
              <div className="flex gap-3 border-t border-char/10 px-5 py-4">
                <Button variant="outline" size="sm" className="flex-1" onClick={reset}>
                  Reset
                </Button>
                <Button variant="solid" size="sm" className="flex-1" onClick={() => setDrawerOpen(false)}>
                  Show {results.length} results
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap border px-5 py-2.5 font-sans text-[10.5px] font-medium uppercase tracking-wider2 transition-all duration-400 ease-lux ${
        active
          ? 'border-char bg-char text-cream'
          : 'border-char/15 text-graphite hover:border-char/50 hover:text-char'
      }`}
    >
      {children}
    </button>
  )
}
