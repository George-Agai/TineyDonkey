import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdOutlineShoppingBag } from "react-icons/md";
import Footer from '../Components/Footer';

function ExpandedProduct() {
    const navigate = useNavigate();

    const products = {
        image: ["170565244777920231220_111804.jpg", "170565260209220231220_113800.jpg", "170565465898520231207_123915 (2).jpg"],
        price: 300,
        productName: "Iron man"
    }

    const [scrolling, setScrolling] = useState(false);
    const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);

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

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div className='expanded-product-container flex-column-align-center'>
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

            <main className='expanded-flex-container flex-justify-content-space-between'>
                <div className="product-gallery">
                    <div>
                        <p><span>HOME / FIGURINES / </span>ATTUMA</p>
                    </div>
                    <div style={{overflow: 'hidden'}}>
                        <img
                            src={`http://localhost:3000/Images/${products.image[activeThumbnailIndex]}`}
                            alt="Main Product"
                            style={{
                                maxWidth: '100%',
                                loading: 'lazy',
                                height: 'auto'
                            }}
                            className='main-image-expanded'
                        />
                    </div>

                    <div className='flex-justify-flex-start width100' style={{ marginTop: "10px" }}>
                        {products.image.map((imageName, index) => (
                            <img
                                key={index}
                                src={`http://localhost:3000/Images/${imageName}`}
                                alt={`Thumbnail ${index + 1}`}
                                style={{
                                    maxWidth: "100px",
                                    // height: "80px",
                                    marginRight: "10px",
                                    cursor: "pointer",
                                    // aspectRatio: '1 / 1',
                                    loading: 'lazy',
                                    border: index === activeThumbnailIndex ? "2px solid rgb(208, 228, 208)" : "2px solid transparent"
                                }}
                                onClick={() => handleThumbnailClick(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className='expanded-product-right-div flex-column-justify-flex-start'>
                    <h1 className='font-merriweather width100'>Attuma from Black Panther</h1>
                    <h3>KSh300</h3>
                    <p id='stock'>1 in stock</p>
                    <div className='flex-align-center-justify-center width100'>
                        <button className='cta-button width100'>Add to cart</button>
                        {/* <button className='cta-button'>View cart</button> */}
                    </div>
                    <p style={{color: '#687279', fontSize: '13px', fontWeight: '700', marginTop: '30px'}}>CATEGORY:<span style={{color: '#687279', fontSize: '13px', fontWeight: '500'}}> FIGURINES</span></p>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default ExpandedProduct