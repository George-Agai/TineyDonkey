import { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"

function Footer() {

    const navigate = useNavigate()
    const [Email, setEmail] = useState()
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [emailSent, setEmailSent] = useState(false)

    const handleSubscribe = async () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailPattern.test(Email);
        setIsValidEmail(isValid);

        if (isValid) {
            const emailAddress = {
                emailAddress: Email
            }
            await axios.post('https://uninterested-antelope.onrender.com/subscribe', emailAddress)
                .then((res) => {
                    if (res.data.message === "Email address saved successfully") {
                        setEmailSent(true)
                        setEmail("")
                    }
                })
                .catch(err => console.log(err))
        }
        else console.log("Email is not valid")
    }
    return (
        <div className="footer-container flex-column-align-center">
            <div className="footer-container-main-div flex-justify-space-between" style={{ width: '94%', borderBottom: '0.3px solid grey' }}>
                <h2 onClick={() => navigate('/')}>TineyDonkey</h2>
                <ul>
                    <h1>Useful links</h1>
                    <li onClick={() => navigate('/')}><a>Home</a></li>
                    <li onClick={() => navigate('/products')}><a>Products</a></li>
                    <li onClick={() => navigate('/about')}><a>About</a></li>
                    <li onClick={() => navigate('/contact')}><a>Contact</a></li>
                    <li onClick={() => navigate('/cart')}><a>My Cart</a></li>
                    <li onClick={() => navigate('/checkout')}><a>Checkout</a></li>
                </ul>
                <div className="newsletter-div flex-column-justify-flex-start">
                    <h1>Email Newsletter</h1>
                    <p>Subscribe to our newsletter and get 10% off your first purchase</p>
                    {!isValidEmail && <p style={{ color: 'red' }}>Please enter a valid email address.</p>}
                    <input type="email" placeholder="Your email address" value={Email} onChange={(e) => setEmail(e.target.value)}></input>
                    <button className="cta-button" style={{ padding: '10px 30px', marginBottom: '30px' }} onClick={handleSubscribe}>{emailSent ? "Subscribed" : "Subscribe"}</button>
                </div>
            </div>
            <div>
                <p style={{ color: 'white', fontSize: '13px' }}>Copyright © { new Date().getFullYear()} - <a style={{ color: '#FF6310', cursor: 'pointer' }} href="https://twitter.com/george__agai" target="new">Agai</a>⚡️</p>
            </div>
        </div>
    )
}

export default Footer