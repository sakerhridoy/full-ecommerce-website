import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useProducts } from '../context/ProductsContext.jsx'

function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart()
  const { products, status } = useProducts()

  const entries = items
    .map((item) => {
      const product = products.find((p) => p.id === String(item.id))
      return product
        ? {
            ...product,
            quantity: item.quantity,
            lineTotal: product.price * item.quantity,
          }
        : null
    })
    .filter(Boolean)

  const subtotal = entries.reduce((sum, entry) => sum + entry.lineTotal, 0)

  if (!items.length) {
    return (
      <section className="section">
        <div className="container">
          <h1>Your cart</h1>
          <p className="section-subtitle">Your cart is empty. Start by adding something from the shop.</p>
          <Link to="/shop" className="btn btn-primary">
            Browse products
          </Link>
        </div>
      </section>
    )
  }

  if (items.length && !entries.length && status === 'loading') {
    return (
      <section className="section">
        <div className="container">
          <h1>Your cart</h1>
          <p className="muted">Loading cart details…</p>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container cart-layout">
        <div className="cart-items">
          <h1>Your cart</h1>
          <ul className="cart-list">
            {entries.map((entry) => (
              <li key={entry.id} className="cart-line">
                <div className="cart-line-main">
                  <img src={entry.image} alt={entry.name} className="cart-line-image" />
                  <div>
                    <h2 className="cart-line-title">{entry.name}</h2>
                    <p className="muted">{entry.category}</p>
                    <button
                      type="button"
                      className="btn btn-text"
                      onClick={() => removeFromCart(entry.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-line-controls">
                  <div className="quantity-controls">
                    <button
                      type="button"
                      className="btn btn-ghost small"
                      onClick={() => updateQuantity(entry.id, entry.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="quantity-value">{entry.quantity}</span>
                    <button
                      type="button"
                      className="btn btn-ghost small"
                      onClick={() => updateQuantity(entry.id, entry.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="cart-line-price">${entry.lineTotal.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn-text" onClick={clearCart}>
            Clear cart
          </button>
        </div>
        <aside className="cart-summary">
          <h2>Order summary</h2>
          <dl className="summary-rows">
            <div className="summary-row">
              <dt>Subtotal</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div className="summary-row">
              <dt>Shipping</dt>
              <dd className="muted">Calculated at checkout</dd>
            </div>
          </dl>
          <p className="summary-total">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </p>
          <Link to="/checkout" className="btn btn-primary full-width">
            Checkout
          </Link>
        </aside>
      </div>
    </section>
  )
}

export default Cart
