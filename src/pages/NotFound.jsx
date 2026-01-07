import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function NotFound() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = e => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/shop');
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Optional Illustration – replace with your own SVG/image */}
        <div className="mb-12">
          <div className="w-64 h-64 mx-auto bg-gray-200 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-500">
            <span className="text-lg">
              Add cute plant/leaf illustration here 🌿
            </span>
          </div>
        </div>

        <h1 className="text-8xl md:text-9xl font-bold text-gray-900 mb-6 animate-fadeIn">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Oops! This page got lost in the garden.
        </h2>

        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          The page you're looking for doesn't exist. It might have been moved,
          pruned, or just wandered off.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Link
            to="/"
            className="px-8 py-4 bg-[#A0C878] hover:bg-[#8bb15c] text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Back to Home
          </Link>

          <Link
            to="/shop"
            className="px-8 py-4 bg-white hover:bg-gray-100 text-[#A0C878] font-semibold text-lg rounded-xl shadow-lg border border-[#A0C878] transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Simple Search Recovery */}
        <div className="max-w-md mx-auto">
          <p className="text-gray-600 mb-4">
            Or search for what you're looking for:
          </p>
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-6 py-4 rounded-xl border border-gray-300 focus:border-[#A0C878] focus:ring-4 focus:ring-[#A0C878]/20 transition-all"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-[#A0C878] hover:bg-[#8bb15c] text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
