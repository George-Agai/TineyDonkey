import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { MdOutlineShoppingBag } from "react-icons/md";
import mpesa from '../TineyDonkeyAssets/mpesa.png'
// import { AiFillDelete } from "react-icons/ai";
import Footer from '../Components/Footer';

function Checkout() {
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw' }}>
            <nav className={`navbar ${scrolling ? 'scrolled' : 'scrolled'}`} style={{ border: 'none' }}>
                <section className="flex-justify-content-space-between" style={{ borderBottom: 'none' }}>
                    <p>TineyDonkey</p>
                    <ul>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/')}>Home</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/Products')}>Products</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/Contact')}>Contact</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/About')}>About</li>
                    </ul>
                    <div className='flex-justify-flex-end navbar-icon-div' style={{ widthead: '15%', paddingRight: '30px' }}>
                        <MdOutlineShoppingBag style={{ color: 'grey', fontSize: '20px', float: 'right', cursor: 'pointer', marginLeft: '30px' }} />
                    </div>
                </section>
            </nav>

            <div className='flex-column-align-center  page-header'>
                <p style={{ fontSize: '12px' }}><span style={{ color: '#FF6310', cursor: 'pointer' }} onClick={() => navigate('/')}>HOME /</span><span style={{ color: '#687279' }}> CHECKOUT</span></p>
                <h1 className='font-merriweatheader' style={{ fontSize: '50px', color: 'RGB(17, 21, 24)', marginTop: '10px' }}>Checkout</h1>
            </div>

            <div className='flex-align-center-justify-center  flex-column-container' style={{ marginBottom: '80px', marginTop: '50px', width: '100%' }}>
                 <form className='flex-align-center-justify-center payment-details-form' style={{ width: '90%' }}>
                    <div className='flex-column-justify-flex-start span'>
                        <h3>Billing details</h3>
                        <div className='flex-justify-content-space-between' style={{width: '100%'}}>
                            <div className='flex-column-justify-flex-start'>
                                <label htmlFor="FirstName">First name *</label>
                                <input type="text" id="name" name="FirstName" required="true" />
                            </div>
                            <div className='flex-column-justify-flex-start' style={{marginLeft: '30px'}}>
                                <label htmlFor="LastName">Last name *</label>
                                <input type="text" id="name" name="LastName" required="true" />
                            </div>
                        </div>
                        <label htmlFor="Country">Country / Region (optional)</label>
                        <input type="text" id="name" name="Country" placeholder='Kenya' />

                        <label htmlFor="Country">Town / City *</label>
                        <input type="text" id="name" name="Country" required="true" placeholder='Nairobi' />

                        <label htmlFor="Phonenumber">Phone number *</label>
                        <input type="text" id="name" name="Phonenumber" required="true" placeholder='0712345678' />
                        <div className='flex-column-justify-flex-start' style={{width: '100%'}}>
                            <h3>Additional information</h3>
                            <label htmlFor="orderComments">Order notes (optional)</label>
                            <textarea name="orderComments" className="input-text " id="order_comments" placeholder="Notes about your order, e.g. special notes for delivery." rows="2" cols="5" style={{height: '150px', width: '100%'}}></textarea>
                        </div>
                    </div>

                    <div className='flex-column-align-center checkout-totals-div'>
                        <h3 style={{ width: '100%', marginBottom: '30px', marginTop: '30px' }}>Your order</h3>
                        <table style={{ width: '100%', fontSize: '15px' }}>
                            <tbody>
                                <tr style={{borderBottom: '2px solid rgb(231, 230, 230)'}}>
                                    <th className='text-align-left' style={{ color: 'RGB(104, 114, 121)', paddingBottom: '15px' }}>Product</th>
                                    <th className='text-align-right' style={{ color: 'RGB(104, 114, 121)', paddingBottom: '15px' }}>Subtotal</th>
                                </tr>

                                <tr>
                                    <td className='text-align-left' style={{ color: 'RGB(104, 114, 121)' }}>Attuma from Black Panther</td>
                                    <td className='text-align-right' style={{ color: 'RGB(104, 114, 121)', fontWeight: '400' }}><span>KSh</span>350.00</td>
                                </tr>
                                <tr>
                                    <td className='text-align-left' style={{ color: 'RGB(104, 114, 121)' }}>Biggie from Trolls</td>
                                    <td className='text-align-right' style={{ color: 'RGB(104, 114, 121)', fontWeight: '400' }}><span>KSh</span>300.00</td>
                                </tr>

                                <tr style={{borderBottom: 'none'}}>
                                    <th className='text-align-left' style={{ color: 'RGB(104, 114, 121)' }}>Total</th>
                                    <td className='text-align-right' style={{ color: 'RGB(104, 114, 121)', fontWeight: '700' }}><span>KSh</span>650.00</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='flex-align-center-justify-center mpesa-notification-div' style={{width: '92%', marginTop: '15px'}}>
                            <img src={mpesa} alt='mpesa-icon'/>
                            <p>You will be prompted to verify the transaction via an STK push</p>
                        </div>
                        <div style={{width: '100%', marginBottom: '15px'}}>
                            <p style={{color: 'RGB(104, 114, 121)', fontSize: '13px', fontWeight: '400'}}>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
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