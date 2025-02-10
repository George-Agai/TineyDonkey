import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoCloseOutline } from "react-icons/io5";
import { url, testUrl } from "../Constants/url"
import AnimatedIcon from '../Components/AnimatedIcon';
import DeleteIcon from "../TineyDonkeyAssets/Animations/delete.json";
import Done from "../TineyDonkeyAssets/Animations/done.json";
import axios from "axios";

function TransactionResponse({ savedSale, image, text, orderSent }) {
  const navigate = useNavigate()
  const [textOnButton, setTextOnButton] = useState("Cancel order")

  const handleReject = async () => {
    try {
      setTextOnButton("Please wait...")
      console.log(savedSale)
      const productIds = savedSale.products.map(product => product._id)
      const saleId = savedSale._id

      const requestObject = {
          saleId,
          productIds
      }
      await axios.post(`${url}/cancelOrder`, requestObject)
          .then((res) => {
              if (res.data.message == 'Deleted successfully') {
                  setTimeout(() => {
                      setTextOnButton("Order cancelled")
                  }, 2000);
                  setTimeout(() => {
                      setTextOnButton("Cancel order")
                      navigate('/cart')
                  }, 3000);
              }
              else if (res.data.message == 'Update failed') {
                  setTextOnButton("Failed")
              }
          })
          .catch(err => console.log(err))
    } catch (error) {
      console.log(error)
      alert("Something went wrong, please retry")
    }
  }
  return (
        <div className="flex-column-justify-between" style={{ width: '100%', height: '100%' }}>
          <div style={{ width: '100%', opacity: orderSent ? '1' : '0' }}>
            <IoCloseOutline
              style={{
                color: 'grey',
                fontSize: '35px',
                float: 'right',
                cursor: 'pointer',
                marginTop: '20px'
              }}
              onClick={() => navigate('/cart')}
            />
          </div>
          <div className='flex-column-align-center' style={{ marginTop: '-70px' }}>
            {orderSent ?
              <AnimatedIcon
                style={{ width: 150 }}
                animationData={Done}
                loop={false}
              />
              : <img src={image} alt='spinner' className='response-icon' />}
            <p>{text}</p>

          </div>

          <div className="flex-align-center-justify-center" style={{ width: '100%', opacity: orderSent ? '1' : '0' }}>
            <button
              className="cta-button flex-align-center-justify-center"
              style={{ backgroundColor: '#fce5d9', borderRadius: '10px', color: 'rgb(88, 84, 84)', padding: "15px ", width: '90%' }}
              onClick={handleReject}
            >
              <AnimatedIcon
                style={{ width: 18, marginRight: '5px' }}
                animationData={DeleteIcon}
                loop={true}
              />
              {textOnButton}
            </button>
          </div>
        </div>
  )
}

export default TransactionResponse