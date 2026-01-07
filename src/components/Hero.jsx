import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">New arrivals</p>
          <h1>Everything you need for everyday adventures.</h1>
          <p className="hero-subtitle">
            Shop curated essentials for work, travel, and training. Thoughtful design, everyday comfort.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary">
              Shop now
            </Link>
            <Link to="/shop" className="btn btn-ghost">
              Browse all products
            </Link>
          </div>
        </div>
        <div className="hero-media" aria-hidden="true">
          <div className="hero-card">Quality gear. Simple choices.</div>
        </div>
      </div>
    </section>
  )
}

export default Hero
