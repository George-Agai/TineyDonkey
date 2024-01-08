
function Footer() {
    return (
        <div className="footer-container flex-column-align-center">
            <div>
                <h2>TineyDonkey</h2>
                <ul>
                    <li><a>Products</a></li>
                    <li><a>About</a></li>
                    <li><a>Contact</a></li>
                    <li><a>My Cart</a></li>
                    <li><a>Checkout</a></li>
                </ul>
            </div>
            <div>
                <h1>Email Newsletter</h1>
                <p>Subscribe to our newsletter and get 10% off your first purchase</p>
                <input type="text"></input>
                <button>Subscribe</button>
            </div>
            <div>
                <p>Copyright © 2024 - Agai</p>
            </div>
        </div>
    )
}

export default Footer