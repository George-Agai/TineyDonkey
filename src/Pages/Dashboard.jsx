import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import PendingOrders from '../Components/PendingOrders';
import DashboardTiles from '../Components/DashboardTiles';
import { url, testUrl } from "../Constants/url"
import axios from 'axios';

function Dashboard() {
    const readFromLocalStorage = (key) => {
        const value = localStorage.getItem(key);
        return JSON.parse(value);
    };

    const [scrolling, setScrolling] = useState(false);
    const [AllPendingOrders, setAllPendingOrders] = useState(null);
    const [AllDeliveredOrders, setAllDeliveredOrders] = useState(null);
    const [token, setToken] = useState(readFromLocalStorage('token'))
    const [totalIncome, setTotalIncome] = useState()
    const [lifetimeIncome, setLifetimeIncome] = useState()
    const [remainingStockWorth, setRemainingStockWorth] = useState()
    const [figurinesInStock, setFigurinesInStock] = useState()
    const [totalExpenses, setTotalExpenses] = useState()
    const [profit, setProfit] = useState()
    const [authorized, setAuthorized] = useState(false)
    const navigate = useNavigate()

    const countRef = useRef(0);
    const cashflowCount = useRef(0);

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
        if (countRef.current > 0) return;
        countRef.current += 1;
        const fetchData = async () => {
            try {
                await axios.get(`${url}/authentication`, {
                    headers: {
                        'Authorization': `${token}`,
                    },
                })
                    .then((tokenAuthenticationPayload) => {
                        if (tokenAuthenticationPayload.data.message === 'Access denied. No token provided' || tokenAuthenticationPayload.data.message === 'Invalid token') {
                            navigate('/Admin')
                        }
                        else if (tokenAuthenticationPayload.data.message === 'Access granted') {
                            axios.get(`${url}/getPendingOrders`)
                                .then((res) => {
                                    setAllPendingOrders(res.data.pendingOrders.filter(order => order.orderStatus === "pending"));

                                    const deliveredProducts = res.data.pendingOrders
                                        .filter(order => order.orderStatus === "delivered")
                                        .reduce((sum, order) => sum + order.products.length, 0);

                                    const totalSalesAmount = res.data.pendingOrders
                                        .filter(order => order.orderStatus === "delivered")
                                        .reduce((sum, order) => sum + order.totalAmount, 0);

                                    setAllDeliveredOrders(deliveredProducts);
                                    setLifetimeIncome(totalSalesAmount)
                                    setFigurinesInStock(res.data.stockInfo.totalProductsInStock)
                                    setRemainingStockWorth(res.data.stockInfo.totalRemainingStockWorth)

                                    setAuthorized(true)
                                    // console.log(res.data)
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
        if (cashflowCount.current > 0) return;
        cashflowCount.current += 1;
        
        const fetchData = async () => {
            try {
                axios.get(`${url}/getAllCashflow`)
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
        <div className="transition-div dashboard-container" style={{ paddingBottom: '40px' }}>
            {authorized ? (
                <>
                    <nav
                        className={`navbar ${scrolling ? 'scrolled' : 'scrolled'}`}
                        style={{ border: 'none' }}
                    >
                        <section
                            className="flex-justify-content-space-between"
                            style={{ borderBottom: 'none' }}
                        >
                            <p onClick={() => navigate('/')}>TineyDonkey</p>
                            <div
                                className="flex-justify-flex-end navbar-icon-div"
                                style={{ width: '15%', paddingRight: '30px' }}
                            >
                                <FaRegUserCircle
                                    style={{
                                        color: 'grey',
                                        fontSize: '20px',
                                        float: 'right',
                                        cursor: 'pointer',
                                        marginLeft: '30px',
                                    }}
                                    onClick={handleLogout}
                                />
                            </div>
                        </section>
                    </nav>
                    <p>Welcome back🗿✨</p>
                    <DashboardTiles
                        pendingOrders={AllPendingOrders.length}
                        totalSales={AllDeliveredOrders}
                        totalAmount={lifetimeIncome}
                        profit={profit}
                        figurinesInStock={figurinesInStock}
                        remainingStockWorth={remainingStockWorth}
                    />

                    <div className="width100 tile" style={{ marginTop: '70px', width: '106%', marginLeft: '-11px' }}>
                        <h3 className='text-align-center' style={{ padding: "20px 0", fontSize: '17px' }}>Pending orders ({AllPendingOrders.length})</h3>
                        <PendingOrders AllProducts={AllPendingOrders} />
                    </div>
                </>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "100%" }}>
                    <h3>Loading...</h3>
                </div>

            )}
        </div>
    );

}

export default Dashboard