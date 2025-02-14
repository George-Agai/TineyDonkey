import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import PendingOrders from '../Components/PendingOrders';
import { url, testUrl } from "../Constants/url"
import axios from 'axios';

function AllPreviousSales() {
    const readFromLocalStorage = (key) => {
        const value = localStorage.getItem(key);
        return JSON.parse(value);
    };

    const [scrolling, setScrolling] = useState(false);
    const [AllProducts, setAllProducts] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filter, setFilter] = useState("delivered");
    const [token, setToken] = useState(readFromLocalStorage('token'))
    const [authorized, setAuthorized] = useState(false)
    const navigate = useNavigate()

    const countRef = useRef(0);

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
                            axios.get(`${url}/getAllPreviousOrders`)
                                .then((res) => {
                                    setAllProducts(res.data);
                                    setFilteredProducts(res.data.filter(order => order.orderStatus === "delivered"));
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

    const handleFilterChange = (e) => {
        const selectedStatus = e.target.value;
        setFilter(selectedStatus);
        setFilteredProducts(AllProducts.filter(order => order.orderStatus === selectedStatus));
    };

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


                    <div className="width100 tile" style={{ marginTop: '70px', width: '106%', marginLeft: '-11px' }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }}>
                            <h3 style={{ fontSize: "17px" }}>All Orders ({filteredProducts.length})</h3>
                            <select
                                value={filter}
                                onChange={handleFilterChange}
                                style={{ padding: "10px", fontSize: "14px", cursor: "pointer", borderRadius: "4px", backgroundColor: 'white' }}
                            >
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Rejected</option>
                                <option value="deleted">Cancelled</option>
                                <option value="giveaway">Giveaway</option>
                            </select>
                        </div>
                        <PendingOrders AllProducts={filteredProducts} />
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

export default AllPreviousSales