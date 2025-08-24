import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { MdOutlineShoppingBag } from "react-icons/md";
import TineyDonkey from '../TineyDonkeyAssets/about.webp'
import Footer from '../Components/Footer';
import { useCart } from 'react-use-cart';

function About() {
    const { isEmpty, totalItems } = useCart()
    const [scrolling, setScrolling] = useState(false);
    const navigate = useNavigate()

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
    return (
        <div className='transition-div' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw' }}>
            <nav className={`navbar ${scrolling ? 'scrolled' : 'scrolled'}`} style={{ border: 'none' }}>
                <section className="flex-justify-content-space-between" style={{ borderBottom: 'none' }}>
                    <p onClick={() => navigate('/')}>TineyDonkey</p>
                    <ul>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/')}>Home</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/products')}>Products</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/contact')}>Contact</li>
                        <li style={{ color: '#FF6310', borderBottom: '2px solid #FF6310' }} onClick={() => navigate('/about')}>About</li>
                    </ul>
                    <div className=' navbar-icon-div'>
                        <span className="flex-align-center-justify-center" onClick={() => navigate('/cart')}>
                            <MdOutlineShoppingBag style={{ color: 'grey', fontSize: '20px', float: 'right', cursor: 'pointer', marginLeft: '30px' }} />
                            {isEmpty ? null : <span className="total-items flex-align-center-justify-center">{totalItems}</span>}
                        </span>
                    </div>
                </section>
            </nav>
            <div className='flex-column-align-center  page-header'>
                <p style={{ fontSize: '12px' }}><span style={{ color: '#FF6310', cursor: 'pointer' }} onClick={() => navigate('/')}>HOME /</span><span style={{ color: '#687279' }}> ABOUT</span></p>
                <h1 className='font-merriweather' style={{ fontSize: '50px', color: 'RGB(17, 21, 24)', marginTop: '10px' }}>About</h1>
            </div>

            <div className='flex-justify-content-space-around  flex-column-container' style={{ marginBottom: '80px', marginTop: '50px' }}>
                <img src={TineyDonkey} alt='TineyDonkey' style={{ height: 'auto' }} className='about-image' />
                <div className='flex-column-align-center'>
                    <h1 className='font-merriweather' style={{ color: 'RGB(17, 21, 24)', textAlign: 'center' }}>About TineyDonkey</h1>
                    <p style={{ color: '#687279', fontSize: '16px', lineHeight: '26.4px' }}>Welcome to TineyDonkey – where creativity brightens your space! We have vibrant, eye-catching figurines that bring personality to your desk, floating shelves or even your home décor. Whether it’s adding charm to your workstation, sparking life into your video backgrounds, or simply giving your room a pop of color, our figurines are made to inspire and uplift.<br /><br />Each piece carries its own story – crafted with passion, creativity, and a touch of playfulness. Explore our collection and let your workspace or living area transform into a place where aesthetics meet inspiration.</p>
                    <button className='cta-button' style={{ marginTop: '30px' }}><a href='tel:+254792271915' style={{ textDecoration: 'none', color: 'white' }}>Contact Us</a></button>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default About