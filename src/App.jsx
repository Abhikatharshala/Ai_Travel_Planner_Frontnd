import React from 'react'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'

import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'

import TripDetails from './Pages/TripDetails/TripDetails'
import MyTrips from './Pages/MyTrips/MyTrips'
import ViewDetails from './Pages/ViewDetails/ViewDetails'
import WishList from './Pages/WishList/WishList'
import Histroy from './Pages/Histroy/Histroy'





const App = () => {
  return (
  <div>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/Signup' element={<Signup/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/Dashboard' element={<Dashboard/>}/>
    <Route path='/TripDetails' element={<TripDetails/>}/>
    <Route path='/MyTrips' element={<MyTrips/>}/>
    <Route path='/ViewDetails/:id' element={<ViewDetails/>}/>
    <Route path='/WishList' element={<WishList/>}/>
    <Route path='/Histroy' element={<Histroy/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
