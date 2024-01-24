import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import axios from 'axios'
import TransactionState from '../Components/TransactionState'
import TransactionResponse from '../Components/TransactionResponse'
import tick from '../TineyDonkeyAssets/tick.png'
import x from '../TineyDonkeyAssets/x-mark.png'

function TransactionResponses() {
    const location = useLocation()
    const { order } = location.state;
    const { items } = useCart()
    console.log('items in rs', items)

    const findProductWithFalseStatus =(array) => {
        return array.filter(product => !product.status)
    }
    const checkProductAvailability = async () => {
        const idArray = items.map(item => item.id)
        console.log(idArray)
        await axios.post('http://localhost:3000/checkProduct', idArray)
            .then((res) => {
                if (res.data.message === "Found products") {
                    // console.log("response-->", res.data)
                    const productsWithFalseStatus = findProductWithFalseStatus(res.data.productStatusResults)
                    console.log("productsWithFalseStatus-->", productsWithFalseStatus)
                }
                else console.log("No product found");

            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        checkProductAvailability()
    }, [])



    const sendOrderToDatabase = async () => {
        await axios.post('http://localhost:3000/saveOrder', order)
            .then(res => console.log("response-->", res))
            .catch(err => console.log(err))
    }

    // console.log('order in tr', order)
    const [productAvailabilityFlag, setProductAvailabilityFlag] = useState(false)
    const [availableFlag, setAvailableFlag] = useState(false)
    const [unavailableFlag, setUnavailableFlag] = useState(false)
    const [initiatingTransaction, setInitiatingTransaction] = useState(false)
    const [orderSuccessful, setOrderSuccessful] = useState(true)
    return (
        <div className='transaction-response-container flex-align-center-justify-center' style={{ paddingBottom: '40px' }}>
            <div className="transaction-center-div">
                {productAvailabilityFlag ?
                    <TransactionState text={'Checking product availability...'} />
                    : availableFlag ?
                        <TransactionResponse image={tick} text={'Available'} />
                        : unavailableFlag ?
                            <TransactionResponse image={x} text={'Oops, someone just bought Attuma 2 minutes ago'} />
                            : initiatingTransaction ?
                                <TransactionState text={'Initiating transaction...'} />
                                : orderSuccessful ?
                                    <TransactionResponse image={tick} text={'Order placed successfully'} />
                                    : null
                }
            </div>
        </div>
    )
}

export default TransactionResponses