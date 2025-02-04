import { AiFillDelete } from "react-icons/ai";
import { url, testUrl } from "../Constants/url"


function AvailableProduct({ AllProducts }) {
    return (
        <div style={{ width: '98%' }} className="available-product-div">
            <table style={{ width: '100%'}}>
                <thead>
                    <tr>
                        <td className='text-align-left'>Product</td>
                        <td className='text-align-center'>Price</td>
                        <td className='text-align-center'>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {AllProducts == null
                        ? "Please wait...."
                        : AllProducts.map((data) => (
                            <tr key={data._id}>
                                <td className='' style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={`${url}/Images/` + data.image[0]} alt='Product' style={{ width: '90px' }} />
                                    <p style={{ marginLeft: '15px', color: 'RGB(104, 114, 121)', fontWeight: '500', fontSize: '15px', textAlign: "center" }} className='font-merriweather'>{data.productName}</p>
                                </td>
                                <td className='text-align-center'>{data.price}</td>
                                <td className='text-align-center'>{data.status ? <span style={{ color: '#FF6310' }}>Available</span> :<span style={{ color: 'lightgray' }}>Sold</span>}</td>
                                <td className='text-align-center'><AiFillDelete id='delete-icon' style={{ color: 'grey' }} /></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default AvailableProduct