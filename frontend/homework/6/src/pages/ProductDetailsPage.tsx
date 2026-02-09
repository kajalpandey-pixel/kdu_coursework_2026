import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProductById } from '../api'
import type { Product } from '../types'

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState<string>('')

  useEffect(() => {
    const numericId = Number(id)
    setIsLoading(true)
    setProduct(null)
    if (!numericId) {
      setError('Invalid product ID')
      setIsLoading(false)
      return
    }

    let isMounted = true

    fetchProductById(numericId)
      .then((data) => {
        if (!isMounted) return
        setProduct(data)
        setActiveImage(data.images[0] || data.thumbnail)
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
  }, [id])

  const { discountedPrice, hasDiscount } = useMemo(() => {
    if (!product) {
      return { discountedPrice: 0, hasDiscount: false }
    }
    const hasDiscountValue = product.discountPercentage > 0
    const discounted = hasDiscountValue
      ? product.price * (1 - product.discountPercentage / 100)
      : product.price
    return { discountedPrice: discounted, hasDiscount: hasDiscountValue }
  }, [product])

  const handleBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const handleThumbClick = useCallback((image: string) => {
    setActiveImage(image)
  }, [])

  if (isLoading) {
    return <div className="state">Loading product...</div>
  }

  if (error || !product) {
    return <div className="state state--error">{error || 'Product not found'}</div>
  }

  return (
    <section className="page">
      <button className="back" onClick={handleBack} type="button">
        Back
      </button>
      <div className="details">
        <div className="details__media">
          <div className="details__image">
            <img src={activeImage || product.thumbnail} alt={product.title} />
          </div>
          {product.images.length > 1 && (
            <div className="details__thumbs">
              {product.images.map((image) => (
                <button
                  className={
                    image === activeImage
                      ? 'thumb thumb--active'
                      : 'thumb'
                  }
                  key={image}
                  onClick={() => handleThumbClick(image)}
                  type="button"
                >
                  <img src={image} alt={product.title} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="details__content">
          <h1>{product.title}</h1>
          <p className="details__desc">{product.description}</p>
          <div className="details__price">
            {hasDiscount ? (
              <>
                <span className="price price--current">${discountedPrice.toFixed(2)}</span>
                <span className="price price--old">${product.price.toFixed(2)}</span>
                <span className="badge">-{product.discountPercentage.toFixed(0)}%</span>
              </>
            ) : (
              <span className="price price--current">${product.price.toFixed(2)}</span>
            )}
          </div>
          <div className="details__meta">
            <div>
              <span className="label">Rating</span>
              <span>? {product.rating.toFixed(1)} / 5</span>
            </div>
            <div>
              <span className="label">Stock</span>
              <span>{product.stock}</span>
            </div>
            <div>
              <span className="label">Brand</span>
              <span>{product.brand}</span>
            </div>
            <div>
              <span className="label">Category</span>
              <span>{product.category}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
