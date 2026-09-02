import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import CategoryCard from '../components/CategoryCard'
import CollectionSection from '../components/CollectionSection'
import ProductCard from '../components/ProductCard'
import BrandStory from '../components/BrandStory'
import Stats from '../components/Stats'
import CatalogueSection from '../components/CatalogueSection'
import BulkCTA from '../components/BulkCTA'
import ProjectCard from '../components/ProjectCard'
import JournalCard from '../components/JournalCard'
import Marquee from '../components/Marquee'
import Button from '../components/Button'
import { Reveal, RevealLines, RevealImage } from '../components/Reveal'

import { categories } from '../data/categories'
import { bestsellers } from '../data/products'
import { projects } from '../data/projects'
import { journal } from '../data/journal'
import { img, IMG } from '../data/images'

export default function Home() {
  useDocumentTitle(null)
  const homeProjects = projects.slice(0, 3)
  const homeJournal = journal.slice(0, 3)

  return (
    <PageTransition>
      <Hero />

      {/* ---------------- Statement / intro ---------------- */}
      <section className="bg-paper py-24 md:py-32">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <h2 className="h-lg text-char">
                <RevealLines
                  lines={[
                    'We supply the',
                    'surfaces, structure',
                    'and hardware behind',
                    'considered interiors.',
                  ]}
                />
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-3">
              <Reveal delay={0.15}>
                <p className="body-lg">
                  Since 2010, Arvéra has worked with architects, contractors and homeowners across
                  India — from a single wardrobe in Bengaluru to a twenty-two key hotel in Goa. We
                  hold every material we sell, we test what we specify, and we stand behind it long
                  after installation.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <Link
                  to="/about"
                  className="group mt-8 inline-flex items-center gap-3 font-sans text-[10px] font-medium uppercase tracking-ultra text-char md:text-[11px]"
                >
                  <span className="link-sweep">Our story</span>
                  <ArrowRight
                    size={14}
                    strokeWidth={1.2}
                    className="transition-transform duration-500 ease-lux group-hover:translate-x-1.5"
                  />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Materials ---------------- */}
      <section id="materials" className="scroll-mt-24 bg-paper pb-24 md:pb-32 lg:pb-40">
        <div className="shell">
          <SectionHeading
            eyebrow="Six material families"
            lines={['Explore our', 'materials']}
            standfirst="Everything a fit-out needs, held under one roof and one specification standard."
            linkTo="/shop"
            linkLabel="Shop all materials"
          />

          {/* Asymmetric grid: first two blocks run taller than the rest */}
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
            {categories.map((c, i) => (
              /* The middle column drops by a step on wide screens so the
                 grid reads as a staggered gallery rather than a table. */
              <CategoryCard
                key={c.id}
                category={c}
                index={i}
                className={i % 3 === 1 ? 'lg:mt-16' : ''}
              />
            ))}
          </div>
        </div>
      </section>

      <Marquee tone="dark" />

      {/* ---------------- Collections rail ---------------- */}
      <CollectionSection />

      {/* ---------------- Editorial split ---------------- */}
      <section className="bg-paper py-24 md:py-32 lg:py-40">
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal y={14}>
                <p className="eyebrow mb-7">Specification</p>
              </Reveal>
              <h2 className="h-lg text-char">
                <RevealLines lines={['Tested where', 'it matters.']} />
              </h2>
              <Reveal delay={0.12}>
                <p className="body-lg mt-8 max-w-md">
                  Every board we stock is pulled from the line and put through the same three
                  checks: a 72-hour boil, a screw-withdrawal test and a calibration pass. What
                  fails does not reach the warehouse.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-char/10 pt-8">
                  {[
                    ['72 hrs', 'Boiling water resistance, IS 710'],
                    ['80,000', 'Hardware cycle test, every SKU'],
                    ['1:1', 'Decor scale, no repeat within a sheet'],
                    ['3–5 days', 'Dispatch across 120 cities'],
                  ].map(([n, label]) => (
                    <div key={n}>
                      <dt className="font-display text-3xl font-light text-char">{n}</dt>
                      <dd className="mt-2 font-sans text-[12px] font-light leading-relaxed text-stone">
                        {label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <div className="grid grid-cols-2 gap-5 lg:col-span-7 lg:gap-8">
              <RevealImage
                src={img(IMG.surfaceBlack, 800)}
                alt="Close detail of a graphite textured surface"
                className="aspect-[3/4] translate-y-0 lg:translate-y-10"
              />
              <RevealImage
                src={img(IMG.panelBeige, 800)}
                alt="Stacked panels in warm stone and timber tones"
                className="aspect-[3/4]"
                delay={0.12}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Bestsellers ---------------- */}
      <section className="bg-cream py-24 md:py-32 lg:py-40">
        <div className="shell">
          <SectionHeading
            eyebrow="Bestsellers"
            lines={['Materials', 'people love']}
            standfirst="The twelve references our specifiers reach for most — across surfaces, structure and hardware."
            linkTo="/shop?sort=featured"
            linkLabel="View all products"
          />

          {/* Mobile: swipeable rail. Desktop: grid. */}
          <div className="mt-14 md:hidden">
            <div className="no-scrollbar snap-x-lux -mx-5 flex gap-4 overflow-x-auto px-5 pb-2 scroll-pl-5">
              {bestsellers.map((p, i) => (
                <div key={p.id} className="snap-item w-[62vw] shrink-0">
                  <ProductCard product={p} index={i} />
                </div>
              ))}
              <div className="w-1 shrink-0" aria-hidden="true" />
            </div>
            <p className="mt-6 font-sans text-[10px] uppercase tracking-ultra text-stone">
              Swipe to explore
            </p>
          </div>

          <div className="mt-14 hidden gap-x-8 gap-y-16 md:mt-20 md:grid md:grid-cols-3 xl:grid-cols-4">
            {bestsellers.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Brand story ---------------- */}
      <BrandStory />

      {/* ---------------- Stats ---------------- */}
      <Stats />

      {/* ---------------- Projects ---------------- */}
      <section className="bg-paper pb-24 md:pb-32 lg:pb-40">
        <div className="shell">
          <SectionHeading
            eyebrow="Selected work"
            lines={['Spaces we', 'help create']}
            standfirst="A small selection from the two hundred–odd projects our materials went into last year."
            linkTo="/projects"
            linkLabel="All projects"
          />

          <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-x-8 md:gap-y-20 lg:gap-x-12">
            {homeProjects.map((p, i) => (
              <div key={p.id} className={i === 0 ? 'md:col-span-2' : ''}>
                <ProjectCard project={p} index={i} size={i === 0 ? 'wide' : 'md'} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Catalogue ---------------- */}
      <CatalogueSection />

      {/* ---------------- Journal ---------------- */}
      <section className="bg-paper py-24 md:py-32 lg:py-40">
        <div className="shell">
          <SectionHeading
            eyebrow="The Arvéra Journal"
            lines={['Notes on', 'material']}
            standfirst="Practical writing on finishes, boards and hardware — from the people who specify them daily."
            linkTo="/inspiration"
            linkLabel="Read the journal"
          />

          <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
            {homeJournal.map((a, i) => (
              <JournalCard key={a.id} article={a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Bulk CTA ---------------- */}
      <BulkCTA />

      {/* ---------------- Closing image ---------------- */}
      <section className="relative bg-paper py-24 md:py-32">
        <div className="shell">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <RevealImage
                src={img(IMG.livingWhite, 1500)}
                alt="A calm, light-filled living room in soft daylight"
                className="aspect-[4/3]"
              />
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <Reveal>
                <p className="eyebrow mb-6">Visit us</p>
                <p className="h-md text-char">
                  See every surface in daylight at our Bengaluru experience centre.
                </p>
                <p className="body-lg mt-6 max-w-sm">
                  Nine hundred decors, forty-six board constructions and a working kitchen wall —
                  open Monday to Saturday, 10:00 to 19:00.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button to="/contact" variant="solid">
                    Book a Visit
                  </Button>
                  <Button to="/shop" variant="outline">
                    Explore Collection
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
