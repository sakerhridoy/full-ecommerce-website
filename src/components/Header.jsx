import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import CartIcon from './CartIcon.jsx';
import WishlistIcon from './WishlistIcon.jsx';
import OrdersIcon from './OrdersIcon.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import logo from '../assets/imgs/logo.png';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Scroll effect for header background
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
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
          <Link to="/" className="shrink-0" onClick={closeMenus}>
            <img
              src={logo}
              alt="Fullstore logo"
              className="h-10 md:h-12 w-auto object-contain transition-transform hover:scale-105 duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-5 py-3 rounded-xl font-medium text-sm lg:text-base transition-all ${
                  isActive
                    ? 'bg-[#A0C878] text-white shadow-md'
                    : 'text-gray-700 hover:bg-[#A0C878]/10 hover:text-[#A0C878]'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `px-5 py-3 rounded-xl font-medium text-sm lg:text-base transition-all ${
                  isActive
                    ? 'bg-[#A0C878] text-white shadow-md'
                    : 'text-gray-700 hover:bg-[#A0C878]/10 hover:text-[#A0C878]'
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-5 py-3 rounded-xl font-medium text-sm lg:text-base transition-all ${
                  isActive
                    ? 'bg-[#A0C878] text-white shadow-md'
                    : 'text-gray-700 hover:bg-[#A0C878]/10 hover:text-[#A0C878]'
                }`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-5 py-3 rounded-xl font-medium text-sm lg:text-base transition-all ${
                  isActive
                    ? 'bg-[#A0C878] text-white shadow-md'
                    : 'text-gray-700 hover:bg-[#A0C878]/10 hover:text-[#A0C878]'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Right Side: Search + Icons + User */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Icons */}
            <WishlistIcon />
            <OrdersIcon />
            <CartIcon />

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(prev => !prev)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="User menu"
              >
                <svg
                  className="w-7 h-7 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>

              {/* Dropdown Panel */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  {user ? (
                    <>
                      <div className="px-5 py-4 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/orders"
                          onClick={closeMenus}
                          className="block px-5 py-3 text-gray-700 hover:bg-gray-50"
                        >
                          My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          onClick={closeMenus}
                          className="block px-5 py-3 text-gray-700 hover:bg-gray-50"
                        >
                          Wishlist
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-5 py-3 text-red-600 hover:bg-red-50 font-medium"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="py-4 px-5 space-y-3">
                      <Link
                        to="/login"
                        onClick={closeMenus}
                        className="block px-5 py-3 text-gray-700 hover:bg-gray-50 font-medium text-center rounded-xl"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={closeMenus}
                        className="block px-5 py-3 bg-[#A0C878] text-white hover:bg-[#8bb15c] text-center rounded-xl font-medium"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden p-2.5 rounded-xl hover:bg-gray-100"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-200">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="px-4 mb-6">
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#A0C878] focus:outline-none focus:ring-4 focus:ring-[#A0C878]/20 transition-all"
                />
              </div>
            </form>

            {/* Mobile Nav Links */}
            <nav className="px-4 space-y-2">
              <NavLink
                to="/"
                end
                onClick={closeMenus}
                className="block py-4 px-6 text-center rounded-xl font-medium text-lg bg-gray-50 hover:bg-gray-100"
              >
                Home
              </NavLink>
              <NavLink
                to="/shop"
                onClick={closeMenus}
                className="block py-4 px-6 text-center rounded-xl font-medium text-lg bg-gray-50 hover:bg-gray-100"
              >
                Shop
              </NavLink>
              <NavLink
                to="/about"
                onClick={closeMenus}
                className="block py-4 px-6 text-center rounded-xl font-medium text-lg bg-gray-50 hover:bg-gray-100"
              >
                About Us
              </NavLink>
              <NavLink
                to="/contact"
                onClick={closeMenus}
                className="block py-4 px-6 text-center rounded-xl font-medium text-lg bg-gray-50 hover:bg-gray-100"
              >
                Contact
              </NavLink>
            </nav>

            {/* Mobile User Section */}
            <div className="mt-6 px-4 border-t border-gray-200 pt-6">
              {user ? (
                <div className="space-y-3">
                  <p className="text-center font-medium text-gray-900">
                    Signed in as {user.name}
                  </p>
                  <Link
                    to="/orders"
                    onClick={closeMenus}
                    className="block py-3 text-center rounded-xl bg-gray-50 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={closeMenus}
                    className="block py-3 text-center rounded-xl bg-gray-50 hover:bg-gray-100"
                  >
                    Wishlist
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 text-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    onClick={closeMenus}
                    className="block py-3 text-center rounded-xl bg-gray-50 hover:bg-gray-100 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMenus}
                    className="block py-3 text-center rounded-xl bg-[#A0C878] text-white hover:bg-[#8bb15c] font-medium"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
