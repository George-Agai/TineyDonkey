import spinner from '../TineyDonkeyAssets/spinner.png'

function TransactionState({ text }) {
  return (
    <div className="flex-column-align-justify-center" style={{width: '100%', height: '100%'}}>
        <img src={spinner} alt='spinner' className='spinner' style={{ marginTop: '-70px' }}/>
        <p>{text}</p>
    </div>
  )
}

export default TransactionState