import { AiFillDelete } from "react-icons/ai";

function AvailableProduct({ AllProducts }) {
    return (
        <div style={{ width: '90%' }} className="available-product-div">
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
                                    <img src={`https://ruby-uninterested-antelope.cyclic.app/Images/` + data.image[0]} alt='Product' style={{ width: '100px' }} />
                                    <p style={{ marginLeft: '15px', color: 'RGB(104, 114, 121)', fontWeight: '500', fontSize: '15px' }} className='font-merriweather'>{data.productName}</p>
                                </td>
                                <td className='text-align-center'>{data.price}</td>
                                <td className='text-align-center'>{data.status ? <span>Available</span> :<span>Sold</span>}</td>
                                <td className='text-align-center'><AiFillDelete id='delete-icon' style={{ color: 'grey' }} /></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default AvailableProduct