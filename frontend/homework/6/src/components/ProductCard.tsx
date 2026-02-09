import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Product } from '../types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate()

  const { discountedPrice, hasDiscount } = useMemo(() => {
    const hasDiscountValue = product.discountPercentage > 0
    const discounted = hasDiscountValue
      ? product.price * (1 - product.discountPercentage / 100)
      : product.price
    return { discountedPrice: discounted, hasDiscount: hasDiscountValue }
  }, [product.discountPercentage, product.price])

  const handleClick = useCallback(() => {
    navigate(`/product/${product.id}`)
  }, [navigate, product.id])

  return (
    <button className="card" onClick={handleClick} type="button">
      <div className="card__media">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        {hasDiscount && (
          <span className="badge">-{product.discountPercentage.toFixed(0)}%</span>
        )}
      </div>
      <div className="card__body">
        <h3 className="card__title">{product.title}</h3>
        <div className="card__price">
          {hasDiscount ? (
            <>
              <span className="price price--current">${discountedPrice.toFixed(2)}</span>
              <span className="price price--old">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="price price--current">${product.price.toFixed(2)}</span>
          )}
        </div>
        <div className="card__meta">
          <span className="rating">? {product.rating.toFixed(1)}</span>
          <span className="brand">{product.brand}</span>
        </div>
      </div>
    </button>
  )
}
