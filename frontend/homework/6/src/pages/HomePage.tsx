import { useEffect, useMemo, useState } from 'react'
import { fetchProducts } from '../api'
import type { Product } from '../types'
import ProductCard from '../components/ProductCard'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    fetchProducts()
      .then((data) => {
        if (!isMounted) return
        setProducts(data.products)
        setError(null)
      })
      .catch((err: Error) => {
        if (!isMounted) return
        setError(err.message || 'Something went wrong')
      })
      .finally(() => {
        if (!isMounted) return
        setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const content = useMemo(() => {
    if (isLoading) {
      return <div className="state">Loading products...</div>
    }

    if (error) {
      return <div className="state state--error">{error}</div>
    }

    return (
      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )
  }, [error, isLoading, products])

  return (
    <section className="page">
      <div className="page__header">
        <h1>All Products</h1>
        <p>Discover the best picks across categories.</p>
      </div>
      {content}
    </section>
  )
}
