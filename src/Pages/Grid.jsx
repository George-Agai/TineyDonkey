import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useCart } from "react-use-cart";
import axios from 'axios';

function Grid() {
    const navigate = useNavigate()
    const { addItem, items } = useCart()
    const [AllProducts, setAllProducts] = useState(null);
    // console.log(AllProducts)
    console.log('items-->', items)

    useEffect(() => {
        axios.get('http://localhost:3000/get-image')
            .then((res) => {
                setAllProducts(res.data);
            })
            .catch(error => console.log(error))
    }, [])

    
    

    const handleAddItemToCart = (item)=> {
        const updatedProducts = {
            id: item._id,
            image: item.image,
            productName: item.productName,
            price: item.price
        }
        addItem(updatedProducts)
    }
    return (
        <div>
            <main>
                <div className="container">
                    <div className="product-grid">
                        {AllProducts == null
                            ? "Nothing to see yet!"
                            : AllProducts.map((data) => (
                                <div className="card stacked" key={data._id}>
                                    <img src={`http://localhost:3000/Images/` + data.image} alt="Teeny" className="card__img" loading="lazy" />
                                    <div className="card__content flex-column-align-center">
                                        <h2 className="card__title">{data.productName}</h2>
                                        <p className="card__price">KSh{data.price}.00</p>
                                        <button className='cta-button' style={{ padding: '15px 20px' }} onClick={()=>handleAddItemToCart(data)}>Add to cart</button>
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