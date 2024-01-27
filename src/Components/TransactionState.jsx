import spinner from '../TineyDonkeyAssets/spinner.png'

function TransactionState({ text }) {
  return (
    <div className="flex-column-align-center" style={{width: '100%'}}>
        <img src={spinner} alt='spinner' className='spinner'/>
        <p>{text}</p>
    </div>
  )
}

export default TransactionState