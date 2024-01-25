import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import axios from 'axios'
import TransactionState from '../Components/TransactionState'
import TransactionResponse from '../Components/TransactionResponse'
import tick from '../TineyDonkeyAssets/tick.png'
import x from '../TineyDonkeyAssets/x-mark.png'
import { AiTwotoneSecurityScan } from 'react-icons/ai'

function TransactionResponses() {
    const location = useLocation()
    const { formData } = location.state;
    const { items, removeItem, cartTotal } = useCart()
    const [productAvailabilityFlag, setProductAvailabilityFlag] = useState(true)
    const [availableFlag, setAvailableFlag] = useState(false)
    const [unavailableFlag, setUnavailableFlag] = useState(false)
    const [initiatingTransaction, setInitiatingTransaction] = useState(false)
    const [orderSuccessful, setOrderSuccessful] = useState(false)
    const [unavailableProductName, setUnavailableProductName] = useState()
    const [unavailableProductsArray, setUnavailableProductsArray] = useState()

    console.log('items in rs', items)

    //const 
    const findProductWithFalseStatus = (array) => {
        return array.filter(product => !product.status)
    }
    const checkProductAvailability = async () => {
        const idArray = items.map(item => item.id)
        await axios.post('http://192.168.100.9:3000/checkProduct', idArray)
            .then((res) => {
                if (res.data.message === "Found products") {
                    // console.log("response-->", res.data)
                    const productsWithFalseStatus = findProductWithFalseStatus(res.data.productStatusResults)
                    setUnavailableProductsArray(productsWithFalseStatus)
                    if (productsWithFalseStatus.length > 0) {
                        setUnavailableProductName(productsWithFalseStatus[0].productName)
                        setTimeout(() => {
                            setUnavailableFlag(true)
                            setProductAvailabilityFlag(false)
                        }, 3000)
                    }
                    else {
                        setProductAvailabilityFlag(false)
                        setAvailableFlag(true)
                        setTimeout(() => {
                            setAvailableFlag(false)
                            setInitiatingTransaction(true)
                        }, 2000)
                        setTimeout(() => {
                            handleMakePayment()
                        }, 2000)
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

    // const sendOrderToDatabase = async () => {
    //     await axios.post('http://192.168.100.9:3000/saveOrder', order)
    //         .then(res => console.log("response-->", res))
    //         .catch(err => console.log(err))
    // }

   const handleProceedWithoutItem = () => {
        // console.log('newItems in fn after removing unavailable', items)
        // const products = items.map((item)=> {
        //     const { id, productName, itemTotal, image, quantity } = item
        //     return { _id: id, productName, itemTotal, image, quantity }
        // })
        // const order = {
        //     products: products,
        //     totalAmount: cartTotal,
        //     ...formData
        // }
        // console.log('order in function', order)
        handleMakePayment()
    }






    let counter = 0;
    let transactionFound = false;

    const sendFindTransactionRequest = async (MerchantRequestID) => {
        if (!transactionFound && counter < 7) {
            await axios.get(`http://192.168.100.9:3000/transaction/findTransaction?MerchantRequestID=${MerchantRequestID}`)
                .then(response => {
                    if (response.data.message === 'Transaction found') {
                        transactionFound = true;
                        console.log('Transaction found:', response.data.transaction.ResultDesc);
                        if (response.data.transaction.ResultCode === 0) {
                            axios.post('http://192.168.100.9:3000/salesHistory/saveSaleDetails', Sale)
                                .then(response => {
                                    if (response.data.message === 'Sales details saved') {
                                        setOrderSuccessful(true)
                                        setInitiatingTransaction(false)
                                    }
                                })
                                .catch(error => {
                                    console.log('Error:', error)
                                })

                        }
                        else {
                            console.log(response.data.transaction.ResultDesc)
                            const { ResultDesc } = response.data.transaction
                            console.log(ResultDesc)
                        }
                    } else if (response.data.message === 'Transaction not found') {
                        console.log('Transaction not found')
                        console.log('counter-->', counter)
                        counter++;
                        if (counter === 5) {
                            const ResultDesc = 'Transaction not found'
                            console.log(ResultDesc)
                        }
                        setTimeout(() => sendFindTransactionRequest(MerchantRequestID), 6000);
                    } else {
                        console.log('Unexpected response:', response.data);
                    }
                })
                .catch(error => {
                    console.log('errorr bro', error)
                })
        }
    };

    let Sale

    const handleMakePayment = async () => {
        const products = items.map((item)=> {
            const { id, productName, itemTotal, image, quantity } = item
            return { _id: id, productName, itemTotal, image, quantity }
        })
        const order = {
            products: products,
            totalAmount: cartTotal,
            ...formData
        }
        console.log('order in function', order)

        let tots = cartTotal
        if (tots > 50) {
            tots = 1
        }

        // const sale = {
        //     products: simplifiedCart,
        //     // totalAmount: calculateTotal()
        //     totalAmount: tots
        // }
        // Sale = sale
        const paymentDetailsObject = {
            phone: formData.contact,
            accountNumber: "348698468",
            amount: tots
        }
        await axios.post('http://192.168.100.9:3000/payment/api/stkpush', paymentDetailsObject)
            .then(response => {
                console.log(response.data)
                sendFindTransactionRequest(response.data.MerchantRequestID);
            })
            .catch(error => {
                console.log('Error:', error)
            })
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
                                    : null
                }

                {unavailableFlag ?
                    <div className='flex-column-align-center'>
                        <button className='cta-button' style={{ marginTop: '50px', width: '50%' }} onClick={handleProceedWithoutItem}>Proceed without item</button>
                        <button className='cta-button' style={{ marginTop: '15px', width: '50%' }}>Continue shopping</button>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default TransactionResponses