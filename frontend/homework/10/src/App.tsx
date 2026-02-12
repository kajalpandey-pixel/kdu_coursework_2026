import { useState } from 'react'

import './App.css'
import Home from './pages/Home'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import User from './pages/User'


export default function App() {
  
  return (
    <div className="App">
       <BrowserRouter>
         <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/:id' element={<User />} />
        </Routes>
       </BrowserRouter>
      
    </div>
  )
  
}


