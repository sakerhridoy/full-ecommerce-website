import { Link } from 'react-router-dom';
import banner from '../assets/imgs/banner.png';

function Banner() {
  return (
    <section className="py-16 md:py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center bg-linear-to-r from-[#f0fdf4] to-[#ecfccb] rounded-3xl shadow-xl overflow-hidden">
          {/* Text Content - Mobile First */}
          <div className="px-8 py-12 md:px-12 lg:px-16 text-center md:text-left order-2 md:order-1">
            <span className="inline-block px-4 py-2 bg-white/80 text-[#A0C878] font-bold text-sm rounded-full uppercase tracking-wider mb-4">
              Limited Time Only
            </span>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Up to <span className="text-[#A0C878]">30% Off</span>
              <br />
              Selected Essentials
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto md:mx-0">
              Upgrade your daily carry with premium quality at unbeatable
              prices. Sale ends soon!
            </p>
            <Link
              to="/shop"
              className="inline-block px-10 py-5 bg-[#A0C878] hover:bg-[#8bb15c] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Shop Sale Now →
            </Link>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 relative h-80 md:h-full min-h-96">
            <img
              src={banner}
              alt="Up to 30% off selected essentials"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-l from-transparent via-transparent to-[#f0fdf4]/70 md:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
