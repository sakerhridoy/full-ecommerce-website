import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext.jsx'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <motion.article
      className="product-card"
      whileHover={{ y: -6, boxShadow: '0 18px 40px rgba(15, 23, 42, 0.22)', borderColor: '#cbd5f1' }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
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
    </motion.article>
  )
}

export default ProductCard
