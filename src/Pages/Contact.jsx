import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import Footer from '../Components/Footer';
import { useCart } from 'react-use-cart';
import axios from 'axios';

function Contact() {

    const { isEmpty, totalItems } = useCart()
    const [scrolling, setScrolling] = useState(false);
    const [name, setName] = useState()
    const [subject, setSubject] = useState()
    const [message, setMessage] = useState()
    const [emailAddress, setEmailAddress] = useState()
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [emailSent, setEmailSent] = useState(false)
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

    const handleSendMessage = async () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailPattern.test(emailAddress);
        setIsValidEmail(isValid);
        if (isValid) {
            const newMessage = {
                emailAddress: emailAddress,
                name: name,
                about: subject,
                message: message
            }
            await axios.post('http://192.168.100.9:3000/sendMessage', newMessage)
                .then((res) => {
                    if (res.data.message === "Message saved successfully") {
                        setEmailSent(true)
                        setEmailAddress("")
                        setMessage("")
                        setSubject("")
                        setName("")
                    }
                })
                .catch(err => console.log(err))
        }
        else console.log("Email is not valid")
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw' }}>
            <nav className={`navbar ${scrolling ? 'scrolled' : 'scrolled'}`} style={{ border: 'none' }}>
                <section className="flex-justify-content-space-between" style={{ borderBottom: 'none' }}>
                    <p onClick={() => navigate('/')}>TineyDonkey</p>
                    <ul>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/')}>Home</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/products')}>Products</li>
                        <li style={{ color: '#FF6310', borderBottom: '2px solid #FF6310' }} onClick={() => navigate('/contact')}>Contact</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/about')}>About</li>
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
                <p style={{ fontSize: '12px' }}><span style={{ color: '#FF6310', cursor: 'pointer' }} onClick={() => navigate('/')}>HOME /</span><span style={{ color: '#687279' }}> CONTACT US</span></p>
                <h1 className='font-merriweather' style={{ fontSize: '50px', color: 'RGB(17, 21, 24)', marginTop: '10px' }}>Contact Us</h1>
            </div>

            <div className='flex-justify-content-space-around contact-us-flex-container' style={{ marginBottom: '80px', marginTop: '50px', width: '100%' }}>
                <div className='flex-column-align-center contact-details-div' style={{ width: '40%' }}>
                    <div className='flex-align-center-justify-center'>
                        <FaLocationDot style={{ color: '#FF6310' }} className='contact-us-icons' />
                        <section className='flex-column-justify-flex-start' style={{ marginLeft: '30px', width: '250px' }}>
                            <h2>Physical Address</h2>
                            <p>P.O Box 151 - 40001 NRB</p>
                        </section>
                    </div>
                    <div className='flex-align-center-justify-center'>
                        <MdEmail style={{ color: '#FF6310' }} className='contact-us-icons' />
                        <section className='flex-column-justify-flex-start' style={{ marginLeft: '30px', width: '250px' }}>
                            <h2>Email Address</h2>
                            <p>georgeeagai@gmail.com</p>
                        </section>
                    </div>
                    <div className='flex-align-center-justify-center'>
                        <FaPhoneAlt style={{ color: '#FF6310' }} className='contact-us-icons' />
                        <section className='flex-column-justify-flex-start' style={{ marginLeft: '30px', width: '250px' }}>
                            <h2>Phone Number</h2>
                            <p>+2547 922 71915</p>
                        </section>
                    </div>
                </div>
                <div className='flex-align-center-justify-center email-container'>
                    <div className='flex-column-align-center contact-us-email-div' style={{ padding: '50px 10px', width: '80%' }}>
                        <h1 className='font-merriweather' style={{ color: 'RGB(17, 21, 24)' }}>Send us a message</h1>
                        <input type='text' placeholder='Name' required={true} value={name} onChange={(e) => setName(e.target.value)}></input>
                        {!isValidEmail && <p style={{ color: 'red' }}>Please enter a valid email address.</p>}
                        <input type='email' placeholder='Email Address' required={true} value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}></input>
                        <input type='text' placeholder='Subject' required={true} value={subject} onChange={(e) => setSubject(e.target.value)}></input>
                        <input type='textarea' placeholder='Comment or Message' style={{ height: '90px' }} required={true} value={message} onChange={(e) => setMessage(e.target.value)}></input>
                        <button className='cta-button' style={{ marginTop: '30px' }} onClick={handleSendMessage}>{emailSent ? "Message sent" : "Send Message"}</button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Contact