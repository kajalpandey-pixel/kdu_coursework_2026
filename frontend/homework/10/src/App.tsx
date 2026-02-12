import { useState } from 'react'

import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import DetailPage from './pages/DetailPage'

function App() {
        

  return (
    <>
     <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<DetailPage />} />
        
      </Routes>
    </div>
    
    </>
  )
}

export default App
