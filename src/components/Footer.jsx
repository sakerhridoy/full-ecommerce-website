function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>&copy; {year} fullstore. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
