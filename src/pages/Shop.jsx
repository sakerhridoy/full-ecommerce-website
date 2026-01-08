import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid.jsx';
import { useProducts } from '../context/ProductsContext.jsx';

function Shop() {
  const { products, status, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlQuery = searchParams.get('search') || '';
  const [query, setQuery] = useState(urlQuery);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  const categories = useMemo(() => {
    if (!products.length) return ['all'];
    const set = new Set(products.map(p => p.category));
    return ['all', ...Array.from(set).sort()];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = category === 'all' || product.category === category;
      const q = query.toLowerCase();
      const matchesQuery = !q ||
        product.name.toLowerCase().includes(q) ||
        (product.description && product.description.toLowerCase().includes(q)) ||
        (Array.isArray(product.tags) && product.tags.some(tag => String(tag).toLowerCase().includes(q)));
      return matchesCategory && matchesQuery;
    });
  }, [products, category, query]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    if (newQuery.trim()) {
      setSearchParams({ search: newQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  const formatCategoryName = cat => cat === 'all' ? 'All Categories' : cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <section className="py-16 md:py-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Shop Our Collection</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover premium essentials designed for everyday comfort and style.</p>
        </header>

        {status === 'loading' && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#A0C878] mb-6"></div>
            <p className="text-xl text-gray-600">Loading products...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center py-20">
            <p className="text-xl text-red-600 mb-4">Error loading products</p>
            <p className="text-gray-600">{error || 'Please try again later'}</p>
          </div>
        )}

        {status === 'success' && (
          <>
            {/* Filters */}
            <div className="mb-12 flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#A0C878] focus:outline-none focus:ring-4 focus:ring-[#A0C878]/20 transition-all"
                  />
                </div>

                <select
                  className="px-6 py-4 rounded-2xl border-2 border-gray-300 bg-white font-medium cursor-pointer focus:border-[#A0C878] focus:outline-none focus:ring-4 focus:ring-[#A0C878]/20 transition-all appearance-none pr-12"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{formatCategoryName(cat)}</option>
                  ))}
                </select>
              </div>

              <p className="text-lg font-medium text-gray-700">
                {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
              </p>
            </div>

            <ProductGrid products={filtered} loading={status === 'loading'} />
          </>
        )}
      </div>
    </section>
  );
}

export default Shop;