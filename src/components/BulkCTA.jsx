import { ArrowRight, Phone } from 'lucide-react'
import { Reveal, RevealLines } from './Reveal'
import Button from './Button'

export default function BulkCTA() {
  return (
    <section className="relative overflow-hidden bg-char py-24 text-cream md:py-32">
      {/* Faint bronze wash so the block is not flat black */}
      <div className="pointer-events-none absolute -right-1/4 top-1/2 h-[120%] w-[70%] -translate-y-1/2 rounded-full bg-bronze/10 blur-[140px]" />

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal y={14}>
              <p className="eyebrow mb-7 text-cream/45">Project & trade</p>
            </Reveal>
            <h2 className="h-xl text-cream">
              <RevealLines lines={['Building a', 'bigger project?']} />
            </h2>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <p className="max-w-md font-sans text-[16px] font-light leading-[1.85] text-cream/65 md:text-[17px]">
                Get project pricing, material assistance and dedicated support. Our specification
                team works directly with architects and contractors from tender through handover.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button to="/contact?intent=quote" variant="light" size="lg">
                  Request a Quote
                  <ArrowRight size={14} strokeWidth={1.2} />
                </Button>
                <Button href="tel:+918040001234" variant="outlineLight" size="lg">
                  <Phone size={14} strokeWidth={1.3} />
                  Contact Sales
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
