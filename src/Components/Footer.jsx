import { useState } from "react"

function Footer() {

    const [Email, setEmail] = useState()
    return (
        <div className="footer-container flex-column-align-center">
            <div className="footer-container-main-div flex-justify-space-between" style={{width: '94%', borderBottom: '0.3px solid grey'}}>
                <h2>TineyDonkey</h2>
                <ul>
                    <h1>Useful links</h1>
                    <li><a>Products</a></li>
                    <li><a>About</a></li>
                    <li><a>Contact</a></li>
                    <li><a>My Cart</a></li>
                    <li><a>Checkout</a></li>
                </ul>
                <div className="newsletter-div flex-column-justify-flex-start">
                    <h1>Email Newsletter</h1>
                    <p>Subscribe to our newsletter and get 10% off your first purchase</p>
                    <input type="email" placeholder="Your email address" value={Email} onChange={(e)=>setEmail(e.target.value)}></input>
                    <button className="cta-button" style={{padding: '10px 30px', marginBottom: '30px'}}>Subscribe</button>
                </div>
            </div>
            <div>
                <p  style={{color: 'white', fontSize: '13px'}}>Copyright © 2024 - <a style={{color: '#FF6310', cursor: 'pointer'}} href="https://twitter.com/george__agai" target="new">Agai</a>⚡️</p>
            </div>
        </div>
    )
}

export default Footer