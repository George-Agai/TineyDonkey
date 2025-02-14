import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"
import { useCart } from "react-use-cart";
import { AiFillLock } from "react-icons/ai";
import { url, testUrl } from "../Constants/url"
import axios from 'axios';

function Grid({ Page }) {
    const navigate = useNavigate()
    const { addItem, inCart } = useCart()
    const [AllProducts, setAllProducts] = useState(null);

    const countRef = useRef(0);

    useEffect(() => {
        if (countRef.current > 0) return;
        countRef.current += 1;

        axios.get(`${url}/getProduct`)
            .then((res) => {
                if (Page === 'Landing') {
                    const productsArray = res.data
                    productsArray.sort((a, b) => {
                        // Objects with status: true come before those with status: false
                        if (a.status === "available" && b.status === "sold") {
                            return -1; // a comes before b
                        } else if (a.status === "sold" && b.status === "available") {
                            return 1; // b comes before a
                        } else {
                            return 0; // no change in order
                        }
                    });
                    setAllProducts(productsArray.slice(0, 4));
                }
                else {
                    setAllProducts(res.data);
                }
            })
            .catch(error => console.log(error))
    }, [])


    const handleAddItemToCart = (item) => {
        const updatedProducts = {
            id: item._id,
            image: item.image,
            productName: item.productName,
            price: item.price
        }
        if (inCart(updatedProducts.id)) {
            alert("Item is already in the cart")
        }
        else addItem(updatedProducts)
    }

    const handleProductSelected = (data) => {
        navigate(`/product/${data.slug}`, { state: { data } })
    }

    const handleAddToCart = (data) => {
        if (data.status) {
            handleAddItemToCart(data)
        }
        else console.log("Item has been sold")
    }

    return (
        <div>
            <main>
                <div className="container">
                    <div className="product-grid">
                        {AllProducts == null
                            ? <div className="width100 flex-align-center-justify-center" style={{ marginTop: '50px', marginBottom: '100px' }}>
                                <p>Loading...</p>
                            </div>
                            :
                            AllProducts.length == 0
                                ? <div className="width100 flex-align-center-justify-center" style={{ marginTop: '50px', marginBottom: '100px' }}>
                                    <p>No products found</p>
                                </div>
                                :
                                AllProducts.map((data) => (
                                    <div className="card stacked" key={data._id}>
                                        <img onClick={() => handleProductSelected(data)} src={`${url}/Images/` + data.image[0]} alt="Teeny" className="card__img" loading="lazy" />
                                        <div className="card__content flex-column-align-center">
                                            <h2 className="card__title" onClick={() => handleProductSelected(data)}>{data.productName}</h2>
                                            <p className="card__price" onClick={() => handleProductSelected(data)}>KSh{data.price}.00</p>
                                            <button className={data.status === "available" ? 'cta-button' : 'cta-locked-button'} style={{ padding: '15px 20px' }} onClick={() => handleAddToCart(data)}>{data.status === "available" ? "Add to cart" : <span className="flex-align-center-justify-center">Sold <AiFillLock /></span>}</button>
                                        </div>
                                    </div>
                                ))}
                    </div>

                </div>
            </main>
        </div>
    )
}

export default Grid