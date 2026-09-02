import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Maximize2 } from 'lucide-react'
import { roomScenes, surfaceTints } from '../data/rooms'
import { img } from '../data/images'

const EASE = [0.16, 1, 0.3, 1]

/**
 * "See it in your space" — swaps the interior photograph per room and
 * grades it toward the selected decor's tone, with the physical swatch
 * pinned alongside for reference.
 */
export default function RoomVisualiser({ product }) {
  const [active, setActive] = useState(roomScenes[0])
  const tint = surfaceTints[product.color] ?? '#8A6435'

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="shell">
        <div className="mb-9 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">Visualiser</p>
            <h2 className="h-lg text-char">See it in your space</h2>
          </div>
          <p className="max-w-sm font-sans text-[13px] font-light leading-relaxed text-stone">
            An indicative rendering of {product.code} — {product.name} across five common
            applications. Order a free A4 sample to judge the finish in your own light.
          </p>
        </div>

        {/* Room selector */}
        <div className="no-scrollbar -mx-5 mb-6 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          {roomScenes.map((scene) => (
            <button
              key={scene.id}
              type="button"
              onClick={() => setActive(scene)}
              aria-pressed={active.id === scene.id}
              className={`shrink-0 whitespace-nowrap border px-6 py-3 font-sans text-[10px] font-medium uppercase tracking-ultra transition-all duration-500 ease-lux ${
                active.id === scene.id
                  ? 'border-char bg-char text-cream'
                  : 'border-char/15 text-graphite hover:border-char/50 hover:text-char'
              }`}
            >
              {scene.label}
            </button>
          ))}
        </div>

        {/* Scene */}
        <div className="relative aspect-[4/3] overflow-hidden bg-ivory md:aspect-[16/9]">
          <AnimatePresence mode="wait">
            <motion.img
              key={active.id}
              src={img(active.image, 1800)}
              alt={`${product.name} shown in a ${active.label.toLowerCase()} setting`}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          </AnimatePresence>

          {/* Tone grade toward the selected decor */}
          <motion.div
            key={`${product.id}-tint`}
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{ backgroundColor: tint }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.42 }}
            transition={{ duration: 1, ease: EASE }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />

          {/* Swatch card */}
          <motion.div
            layout
            className="absolute bottom-4 left-4 flex items-center gap-4 bg-paper p-3 shadow-[0_20px_50px_-25px_rgba(16,15,14,0.6)] md:bottom-6 md:left-6 md:p-4"
          >
            <div className="h-16 w-14 shrink-0 overflow-hidden md:h-20 md:w-16">
              <img src={img(product.images[0], 200)} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="pr-2">
              <p className="font-sans text-[9px] uppercase tracking-ultra text-stone">
                {product.code} · {product.finish}
              </p>
              <p className="mt-1 font-display text-lg font-light leading-tight text-char md:text-xl">
                {product.name}
              </p>
              <p className="mt-1 font-sans text-[10px] uppercase tracking-wider2 text-stone">
                {active.caption}
              </p>
            </div>
          </motion.div>

          <span className="absolute right-4 top-4 flex items-center gap-2 bg-ink/45 px-3 py-2 font-sans text-[9px] uppercase tracking-ultra text-cream backdrop-blur-sm md:right-6 md:top-6">
            <Maximize2 size={12} strokeWidth={1.3} />
            {active.label}
          </span>
        </div>

        <p className="mt-4 font-sans text-[11px] font-light leading-relaxed text-stone">
          Visualisations are indicative. Colour reproduction varies by screen — always confirm
          against a physical sample before ordering.
        </p>
      </div>
    </section>
  )
}
