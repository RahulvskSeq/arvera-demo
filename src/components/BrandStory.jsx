import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { img, IMG } from '../data/images'
import { RevealLines, Reveal } from './Reveal'
import Button from './Button'

export default function BrandStory() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.02])

  return (
    <section ref={ref} className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-ink py-28 md:py-36">
      <motion.div className="absolute inset-0 -z-10" style={{ y, scale }}>
        <img
          src={img(IMG.barDark, 2000)}
          alt="A dark timber-ribbed kitchen and bar interior"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-ink/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/75 via-ink/35 to-transparent" />

      <div className="shell relative">
        <div className="max-w-4xl">
          <Reveal y={14}>
            <p className="eyebrow mb-8 text-cream/50">Our purpose</p>
          </Reveal>

          <h2 className="h-xl text-cream">
            <RevealLines lines={['Built for', 'better spaces.']} />
          </h2>

          <Reveal delay={0.15}>
            <p className="mt-10 max-w-xl font-sans text-[16px] font-light leading-[1.85] text-cream/70 md:text-[18px]">
              Every surface tells a story. Every detail shapes the experience. Arvéra brings
              together premium surfaces, structure and hardware to help create spaces that are
              beautiful, functional and built to last.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-11">
              <Button to="/about" variant="outlineLight" size="lg">
                Discover Arvéra
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
