import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage'
import ExpandedProduct from './Pages/ExpandedProduct';
import Products from './Pages/Products';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import AddProductDashboard from './Pages/AddProductDashboard';
import Dashboard from './Pages/Dashboard';
import AdminLogin from './Pages/AdminLogin';
import Grid from './Pages/Grid';
import TransactionResponses from './Pages/TransactionResponses';
import AllPreviousSales from './Pages/AllPreviousSales';
import Finances from './Pages/Finances';
import { CartProvider } from 'react-use-cart';
import './App.css'

function App() {

  return (
    <div>
      <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/product' element={<ExpandedProduct />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/grid' element={<Grid />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/addProductDashboard' element={<AddProductDashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/transaction' element={<TransactionResponses />} />
          <Route path='/finances' element={<Finances />} />
          <Route path='/allSales' element={<AllPreviousSales />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </div>
  )
}

export default App
