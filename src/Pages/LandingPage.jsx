import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import tick from '../TineyDonkeyAssets/icon-quality.svg'
import delivery from '../TineyDonkeyAssets/icon-delivery.svg'
import warranty from '../TineyDonkeyAssets/icon-warranty.svg'
import Grid from './Grid.jsx'

function LandingPage() {
  const navigate = useNavigate()
  console.log(navigate)
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className='landing-page'>
        <nav className={`navbar ${scrolling ? 'scrolled' : ''}`} style={{ border: 'none' }}>
          <section className="flex-justify-content-space-between">
            <p>TineyDonkey</p>
            <ul className={`${scrolling ? 'ul-scrolled' : ''}`}>
              <li style={{ borderBottom: scrolling ? '2px solid #FF6310' : '2px solid white', color: scrolling ? '#FF6310' : 'white' }}>Home</li>
              <li>Products</li>
              <li>Contact</li>
              <li>About</li>
            </ul>
            <div className='flex-justify-flex-end' style={{ width: '15%', paddingRight: '30px' }}>
              <MdOutlineShoppingBag style={{ color: scrolling ? 'grey' : 'white', fontSize: '20px', float: 'right', cursor: 'pointer', marginLeft: '30px' }} />
              <FaRegUserCircle style={{ color: scrolling ? 'grey' : 'white', fontSize: '20px', float: 'right', cursor: 'pointer' }} />
            </div>
          </section>
        </nav>

        <div className="main-container">
          <div className="flex-column-justify-flex-start">
            <h1 className="font-merriweather">We sell cool, tiny stuff</h1>
            <p>Unleash your creativity with developer-inspired figurines</p>
            <button className="cta-button" style={{ marginTop: '40px' }}>Explore Now</button>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
      <div className='banner flex-justify-content-space-around'>
        <div className="banner-div flex-column-align-center">
          <img src={tick} alt='tick' className="banner-icons" />
          <h5>Best Prices</h5>
          <p>Our prices are quite literally the best out here</p>
        </div>
        <div className="banner-div flex-column-align-center">
          <img src={delivery} alt='delivery' className="banner-icons" />
          <h5>Free Delivery</h5>
          <p>Free delivery within Nairobi CBD</p>
        </div>
        <div className="banner-div flex-column-align-center">
          <img src={warranty} alt='warranty' className="banner-icons" />
          <h5>Best Quality</h5>
          <p>Our figurines are the real deal, you’ll see</p>
        </div>
      </div>
      <Grid />
    </div>
  )
}

export default LandingPage