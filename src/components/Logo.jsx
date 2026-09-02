import { Link } from 'react-router-dom'

export default function Logo({ className = '', tagline = false, onClick }) {
  return (
    <Link to="/" onClick={onClick} className={`group inline-flex flex-col leading-none ${className}`} aria-label="ARVÉRA — home">
      <span className="font-display text-[26px] font-normal uppercase leading-none tracking-[0.26em] md:text-[30px]">
        Arvéra
      </span>
      {tagline && (
        <span className="mt-2 font-sans text-[8px] font-light uppercase tracking-ultra opacity-55 md:text-[9px]">
          Materials That Define Spaces
        </span>
      )}
    </Link>
  )
}
