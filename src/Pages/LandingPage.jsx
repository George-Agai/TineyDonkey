import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
// import floatingAstronaut from '../Images/floatingAstronaut.png'
// import bud from '../Images/bud.png'
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
    <div className={`landing-page ${scrolling ? 'scrolled' : ''}`}>
      <nav className="navbar">
        <ul>
          <li>Home</li>
          <li>Products</li>
          <li>Contact</li>
          <li>About</li>
        </ul>
      </nav>

      <div className="main-container">
        <p>Landing Page</p>
      </div>
      <div className="overlay"></div>
    </div>
  )
}

export default LandingPage