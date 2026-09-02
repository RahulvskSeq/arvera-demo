import { formatINR } from '../data/products'

export default function Price({ product, size = 'md', className = '' }) {
  const scale =
    size === 'lg'
      ? { now: 'text-2xl md:text-[28px]', was: 'text-sm', off: 'text-[11px]' }
      : size === 'sm'
        ? { now: 'text-[13px]', was: 'text-[11px]', off: 'text-[10px]' }
        : { now: 'text-[15px] md:text-base', was: 'text-xs md:text-[13px]', off: 'text-[10px]' }

  return (
    <div className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${className}`}>
      <span className={`font-sans font-normal tracking-tight text-char ${scale.now}`}>
        {formatINR(product.price)}
      </span>
      <span className={`font-sans font-light text-stone line-through ${scale.was}`}>
        {formatINR(product.mrp)}
      </span>
      <span className={`font-sans font-medium uppercase tracking-wider2 text-bronze ${scale.off}`}>
        {product.discount}% off
      </span>
      {product.unit && (
        <span className={`font-sans font-light lowercase tracking-wide text-stone ${scale.off}`}>
          {product.unit}
        </span>
      )}
    </div>
  )
}
