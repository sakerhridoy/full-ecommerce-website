import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <h1>Page not found</h1>
        <p className="section-subtitle">
          The page you&apos;re looking for doesn&apos;t exist. Try going back home.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </section>
  )
}

export default NotFound
