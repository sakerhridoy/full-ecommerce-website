import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import CartIcon from './CartIcon.jsx';
import { HiOutlineUserCircle } from "react-icons/hi2";
import WishlistIcon from './WishlistIcon.jsx';
import OrdersIcon from './OrdersIcon.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import logo from '../assets/imgs/logo.png';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  /* ---------- Header scroll effect ---------- */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ---------- Mobile swipe-down logic ---------- */
  const sheetRef = useRef(null);
  const startY = useRef(0);

  const onTouchStart = e => {
    startY.current = e.touches[0].clientY;
  };

  const onTouchMove = e => {
    const delta = e.touches[0].clientY - startY.current;
    if (delta > 120) {
      closeMenus();
    }
  };

  /* ---------- Helpers ---------- */
  const closeMenus = () => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenus();
    navigate('/');
  };

  const handleSearch = e => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    closeMenus();
  };

  const formatPathLabel = path =>
    path
      .replace('/', '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 shadow-lg backdrop-blur-xl'
            : 'bg-[#FFFDF6]/90 backdrop-blur-md'
        } border-b border-gray-200/50`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" onClick={closeMenus}>
              <img src={logo} alt="Logo" className="h-10 md:h-12 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-2">
              {['/', '/shop', '/about', '/contact'].map(path => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    `px-5 py-3 rounded-xl font-medium transition ${
                      isActive
                        ? 'bg-[#A0C878] text-white'
                        : 'text-gray-700 hover:bg-[#A0C878]/10'
                    }`
                  }
                >
                  {path === '/' ? 'Home' : formatPathLabel(path)}
                </NavLink>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              <WishlistIcon />
              <OrdersIcon />
              <CartIcon />

              {/* User */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="pt-1 p-2.5 rounded-xl hover:bg-[#A0C878]/10 transition-all duration-300 group"
                >
                  <HiOutlineUserCircle className="text-3xl group-hover:text-[#A0C878] transition-colors duration-300" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border">
                    {user ? (
                      <>
                        <div className="p-4 border-b">
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <Link
                          to="/orders"
                          onClick={closeMenus}
                          className="block px-4 py-3 hover:bg-gray-50"
                        >
                          My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          onClick={closeMenus}
                          className="block px-4 py-3 hover:bg-gray-50"
                        >
                          Wishlist
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <div className="p-4 space-y-2">
                        <Link
                          to="/login"
                          onClick={closeMenus}
                          className="block text-center py-2 bg-gray-50 rounded"
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          onClick={closeMenus}
                          className="block text-center py-2 bg-[#A0C878] text-white rounded"
                        >
                          Register
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Animated Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden relative w-10 h-10"
              >
                <span
                  className={`absolute h-0.5 w-6 bg-black left-2 transition-all ${
                    mobileMenuOpen ? 'rotate-45 top-5' : 'top-3'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-black left-2 top-5 transition ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-black left-2 transition-all ${
                    mobileMenuOpen ? '-rotate-45 top-5' : 'top-7'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE BOTTOM SHEET ================= */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={closeMenus}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Bottom Sheet */}
          <div
            ref={sheetRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl animate-sheetUp"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3">
              <div className="w-14 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="px-6 mt-6">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border focus:border-[#A0C878] outline-none"
              />
            </form>

            {/* Links */}
            <nav className="px-6 py-6 space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/shop', label: 'Shop' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={closeMenus}
                  className={({ isActive }) =>
                    `block px-6 py-4 rounded-2xl text-lg font-medium ${
                      isActive
                        ? 'bg-[#A0C878] text-white'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            {/* User */}
            <div className="border-t px-6 py-6">
              {user ? (
                <>
                  <p className="text-center font-semibold mb-4">{user.name}</p>
                  <Link
                    to="/orders"
                    onClick={closeMenus}
                    className="block py-3 text-center rounded bg-gray-50"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={closeMenus}
                    className="block py-3 mt-2 text-center rounded bg-gray-50"
                  >
                    Wishlist
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full mt-4 py-3 rounded bg-red-50 text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenus}
                    className="block py-3 text-center rounded bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMenus}
                    className="block py-3 mt-2 text-center rounded bg-[#A0C878] text-white"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Header;
