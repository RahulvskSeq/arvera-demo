import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, Minus, Plus, Truck, ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { useStore, FREE_DELIVERY_THRESHOLD } from '../context/StoreContext'
import { useScrollLock } from '../hooks/useScrollLock'
import { formatINR } from '../data/products'
import { img } from '../data/images'
import Button from './Button'

const EASE = [0.16, 1, 0.3, 1]

export default function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    lines,
    subtotal,
    savings,
    count,
    setQty,
    removeFromCart,
    freeDeliveryGap,
    deliveryProgress,
  } = useStore()

  useScrollLock(cartOpen)

  useEffect(() => {
    if (!cartOpen) return
    const onKey = (e) => e.key === 'Escape' && setCartOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cartOpen, setCartOpen])

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div className="fixed inset-0 z-[95]" initial="hidden" animate="visible" exit="hidden">
          <motion.button
            type="button"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/50 backdrop-blur-[2px]"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.45 }}
          />

          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-paper"
            variants={{ hidden: { x: '100%' }, visible: { x: 0 } }}
            transition={{ duration: 0.62, ease: EASE }}
          >
            {/* Head */}
            <div className="flex items-center justify-between border-b border-char/10 px-6 py-6 md:px-8">
              <div>
                <p className="eyebrow">Your Selection</p>
                <p className="mt-1.5 font-display text-2xl font-light">
                  Cart <span className="text-stone">({count})</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="grid h-10 w-10 place-items-center border border-char/15 transition-colors duration-300 hover:border-char"
              >
                <X size={17} strokeWidth={1.2} />
              </button>
            </div>

            {/* Free delivery progress */}
            <div className="border-b border-char/10 px-6 py-5 md:px-8">
              <div className="mb-3 flex items-center gap-2.5">
                <Truck size={15} strokeWidth={1.2} className="text-bronze" />
                <p className="font-sans text-[11px] font-light tracking-wide text-graphite">
                  {freeDeliveryGap > 0 ? (
                    <>
                      Add <strong className="font-medium text-char">{formatINR(freeDeliveryGap)}</strong> more for{' '}
                      <span className="uppercase tracking-wider2">free delivery</span>
                    </>
                  ) : (
                    <span className="uppercase tracking-wider2 text-bronze">
                      Free delivery unlocked
                    </span>
                  )}
                </p>
              </div>
              <div className="h-[3px] w-full overflow-hidden bg-ivory">
                <motion.div
                  className="h-full bg-bronze"
                  initial={false}
                  animate={{ width: `${deliveryProgress}%` }}
                  transition={{ duration: 0.7, ease: EASE }}
                />
              </div>
              <p className="mt-2 font-sans text-[10px] uppercase tracking-wider2 text-stone">
                Free delivery above {formatINR(FREE_DELIVERY_THRESHOLD)}
              </p>
            </div>

            {/* Lines */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-6 py-16 text-center">
                  <p className="font-display text-3xl font-light text-char">Your cart is empty</p>
                  <p className="body-sm max-w-xs">
                    Browse the catalogue and add a few surfaces to compare them side by side.
                  </p>
                  <Button variant="solid" size="sm" to="/shop" onClick={() => setCartOpen(false)}>
                    Explore Collection
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-char/10">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, transition: { duration: 0.35 } }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-4 py-5">
                          <Link
                            to={`/product/${line.product.id}`}
                            onClick={() => setCartOpen(false)}
                            className="h-24 w-20 shrink-0 overflow-hidden bg-ivory"
                          >
                            <img
                              src={img(line.product.images[0], 240)}
                              alt={line.product.name}
                              className="h-full w-full object-cover"
                            />
                          </Link>

                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="font-sans text-[10px] uppercase tracking-ultra text-stone">
                                  {line.product.code}
                                </p>
                                <Link
                                  to={`/product/${line.product.id}`}
                                  onClick={() => setCartOpen(false)}
                                  className="link-sweep mt-1 block truncate font-display text-lg font-light text-char"
                                >
                                  {line.product.name}
                                </Link>
                                <p className="mt-0.5 font-sans text-[11px] font-light text-stone">
                                  {line.product.finish} · {line.product.unit}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFromCart(line.id)}
                                aria-label={`Remove ${line.product.name} from cart`}
                                className="shrink-0 p-1 text-stone transition-colors duration-300 hover:text-char"
                              >
                                <X size={15} strokeWidth={1.2} />
                              </button>
                            </div>

                            <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                              <div className="flex items-center border border-char/15">
                                <QtyBtn
                                  onClick={() => setQty(line.id, line.qty - 1)}
                                  label={`Decrease quantity of ${line.product.name}`}
                                >
                                  <Minus size={13} strokeWidth={1.4} />
                                </QtyBtn>
                                <span className="w-9 text-center font-sans text-[13px] tabular-nums">
                                  {line.qty}
                                </span>
                                <QtyBtn
                                  onClick={() => setQty(line.id, line.qty + 1)}
                                  label={`Increase quantity of ${line.product.name}`}
                                >
                                  <Plus size={13} strokeWidth={1.4} />
                                </QtyBtn>
                              </div>
                              <div className="text-right">
                                <p className="font-sans text-[15px] text-char">
                                  {formatINR(line.lineTotal)}
                                </p>
                                {line.lineMrp > line.lineTotal && (
                                  <p className="font-sans text-[11px] font-light text-stone line-through">
                                    {formatINR(line.lineMrp)}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Foot */}
            {lines.length > 0 && (
              <div className="border-t border-char/10 px-6 py-6 md:px-8">
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow">Subtotal</span>
                  <span className="font-display text-3xl font-light leading-none">{formatINR(subtotal)}</span>
                </div>
                {savings > 0 && (
                  <p className="mt-1.5 text-right font-sans text-[11px] uppercase tracking-wider2 text-bronze">
                    You save {formatINR(savings)}
                  </p>
                )}
                <p className="mt-4 font-sans text-[11px] font-light leading-relaxed text-stone">
                  Taxes calculated at checkout. Dispatch in 3–5 working days across 120 cities.
                </p>

                <Button variant="solid" size="md" className="mt-6 w-full" to="/cart" onClick={() => setCartOpen(false)}>
                  Checkout
                  <ArrowRight size={14} strokeWidth={1.2} />
                </Button>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="mt-4 w-full font-sans text-[10px] uppercase tracking-ultra text-stone transition-colors duration-300 hover:text-char"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function QtyBtn({ children, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-9 w-9 place-items-center text-graphite transition-colors duration-300 hover:bg-char hover:text-cream"
    >
      {children}
    </button>
  )
}
