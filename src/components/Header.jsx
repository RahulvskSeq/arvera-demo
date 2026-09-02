import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion'
import { Search, Heart, ShoppingBag, Menu } from 'lucide-react'
import { NAV_LINKS } from './navLinks'
import { useStore } from '../context/StoreContext'
import MobileMenu from './MobileMenu'
import { useMediaQuery } from '../hooks/useMediaQuery'
import Logo from './Logo'

/** Routes that open with a full-bleed dark hero, so the bar can start transparent. */
const HERO_ROUTES = ['/', '/about', '/projects', '/inspiration', '/contact', '/journal']

const isHeroRoute = (pathname) =>
  HERO_ROUTES.some((r) => (r === '/' ? pathname === '/' : pathname.startsWith(r)))

export default function Header() {
  const { pathname, search } = useLocation()
  const { count, wishlist, setSearchOpen, setCartOpen, pulse } = useStore()
  const { scrollY } = useScroll()

  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  /* Kept in a ref: this changes every scroll frame and must not re-render. */
  const lastY = useRef(0)

  const overHero = isHeroRoute(pathname) && !scrolled

  useMotionValueEvent(scrollY, 'change', (y) => {
    /* Both setters take booleans, so React bails out when nothing changed —
       a scroll frame only costs a render when the bar actually flips state. */
    setScrolled(y > 40)
    setHidden(y > 480 && y > lastY.current + 6)
    lastY.current = y
  })

  useEffect(() => {
    setScrolled(window.scrollY > 40)
  }, [pathname])

  /* Close the full-screen menu if the viewport grows into the desktop nav,
     so its scroll lock can never outlive the overlay. */
  const isWide = useMediaQuery('(min-width: 1280px)')
  useEffect(() => {
    if (isWide) setMenuOpen(false)
  }, [isWide])

  /* A route change should always dismiss the menu. */
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname, search])

  const currentPath = pathname + search

  const barTone = overHero
    ? 'bg-transparent text-cream'
    : 'bg-paper/95 text-char shadow-[0_1px_0_rgba(28,26,24,0.09)] backdrop-blur-xl'

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-700 ease-lux ${barTone}`}
        animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Scrim so the transparent bar stays readable over bright heroes */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink/55 via-ink/20 to-transparent transition-opacity duration-700 ${
            overHero ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div
          className={`shell flex items-center justify-between transition-all duration-500 ease-lux ${
            scrolled ? 'py-4' : 'py-6 md:py-8'
          }`}
        >
          <Logo className="shrink-0" />

          {/* Desktop navigation */}
          <nav className="hidden xl:block">
            <ul className="flex items-center gap-8 2xl:gap-10">
              {NAV_LINKS.map((link) => {
                const active =
                  link.to === '/' ? currentPath === '/' : currentPath.startsWith(link.to)
                return (
                  <li key={link.label}>
                    <NavLink
                      to={link.to}
                      className={`link-sweep font-sans text-[10.5px] font-normal uppercase tracking-wider2 transition-opacity duration-300 ${
                        active ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Utilities */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="grid h-10 w-10 place-items-center transition-opacity duration-300 hover:opacity-60"
            >
              <Search size={17} strokeWidth={1.2} />
            </button>

            <Link
              to="/wishlist"
              aria-label={`Wishlist, ${wishlist.length} items`}
              className="relative grid h-10 w-10 place-items-center transition-opacity duration-300 hover:opacity-60"
            >
              <Heart size={17} strokeWidth={1.2} />
              <Badge value={wishlist.length} />
            </Link>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart, ${count} items`}
              className="relative grid h-10 w-10 place-items-center transition-opacity duration-300 hover:opacity-60"
            >
              <motion.span
                key={pulse}
                initial={pulse ? { scale: 0.75 } : false}
                animate={{ scale: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex"
              >
                <ShoppingBag size={17} strokeWidth={1.2} />
              </motion.span>
              <Badge value={count} />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="ml-1 grid h-10 w-10 place-items-center xl:hidden"
            >
              <Menu size={19} strokeWidth={1.2} />
            </button>
          </div>
        </div>

        {/* Hairline that fades in with the solid bar */}
        <div
          className={`h-px w-full bg-current transition-opacity duration-700 ${
            overHero ? 'opacity-[0.14]' : 'opacity-0'
          }`}
        />
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

function Badge({ value }) {
  return (
    <AnimatePresence>
      {value > 0 && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-1 top-1.5 grid h-[15px] min-w-[15px] place-items-center rounded-full bg-bronze px-1 font-sans text-[9px] font-medium leading-none text-white"
        >
          {value}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
