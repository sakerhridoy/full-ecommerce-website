import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useProducts } from '../context/ProductsContext.jsx';

function Wishlist() {
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { products } = useProducts();
  const wishlistProducts = products.filter(product =>
    wishlistItems.includes(product.id)
  );

  if (wishlistProducts.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-gray-400"
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
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Save your favorite items for later and find them here.
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-4 bg-[#A0C878] hover:bg-[#8bb15c] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          My Wishlist ({wishlistProducts.length})
        </h1>

        <ProductGrid products={wishlistProducts} />

        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-block px-10 py-5 bg-[#A0C878] hover:bg-[#8bb15c] text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Continue Shopping →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Wishlist;
