import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext.jsx';

function OrderSuccess() {
  const { items, clearCart } = useCart();

  // Optional: Clear cart on page load (in case user refreshes)
  useEffect(() => {
    if (items.length > 0) {
      clearCart();
    }
  }, [items, clearCart]);

  return (
    <section className="py-16 md:py-28 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-10">
            <div className="w-28 h-28 md:w-32 md:h-32 mx-auto bg-[#A0C878]/10 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 md:w-20 md:h-20 text-[#A0C878]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Thank You!
            <br />
            Your Order is Confirmed
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            We’ve received your order and it’s being prepared with care. You’ll
            receive an email confirmation shortly with your order details and
            tracking information.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <p className="text-lg text-gray-600 mb-4">
              A confirmation email has been sent to your inbox.
            </p>
            <p className="text-gray-500">
              Check your spam folder if you don’t see it in a few minutes.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/shop"
              className="px-10 py-5 bg-[#A0C878] hover:bg-[#8bb15c] text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Continue Shopping →
            </Link>

            <Link
              to="/"
              className="px-10 py-5 border-2 border-[#A0C878] text-[#A0C878] hover:bg-[#A0C878] hover:text-white text-xl font-bold rounded-xl transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>

          {/* Trust Message */}
          <p className="mt-16 text-lg text-gray-600 max-w-2xl mx-auto">
            Need help?{' '}
            <Link
              to="/contact"
              className="text-[#A0C878] font-medium hover:underline"
            >
              Contact our support team
            </Link>{' '}
            — we’re here for you 24/7.
          </p>
        </div>
      </div>
    </section>
  );
}

export default OrderSuccess;
