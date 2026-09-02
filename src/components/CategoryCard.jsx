import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { img } from '../data/images'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Large editorial category block. `className` is where the parent grid
 * applies its stagger offset.
 */
export default function CategoryCard({ category, index = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay: Math.min(index, 3) * 0.08, ease: EASE }}
      className={`group relative ${className}`}
    >
      <Link
        to={`/shop?category=${encodeURIComponent(
          category.name === 'Kitchen' || category.name === 'Wardrobe' ? 'Hardware' : category.name
        )}${category.name === 'Kitchen' ? '&q=kitchen' : category.name === 'Wardrobe' ? '&q=wardrobe' : ''}`}
        className="block"
      >
        <div className="media relative aspect-[4/5] overflow-hidden bg-ivory lg:aspect-[3/4]">
          <img
            src={img(category.image, 1000)}
            alt={`${category.name} — ${category.tagline}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1500ms] ease-lux group-hover:scale-[1.08]"
          />

          {/* Darkening veil on hover */}
          <div className="absolute inset-0 bg-ink/25 transition-all duration-[900ms] ease-lux group-hover:bg-ink/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

          <span className="absolute left-5 top-5 font-sans text-[10px] font-light tracking-ultra text-cream/55 md:left-7 md:top-7">
            0{index + 1}
          </span>

          <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center border border-cream/25 text-cream transition-all duration-[700ms] ease-lux group-hover:border-cream group-hover:bg-cream group-hover:text-char md:right-7 md:top-7">
            <ArrowUpRight
              size={15}
              strokeWidth={1.2}
              className="transition-transform duration-[600ms] ease-lux group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>

          {/* Text block: tagline slides up on hover, blurb reveals beneath */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
            <h3 className="font-display text-3xl font-light uppercase leading-none tracking-tight text-cream md:text-[42px]">
              {category.name}
            </h3>
            <p className="mt-2.5 font-sans text-[12px] font-light tracking-wide text-cream/75 md:text-[13px]">
              {category.tagline}
            </p>

            <div className="grid grid-rows-[0fr] overflow-hidden transition-all duration-[800ms] ease-lux group-hover:grid-rows-[1fr]">
              <p className="min-h-0 pt-0 font-sans text-[12px] font-light leading-relaxed text-cream/55 opacity-0 transition-opacity duration-500 group-hover:pt-3.5 group-hover:opacity-100 md:text-[13px]">
                {category.blurb}
              </p>
            </div>

            <p className="mt-3.5 font-sans text-[10px] uppercase tracking-ultra text-cream/40">
              {category.count} products
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
