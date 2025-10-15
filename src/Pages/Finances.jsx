import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { authAPI } from '../Context/AxiosProvider';

function Finances() {
  const navigate = useNavigate()
  const [scrolling, setScrolling] = useState(false);
  const [transactionType, setTransactionType] = useState('Expense');
  const [description, setDescription] = useState()
  const [amount, setAmount] = useState()
  const [AllCashflow, setAllCashflow] = useState(null);
  const [totalIncome, setTotalIncome] = useState()
  const [totalExpenses, setTotalExpenses] = useState()
  const [profit, setProfit] = useState()
  const [authorized, setAuthorized] = useState(false)

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
    localStorage.removeItem('TineyDonkeyToken')
    setTimeout(() => {
      navigate('/Admin', { replace: true })
    }, 1000)
  }

  const handleTransactionTypeChange = (event) => {
    setTransactionType(event.target.value);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        authAPI.get(`/getAllCashflow`)
          .then((res) => {
            setAuthorized(true)
            setAllCashflow(res.data.payload);
            let income = 0;
            let expense = 0;

            res.data.payload.forEach(item => {
              if (item.type === 'Income') {
                income += item.amount;
              } else if (item.type === 'Expense') {
                expense += item.amount;
              }
            });

            setTotalIncome(income)
            setTotalExpenses(expense)
            setProfit(income - expense)

          })
          .catch(error => console.log(error))
      }
      catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    const newAmount = parseInt(amount, 10)

    try {
      const cashflowObject = {
        description: description,
        amount: newAmount,
        transactionType
      }
      await authAPI.post(`/cashflow`, cashflowObject)
        .then((res) => {
          setAllCashflow(res.data.payload);

          let income = 0;
          let expense = 0;

          res.data.payload.forEach(item => {
            if (item.type === 'Income') {
              income += item.amount;
            } else if (item.type === 'Expense') {
              expense += item.amount;
            }
          });

          setTotalIncome(income)
          setTotalExpenses(expense)
          setProfit(income - expense)
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'EAT'
    };

    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
  }
  return (
    <div className='transition-div dashboard-container' style={{ paddingBottom: '40px' }}>
      {authorized ? (
        <>
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

          <div className='finances-main-div'>
            <div>
              <select id="transactionType" value={transactionType} onChange={handleTransactionTypeChange}>
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
            </div>

            <div className='flex-justify-content-space-between' style={{ width: '70%' }}>
              <div className='flex-column-justify-flex-start'>
                <label htmlFor="Description">Description *</label>
                <input type="text" id="Description" placeholder="Description" required={true} onChange={(e) => setDescription(e.target.value)} value={description} />
              </div>
              <div className='flex-column-justify-flex-start' style={{ marginLeft: '30px' }}>
                <label htmlFor="Amount">Amount *</label>
                <input type="text" id="Amount" placeholder="Amount" required={true} onChange={(e) => setAmount(e.target.value)} value={amount} />
              </div>
              <button className='cta-button' onClick={(e) => handleSave(e)}>Save</button>
            </div>

            <div className='flex-align-flex-start finances-overview-container'>
              <div>
                <p>Total sales</p>
                <h2>{totalIncome}</h2>
              </div>
              <div>
                <p>Expenses</p>
                <h2>{totalExpenses}</h2>
              </div>
              <div>
                <p>Profit</p>
                <h2>{profit}</h2>
              </div>
            </div>

            <div style={{ width: '100%' }} className="available-product-div">
              <h3>Statement</h3>
              <table style={{ width: '100%' }}>
                <thead>
                  <tr style={{ borderTop: '2px solid rgb(231, 230, 230)' }}>
                    <td className='text-align-left'>No</td>
                    <td className='text-align-center'>Description</td>
                    <td className='text-align-center quantity-th'>Amount</td>
                    <td className='text-align-center'>Date</td>
                    <td className='text-align-center'>Type</td>
                  </tr>
                </thead>
                <tbody>
                  {AllCashflow == null
                    ? "Please wait..."
                    : AllCashflow.length == 0 ? "No transactions" : AllCashflow.map((data, index) => (
                      <tr key={data._id}>
                        <td className='text-align-left'>{index + 1}</td>
                        <td className='text-align-center'>{data.description}</td>
                        <td className='text-align-center quantity-th'>{data.amount}</td>
                        <td className='text-align-center'>{formatDate(data.time)}</td>
                        <td className='text-align-center'>{data.type}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>   </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "100%" }}>
          <h3>Loading...</h3>
        </div>

      )}
    </div>
  )
}

export default Finances