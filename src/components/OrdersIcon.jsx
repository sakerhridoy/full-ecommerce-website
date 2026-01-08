import { Link } from 'react-router-dom';

function OrdersIcon() {
  return (
    <Link
      to="/my-orders"
      className="relative p-2.5 rounded-xl hover:bg-[#A0C878]/10 transition-all duration-300 group"
      aria-label="My Orders"
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
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    </Link>
  );
}

export default OrdersIcon;
