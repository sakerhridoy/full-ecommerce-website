import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext.jsx'

function CartIcon() {
  const { cartCount } = useCart()

  return (
    <Link to="/cart" className="cart-icon" aria-label="Cart">
      <FaShoppingCart />
      {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
    </Link>
  )
}

export default CartIcon
