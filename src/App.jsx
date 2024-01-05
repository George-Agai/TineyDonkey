import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage'
import './App.css'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          {/* <Route path='/LoginPage' element={<LoginPage />} />
          <Route path='/SignUpPage' element={<SignUpPage />} />
          <Route path='/HomePage' element={<HomePage />} />
          <Route path='/CustomerProfilePage' element={<CustomerProfilePage />} />
          <Route path='/AvailableSellersPage' element={<AvailableSellersPage />} />
          <Route path='/SellerOrdersPage' element={<SellerOrdersPage />} />
          <Route path='/SellerShopPage' element={<SellerShopPage />} />
          <Route path='/SellerProfilePage' element={<SellerProfilePage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
