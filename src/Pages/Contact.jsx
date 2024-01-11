import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { MdOutlineShoppingBag } from "react-icons/md";
import TineyDonkey from '../TineyDonkeyAssets/20231220_133614.jpg'
import Footer from '../Components/Footer';

function Contact() {
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

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw' }}>
        <nav className={`navbar ${scrolling ? 'scrolled' : 'scrolled'}`} style={{ border: 'none' }}>
                <section className="flex-justify-content-space-between" style={{ borderBottom: 'none' }}>
                    <p>TineyDonkey</p>
                    <ul>
                        <li style={{ color: 'grey' }} onClick={()=>navigate('/')}>Home</li>
                        <li style={{ color: 'grey' }} onClick={()=>navigate('/Products')}>Products</li>
                        <li style={{ color: '#FF6310', borderBottom: '2px solid #FF6310' }}  onClick={()=>navigate('/Contact')}>Contact</li>
                        <li style={{ color: 'grey' }} onClick={()=>navigate('/About')}>About</li>
                    </ul>
                    <div className='flex-justify-flex-end navbar-icon-div' style={{ width: '15%', paddingRight: '30px' }}>
                        <MdOutlineShoppingBag style={{ color: 'grey', fontSize: '20px', float: 'right', cursor: 'pointer', marginLeft: '30px' }} />
                    </div>
                </section>
            </nav>
            <div className='flex-column-align-center' style={{marginTop: '150px'}}>
                <p style={{ fontSize: '12px' }}><span style={{ color: '#FF6310', cursor: 'pointer' }} onClick={()=>navigate('/')}>HOME /</span><span style={{color: '#687279'}}> CONTACT</span></p>
                <h1 className='font-merriweather' style={{fontSize: '50px', color: 'RGB(17, 21, 24)', marginTop: '10px'}}>Contact Us</h1>
            </div>

            <div className='flex-justify-content-space-around' style={{ marginBottom: '80px', marginTop: '50px'}}>
                <img src={TineyDonkey} alt='TineyDonkey' style={{width: '40%', height: 'auto'}}/>
                <div style={{width: '50%'}}>
                    <h1 className='font-merriweather' style={{ color: 'RGB(17, 21, 24)'}}>About TineyDonkey</h1>
                    <p style={{color: '#687279', fontSize: '16px', lineHeight: '26.4px'}}>Welcome to TineyDonkey, where creativity meets code! We’re not just selling figurines; we’re crafting companions for your workspace, miniature muses that turn your desk into a coding sanctuary. Each figurine tells a story – a pixelated tale of dedication, passion, and the thrill of problem-solving.  So, dive into our collection, embrace the pixelated magic, and let your workstation become a haven where imagination and innovation collide. Your code, your space, your story – told in every intricately designed figurine we offer. Welcome to a desk adorned with inspiration!</p>
                    <button className='cta-button' style={{ marginTop: '30px' }}>Contact Us</button>
                </div>
            </div>

            <Footer/>
    </div>
  )
}

export default Contact