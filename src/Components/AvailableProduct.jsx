//import React from 'react'
import { AiFillDelete } from "react-icons/ai";

function AvailableProduct({ AllProducts }) {
    return (
        <div style={{ width: '90%' }} className="available-product-div">
            {/* {AllProducts == null
                ? ""
                : AllProducts.map((data) => (
                    <div key={data._id} className="available-product-div">
                        <img
                            src={`http://localhost:3000/Images/` + data.image}
                            height={100}
                            width={100}
                            alt="Product"
                        />
                        <h3>{data.productName}</h3>
                        <p>Price: ${data.price}</p>
                    </div>
                ))} */}


            <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <td className='text-align-left'>Product</td>
                        <td className='text-align-center'>Price</td>
                        <td className='text-align-center'>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {AllProducts == null
                        ? ""
                        : AllProducts.map((data) => (
                            <tr key={data._id}>
                                <td className='' style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={`http://localhost:3000/Images/` + data.image} alt='Product' style={{ width: '100px' }} />
                                    <p style={{ marginLeft: '15px', color: 'RGB(104, 114, 121)', fontWeight: '500', fontSize: '15px' }} className='font-merriweather'>{data.productName}</p>
                                </td>
                                <td className='text-align-center'>{data.price}</td>
                                <td className='text-align-center'>{data.status ? <span>Pending</span> :<span>Sold</span>}</td>
                                <td className='text-align-center'><AiFillDelete id='delete-icon' style={{ color: 'grey' }} /></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default AvailableProduct