import Hero from '../components/Hero.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import Banner from '../components/Banner.jsx'
import { useProducts } from '../context/ProductsContext.jsx'

function Home() {
  const { products, status, error } = useProducts()

  const featured = products.slice(0, 4)

  return (
    <>
      <Hero />
      <Banner />
      <section className="section">
        <div className="container">
          <header className="section-header">
            <h2>Featured products</h2>
            <p className="section-subtitle">Handpicked favorites to get you started.</p>
          </header>
          {status === 'loading' && <p className="muted">Loading featured products…</p>}
          {status === 'error' && <p className="error">{error || 'Unable to load products.'}</p>}
          {status === 'success' && <ProductGrid products={featured} />}
        </div>
      </section>
    </>
  )
}

export default Home
