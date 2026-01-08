import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext.jsx';

function WishlistIcon() {
  const { wishlistCount } = useWishlist();

  return (
    <Link
      to="/wishlist"
      className="relative p-2.5 rounded-xl hover:bg-[#A0C878]/10 transition-all duration-300 group"
      aria-label={`Wishlist (${wishlistCount} items)`}
    >
      <svg
        className="w-7 h-7 text-gray-800 group-hover:text-[#A0C878] transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>

      {wishlistCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-5 h-5 bg-[#A0C878] text-white text-xs font-bold rounded-full flex items-center justify-center px-1 shadow-lg">
          {wishlistCount > 99 ? '99+' : wishlistCount}
        </span>
      )}
    </Link>
  );
}

export default WishlistIcon;
