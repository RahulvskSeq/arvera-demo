import { Download, BookOpen } from 'lucide-react'
import { img, IMG } from '../data/images'
import { Reveal, RevealLines, RevealImage } from './Reveal'
import Button from './Button'

/**
 * Drop a real PDF at /public/arvera-catalogue.pdf (or point this at a CDN
 * URL) and both buttons below go live with no other change.
 * Built off BASE_URL because Vite does not rewrite public paths that appear
 * inside JavaScript, and the demo is served from a sub-path.
 */
export const CATALOGUE_URL = `${import.meta.env.BASE_URL}arvera-catalogue.pdf`

export default function CatalogueSection() {
  return (
    <section className="bg-cream py-24 md:py-32 lg:py-40">
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Cover */}
          <div className="lg:col-span-6">
            <div className="relative">
              <RevealImage
                src={img(IMG.livingMirrors, 1200)}
                alt="The Arvéra 2025 material catalogue"
                className="aspect-[3/4] shadow-[0_40px_80px_-40px_rgba(16,15,14,0.4)]"
              />
              {/* Cover overlay type — the catalogue "jacket" */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-ink/70 via-ink/40 to-ink/80 p-8 md:p-12">
                <div>
                  <p className="font-display text-2xl font-normal uppercase tracking-[0.26em] text-cream md:text-[28px]">
                    Arvéra
                  </p>
                  <p className="mt-2 font-sans text-[9px] uppercase tracking-ultra text-cream/75">
                    Materials That Define Spaces
                  </p>
                </div>
                <div>
                  <p className="font-display text-4xl font-light uppercase leading-[0.9] text-cream md:text-6xl">
                    The
                    <br />
                    Collection
                  </p>
                  <p className="mt-5 font-sans text-[10px] uppercase tracking-ultra text-cream/80">
                    Volume 09 · 2025 · 248 pages
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 lg:pl-6">
            <Reveal y={14}>
              <p className="eyebrow mb-7">Catalogue</p>
            </Reveal>

            <h2 className="h-xl text-char">
              <RevealLines lines={['Explore the', 'collection']} />
            </h2>

            <Reveal delay={0.12}>
              <p className="body-lg mt-8 max-w-lg">
                Two hundred and forty-eight pages of surfaces, boards and hardware — photographed
                at 1:1, specified in full, and organised the way a specification actually gets
                written.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-10 space-y-px border-y border-char/10">
                {[
                  ['912', 'Laminate decors, with finish and emboss codes'],
                  ['46', 'Board constructions with test data'],
                  ['238', 'Hardware references and load ratings'],
                  ['24', 'Completed projects, fully credited'],
                ].map(([n, text]) => (
                  <li key={n} className="flex items-baseline gap-6 border-b border-char/10 py-4 last:border-b-0">
                    <span className="w-14 shrink-0 font-display text-xl font-light text-bronze">{n}</span>
                    <span className="font-sans text-[13px] font-light leading-relaxed text-graphite">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href={CATALOGUE_URL} target="_blank" rel="noreferrer" variant="solid">
                  <BookOpen size={14} strokeWidth={1.3} />
                  View Catalogue
                </Button>
                <Button
                  href={CATALOGUE_URL}
                  download="arvera-catalogue-2025.pdf"
                  variant="outline"
                >
                  <Download size={14} strokeWidth={1.3} />
                  Download Catalogue
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
