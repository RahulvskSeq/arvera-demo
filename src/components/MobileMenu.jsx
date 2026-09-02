import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, ArrowUpRight } from 'lucide-react'
import { NAV_LINKS, SECONDARY_LINKS } from './navLinks'
import { useScrollLock } from '../hooks/useScrollLock'
import Logo from './Logo'

const EASE = [0.16, 1, 0.3, 1]

export default function MobileMenu({ open, onClose }) {
  useScrollLock(open)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          className="fixed inset-0 z-[90] flex flex-col bg-ink text-cream"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <div className="flex items-center justify-between px-5 py-6 sm:px-8">
            <Logo onClick={onClose} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center border border-cream/20 transition-colors duration-300 hover:border-cream/60"
            >
              <X size={18} strokeWidth={1.2} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 pb-10 pt-4 sm:px-8">
            <ul>
              {NAV_LINKS.map((link, i) => (
                <li key={link.label} className="overflow-hidden border-b border-cream/10">
                  <motion.div
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.14 + i * 0.055, ease: EASE }}
                  >
                    <Link
                      to={link.to}
                      onClick={onClose}
                      className="group flex items-baseline justify-between py-4"
                    >
                      <span className="font-display text-[34px] font-light uppercase leading-none tracking-tight sm:text-[42px]">
                        {link.label}
                      </span>
                      <span className="font-sans text-[10px] font-light tracking-ultra text-cream/35">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
              className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4"
            >
              {SECONDARY_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={onClose}
                  className="font-sans text-[11px] font-light uppercase tracking-wider2 text-cream/60 transition-colors duration-300 hover:text-cream"
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
              className="mt-14 border-t border-cream/10 pt-8"
            >
              <p className="eyebrow mb-4 text-cream/40">Experience Centre</p>
              <p className="font-display text-2xl font-light leading-snug text-cream/85">
                No. 14, Lavelle Road
                <br />
                Bengaluru 560001
              </p>
              <a
                href="tel:+918040001234"
                className="mt-6 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-ultra text-bronzeLight"
              >
                +91 80 4000 1234
                <ArrowUpRight size={14} strokeWidth={1.2} />
              </a>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
