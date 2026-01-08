import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useProducts } from '../context/ProductsContext.jsx';

function ProductDetail() {
  const { productId } = useParams(); // string আসে
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getProductById, loadProductIfMissing } = useProducts();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // First try to get from local products
        let prod = getProductById(productId);

        // If not found locally, fetch from API
        if (!prod) {
          prod = await loadProductIfMissing(productId);
        }

        setProduct(prod || null);
      } catch (error) {
        console.error('Error loading product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId, getProductById, loadProductIfMissing]);

  const handleAdd = () => {
    if (product) {
      addToCart(product.id, quantity);
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-32 text-xl text-gray-600">
        Loading product details…
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Product Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-10 text-center max-w-md">
          Sorry, the product you're looking for doesn't exist or has been
          removed.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-[#A0C878] hover:bg-[#8bb15c] text-white px-10 py-5 rounded-xl text-xl font-bold transition"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <span className="text-[#A0C878] font-semibold uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-[#A0C878] mt-6">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {product.rating && (
              <div className="flex items-center gap-3">
                <span className="text-yellow-500 text-2xl">★</span>
                <span className="text-xl font-semibold">
                  {product.rating.toFixed(1)} / 5
                </span>
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
                  onChange={e =>
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
                className="flex-1 py-5 px-10 bg-[#A0C878] hover:bg-[#8bb15c] text-white text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
