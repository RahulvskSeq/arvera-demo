import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, Truck, ShieldCheck, Ruler, ArrowRight } from 'lucide-react'

import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import ProductCard from '../components/ProductCard'
import RoomVisualiser from '../components/RoomVisualiser'
import WishlistButton from '../components/WishlistButton'
import StarRating from '../components/StarRating'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'

import { productById, relatedTo, formatINR } from '../data/products'
import { img } from '../data/images'
import { useStore } from '../context/StoreContext'

const EASE = [0.16, 1, 0.3, 1]
const TABS = ['Description', 'Specifications', 'Application', 'Care']

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = productById[id]
  const { addToCart } = useStore()

  const [active, setActive] = useState(0)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('Description')

  useEffect(() => {
    setActive(0)
    setQty(1)
    setTab('Description')
  }, [id])

  const related = useMemo(() => (product ? relatedTo(product, 4) : []), [product])
  useDocumentTitle(product ? `${product.code} — ${product.name}` : 'Product')

  if (!product) return <Navigate to="/shop" replace />

  const isLaminate = product.category === 'Laminates'

  return (
    <PageTransition>
      {/* ---------------- Breadcrumb ---------------- */}
      <div className="bg-paper pt-28 md:pt-36">
        <div className="shell">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 font-sans text-[10px] uppercase tracking-ultra text-stone"
          >
            <Link to="/" className="transition-colors hover:text-char">Home</Link>
            <span className="opacity-40">/</span>
            <Link to="/shop" className="transition-colors hover:text-char">Shop</Link>
            <span className="opacity-40">/</span>
            <Link
              to={`/shop?category=${encodeURIComponent(product.category)}`}
              className="transition-colors hover:text-char"
            >
              {product.category}
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-char">{product.code}</span>
          </nav>
        </div>
      </div>

      {/* ---------------- Gallery + buy box ---------------- */}
      <section className="bg-paper py-10 md:py-14">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Gallery */}
            <div className="min-w-0 lg:col-span-7">
              {/* Desktop: thumbnail rail + main frame */}
              <div className="hidden gap-5 md:flex">
                <div className="flex w-20 shrink-0 flex-col gap-3">
                  {product.images.map((im, i) => (
                    <button
                      key={im}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`View image ${i + 1} of ${product.images.length}`}
                      className={`aspect-[4/5] overflow-hidden border transition-all duration-400 ease-lux ${
                        i === active ? 'border-char' : 'border-transparent opacity-55 hover:opacity-90'
                      }`}
                    >
                      <img src={img(im, 200)} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>

                <div className="relative aspect-[4/5] flex-1 overflow-hidden bg-ivory">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={active}
                      src={img(product.images[active], 1200)}
                      alt={`${product.name} — view ${active + 1}`}
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: EASE }}
                    />
                  </AnimatePresence>

                  <div className="absolute left-0 top-0 flex flex-col gap-px">
                    {product.isNew && (
                      <span className="bg-char px-3 py-1.5 font-sans text-[9px] uppercase tracking-ultra text-cream">
                        New
                      </span>
                    )}
                    {product.bestseller && (
                      <span className="bg-bronze px-3 py-1.5 font-sans text-[9px] uppercase tracking-ultra text-white">
                        Bestseller
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile: swipeable gallery */}
              <div className="md:hidden">
                <div className="no-scrollbar snap-x-lux -mx-5 flex w-[calc(100%+2.5rem)] gap-3 overflow-x-auto px-5 scroll-pl-5">
                  {product.images.map((im, i) => (
                    <div key={im} className="snap-item aspect-[4/5] w-[82vw] shrink-0 overflow-hidden bg-ivory">
                      <img
                        src={img(im, 900)}
                        alt={`${product.name} — view ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-4 font-sans text-[10px] uppercase tracking-ultra text-stone">
                  Swipe · {product.images.length} images
                </p>
              </div>
            </div>

            {/* Buy box */}
            <div className="min-w-0 lg:col-span-5">
              <Reveal y={18}>
                <p className="eyebrow">
                  {product.brand} · {product.code}
                </p>
                <h1 className="mt-4 font-display text-[40px] font-light leading-[0.95] text-char md:text-[56px]">
                  {product.name}
                </h1>

                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <StarRating value={product.rating} reviews={product.reviews} showValue />
                  <span
                    className={`font-sans text-[10px] uppercase tracking-ultra ${
                      product.availability === 'In Stock' ? 'text-bronze' : 'text-stone'
                    }`}
                  >
                    {product.availability}
                  </span>
                </div>

                {/* Price block */}
                <div className="mt-8 border-y border-char/10 py-7">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <span className="font-display text-[42px] font-light leading-none text-char">
                      {formatINR(product.price)}
                    </span>
                    <span className="font-sans text-base font-light text-stone line-through">
                      {formatINR(product.mrp)}
                    </span>
                    <span className="bg-bronze px-2.5 py-1 font-sans text-[10px] font-medium uppercase tracking-wider2 text-white">
                      {product.discount}% off
                    </span>
                  </div>
                  <p className="mt-3 font-sans text-[12px] font-light text-stone">
                    {product.unit} · inclusive of all taxes
                  </p>
                </div>

                {/* Attributes */}
                <dl className="mt-7 grid grid-cols-2 gap-x-8 gap-y-6">
                  <Attr label="Finish" value={product.finish} />
                  <Attr label="Colour" value={product.color} />
                  <Attr label="Thickness" value={product.thickness} />
                  <Attr label="Size" value={product.size} />
                  <Attr label="Material" value={product.material} />
                  <Attr label="Collection" value={product.collection} />
                </dl>

                {/* Quantity + actions */}
                <div className="mt-9 flex items-center gap-4">
                  <div className="flex items-center border border-char/15">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="grid h-14 w-12 place-items-center transition-colors duration-300 hover:bg-char hover:text-cream"
                    >
                      <Minus size={15} strokeWidth={1.4} />
                    </button>
                    <span className="w-12 text-center font-sans text-[15px] tabular-nums">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.min(99, q + 1))}
                      aria-label="Increase quantity"
                      className="grid h-14 w-12 place-items-center transition-colors duration-300 hover:bg-char hover:text-cream"
                    >
                      <Plus size={15} strokeWidth={1.4} />
                    </button>
                  </div>
                  <p className="font-sans text-[12px] font-light text-stone">
                    Total{' '}
                    <span className="text-char">{formatINR(product.price * qty)}</span>
                  </p>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Button variant="solid" size="lg" onClick={() => addToCart(product.id, qty)}>
                    Add to Cart
                  </Button>
                  <Button
                    variant="bronze"
                    size="lg"
                    onClick={() => {
                      addToCart(product.id, qty, { open: false })
                      navigate('/cart')
                    }}
                  >
                    Buy Now
                  </Button>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <WishlistButton
                    id={product.id}
                    label={product.name}
                    size={16}
                    className="h-12 w-12 border border-char/15 bg-transparent hover:bg-ivory"
                  />
                  <span className="font-sans text-[10px] uppercase tracking-ultra text-stone">
                    Add to Wishlist
                  </span>
                </div>

                {/* Assurances */}
                <ul className="mt-9 grid gap-4 border-t border-char/10 pt-7 sm:grid-cols-3">
                  {[
                    [Truck, 'Free delivery', 'On orders above ₹15,000'],
                    [ShieldCheck, product.specs?.Warranty ?? '10 Years', 'Manufacturer warranty'],
                    [Ruler, 'Free samples', 'A4 swatch, 3–4 days'],
                  ].map(([Icon, title, sub]) => (
                    <li key={title} className="flex gap-3">
                      <Icon size={16} strokeWidth={1.2} className="mt-0.5 shrink-0 text-bronze" />
                      <div>
                        <p className="font-sans text-[11px] font-medium uppercase tracking-wider2 text-char">
                          {title}
                        </p>
                        <p className="mt-1 font-sans text-[11px] font-light leading-snug text-stone">
                          {sub}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Tabs ---------------- */}
      <section className="bg-paper py-14 md:py-20">
        <div className="shell">
          <div className="no-scrollbar -mx-5 flex gap-8 overflow-x-auto border-b border-char/10 px-5 sm:mx-0 sm:gap-10 sm:px-0">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`relative shrink-0 whitespace-nowrap pb-4 font-sans text-[10px] font-medium uppercase tracking-ultra transition-colors duration-300 md:text-[11px] ${
                  tab === t ? 'text-char' : 'text-stone hover:text-graphite'
                }`}
              >
                {t}
                {tab === t && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-x-0 -bottom-px h-px bg-char"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="pt-10 md:pt-14"
            >
              {tab === 'Description' && (
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                  <p className="body-lg lg:col-span-7 lg:text-[19px] lg:leading-[1.8]">
                    {product.description}
                  </p>
                  <div className="lg:col-span-5">
                    <p className="eyebrow mb-5">At a glance</p>
                    <ul className="space-y-3">
                      {[
                        `${product.finish} finish in ${product.color.toLowerCase()}`,
                        `${product.thickness} · ${product.size}`,
                        `${product.specs?.Warranty ?? '10 Years'} manufacturer warranty`,
                        `${product.availability} · dispatch in 3–5 working days`,
                      ].map((line) => (
                        <li key={line} className="flex gap-3 font-sans text-[13px] font-light text-graphite">
                          <span className="mt-2 h-1 w-1 shrink-0 bg-bronze" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {tab === 'Specifications' && (
                <dl className="grid gap-x-16 sm:grid-cols-2">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-baseline justify-between gap-6 border-b border-char/10 py-4"
                    >
                      <dt className="font-sans text-[11px] uppercase tracking-wider2 text-stone">{k}</dt>
                      <dd className="text-right font-sans text-[13px] font-light text-char">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {tab === 'Application' && (
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                  <ul className="lg:col-span-7">
                    {product.applications.map((a, i) => (
                      <li
                        key={a}
                        className="flex items-baseline gap-6 border-b border-char/10 py-5 last:border-b-0"
                      >
                        <span className="font-display text-xl font-light text-bronze">0{i + 1}</span>
                        <span className="font-sans text-[15px] font-light text-graphite">{a}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="body-sm lg:col-span-5">
                    Not sure whether this reference suits your application? Our specification desk
                    reviews drawings and returns a material schedule within two working days.
                  </p>
                </div>
              )}

              {tab === 'Care' && (
                <ul className="grid gap-x-16 gap-y-1 lg:grid-cols-2">
                  {product.care.map((c, i) => (
                    <li key={c} className="flex items-baseline gap-5 border-b border-char/10 py-5">
                      <span className="font-sans text-[11px] tabular-nums text-stone">0{i + 1}</span>
                      <span className="font-sans text-[14px] font-light leading-relaxed text-graphite">
                        {c}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ---------------- Laminate visualiser ---------------- */}
      {isLaminate && <RoomVisualiser product={product} />}

      {/* ---------------- Related ---------------- */}
      <section className="bg-paper py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="You may also consider"
            lines={['Pairs well', 'with']}
            linkTo="/shop"
            linkLabel="All materials"
          />
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:mt-16 md:grid-cols-4 md:gap-x-8">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Spec desk CTA ---------------- */}
      <section className="bg-char py-16 text-cream md:py-20">
        <div className="shell flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow mb-4 text-cream/45">Specification desk</p>
            <p className="font-display text-3xl font-light leading-tight md:text-[38px]">
              Need this in volume, or matched across a full project?
            </p>
          </div>
          <Button to="/contact?intent=quote" variant="light" size="lg" className="shrink-0">
            Request a Quote
            <ArrowRight size={14} strokeWidth={1.2} />
          </Button>
        </div>
      </section>
    </PageTransition>
  )
}

function Attr({ label, value }) {
  return (
    <div>
      <dt className="font-sans text-[9.5px] uppercase tracking-ultra text-stone">{label}</dt>
      <dd className="mt-2 font-sans text-[13.5px] font-light leading-snug text-char">{value}</dd>
    </div>
  )
}
