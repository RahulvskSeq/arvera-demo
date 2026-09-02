import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Reveal, RevealLines } from './Reveal'

/**
 * Shared editorial section header: eyebrow, large title split across
 * lines, optional standfirst and a right-aligned link.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lines,
  standfirst,
  linkTo,
  linkLabel,
  align = 'between',
  tone = 'dark',
  className = '',
}) {
  const titleLines = lines ?? (title ? [title] : [])
  const muted = tone === 'light' ? 'text-cream/55' : 'text-stone'
  const strong = tone === 'light' ? 'text-cream' : 'text-char'

  return (
    <div
      className={`flex flex-col gap-8 ${
        align === 'between' ? 'lg:flex-row lg:items-end lg:justify-between lg:gap-16' : ''
      } ${className}`}
    >
      <div className="max-w-4xl">
        {eyebrow && (
          <Reveal y={14}>
            <p className={`eyebrow mb-6 md:mb-8 ${muted}`}>{eyebrow}</p>
          </Reveal>
        )}
        <h2 className={`h-xl ${strong}`}>
          <RevealLines lines={titleLines} />
        </h2>
      </div>

      {(standfirst || linkTo) && (
        <div className={`flex max-w-md flex-col gap-6 ${align === 'between' ? 'lg:items-start lg:pb-3' : ''}`}>
          {standfirst && (
            <Reveal delay={0.1}>
              <p className={`body-lg ${tone === 'light' ? 'text-cream/65' : 'text-graphite'}`}>
                {standfirst}
              </p>
            </Reveal>
          )}
          {linkTo && (
            <Reveal delay={0.15}>
              <Link
                to={linkTo}
                className={`group inline-flex items-center gap-3 font-sans text-[10px] font-medium uppercase tracking-ultra md:text-[11px] ${strong}`}
              >
                <span className="link-sweep">{linkLabel}</span>
                <ArrowRight
                  size={14}
                  strokeWidth={1.2}
                  className="transition-transform duration-500 ease-lux group-hover:translate-x-1.5"
                />
              </Link>
            </Reveal>
          )}
        </div>
      )}
    </div>
  )
}
