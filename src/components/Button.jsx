import { Link } from 'react-router-dom'

const base =
  'group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden ' +
  'whitespace-nowrap font-sans text-[10px] font-medium uppercase tracking-ultra md:text-[11px] ' +
  'transition-colors duration-500 ease-lux disabled:cursor-not-allowed disabled:opacity-40'

const sizes = {
  sm: 'px-6 py-3',
  md: 'px-7 py-4 md:px-9 md:py-[18px]',
  lg: 'px-8 py-[18px] md:px-10 md:py-5',
}

const variants = {
  solid: 'bg-char text-cream hover:text-cream',
  light: 'bg-cream text-char',
  outline: 'border border-char/25 text-char hover:border-char',
  outlineLight: 'border border-cream/35 text-cream hover:border-cream',
  bronze: 'bg-bronze text-white',
  ghost: 'text-char hover:text-bronze px-0',
}

/** Sweep fill that slides up behind the label on hover. */
const sweeps = {
  solid: 'bg-bronze',
  light: 'bg-char',
  outline: 'bg-char',
  outlineLight: 'bg-cream',
  bronze: 'bg-char',
  ghost: null,
}

const hoverText = {
  outline: 'group-hover/btn:text-cream',
  outlineLight: 'group-hover/btn:text-char',
  light: 'group-hover/btn:text-cream',
  bronze: 'group-hover/btn:text-cream',
  solid: '',
  ghost: '',
}

export default function Button({
  as,
  to,
  href,
  variant = 'solid',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const sweep = sweeps[variant]
  const cls = [base, sizes[size], variants[variant], className].join(' ')

  const inner = (
    <>
      {sweep && (
        <span
          aria-hidden="true"
          className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[600ms] ease-lux group-hover/btn:scale-y-100 ${sweep}`}
        />
      )}
      <span className={`relative z-10 flex items-center gap-3 transition-colors duration-500 ${hoverText[variant] ?? ''}`}>
        {children}
      </span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {inner}
      </a>
    )
  }
  const Tag = as || 'button'
  return (
    <Tag className={cls} {...props}>
      {inner}
    </Tag>
  )
}
