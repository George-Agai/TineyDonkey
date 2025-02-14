import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import axios from 'axios'
import TransactionState from '../Components/TransactionState'
import TransactionResponse from '../Components/TransactionResponse'
import tick from '../TineyDonkeyAssets/tick.png'
import x from '../TineyDonkeyAssets/x-mark.png'
import { url, testUrl } from "../Constants/url"

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
    const [savedSale, setSavedSale] = useState()


    const findProductWithFalseStatus = (array) => {
        return array.filter(product => product.status === "sold")
    }

    let index = 1

    const checkProductAvailability = async () => {
        if(items.length < 1){
            alert("No figurines in cart")
            return
        }
        console.log("Check product availability function call")
        const idArray = items.map(item => item.id)
        await axios.post(`${url}/checkProduct`, idArray)
            .then((res) => {
                if (res.data.message === "Found products") {
                    index++
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
                        // console.log('order', order)
                    }
                }
                else console.log("No product found");

            })
            .catch(err => console.log(err))

    }
    useEffect(() => {
        if (index == 1) {
            checkProductAvailability()
            index++
        } else {
            console.log('index more than one')
        }
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
        await axios.post(`${url}/saveOrder`, order)
            .then((res) => {
                if (res.data.message === "Sale saved successfully") {
                    setSavedSale(res.data.savedSale)
                    setTimeout(() => {
                        setOrderSuccessful(true)
                        setSendingOrder(false)
                        setAvailableFlag(false)
                        setUnavailableFlag(false)
                        // emptyCart()
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

    // const sendOrderToDatabase = async (order) => {
    //     await axios.post(`${url}/giveaway`, order)
    //         .then((res) => {
    //             console.log(res.data)
    //         })
    //         .catch(err => console.log(err))
    // }

    const handleProceedWithoutItem = () => {
        if (isEmpty) {
            navigate('/cart')
            return
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
                                    <TransactionResponse image={tick} text={'Order placed successfully 🎊'} orderSent={orderSuccessful} savedSale={savedSale} />
                                    : somethingWentWrong ?
                                        <TransactionResponse image={x} text={'Oops, something went wrong'} />
                                        : sendingOrder ?
                                            <TransactionState text={'Sending order...'} />
                                            : null
                }

                {unavailableFlag ?
                    <div className='flex-column-align-center oops-div'>
                        <button className='cta-button' style={{ marginTop: '-10px' }} onClick={handleProceedWithoutItem}>Proceed without item</button>
                        <button className='cta-button' style={{ marginTop: '15px' }} onClick={() => navigate('/products')}>Continue shopping</button>
                    </div>
                    : null
                }

                {/* {orderSuccessful ? <div style={{ marginTop: '50px' }}>
                    <button className="cta-button" onClick={alert("Clicked")}>{rejected ? "Order cancelled" : "Cancel order"}</button>
                </div> : null} */}
            </div>
        </div>
    )
}

export default TransactionResponses