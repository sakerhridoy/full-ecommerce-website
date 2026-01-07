import { Link } from 'react-router-dom';
import heroImage from '../assets/imgs/banner2.png';

function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#FAF6E9] via-white to-[#f0fdf4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <span className="inline-block px-4 py-2 bg-[#A0C878]/10 text-[#A0C878] font-semibold text-sm rounded-full uppercase tracking-wider mb-6">
              New Collection 2026
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Everything you need
              <br />
              <span className="text-[#A0C878]">for everyday</span> adventures.
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 mb-10">
              Discover thoughtfully designed essentials for work, travel, and
              life. Comfort meets style — built to last.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/shop"
                className="px-8 py-4 bg-[#A0C878] hover:bg-[#8bb15c] text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Shop Now →
              </Link>
              <Link
                to="/shop"
                className="px-8 py-4 border-2 border-gray-300 hover:border-[#A0C878] text-gray-800 hover:text-[#A0C878] font-semibold text-lg rounded-xl transition-all duration-300"
              >
                Explore Collection
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Premium everyday essentials collection"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
