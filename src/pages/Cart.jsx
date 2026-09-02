import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, X, Truck, ShieldCheck, RotateCcw } from 'lucide-react'

import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'
import { useStore, FREE_DELIVERY_THRESHOLD } from '../context/StoreContext'
import { formatINR, bestsellers } from '../data/products'
import { img } from '../data/images'

const EASE = [0.16, 1, 0.3, 1]

export default function Cart() {
  useDocumentTitle('Cart')
  const {
    lines,
    subtotal,
    savings,
    count,
    setQty,
    removeFromCart,
    clearCart,
    freeDeliveryGap,
    deliveryProgress,
  } = useStore()

  const delivery = freeDeliveryGap > 0 && subtotal > 0 ? 850 : 0
  const total = subtotal + delivery

  return (
    <PageTransition>
      <section className="bg-paper pb-10 pt-32 md:pb-14 md:pt-44">
        <div className="shell">
          <p className="eyebrow mb-6">
            {count === 0 ? 'Nothing selected yet' : `${count} ${count === 1 ? 'item' : 'items'}`}
          </p>
          <h1 className="h-xl text-char">Your cart</h1>
        </div>
      </section>

      {lines.length === 0 ? (
        <>
          <section className="bg-paper pb-20 md:pb-28">
            <div className="shell">
              <div className="border-y border-char/10 py-20 text-center md:py-28">
                <p className="h-md mx-auto max-w-md text-char">
                  Your cart is empty — but the catalogue is not.
                </p>
                <p className="body-lg mx-auto mt-5 max-w-md">
                  Add a few surfaces and boards to compare pricing, or order free A4 samples first.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button to="/shop" variant="solid" size="lg">
                    Explore Collection
                  </Button>
                  <Button to="/wishlist" variant="outline" size="lg">
                    View Wishlist
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-cream py-20 md:py-28">
            <div className="shell">
              <p className="eyebrow mb-10">Start with a bestseller</p>
              <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8">
                {bestsellers.slice(0, 4).map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="bg-paper pb-20 md:pb-28">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Lines */}
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="flex items-center justify-between border-b border-char/10 pb-4">
                  <span className="eyebrow">Item</span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="font-sans text-[10px] uppercase tracking-ultra text-stone transition-colors hover:text-char"
                  >
                    Clear cart
                  </button>
                </div>

                <ul>
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, transition: { duration: 0.35 } }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden border-b border-char/10"
                      >
                        <div className="flex gap-5 py-7 md:gap-8">
                          <Link
                            to={`/product/${line.product.id}`}
                            className="aspect-[4/5] w-24 shrink-0 overflow-hidden bg-ivory md:w-32"
                          >
                            <img
                              src={img(line.product.images[0], 300)}
                              alt={line.product.name}
                              className="h-full w-full object-cover"
                            />
                          </Link>

                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <p className="font-sans text-[10px] uppercase tracking-ultra text-stone">
                                  {line.product.code} · {line.product.category}
                                </p>
                                <Link
                                  to={`/product/${line.product.id}`}
                                  className="link-sweep mt-2 block font-display text-2xl font-light text-char md:text-[28px]"
                                >
                                  {line.product.name}
                                </Link>
                                <p className="mt-2 font-sans text-[12px] font-light text-stone">
                                  {line.product.finish} · {line.product.thickness} · {line.product.unit}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFromCart(line.id)}
                                aria-label={`Remove ${line.product.name}`}
                                className="shrink-0 p-1 text-stone transition-colors hover:text-char"
                              >
                                <X size={17} strokeWidth={1.2} />
                              </button>
                            </div>

                            <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
                              <div className="flex items-center border border-char/15">
                                <button
                                  type="button"
                                  onClick={() => setQty(line.id, line.qty - 1)}
                                  aria-label="Decrease quantity"
                                  className="grid h-11 w-11 place-items-center transition-colors duration-300 hover:bg-char hover:text-cream"
                                >
                                  <Minus size={13} strokeWidth={1.4} />
                                </button>
                                <span className="w-10 text-center font-sans text-sm tabular-nums">
                                  {line.qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setQty(line.id, line.qty + 1)}
                                  aria-label="Increase quantity"
                                  className="grid h-11 w-11 place-items-center transition-colors duration-300 hover:bg-char hover:text-cream"
                                >
                                  <Plus size={13} strokeWidth={1.4} />
                                </button>
                              </div>

                              <div className="text-right">
                                <p className="font-display text-2xl font-light text-char">
                                  {formatINR(line.lineTotal)}
                                </p>
                                {line.lineMrp > line.lineTotal && (
                                  <p className="font-sans text-[12px] font-light text-stone line-through">
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

                <Link
                  to="/shop"
                  className="link-sweep mt-8 inline-block font-sans text-[10px] font-medium uppercase tracking-ultra text-char"
                >
                  Continue browsing
                </Link>
              </div>

              {/* Summary */}
              <aside className="lg:col-span-5 xl:col-span-4">
                <div className="sticky top-32 border border-char/10 bg-cream p-7 md:p-9">
                  <p className="eyebrow mb-7">Order summary</p>

                  <dl className="space-y-4 border-b border-char/10 pb-6">
                    <Row label={`Subtotal (${count} items)`} value={formatINR(subtotal)} />
                    {savings > 0 && (
                      <Row label="Discount applied" value={`− ${formatINR(savings)}`} accent />
                    )}
                    <Row
                      label="Delivery"
                      value={delivery === 0 ? 'Free' : formatINR(delivery)}
                      accent={delivery === 0}
                    />
                  </dl>

                  <div className="flex items-baseline justify-between pb-8 pt-6">
                    <span className="font-sans text-[11px] uppercase tracking-ultra text-char">
                      Total
                    </span>
                    <span className="font-display text-4xl font-light text-char">
                      {formatINR(total)}
                    </span>
                  </div>

                  {/* Free delivery progress */}
                  <div className="border-t border-char/10 pt-6">
                    <div className="mb-3 flex items-center gap-2.5">
                      <Truck size={14} strokeWidth={1.2} className="text-bronze" />
                      <p className="font-sans text-[11px] font-light text-graphite">
                        {freeDeliveryGap > 0 ? (
                          <>
                            Add{' '}
                            <strong className="font-medium text-char">
                              {formatINR(freeDeliveryGap)}
                            </strong>{' '}
                            more for <span className="uppercase tracking-wider2">free delivery</span>
                          </>
                        ) : (
                          <span className="uppercase tracking-wider2 text-bronze">
                            Free delivery unlocked
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="h-[3px] w-full overflow-hidden bg-sand/60">
                      <motion.div
                        className="h-full bg-bronze"
                        initial={false}
                        animate={{ width: `${deliveryProgress}%` }}
                        transition={{ duration: 0.7, ease: EASE }}
                      />
                    </div>
                    <p className="mt-2 font-sans text-[10px] uppercase tracking-wider2 text-stone">
                      Free above {formatINR(FREE_DELIVERY_THRESHOLD)}
                    </p>
                  </div>

                  <Button variant="solid" size="lg" className="mt-7 w-full" to="/contact?intent=quote">
                    Checkout
                  </Button>
                  <p className="mt-4 text-center font-sans text-[11px] font-light leading-relaxed text-stone">
                    Demonstration checkout — your enquiry routes to our sales desk.
                  </p>

                  <ul className="mt-8 space-y-3.5 border-t border-char/10 pt-7">
                    {[
                      [Truck, 'Dispatch in 3–5 working days, 120 cities'],
                      [ShieldCheck, 'Manufacturer warranty on every reference'],
                      [RotateCcw, '7-day replacement on transit damage'],
                    ].map(([Icon, text]) => (
                      <li key={text} className="flex gap-3">
                        <Icon size={14} strokeWidth={1.2} className="mt-0.5 shrink-0 text-bronze" />
                        <span className="font-sans text-[12px] font-light leading-snug text-graphite">
                          {text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  )
}

function Row({ label, value, accent }) {
  return (
    <div className="flex items-baseline justify-between gap-6">
      <dt className="font-sans text-[13px] font-light text-graphite">{label}</dt>
      <dd className={`font-sans text-[14px] ${accent ? 'text-bronze' : 'text-char'}`}>{value}</dd>
    </div>
  )
}
