import { useState } from 'react';
import { url, testUrl } from "../Constants/url"
import { authAPI } from '../Context/AxiosProvider';

const ExpandedPendingOrder = ({ data, onClose }) => {
    const [delivered, setDelivered] = useState(false)
    const [rejected, setRejected] = useState(false)
    const formattedNumber = data.contact

    const handleDelivered = async () => {
        try {
            const saleId = data._id
            await authAPI.post(`/orderDelivered?id=${saleId}`)
                .then((res) => {
                    if (res.data.message == 'success') {
                        setDelivered(true)
                        setTimeout(() => {
                            onClose()
                            setDelivered(false)
                        }, 1000)
                    }
                })
                .catch(err => console.log(err))
        }
        catch (err) {
            alert("Something went wrong")
        }
    }

    const handleReject = async () => {
        try {
            const productIds = data.products.map(product => product._id)
            const saleId = data._id

            const requestObject = {
                saleId,
                productIds
            }
            await authAPI.post(`/rejectOrder`, requestObject)
                .then((res) => {
                    if (res.data.message == 'success') {
                        setRejected(true)
                        setTimeout(() => {
                            onClose()
                            setRejected(false)
                        }, 1000)
                    }
                })
                .catch(err => console.log(err))
        } catch (error) {
            alert("Something went wrong")
        }
    }
    return (
        <div className="floating-div">
            <div className="flex-justify-content-space-between width100">
                <p>{data.boughtBy}</p>
                <p onClick={onClose} style={{ cursor: 'pointer' }}>Close</p>
            </div>

            <table style={{ width: '100%' }}>
                {data.products.map((product) => (
                    <tr key={product._id}>
                        <td className='' style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={`${url}/Images/` + product.image[0]} alt='Product' style={{ width: '60px' }} />
                            <p style={{ marginLeft: '20px', color: 'RGB(104, 114, 121)', fontWeight: '500', fontSize: '15px', marginRight: '15px' }} className='font-merriweather'>{product.productName}</p>
                        </td>
                        <td className="text-align-center">{product.itemTotal}</td>
                    </tr>
                ))}
            </table>
            <div>
                <p>Country: {data.country}</p>
                <p>Town: {data.town}</p>
                <p>Order notes: {data.orderNotes}</p>
                <p>Order total: {data.totalAmount}</p>
                <p>Call: <a href={`tel:${formattedNumber}`} style={{ textDecoration: '' }}>{formattedNumber}</a></p>
            </div>
            <div className="flex-column-align-center width100">
                {/* <span className="flex-justify-content-space-between width100">
                    <button onClick={handleReject} className="cta-button" style={{backgroundColor: 'red', marginRight: '10px'}}>{rejected ? "Rejected" : "Reject"}</button>
                    <button onClick={onClose} className="cta-button" style={{backgroundColor: 'green'}}><a href={`tel:${formattedNumber}`} style={{ textDecoration: 'none', color: 'white' }}>Call</a></button>
                </span> */}
                <button onClick={handleDelivered} className="width100 cta-button" style={{ marginTop: '30px' }}>{delivered ? "Done" : "Delivered"}</button>
                <button
                    onClick={handleReject}
                    className="width100 cta-button"
                    style={{
                        backgroundColor: '#fce5d9',
                        color: 'rgb(88, 84, 84)',
                        padding: "15px",
                        marginTop: '20px'
                    }}>
                    {rejected ? "Rejected" : "Reject"}
                </button>
            </div>

        </div>
    );
};

export default ExpandedPendingOrder;