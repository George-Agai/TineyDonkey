import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useCart } from "react-use-cart";
import axios from 'axios';

function Grid({ Page }) {
    const navigate = useNavigate()
    const { addItem } = useCart()
    const [AllProducts, setAllProducts] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/get-image')
            .then((res) => {
                if (Page === 'Landing') {
                    setAllProducts(res.data.slice(0, 4));
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
        addItem(updatedProducts)
    }

    const handleProductSelected =(data) =>{
        navigate(`/product?id=${data._id}`, {state: { data }})
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
                            : AllProducts.map((data) => (
                                <div className="card stacked" key={data._id} onClick={() => handleProductSelected(data)}>
                                    <img src={`http://localhost:3000/Images/` + data.image[0]} alt="Teeny" className="card__img" loading="lazy" />
                                    <div className="card__content flex-column-align-center">
                                        <h2 className="card__title">{data.productName}</h2>
                                        <p className="card__price">KSh{data.price}.00</p>
                                        <button className='cta-button' style={{ padding: '15px 20px' }} onClick={() => handleAddItemToCart(data)}>Add to cart</button>
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