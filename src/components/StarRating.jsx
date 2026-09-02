import { Star } from 'lucide-react'

export default function StarRating({ value = 0, size = 12, className = '', showValue = false, reviews }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-[3px]" aria-label={`Rated ${value} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            strokeWidth={1.2}
            className={i <= Math.round(value) ? 'fill-bronze text-bronze' : 'text-sand'}
          />
        ))}
      </div>
      {showValue && (
        <span className="font-sans text-[11px] font-light tracking-wide text-stone">
          {value.toFixed(1)}
          {reviews != null && ` · ${reviews} reviews`}
        </span>
      )}
    </div>
  )
}
