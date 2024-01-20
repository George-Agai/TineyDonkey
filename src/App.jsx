import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage'
import ExpandedProduct from './Pages/ExpandedProduct';
import Products from './Pages/Products';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import ImageUploader from './Pages/AddProductDashboard';
import AddProductDashboard from './Pages/AddProductDashboard';
import Dashboard from './Pages/Dashboard';
import AdminLogin from './Pages/AdminLogin';
import './App.css'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/Product' element={<ExpandedProduct />} />
          <Route path='/Products' element={<Products />} />
          <Route path='/About' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Checkout' element={<Checkout />} />
          <Route path='/UploadProductDashboard' element={<ImageUploader />} />
          <Route path='/AddProductDashboard' element={<AddProductDashboard />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Admin' element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
