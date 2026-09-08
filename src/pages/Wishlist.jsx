import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Heart } from 'lucide-react'

import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'
import Price from '../components/Price'
import { useStore } from '../context/StoreContext'
import { img } from '../data/images'
import { bestsellers } from '../data/products'

const EASE = [0.16, 1, 0.3, 1]

export default function Wishlist() {
  useDocumentTitle('Wishlist')
  const { wishlistProducts, removeFromWishlist, moveToCart } = useStore()

  return (
    <PageTransition>
      <section className="bg-paper pb-10 pt-32 md:pb-14 md:pt-44">
        <div className="shell">
          <p className="eyebrow mb-6">
            {wishlistProducts.length === 0
              ? 'Nothing saved yet'
              : `${wishlistProducts.length} saved ${wishlistProducts.length === 1 ? 'material' : 'materials'}`}
          </p>
          <h1 className="h-xl text-char">Wishlist</h1>
        </div>
      </section>

      {wishlistProducts.length === 0 ? (
        <>
          <section className="bg-paper pb-20 md:pb-28">
            <div className="shell">
              <div className="flex flex-col items-center border-y border-char/10 py-20 text-center md:py-28">
                <span className="grid h-14 w-14 place-items-center border border-char/15 text-stone">
                  <Heart size={20} strokeWidth={1.2} />
                </span>
                <p className="h-md mt-8 max-w-md text-char">Save what catches your eye as you browse.</p>
                <p className="body-lg mt-5 max-w-md">
                  Tap the heart on any product to keep it here — your list is stored on this device,
                  so it survives a refresh.
                </p>
                <div className="mt-10">
                  <Button to="/shop" variant="solid" size="lg">
                    Explore Collection
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-cream py-20 md:py-28">
            <div className="shell">
              <p className="eyebrow mb-10">Popular right now</p>
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
            <ul className="border-t border-char/10">
              <AnimatePresence initial={false}>
                {wishlistProducts.map((p) => (
                  <motion.li
                    key={p.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0, transition: { duration: 0.35 } }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="overflow-hidden border-b border-char/10"
                  >
                    <div className="flex flex-col gap-5 py-7 sm:flex-row sm:gap-8">
                      <Link
                        to={`/product/${p.id}`}
                        className="aspect-[4/5] w-28 shrink-0 overflow-hidden bg-ivory sm:w-36"
                      >
                        <img
                          src={img(p.images[0], 300)}
                          alt={p.name}
                          className="h-full w-full object-cover transition-transform duration-700 ease-lux hover:scale-105"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-sans text-[10px] uppercase tracking-ultra text-stone">
                              {p.code} · {p.category}
                            </p>
                            <Link
                              to={`/product/${p.id}`}
                              className="link-sweep mt-2 block font-display text-2xl font-light text-char md:text-[30px]"
                            >
                              {p.name}
                            </Link>
                            <p className="mt-2 font-sans text-[12px] font-light text-stone">
                              {p.finish} · {p.color}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromWishlist(p.id)}
                            aria-label={`Remove ${p.name} from wishlist`}
                            className="shrink-0 p-1 text-stone transition-colors hover:text-char"
                          >
                            <X size={17} strokeWidth={1.2} />
                          </button>
                        </div>

                        <div className="mt-auto flex flex-wrap items-end justify-between gap-5 pt-6">
                          <Price product={p} />
                          <div className="flex gap-3">
                            <Button variant="solid" size="sm" onClick={() => moveToCart(p.id)}>
                              <ShoppingBag size={13} strokeWidth={1.3} />
                              Move to Cart
                            </Button>
                            <Button variant="outline" size="sm" to={`/product/${p.id}`}>
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button to="/shop" variant="outline">
                Continue browsing
              </Button>
              <Button to="/cart" variant="solid">
                Go to cart
              </Button>
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  )
}
