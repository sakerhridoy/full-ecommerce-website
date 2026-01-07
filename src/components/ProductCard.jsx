import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
      </Link>
      <div className="product-body">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
        </div>
        <h3 className="product-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <div className="product-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              addToCart(product.id, 1)
            }}
          >
            Add to cart
          </button>
          <Link to={`/product/${product.id}`} className="btn btn-text">
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
