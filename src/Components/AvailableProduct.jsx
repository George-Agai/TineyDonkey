import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaShopSlash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { url, testUrl } from "../Constants/url"
import axios from "axios";


function AvailableProduct({ AllProducts, onEdit }) {

    const [ListedProducts, setListedProducts] = useState(AllProducts)

    useEffect(() => {
        setListedProducts(AllProducts);
    }, [AllProducts]);

    const handleDelete = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product? Deleting removes all images and product data from the database')) return;

        try {
            const response = await axios.delete(`${url}/deleteProduct/${productId}`);
            alert(`${response.data.message}`)

            await axios.get(`${url}/getProduct`)
                .then((res) => {
                    setListedProducts(res.data);
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const removeItemFromShop = async (productId) => {
        if (!window.confirm('Are you sure you want remove product from shop? Removing deletes all product images except one.')) return;

        try {
            const response = await axios.delete(`${url}/removeFromShop/${productId}`);
            alert(`${response.data.message}`)
            // console.log("Updated product", response.data.product)
            await axios.get(`${url}/getProduct`)
                .then((res) => {
                    setListedProducts(res.data);
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div style={{ width: '98%' }} className="available-product-div">
            <h3>All figurines ({ListedProducts && ListedProducts.length})</h3>
            <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <td className='text-align-left'>Product</td>
                        <td className='text-align-center'>Price</td>
                        <td className='text-align-center'>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {ListedProducts == null
                        ? "Please wait...."
                        : ListedProducts.map((data) => (
                            <tr key={data._id}>
                                <td className='' style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={`${url}/Images/` + data.image[0]} alt='Product' style={{ width: '90px' }} />
                                    <p style={{ marginLeft: '15px', color: 'RGB(104, 114, 121)', fontWeight: '500', fontSize: '15px', textAlign: "center" }} className='font-merriweather'>{data.productName}</p>
                                </td>
                                <td className='text-align-center'>{data.price}</td>
                                <td className='text-align-center'>{data.status === "available" ? <span style={{ color: '#FF6310' }}>Available</span> : <span style={{ color: 'lightgray' }}>Sold</span>}</td>
                                <td className='text-align-left'><FaEdit style={{ color: 'grey', cursor: 'pointer', marginLeft: '10px' }} onClick={() => onEdit(data)} /></td>
                                <td className='text-align-center'><FaShopSlash style={{ color: 'grey', cursor: 'pointer', marginLeft: '10px', marginRight: '10px' }} onClick={() => removeItemFromShop(data._id)} /></td>
                                <td className='text-align-right'><AiFillDelete id='delete-icon' style={{ color: 'red', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleDelete(data._id)} /></td>                            
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default AvailableProduct