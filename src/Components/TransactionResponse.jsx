// import React from 'react'

function TransactionResponse({ image, text }) {
  return (
    <div className="flex-column-align-center" style={{width: '100%'}}>
        <img src={image} alt='spinner' className='response-icon'/>
        <p>{text}</p>
    </div>
  )
}

export default TransactionResponse