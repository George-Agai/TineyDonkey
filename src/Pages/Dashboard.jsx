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
    const [totalIncome, setTotalIncome] = useState()
    const [totalExpenses, setTotalExpenses] = useState()
    const [profit, setProfit] = useState()
    const navigate = useNavigate()
    console.log(token)
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
                await axios.get('https://uninterested-antelope.onrender.com/authentication', {
                    headers: {
                        'Authorization': `${token}`,
                    },
                })
                    .then((tokenAuthenticationPayload) => {
                        if (tokenAuthenticationPayload.data.message === 'Access denied. No token provided' || tokenAuthenticationPayload.data.message === 'Invalid token') {
                            navigate('/Admin')
                        }
                        else if (tokenAuthenticationPayload.data.message === 'Access granted') {
                            axios.get('https://uninterested-antelope.onrender.com/getPendingOrders')
                                .then((res) => {
                                    setAllProducts(res.data);
                                    console.log(res.data)
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

    useEffect(() => {
        const fetchData = async () => {
          try {
            axios.get('https://uninterested-antelope.onrender.com/getAllCashflow')
              .then((res) => {
                let income = 0;
                let expense = 0;
    
                res.data.payload.forEach(item => {
                  if (item.type === 'Income') {
                    income += item.amount;
                  } else if (item.type === 'Expense') {
                    expense += item.amount;
                  }
                });
    
                setTotalIncome(income)
                setTotalExpenses(expense)
                setProfit(income - expense)
              })
              .catch(error => console.log(error))
          }
          catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        setTimeout(() => {
            navigate('/Admin')
        }, 1000)
    }


    return (
        <div className='transition-div dashboard-container' style={{ paddingBottom: '40px' }}>
            <nav className={`navbar ${scrolling ? 'scrolled' : 'scrolled'}`} style={{ border: 'none' }}>
                <section className="flex-justify-content-space-between" style={{ borderBottom: 'none' }}>
                    <p onClick={() => navigate('/')}>TineyDonkey</p>
                    <ul>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/')}>Home</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/products')}>Products</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/contact')}>Contact</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/about')}>About</li>
                    </ul>
                    <div className='flex-justify-flex-end navbar-icon-div' style={{ widthead: '15%', paddingRight: '30px' }}>
                        <FaRegUserCircle style={{ color: 'grey', fontSize: '20px', float: 'right', cursor: 'pointer', marginLeft: '30px' }} onClick={handleLogout} />
                    </div>
                </section>
            </nav>

            <div className='width100 flex-justify-content-space-between dashboard-total-sales-div'>
                <div style={{ border: '2px solid rgb(231, 230, 230)', padding: '15px 25px', minWidth: '200px' }}>
                    <h3 className=''>Available profit</h3>
                    <h1>Ksh{profit}</h1>
                    <a onClick={() => navigate('/finances')}>Manage Finances</a>
                </div>
                <button className='cta-button' onClick={() => navigate('/addProductDashboard')}>Add product</button>
            </div>
            <div className='width100' style={{ marginTop: '100px' }}>
                <h3>Pending orders</h3>
                <PendingOrders AllProducts={AllProducts} />
            </div>
        </div>
    )
}

export default Dashboard