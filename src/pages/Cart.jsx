import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useProducts } from '../context/ProductsContext.jsx';

function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const { products, status } = useProducts();

  const entries = items
    .map(item => {
      const product = products.find(p => p.id === String(item.id));
      return product
        ? {
            ...product,
            quantity: item.quantity,
            lineTotal: product.price * item.quantity,
          }
        : null;
    })
    .filter(Boolean);

  const subtotal = entries.reduce((sum, entry) => sum + entry.lineTotal, 0);

  // Empty Cart State
  if (!items.length) {
    return (
      <section className="py-16 md:py-24 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gray-200/70 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Looks like you haven't added anything yet. Start shopping!
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

  // Loading State (when products are still loading)
  if (items.length && !entries.length && status === 'loading') {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Your cart</h1>
          <p className="text-gray-600 text-lg">Loading cart details…</p>
          <div className="mt-8 inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#A0C878]"></div>
        </div>
      </section>
    );
  }

  // Main Cart View
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          Your Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <ul className="space-y-6">
              {entries.map(entry => (
                <li
                  key={entry.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row gap-6 p-6">
                    {/* Image */}
                    <Link to={`/product/${entry.id}`} className="shrink-0">
                      <img
                        src={entry.image}
                        alt={entry.name}
                        className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl"
                        loading="lazy"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link
                          to={`/product/${entry.id}`}
                          className="block text-xl font-semibold text-gray-900 hover:text-[#A0C878] transition-colors"
                        >
                          {entry.name}
                        </Link>
                        <p className="text-gray-500 mt-1">{entry.category}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(entry.id)}
                        className="text-red-600 hover:text-red-700 font-medium text-sm mt-4 self-start"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex flex-col items-end justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 bg-gray-100 rounded-xl px-4 py-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(entry.id, entry.quantity - 1)
                          }
                          className="w-8 h-8 rounded-lg bg-white hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition"
                          disabled={entry.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-semibold text-gray-900">
                          {entry.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(entry.id, entry.quantity + 1)
                          }
                          className="w-8 h-8 rounded-lg bg-white hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Total */}
                      <p className="text-2xl font-bold text-[#A0C878] mt-6">
                        ${entry.lineTotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Clear Cart */}
            <div className="mt-8 text-right">
              <button
                type="button"
                onClick={clearCart}
                className="text-gray-600 hover:text-red-600 font-medium underline"
              >
                Clear entire cart
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <dl className="space-y-4 mb-8">
                <div className="flex justify-between text-lg">
                  <dt className="text-gray-700">Subtotal</dt>
                  <dd className="font-semibold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </dd>
                </div>
                <div className="flex justify-between text-lg">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd className="text-gray-600">Calculated at checkout</dd>
                </div>
                {/* Future: Tax, Discount, etc. */}
              </dl>

              <div className="border-t-2 border-gray-200 pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-3xl font-bold text-[#A0C878]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full block text-center py-5 px-8 bg-[#A0C878] hover:bg-[#8bb15c] text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Proceed to Checkout
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Cart;
