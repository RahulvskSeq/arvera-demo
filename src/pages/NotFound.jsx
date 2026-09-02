import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Button from '../components/Button'
import { img, IMG } from '../data/images'

export default function NotFound() {
  useDocumentTitle('Page Not Found')
  return (
    <PageTransition>
      <section className="relative isolate flex min-h-[86svh] items-center overflow-hidden bg-ink pt-32">
        <img
          src={img(IMG.arches, 1800)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-ink/70" />

        <div className="shell">
          <p className="eyebrow mb-8 text-cream/50">Error 404</p>
          <h1 className="h-display text-cream">404</h1>
          <p className="mt-8 max-w-md font-sans text-[16px] font-light leading-relaxed text-cream/65">
            This page has been moved, renamed, or never existed. The catalogue, however, is exactly
            where you left it.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button to="/" variant="light" size="lg">
              Back to Home
            </Button>
            <Button to="/shop" variant="outlineLight" size="lg">
              Explore Collection
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
