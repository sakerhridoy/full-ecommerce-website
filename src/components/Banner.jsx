import bannerImage from '../assets/react.svg'

function Banner() {
  return (
    <section className="banner" aria-label="Promotional banner">
      <div className="container banner-inner">
        <img src={bannerImage} alt="Seasonal promotion" className="banner-image" />
      </div>
    </section>
  )
}

export default Banner
