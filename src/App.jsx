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
import './App.css'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/ExpandedProduct' element={<ExpandedProduct />} />
          <Route path='/Products' element={<Products />} />
          <Route path='/About' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Checkout' element={<Checkout />} />
          <Route path='/ImageUploader' element={<ImageUploader />} />
          <Route path='/AddProductDashboard' element={<AddProductDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
