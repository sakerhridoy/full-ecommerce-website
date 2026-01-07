import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Hero() {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
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
        <motion.div
          className="hero-media"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <div className="hero-media-glow" />
          <motion.div
            className="hero-card"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.18 }}
            whileHover={{ y: -6, boxShadow: '0 22px 60px rgba(15, 23, 42, 0.35)' }}
          >
            Quality gear. Simple choices.
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Hero
