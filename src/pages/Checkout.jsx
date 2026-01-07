import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useProducts } from '../context/ProductsContext.jsx'

function Checkout() {
  const navigate = useNavigate()
  const { items, clearCart } = useCart()
  const { products, status } = useProducts()

  const entries = items
    .map((item) => {
      const product = products.find((p) => p.id === String(item.id))
      return product
        ? { ...product, quantity: item.quantity, lineTotal: product.price * item.quantity }
        : null
    })
    .filter(Boolean)

  const subtotal = entries.reduce((sum, entry) => sum + entry.lineTotal, 0)

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    clearCart()
    navigate('/')
  }

  if (!items.length) {
    return (
      <section className="section">
        <div className="container">
          <h1>Checkout</h1>
          <p className="section-subtitle">Your cart is empty. Add items before checking out.</p>
        </div>
      </section>
    )
  }

  if (items.length && !entries.length && status === 'loading') {
    return (
      <section className="section">
        <div className="container">
          <h1>Checkout</h1>
          <p className="muted">Loading order details…</p>
        </div>
      </section>
    )
  }

  if (!entries.length) {
    return (
      <section className="section">
        <div className="container">
          <h1>Checkout</h1>
          <p className="section-subtitle">We couldn&apos;t find any products in your cart.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container checkout-layout">
        <div className="checkout-form-wrap">
          <h1>Checkout</h1>
          <p className="section-subtitle">We&apos;ll use this information to send your order.</p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="field-group">
              <label className="field-label" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                name="name"
                className="field-input"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field-group">
              <label className="field-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="field-input"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field-group">
              <label className="field-label" htmlFor="address">
                Address
              </label>
              <input
                id="address"
                name="address"
                className="field-input"
                value={formState.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field-row">
              <div className="field-group">
                <label className="field-label" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  className="field-input"
                  value={formState.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field-group">
                <label className="field-label" htmlFor="country">
                  Country/Region
                </label>
                <input
                  id="country"
                  name="country"
                  className="field-input"
                  value={formState.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary full-width">
              Place order
            </button>
          </form>
        </div>
        <aside className="checkout-summary">
          <h2>Order summary</h2>
          <ul className="summary-list">
            {entries.map((entry) => (
              <li key={entry.id} className="summary-line">
                <span>
                  {entry.name} × {entry.quantity}
                </span>
                <span>${entry.lineTotal.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="summary-total">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </p>
        </aside>
      </div>
    </section>
  )
}

export default Checkout
