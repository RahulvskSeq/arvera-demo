import { Link } from 'react-router-dom'
import { Instagram, Linkedin, Facebook, Youtube, ArrowUpRight } from 'lucide-react'
import Newsletter from './Newsletter'

const columns = [
  {
    title: 'Products',
    links: [
      { label: 'Laminates', to: '/shop?category=Laminates' },
      { label: 'Plywood', to: '/shop?category=Plywood' },
      { label: 'Hardware', to: '/shop?category=Hardware' },
      { label: 'MDF', to: '/shop?category=MDF' },
      { label: 'Kitchen', to: '/shop?q=kitchen' },
      { label: 'Wardrobe', to: '/shop?q=wardrobe' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Projects', to: '/projects' },
      { label: 'Journal', to: '/inspiration' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Shipping', to: '/contact' },
      { label: 'Returns', to: '/contact' },
      { label: 'Warranty', to: '/contact' },
      { label: 'FAQ', to: '/contact' },
    ],
  },
]

const socials = [
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/' },
  { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/' },
  { Icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="shell pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <p className="font-display text-[40px] font-normal uppercase leading-none tracking-[0.24em] md:text-[52px]">
              Arvéra
            </p>
            <p className="mt-5 font-sans text-[11px] font-light uppercase tracking-ultra text-cream/45">
              Materials That Define Spaces
            </p>
            <p className="mt-8 max-w-sm font-sans text-sm font-light leading-relaxed text-cream/55">
              Premium surfaces, structural boards and precision hardware — supplied to architects,
              contractors and homeowners across 120 Indian cities since 2010.
            </p>

            <div className="mt-10 flex gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Arvéra on ${label}`}
                  className="grid h-11 w-11 place-items-center border border-cream/15 text-cream/70 transition-colors duration-400 hover:border-cream/60 hover:text-cream"
                >
                  <Icon size={16} strokeWidth={1.2} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow mb-6 text-cream/40">{col.title}</p>
                <ul className="space-y-3.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="link-sweep font-sans text-[13px] font-light text-cream/65 transition-colors duration-300 hover:text-cream"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter + contact */}
          <div className="lg:col-span-4">
            <Newsletter tone="dark" />

            <div className="mt-12 space-y-2 border-t border-cream/10 pt-8">
              <a
                href="tel:+918040001234"
                className="group flex items-center gap-2 font-sans text-sm font-light text-cream/70 transition-colors duration-300 hover:text-cream"
              >
                +91 80 4000 1234
                <ArrowUpRight size={14} strokeWidth={1.2} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
              <a
                href="mailto:studio@arvera.in"
                className="group flex items-center gap-2 font-sans text-sm font-light text-cream/70 transition-colors duration-300 hover:text-cream"
              >
                studio@arvera.in
                <ArrowUpRight size={14} strokeWidth={1.2} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
              <p className="pt-2 font-sans text-sm font-light leading-relaxed text-cream/45">
                No. 14, Lavelle Road, Bengaluru 560001
              </p>
            </div>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="pointer-events-none mt-20 select-none overflow-hidden md:mt-24">
          <p className="whitespace-nowrap text-center font-display font-light uppercase leading-[0.8] tracking-[0.06em] text-cream/[0.06]" style={{ fontSize: 'clamp(4rem, 20vw, 20rem)' }}>
            Arvéra
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-cream/10 pb-24 pt-8 sm:flex-row sm:items-center sm:justify-between sm:pb-8 sm:pr-16 md:pr-20">
          <p className="font-sans text-[11px] font-light tracking-wide text-cream/40">
            © {new Date().getFullYear()} Arvéra Surfaces Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            {['Privacy Policy', 'Terms of Use', 'Cookie Preferences'].map((t) => (
              <Link
                key={t}
                to="/contact"
                className="link-sweep font-sans text-[11px] font-light tracking-wide text-cream/40 transition-colors duration-300 hover:text-cream/80"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
