import { Link } from 'react-router-dom';

function MyOrders() {
  // ডেমোর জন্য কিছু ফেক অর্ডার
  const orders = [
    {
      id: 'ORD-2026-001',
      date: 'January 05, 2026',
      status: 'Delivered',
      total: 129.99,
      items: 3,
    },
    {
      id: 'ORD-2026-002',
      date: 'December 28, 2025',
      status: 'Shipped',
      total: 89.5,
      items: 2,
    },
    {
      id: 'ORD-2025-015',
      date: 'December 15, 2025',
      status: 'Delivered',
      total: 199.0,
      items: 5,
    },
  ];

  if (orders.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-8">My Orders</h1>
          <p className="text-xl text-gray-600">
            You haven't placed any orders yet.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block px-8 py-4 bg-[#A0C878] text-white rounded-xl"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          My Orders
        </h1>

        <div className="max-w-5xl mx-auto space-y-8">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="text-xl font-bold text-gray-900">{order.id}</p>
                  <p className="text-gray-600 mt-1">{order.date}</p>
                </div>

                <div className="text-center md:text-right">
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="text-center md:text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold text-[#A0C878]">
                    ${order.total.toFixed(2)}
                  </p>
                  <p className="text-gray-600">{order.items} items</p>
                </div>

                <div className="text-center md:text-right">
                  <button className="px-6 py-3 border border-[#A0C878] text-[#A0C878] hover:bg-[#A0C878] hover:text-white rounded-xl transition-all font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

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

export default MyOrders;
