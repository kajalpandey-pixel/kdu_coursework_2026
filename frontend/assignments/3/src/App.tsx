
import './App.css'
import Registration from './pages/Registration'
import Status from './pages/status'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Registration />} />
          <Route path="/status" element={<Status />} />
        </Routes>
      </BrowserRouter>   
    </>
  )
}

export default App
