import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { facets, priceBounds } from '../services/api'
import { formatINR } from '../data/products'

const GROUPS = [
  { key: 'category', label: 'Category' },
  { key: 'brand', label: 'Brand' },
  { key: 'finish', label: 'Finish' },
  { key: 'color', label: 'Colour' },
  { key: 'material', label: 'Material' },
  { key: 'thickness', label: 'Thickness' },
  { key: 'availability', label: 'Availability' },
]

export default function FilterPanel({ filters, onToggle, maxPrice, onPrice, counts }) {
  const [open, setOpen] = useState(() => ({ category: true, brand: false, finish: true }))

  return (
    <div className="divide-y divide-char/10 border-y border-char/10">
      {/* Price */}
      <Group
        label="Price"
        open={open.price ?? true}
        onToggle={() => setOpen((o) => ({ ...o, price: !(o.price ?? true) }))}
        active={maxPrice < priceBounds.max ? 1 : 0}
      >
        <div className="pb-1 pt-1">
          <input
            type="range"
            min={500}
            max={priceBounds.max}
            step={500}
            value={maxPrice}
            onChange={(e) => onPrice(Number(e.target.value))}
            aria-label="Maximum price"
            className="h-1 w-full cursor-pointer appearance-none bg-sand accent-bronze"
          />
          <div className="mt-3 flex justify-between font-sans text-[11px] font-light text-stone">
            <span>{formatINR(500)}</span>
            <span className="text-char">Up to {formatINR(maxPrice)}</span>
          </div>
        </div>
      </Group>

      {GROUPS.map((g) => (
        <Group
          key={g.key}
          label={g.label}
          open={open[g.key] ?? false}
          onToggle={() => setOpen((o) => ({ ...o, [g.key]: !o[g.key] }))}
          active={filters[g.key].length}
        >
          <ul className="space-y-2.5 pb-1">
            {facets[g.key].map((value) => {
              const checked = filters[g.key].includes(value)
              const n = counts?.[g.key]?.[value] ?? null
              return (
                <li key={value}>
                  <label className="group/f flex cursor-pointer items-center gap-3">
                    <span
                      className={`grid h-[15px] w-[15px] shrink-0 place-items-center border transition-colors duration-300 ${
                        checked ? 'border-char bg-char' : 'border-char/25 group-hover/f:border-char/60'
                      }`}
                    >
                      {checked && <span className="h-[5px] w-[5px] bg-cream" />}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => onToggle(g.key, value)}
                    />
                    <span
                      className={`flex-1 font-sans text-[13px] font-light transition-colors duration-300 ${
                        checked ? 'text-char' : 'text-graphite group-hover/f:text-char'
                      }`}
                    >
                      {value}
                    </span>
                    {n != null && (
                      <span className="font-sans text-[11px] font-light tabular-nums text-stone">{n}</span>
                    )}
                  </label>
                </li>
              )
            })}
          </ul>
        </Group>
      ))}
    </div>
  )
}

function Group({ label, open, onToggle, children, active }) {
  return (
    <div className="py-5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="flex items-center gap-2.5 font-sans text-[10px] font-medium uppercase tracking-ultra text-char">
          {label}
          {active > 0 && (
            <span className="grid h-4 min-w-4 place-items-center rounded-full bg-bronze px-1 font-sans text-[9px] leading-none text-white">
              {active}
            </span>
          )}
        </span>
        <span className="text-stone">
          {open ? <Minus size={14} strokeWidth={1.3} /> : <Plus size={14} strokeWidth={1.3} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
