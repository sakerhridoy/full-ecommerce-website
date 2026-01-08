import { useNavigate } from 'react-router-dom'; // এটা যোগ করো
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

function ProductCard({ product }) {
  const navigate = useNavigate(); // নতুন
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const { addToCart } = useCart();

  const toggleWishlist = e => {
    e.stopPropagation(); // parent-এ click propagate হবে না
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = e => {
    e.stopPropagation(); // parent-এ click propagate হবে না
    addToCart(product.id, 1);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.article
      className="group relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 flex flex-col cursor-pointer" // cursor-pointer যোগ করো
      onClick={handleCardClick} // পুরো কার্ড clickable
      whileHover={{ y: -10, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Image Section - Link সরিয়ে দাও */}
      <div className="block shrink-0">
        <div className="relative aspect-square overflow-hidden bg-linear-to-br from-gray-50 to-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-400 px-2.5 py-2 bg-[#A0C878] hover:bg-[#8bb15c] text-white font-medium rounded-md shadow-2xl text-sm hidden sm:block"
          >
            Quick Add to Cart
          </button>

          {/* Wishlist Heart */}
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 p-3 bg-white/80 rounded-full shadow-lg hover:shadow-xl transition-all z-10"
          >
            <svg
              className={`w-6 h-6 ${
                inWishlist ? 'text-red-500 fill-current' : 'text-gray-600'
              }`}
              fill={inWishlist ? 'currentColor' : 'none'}
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
          </button>
        </div>
      </div>

      {/* Content Section - বাকি সব same */}
      <div className="p-5 md:p-6 flex flex-col grow justify-between">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium uppercase tracking-wider">
              {product.category}
            </span>
            {product.rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-lg">★</span>
                <span className="font-semibold text-gray-700">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          <h3 className="text-lg md:text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-[#A0C878] transition-colors duration-300">
            {product.name}
          </h3>

          <p className="text-2xl md:text-3xl font-bold text-[#A0C878]">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3.5 bg-[#A0C878] hover:bg-[#8bb15c] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 text-center"
          >
            Add to Cart
          </button>

          <button
            onClick={handleCardClick} // View Details ও clickable থাকবে
            className="flex-1 py-3.5 text-center border-2 border-[#A0C878] text-[#A0C878] hover:bg-[#A0C878] hover:text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default ProductCard;
