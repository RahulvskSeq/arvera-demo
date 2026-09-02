import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PageHero from '../components/PageHero'
import CatalogueSection from '../components/CatalogueSection'
import BulkCTA from '../components/BulkCTA'
import { Reveal, RevealImage } from '../components/Reveal'
import { collections } from '../data/collections'
import { img, IMG } from '../data/images'

const VOLUMES = [
  ['Volume 09', 'The Collection 2025', '248 pages · All families', IMG.livingMirrors],
  ['Surfaces', 'Laminate Decor Guide', '164 pages · 912 decors', IMG.panelWood],
  ['Structure', 'Board & Test Data', '52 pages · 46 constructions', IMG.shelfWood],
  ['Precision', 'Hardware Reference', '96 pages · 238 references', IMG.drawerUnit],
]

export default function Catalogue() {
  useDocumentTitle('Catalogue')
  return (
    <PageTransition>
      <PageHero
        image={IMG.livingWood}
        eyebrow="Volume 09 · 2025"
        lines={['The Arvéra', 'catalogue']}
        standfirst="Every surface, board and hardware reference we hold — photographed at 1:1 and specified in full."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Catalogue' }]}
      />

      <CatalogueSection />

      {/* Volumes */}
      <section className="bg-paper py-20 md:py-28">
        <div className="shell">
          <Reveal y={14}>
            <p className="eyebrow mb-10">Available volumes</p>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VOLUMES.map(([tag, title, meta, image], i) => (
              <Reveal key={title} delay={i * 0.07}>
                <div className="group">
                  <div className="media aspect-[3/4] overflow-hidden bg-ivory">
                    <img
                      src={img(image, 700)}
                      alt={title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ink/20 transition-colors duration-700 group-hover:bg-ink/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="font-sans text-[9px] uppercase tracking-ultra text-cream/60">
                        {tag}
                      </p>
                      <p className="mt-2 font-display text-xl font-light leading-tight text-cream">
                        {title}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 font-sans text-[11px] font-light uppercase tracking-wider2 text-stone">
                    {meta}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Inside the book */}
      <section className="bg-cream py-20 md:py-28">
        <div className="shell">
          <Reveal y={14}>
            <p className="eyebrow mb-10">Inside</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-12 md:gap-8">
            <RevealImage
              src={img(collections[0].image, 1200)}
              alt="Natural Oak collection spread"
              className="aspect-[4/3] md:col-span-7"
            />
            <RevealImage
              src={img(collections[3].image, 900)}
              alt="Dark Walnut collection spread"
              className="aspect-[4/3] md:col-span-5 md:mt-14"
              delay={0.1}
            />
            <RevealImage
              src={img(collections[1].image, 900)}
              alt="Italian Marble collection spread"
              className="aspect-[3/4] md:col-span-4"
              delay={0.05}
            />
            <RevealImage
              src={img(collections[5].image, 1200)}
              alt="Metallic Textures collection spread"
              className="aspect-[16/10] md:col-span-8 md:mt-12"
              delay={0.12}
            />
          </div>
        </div>
      </section>

      <BulkCTA />
    </PageTransition>
  )
}
