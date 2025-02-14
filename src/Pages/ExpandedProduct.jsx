import { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { MdOutlineShoppingBag } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { useCart } from 'react-use-cart';
import Footer from '../Components/Footer';
import { url, testUrl } from "../Constants/url"
import axios from 'axios';

function ExpandedProduct() {
    const navigate = useNavigate();
    const location = useLocation();
    const { slug } = useParams();

    const [scrolling, setScrolling] = useState(false);
    const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);
    const [product, setProduct] = useState()

    const { addItem, isEmpty, totalItems, inCart } = useCart();

    const handleThumbnailClick = (index) => {
        setActiveThumbnailIndex(index)
    };

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
        if (location.state) {
            const { data } = location.state;
            setProduct(data)
        }

    }, [location.state])


    let index = 1

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`${url}/fetchProduct/${slug}`)
                .then((res) => setProduct(res.data))
                .catch((err) => console.log(err));
        }
        if (product === null || product === undefined) {
            if (index == 1) {
                fetchData()
                index++
            } else {
                console.log('index more than one')
            }
        }
    }, [product]);

    if (!product) return <div className="width100 flex-align-center-justify-center" style={{ marginTop: '50px', marginBottom: '100px' }}>
        <p>Loading...</p>
    </div>

    const handleAddProductToCart = () => {
        if (product) {
            if (product.status === "available") {
                const updatedProducts = {
                    id: product._id,
                    image: product.image,
                    productName: product.productName,
                    price: product.price
                }
                if (inCart(updatedProducts.id)) {
                    alert("Item is already in the cart")
                }
                else addItem(updatedProducts)
            }
            else console.log("Item has been sold")
        }
    }
    return (
        <div className={product ? 'transition-div expanded-product-container flex-column-align-center ' : 'height100vh expanded-product-container flex-column-justify-content-space-between'}>
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

            {product ? <main className='expanded-flex-container flex-justify-content-space-between'>
                <div className="product-gallery">
                    <div>
                        <p><span onClick={() => navigate('/')}>HOME /  </span><span onClick={() => navigate('/products')}>FIGURINES / </span>{product && product.productName.toUpperCase()}</p>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <img
                            src={`${url}/Images/${product && product.image[activeThumbnailIndex]}`}
                            alt="Main Product"
                            loading='lazy'
                            style={{
                                maxWidth: '100%',
                                loading: 'lazy',
                                height: 'auto'
                            }}
                            className='main-image-expanded'
                        />
                    </div>

                    <div className='flex-justify-flex-start width100' style={{ marginTop: "10px" }}>
                        {product && product.image.map((imageName, index) => (
                            <img
                                key={index}
                                loading='lazy'
                                className='expanded-image-thumbnail'
                                src={`${url}/Images/${product && imageName}`}
                                alt={`Thumbnail ${index + 1}`}
                                style={{
                                    maxWidth: "100px",
                                    marginRight: "10px",
                                    cursor: "pointer",
                                    border: index === activeThumbnailIndex ? "2px solid rgb(208, 228, 208)" : "2px solid transparent"
                                }}
                                onClick={() => handleThumbnailClick(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className='expanded-product-right-div flex-column-justify-flex-start'>
                    <h1 className='font-merriweather width100'>{product && product.productName}</h1>
                    <h3>KSh{product && product.price}</h3>
                    <p id='stock'>{product.status === "available" ? "1 in stock" : `Oops, somebody already bought ${product.productName}😔`}</p>
                    <div className='flex-column-align-center width100'>
                        <button className={product && product.status === "available" ? 'cta-button width100' : 'cta-locked-button width100'} onClick={handleAddProductToCart}>{product && product.status === "available" ? "Add to cart" : <span className="flex-align-center-justify-center">Sold <AiFillLock /></span>}</button>
                        {inCart(product._id) ? <button className='cta-button width100' style={{ marginTop: '10px' }} onClick={() => navigate('/checkout')}>Checkout</button> : null}
                    </div>
                    <p style={{ color: '#687279', fontSize: '13px', fontWeight: '700', marginTop: '30px' }}>CATEGORY:<span style={{ color: '#687279', fontSize: '13px', fontWeight: '500' }}> FIGURINES</span></p>
                </div>
            </main> : <div className="width100 flex-align-center-justify-center">
                <p>Loading...</p>
            </div>}
            <Footer />
        </div>
    )
}

export default ExpandedProduct