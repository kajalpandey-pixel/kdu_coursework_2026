import { Navigate, Route, Routes } from "react-router-dom"
import Booking from "./pages/Booking"
import Confirmation from "./pages/Confirmation"



function App() {
 
  return (
      <div>
        <Routes>
      <Route path="/" element={<Booking />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
        </div>
  )
}

export default App
