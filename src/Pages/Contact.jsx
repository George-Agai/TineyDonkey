import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
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

        window.scrollTo(0,0)

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
                        <li style={{ color: 'grey' }} onClick={() => navigate('/')}>Home</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/Products')}>Products</li>
                        <li style={{ color: '#FF6310', borderBottom: '2px solid #FF6310' }} onClick={() => navigate('/Contact')}>Contact</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/About')}>About</li>
                    </ul>
                    <div className='flex-justify-flex-end navbar-icon-div' style={{ width: '15%', paddingRight: '30px' }}>
                        <MdOutlineShoppingBag style={{ color: 'grey', fontSize: '20px', float: 'right', cursor: 'pointer', marginLeft: '30px' }} />
                    </div>
                </section>
            </nav>
            <div className='flex-column-align-center  page-header'>
                <p style={{ fontSize: '12px' }}><span style={{ color: '#FF6310', cursor: 'pointer' }} onClick={() => navigate('/')}>HOME /</span><span style={{ color: '#687279' }}> CONTACT US</span></p>
                <h1 className='font-merriweather' style={{ fontSize: '50px', color: 'RGB(17, 21, 24)', marginTop: '10px' }}>Contact Us</h1>
            </div>

            <div className='flex-justify-content-space-around' style={{ marginBottom: '80px', marginTop: '50px', width: '100%' }}>
                <div className='flex-column-align-center contact-details-div' style={{ width: '40%' }}>
                    <div className='flex-align-center-justify-center'>
                        <FaLocationDot style={{ color: '#FF6310', fontSize: '50px' }} />
                        <section className='flex-column-justify-flex-start' style={{ marginLeft: '30px', width: '250px' }}>
                            <h2>Physical Address</h2>
                            <p>Gate C, Juja</p>
                        </section>
                    </div>
                    <div className='flex-align-center-justify-center'>
                        <MdEmail style={{ color: '#FF6310', fontSize: '50px' }} />
                        <section className='flex-column-justify-flex-start' style={{ marginLeft: '30px', width: '250px' }}>
                            <h2>Email Address</h2>
                            <p>georgeeagai@gmail.com</p>
                        </section>
                    </div>
                    <div className='flex-align-center-justify-center'>
                        <FaPhoneAlt style={{ color: '#FF6310', fontSize: '50px' }} />
                        <section className='flex-column-justify-flex-start' style={{ marginLeft: '30px', width: '250px' }}>
                            <h2>Phone Number</h2>
                            <p>+2547 922 71915</p>
                        </section>
                    </div>
                </div>
                <div style={{ width: '45%', marginRight: '20px' }} className='flex-align-center-justify-center email-container'>
                    <div className='flex-column-align-center contact-us-email-div' style={{ padding: '50px 10px', width: '80%' }}>
                        <h1 className='font-merriweather' style={{ color: 'RGB(17, 21, 24)' }}>Send us a message</h1>
                        <input type='text' placeholder='Name'></input>
                        <input type='email' placeholder='Email Address'></input>
                        <input type='text' placeholder='Subject'></input>
                        <input type='text' placeholder='Comment or Message' style={{height: '90px'}}></input>
                        <button className='cta-button' style={{ marginTop: '30px' }}>Send Message</button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Contact