import { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { collections } from '../data/collections'
import { img } from '../data/images'
import SectionHeading from './SectionHeading'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Horizontally scrolling collection rail.
 * Native scroll-snap does the work (so touch/trackpad feel right); the
 * arrows and progress bar are layered on top for pointer devices.
 */
export default function CollectionSection() {
  const railRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [edges, setEdges] = useState({ start: true, end: false })

  const measure = useCallback(() => {
    const el = railRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 })
  }, [])

  useEffect(() => {
    const el = railRef.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      el.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  const scrollBy = (dir) => {
    const el = railRef.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.72, 620), behavior: 'smooth' })
  }

  return (
    <section className="bg-cream py-24 md:py-32 lg:py-40">
      <div className="shell">
        <SectionHeading
          eyebrow="Collections"
          lines={['The new', 'material', 'language']}
          standfirst="Six directions we keep returning to — each developed with our mills over a full season, and each available across laminate, edge banding and matched hardware."
          linkTo="/shop"
          linkLabel="Browse all surfaces"
        />
      </div>

      {/* Rail */}
      <div className="relative mt-14 md:mt-20">
        <div
          ref={railRef}
          className="no-scrollbar snap-x-lux flex gap-5 overflow-x-auto px-5 pb-2 scroll-pl-5 sm:px-8 sm:scroll-pl-8 md:gap-8 lg:px-14 lg:scroll-pl-14 xl:px-20 xl:scroll-pl-20"
        >
          {collections.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.95, delay: Math.min(i, 4) * 0.07, ease: EASE }}
              className="snap-item group w-[78vw] shrink-0 sm:w-[52vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw]"
            >
              <Link to={`/shop?q=${encodeURIComponent(c.name.split(' ')[0])}`} className="block">
                <div className="media aspect-[3/4] overflow-hidden bg-ivory">
                  <img
                    src={img(c.image, 900)}
                    alt={`${c.name} collection`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1500ms] ease-lux group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-[900ms] group-hover:bg-ink/20" />
                </div>

                <div className="flex items-start justify-between gap-6 pt-5">
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-ultra text-stone">
                      {c.index} / {c.finish}
                    </p>
                    <h3 className="mt-2.5 font-display text-2xl font-light uppercase leading-none tracking-tight text-char md:text-[30px]">
                      <span className="link-sweep">{c.name}</span>
                    </h3>
                    <p className="mt-3 max-w-xs font-sans text-[13px] font-light leading-relaxed text-graphite">
                      {c.description}
                    </p>
                  </div>
                  <span className="shrink-0 pt-1 font-sans text-[10px] uppercase tracking-ultra text-stone">
                    {c.count}
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}

          {/* Trailing spacer so the last card can rest clear of the edge */}
          <div className="w-1 shrink-0 sm:w-4" aria-hidden="true" />
        </div>

        {/* Controls */}
        <div className="shell mt-10 flex items-center gap-6 md:mt-12">
          <div className="flex gap-px">
            <RailButton onClick={() => scrollBy(-1)} disabled={edges.start} label="Previous collections">
              <ArrowLeft size={16} strokeWidth={1.2} />
            </RailButton>
            <RailButton onClick={() => scrollBy(1)} disabled={edges.end} label="Next collections">
              <ArrowRight size={16} strokeWidth={1.2} />
            </RailButton>
          </div>

          <div className="relative h-px flex-1 bg-char/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-char"
              style={{ width: '22%' }}
              animate={{ x: `${progress * (100 / 0.22 - 100)}%` }}
              transition={{ duration: 0.25, ease: 'linear' }}
            />
          </div>

          <span className="hidden font-sans text-[10px] uppercase tracking-ultra text-stone sm:block">
            Drag to explore
          </span>
        </div>
      </div>
    </section>
  )
}

function RailButton({ children, onClick, disabled, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid h-12 w-12 place-items-center border border-char/15 text-char transition-all duration-400 ease-lux hover:border-char hover:bg-char hover:text-cream disabled:pointer-events-none disabled:opacity-25"
    >
      {children}
    </button>
  )
}
