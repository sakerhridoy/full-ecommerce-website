import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useProducts } from '../context/ProductsContext.jsx';

function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
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

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
  });

  const [promoCode, setPromoCode] = useState('');
  const [showPromo, setShowPromo] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    clearCart();
    navigate('/order-success');
  };

  if (!items.length) {
    return (
      <section className="py-16 md:py-24 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Checkout
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your cart is empty. Add items before checking out.
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="px-8 py-4 bg-[#A0C878] hover:bg-[#8bb15c] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Loading State
  if (items.length && !entries.length && status === 'loading') {
    return (
      <section className="py-16 md:py-24 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>
          <p className="text-gray-600 text-lg mb-6">Loading order details…</p>
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#A0C878]"></div>
        </div>
      </section>
    );
  }

  // Invalid State (no matching products)
  if (!entries.length) {
    return (
      <section className="py-16 md:py-24 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Checkout</h1>
          <p className="text-xl text-red-600">
            We couldn&apos;t find any products in your cart.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Indicator */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <ol className="flex items-center justify-center space-x-8 text-sm font-medium text-gray-500">
            <li className="flex items-center text-[#A0C878]">
              <span className="w-8 h-8 rounded-full bg-[#A0C878] text-white flex items-center justify-center mr-3">
                1
              </span>
              Cart
            </li>
            <li className="flex items-center text-[#A0C878] font-bold">
              <span className="w-8 h-8 rounded-full bg-[#A0C878] text-white flex items-center justify-center mr-3">
                2
              </span>
              Checkout
            </li>
            <li className="flex items-center">
              <span className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mr-3">
                3
              </span>
              Confirmation
            </li>
          </ol>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
          Checkout
        </h1>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Complete your order by providing shipping information below.
        </p>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Shipping Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-[#A0C878] focus:ring-4 focus:ring-[#A0C878]/20 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-[#A0C878] focus:ring-4 focus:ring-[#A0C878]/20 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Street Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={formState.address}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-[#A0C878] focus:ring-4 focus:ring-[#A0C878]/20 transition-all"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      value={formState.city}
                      onChange={handleChange}
                      placeholder="New York"
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-[#A0C878] focus:ring-4 focus:ring-[#A0C878]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Country / Region
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      required
                      value={formState.country}
                      onChange={handleChange}
                      placeholder="United States"
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-[#A0C878] focus:ring-4 focus:ring-[#A0C878]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Promo Code Toggle */}
                <div className="pt-4">
                  {!showPromo ? (
                    <button
                      type="button"
                      onClick={() => setShowPromo(true)}
                      className="text-[#A0C878] font-medium hover:underline"
                    >
                      Have a promo code?
                    </button>
                  ) : (
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={e => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 px-5 py-4 rounded-xl border border-gray-300 focus:border-[#A0C878] focus:ring-4 focus:ring-[#A0C878]/20 transition-all"
                      />
                      <button
                        type="button"
                        className="px-6 py-4 bg-gray-200 hover:bg-gray-300 rounded-xl font-medium transition-all"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full mt-8 py-6 px-8 bg-[#A0C878] hover:bg-[#8bb15c] text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Place Order – ${subtotal.toFixed(2)}
                </button>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center items-center gap-8 mt-8 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Secure Checkout
                  </span>
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a6.98 6.98 0 017.9 0H17a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
                    </svg>
                    Free Shipping
                  </span>
                  <span className="flex items-center gap-2">
                    30-Day Returns
                  </span>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary ({items.length}{' '}
                {items.length === 1 ? 'item' : 'items'})
              </h2>

              <ul className="space-y-6 mb-8">
                {entries.map(entry => (
                  <li key={entry.id} className="flex gap-4">
                    {entry.image && (
                      <img
                        src={entry.image}
                        alt={entry.name}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200 shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {entry.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {entry.quantity}
                      </p>
                      <p className="font-semibold text-gray-900 mt-1">
                        ${entry.lineTotal.toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t-2 border-gray-200 pt-6 space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-[#A0C878] font-medium">Free</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-300">
                  <span className="text-2xl font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-3xl font-bold text-[#A0C878]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
