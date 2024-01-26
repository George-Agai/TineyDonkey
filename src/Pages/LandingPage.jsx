import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { MdOutlineShoppingBag } from "react-icons/md";
// import { FaRegUserCircle } from "react-icons/fa";
import tick from '../TineyDonkeyAssets/icon-quality.svg'
import delivery from '../TineyDonkeyAssets/icon-delivery.svg'
import warranty from '../TineyDonkeyAssets/icon-warranty.svg'
import Footer from '../Components/Footer.jsx'
import Grid from './Grid.jsx'
import { useCart } from "react-use-cart";

function LandingPage() {
  const { isEmpty, totalItems } = useCart()
  const navigate = useNavigate()
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.scrollTo(0, 0)

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function HandleViewAllButton() {
    // var targetDiv = document.getElementById('landing');
    // targetDiv.scrollIntoView({ behavior: 'smooth' });
    navigate('/products')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className='landing-page' id="landing">
        <nav className={`navbar ${scrolling ? 'scrolled' : ''}`} style={{ border: 'none' }}>
          <section className="flex-justify-content-space-between" style={{ border: scrolling && 'none' }}>
            <p onClick={() => navigate('/')}>TineyDonkey</p>
            <ul className={`${scrolling ? 'ul-scrolled' : ''}`}>
              <li onClick={() => navigate('/')} style={{ borderBottom: scrolling ? '2px solid #FF6310' : '2px solid white', color: scrolling ? '#FF6310' : 'white' }}>Home</li>
              <li onClick={() => navigate('/products')}>Products</li>
              <li onClick={() => navigate('/contact')}>Contact</li>
              <li onClick={() => navigate('/about')}>About</li>
            </ul>
            <div className=' navbar-icon-div'>
              <span className="flex-align-center-justify-center" onClick={() => navigate('/cart')}>
                <MdOutlineShoppingBag style={{ color: scrolling ? 'grey' : 'white', fontSize: '20px', float: 'right', cursor: 'pointer', marginLeft: '30px' }} />
                {isEmpty ? null : <span className="total-items flex-align-center-justify-center">{totalItems}</span>}
              </span>
            </div>
          </section>
        </nav>

        <div className="main-container">
          <div className="flex-column-justify-flex-start main-container-content">
            <h1 className="font-merriweather">We sell cool, tiny stuff⚡️</h1>
            <p>Unleash your creativity with developer-inspired figurines</p>
            <button className="cta-button" style={{ marginTop: '40px' }} onClick={() => navigate('/products')}>Explore Now</button>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
      <div className='banner flex-justify-content-space-around'>
        <div className="banner-div flex-column-align-center">
          <img src={tick} alt='tick' className="banner-icons" />
          <h5>Best Prices</h5>
          <p className="text-align-center">Our prices are literally the best out here</p>
        </div>
        <div className="banner-div flex-column-align-center">
          <img src={delivery} alt='delivery' className="banner-icons" />
          <h5>Free Delivery</h5>
          <p className="text-align-center">Free delivery within Nairobi CBD</p>
        </div>
        <div className="banner-div flex-column-align-center">
          <img src={warranty} alt='warranty' className="banner-icons" />
          <h5>Best Quality</h5>
          <p className="text-align-center">Our figurines are the real deal, you’ll see</p>
        </div>
      </div>
      <div className='flex-column-align-center' style={{ width: '90%' }}>
        <h1 className="main-title">Featured Products</h1>
        <p className="min-content">Check out latest updates</p>
      </div>
      <Grid Page={'Landing'} />
      <div className="flex-align-center-justify-center" style={{ width: '100%', marginTop: '30px', marginBottom: '50px' }}>
        <button className="cta-button" onClick={HandleViewAllButton}>View All Figurines</button>
      </div>
      <Footer />
    </div>
  )
}

export default LandingPage