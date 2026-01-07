import { Link } from 'react-router-dom';

function About() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section with Subtle Background Accent */}
        <div className="relative text-center mb-20 md:mb-28 overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-linear-to-br from-[#A0C878]/5 to-transparent -z-10"></div>
          <div className="py-16 md:py-24">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8">
              About <span className="text-[#A0C878]">Fullstore</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-5xl mx-auto leading-relaxed px-4">
              We create thoughtfully designed essentials that blend style,
              comfort, and sustainability — making your everyday adventures
              better, one product at a time.
            </p>
          </div>
        </div>

        {/* Mission Section – Image Left, Text Right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              At Fullstore, we believe great products shouldn't cost the earth —
              neither your wallet nor the planet.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              We curate and design everyday essentials with intention: using
              sustainable materials, partnering with ethical manufacturers, and
              focusing on timeless design that lasts beyond trends.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-6">
              From your morning commute to weekend getaways — our goal is
              simple: make your daily life more comfortable, organized, and
              joyful.
            </p>
          </div>

          <div className="order-1 lg:order-2">
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

        {/* Core Values – Beautiful Cards */}
        <div className="mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            What We Stand For
          </h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Quality */}
            <div className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 text-center border border-gray-100 hover:border-[#A0C878]/30">
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

            {/* Design */}
            <div className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 text-center border border-gray-100 hover:border-[#A0C878]/30">
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

            {/* Sustainability */}
            <div className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 text-center border border-gray-100 hover:border-[#A0C878]/30">
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

        {/* Final CTA – Strong & Inviting */}
        <div className="text-center bg-linear-to-r from-[#A0C878]/10 via-[#A0C878]/5 to-[#A0C878]/10 rounded-3xl py-20 px-8 shadow-inner">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Join the Journey
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto">
            Thousands already trust Fullstore to elevate their daily carry. Be
            part of a community that values quality, design, and conscious
            living.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/shop"
              className="px-12 py-6 bg-[#A0C878] hover:bg-[#8bb15c] text-white text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1"
            >
              Explore the Collection →
            </Link>
            <Link
              to="/contact"
              className="px-12 py-6 border-4 border-[#A0C878] text-[#A0C878] hover:bg-[#A0C878] hover:text-white text-2xl font-bold rounded-2xl transition-all duration-500"
            >
              Say Hello
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
