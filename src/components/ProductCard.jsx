import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Eye } from 'lucide-react'
import { img } from '../data/images'
import { useStore } from '../context/StoreContext'
import WishlistButton from './WishlistButton'
import Price from './Price'

const EASE = [0.16, 1, 0.3, 1]

export default function ProductCard({ product, index = 0, priority = false }) {
  const { addToCart, setQuickView } = useStore()
  const [primary, secondary] = product.images

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay: Math.min(index, 5) * 0.06, ease: EASE }}
      className="group relative flex h-full flex-col"
    >
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-[4/5] overflow-hidden bg-ivory"
        aria-label={`${product.code} — ${product.name}`}
      >
        {/* Base image */}
        <img
          src={img(primary, 800)}
          alt={`${product.name} ${product.category.toLowerCase()} surface`}
          loading={priority ? 'eager' : 'lazy'}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.06]"
        />
        {/* Second image cross-fades in on hover */}
        {secondary && (
          <img
            src={img(secondary, 800)}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-[1.06] object-cover opacity-0 transition-all duration-[1100ms] ease-lux group-hover:scale-100 group-hover:opacity-100"
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-0 transition-opacity duration-700 ease-lux group-hover:opacity-100" />

        {/* Badges */}
        <div className="absolute left-0 top-0 flex flex-col items-start gap-px">
          {product.isNew && (
            <span className="bg-char px-3 py-1.5 font-sans text-[9px] font-medium uppercase tracking-ultra text-cream">
              New
            </span>
          )}
          {product.bestseller && (
            <span className="bg-bronze px-3 py-1.5 font-sans text-[9px] font-medium uppercase tracking-ultra text-white">
              Bestseller
            </span>
          )}
        </div>

        <span className="absolute right-0 top-0 md:-translate-y-1 md:opacity-0 md:transition-all md:duration-500 md:ease-lux md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <WishlistButton id={product.id} label={product.name} />
        </span>

        {/* Quick actions — always visible on touch, revealed on hover for pointer devices */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-0 gap-px opacity-100 transition-all duration-[600ms] ease-lux md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setQuickView(product)
            }}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap bg-paper/95 py-3.5 font-sans text-[9px] font-medium uppercase tracking-[0.16em] text-char backdrop-blur-sm transition-colors duration-300 hover:bg-char hover:text-cream md:text-[10px]"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye size={13} strokeWidth={1.3} />
            <span className="hidden sm:inline">Quick View</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              addToCart(product.id, 1)
            }}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap bg-char/95 py-3.5 font-sans text-[9px] font-medium uppercase tracking-[0.16em] text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-bronze md:text-[10px]"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={13} strokeWidth={1.3} />
            <span className="hidden sm:inline">Add to Cart</span>
          </button>
        </div>
      </Link>

      {/* Meta */}
      <div className="flex flex-1 flex-col pt-5">
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <span className="font-sans text-[10px] font-medium uppercase tracking-ultra text-stone">
            {product.code}
          </span>
          <span className="font-sans text-[10px] font-light uppercase tracking-wider2 text-stone">
            {product.finish}
          </span>
        </div>

        <h3 className="font-display text-xl font-light leading-tight text-char md:text-[22px]">
          <Link to={`/product/${product.id}`} className="link-sweep">
            {product.name}
          </Link>
        </h3>

        <Price product={product} className="mt-3" />
      </div>
    </motion.article>
  )
}
