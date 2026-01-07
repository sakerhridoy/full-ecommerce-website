import ProductCard from './ProductCard.jsx';

function ProductGrid({ products = [], loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="aspect-square bg-gray-200" />
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-6 bg-gray-200 rounded w-full" />
              <div className="h-8 bg-gray-200 rounded w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-gray-600 font-medium">No products found.</p>
        <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}

export default ProductGrid;
