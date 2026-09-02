import ProductCard from './ProductCard'

export default function ProductGrid({ products, columns = 'default', className = '' }) {
  const cols =
    columns === 'wide'
      ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
      : columns === 'three'
        ? 'grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-2 md:grid-cols-3'

  return (
    <div className={`grid gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16 ${cols} ${className}`}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} priority={i < 4} />
      ))}
    </div>
  )
}
