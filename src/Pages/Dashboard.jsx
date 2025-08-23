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
    const [AllProducts, setAllProducts] = useState(null);

    const [showAddOrderPopup, setShowAddOrderPopup] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [step, setStep] = useState(1); // step 1 = choose products, step 2 = order details
    const [orderForm, setOrderForm] = useState({ products: [], boughtBy: "", contact: "" });
    const [clicked, setClicked] = useState(false);


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
                                    axios.get(`${url}/getProduct`)
                                        .then((res) => {
                                            // console.log("Get all prodctss---->", res.data)
                                            setAllProducts(res.data);
                                        })
                                        .catch(error => console.log(error))
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

    useEffect(() => {
        if (AllProducts) {
            const available = AllProducts.filter(p => p.status === "available");
            setFilteredProducts(available);
        }
    }, [AllProducts]);

    const toggleProductSelection = (product) => {
        if (selectedProducts.find(p => p._id === product._id)) {
            setSelectedProducts(selectedProducts.filter(p => p._id !== product._id));
        } else {
            setSelectedProducts([...selectedProducts, product]);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        if (AllProducts) {
            setFilteredProducts(
                AllProducts.filter(
                    (p) => p.status === "available" && p.productName.toLowerCase().includes(query)
                )
            );
        }
    };

    const handleSaveOrder = async () => {
        try {
            if (!orderForm.boughtBy || !orderForm.contact) return;
            setClicked(true)
            // build products array
            const products = selectedProducts.map((item) => {
                const quantity = 1;
                const itemTotal = item.price * quantity;

                return {
                    _id: item._id,
                    productName: item.productName,
                    image: item.image,
                    quantity,
                    itemTotal,
                };
            });

            // calculate totalAmount
            const totalAmount = products.reduce((sum, item) => sum + item.itemTotal, 0);

            const payload = {
                products,
                totalAmount,
                boughtBy: orderForm.boughtBy,
                contact: orderForm.contact,
                town: "Nairobi",
                country: "Kenya",
                orderNotes: "empty",
                orderStatus: "pending",
            };

            const res = await axios.post(`${url}/saveOrder`, payload);
            if(res.data.message === 'Sale saved successfully'){
                alert("Order saved ✅");

                // reset states
                setShowAddOrderPopup(false);
                setSelectedProducts([]);
                setOrderForm({ products: [], boughtBy: "", contact: "" });
                setStep(1);
                return;
            }
            else alert("Order couldn't save");
            
        } catch (err) {
            console.error("Save order failed:", err);
            alert("Failed to save order");
        }
        finally{
            setClicked(false)
        }
    };


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
                        <div className="flex-justify-content-space-between" style={{ padding: "20px" }}>
                            <h3 style={{ fontSize: '17px' }}>Pending orders ({AllPendingOrders.length})</h3>
                            <button className="add-order-btn" onClick={() => setShowAddOrderPopup(true)}>+ Add Order</button>
                        </div>
                        <PendingOrders AllProducts={AllPendingOrders} />
                    </div>

                </>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "100%" }}>
                    <h3>Loading...</h3>
                </div>

            )}


            {showAddOrderPopup && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ width: "500px" }}>
                        {step === 1 && (
                            <>
                                <h3>Select Products</h3>
                                <input
                                    type="text"
                                    placeholder="Search product name..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    style={{ marginBottom: "10px", height: '30px', fontSize: '15px' }}
                                />
                                <div className="product-list">
                                    {filteredProducts.map((product) => (
                                        <div
                                            key={product._id}
                                            className={`product-item ${selectedProducts.find(p => p._id === product._id) ? "selected" : ""}`}
                                            onClick={() => toggleProductSelection(product)}
                                        >
                                            <img src={`${url}/Images/${product.image[0]}`} alt={product.productName} />
                                            <div>
                                                <p>{product.productName}</p>
                                                <span>Ksh {product.price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="modal-actions">
                                    <button onClick={() => setShowAddOrderPopup(false)} className="cancel-btn">Cancel</button>
                                    <button disabled={selectedProducts.length === 0} onClick={() => setStep(2)} className="save-btn">Next</button>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <h3>Order Details</h3>
                                <label>Products</label>
                                <input type="text" value={selectedProducts.map(p => p.productName).join(", ")} disabled />

                                <label>Bought By</label>
                                <input type="text" value={orderForm.boughtBy} onChange={e => setOrderForm({ ...orderForm, boughtBy: e.target.value })} />

                                <label>Contact</label>
                                <input type="text" value={orderForm.contact} onChange={e => setOrderForm({ ...orderForm, contact: e.target.value })} />

                                <div className="modal-actions">
                                    <button onClick={() => { setStep(1); setOrderForm({ ...orderForm, boughtBy: "", contact: "" }); }} className="cancel-btn">Back</button>
                                    <button onClick={handleSaveOrder} className="save-btn">{clicked ? 'Saving.. ' : 'Save'}</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    );

}

export default Dashboard