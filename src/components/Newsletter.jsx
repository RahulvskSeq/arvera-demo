import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

export default function Newsletter({ tone = 'light' }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const dark = tone === 'dark'
  const line = dark ? 'border-cream/25 focus-within:border-cream' : 'border-char/20 focus-within:border-char'
  const text = dark ? 'text-cream placeholder:text-cream/35' : 'text-char placeholder:text-sand'

  return (
    <div>
      <p className={`eyebrow mb-4 ${dark ? 'text-cream/45' : ''}`}>Get design inspiration</p>
      <p className={`mb-6 font-display text-2xl font-light leading-snug ${dark ? 'text-cream' : 'text-char'}`}>
        New finishes, project stories and material notes — once a month.
      </p>

      <AnimatePresence mode="wait">
        {done ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-2.5 py-3 font-sans text-[12px] uppercase tracking-wider2 ${
              dark ? 'text-bronzeLight' : 'text-bronze'
            }`}
          >
            <Check size={15} strokeWidth={1.4} />
            Subscribed — welcome to Arvéra
          </motion.p>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={(e) => {
              e.preventDefault()
              if (email.trim()) setDone(true)
            }}
            className={`flex items-center gap-3 border-b pb-3 transition-colors duration-300 ${line}`}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              aria-label="Email address"
              className={`w-full bg-transparent font-sans text-[15px] font-light outline-none ${text}`}
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className={`group flex shrink-0 items-center gap-2 font-sans text-[10px] font-medium uppercase tracking-ultra ${
                dark ? 'text-cream' : 'text-char'
              }`}
            >
              Subscribe
              <ArrowRight
                size={14}
                strokeWidth={1.2}
                className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
              />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
