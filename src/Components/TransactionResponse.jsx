import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

function TransactionResponse({ image, text, orderSent }) {
  const navigate = useNavigate()
  const [rejected, setRejected] = useState(false)

//   const handleReject = async()=> {
//     try {
//         const productIds = orderState.products.map(product => product._id)
//         console.log('productIds', productIds)
//         const saleId = orderState._id

//         const requestObject = {
//             saleId,
//             productIds
//         }
//         await axios.post('https://uninterested-antelope.onrender.com/rejectOrder', requestObject)
//         .then((res) => {
//             if(res.data.message == 'success'){
//                 console.log('Rejected response -->', res.data)
//                 setRejected(true)
//                 setTimeout(() => {
//                     navigate('/checkout')
//                 }, 1000)
//             }
//         })
//         .catch(err => console.log(err))
//     } catch (error) {
//         console.log(error)
//     }
// }
  return (
    <div className="flex-column-align-center" style={{width: '100%'}}>
        <img src={image} alt='spinner' className='response-icon'/>
        <p>{text}</p>
        {/* {orderSent ? 
        <div style={{marginTop: '50px'}}>
          <button className="cta-button" onClick={handleReject}>{rejected ? "Order cancelled" : "Cancel order"}</button>
        </div> : null} */}
    </div>
  )
}

export default TransactionResponse