import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import axios from 'axios'
import TransactionState from '../Components/TransactionState'
import TransactionResponse from '../Components/TransactionResponse'
import tick from '../TineyDonkeyAssets/tick.png'
import x from '../TineyDonkeyAssets/x-mark.png'

function TransactionResponses() {
    const location = useLocation()
    const navigate = useNavigate()
    const { formData } = location.state;
    const { items, removeItem, cartTotal, emptyCart, isEmpty } = useCart()
    const [productAvailabilityFlag, setProductAvailabilityFlag] = useState(true)
    const [availableFlag, setAvailableFlag] = useState(false)
    const [unavailableFlag, setUnavailableFlag] = useState(false)
    const [initiatingTransaction, setInitiatingTransaction] = useState(false)
    const [orderSuccessful, setOrderSuccessful] = useState(false)
    const [unavailableProductName, setUnavailableProductName] = useState()
    const [unavailableProductsArray, setUnavailableProductsArray] = useState()
    const [somethingWentWrong, setSomethingWentWrong] = useState(false)
    const [sendingOrder, setSendingOrder] = useState(false)


    //const 
    const findProductWithFalseStatus = (array) => {
        return array.filter(product => !product.status)
    }
    const checkProductAvailability = async () => {
        const idArray = items.map(item => item.id)
        await axios.post('http://192.168.100.9:3000/checkProduct', idArray)
            .then((res) => {
                if (res.data.message === "Found products") {
                    console.log('checkProduct result', res.data.productStatusResults);
                    const productsWithFalseStatus = findProductWithFalseStatus(res.data.productStatusResults)
                    setUnavailableProductsArray(productsWithFalseStatus)
                    if (productsWithFalseStatus.length > 0) {
                        setUnavailableProductName(productsWithFalseStatus[0].productName)
                        setTimeout(() => {
                            setUnavailableFlag(true)
                            setProductAvailabilityFlag(false)
                        }, 2000)
                    }
                    else {
                        setTimeout(() => {
                            setAvailableFlag(true)
                            setProductAvailabilityFlag(false)
                        }, 2000)

                        setTimeout(() => {
                            setAvailableFlag(false)
                            setSendingOrder(true)
                        }, 4000)
                        const products = items.map((item) => {
                            const { id, productName, itemTotal, image, quantity } = item
                            return { _id: id, productName, itemTotal, image, quantity }
                        })
                        const order = {
                            products: products,
                            totalAmount: cartTotal,
                            ...formData
                        }
                        sendOrderToDatabase(order)
                    }
                }
                else console.log("No product found");

            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        checkProductAvailability()
    }, [])

    useEffect(() => {
        if (unavailableProductsArray && unavailableProductsArray.length > 0) {
            const newArray = unavailableProductsArray.map((product) => {
                const { _id } = product
                return { id: _id }
            })
            newArray.map(item => removeItem(item.id))
        }
    }, [unavailableProductsArray])

    const sendOrderToDatabase = async (order) => {
        await axios.post('http://192.168.100.9:3000/saveOrder', order)
            .then((res) => {
                if (res.data.message === "Sale saved successfully") {
                    setTimeout(() => {
                        setOrderSuccessful(true)
                        setSendingOrder(false)
                        setAvailableFlag(false)
                        setUnavailableFlag(false)
                        emptyCart()
                    }, 7000)
                }
                else {
                    setTimeout(() => {
                        setSomethingWentWrong(true)
                        setSendingOrder(false)
                        setAvailableFlag(false)
                        setUnavailableFlag(false)
                    }, 4000)
                }
            })
            .catch(err => console.log(err))
    }

    const handleProceedWithoutItem = () => {
        if (isEmpty) {
            navigate('/cart')
        }
        else {
            setSendingOrder(true)
            setUnavailableFlag(false)
            const products = items.map((item) => {
                const { id, productName, itemTotal, image, quantity } = item
                return { _id: id, productName, itemTotal, image, quantity }
            })
            const order = {
                products: products,
                totalAmount: cartTotal,
                ...formData
            }
            sendOrderToDatabase(order)
        }
    }

    return (
        <div className='transaction-response-container flex-align-center-justify-center' style={{ paddingBottom: '40px' }}>
            <div className="transaction-center-div">
                {productAvailabilityFlag ?
                    <TransactionState text={'Checking product availability...'} />
                    : availableFlag ?
                        <TransactionResponse image={tick} text={'Available'} />
                        : unavailableFlag ?
                            <TransactionResponse image={x} text={unavailableProductName && `Oops, someone just bought ${unavailableProductName} 2 minutes ago`} />
                            : initiatingTransaction ?
                                <TransactionState text={'Initiating transaction...'} />
                                : orderSuccessful ?
                                    <TransactionResponse image={tick} text={'Order placed successfully'} />
                                    : somethingWentWrong ?
                                        <TransactionResponse image={x} text={'Oops, something went wrong'} />
                                        : sendingOrder ?
                                            <TransactionState text={'Sending order...'} />
                                            : null
                }

                {unavailableFlag ?
                    <div className='flex-column-align-center oops-div'>
                        <button className='cta-button' style={{ marginTop: '50px' }} onClick={handleProceedWithoutItem}>Proceed without item</button>
                        <button className='cta-button' style={{ marginTop: '15px' }} onClick={() => navigate('/products')}>Continue shopping</button>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default TransactionResponses