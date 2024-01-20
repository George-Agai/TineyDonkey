import { AiFillDelete } from "react-icons/ai";

function PendingOrders({ AllProducts }) {
  return (
    <div style={{ width: '100%' }} className="available-product-div">
            <table style={{ width: '100%' }}>
                <thead>
                    <tr style={{borderTop: '2px solid rgb(231, 230, 230)'}}>
                        <td className='text-align-left'>Product</td>
                        <td className='text-align-center'>Bought by</td>
                        <td className='text-align-center quantity-th'>Price</td>
                        <td className='text-align-center'>Time</td>
                        <td className='text-align-center'>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {AllProducts == null
                        ? "Please wait..."
                        : AllProducts.map((data) => (
                            <tr key={data._id}>
                                <td className='' style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={`http://localhost:3000/Images/` + data.image} alt='Product' style={{ width: '100px' }} className="quantity-th"/>
                                    <p style={{ marginLeft: '15px', color: 'RGB(104, 114, 121)', fontWeight: '500', fontSize: '15px' }} className='font-merriweather'>{data.productName}</p>
                                </td>
                                <td className='text-align-center'>John Doe</td>
                                <td className='text-align-center quantity-th'>{data.price}</td>
                                <td className='text-align-center'>2hrs ago</td>
                                <td className='text-align-center'>{data.status ? <span>Pending</span> :<span>Delivered</span>}</td>
                                <td className='text-align-center'><AiFillDelete id='delete-icon' style={{ color: 'grey' }} /></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
  )
}

export default PendingOrders