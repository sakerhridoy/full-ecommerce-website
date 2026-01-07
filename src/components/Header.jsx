import { Link, NavLink } from 'react-router-dom'
import CartIcon from './CartIcon.jsx'

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo-mark">
          full<span>store</span>
        </Link>
        <nav className="main-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Shop
          </NavLink>
        </nav>
        <CartIcon />
      </div>
    </header>
  )
}

export default Header
