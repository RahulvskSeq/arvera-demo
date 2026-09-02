import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PageHero from '../components/PageHero'
import Stats from '../components/Stats'
import BulkCTA from '../components/BulkCTA'
import Marquee from '../components/Marquee'
import Button from '../components/Button'
import { Reveal, RevealLines, RevealImage } from '../components/Reveal'
import { img, IMG } from '../data/images'

const TIMELINE = [
  ['2010', 'Founded in Bengaluru', 'A single laminate showroom on Lavelle Road, with 40 decors and one delivery van.'],
  ['2014', 'Own board programme', 'We stop reselling and start specifying our own plywood, tested to IS 710 in-house.'],
  ['2018', 'Hardware division', 'VALKEN and FERROLUX launch — German-engineered runners, hinges and lift systems.'],
  ['2021', 'National distribution', 'Warehousing in five cities brings dispatch across India to three to five working days.'],
  ['2025', '120 cities', 'Five thousand references, twenty-five thousand customers, and a specification desk that reads drawings.'],
]

const VALUES = [
  ['Hold what we sell', 'Nothing is drop-shipped. If it is on the site, it is in the warehouse and it has been handled.'],
  ['Test before we specify', 'Every board is pulled from the line for a boil test, a screw-withdrawal test and a calibration pass.'],
  ['Stay after installation', 'A warranty is a promise about year eight, not year one. We service what we supply.'],
]

export default function About() {
  useDocumentTitle('About')
  return (
    <PageTransition>
      <PageHero
        image={IMG.corridorWood}
        eyebrow="Since 2010"
        lines={['We are in the', 'business of', 'surfaces.']}
        standfirst="Arvéra supplies the laminates, boards and hardware behind considered interiors across India — and the specification advice that makes them work together."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        height="lg"
      />

      {/* Statement */}
      <section className="bg-paper py-20 md:py-28 lg:py-36">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="h-lg text-char">
                <RevealLines
                  lines={['A material company', 'run by people who', 'draw for a living.']}
                />
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-2">
              <Reveal delay={0.12}>
                <p className="body-lg">
                  Arvéra started because a small architecture practice was tired of being sold
                  boards by people who had never opened a drawing set. Fifteen years later the
                  company is larger, but the premise has not changed: the person recommending a
                  material should understand what it has to do.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="body-lg mt-6">
                  Today we hold five thousand references across six material families, warehouse in
                  five cities, and run a specification desk that turns drawings into a material
                  schedule in two working days.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-16 grid gap-5 md:mt-24 md:grid-cols-12 md:gap-8">
            <RevealImage
              src={img(IMG.loungeWood, 1400)}
              alt="A timber-lined lounge interior"
              className="aspect-[4/3] md:col-span-7"
            />
            <RevealImage
              src={img(IMG.drawings, 900)}
              alt="Drawings and material samples on a studio desk"
              className="aspect-[4/3] md:col-span-5 md:mt-14"
              delay={0.1}
            />
          </div>
        </div>
      </section>

      <Marquee tone="light" />

      {/* Values */}
      <section className="bg-paper py-20 md:py-28">
        <div className="shell">
          <Reveal y={14}>
            <p className="eyebrow mb-10">How we work</p>
          </Reveal>
          <div className="grid gap-10 border-t border-char/10 pt-12 md:grid-cols-3 md:gap-12">
            {VALUES.map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.08}>
                <p className="font-display text-[11px] font-normal uppercase tracking-ultra text-bronze">
                  0{i + 1}
                </p>
                <h3 className="mt-5 font-display text-[26px] font-light leading-tight text-char md:text-[30px]">
                  {title}
                </h3>
                <p className="mt-4 font-sans text-[14px] font-light leading-relaxed text-graphite">
                  {body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Stats />

      {/* Timeline */}
      <section className="bg-cream py-20 md:py-28 lg:py-36">
        <div className="shell">
          <Reveal y={14}>
            <p className="eyebrow mb-8">Milestones</p>
          </Reveal>
          <h2 className="h-lg mb-14 text-char">
            <RevealLines lines={['Fifteen years,', 'one direction.']} />
          </h2>

          <ol className="border-t border-char/10">
            {TIMELINE.map(([year, title, body], i) => (
              <Reveal key={year} delay={Math.min(i, 4) * 0.05} y={20}>
                <li className="grid gap-3 border-b border-char/10 py-8 md:grid-cols-12 md:gap-8 md:py-10">
                  <span className="font-display text-3xl font-light leading-none text-bronze md:col-span-2 md:text-[40px]">
                    {year}
                  </span>
                  <h3 className="font-display text-xl font-light text-char md:col-span-4 md:text-2xl">
                    {title}
                  </h3>
                  <p className="font-sans text-[14px] font-light leading-relaxed text-graphite md:col-span-6">
                    {body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Experience centre */}
      <section className="bg-paper py-20 md:py-28">
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <RevealImage
                src={img(IMG.livingMirrors, 1400)}
                alt="The Arvéra experience centre in Bengaluru"
                className="aspect-[4/3]"
              />
            </div>
            <div className="lg:col-span-6 lg:pl-6">
              <Reveal>
                <p className="eyebrow mb-7">Experience centre</p>
                <h2 className="h-lg text-char">Nine hundred decors, in daylight.</h2>
                <p className="body-lg mt-8 max-w-md">
                  Samples lie about colour under showroom spotlights. Our Bengaluru centre is
                  daylit on three sides, with a working kitchen wall and full-height wardrobe
                  mock-ups you can open, close and lean on.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button to="/contact" variant="solid">Book a Visit</Button>
                  <Button to="/projects" variant="outline">See our work</Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <BulkCTA />
    </PageTransition>
  )
}
