import { useState } from 'react'
import TransactionState from '../Components/TransactionState'
import TransactionResponse from '../Components/TransactionResponse'
import tick from '../TineyDonkeyAssets/tick.png'
import x from '../TineyDonkeyAssets/x-mark.png'

function TransactionResponses() {
    const [productAvailabilityFlag, setProductAvailabilityFlag] = useState(true)
    const [availableFlag, setAvailableFlag] = useState(true)
    const [unavailableFlag, setUnavailableFlag] = useState(true)
  return (
    <div className='transaction-response-container flex-align-center-justify-center' style={{ paddingBottom: '40px'}}>
        <div className="transaction-center-div">
            {productAvailabilityFlag ?
                <TransactionState text={'Checking product availability...'}/>
            : availableFlag ? 
                <TransactionResponse image={tick} text={'Available'}/>
            : unavailableFlag ? 
                <TransactionResponse image={x} text={'Oops, someone just bought Attuma 2 minutes ago'}/>
            : null
        }
        </div>
    </div>
  )
}

export default TransactionResponses