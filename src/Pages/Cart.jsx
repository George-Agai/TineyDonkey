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

        const hoverElement = document.getElementById('delete-icon');

        hoverElement.addEventListener('mouseover', () => {
          hoverElement.style.color = 'red';
        });
      
        hoverElement.addEventListener('mouseout', () => {
          hoverElement.style.color = 'grey';
        });
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

            <div className='flex-justify-content-space-around  flex-column-container' style={{ marginBottom: '80px', marginTop: '50px', width: '100%' }}>
                <table>
                    <thead>
                        <tr>
                            <td className='text-align-left'>Product</td>
                            <td className='text-align-center'>Quantity</td>
                            <td className='text-align-center'>Subtotal</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='' style={{display: 'flex', alignItems: 'center'}}>
                                <img src={TineyDonkey} alt='TineyDonkey' style={{ width: '100px' }} />
                                <p style={{marginLeft: '15px', color: 'RGB(104, 114, 121)', fontWeight: '500', fontSize: '15px'}} className='font-merriweather'>Attuma</p>
                            </td>
                            <td className='text-align-center'>1</td>
                            <td className='text-align-center'>KSh300.00</td>
                            <td className='text-align-center'><AiFillDelete id='delete-icon' style={{color: 'grey'}}/></td>
                        </tr>
                    </tbody>
                </table>
                <div className='flex-column-align-center cart-totals-div'>
                    <h2 style={{width: '100%', fontSize: '15px', fontWeight: '700', color:'RGB(17, 21, 24)'}}>Cart totals</h2>
                    <table style={{width: '100%', fontSize: '15px'}}>
                        <tbody>
                            <tr>
                                <th className='text-align-left' style={{color: 'RGB(104, 114, 121)'}}>Subtotal</th>
                                <td className='text-align-right' style={{color: 'RGB(104, 114, 121)'}}><span>KSh</span>300.00</td>
                            </tr>
                            <tr style={{borderBottom: 'none'}}>
                                <th className='text-align-left' style={{color: 'RGB(104, 114, 121)'}}>Total</th>
                                <td className='text-align-right' style={{color: 'RGB(104, 114, 121)', fontWeight: '700'}}><span>KSh</span>300.00</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='cta-button' style={{width: '100%', marginBottom: '20px'}} onClick={()=>navigate('/Checkout')}>Proceed to checkout</button>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Cart