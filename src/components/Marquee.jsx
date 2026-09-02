const ITEMS = [
  'Laminates',
  'Plywood',
  'Hardware',
  'MDF',
  'Kitchen Fittings',
  'Wardrobe Fittings',
  'Edge Banding',
  'Acrylic Surfaces',
]

/** Slow, continuous type band used as a rhythm break between sections. */
export default function Marquee({ tone = 'dark' }) {
  const dark = tone === 'dark'
  const row = [...ITEMS, ...ITEMS]

  return (
    <div
      className={`overflow-hidden border-y py-6 md:py-8 ${
        dark ? 'border-cream/10 bg-ink text-cream/70' : 'border-char/10 bg-cream text-char/70'
      }`}
    >
      <div className="flex w-max animate-marquee items-center gap-10 md:gap-16">
        {row.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10 md:gap-16">
            <span className="font-display text-2xl font-light uppercase tracking-[0.14em] md:text-3xl">
              {item}
            </span>
            <span className={`h-1 w-1 rounded-full ${dark ? 'bg-bronzeLight' : 'bg-bronze'}`} />
          </span>
        ))}
      </div>
    </div>
  )
}
