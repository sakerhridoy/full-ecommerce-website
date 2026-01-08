import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useProducts } from '../context/ProductsContext.jsx';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products, status, getProductById, loadProductIfMissing } = useProducts();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    let active = true;

    async function resolveProduct() {
      if (!productId) return;

      setLoading(true);

      // 1. Try from context
      const localProduct = getProductById(productId);
      if (localProduct) {
        if (active) {
          setProduct(localProduct);
          setLoading(false);
        }
        return;
      }

      // 2. If not found, fetch from API
      const fetched = await loadProductIfMissing(productId);
      if (active) {
        setProduct(fetched);
        setLoading(false);
      }
    }

    resolveProduct();

    return () => {
      active = false;
    };
  }, [productId]);

  const handleAdd = () => {
    if (product) {
      addToCart(product.id, quantity);
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-32">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#A0C878]" />
        <p className="mt-4">Loading product...</p>
      </div>
    );
  }
  // Show not found state
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Product Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-4 text-center max-w-md">
          Product ID: {productId}
        </p>
        <p className="text-xl text-gray-600 mb-10 text-center max-w-md">
          Sorry, the product you're looking for doesn't exist or has been removed.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-10 py-5 rounded-xl text-xl font-bold transition"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="bg-[#A0C878] hover:bg-[#8bb15c] text-white px-10 py-5 rounded-xl text-xl font-bold transition"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-[#A0C878] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name || 'Product image'}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x600?text=No+Image';
                }}
              />
            ) : (
              <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-lg">No Image Available</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              {product.category && (
                <span className="text-[#A0C878] font-semibold uppercase tracking-wider">
                  {product.category}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
                {product.name || 'Untitled Product'}
              </h1>
              <p className="text-3xl font-bold text-[#A0C878] mt-6">
                ${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
              </p>
            </div>

            {product.description ? (
              <p className="text-lg text-gray-700 leading-relaxed">
                {product.description}
              </p>
            ) : (
              <p className="text-lg text-gray-500 italic">
                No description available for this product.
              </p>
            )}

            <div className="flex items-center gap-6 flex-wrap">
              {product.rating && product.rating > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-2xl">★</span>
                  <span className="text-xl font-semibold">
                    {product.rating.toFixed(1)} / 5
                  </span>
                </div>
              )}
              {product.inStock !== false ? (
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold text-sm">
                  In Stock
                </span>
              ) : (
                <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full font-semibold text-sm">
                  Out of Stock
                </span>
              )}
            </div>

            {product.tags && Array.isArray(product.tags) && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-6">
              <div className="flex items-center border-2 border-gray-300 rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity === 1}
                  className="px-4 py-3 text-xl font-bold hover:bg-gray-100 disabled:opacity-50"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value) || 1))
                  }
                  className="w-20 text-center py-3 text-xl font-semibold outline-none"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-xl font-bold hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={product.inStock === false}
                className="flex-1 py-5 px-10 bg-[#A0C878] hover:bg-[#8bb15c] disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
