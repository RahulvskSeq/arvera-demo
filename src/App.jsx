import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import QuickView from './components/QuickView'
import SearchOverlay from './components/SearchOverlay'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton'

import Home from './pages/Home'

/* Route-level code splitting keeps the first paint on the homepage light. */
const Shop = lazy(() => import('./pages/Shop'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'))
const Inspiration = lazy(() => import('./pages/Inspiration'))
const Article = lazy(() => import('./pages/Article'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Cart = lazy(() => import('./pages/Cart'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const Catalogue = lazy(() => import('./pages/Catalogue'))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteFallback() {
  return <div className="min-h-[70svh] w-full bg-paper" aria-hidden="true" />
}

export default function App() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <ScrollToTop />
      <Header />

      <Suspense fallback={<RouteFallback />}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="/journal/:id" element={<Article />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>

      <Footer />

      <CartDrawer />
      <QuickView />
      <SearchOverlay />
      <WhatsAppButton />
    </div>
  )
}
