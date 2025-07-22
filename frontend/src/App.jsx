import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Womens from './Pages/Womens'
import Shoes from './Pages/Shoes'
import Register from './Pages/Register'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Login from './Pages/Login'
import ForgotPassword from './Pages/ForgotPassword'
import Product from './Components/Product'
import ProductCategory from './Pages/ProductCategory'

const App = () => {
  return (
<>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/womens' element={<Womens/>} />
      <Route path='/shoes' element={<Shoes/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/Product/:productId' element={<Product/>}/>
      <Route path='/products' element={<ProductCategory/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App;