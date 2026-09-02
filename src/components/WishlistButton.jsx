import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useStore } from '../context/StoreContext'

/** Heart toggle with a soft pop + ring pulse on activation. */
export default function WishlistButton({ id, className = '', size = 15, tone = 'light', label }) {
  const { inWishlist, toggleWishlist } = useStore()
  const active = inWishlist(id)

  const skin =
    tone === 'dark'
      ? 'bg-char/85 text-cream hover:bg-char'
      : 'bg-paper/90 text-char hover:bg-paper'

  return (
    <button
      type="button"
      aria-label={active ? `Remove ${label ?? 'item'} from wishlist` : `Add ${label ?? 'item'} to wishlist`}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleWishlist(id)
      }}
      className={`relative grid h-10 w-10 place-items-center backdrop-blur-sm transition-colors duration-300 ${skin} ${className}`}
    >
      <AnimatePresence>
        {active && (
          <motion.span
            key="ring"
            className="pointer-events-none absolute inset-0 border border-bronze"
            initial={{ opacity: 0.9, scale: 0.7 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </AnimatePresence>
      <motion.span
        animate={active ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        className="flex"
      >
        <Heart
          size={size}
          strokeWidth={1.3}
          className={active ? 'fill-bronze text-bronze' : ''}
        />
      </motion.span>
    </button>
  )
}
