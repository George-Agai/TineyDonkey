import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";

function Finances() {
  const navigate = useNavigate()
  const [scrolling, setScrolling] = useState(false);
  const [transactionType, setTransactionType] = useState('expense');
  const [description, setDescription] = useState()
  const [amount, setAmount] = useState()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.scrollTo(0, 0)

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token')
    setTimeout(() => {
      navigate('/Admin')
    }, 1000)
  }

  const handleTransactionTypeChange = (event) => {
    setTransactionType(event.target.value);

  };
  console.log(transactionType);
  return (
    <div className='transition-div dashboard-container' style={{ paddingBottom: '40px' }}>
      <nav className={`navbar ${scrolling ? 'scrolled' : 'scrolled'}`} style={{ border: 'none' }}>
        <section className="flex-justify-content-space-between" style={{ borderBottom: 'none' }}>
          <p onClick={() => navigate('/')}>TineyDonkey</p>
          <ul>
            <li style={{ color: 'grey' }} onClick={() => navigate('/')}>Home</li>
            <li style={{ color: 'grey' }} onClick={() => navigate('/products')}>Products</li>
            <li style={{ color: 'grey' }} onClick={() => navigate('/contact')}>Contact</li>
            <li style={{ color: 'grey' }} onClick={() => navigate('/about')}>About</li>
          </ul>
          <div className='flex-justify-flex-end navbar-icon-div' style={{ widthead: '15%', paddingRight: '30px' }}>
            <FaRegUserCircle style={{ color: 'grey', fontSize: '20px', float: 'right', cursor: 'pointer', marginLeft: '30px' }} onClick={handleLogout} />
          </div>
        </section>
      </nav>

      <div className='finances-main-div' style={{ border: '1px solid black' }}>
        <div>
          <select id="transactionType" value={transactionType} onChange={handleTransactionTypeChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className='flex-justify-content-space-between' style={{ width: '70%' }}>
          <div className='flex-column-justify-flex-start'>
            <label htmlFor="Description">Description *</label>
            <input type="text" id="Description" placeholder="Description" required="true" onChange={(e) => setDescription(e.target.value)} value={description} />
          </div>
          <div className='flex-column-justify-flex-start' style={{ marginLeft: '30px' }}>
            <label htmlFor="Amount">Amount *</label>
            <input type="text" id="Amount" placeholder="Amount" required="true" onChange={(e) => setAmount(e.target.value)} value={amount} />
          </div>
          <button className='cta-button'>Save</button>
        </div>

        <div className='flex-align-center-justify-center' style={{ border: '1px solid black' }}>
          <div>
            <p>Total sales</p>
            <h2>3,214</h2>
          </div>
          <div>
            <p>Expenses</p>
            <h2>3,000</h2>
          </div>
          <div>
            <p>Profit</p>
            <h2>214</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Finances