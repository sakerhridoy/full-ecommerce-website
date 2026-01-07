import { useMemo, useState } from 'react'
import ProductGrid from '../components/ProductGrid.jsx'
import { useProducts } from '../context/ProductsContext.jsx'

function Shop() {
  const { products, status, error } = useProducts()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const categories = useMemo(() => {
    if (!products.length) return ['all']
    const set = new Set(products.map((p) => p.category))
    return ['all', ...Array.from(set)]
  }, [products])

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        (Array.isArray(product.tags) &&
          product.tags.some((tag) => String(tag).toLowerCase().includes(q)))
      return matchesCategory && matchesQuery
    })
  }, [products, category, query])

  return (
    <section className="section">
      <div className="container">
        <header className="section-header">
          <h1>Shop</h1>
          <p className="section-subtitle">Browse the full collection and find what works for you.</p>
        </header>
        {status === 'loading' && <p className="muted">Loading products…</p>}
        {status === 'error' && <p className="error">{error || 'Unable to load products.'}</p>}
        {status === 'success' && (
          <>
            <div className="filters">
              <div className="field-group">
                <label htmlFor="search" className="field-label">
                  Search
                </label>
                <input
                  id="search"
                  className="field-input"
                  placeholder="Search by name, category, or tag"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <div className="field-group">
                <label htmlFor="category" className="field-label">
                  Category
                </label>
                <select
                  id="category"
                  className="field-input"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All' : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <ProductGrid products={filtered} />
          </>
        )}
      </div>
    </section>
  )
}

export default Shop
