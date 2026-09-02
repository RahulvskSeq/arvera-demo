import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { img, IMG } from '../data/images'
import Button from './Button'
import { useMediaQuery } from '../hooks/useMediaQuery'

const EASE = [0.16, 1, 0.3, 1]

/* The headline is set to break by hand, so it needs a different split on
   narrow screens rather than relying on wrapping. */
const HEADLINE_WIDE = ['Materials that', 'define spaces.']
const HEADLINE_NARROW = ['Materials', 'that define', 'spaces.']

export default function Hero() {
  const isWide = useMediaQuery('(min-width: 768px)')
  const headline = isWide ? HEADLINE_WIDE : HEADLINE_NARROW
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  /* Parallax: the image drifts slower than the copy and dims as it leaves. */
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '48%'])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const veil = useTransform(scrollYProgress, [0, 1], [0.34, 0.7])

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink">
      {/* Cinematic image with slow ken-burns + scroll parallax */}
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <motion.img
          src={img(IMG.heroLiving, 2200)}
          alt="A warm modern living space with timber ceilings and stone surfaces at dusk"
          className="h-full w-full object-cover object-center"
          initial={{ scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3.2, ease: EASE }}
        />
      </motion.div>

      {/* Tonal veil so type always clears the photograph */}
      <motion.div className="absolute inset-0 bg-ink" style={{ opacity: veil }} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/45" />

      {/* Copy */}
      <motion.div
        className="relative flex h-full flex-col justify-end"
        style={{ y: copyY, opacity: copyOpacity }}
      >
        <div className="shell pb-12 md:pb-20 lg:pb-24">
          <motion.p
            className="eyebrow mb-7 text-cream/60 md:mb-9"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: EASE }}
          >
            Laminates · Plywood · Hardware · MDF
          </motion.p>

          <h1 className="h-display text-cream">
            {headline.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '106%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.35, delay: 0.5 + i * 0.11, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <div className="mt-8 flex flex-col gap-7 md:mt-14 md:gap-9 lg:flex-row lg:items-end lg:justify-between">
            <motion.p
              className="max-w-md font-sans text-[15px] font-light leading-relaxed text-cream/70 md:text-[17px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.95, ease: EASE }}
            >
              Premium surfaces, plywood and hardware for spaces designed to last.
            </motion.p>

            <motion.div
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.1, ease: EASE }}
            >
              <Button to="/shop" variant="light" size="lg">
                Explore Collection
              </Button>
              <Button to="/catalogue" variant="outlineLight" size="lg">
                View Catalogue
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#materials"
        aria-label="Scroll to materials"
        className="absolute bottom-7 right-5 hidden items-center gap-3 font-sans text-[9px] uppercase tracking-ultra text-cream/50 transition-colors duration-300 hover:text-cream lg:right-14 lg:flex xl:right-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{ opacity: copyOpacity }}
      >
        Scroll
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} strokeWidth={1.2} />
        </motion.span>
      </motion.a>
    </section>
  )
}
