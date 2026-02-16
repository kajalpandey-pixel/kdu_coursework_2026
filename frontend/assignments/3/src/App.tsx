import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingPage from "./pages/booking/BookingPage";
import ConfirmationPage from "./pages/ConfirmationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
