import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { MdOutlineShoppingBag } from "react-icons/md";
import { useCart } from 'react-use-cart';
// import mpesa from '../TineyDonkeyAssets/mpesa.png'
import Footer from '../Components/Footer';

function Checkout() {
    const [scrolling, setScrolling] = useState(false);
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [town, setTown] = useState()
    const [contact, setContact] = useState()
    const [country, setCountry] = useState()
    const [orderNotes, setOrderNotes] = useState()

    const navigate = useNavigate()

    const { items, cartTotal, isEmpty, totalItems } = useCart()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        // const hoverElement = document.getElementById('delete-icon');

        // hoverElement.addEventListener('mouseover', () => {
        //   hoverElement.style.color = 'red';
        // });

        // hoverElement.addEventListener('mouseout', () => {
        //   hoverElement.style.color = 'grey';
        // });
        window.scrollTo(0, 0)

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handlePlaceOrder = async (e) => {
        e.preventDefault()
        if (isEmpty) {
            alert("Theres nothing to checkout😏")
        }
        else {
            const fullName = firstName + " " + lastName
            let newContact = contact
            if (newContact.startsWith("07")) {
                newContact = "254" + newContact.slice(1)
            }
            const formData = {
                boughtBy: fullName,
                town: town,
                orderNotes: orderNotes && orderNotes.length > 3 ? orderNotes : "empty",
                orderStatus: "pending",
                country: country && country.length > 1 ? country : "empty",
                contact: newContact
            }
            navigate('/transaction', { state: { formData } })
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw' }}>
            <nav className={`navbar ${scrolling ? 'scrolled' : 'scrolled'}`} style={{ border: 'none' }}>
                <section className="flex-justify-content-space-between" style={{ borderBottom: 'none' }}>
                    <p onClick={() => navigate('/')}>TineyDonkey</p>
                    <ul>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/')}>Home</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/products')}>Products</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/contact')}>Contact</li>
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
                <p style={{ fontSize: '12px' }}><span style={{ color: '#FF6310', cursor: 'pointer' }} onClick={() => navigate('/')}>HOME /</span><span style={{ color: '#687279' }}> CHECKOUT</span></p>
                <h1 className='font-merriweather' style={{ fontSize: '50px', color: 'RGB(17, 21, 24)', marginTop: '10px' }}>Checkout</h1>
            </div>

            <div className='flex-align-center-justify-center  flex-column-container' style={{ marginBottom: '80px', marginTop: '50px', width: '100%' }}>
                <form className='flex-align-center-justify-center payment-details-form' style={{ width: '90%' }} onSubmit={(e) => handlePlaceOrder(e)}>
                    <div className='flex-column-justify-flex-start span'>
                        <h3>Billing details</h3>
                        <div className='flex-justify-content-space-between' style={{ width: '100%' }}>
                            <div className='flex-column-justify-flex-start'>
                                <label htmlFor="name">First name *</label>
                                <input type="text" id="name" name="FirstName" required="true" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                            </div>
                            <div className='flex-column-justify-flex-start' style={{ marginLeft: '30px' }}>
                                <label htmlFor="LastName">Last name *</label>
                                <input type="text" id="LastName" name="LastName" required="true" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                            </div>
                        </div>
                        <label htmlFor="Country">Country / Region (optional)</label>
                        <input type="text" id="Country" name="Country" placeholder='Kenya' onChange={(e) => setCountry(e.target.value)} value={country} />

                        <label htmlFor="Town">Town / City *</label>
                        <input type="text" id="Town" name="Town" required="true" placeholder='Nairobi' onChange={(e) => setTown(e.target.value)} value={town} />

                        <label htmlFor="Phonenumber">Phone number *</label>
                        <input type="text" id="Phonenumber" name="Phonenumber" required="true" minLength={10} placeholder='0712345678' onChange={(e) => setContact(e.target.value)} value={contact} />
                        <div className='flex-column-justify-flex-start' style={{ width: '100%' }}>
                            <h3>Additional information</h3>
                            <label htmlFor="order_comments">Order notes (optional)</label>
                            <textarea onChange={(e) => setOrderNotes(e.target.value)} value={orderNotes} name="orderComments" className="input-text " id="order_comments" placeholder="Notes about your order, e.g. special notes for delivery." rows="2" cols="5" style={{ height: '150px', width: '100%' }}></textarea>
                        </div>
                    </div>

                    <div className='flex-column-align-center checkout-totals-div'>
                        <h3 style={{ width: '100%', marginBottom: '30px', marginTop: '30px' }}>Your order</h3>
                        <table style={{ width: '100%', fontSize: '15px' }}>
                            <tbody>
                                <tr style={{ borderBottom: '2px solid rgb(231, 230, 230)' }}>
                                    <th className='text-align-left' style={{ color: 'RGB(104, 114, 121)', paddingBottom: '15px' }}>Product</th>
                                    <th className='text-align-right' style={{ color: 'RGB(104, 114, 121)', paddingBottom: '15px' }}>Subtotal</th>
                                </tr>

                                {isEmpty ?
                                    <div className="width100 flex-align-center-justify-center" style={{ marginTop: '30px', marginBottom: '10px' }}>
                                        <p>Nothing to checkout😕</p>
                                    </div> :
                                    items.map((product) => {
                                        return (
                                            <tr key={product.id}>
                                                <td className='text-align-left' style={{ color: 'RGB(104, 114, 121)' }}>{product.productName}</td>
                                                <td className='text-align-right' style={{ color: 'RGB(104, 114, 121)', fontWeight: '400' }}><span>KSh</span>{product.price}.00</td>
                                            </tr>
                                        )
                                    })}

                                <tr style={{ borderBottom: 'none' }}>
                                    <th className='text-align-left' style={{ color: 'RGB(104, 114, 121)' }}>Total</th>
                                    <td className='text-align-right' style={{ color: 'RGB(104, 114, 121)', fontWeight: '700' }}><span>KSh</span>{cartTotal}.00</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='flex-align-center-justify-center mpesa-notification-div' style={{ width: '92%', marginTop: '15px' }}>
                            {/* <img src={mpesa} alt='mpesa-icon' loading='lazy' /> */}
                            <p className='text-align-left'>Payment will be made upon delivery of the products with no extra charges😌</p>
                        </div>
                        <div style={{ width: '100%', marginBottom: '15px' }}>
                            <p className='text-align-left' style={{ color: 'RGB(104, 114, 121)', fontSize: '13px', fontWeight: '400', width: '100%' }}>Your personal data will only be used to process your order and to support your experience throughout this website.</p>
                        </div>
                        <button type='submit' className='cta-button' style={{ width: '100%', marginBottom: '20px' }}>Place order</button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    )
}

export default Checkout