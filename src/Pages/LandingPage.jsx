import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { MdOutlineShoppingBag } from "react-icons/md";
import '../index.css'

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
    <div style={{height: '140vh'}}>
      <div className={`landing-page ${scrolling ? 'scrolled' : ''}`}>
        <nav className="navbar" style={{border: 'none'}}>
          <section className="flex-justify-content-space-between" style={{border: '1px solid white'}}>
          <ul style={{border: '1px solid yellow'}}>
            <li>Home</li>
            <li>Products</li>
            <li>Contact</li>
            <li>About</li>
          </ul>
          <div>
            <MdOutlineShoppingBag style={{color: 'white', fontSize: '20px'}}/>
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
      <banner>

      </banner>
    </div>
  )
}

export default LandingPage