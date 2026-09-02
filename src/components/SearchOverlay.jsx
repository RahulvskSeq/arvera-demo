import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { X, Search, ArrowRight } from 'lucide-react'
import { searchProducts } from '../services/api'
import { products, formatINR } from '../data/products'
import { img } from '../data/images'
import { useStore } from '../context/StoreContext'
import { useScrollLock } from '../hooks/useScrollLock'

const EASE = [0.16, 1, 0.3, 1]
const SUGGESTIONS = ['Walnut', 'Marble', 'Soft close hinge', 'Marine plywood', 'Graphite', 'Handle']

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useScrollLock(searchOpen)

  useEffect(() => {
    if (searchOpen) {
      setQuery('')
      const t = setTimeout(() => inputRef.current?.focus(), 320)
      return () => clearTimeout(t)
    }
  }, [searchOpen])

  useEffect(() => {
    if (!searchOpen) return
    const onKey = (e) => e.key === 'Escape' && setSearchOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen, setSearchOpen])

  const results = useMemo(
    () => (query.trim() ? searchProducts(query, products).slice(0, 6) : []),
    [query]
  )

  const submit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setSearchOpen(false)
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[95]"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.button
            type="button"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/55 backdrop-blur-sm"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.5 }}
          />

          <motion.div
            className="relative max-h-[92vh] overflow-y-auto bg-paper"
            variants={{ hidden: { y: '-100%' }, visible: { y: 0 } }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="shell py-8 md:py-12">
              <div className="flex items-start justify-between gap-6">
                <form onSubmit={submit} className="flex-1">
                  <label htmlFor="site-search" className="eyebrow mb-5 block">
                    Search the catalogue
                  </label>
                  <div className="flex items-center gap-4 border-b border-char/20 pb-4 focus-within:border-char">
                    <Search size={20} strokeWidth={1.1} className="shrink-0 text-stone" />
                    <input
                      id="site-search"
                      ref={inputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Try “walnut”, “SC 418” or “soft close”"
                      autoComplete="off"
                      className="w-full bg-transparent font-display text-2xl font-light text-char outline-none placeholder:text-sand md:text-4xl"
                    />
                  </div>
                </form>

                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="mt-1 grid h-11 w-11 shrink-0 place-items-center border border-char/15 transition-colors duration-300 hover:border-char"
                >
                  <X size={18} strokeWidth={1.2} />
                </button>
              </div>

              {!query.trim() && (
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  <span className="mr-2 font-sans text-[10px] uppercase tracking-ultra text-stone">
                    Popular
                  </span>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="border border-char/15 px-4 py-2 font-sans text-[11px] font-light tracking-wide text-graphite transition-colors duration-300 hover:border-char hover:bg-char hover:text-cream"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {query.trim() && (
                <div className="mt-10">
                  {results.length === 0 ? (
                    <p className="body-lg">
                      No products match “{query}”. Try a finish, a colour or a product code.
                    </p>
                  ) : (
                    <>
                      <ul className="divide-y divide-char/10">
                        {results.map((p) => (
                          <li key={p.id}>
                            <Link
                              to={`/product/${p.id}`}
                              onClick={() => setSearchOpen(false)}
                              className="group flex items-center gap-5 py-4"
                            >
                              <div className="h-16 w-14 shrink-0 overflow-hidden bg-ivory">
                                <img
                                  src={img(p.images[0], 200)}
                                  alt=""
                                  className="h-full w-full object-cover transition-transform duration-700 ease-lux group-hover:scale-105"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-sans text-[10px] uppercase tracking-ultra text-stone">
                                  {p.code} · {p.category}
                                </p>
                                <p className="truncate font-display text-lg font-light text-char">
                                  {p.name}
                                </p>
                              </div>
                              <span className="shrink-0 font-sans text-sm text-char">
                                {formatINR(p.price)}
                              </span>
                              <ArrowRight
                                size={15}
                                strokeWidth={1.2}
                                className="hidden shrink-0 text-stone transition-transform duration-500 ease-lux group-hover:translate-x-1 sm:block"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={submit}
                        className="group mt-8 inline-flex items-center gap-3 font-sans text-[11px] font-medium uppercase tracking-ultra text-char"
                      >
                        <span className="link-sweep">View all results</span>
                        <ArrowRight
                          size={14}
                          strokeWidth={1.2}
                          className="transition-transform duration-500 ease-lux group-hover:translate-x-1.5"
                        />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
