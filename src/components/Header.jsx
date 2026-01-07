import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartIcon from './CartIcon.jsx';
import logo from '../assets/imgs/logo.png';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect: header becomes more solid when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

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
          <Link to="/" className="shrink-0" aria-label="Fullstore homepage">
            <img
              src={logo}
              alt="Fullstore logo"
              className="h-10 md:h-12 w-auto object-contain transition-transform hover:scale-105 duration-300"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="Main navigation"
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-5 py-3 rounded-xl font-medium text-sm lg:text-base transition-all duration-200 ${
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
                `px-5 py-3 rounded-xl font-medium text-sm lg:text-base transition-all duration-200 ${
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
                `px-5 py-3 rounded-xl font-medium text-sm lg:text-base transition-all duration-200 ${
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
                `px-5 py-3 rounded-xl font-medium text-sm lg:text-base transition-all duration-200 ${
                  isActive
                    ? 'bg-[#A0C878] text-white shadow-md'
                    : 'text-gray-700 hover:bg-[#A0C878]/10 hover:text-[#A0C878]'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Right: Cart + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <CartIcon />
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
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
            <nav className="flex flex-col gap-2" id="mobile-menu">
              <NavLink
                to="/"
                end
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `py-4 px-6 text-center rounded-xl font-medium text-lg transition-all ${
                    isActive
                      ? 'bg-[#A0C878] text-white shadow-lg'
                      : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/shop"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `py-4 px-6 text-center rounded-xl font-medium text-lg transition-all ${
                    isActive
                      ? 'bg-[#A0C878] text-white shadow-lg'
                      : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                  }`
                }
              >
                Shop
              </NavLink>
              <NavLink
                to="/about"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `py-4 px-6 text-center rounded-xl font-medium text-lg transition-all ${
                    isActive
                      ? 'bg-[#A0C878] text-white shadow-lg'
                      : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                  }`
                }
              >
                About Us
              </NavLink>
              <NavLink
                to="/contact"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `py-4 px-6 text-center rounded-xl font-medium text-lg transition-all ${
                    isActive
                      ? 'bg-[#A0C878] text-white shadow-lg'
                      : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                  }`
                }
              >
                Contact
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
