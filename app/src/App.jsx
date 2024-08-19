import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import ProductList from './components/ProductList'
import {CartProvider} from './components/CartContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import CartPage from './components/CartPage'
import Register from './components/Register'
import Login from './components/Login'
import CheckoutPage from './components/CheckoutPage'
import PrivateRoute from './components/PrivateRoute'
import ProductForm from './components/ProductForm'
import AdminDashboard from './components/AdminDashboard'
import HeroSection from './components/HeroSection'
import './App.css'
const App = () => {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<><Navbar/><HeroSection/><ProductList/></>
    },
    {
      path:'/cart',
      element:<><Navbar/><CartPage/></>
    },
    {
      path:'/register',
      element:<><Register/></>
    },
    {
      path:'/login',
      element:<><Login/></>
    },
    {
      path:'/product-form',
      element:<><ProductForm/></>
    },
    {
      path:'/admin',
      element:<><AdminDashboard/></>
    },
    {
      path:'/checkout',
      element:<>{<PrivateRoute element={<CheckoutPage/>}/>}</>
    },
   
  ])
  return (
    <div>
     <CartProvider>
      <RouterProvider router={router}/>
     </CartProvider>
     
    </div>
  )
}

export default App
