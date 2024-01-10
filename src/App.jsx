import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage'
import ExpandedProduct from './Pages/ExpandedProduct';
import Products from './Pages/Products';
import About from './Pages/About';
import Contact from './Pages/Contact';
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
          {/*<Route path='/AvailableSellersPage' element={<AvailableSellersPage />} />
          <Route path='/SellerOrdersPage' element={<SellerOrdersPage />} />
          <Route path='/SellerShopPage' element={<SellerShopPage />} />
          <Route path='/SellerProfilePage' element={<SellerProfilePage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
