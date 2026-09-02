import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { img } from '../data/images'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Shared dark hero for interior pages — full-bleed image, breadcrumb,
 * masked headline and optional standfirst.
 */
export default function PageHero({
  image,
  eyebrow,
  lines,
  standfirst,
  breadcrumb,
  height = 'md',
  children,
}) {
  const h =
    height === 'lg'
      ? 'min-h-[78svh]'
      : height === 'sm'
        ? 'min-h-[46svh]'
        : 'min-h-[62svh]'

  return (
    <section className={`relative isolate flex items-end overflow-hidden bg-ink ${h} pb-14 pt-32 md:pb-20 md:pt-40`}>
      <motion.img
        src={img(image, 2000)}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        initial={{ scale: 1.14 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.6, ease: EASE }}
      />
      {/* An even veil plus a corner wash: dark enough under the copy at the
          lower left, light enough that the photograph still reads top right. */}
      <div className="absolute inset-0 -z-10 bg-ink/35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-ink/65 via-ink/25 to-transparent" />

      <div className="shell relative w-full">
        {breadcrumb && (
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="mb-8 flex flex-wrap items-center gap-2 font-sans text-[10px] uppercase tracking-ultra text-cream/45"
          >
            {breadcrumb.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2">
                {i > 0 && <span className="opacity-40">/</span>}
                {c.to ? (
                  <Link to={c.to} className="transition-colors duration-300 hover:text-cream">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-cream/80">{c.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {eyebrow && (
          <motion.p
            className="eyebrow mb-6 text-cream/55"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease: EASE }}
          >
            {eyebrow}
          </motion.p>
        )}

        <h1 className="h-xl max-w-5xl text-cream">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '106%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.25, delay: 0.38 + i * 0.1, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {standfirst && (
          <motion.p
            className="mt-8 max-w-xl font-sans text-[15px] font-light leading-relaxed text-cream/65 md:text-[17px]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: EASE }}
          >
            {standfirst}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease: EASE }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
