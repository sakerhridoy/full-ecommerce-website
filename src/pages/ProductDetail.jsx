import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useProducts } from '../context/ProductsContext.jsx'

function ProductDetail() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { getProductById, loadProductIfMissing, status } = useProducts()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(() => getProductById(productId))
  const [localStatus, setLocalStatus] = useState('idle') // idle | loading | done | error

  useEffect(() => {
    let cancelled = false

    async function ensureProduct() {
      if (product) return

      setLocalStatus('loading')
      const loaded = await loadProductIfMissing(productId)
      if (!cancelled) {
        if (loaded) {
          setProduct(loaded)
          setLocalStatus('done')
        } else {
          setLocalStatus('error')
        }
      }
    }

    ensureProduct()

    return () => {
      cancelled = true
    }
  }, [product, productId, loadProductIfMissing])

  if (!product && (status === 'loading' || localStatus === 'loading')) {
    return (
      <section className="section">
        <div className="container">
          <p className="muted">Loading product…</p>
        </div>
      </section>
    )
  }

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <p>We couldn&apos;t find that product.</p>
        </div>
      </section>
    )
  }

  const handleAdd = () => {
    addToCart(product.id, quantity)
    navigate('/cart')
  }

  return (
    <section className="section">
      <div className="container product-detail">
        <div className="product-detail-image-wrap">
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>
        <div className="product-detail-body">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-meta-line">
            Rated {product.rating.toFixed(1)} / 5
          </p>
          <div className="product-detail-actions">
            <label className="field-group inline">
              <span className="field-label">Quantity</span>
              <input
                type="number"
                min="1"
                className="field-input quantity-input"
                value={quantity}
                onChange={(event) => {
                  const value = Number(event.target.value) || 1
                  setQuantity(value < 1 ? 1 : value)
                }}
              />
            </label>
            <button type="button" className="btn btn-primary" onClick={handleAdd}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
