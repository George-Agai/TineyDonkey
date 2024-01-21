import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import PendingOrders from '../Components/PendingOrders';
import axios from 'axios';

function Dashboard() {
    const readFromLocalStorage = (key) => {
        const value = localStorage.getItem(key);
        return JSON.parse(value);
    };

    const [scrolling, setScrolling] = useState(false);
    const [AllProducts, setAllProducts] = useState(null);
    const [token, setToken] = useState(readFromLocalStorage('token'))
    const navigate = useNavigate()

    // localStorage.removeItem('token')
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get('https://ruby-uninterested-antelope.cyclic.app/business/protected', {
                    headers: {
                        'Authorization': `${token}`,
                    },
                })
                    .then((tokenAuthenticationPayload) => {
                        if (tokenAuthenticationPayload.data.message === 'Access denied. No token provided' || tokenAuthenticationPayload.data.message === 'Invalid token') {
                            navigate('/Admin')
                        }
                        else if (tokenAuthenticationPayload.data.message === 'Access granted') {
                            axios.get('http://localhost:3000/get-image')
                                .then((res) => {
                                    setAllProducts(res.data);
                                })
                                .catch(error => console.log(error))
                        }
                    })
                    .catch(error => console.log(error))
            }
            catch (error) {
            console.error(error);
        }
    };
    fetchData();
}, [])

const handleLogout =()=> {
    localStorage.removeItem('token')
    setTimeout(()=>{
        navigate('/Admin')
    }, 1000)
}


return (
    <div className='dashboard-container' style={{ paddingBottom: '40px' }}>
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
                    <FaRegUserCircle style={{ color: 'grey', fontSize: '20px', float: 'right', cursor: 'pointer', marginLeft: '30px' }} onClick={handleLogout}/>
                </div>
            </section>
        </nav>

        <div className='width100 flex-justify-content-space-between dashboard-total-sales-div'>
            <div style={{ border: '2px solid rgb(231, 230, 230)', padding: '15px 25px', minWidth: '200px' }}>
                <h3 className=''>Total sales</h3>
                <h1>Ksh850</h1>
            </div>
            <button className='cta-button' onClick={() => navigate('/AddProductDashboard')}>Add product</button>
        </div>
        <div className='width100' style={{ marginTop: '100px' }}>
            <h3>Pending orders</h3>
            <PendingOrders AllProducts={AllProducts} />
        </div>
    </div>
)
}

export default Dashboard