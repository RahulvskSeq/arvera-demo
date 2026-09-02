import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const WHATSAPP_URL =
  'https://wa.me/918040001234?text=' +
  encodeURIComponent("Hello Arvéra — I'd like to know more about your materials.")

/**
 * Floating WhatsApp entry point. It stays hidden over the first screen so it
 * never covers a hero call to action, reads as a compact circle on touch
 * devices, and expands into a labelled pill on hover at desktop widths.
 */
export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Arvéra on WhatsApp"
          initial={{ opacity: 0, scale: 0.8, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 14 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed bottom-5 right-5 z-[70] flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-char text-cream shadow-[0_18px_40px_-18px_rgba(16,15,14,0.7)] transition-colors duration-500 ease-lux hover:bg-bronze md:bottom-8 md:right-8 md:h-auto md:w-auto md:justify-start md:rounded-none md:px-4 md:py-3.5"
        >
          <MessageCircle size={19} strokeWidth={1.3} className="shrink-0" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap font-sans text-[10px] font-medium uppercase tracking-ultra opacity-0 transition-all duration-[600ms] ease-lux group-hover:ml-3 group-hover:max-w-[180px] group-hover:opacity-100">
            Chat on WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
