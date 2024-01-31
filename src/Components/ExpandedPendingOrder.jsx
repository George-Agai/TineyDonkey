import { useState } from 'react';
import axios from "axios";

const ExpandedPendingOrder = ({ data, onClose }) => {
    const [delivered, setDelivered] = useState(false)
    const [rejected, setRejected] = useState(false)
    const formattedNumber = `+${data.contact}`
    const orderNotes = "Get me the products by tomorrow because I wont be in town for the rest of the week, okay sir?"

    const handleDelivered = async() =>{
        try{
            const saleId = data._id
            await axios.post(`https://ruby-uninterested-antelope.cyclic.app/orderDelivered?id=${saleId}`)
            .then((res) => {
                if(res.data.message == 'success'){
                    console.log('Delivered response -->', res.data)
                    setDelivered(true)
                    setTimeout(() => {
                        onClose()
                        setDelivered(false)
                    }, 1000)
                }
            })
            .catch(err => console.log(err))
        }
        catch(err){
            alert("Something went wrong")
        }
    }

    const handleReject = async()=> {
        try {
            const productIds = data.products.map(product => product._id)
            console.log('productIds', productIds)
            const saleId = data._id

            const requestObject = {
                saleId,
                productIds
            }
            await axios.post('https://ruby-uninterested-antelope.cyclic.app/rejectOrder', requestObject)
            .then((res) => {
                if(res.data.message == 'success'){
                    console.log('Rejected response -->', res.data)
                    setRejected(true)
                    setTimeout(() => {
                        onClose()
                        setRejected(false)
                    }, 1000)
                }
            })
            .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="floating-div">
            <div className="flex-justify-content-space-between width100">
            <p>{data.boughtBy}</p>
            <p onClick={onClose} style={{cursor: 'pointer'}}>Close</p>
            </div>
            
            <table style={{ width: '100%'}}>
                {data.products.map((product) => (
                    <tr key={product._id}>
                        <td className='' style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={`https://ruby-uninterested-antelope.cyclic.app/Images/` + product.image[0]} alt='Product' style={{ width: '60px' }} />
                            <p style={{ marginLeft: '20px', color: 'RGB(104, 114, 121)', fontWeight: '500', fontSize: '15px', marginRight: '15px' }} className='font-merriweather'>{product.productName}</p>
                        </td>
                        <td className="text-align-center">{product.itemTotal}</td>
                    </tr>
                ))}
            </table>
            <div>
                <p>Country: {data.country}</p>
                <p>Town: {data.town}</p>
                <p>Order notes: {orderNotes}</p>
            </div>
            <div className="flex-column-align-center width100">
                <span className="flex-justify-content-space-between width100">
                    <button onClick={handleReject} className="cta-button" style={{backgroundColor: 'red', marginRight: '10px'}}>{rejected ? "Rejected" : "Reject"}</button>
                    <button onClick={onClose} className="cta-button" style={{backgroundColor: 'green'}}><a href={`tel:${formattedNumber}`} style={{ textDecoration: 'none', color: 'white' }}>Call</a></button>
                </span>
                <button onClick={handleDelivered} className="width100 cta-button" style={{marginTop: '30px'}}>{delivered ? "Done" : "Delivered"}</button>
            </div>

        </div>
    );
};

export default ExpandedPendingOrder;