import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, ArrowRight, Minus, Plus } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { useScrollLock } from '../hooks/useScrollLock'
import { img } from '../data/images'
import Price from './Price'
import StarRating from './StarRating'
import WishlistButton from './WishlistButton'
import Button from './Button'

const EASE = [0.16, 1, 0.3, 1]

export default function QuickView() {
  const { quickView, setQuickView, addToCart } = useStore()
  const [active, setActive] = useState(0)
  const [qty, setQty] = useState(1)
  const open = Boolean(quickView)

  useScrollLock(open)

  useEffect(() => {
    if (open) {
      setActive(0)
      setQty(1)
    }
  }, [open, quickView?.id])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setQuickView(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setQuickView])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.button
            type="button"
            aria-label="Close quick view"
            onClick={() => setQuickView(null)}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/60 backdrop-blur-[3px]"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.4 }}
          />

          <motion.div
            role="dialog"
            aria-label={`${quickView.name} quick view`}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto bg-paper shadow-2xl"
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.985 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <button
              type="button"
              onClick={() => setQuickView(null)}
              aria-label="Close quick view"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center bg-paper/90 text-char backdrop-blur transition-colors duration-300 hover:bg-char hover:text-cream"
            >
              <X size={17} strokeWidth={1.2} />
            </button>

            <div className="grid gap-0 md:grid-cols-2">
              {/* Gallery */}
              <div className="bg-ivory">
                <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:h-full md:min-h-[520px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={active}
                      src={img(quickView.images[active], 900)}
                      alt={quickView.name}
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.65, ease: EASE }}
                    />
                  </AnimatePresence>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {quickView.images.map((im, i) => (
                      <button
                        key={im}
                        type="button"
                        onClick={() => setActive(i)}
                        aria-label={`View image ${i + 1}`}
                        className={`h-12 w-10 overflow-hidden border transition-all duration-300 ${
                          i === active ? 'border-paper opacity-100' : 'border-transparent opacity-60 hover:opacity-90'
                        }`}
                      >
                        <img src={img(im, 120)} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detail */}
              <div className="flex flex-col p-6 sm:p-9 md:p-11">
                <p className="eyebrow">
                  {quickView.category} · {quickView.code}
                </p>
                <h2 className="mt-4 font-display text-4xl font-light leading-none text-char md:text-[44px]">
                  {quickView.name}
                </h2>

                <StarRating
                  value={quickView.rating}
                  reviews={quickView.reviews}
                  showValue
                  className="mt-4"
                />

                <Price product={quickView} size="lg" className="mt-6" />

                <p className="body-lg mt-6 line-clamp-4">{quickView.description}</p>

                <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-char/10 py-6">
                  <Spec label="Finish" value={quickView.finish} />
                  <Spec label="Colour" value={quickView.color} />
                  <Spec label="Thickness" value={quickView.thickness} />
                  <Spec label="Availability" value={quickView.availability} />
                </dl>

                <div className="mt-7 flex items-center gap-4">
                  <div className="flex items-center border border-char/15">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="grid h-12 w-11 place-items-center transition-colors duration-300 hover:bg-char hover:text-cream"
                    >
                      <Minus size={14} strokeWidth={1.4} />
                    </button>
                    <span className="w-10 text-center font-sans text-sm tabular-nums">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.min(99, q + 1))}
                      aria-label="Increase quantity"
                      className="grid h-12 w-11 place-items-center transition-colors duration-300 hover:bg-char hover:text-cream"
                    >
                      <Plus size={14} strokeWidth={1.4} />
                    </button>
                  </div>
                  <WishlistButton
                    id={quickView.id}
                    label={quickView.name}
                    className="h-12 w-12 border border-char/15 bg-transparent hover:bg-ivory"
                    size={17}
                  />
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Button
                    variant="solid"
                    className="flex-1"
                    onClick={() => {
                      addToCart(quickView.id, qty)
                      setQuickView(null)
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    as={Link}
                    to={`/product/${quickView.id}`}
                    onClick={() => setQuickView(null)}
                  >
                    View Details
                    <ArrowRight size={14} strokeWidth={1.2} />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Spec({ label, value }) {
  return (
    <div>
      <dt className="font-sans text-[9.5px] uppercase tracking-ultra text-stone">{label}</dt>
      <dd className="mt-1.5 font-sans text-[13px] font-light text-char">{value}</dd>
    </div>
  )
}
