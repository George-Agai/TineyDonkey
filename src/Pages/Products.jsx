import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { MdOutlineShoppingBag } from "react-icons/md";
import Grid from './Grid';
import Footer from '../Components/Footer';

function Products() {
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <nav className={`navbar ${scrolling ? 'scrolled' : 'scrolled'}`} style={{ border: 'none' }}>
                <section className="flex-justify-content-space-between" style={{ borderBottom: 'none' }}>
                    <p>TineyDonkey</p>
                    <ul>
                        <li style={{ color: 'grey' }} onClick={()=>navigate('/')}>Home</li>
                        <li style={{ color: 'grey' }} onClick={()=>navigate('/Products')}>Products</li>
                        <li style={{ color: 'grey' }}  onClick={()=>navigate('/Contact')}>Contact</li>
                        <li style={{ color: 'grey' }} onClick={()=>navigate('/About')}>About</li>
                    </ul>
                    <div className='flex-justify-flex-end navbar-icon-div' style={{ width: '15%', paddingRight: '30px' }}>
                        <MdOutlineShoppingBag style={{ color: 'grey', fontSize: '20px', float: 'right', cursor: 'pointer', marginLeft: '30px' }} />
                    </div>
                </section>
            </nav>
            <div className='flex-column-align-center' style={{marginTop: '150px'}}>
                <p style={{ fontSize: '12px' }}><span style={{ color: '#FF6310', cursor: 'pointer' }} onClick={()=>navigate('/')}>HOME /</span><span style={{color: '#687279'}}> PRODUCTS</span></p>
                <h1 className='font-merriweather' style={{fontSize: '50px', color: 'RGB(17, 21, 24)', marginTop: '10px'}}>Products</h1>
            </div>
            <Grid/>
            <Footer/>
    </div>
  )
}

export default Products