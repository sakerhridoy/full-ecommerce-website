import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Banner from '../components/Banner.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { useProducts } from '../context/ProductsContext.jsx';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// React Icons for custom arrows
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Home() {
  const { products, status } = useProducts();

  // Featured products for slider (more items for smooth sliding)
  const featured = products.slice(0, 12);

  return (
    <>
      <Hero />
      <Banner />

      {/* Featured Products Slider */}
      <section
        className="py-16 md:py-24 bg-gray-50"
        aria-labelledby="featured-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2
              id="featured-heading"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked favorites to get you started.
            </p>
          </header>

          {status === 'loading' && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#A0C878]"></div>
              <p className="mt-6 text-lg text-gray-600">
                Loading featured products…
              </p>
            </div>
          )}

          {status === 'success' && featured.length > 0 && (
            <>
              <div className="relative">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={24}
                  slidesPerView={1}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  loop={true}
                  navigation={{
                    prevEl: '.custom-prev',
                    nextEl: '.custom-next',
                  }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                  }}
                  className="pb-12"
                >
                  {featured.map(product => (
                    <SwiperSlide key={product.id}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Arrows */}
                <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-xl flex items-center justify-center text-[#A0C878] text-2xl transition-all hover:scale-110">
                  <FaChevronLeft />
                </button>
                <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-xl flex items-center justify-center text-[#A0C878] text-2xl transition-all hover:scale-110">
                  <FaChevronRight />
                </button>
              </div>

              {/* View All Products Button */}
              <div className="text-center mt-12">
                <Link
                  to="/shop"
                  className="inline-block px-10 py-5 bg-[#A0C878] hover:bg-[#8bb15c] text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View All Products →
                </Link>
              </div>
            </>
          )}

          {status === 'success' && featured.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">
                No featured products available right now.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* About Section – Our Mission + What We Stand For (from About page) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Our Mission */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Our Mission
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                At Fullstore, we believe great products shouldn't cost the earth
                — neither your wallet nor the planet.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                We curate and design everyday essentials with intention: using
                sustainable materials, partnering with ethical manufacturers,
                and focusing on timeless design that lasts beyond trends.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-6">
                From your morning commute to weekend getaways — our goal is
                simple: make your daily life more comfortable, organized, and
                joyful.
              </p>
            </div>

            <div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="bg-linear-to-br from-[#A0C878]/20 via-[#A0C878]/10 to-transparent p-12 md:p-16">
                  <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 italic leading-tight">
                    “We don’t just sell products.
                    <br />
                    We craft experiences that make
                    <br />
                    everyday moments extraordinary.”
                  </blockquote>
                  <p className="mt-10 text-xl md:text-2xl font-semibold text-[#A0C878]">
                    — The Fullstore Team
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What We Stand For (Core Values) */}
          <div className="py-16 md:py-24">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
              What We Stand For
            </h2>

            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              <div className="group bg-gray-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 text-center border border-transparent hover:border-[#A0C878]/30">
                <div className="w-20 h-20 bg-[#A0C878]/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-[#A0C878]/20 transition-colors">
                  <svg
                    className="w-10 h-10 text-[#A0C878]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Uncompromised Quality
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Every product is tested for durability and comfort. We only
                  offer what we'd use ourselves.
                </p>
              </div>

              <div className="group bg-gray-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 text-center border border-transparent hover:border-[#A0C878]/30">
                <div className="w-20 h-20 bg-[#A0C878]/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-[#A0C878]/20 transition-colors">
                  <svg
                    className="w-10 h-10 text-[#A0C878]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Thoughtful Design
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Clean lines, smart features, and intuitive use — designed for
                  real life, not just photos.
                </p>
              </div>

              <div className="group bg-gray-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 text-center border border-transparent hover:border-[#A0C878]/30">
                <div className="w-20 h-20 bg-[#A0C878]/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-[#A0C878]/20 transition-colors">
                  <svg
                    className="w-10 h-10 text-[#A0C878]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Planet First
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Eco-friendly materials, responsible sourcing, and minimal
                  packaging — because quality includes caring for our world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
