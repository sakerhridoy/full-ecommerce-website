import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { useCart } from '../context/CartContext.jsx';

function CartIcon() {
  const { cartCount } = useCart();

  return (
    <Link
      to="/cart"
      className="relative p-2.5 rounded-xl hover:bg-[#A0C878]/10 transition-all duration-300 group"
      aria-label={`View cart (${cartCount} items)`}
    >
      <HiOutlineShoppingCart className="text-2xl md:text-3xl text-gray-800 group-hover:text-[#A0C878] transition-colors duration-300" />

      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 bg-[#A0C878] text-white text-xs font-bold rounded-full px-1 shadow-lg animate-pulse">
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      )}
    </Link>
  );
}

export default CartIcon;
