import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { MdOutlineShoppingBag } from "react-icons/md";
import TineyDonkey from '../TineyDonkeyAssets/20231220_133614.jpg'
import { AiFillDelete } from "react-icons/ai";
import Footer from '../Components/Footer';

function Cart() {
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
                <p style={{ fontSize: '12px' }}><span style={{ color: '#FF6310', cursor: 'pointer' }} onClick={() => navigate('/')}>HOME /</span><span style={{ color: '#687279' }}> CART</span></p>
                <h1 className='font-merriweatheader' style={{ fontSize: '50px', color: 'RGB(17, 21, 24)', marginTop: '10px' }}>Cart</h1>
            </div>

            <div className='flex-justify-content-space-around  flex-column-container' style={{ marginBottom: '80px', marginTop: '50px' }}>
                <table>
                    <thead>
                        <tr>
                            <td>Product</td>
                            <td>Quantity</td>
                            <td>Subtotal</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='flex-align-center-justify-center'>
                                <img src={TineyDonkey} alt='TineyDonkey' style={{ width: '100px' }} />
                                <p>Attuma</p>
                            </td>
                            <td>1</td>
                            <td>KSh300.00</td>
                            <td><AiFillDelete/></td>
                        </tr>
                    </tbody>
                </table>
                <div className='flex-column-align-center'>
                    <h2>Cart totals</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Subtotal</th>
                                <td><span>KSh</span>300.00</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <td><span>KSh</span>300.00</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='cta-button'>Proceed to checkout</button>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Cart