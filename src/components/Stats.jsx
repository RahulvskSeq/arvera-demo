import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 15, suffix: '+', label: 'Years of experience' },
  { value: 5000, suffix: '+', label: 'Products' },
  { value: 25000, suffix: '+', label: 'Customers' },
  { value: 120, suffix: '+', label: 'Cities' },
]

/** Counts from 0 to `to` once the block scrolls into view. */
function useCountUp(to, active, duration = 1700) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(to * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, active, duration])
  return value
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section ref={ref} className="bg-paper py-20 md:py-28">
      <div className="shell">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-y border-char/10 py-14 md:grid-cols-4 md:gap-8 md:py-20">
          {STATS.map((s, i) => (
            <Stat key={s.label} {...s} active={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Stat({ value, suffix, label, active, index }) {
  const n = useCountUp(value, active)
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className="text-center md:border-r md:border-char/10 md:last:border-r-0"
    >
      <p className="font-display font-light leading-none tracking-tight text-char" style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}>
        {n.toLocaleString('en-IN')}
        <span className="text-bronze">{suffix}</span>
      </p>
      <p className="mt-4 font-sans text-[10px] font-light uppercase tracking-ultra text-stone md:text-[11px]">
        {label}
      </p>
    </motion.div>
  )
}
