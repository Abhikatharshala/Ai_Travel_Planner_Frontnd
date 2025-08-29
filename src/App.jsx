import React from 'react'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'

import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'

import TripDetails from './Pages/TripDetails/TripDetails'





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


     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
